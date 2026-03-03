# Design Rulebook

Every component, every page, every screen follows these rules. No exceptions.
If a rule doesn't cover your case, extend the rule — don't invent a one-off.

---

## Identity

**What this product is:** The organizational nervous system. It sees every process, every bottleneck,
every pattern. It acts through autonomous agents. It learns. It is calm, precise, and always on.

**The design reflects this:** Swiss precision. Editorial restraint. Information density without noise.
Every pixel earns its place. Nothing decorative. The interface is a tool, not a personality.

**References:** Dieter Rams, Swiss International Style, Anthropic's editorial clarity,
Linear's engineering aesthetic, Palantir's information density.

---

## Typefaces

```
PRIMARY (sans):  Inter                → Tailwind: font-sans
DATA (mono):     JetBrains Mono      → Tailwind: font-mono
ACCENT (serif):  Libre Caslon Text   → Tailwind: font-accent (italic only, rare)
```

Rules:
- `font-sans` is the default. Body text, headings, descriptions, input values.
- `font-mono` is for anything structural: buttons, labels, table headers, badges, metadata, KPIs, navigation.
- `font-accent` is for editorial moments only: pull quotes, hero text, onboarding. Never in product UI.
- In SVG/recharts, use the `FONTS` constant from `src/lib/tokens.ts`. Never hardcode font-family strings.

---

## Type Scale

Six sizes. Nothing else exists.

```
NAME       SIZE    TAILWIND        LINE-HEIGHT    USED FOR
micro      10px    text-[10px]     leading-tight  table headers, badges, chart labels, axis text,
                                                  breadcrumbs, sidebar labels, metadata
small      12px    text-xs         leading-normal buttons, form labels, tabs, pagination, tags,
                                                  tooltips, dropdown items, small body text
body       14px    text-sm         leading-normal input values, table cells, list items, descriptions,
                                                  dropdown menu items, body paragraphs
title      18px    text-lg         leading-snug   modal titles, card titles, section headers,
                                                  drawer titles, page subtitles
display    24px    text-2xl        leading-tight  metric values, KPI numbers, page headlines
hero       48px+   text-5xl+       leading-none   marketing headlines only. never in product UI.
```

Rules:
- There is no 9px. There is no 11px. There is no 15px, 16px, or 20px in the product.
- If you need text and it's not in this table, you're doing it wrong. Pick the closest size.
- `text-base` (16px) is NOT used. It falls between body (14px) and title (18px) — pick one.
- For responsive/marketing hero text, use `clamp()` but the base must be `hero` tier.
- All data/numbers use `tabular-nums`: add `font-variant-numeric: tabular-nums` or `tabular-nums` class.

---

## Type Weights

Four weights. Each has one job.

```
WEIGHT      TAILWIND       JOB                           EXAMPLE
300         font-light     display numbers only           KPI "1,247", metric "98.7%"
400         font-normal    default everything             body text, table cells, inputs, headings
500         font-medium    emphasis & labels              form labels, active nav, section labels
700         font-bold      action (buttons only)          "SUBMIT", "EXPORT", "DELETE"
```

Rules:
- `font-light` ONLY appears at `display` size (24px) or larger. Never on 18px. Never on 14px.
- `font-bold` ONLY appears on buttons. Not breadcrumbs, not sidebar labels, not table headers.
- `font-medium` is for labels and active states. If it needs emphasis but isn't a button, it's medium.
- `font-semibold` (600) does not exist in this system. Do not use it.
- Modal titles: `text-lg font-normal`. Not font-light.
- Active breadcrumb: `font-medium`. Not font-bold.

---

## Letter Spacing

Three values. Memorize them.

```
VALUE               TAILWIND           USED FOR
-0.02em             tracking-tight     display/hero text (24px and above)
0                   (default)          body text, inputs, descriptions, everything at 14px
0.1em               tracking-widest    ALL mono uppercase text: buttons, labels, headers,
                                       badges, breadcrumbs, chart legends, metadata
```

Rules:
- If text is `font-mono uppercase`, it gets `tracking-widest`. Always. No exceptions.
- If text is 24px or larger, it gets `tracking-tight`. Always.
- Everything else: no tracking class at all.
- `tracking-wide` and `tracking-wider` do not exist in this system. Do not use them.

