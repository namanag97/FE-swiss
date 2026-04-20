# Blog Authoring

Blog posts live in this folder as MDX files. Use the helper command from the `marketing` folder:

```bash
npm run blog:new
```

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

Allowed tags are defined in `schema.json`.

## Publishing Checklist

- The post has a clear title and description.
- The slug matches the final URL.
- All internal links point to real routes or files.
- Images are stored under `public/blog/<slug>/`.
- `npm run blog:check` passes.
- The pull request includes a preview link.

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
