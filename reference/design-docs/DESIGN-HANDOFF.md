# Mybap Design Language v4.1 — Complete Handoff

> **Instrument Modernism.** Precision of a Leica. Warmth of handmade paper.
> Sentence-case buttons, 4px radius controls, warm grays with texture.
> Every decision has a reason.

---

## 1. Fonts

| Role | Family | Fallback |
|------|--------|----------|
| Sans (all UI/body) | Geist | system-ui, -apple-system, sans-serif |
| Mono (machine content) | JetBrains Mono | SF Mono, monospace |

**Google Fonts import:**
```
https://fonts.googleapis.com/css2?family=Geist:wght@200;300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap
```

**Mono rule:** JetBrains Mono is ONLY for machine content — labels, data values, IDs, timestamps, code, badges. Never for body text, headings, buttons, or descriptions.

---

## 2. Color Palette

### Warm Gray Scale

| Token | Hex | Purpose | WCAG on w0 | WCAG on w100 |
|-------|-----|---------|------------|--------------|
| w0 | `#fefdfb` | Paper white — active zones (inputs, focus) | — | — |
| w50 | `#faf9f6` | Subtle surface — inset zones (code blocks, table headers) | — | — |
| w100 | `#f5f4f0` | **Ground** — the page surface. Text reads on this. | — | — |
| w200 | `#e5e4df` | Borders, hairline dividers | — | — |
| w300 | `#d5d4ce` | Muted borders, scrollbar, list bullets, blockquote border | — | — |
| w400 | `#a4a29b` | Placeholders, decorative ONLY. **Fails WCAG AA for text** | 2.5:1 FAIL | 2.3:1 FAIL |
| w500 | `#74726b` | Muted text — labels, meta, status | 4.7:1 AA | 4.4:1 borderline |
| w600 | `#55534c` | Secondary text — body prose, descriptions | 7.4:1 AAA | 6.9:1 AAA |
| w700 | `#3d3b35` | Pullquote text | — | — |
| w900 | `#1a1914` | Primary text, inverse surfaces | 18:1 AAA | 17:1 AAA |

### Accent & Semantic

| Token | Hex | Purpose | WCAG on w0 |
|-------|-----|---------|------------|
| orange | `#ea580c` | Accent — eyebrows, section numbers, active indicators | 5.15:1 AA |
| orange-light | `#fed7aa` | Accent border | — |
| orange-bg | `#fff7ed` | Accent background | — |
| green | `#059669` | Success | 5.42:1 AA |
| amber | `#d97706` | Warning | — |
| red | `#e11d48` | Error | 6.87:1 AA |

### Semantic Color Triads (status)

| Status | Background | Border | Text |
|--------|-----------|--------|------|
| Success | `#ecfdf5` | `#a7f3d0` | `#065f46` |
| Warning | `#fffbeb` | `#fde68a` | `#92400e` |
| Error | `#fff1f2` | `#fecdd3` | `#9f1239` |

### Semantic Text Color Aliases

| Token | Maps to | Usage |
|-------|---------|-------|
| text/primary | w900 | Headings, active text, strong emphasis |
| text/secondary | w600 | Body prose, descriptions |
| text/muted | w500 | Labels, meta, status indicators |
| text/placeholder | w400 | Placeholder text, decorative (WCAG-exempt) |
| text/accent | orange | Eyebrow, section numbers |
| text/error | red | Error messages |
| text/inverse | w0 | Text on dark/inverse surfaces |

---

## 3. Type Scale — 8 Steps

```
48  ━━━━━━━━━━━━━━━━━━  Display          ×1.5
32  ━━━━━━━━━━━━━━━━    Heading           ×1.33
24  ━━━━━━━━━━━━        Title / Metric    ×1.2
20  ━━━━━━━━━━          Sub-heading       ×1.25
16  ━━━━━━━━            Body large        ×1.14
14  ━━━━━━              Body (anchor)     ×1.17
12  ━━━━                Small / Data      ×1.2
10  ━━                  Mono labels
```

**No other sizes exist.** If a new element needs a size, it uses one from this scale.

---

## 4. Line Height — 4 Values

| Token | Value | Usage |
|-------|-------|-------|
| tight | 1.1 | Display headings, metrics (single-line) |
| snug | 1.3 | Titles, sub-headings, dialogs, diagrams |
| normal | 1.5 | Body, UI text, all general text |
| relaxed | 1.7 | Long-form prose, blockquotes, code blocks |

---

## 5. Letter Spacing — 4 Values

| Token | Value | Usage |
|-------|-------|-------|
| tight | -0.02em | Display type (32px+) |
| none | 0 | Body, UI, everything default |
| wide | 0.1em | Mono labels — standard uppercase |
| wider | 0.14em | Mono eyebrow — prominent, breathing |

