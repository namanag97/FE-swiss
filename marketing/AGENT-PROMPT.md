# Comprehensive Marketing Site Agent Prompt

You are upgrading the marketing site at `/Users/namanagarwal/Projects/FE-swiss/marketing/` to production-grade quality. This is a Next.js 15 App Router site for "Meridian" — a process mining and data analytics platform for enterprise operations teams.

## Design Reference: TextQL.com
The site should look and feel like textql.com. Key design tokens:

### Color Palette (already defined in globals.css as @theme vars)
- **Primary:** Dark forest teal `forest-900: #0F2D24` — hero backgrounds, primary buttons, footer, dark sections
- **Accent:** Emerald green `emerald-600/500/400` — section labels, check icons, active states
- **Neutrals:** Standard `gray-50` through `gray-900` — text, borders, card backgrounds
- **Dark sections:** `bg-forest-900` with `text-white`, `text-forest-200/80`, `text-forest-200/60`
- **Light sections:** alternate `bg-white` and `bg-gray-50`

### Typography
- Font: Inter (sans), JetBrains Mono (mono) — already loaded via next/font
- Hero headlines: `text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight`
- Section headers: `text-2xl md:text-3xl font-bold tracking-tight`
- Section labels: `text-[11px] font-semibold uppercase tracking-widest text-emerald-600` (on light bg) or `text-emerald-400` (on dark bg)
- Body: `text-[15px] text-gray-500 leading-relaxed`
- Small text: `text-[13px] text-gray-500`

### Components
- **Cards:** `rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]` with hover `shadow-[0_4px_12px_rgba(0,0,0,0.08)]` — NO border-based cards
- **Primary button:** `bg-forest-900 text-white rounded-lg hover:bg-forest-800`
- **Secondary button:** `border border-gray-200 text-gray-700 rounded-lg hover:border-gray-300`
- **On dark bg button:** `bg-white text-forest-900 hover:bg-gray-100`
- **Header:** White bg, sticky, blur backdrop, 16h, forest-900 logo, two CTAs right (Request Demo outline + Get Started filled)
- **Footer:** `bg-forest-900`, white logo, `forest-200/60` text, `forest-800` border-t on bottom row

---

## TASK LIST — Do ALL of these:

### 1. COLOR PALETTE MIGRATION (remaining pages)
These pages still use the OLD `sand-*` / `terra-*` palette and need updating:
- `src/app/contact/page.tsx` — swap all sand→gray, terra→emerald, dark sections→forest-900
- `src/app/use-cases/page.tsx` — swap palette, make hero dark (bg-forest-900)
- `src/app/security/page.tsx` — swap palette, make hero dark
- `src/app/blog/page.tsx` — swap palette
- `src/app/blog/[slug]/page.tsx` — swap palette
- `src/app/legal/privacy/page.tsx` — swap palette
- `src/app/legal/terms/page.tsx` — swap palette
- `src/app/not-found.tsx` — swap palette

**The following pages have ALREADY been updated** (do NOT touch unless fixing a bug):
- `src/app/page.tsx` ✅
- `src/app/product/page.tsx` ✅
- `src/app/pricing/page.tsx` ✅
- `src/app/about/page.tsx` ✅
- `src/app/layout.tsx` ✅
- `src/components/layout/Header.tsx` ✅
- `src/components/layout/Footer.tsx` ✅
- `src/components/ui/Badge.tsx` ✅
- `src/components/ui/Button.tsx` ✅
- `src/components/ui/Container.tsx` ✅
- `src/components/home/ProcessMapHero.tsx` ✅
- `src/app/globals.css` ✅

### 2. UX IMPROVEMENTS

**a) Skip-to-content link**
Add `<a href="#main" class="sr-only focus:not-sr-only ...">Skip to content</a>` before Header in layout.tsx. Add `id="main"` to `<main>`.

**b) Blog post table of contents**
Create `src/components/blog/TableOfContents.tsx` — extract h2/h3 headings from the MDX content string (regex on `## ` / `### ` lines), render as a sticky sidebar (desktop) or collapsible section (mobile) on blog post pages. Link to `#slug` anchors (rehype-slug already generates them).

**c) Blog related posts**
At the bottom of each blog post page, show up to 2 related posts (same tag, different slug) with title + date + read time.

**d) Blog RSS feed**
Create `src/app/feed.xml/route.ts` — generate RSS feed using the `feed` package (already in package.json). Export a GET handler that returns XML. Add `<link rel="alternate" type="application/rss+xml">` to layout.tsx head.

