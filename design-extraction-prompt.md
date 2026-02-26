# Design System Extraction Prompt

Use this prompt when you want to extract a website's design language into a reusable HTML component library for Figma.

---

## The Prompt

```
Go to [WEBSITE URL] and extract their design system into a standalone HTML component library file.

I want to build my own website using this design language. Do NOT copy their content,
hero copy, product UI, or any fake mockups. Only extract the reusable design primitives.

The output is a single HTML file where every component is shown in isolation,
labeled, on the site's actual background texture/color, ready to screenshot into Figma.

Extract and build every component you find:

TOKENS
- Color palette — all colors as labeled swatches with hex values
- Typography scale — every text style (display, h1, h2, h3, body, caption, label, mono)
  shown with actual rendered text, font name, size, weight, line-height, letter-spacing
- Spacing system — all spacing values visualized as bars with px labels

COMPONENTS
- Announcement banner (if present)
- Navigation bar — exact height, logo treatment, link styles, CTA buttons
- All button variants — every state (primary, secondary, ghost, disabled)
- All badge/tag/pill variants
- Eyebrow / section label styles
- Form elements — text input, email input, textarea, inline button combo
- All card types — feature card, testimonial/quote card, stat/metric card,
  any other card pattern found on the site
- Logo strip / trusted-by row
- Any chip or connector component

LAYOUT PATTERNS
- Grid container (max-width, padding, any vertical/horizontal rail system)
- All section divider styles (hairlines, full-width rules, decorative separators)
- 2-column section layout
- 3-column grid layout
- 4-column grid layout

FOOTER
- Full footer component with all columns, dark/light background, newsletter input

RULES
- Use their exact fonts (find the font stack from the page source or Google Fonts links)
- Use their exact colors (extract from CSS variables or computed styles)
- Use their exact spacing values if available (CSS custom properties)
- Use their actual background texture/image URL if publicly accessible
- Square vs rounded corners — match exactly what the site uses
- Font weights — match exactly (they may use unusual weights like 260, 350)
- NO placeholder lorem ipsum for component names — use generic labels like
  "Feature Title", "Body copy goes here", "Company A", "Link One"
- NO invented product UI, screenshots, chat interfaces, or data tables
- Every component gets a small label above it showing its name
- Components are separated with clear visual spacing

Output: one clean HTML file, no frameworks, no build step, pure HTML + CSS.
```

---

## Tips for Best Results

**Be specific about what you want back:**
- "Component library for Figma import" → gets you isolated, labeled components
- "Hero section" → gets you a full page layout (different thing)

**If the site has a public blog or docs page**, mention it — Claude can read its
CSS source directly to get exact tokens rather than guessing from screenshots.

**If colors/fonts are wrong** after the first pass, say:
> "Check the page source for CSS custom properties / CSS variables and use those exact values"

**For fonts specifically**, say:
> "Find the exact Google Fonts URL or @font-face declarations from the page source"

**After you get the file**, open it in a browser, take a full-page screenshot
(browser → Print → Save as PDF works well), then import into Figma with the
PDF import or a plugin like "PDF to Figma".

---

## What You Get

A single HTML file organized like this:

```
[Background = site's actual paper/texture background]

── TOKENS ──────────────────────────────
  Colors · Typography · Spacing

── COMPONENTS ──────────────────────────
  Banner · Nav · Buttons · Tags · Forms · Cards

── LAYOUTS ─────────────────────────────
  2-col · 3-col · 4-col · Grid container

── FOOTER ──────────────────────────────
  Full footer
```

Each section is labeled. Screenshot → Figma. Done.