---

## 6. Font Weights

| Weight | Usage | Note |
|--------|-------|------|
| 200 | Display only (48px) | Retina-dependent. Fallback to 300 on low-DPI |
| 300 | Headings, titles, blockquotes, pullquotes, subtitles | Light but legible |
| 400 | Body text, data, code | The default |
| 500 | UI emphasis, labels, buttons, strong, links | Medium |
| 700 | Brand mark only | Single-character, 28×28 container |

---

## 7. Typography Styles — Complete Reference

### Display (Geist Sans)

| Style | Size | Weight | Tracking | Line-height | Color |
|-------|------|--------|----------|-------------|-------|
| display/h1 | 48 | 200 | tight | tight | primary |
| display/h2 | 32 | 300 | tight | tight | primary |
| display/h3 | 24 | 300 | none | snug | primary |
| display/input | 32 | 200 | tight | snug | primary |

### Sub-heading (Geist Sans, 20px tier)

| Style | Size | Weight | Tracking | Line-height | Color |
|-------|------|--------|----------|-------------|-------|
| sub/heading | 20 | 500 | none | snug | primary |
| sub/light | 20 | 300 | none | normal | muted (subtitle) or primary (input) |

### Body (Geist Sans)

| Style | Size | Weight | Tracking | Line-height | Color | Note |
|-------|------|--------|----------|-------------|-------|------|
| body/large | 16 | 400 | none | normal | secondary | Masthead body |
| body/default | 14 | 400 | none | normal | primary | Form content, general |
| body/prose | 14 | 400 | none | relaxed | secondary | Long-form. max-width: 580px |
| body/strong | 14 | 500 | none | relaxed | primary | Bold emphasis in prose |
| body/emphasis | 14 | 400 italic | none | relaxed | secondary | |
| body/link | 14 | 500 | none | relaxed | primary | underline, offset 3px, decoration w300→w900 hover |
| body/strikethrough | 14 | 400 | none | relaxed | placeholder | line-through |

### UI (Geist Sans)

| Style | Size | Weight | Tracking | Line-height | Color |
|-------|------|--------|----------|-------------|-------|
| ui/default | 14 | 500 | none | normal | primary |
| ui/secondary | 14 | 400 | none | normal | secondary |
| ui/small | 12 | 500 | none | normal | inverse (on dark) |
| ui/caption | 12 | 400 | none | normal | secondary or muted |

### Mono (JetBrains Mono) — Only 4 styles + brand

| Style | Size | Weight | Case | Tracking | Color (contextual) |
|-------|------|--------|------|----------|---------------------|
| mono/eyebrow | 10 | 500 | UPPER | wider (0.14em) | accent (orange) or muted |
| mono/label | 10 | 500 | UPPER | wide (0.1em) | secondary, muted, or error |
| mono/data | 12 | 400 | mixed | none | primary, secondary, or muted |
| mono/code | 12 | 400 | mixed | none | primary (lh relaxed) |
| mono/brand | 12 | 700 | mixed | none | inverse on inverse bg |

**Color is NOT part of the text style.** One style, many colors. Applied contextually.

### Mono/code syntax highlighting

| Element | Color |
|---------|-------|
| Default text | w900 (primary) |
| Keywords | w900 + weight 500 |
| Strings | green (`#059669`) |
| Numbers | orange (`#ea580c`) |
| Comments | w400 italic |

### Metric (Geist Sans)

| Style | Size | Weight | Tracking | Line-height | Color |
|-------|------|--------|----------|-------------|-------|
| metric/value | 24 | 300 | tight | tight | primary |

### Blog-specific

| Style | Size | Weight | Tracking | Line-height | Color | Note |
|-------|------|--------|----------|-------------|-------|------|
| blog/subtitle | 20 | 300 | none | normal | muted | Article deck |
| blog/h4 | 16 | 500 | none | normal | primary | Minor heading |
| blog/blockquote | 16 | 300 italic | none | relaxed | muted | Left border 2px w300 |
| blog/pullquote | 24 | 200 | tight | snug | w700 | Large editorial callout |
| blog/caption | 12 | 400 | none | normal | muted | Image/figure caption |
| blog/footnote | 12 | 400 | none | normal | muted | Footnote text |
| blog/footnote-ref | 10 (mono) | 500 | none | — | accent | Superscript |

### Diagram (drawn on surface)

| Style | Size | Weight | Tracking | Line-height | Color | Container |
|-------|------|--------|----------|-------------|-------|-----------|
| mono/diagram | 12 | 400 | none | snug (1.3) | secondary (w600) | **NONE** — no bg, no border, no radius. Sits directly on page surface. Texture bleeds through. |

