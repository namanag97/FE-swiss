import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  readingTime: string;
  content: string;
  published: boolean;
}

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

function parseFile(file: string): BlogPost {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? new Date().toISOString(),
    author: data.author ?? "Team",
    tags: data.tags ?? [],
    image: data.image ?? undefined,
    readingTime: readingTime(content).text,
    content,
    published: data.published !== false,
  } satisfies BlogPost;
}

let _cachedPosts: BlogPost[] | null = null;

/** Get all published blog posts sorted by date (newest first) */
export function getAllPosts(): BlogPost[] {
  if (_cachedPosts) return _cachedPosts;
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  _cachedPosts = files
    .map(parseFile)
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return _cachedPosts;
}

/** Get a single post by slug */
export function getPostBySlug(slug: string): BlogPost | undefined {
  const file = `${slug}.mdx`;
  const filePath = path.join(CONTENT_DIR, file);
  if (!fs.existsSync(filePath)) return undefined;
  const post = parseFile(file);
  return post.published ? post : undefined;
}

/** Get all unique tags */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap((p) => p.tags));
  return Array.from(tags).sort();
}
