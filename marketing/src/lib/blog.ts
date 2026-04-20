import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import blogSchema from "@/content/blog/schema.json";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  author: string;
  tags: string[];
  image?: string;
  canonical?: string;
  readingTime: string;
  content: string;
  published: boolean;
}

const CONTENT_DIR = path.join(process.cwd(), "content/blog");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export const allowedBlogTags = blogSchema.allowedTags;
export const allowedBlogAuthors = blogSchema.authors;
export const defaultBlogAuthor = blogSchema.defaultAuthor;

export interface BlogValidationResult {
  valid: boolean;
  errors: string[];
}

type Frontmatter = Record<string, unknown>;

function isObject(value: unknown): value is Frontmatter {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidDateString(value: string): boolean {
  if (!DATE_RE.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function isSafeChildPath(parent: string, child: string): boolean {
  const relative = path.relative(parent, child);
  return Boolean(relative) && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function normalizeTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((tag): tag is string => typeof tag === "string")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);
}

function stringField(data: Frontmatter, field: string): string | undefined {
  const value = data[field];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function validateImagePath(image: string): string | undefined {
  if (!image.startsWith("/blog/")) return "image must start with /blog/";
  if (image.includes("..")) return "image cannot contain path traversal";
  const filePath = path.join(PUBLIC_DIR, image);
  if (!isSafeChildPath(PUBLIC_DIR, filePath)) return "image must stay inside public/";
  if (!fs.existsSync(filePath)) return `image file does not exist at public${image}`;
  return undefined;
}

function validateCanonical(canonical: string): string | undefined {
  if (canonical.startsWith("/blog/") || canonical.startsWith("https://")) return undefined;
  return "canonical must start with /blog/ or https://";
}

export function validateBlogFrontmatter(
  data: unknown,
  slug: string,
  content = "",
): BlogValidationResult {
  const errors: string[] = [];
  if (!isObject(data)) {
    return { valid: false, errors: [`${slug}: frontmatter must be an object`] };
  }

  const title = stringField(data, "title");
  const description = stringField(data, "description");
  const date = stringField(data, "date");
  const updatedAt = stringField(data, "updatedAt");
  const author = stringField(data, "author");
  const image = stringField(data, "image");
  const canonical = stringField(data, "canonical");
  const tags = normalizeTags(data.tags);

  if (!title) errors.push("title is required");
  if (!description) errors.push("description is required");
  if (!date) errors.push("date is required");
  if (date && !isValidDateString(date)) errors.push("date must use YYYY-MM-DD");
  if (updatedAt && !isValidDateString(updatedAt)) errors.push("updatedAt must use YYYY-MM-DD");
  if (!author) errors.push("author is required");
  if (author && !allowedBlogAuthors.includes(author)) {
    errors.push(`author must be one of: ${allowedBlogAuthors.join(", ")}`);
  }
  if (!Array.isArray(data.tags)) errors.push("tags must be an array");
  if (tags.length === 0) errors.push("at least one tag is required");
  for (const tag of tags) {
    if (!allowedBlogTags.includes(tag)) {
      errors.push(`unknown tag "${tag}". Allowed tags: ${allowedBlogTags.join(", ")}`);
    }
  }
  if (typeof data.published !== "boolean") errors.push("published must be true or false");
  if (image) {
    const imageError = validateImagePath(image);
    if (imageError) errors.push(imageError);
  }
  if (canonical) {
    const canonicalError = validateCanonical(canonical);
    if (canonicalError) errors.push(canonicalError);
  }
  if (!content.trim()) errors.push("body content is required");

  return { valid: errors.length === 0, errors: errors.map((error) => `${slug}: ${error}`) };
}

function assertValidPost(data: Frontmatter, slug: string, content: string) {
  const validation = validateBlogFrontmatter(data, slug, content);
  if (!validation.valid) {
    throw new Error(validation.errors.join("\n"));
  }
}

function isVisiblePost(post: BlogPost, now = new Date()): boolean {
  return post.published && new Date(`${post.date}T00:00:00.000Z`).getTime() <= now.getTime();
}

function parseFile(file: string): BlogPost {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
  const { data, content } = matter(raw);
  assertValidPost(data, slug, content);
  const tags = normalizeTags(data.tags);

  return {
    slug,
    title: stringField(data, "title")!,
    description: stringField(data, "description")!,
    date: stringField(data, "date")!,
    updatedAt: stringField(data, "updatedAt"),
    author: stringField(data, "author")!,
    tags,
    image: stringField(data, "image"),
    canonical: stringField(data, "canonical"),
    readingTime: readingTime(content).text,
    content,
    published: data.published as boolean,
  } satisfies BlogPost;
}

let _cachedAllPosts: BlogPost[] | null = null;
/** Get every valid blog post, including drafts and future-dated posts. */
export function getAllBlogPosts(): BlogPost[] {
  if (_cachedAllPosts) return _cachedAllPosts;
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  _cachedAllPosts = files
    .map(parseFile)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return _cachedAllPosts;
}

/** Get visible published blog posts sorted by date (newest first). */
export function getAllPosts(): BlogPost[] {
  return getAllBlogPosts().filter((post) => isVisiblePost(post));
}

/** Get a single post by slug */
export function getPostBySlug(slug: string): BlogPost | undefined {
  const file = `${slug}.mdx`;
  const filePath = path.join(CONTENT_DIR, file);
  if (!fs.existsSync(filePath)) return undefined;
  const post = parseFile(file);
  return isVisiblePost(post) ? post : undefined;
}

/** Get all unique tags */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap((p) => p.tags));
  return Array.from(tags).sort();
}
