import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { spawnSync } from "node:child_process";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content/blog");
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function args() {
  const parsed = { _: [] };
  const raw = process.argv.slice(2);
  for (let i = 0; i < raw.length; i += 1) {
    const item = raw[i];
    if (!item.startsWith("--")) {
      parsed._.push(item);
      continue;
    }
    const key = item.slice(2);
    const next = raw[i + 1];
    if (next === undefined || next.startsWith("--")) {
      parsed[key] = true;
    } else {
      parsed[key] = next;
      i += 1;
    }
  }
  return parsed;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function isValidDate(value) {
  if (!DATE_RE.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function runBlogCheck() {
  const result = spawnSync("npm", ["run", "blog:check"], {
    cwd: ROOT,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

function main() {
  const flags = args();
  const rawSlug = flags.slug || flags._[0];
  const slug = rawSlug ? slugify(String(rawSlug)) : "";
  if (!slug) throw new Error("Usage: npm run blog:publish -- <slug> [--date YYYY-MM-DD] [--skip-check]");

  const date = flags.date ? String(flags.date) : today();
  if (!isValidDate(date)) throw new Error("--date must use YYYY-MM-DD.");

  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`No blog post found at content/blog/${slug}.mdx`);

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const wasPublished = parsed.data.published === true;

  parsed.data.published = true;
  parsed.data.date = date;
  if (wasPublished) parsed.data.updatedAt = date;

  fs.writeFileSync(filePath, matter.stringify(parsed.content.trimStart(), parsed.data), "utf8");
  console.log(`Published content/blog/${slug}.mdx for ${date}.`);

  if (!flags["skip-check"]) runBlogCheck();
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