**e) Newsletter signup in footer**
Add an email input + submit button to the footer's first column (below the description). Simple form with `placeholder="you@company.com"` and a "Subscribe" button. Client-side only for now (just show "Subscribed!" on submit).

**f) Social sharing on blog posts**
Add share buttons (Twitter/X, LinkedIn, Copy Link) at the bottom of each blog post, above the "related posts" section. Use plain `<a>` tags with share URLs. For Copy Link, use a small client component.

**g) Back to top button**
Create `src/components/ui/BackToTop.tsx` — a "use client" component that shows a small arrow-up button fixed bottom-right when scrolled > 400px. Smooth-scroll to top on click.

**h) Loading states on forms**
In contact page, add a `loading` state to the submit button — show "Sending..." with a spinner while submitting, disable the button. (Simulated with a 1.5s setTimeout for now.)

### 3. SEO

**a) JSON-LD for blog posts**
In `src/app/blog/[slug]/page.tsx`, add Article structured data:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": post.title,
  "description": post.description,
  "datePublished": post.date,
  "author": { "@type": "Person", "name": post.author },
  "publisher": { "@type": "Organization", "name": "Meridian" }
}
```
Render via `<script type="application/ld+json">` in the page component.

**b) Open Graph images**
Add `openGraph.images` to every page's metadata export. Point to `/og.png` as default. For blog posts, use a dynamic description.

**c) Canonical URLs**
Add `alternates.canonical` to metadata on every page.

**d) Blog post meta**
Ensure every blog post page has proper `<meta name="author">` via metadata export.

### 4. ANALYTICS READY

**a) Analytics placeholder**
Create `src/components/Analytics.tsx` — a component that renders a `<!-- Analytics placeholder -->` comment or a Vercel Analytics `<Analytics />` import (from `@vercel/analytics/react` — DO NOT add the package, just add a comment showing where to plug it in).

**b) CTA event tracking**
Add `data-track="cta-hero"`, `data-track="cta-demo"`, `data-track="cta-pricing"` attributes to the main CTA buttons across the site. This makes it trivial to wire up event tracking later.

### 5. PERFORMANCE

**a) Font optimization**
In layout.tsx, add `preconnect` links for Google Fonts if not already present. Already using `display: swap` — good.

**b) Image component**
Create `src/components/ui/OptimizedImage.tsx` — a thin wrapper around next/image that applies standard styling (rounded corners, border, lazy loading). Use this in blog posts when images are added later.

### 6. ACCESSIBILITY

**a) Focus visible styles**
In globals.css, add:
```css
*:focus-visible {
  outline: 2px solid #0F2D24;
  outline-offset: 2px;
}
```

**b) Color contrast**
Verify all text colors meet WCAG AA (4.5:1 for body, 3:1 for large text). The `text-gray-500` on white bg (#737373 on #fff) is 4.6:1 — passes. The `text-forest-200/60` on `forest-900` needs checking — if it fails, bump to `text-forest-200/80`.

**c) ARIA labels**
Ensure all interactive elements (buttons, links, form inputs) have proper labels. The mobile menu button already has aria-label — good.

**d) Heading hierarchy**
Verify every page has exactly one `<h1>` and headings don't skip levels (no h1 → h3).

### 7. COOKIE CONSENT

Create `src/components/CookieConsent.tsx` — a "use client" component that shows a minimal bottom banner: "We use cookies for analytics." with Accept/Decline buttons. Store preference in localStorage. Only show once. Render in layout.tsx.

### 8. MISSING MICRO-INTERACTIONS

**a) Card hover states**
All cards should have smooth transition: `transition-shadow duration-200` with the shadow pattern above.

**b) Link hover underlines**
Navigation links should have subtle underline on hover using `hover:underline underline-offset-4 decoration-1`.

**c) Button press states**
Add `active:scale-[0.98]` to primary buttons for a tactile feel.

**d) Page section entrance**
Use Intersection Observer in a custom hook to add `animate-slide-up` to sections as they scroll into view. Create `src/hooks/useInView.ts`.

---

## HOW TO EXECUTE

1. Read each file before editing
2. Make all changes
3. Run `npx next build` to verify zero errors
4. DO NOT start the dev server
5. DO NOT create any new package.json dependencies (use only what's already installed)
6. DO NOT modify the blog post MDX content files
7. DO NOT modify files marked ✅ above unless fixing a clear bug

## VERIFICATION

After all changes, run `npx next build` and confirm:
- Zero TypeScript errors
- Zero build errors
- All routes render successfully
- No missing imports
