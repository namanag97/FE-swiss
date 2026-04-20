import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content/blog");
const PUBLIC_DIR = path.join(ROOT, "public");
const APP_DIR = path.join(ROOT, "src/app");
const SCHEMA_PATH = path.join(CONTENT_DIR, "schema.json");
const REDIRECTS_PATH = path.join(CONTENT_DIR, "redirects.json");
const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, "utf8"));
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const APPROVED_REMOTE_IMAGE_HOSTS = (process.env.BLOG_IMAGE_HOSTS || "pub-0c8dadde61494a1b8933d138cdc802f7.r2.dev,raw.githubusercontent.com")
  .split(",")
  .map((host) => host.trim().toLowerCase())
  .filter(Boolean);

function mdxFiles() {
  return fs.readdirSync(CONTENT_DIR).filter((file) => file.endsWith(".mdx")).sort();
}

function isValidDate(value) {
  if (typeof value !== "string" || !DATE_RE.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function tags(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((tag) => typeof tag === "string")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);
}

function publicFileExists(href) {
  const cleanHref = href.split(/[?#]/)[0];
  if (!cleanHref || cleanHref === "/") return true;
  const filePath = path.join(PUBLIC_DIR, cleanHref);
  const relative = path.relative(PUBLIC_DIR, filePath);
  return Boolean(relative) && !relative.startsWith("..") && !path.isAbsolute(relative) && fs.existsSync(filePath);
}

function appRouteExists(href, allSlugs) {
  const cleanHref = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  if (cleanHref === "/") return true;
  if (cleanHref.startsWith("/blog/")) {
    const slug = cleanHref.replace(/^\/blog\//, "");
    return allSlugs.has(slug);
  }
  const routePath = path.join(APP_DIR, cleanHref);
  return fs.existsSync(path.join(routePath, "page.tsx")) || fs.existsSync(path.join(routePath, "route.ts"));
}

function internalLinks(content) {
  const links = new Set();
  const markdownLink = /\[[^\]]+\]\((\/[^)\s]+)\)/g;
  const hrefAttr = /href=["'](\/[^"']+)["']/g;
  for (const regex of [markdownLink, hrefAttr]) {
    let match;
    while ((match = regex.exec(content)) !== null) {
      links.add(match[1]);
    }
  }
  return [...links].filter((href) => !href.startsWith("//"));
}

function validateFrontmatter(file, slug, data, content) {
  const errors = [];
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const description = typeof data.description === "string" ? data.description.trim() : "";
  const author = typeof data.author === "string" ? data.author.trim() : "";
  const image = typeof data.image === "string" ? data.image.trim() : "";
  const canonical = typeof data.canonical === "string" ? data.canonical.trim() : "";
  const postTags = tags(data.tags);

  if (!SLUG_RE.test(slug)) errors.push("file name slug must use lowercase letters, numbers, and hyphens");
  if (!title) errors.push("title is required");
  if (!description) errors.push("description is required");
  if (!isValidDate(data.date)) errors.push("date must use YYYY-MM-DD");
  if (data.updatedAt !== undefined && !isValidDate(data.updatedAt)) errors.push("updatedAt must use YYYY-MM-DD");
  if (!author) errors.push("author is required");
  if (author && !schema.authors.includes(author)) errors.push(`author must be one of: ${schema.authors.join(", ")}`);
  if (!Array.isArray(data.tags)) errors.push("tags must be an array");
  if (postTags.length === 0) errors.push("at least one tag is required");
  for (const tag of postTags) {
    if (!schema.allowedTags.includes(tag)) errors.push(`unknown tag "${tag}"`);
  }
  if (typeof data.published !== "boolean") errors.push("published must be true or false");
  if (image) {
    if (image.startsWith("https://")) {
      try {
        const url = new URL(image);
        if (!APPROVED_REMOTE_IMAGE_HOSTS.includes(url.hostname.toLowerCase())) {
          errors.push(`image host must be one of: ${APPROVED_REMOTE_IMAGE_HOSTS.join(", ")}`);
        }
      } catch {
        errors.push("image URL is invalid");
      }
    } else if (!image.startsWith("/blog/")) errors.push("image must start with /blog/ or https://");
    else if (image.includes("..")) errors.push("image cannot contain path traversal");
    else if (!publicFileExists(image)) errors.push(`image file does not exist at public${image}`);
  }
  if (canonical && !canonical.startsWith("/blog/") && !canonical.startsWith("https://")) {
    errors.push("canonical must start with /blog/ or https://");
  }
  if (!content.trim()) errors.push("body content is required");

  return errors.map((error) => `${file}: ${error}`);
}

function blogRedirects() {
  if (!fs.existsSync(REDIRECTS_PATH)) return [];
  const raw = JSON.parse(fs.readFileSync(REDIRECTS_PATH, "utf8"));
  if (!Array.isArray(raw)) throw new Error("redirects.json must contain an array");
  return raw;
}

function validateRedirects(redirects, allSlugs) {
  const errors = [];
  const sources = new Set();

  redirects.forEach((redirect, index) => {
    const label = `redirects.json[${index}]`;
    if (!redirect || typeof redirect !== "object" || Array.isArray(redirect)) {
      errors.push(`${label}: redirect must be an object`);
      return;
    }

    const source = typeof redirect.source === "string" ? redirect.source.trim() : "";
    const destination = typeof redirect.destination === "string" ? redirect.destination.trim() : "";

    if (!SLUG_RE.test(source)) errors.push(`${label}: source must be a blog slug`);
    if (!SLUG_RE.test(destination)) errors.push(`${label}: destination must be a blog slug`);
    if (source && sources.has(source)) errors.push(`${label}: duplicate redirect source "${source}"`);
    if (source) sources.add(source);
    if (source && allSlugs.has(source)) errors.push(`${label}: source "${source}" still exists as a post`);
    if (destination && !allSlugs.has(destination)) errors.push(`${label}: destination "${destination}" does not exist`);
    if (source && destination && source === destination) errors.push(`${label}: source and destination cannot match`);
    if (redirect.permanent !== undefined && typeof redirect.permanent !== "boolean") {
      errors.push(`${label}: permanent must be true or false`);
    }
  });

  return errors;
}

async function main() {
  const files = mdxFiles();
  const errors = [];
  const slugs = new Map();
  const allSlugs = new Set(files.map((file) => file.replace(/\.mdx$/, "")));
  errors.push(...validateRedirects(blogRedirects(), allSlugs));

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const lowerSlug = slug.toLowerCase();
    if (slugs.has(lowerSlug)) errors.push(`${file}: duplicate slug also used by ${slugs.get(lowerSlug)}`);
    slugs.set(lowerSlug, file);

    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    errors.push(...validateFrontmatter(file, slug, data, content));

    try {
      await compile(content, {
        outputFormat: "function-body",
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      });
    } catch (error) {
      errors.push(`${file}: MDX compile failed: ${error.message}`);
    }

    for (const href of internalLinks(content)) {
      if (href.startsWith("/blog/") || !publicFileExists(href)) {
        if (!appRouteExists(href, allSlugs) && !publicFileExists(href)) {
          errors.push(`${file}: broken internal link ${href}`);
        }
      }
    }
  }

  if (errors.length > 0) {
    console.error(`Blog check failed with ${errors.length} issue(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`Blog check passed for ${files.length} post(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
