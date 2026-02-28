# Architecture

## Project Structure

```
src/
├── app/                          ← Pages (compose sections + content)
│   ├── layout.tsx                ← Root layout: fonts, metadata, global styles
│   ├── globals.css               ← CSS custom properties from theme + resets
│   ├── page.tsx                  ← Homepage
│   ├── pricing/page.tsx
│   ├── about/page.tsx
│   ├── blog/page.tsx
│   ├── product/page.tsx
│   ├── request-demo/page.tsx
│   └── versus/page.tsx
│
├── components/
│   ├── layout/                   ← Page chrome (shared across all pages)
│   │   ├── Banner.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── PageShell.tsx
│   ├── ui/                       ← Atomic design system primitives
│   │   ├── Button.tsx
│   │   ├── Eyebrow.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   └── sections/                 ← Composable page sections
│       ├── Hero.tsx
│       ├── PageHero.tsx
│       ├── FeatureSection.tsx
│       ├── FeatureCards.tsx
│       ├── StatsRow.tsx
│       ├── CTABand.tsx
│       ├── FAQ.tsx
│       ├── QuoteBand.tsx
│       ├── LogoStrip.tsx
│       ├── CompareGrid.tsx
│       ├── DeploySection.tsx
│       ├── TimelineSteps.tsx
│       ├── DemoForm.tsx
│       ├── BlogList.tsx
│       └── NewsletterBand.tsx
│
├── config/
│   ├── theme.ts                  ← Colors, fonts, spacing, effects
│   ├── site.ts                   ← Brand name, tagline, meta
│   └── nav.ts                    ← Navigation items, footer columns
│
├── content/
│   ├── home.ts                   ← Hero copy, features, stats, logos
│   ├── pricing.ts                ← Tiers, FAQ items
│   ├── about.ts                  ← Manifesto sections
│   ├── product.ts                ← Feature sections, stats, quote
│   ├── versus.ts                 ← Competitor list
│   ├── demo.ts                   ← Value props, form config
│   └── blog.ts                   ← Post metadata (or MDX later)
│
└── lib/
    └── fonts.ts                  ← next/font/google loading
```

## Key Principles

1. **Content is data, not markup** — all text lives in `content/*.ts` as typed objects
2. **Theme is centralized** — `config/theme.ts` → `globals.css` custom properties → components read vars
3. **Components are dumb** — they receive props, render markup, know nothing about content
4. **Pages are composition** — just import sections + content, wire them together

## Theming Flow

```
config/theme.ts  →  globals.css (:root vars)  →  components use var(--color-primary)
     ↓                                                    ↓
  Change here              Auto-propagates              No changes needed
```

## Content Flow

```
content/home.ts  →  app/page.tsx  →  <Hero {...home.hero} />
     ↓                                       ↓
  Change text here      Page imports      Component renders
```