**Critical:** Diagrams must use `font-feature-settings: "liga" 0` to prevent ligatures. `white-space: pre` for alignment.

---

## 8. Surface Model

**The ground IS the reading surface.** No white floating panels for content.

| Surface | Background | Texture | Border | Shadow | Usage |
|---------|-----------|---------|--------|--------|-------|
| ground | w100 `#f5f4f0` | paper noise 4% | none | none | Page substrate — everything sits here |
| section | transparent | (ground shows) | bottom hairline w200 | none | Horizontal content separation |
| panel | transparent | (ground shows) | 4-side hairline w200 | none | Grouped content zone (dashboard tile, form) |
| inset | w50 `#faf9f6` | none | hairline w200 | none | Table headers, code blocks, input bg |
| active | w0 `#fefdfb` | none | hairline w200 | none | Focused input, selected row — the bright zone |
| readout | w900 `#1a1914` | paper noise 3% | none | none | Metric displays, toasts, hero data — the LCD |
| glass | rgba(250,249,246,0.65) | none | bottom 1px w200 | none | HUD/sticky header. backdrop-filter: blur(12px) brightness(1.12) |
| scrim | rgba(250,249,246,0.7) | none | none | none | Behind modals. backdrop-filter: blur(6px) |

### Paper Texture Specification

```
SVG feTurbulence filter:
  type: fractalNoise
  baseFrequency: 0.65
  numOctaves: 4
  stitchTiles: stitch

Application:
  - Fixed position, covers full viewport
  - pointer-events: none
  - z-index: 10000 (above everything — toasts, modals, ALL content)
  - Light surfaces: opacity 0.04
  - Dark surfaces: opacity 0.03

For Figma: use a noise plugin or import a tiled PNG of the noise at 4% opacity as an overlay layer.
```

### Elevation

| Level | Shadow | Usage |
|-------|--------|-------|
| none | border-only | Cards, panels, badges — the default |
| subtle | `0 1px 2px rgba(26,25,20,0.04), 0 8px 32px rgba(26,25,20,0.06)` | Page containers (marketing only) |
| raised | `0 4px 16px rgba(26,25,20,0.06), 0 24px 64px rgba(26,25,20,0.1)` | Modals, wizards, popovers |

---

## 9. Spacing System (4px base)

| Token | Value | Marketing/Blog | Dashboard |
|-------|-------|---------------|-----------|
| sp/1 | 4px | micro | micro |
| sp/2 | 8px | list item gap | related items |
| sp/3 | 12px | sh-num → sh-title | default gap |
| sp/4 | 16px | minor-heading → content | padding |
| sp/6 | 24px | prose → prose, panel padding, gutters | panel padding |
| sp/8 | 32px | before blockquote, minor-heading top | between groups |
| sp/12 | 48px | sh → content, pullquote margins, before figure | rare |
| sp/16 | 64px | major break | — |
| sp/24 | 96px | section → section, header → body, footnotes top | — |

### Blog Article Spacing Rules (exact)

```
article-header margin-bottom:      96px
article-header padding-bottom:     48px (with bottom hairline)

section → section:                 96px (margin-bottom on body-section)
section-header (sh) margin-bottom: 48px
  sh-num → sh-title gap:           12px

prose → prose:                     24px
prose → sub-heading (h3):          48px (margin-top on sub-heading)
sub-heading → content:             24px (margin-bottom on sub-heading)
prose → minor-heading (h4):        32px (margin-top on minor-heading)
minor-heading → content:           16px (margin-bottom on minor-heading)

before blockquote:                 32px
after blockquote:                  32px
before pullquote:                  48px
after pullquote:                   48px
before figure:                     48px
after figure:                      48px
before code-block:                 24px
after code-block:                  24px
before diagram:                    24px
after diagram:                     24px

list-item → list-item:             8px
list margin-top:                   16px
list margin-bottom:                24px

footnotes margin-top:              96px
footnotes padding-top:             32px (with top hairline)

tags margin-top:                   48px
tag → tag gap:                     8px
```

---

## 10. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| none | 0px | Containers — page edges, sidebar, dashboard frame |
| sm | 4px | Controls — buttons, inputs, cards, badges, code blocks, tags |
| md | 6px | Overlays — dialogs, wizards, popovers |
| pill | 50% | Toggles only — the one organic exception |

---

## 11. Divider System

| Type | Spec | Usage |
|------|------|-------|
| hairline | 1px solid w200 | Sections, panel borders, article header bottom, footnotes top |
| sub-line | 1px solid w100 | Within-panel separators, spec rows, table row borders |
| accent rule | 2px solid w900 | Active tab indicator |
| accent color | 2px solid orange | Active nav indicator, blockquote left border uses w300 |

**Rules:**
- One line between zones, never doubled
- Hairlines always full-width within their container
- Vertical hairlines only for column separation (sidebar edge, table columns)

