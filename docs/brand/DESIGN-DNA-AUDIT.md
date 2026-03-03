# Design DNA Audit — What's Broken and Why It Doesn't Feel Polished

This document is a brutally honest audit of the invisible relationships between your components.
The components themselves are fine. The *connections between them* are not.

---

## The Core Problem

You have **~70 components** that were built independently. Each one looks reasonable in isolation.
But a polished design system isn't a collection of components — it's a **set of constraints** that every
component obeys. Your system is missing those constraints.

Here are the specific breakdowns:

---

## 1. YOU HAVE 20+ FONT SIZES INSTEAD OF 6

A polished system uses **exactly 5-7 text sizes** for everything. You have:

```
9px   — sidebar labels, badge sm, avatar sm
10px  — buttons sm, table headers, breadcrumbs, metric labels, badges, chart labels
11px  — DataTable column menu, chart tooltip values
12px  — buttons md, form labels, tabs, lists, avatar lg, pagination
14px  — input values, list items, dropdown items
18px  — modal titles
20px  — input underline variant
24px  — metric card values
```

The problem isn't that any individual size is wrong. The problem is that **10px, 11px, and 12px all exist**
for elements that serve similar purposes. A table header is 10px. A DataTable column menu item is 11px.
A pagination control is 12px. Why? There's no reason. They should all be the same size.

### What a polished system looks like:

```
SIZE     NAME         USED FOR
10px     micro        table headers, badges, chart axis labels, sidebar labels
12px     small        buttons, form labels, tabs, breadcrumbs, pagination, tags
14px     body         input values, list items, dropdown items, body text
18px     title        modal titles, section headers, card titles
24px     display      metric values, page headlines
48px+    hero         marketing headlines only
```

**Six sizes. No exceptions.** Every text element picks one. If a new component needs text, it picks
from these six. It never invents 11px or 15px or 9px.

**Your violations:**
- `text-[9px]` (sidebar, badge sm) → should be `10px` (micro)
- `text-[11px]` (DataTable column, DarkTooltip) → should be `10px` (micro) or `12px` (small)
- `text-xl / 20px` (underline input) → unusual, should be `18px` (title) or `24px` (display)
- SVG Gauge uses `26px` → should be `24px` (display)

---

## 2. YOU HAVE 4 LETTER-SPACING VALUES DOING 3 JOBS

Current usage across components:

```
tracking-wide     (0.025em)  — Input labels, FormControls, some buttons
tracking-wider    (0.05em)   — Badges, DesignSystem section nav
tracking-widest   (0.1em)    — Table headers, breadcrumbs, chart legends, metric labels
(no tracking)                — Body text, input values
```

The problem: `tracking-wide` and `tracking-wider` are used interchangeably for the same role (mono labels).
Some badges use `tracking-wider`, some labels use `tracking-wide`, some buttons use `tracking-widest`.

### What a polished system looks like:

```
VALUE              NAME         USED FOR
-0.02em            tight        Display/hero text (24px+)
0                  normal       Body text, input values, descriptions
0.1em              wide         ALL mono uppercase text: buttons, labels, headers, badges, breadcrumbs
```

**Three values. That's it.** Every mono uppercase element uses `tracking-widest`. Not sometimes
`tracking-wide`, not sometimes `tracking-wider`. Always `tracking-widest`.

**Your violations:**
- Input labels use `tracking-wide` → should be `tracking-widest`
- Badges use `tracking-wider` → should be `tracking-widest`
- Some buttons use `tracking-wide` → should be `tracking-widest`
- Metric values use `tracking-tight` → correct (display text)

---

## 3. YOU HAVE 3 FONT WEIGHT RULES THAT CONTRADICT EACH OTHER

Current weight usage:

```
font-light  (300)  — modal titles, metric values, underline input
font-normal (400)  — table headers, most text
font-medium (500)  — form labels, switch labels, empty state titles
font-bold   (700)  — buttons, breadcrumb active, sidebar labels
```

The problem: **font-light is used for emphasis** (modal titles, big metric values) but so is
**font-bold** (buttons, active states). Light and bold are both "important" but in opposite ways.
This creates confusion — is light or bold the way to make something stand out?

### What a polished system looks like:

**Pick ONE weight strategy and commit:**

```
WEIGHT     ROLE                    WHERE
400        default                 everything that doesn't need emphasis
500        emphasis                labels, active navigation, form labels
700        action                  buttons ONLY (the one thing you click)
300        display                 large numbers/values ONLY (24px+)
```

Rules:
- `font-light` is ONLY for `display` size (24px+). Never for 18px modal titles.
- `font-bold` is ONLY for buttons. Not breadcrumbs, not sidebar labels.
- `font-medium` is for labels and emphasis. Active breadcrumb = medium, not bold.

**Your violations:**
- Modal titles (`18px font-light`) → should be `18px font-normal` or `font-medium`
- Breadcrumb active (`font-bold`) → should be `font-medium`
- Sidebar popover labels (`font-bold`) → should be `font-medium`
- Table headers (`font-normal`) → fine, but consider `font-medium` for consistency with labels

