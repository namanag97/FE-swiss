import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content/blog");
const SCHEMA_PATH = path.join(CONTENT_DIR, "schema.json");
const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, "utf8"));
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function args() {
  const parsed = {};
  const raw = process.argv.slice(2);
  for (let i = 0; i < raw.length; i += 1) {
    const item = raw[i];
    if (!item.startsWith("--")) continue;
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

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function isValidDate(value) {
  if (!DATE_RE.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function existingSlugs() {
  return new Set(
    fs
      .readdirSync(CONTENT_DIR)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, "").toLowerCase()),
  );
}

function parseTags(value) {
  return value
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);
}

async function main() {
  const flags = args();
  if (flags.title) {
    createPost({
      title: String(flags.title),
      slug: String(flags.slug || slugify(String(flags.title))),
      description: String(flags.description || ""),
      date: String(flags.date || today()),
      author: String(flags.author || schema.defaultAuthor),
      tags: parseTags(flags.tags === undefined ? "insights, process-mining" : String(flags.tags)),
      published: flags.published === true || flags.published === "true",
    });
    return;
  }

  const rl = readline.createInterface({ input, output });

  try {
    const title = (await rl.question("Title: ")).trim();
    if (!title) throw new Error("Title is required.");

    const defaultSlug = slugify(title);
    if (!defaultSlug) throw new Error("Title must contain letters or numbers for a slug.");

    const slugAnswer = (await rl.question(`Slug (${defaultSlug}): `)).trim();
    const slug = slugify(slugAnswer || defaultSlug);
    if (fs.existsSync(path.join(CONTENT_DIR, `${slug}.mdx`))) {
      throw new Error(`A post already exists for slug "${slug}". Choose a different slug.`);
    }

    const description = (await rl.question("Description: ")).trim();
    if (!description) throw new Error("Description is required.");

    const dateAnswer = (await rl.question(`Date (${today()}): `)).trim();
    const date = dateAnswer || today();

    const authorAnswer = (await rl.question(`Author (${schema.defaultAuthor}): `)).trim();
    const author = authorAnswer || schema.defaultAuthor;

    console.log(`Allowed tags: ${schema.allowedTags.join(", ")}`);
    const tagsAnswer = (await rl.question("Tags, comma-separated (insights, process-mining): ")).trim();
    const tags = parseTags(tagsAnswer || "insights, process-mining");

    const publishAnswer = (await rl.question("Published now? y/N: ")).trim().toLowerCase();
    const published = publishAnswer === "y" || publishAnswer === "yes";

    createPost({ title, slug, description, date, author, tags, published });
  } finally {
    rl.close();
  }
}

function createPost({ title, slug, description, date, author, tags, published }) {
  const finalTitle = title.trim();
  const finalSlug = slugify(slug);
  const finalDescription = description.trim();
  const finalAuthor = author.trim();

  if (!finalTitle) throw new Error("Title is required.");
  if (!finalSlug) throw new Error("Slug is required.");
  if (!finalDescription) throw new Error("Description is required.");
  if (!isValidDate(date)) throw new Error("Date must use YYYY-MM-DD.");
  if (!schema.authors.includes(finalAuthor)) {
    throw new Error(`Unknown author "${finalAuthor}". Allowed authors: ${schema.authors.join(", ")}`);
  }

  if (tags.length === 0) throw new Error("At least one tag is required.");
  const invalidTags = tags.filter((tag) => !schema.allowedTags.includes(tag));
  if (invalidTags.length > 0) {
    throw new Error(`Unknown tag(s): ${invalidTags.join(", ")}`);
  }

  if (existingSlugs().has(finalSlug.toLowerCase())) {
    throw new Error(`A post already exists for slug "${finalSlug}". Choose a different slug.`);
  }

  const body = `---\ntitle: ${JSON.stringify(finalTitle)}\ndescription: ${JSON.stringify(finalDescription)}\ndate: ${JSON.stringify(date)}\nauthor: ${JSON.stringify(finalAuthor)}\ntags: ${JSON.stringify(tags)}\npublished: ${published}\n---\n\nStart with the core claim in one or two short paragraphs.\n\n## Why it matters\n\nExplain the operating pain, buyer context, or technical reason this matters.\n\n## What to do next\n\nGive the reader a concrete takeaway.\n`;

  const filePath = path.join(CONTENT_DIR, `${finalSlug}.mdx`);
  fs.writeFileSync(filePath, body, "utf8");
  console.log(`Created ${path.relative(ROOT, filePath)}`);
  console.log("Run npm run blog:check before opening a pull request.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
