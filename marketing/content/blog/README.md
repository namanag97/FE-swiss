# Blog Authoring

Blog posts live in this folder as MDX files. Use the helper command from the `marketing` folder:

```bash
npm run blog:new
```

Create drafts with `published: false`. When a draft is ready to go live, publish it locally with:

```bash
npm run blog:publish -- my-post-slug
```

That command sets `published: true`, updates the publish date to today, and runs `npm run blog:check`.

Before opening a pull request, run:

```bash
npm run blog:check
```

Production builds run this check automatically.

## Frontmatter

Every post needs:

```yaml
---
title: "Post title"
description: "One sentence summary for cards, search, and social previews."
date: "2026-04-20"
author: "Naman Agarwal"
tags: ["insights", "process-mining"]
published: false
image: "/blog/example/cover.png"
canonical: "/blog/example"
updatedAt: "2026-04-20"
---
```

`image`, `canonical`, and `updatedAt` are optional. Keep drafts as `published: false`. Future-dated posts stay hidden until their date.

For no-build publishing, prefer externally hosted images on the approved media host. New files placed under `public/blog/<slug>/` still require a deployment build before Vercel can serve them.

Allowed tags are defined in `schema.json`.

## Publishing Checklist

- The post has a clear title and description.
- The slug matches the final URL.
- All internal links point to real routes or files.
- Images are already deployed under `public/blog/<slug>/` or hosted on the approved media host.
- Drafts are published with `npm run blog:publish -- <slug>`.
- `npm run blog:check` passes.
- The pull request includes a preview link.

## Runtime Publishing

The site can read blog MDX from GitHub at runtime after the runtime content architecture is deployed once. In production, set:

```bash
BLOG_CONTENT_SOURCE=github
BLOG_GITHUB_REPO=namanag97/FE-swiss
BLOG_GITHUB_REF=main
BLOG_GITHUB_CONTENT_DIR=marketing/content/blog
BLOG_REVALIDATE_SECONDS=300
BLOG_REVALIDATE_SECRET=<shared webhook secret>
BLOG_IMAGE_HOSTS=pub-0c8dadde61494a1b8933d138cdc802f7.r2.dev,raw.githubusercontent.com
```

`BLOG_GITHUB_TOKEN` is optional for public repos and recommended for private repos or higher GitHub API limits.

After this runtime code is live, text-only blog changes can go through Git and appear without a new Vercel build. The site refreshes from GitHub on the revalidate interval. For immediate refresh, POST to `/api/blog/revalidate` with the shared secret:

```bash
curl -X POST https://sancalana.com/api/blog/revalidate \
  -H "content-type: application/json" \
  -d '{"secret":"<shared webhook secret>","slug":"my-post-slug"}'
```

Vercel still needs one deployment to ship changes to the application code itself. New local media files, styles, components, routes, or MDX component changes also require a deployment build.

## Renaming Posts

When a published slug changes, add an entry to `redirects.json`:

```json
{
  "source": "old-slug",
  "destination": "new-slug",
  "permanent": true
}
```

The source post should no longer exist, and the destination post must exist.

## MDX Components

Use these components inside posts when a visual helps:

```mdx
<Exhibit n={1} title="Cycle time reduction" subtitle="Illustrative benchmark">
  <HBarChart
    data={[
      { label: "Before", value: 30, displayValue: "30 days" },
      { label: "After", value: 18, displayValue: "18 days" }
    ]}
  />
</Exhibit>
```

```mdx
<StatRow
  data={[
    { value: "34%", label: "Cycle time reduction" },
    { value: "20+", label: "Variants found" }
  ]}
/>
```

```mdx
<WaterfallChart
  data={[
    { label: "Baseline", value: 100 },
    { label: "Rework", value: 20 },
    { label: "Total", value: 0, isTotal: true }
  ]}
/>
```