---

## 12. HUD (Glass Header)

```css
position: sticky; top: 0; z-index: 100;
height: 52px;
background: rgba(250,249,246,0.65);
backdrop-filter: blur(12px) brightness(1.12);
-webkit-backdrop-filter: blur(12px) brightness(1.12);
border-bottom: 1px solid var(--w200);
```

Contains:
- Brand mark: mono/brand in 28×28 dark container (radius sm)
- Brand name: mono/label style, muted color
- Nav links: ui/default (14px/500) for active, w400 for inactive
- Scroll progress: 2px w900 bar at bottom edge

---

## 13. Scroll Behavior

```css
html { scroll-behavior: smooth; }
```

- All heading anchors: `scroll-margin-top: 68px` (clears 52px HUD + 16px breathing)
- Scroll progress bar: JS `IntersectionObserver` or scroll listener
- Scroll spy (left rail): tracks current section, highlights active in orange

---

## 14. Selection & Scrollbar

```css
::selection { background: var(--w900); color: var(--w0); }
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--w300); border-radius: 3px; }
```

---

## 15. Animation

| Token | Value | Usage |
|-------|-------|-------|
| ease-spring | `cubic-bezier(0.22, 1, 0.36, 1)` | UI interactions, hover, open/close |
| ease-out | `cubic-bezier(0, 0, 0.2, 1)` | Subtle transitions, border-color |
| dur-fast | 150ms | Hover color changes, link decoration |
| dur-normal | 250ms | General transitions |
| dur-slow | 400ms | Page-level animations, fade-in |

---

## 16. Z-Index Layers

| Z-index | Layer |
|---------|-------|
| 10000 | Paper texture (covers everything, non-interactive) |
| 9000 | Toast notifications |
| 1000 | Modal + scrim |
| 100 | HUD, dropdowns, popovers, tooltips |
| 10 | Sticky table headers |
| 1 | Content |
| 0 | Ground |

---

## 17. Responsive Breakpoints

| Token | Width | Content rail | Spacing |
|-------|-------|-------------|---------|
| compact | < 768px | padding 48px 16px | sections 64px apart |
| default | 768-1440px | max-width 720px, padding 80px 24px | sections 96px apart |
| wide | > 1440px | same | same |

Display type uses `clamp(32px, 5vw, 48px)` for responsive scaling.

---

## 18. React Component Mapping

| HTML class | React component | Props |
|-----------|----------------|-------|
| `.hud` | `<Hud />` | — |
| `.hud-brand` | `<HudBrand />` | — |
| `.hud-nav` | `<HudNav />` | `links: {label, href, active}[]` |
| `.content-rail` | `<ContentRail />` | `children` |
| `.article-header` | `<ArticleHeader />` | `meta, title, subtitle, author, readingTime` |
| `.body-section` | `<Section />` | `num, label, title, id, children` |
| `.sh` | part of `<Section />` | — |
| `.prose` | `<Prose />` | `children` (supports strong, em, a, code inline) |
| `.sub-heading` | `<Heading level={3} />` | `children, id` |
| `.minor-heading` | `<Heading level={4} />` | `children, id` |
| `.bq` | `<Blockquote />` | `cite, children` |
| `.pullquote` | `<Pullquote />` | `children` |
| `.list.list--ul` | `<List />` | `items: string[]` |
| `.list.list--ol` | `<List ordered />` | `items: string[]` |
| `.code-block` | `<CodeBlock />` | `lang, children` |
| `.diagram` | `<Diagram />` | `children` (pre-formatted ASCII) |
| `.fig` | `<Figure />` | `src, caption` |
| `.footnotes` | `<Footnotes />` | `items: string[]` |
| `.fn-ref` | `<FootnoteRef />` | `num` |
| `.tag-list` | `<TagList />` | `tags: {label, href}[]` |
| `.section-break` | `<SectionBreak />` | — |
| `.site-footer` | `<Footer />` | — |

---

## 19. What This Doc Does NOT Cover (deferred)

- Dashboard/SaaS layout (sidebar, dense grid, data tables)
- Component library (buttons, inputs, modals, tabs, badges, etc.)
- Dark mode
- Iconography system
- Data visualization / chart palette
- Motion choreography (what animates, when, how far)
- Density toggle (compact vs comfortable)

---

## 20. Source Files

| File | Purpose |
|------|---------|
| `mybap-design-system-v4.html` | Original design language (in ~/Downloads) |
| `token.json` | Tokens Studio format — primitives + semantic + typography |
| `typography-specimens.html` | Type specimen sheet with all styles rendered |
| `blog-foundation.html` | Working blog page with all typography in context |
| `DESIGN-HANDOFF.md` | This document |