---

## 4. YOUR TEXT COLORS DON'T MAP TO CLEAR ROLES

Current text color usage:

```
text-braun-900   — primary text, headings, active states, input values
text-braun-700   — table cell data, list items (WHY DIFFERENT FROM 900?)
text-braun-600   — badge neutral text
text-braun-500   — secondary labels, inactive tabs, table headers, chart legends
text-braun-400   — muted/disabled, breadcrumb inactive, axis labels, trend neutral
text-braun-300   — input placeholder
```

The problem: **you use 6 gray levels for text.** A polished system uses **3, maximum 4.**
The difference between `braun-600` and `braun-700` is invisible to users. Between `braun-500`
and `braun-600` is barely perceptible. You're spending contrast budget on distinctions nobody notices.

### What a polished system looks like:

```
COLOR         NAME         USED FOR
braun-900     primary      headings, body text, input values, active nav, table cells
braun-500     secondary    labels, metadata, table headers, inactive tabs, chart legends
braun-400     muted        placeholders, disabled text, axis labels, divider text
white         inverse      text on dark backgrounds (buttons, tooltips)
```

**Three text colors plus inverse. No braun-600. No braun-700. No braun-300.**

**Your violations:**
- Table cells use `text-braun-700` → should be `text-braun-900` (primary, it's data)
- Badge neutral uses `text-braun-600` → should be `text-braun-500` (secondary)
- Input placeholder uses `text-braun-300` → should be `text-braun-400` (muted)

---

## 5. YOUR SPACING IS CLOSE BUT NOT LOCKED

You actually have a decent spacing foundation. Cards use `p-4/p-6/p-8`, buttons have a clear
sm/md/lg scale. But it breaks in the details:

### Table padding diverges for no reason:
```
Table.tsx      → px-6 py-3 (headers), px-6 py-4 (cells)
DataTable.tsx  → px-4 py-3 (headers), px-4 py-3 (cells)
```

Why does Table use `px-6` and DataTable use `px-4`? They're both tables. Pick one.

### Button icon gaps are inconsistent:
```
gap-1.5  — DataTable toolbar buttons
gap-2    — various icon+text combos
gap-3    — Button component icon+text
```

An icon next to text should always have the same gap. Always.

### Card internal spacing varies:
```
MetricCard     → p-4, internal gap-1 (extremely tight)
DashboardCard  → p-4, internal spacing varies
CaseCard       → p-3 (tighter than other cards)
WorkspaceCard  → p-8 (much looser than other cards)
```

### What a polished system looks like:

```
SPACING   NAME         USED FOR
4px       2xs          icon gaps, inline spacing within text
8px       xs           badge padding, tight element gaps, icon-to-text gap
12px      sm           input padding, button padding (sm), between related items
16px      md           card padding (compact), standard gap between siblings
24px      lg           card padding (default), section internal spacing
32px      xl           card padding (spacious), between major sections
48px      2xl          page-level spacing, layout gaps
```

Rules:
- Icon next to text: ALWAYS `xs` (8px / gap-2)
- Inside a card: ALWAYS `lg` (24px / p-6) unless explicitly compact
- Table cell: ALWAYS `sm` horizontal (12px / px-3), `sm` vertical (12px / py-3)
- Between cards in a grid: ALWAYS `md` (16px / gap-4)

---

## 6. YOUR SURFACES DON'T HAVE CLEAR DEPTH RULES

Background layer map:

```
Layer 0 (page)    → bg-braun-50   (#fafafa)
Layer 1 (card)    → bg-white      (#ffffff)
Layer 2 (overlay) → bg-white + shadow-xl
Layer N (tooltip) → bg-braun-900  (inverted)
```

This is actually good. But the rules break because:

### Cards sometimes have shadows, sometimes don't:
```
Card              → border only, no shadow ✓
DashboardCard     → border + shadow-sm + hover:shadow-md ✗
WorkspaceCard     → border + shadow-lg on expand ✗
CanvasControls    → shadow-xl ✗
```

Your design system Foundation section literally says **"Shadows: None / Flat"**.
But then DashboardCard, WorkspaceCard, CanvasControls all use shadows.

### The rule should be:

```
Surface cards & containers   → border border-braun-200, NEVER shadow
Overlays (modal, drawer)     → shadow-xl (they float above everything)
Tooltips & dropdowns         → shadow-lg (small overlays)
Sticky elements (filter bar) → border-b border-braun-200 (no shadow, no blur)
```

**Your violations:**
- `DashboardCard` has `shadow-sm` → remove, use border only
- `WorkspaceCard` has `shadow-lg` on expand → remove
- `CanvasControls` has `shadow-xl` → use `border border-braun-200` instead
- `FilterBar` has `backdrop-blur-md bg-braun-50/90` → use `bg-braun-50 border-b border-braun-200`
- `Card` has `hover:shadow-sm` → remove, use `hover:border-braun-900` only

---

## 7. YOUR HOVER STATES ARE INCONSISTENT

Three different hover patterns exist:

```
Pattern A: Border darkens     → hover:border-braun-900 (cards, buttons)
Pattern B: Background shifts  → hover:bg-braun-50 (rows, nav items)
Pattern C: Shadow appears     → hover:shadow-sm (some cards)
```

### The rule should be:

```
ELEMENT TYPE              HOVER BEHAVIOR
Bordered containers       hover:border-braun-900 (border darkens, nothing else)
Text/row items            hover:bg-braun-50 (subtle background)
Buttons (secondary)       hover:border-braun-900 (border darkens)
Buttons (ghost)           hover:bg-braun-50 (background appears)
Icon buttons              hover:bg-braun-50 (background appears)
Links                     hover:text-braun-900 (color darkens)
```

**Never shadow. Never opacity change. Never multiple things at once.**

---

## 8. YOUR FOCUS STATES ARE LARGELY MISSING

This is the biggest accessibility gap. Most interactive elements have **no visible focus indicator**:

```
Buttons          → no focus style at all
IconButton       → no focus style
Pagination       → no focus style
Dropdown items   → no focus style
Tabs             → focus-visible:bg-braun-50 (partial)
Inputs           → focus:border-braun-900 focus:ring-0 (removes default ring!)
```

### The rule should be:

```
ALL interactive elements → focus-visible:ring-2 focus-visible:ring-braun-900/20
Inputs                   → focus:border-braun-900 (keep) + focus-visible:ring-2 ring-braun-900/20
```

One focus style. Applied everywhere. No exceptions.

---

## 9. YOUR SEMANTIC COLORS AREN'T SYSTEMATIC

Status colors are used but without a consistent structure:

```
SUCCESS:
  bg-emerald-100 text-emerald-800     (Badge)
  text-emerald-600                     (MetricCard trend up)
  bg-emerald-50 border-emerald-200    (ProcessMining ActivityChip)
  text-emerald-500                     (PipelinePrimitives status)

WARNING:
  bg-amber-100 text-amber-900         (Badge)
  bg-amber-50 border-amber-200        (ProcessMining ActivityChip)
  text-amber-600                       (WorkspaceCard health)

ERROR:
  bg-rose-50 text-rose-700            (Button danger)
  bg-rose-100 text-rose-800           (Badge)
  text-rose-600                        (MetricCard trend down, Overlays danger)
```

Every component picks its own shade of green/amber/red. Badge uses `emerald-800`,
MetricCard uses `emerald-600`, ProcessMining uses `emerald-50/200/800`.

### The rule should be:

```
STATUS    BACKGROUND      BORDER          TEXT            ICON/ACCENT
success   emerald-50      emerald-200     emerald-700     emerald-500
warning   amber-50        amber-200       amber-700       amber-500
error     rose-50         rose-200        rose-700        rose-500
```

**One set of values per status. Used identically everywhere.**
No emerald-100 vs emerald-50. No rose-800 vs rose-700. One answer per role.

---

## 10. THE TWO SYSTEMS PROBLEM

Your codebase has TWO completely different design systems co-existing:

```
BRAUN SYSTEM (product UI):          TEXTQL SYSTEM (marketing):
- Tailwind classes                  - CSS custom properties
- font-mono / font-sans             - var(--font-heading) / var(--font-body)
- braun-900 through braun-50        - var(--ink), var(--ink-dark), var(--accent)
- JetBrains Mono + Inter            - Geist Mono + Inter
- Orange accent (#ea580c)           - Green accent (#047A55)
- font-bold buttons                 - font-weight: 400 buttons
- font-weight: 400 body             - font-weight: 260 body
```

These are not just "different themes." They have different font stacks, different weight scales,
different accent colors, different philosophical approaches to emphasis.

This is fine IF they're intentionally separate products. But if you want one brand, you need
to pick one system and sunset the other.

---

## Summary: The 12 Rules You're Missing

These are the invisible constraints that would make everything feel cohesive:

| # | Rule | Current State |
|---|------|--------------|
| 1 | Exactly 6 font sizes | ~12+ sizes used |
| 2 | Exactly 3 letter-spacing values | 4 values used interchangeably |
| 3 | Exactly 4 font weights with clear roles | Weights used inconsistently |
| 4 | Exactly 3 text colors + inverse | 6 gray levels used |
| 5 | Icon-to-text gap is always 8px | 6px, 8px, 12px all used |
| 6 | Card padding is always 24px (p-6) | p-3, p-4, p-6, p-8 all used for "cards" |
| 7 | Table cell padding is always px-4 py-3 | Table.tsx and DataTable.tsx disagree |
| 8 | Cards never have shadows | 4 card components use shadows |
| 9 | One hover pattern per element type | 3 patterns mixed randomly |
| 10 | Every interactive element has focus-visible ring | Most have none |
| 11 | One status color set used everywhere | Each component picks its own shades |
| 12 | One design system, not two | Two parallel systems co-exist |

Fix these 12 things and the entire UI will feel like one expert designed it, even though 70+ components were built independently.