---

## Text Colors

Three colors plus inverse. That's it.

```
ROLE         COLOR              TAILWIND           USED FOR
primary      #09090b            text-braun-900     headings, body text, input values, active nav,
                                                   table cells, labels that need to be read
secondary    #71717a            text-braun-500     metadata, table headers, inactive tabs, chart
                                                   legends, timestamps, helper text, placeholders
                                                   that need to be somewhat visible
muted        #a1a1aa            text-braun-400     disabled text, placeholders, axis labels,
                                                   empty state icons, truly background information
inverse      #ffffff            text-white         text on dark backgrounds: primary buttons,
                                                   tooltips, dark badges
```

Rules:
- `text-braun-700` does not exist. Table cells are `text-braun-900`. Period.
- `text-braun-600` does not exist. If it's secondary, use 500. If it's primary, use 900.
- `text-braun-300` does not exist. If it's muted, use 400.
- Input placeholders: `placeholder:text-braun-400`. Not 300.
- Accent text (highlights, links): `text-braun-orange` (#ea580c). Used sparingly.

---

## Background Layers

Three layers. Each has one background color.

```
LAYER        COLOR           TAILWIND         WHAT SITS HERE
ground       #fafafa         bg-braun-50      the page itself, the canvas
surface      #ffffff         bg-white         cards, modals, drawers, sidebar, inputs, tables
overlay      #09090b         bg-braun-900     tooltips, dark badges, inverted elements
```

Rules:
- Ground is the default. The page is always `bg-braun-50`.
- Surface sits on top of ground. Cards, panels, modals = `bg-white`.
- There is no `bg-braun-100` for backgrounds. Hover states use `bg-braun-50` (on surfaces) or `bg-braun-100` only for selected rows.
- Sticky bars (filter bars, toolbars): `bg-braun-50 border-b border-braun-200`. No blur, no transparency.
- Modal scrim: `bg-braun-900/20 backdrop-blur-sm`. This is the only place backdrop-blur exists.

---

## Borders

One width. Two colors. Clear rules.

```
ELEMENT                    BORDER
Cards, inputs, tables      border border-braun-200
Dividers (horizontal)      border-b border-braun-200  (or h-px bg-braun-200)
Row separators             divide-y divide-braun-100
Active/selected            border-braun-900
Dashed (empty/add)         border border-dashed border-braun-300
Error state                border-rose-500
```

Rules:
- Border width is ALWAYS 1px (the default `border`). Never `border-2`.
- There is no `border-braun-100` on containers. That's for row dividers only (divide-y).
- Checkbox/radio borders: `border-braun-300` unchecked → `border-braun-900` checked. That's the only place `braun-300` borders appear.
- No rounded corners. Everything is square. `rounded-none` or no rounded class. The only exception: `rounded-sm` on badges (2px radius, barely visible).

---

## Shadows

Almost never.

```
ELEMENT                    SHADOW
Cards, surfaces            NONE. Never. Border only.
Hover states               NONE. Border color change only.
Modals, drawers            shadow-xl
Dropdowns, select menus    shadow-lg
Tooltips                   shadow-md
Everything else            NONE
```

Rules:
- If it's inside the page flow (cards, dashboard cards, metric cards, workspace cards), it has NO shadow.
- If it floats above the page (modal, drawer, dropdown, tooltip), it has shadow.
- `shadow-sm` does not exist in this system. It's too subtle to be intentional.
- `shadow-2xl` does not exist. `shadow-xl` is the maximum.
- `hover:shadow-*` does not exist. Hover changes borders, not shadows.

---

## Spacing Scale

Seven values. Based on 4px increments.

```
TOKEN    VALUE    TAILWIND        USED FOR
3xs      2px      0.5             hairline gaps (rarely needed)
2xs      4px      1               icon internal padding, tight inline gaps
xs       8px      2               icon-to-text gap, badge padding, compact element gaps
sm       12px     3               input padding, button padding (sm), between related items
md       16px     4               card padding (compact), standard sibling gap, grid gap
lg       24px     6               card padding (default), section internal spacing
xl       32px     8               card padding (spacious), between major sections
```

---

## Component Spacing Rules

These are non-negotiable. Every component follows them.

```
COMPONENT                    INTERNAL PADDING    CONTENT GAP
Button (sm)                  px-3 py-1.5         gap-2 (icon+text)
Button (md)                  px-6 py-3           gap-2 (icon+text)
Button (lg)                  px-8 py-4           gap-2 (icon+text)
Badge (sm)                   px-1.5 py-0.5       —
Badge (md)                   px-2 py-1           —
Card                         p-6                 — (content manages its own gaps)
Card (compact)               p-4                 —
Input                        px-3 py-3           —
Table header cell            px-4 py-3           —
Table body cell              px-4 py-3           — (same as header, not different)
Modal header/body/footer     px-6 py-4           —
Dropdown item                px-4 py-2           gap-2 (icon+text)
Tooltip                      px-3 py-1.5         —
Sidebar (vertical)           py-6                gap-1 (between nav items)
```

Rules:
- Icon-to-text gap is ALWAYS `gap-2` (8px). In buttons, in dropdowns, in list items, in badges. Always.
- Cards are ALWAYS `p-6` unless explicitly compact (`p-4`). There is no `p-3` card. There is no `p-8` card.
- Table cells (BOTH Table.tsx and DataTable.tsx) use `px-4 py-3`. Unify them.
- MetricCard internal gap: `gap-2` (not `gap-1`).
- Grid of cards: `gap-4` (16px). Always.
- Between major page sections: `gap-8` (32px).

---

## Hover States

One pattern per element type. Memorize it.

```
ELEMENT TYPE               HOVER EFFECT
Cards & containers         hover:border-braun-900 (border darkens)
Table rows                 hover:bg-braun-50 (background appears)
Buttons (primary)          hover:bg-braun-800 (background lightens slightly)
Buttons (secondary)        hover:border-braun-900 (border darkens)
Buttons (ghost)            hover:bg-braun-100 (background appears)
Icon buttons               hover:bg-braun-100 (background appears)
Nav items                  hover:bg-braun-50 hover:text-braun-900
Links / text actions       hover:text-braun-900 (text darkens)
Dropdown items             hover:bg-braun-50 (background appears)
Tags / badges              hover:border-braun-400 (border darkens slightly)
```

Rules:
- ONE hover effect per element. Never border AND shadow. Never background AND opacity.
- No `hover:shadow-*` anywhere. Ever.
- Active press state for buttons: `active:translate-y-px`. Subtle physical feedback.

---

## Focus States

One pattern. Applied everywhere.

```
ALL interactive elements:  focus-visible:ring-2 focus-visible:ring-braun-900/20 outline-none
Inputs (additionally):     focus:border-braun-900 focus:bg-white
```

Rules:
- Every button, link, tab, pagination control, checkbox, radio, switch, dropdown trigger MUST have
  `focus-visible:ring-2 focus-visible:ring-braun-900/20 outline-none`.
- Do NOT use `focus:ring-0` to remove the ring. That was wrong.
- The ring is `braun-900/20` (very subtle, 20% opacity). It's visible but doesn't scream.

---

## Active / Selected States

```
ELEMENT                    SELECTED STATE
Tab                        text-braun-900 + bottom bar indicator (h-0.5 bg-braun-900)
Sidebar nav item           bg-braun-50 text-braun-900 ring-1 ring-braun-900/10
Pagination page            bg-braun-900 text-white border-braun-900 (inverted)
Segmented control          bg-braun-900 text-white (inverted)
Table row                  bg-braun-100 (highlighted background)
Breadcrumb (current)       text-braun-900 bg-braun-100 font-medium
Checkbox/Radio             border-braun-900 bg-braun-900 (filled)
```

---

## Status Colors

One set. Used identically everywhere.

```
STATUS      BG              BORDER           TEXT            ICON/INLINE
success     bg-emerald-50   border-emerald-200  text-emerald-700   text-emerald-500
warning     bg-amber-50     border-amber-200    text-amber-700     text-amber-500
error       bg-rose-50      border-rose-200     text-rose-700      text-rose-500
info        bg-sky-50       border-sky-200      text-sky-700       text-sky-500
```

Rules:
- These are the ONLY non-braun colors allowed in the product.
- Every Badge success, every trend-up indicator, every process-node success state, every form
  validation success uses THESE EXACT values. Not emerald-100, not emerald-600, not emerald-800.
- Trend up: `text-emerald-500`. Trend down: `text-rose-500`. Trend neutral: `text-braun-400`.
- Button danger variant: `bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100`.
- `blue-600` does not exist. The ProcessingNode active state uses `bg-braun-900 text-white`.

---

## Accent Color

```
COLOR        HEX        TAILWIND            USED FOR
orange       #ea580c    text-braun-orange    active indicators, hover highlights, accent borders,
                        bg-braun-orange      highlighted metric values, link hover states
```

Rules:
- Orange is the ONLY accent. There is no secondary accent color.
- Use sparingly: 5% of any given screen, maximum.
- Never use orange for backgrounds of large areas. Only text, small indicators, borders.

---

## Icons

```
LIBRARY:     lucide-react
DEFAULT SIZE: 16px (w-4 h-4)
```

```
CONTEXT              SIZE              TAILWIND
Inline with text     16px              w-4 h-4
Buttons              16px              w-4 h-4
Sidebar nav          20px              w-5 h-5
Empty states         24px              w-6 h-6
Feature/hero         32px              w-8 h-8
```

Rules:
- Icon stroke weight: use default (2px). Do not customize.
- Icon color: inherits text color. Do not set icon color separately.
- Gap between icon and text: ALWAYS `gap-2` (8px).

---

## Motion

```
DURATION      TAILWIND           USED FOR
0ms           duration-0         instant state changes (checkbox, radio)
150ms         duration-150       hover effects, color transitions
200ms         duration-200       enter animations, expand/collapse
300ms         duration-300       page transitions, modal enter/exit
```

```
EASING        TAILWIND           USED FOR
ease-out      ease-out           elements entering (appearing)
ease-in       ease-in            elements exiting (disappearing)
ease-in-out   ease-in-out        layout shifts, repositioning
```

Rules:
- Default transition: `transition-colors duration-150`. Applied to all interactive elements.
- Enter animations: `duration-200 ease-out`. Fade in + slight slide.
- Exit animations: `duration-150 ease-in`. Faster than enter (things should leave quickly).
- NEVER animate `width`, `height`, `top`, `left`. Only `transform`, `opacity`, `color`, `border-color`, `background-color`.
- ALWAYS respect `prefers-reduced-motion`. Wrap animations in `motion-safe:` prefix.
- Button press: `active:translate-y-px`. That's 1px downward on click. Subtle physical feedback.

---

## Layout

```
ELEMENT              SPECIFICATION
Page background      bg-braun-50 min-h-screen
Sidebar              w-20 (80px) fixed left, bg-white, border-r border-braun-200
Header               h-16 (64px), bg-transparent, px-8
Main content         pl-20 (offset for sidebar), px-8 py-8
Max content width    max-w-7xl (1280px) for prose/forms. No max for dashboards.
Card grid            grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4
```

---

## The Mono Uppercase Pattern

This is the signature of the system. Any time text is structural/navigational/metadata:

```
font-mono text-[10px] uppercase tracking-widest text-braun-500
```

Used for: table headers, chart axis labels, badge text, breadcrumb text, sidebar labels,
metric card labels, chart legend labels, filter labels, timestamp displays.

At `small` size (buttons, tabs, form labels):

```
font-mono text-xs uppercase tracking-widest
```

This pattern is what makes the UI feel designed. Apply it consistently and the whole system
locks in.

---

## Checklist: Before Shipping Any Component

- [ ] Uses only the 6 font sizes (10, 12, 14, 18, 24, 48+)
- [ ] Uses only the 4 font weights (300, 400, 500, 700 — each in its correct role)
- [ ] Uses only 3 text colors (900, 500, 400) + inverse
- [ ] Mono uppercase text has `tracking-widest`
- [ ] Card/container has `border border-braun-200` and NO shadow
- [ ] All interactive elements have `focus-visible:ring-2 focus-visible:ring-braun-900/20`
- [ ] Hover effect matches the element type (see Hover States table)
- [ ] Status colors use the exact values from the Status Colors table
- [ ] Spacing uses values from the spacing scale (no arbitrary values)
- [ ] Icon-to-text gap is `gap-2`
- [ ] No hardcoded hex colors (use Tailwind classes or tokens.ts constants)
- [ ] Numbers use `tabular-nums`
