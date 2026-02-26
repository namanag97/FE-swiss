# Applying a Theme to Your Component Library

A practical reference for rethreading existing components — built on Geist Mono / Inter, square buttons, and the emerald token set — into two distinct visual identities. Paste the CSS block into your `:root {}` and follow the manual steps for anything variables alone cannot express.

---

## Base Token Reference

The components consume these tokens. Both themes override every one of them.

```css
:root {
  /* Typography */
  --font-heading: "Geist Mono", monospace;
  --font-body:    "Inter", sans-serif;

  /* Colors */
  --ink-dark:  #072A20;
  --ink-mid:   #3D5D55;
  --ink:       #2E3B36;
  --emerald:   #047A55;
  --bg:        #FAFBF8;
  --border:    rgba(46, 59, 54, 0.10);

  /* Spacing (4px base) */
  --sp-1: 4px;
  --sp-2: 8px;
  --sp-3: 12px;
  --sp-4: 16px;
  --sp-5: 24px;
  --sp-6: 32px;
  --sp-7: 64px;

  /* Shape */
  --radius: 0px;
}
```

---

## Theme 1: Swiss / International Typographic Style

### Principles

Pure black and white. One optional accent (red). Mathematical grid. Maximum contrast. No gradients, no box shadows, no decorative radius. Typography carries all hierarchy — size, weight, and tight leading do the work.

### CSS Overrides

```css
/* ============================================================
   THEME: Swiss / International Typographic Style
   Paste this block into your :root {} or as a scoped selector
   e.g.  [data-theme="swiss"] { ... }
   ============================================================ */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
/* Neue Haas Grotesk must be licensed separately (see Manual Steps).
   This stack falls back gracefully. */

:root {
  /* --- Typography --- */
  --font-heading: "Neue Haas Grotesk Display", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-body:    "Neue Haas Grotesk Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-mono:    "Courier New", Courier, monospace;

  /* --- Core Colors --- */
  --ink-dark:   #000000;   /* replaces deep forest — now pure black              */
  --ink-mid:    #4A4A4A;   /* replaces mid-green — now mid gray                  */
  --ink:        #000000;   /* replaces ink — now pure black                      */
  --emerald:    #E63329;   /* replaces emerald accent — Swiss red accent          */
                           /* set to #000000 if you prefer no accent at all       */
  --bg:         #FFFFFF;   /* pure white canvas                                  */
  --border:     #000000;   /* 1px solid black borders, no opacity                */

  /* --- Derived semantic aliases (add these if your components use them) --- */
  --color-primary:        #000000;
  --color-primary-hover:  #E63329;   /* accent on interactive hover               */
  --color-accent:         #E63329;
  --color-surface:        #FFFFFF;
  --color-surface-raised: #F5F5F5;   /* barely-there off-white for grouped areas  */
  --color-muted:          #767676;   /* passes 4.5:1 on white                     */
  --color-danger:         #E63329;
  --color-success:        #000000;   /* no green — use weight/label instead       */

  /* --- Typography Scale --- */
  --text-xs:   10px;
  --text-sm:   12px;
  --text-base: 14px;
  --text-lg:   16px;
  --text-xl:   20px;
  --text-2xl:  28px;
  --text-3xl:  40px;
  --text-4xl:  64px;

  --leading-tight:  1.0;
  --leading-body:   1.4;
  --tracking-caps:  0.12em;   /* uppercase labels / buttons                      */
  --tracking-tight: -0.02em;  /* large display headlines                         */

  /* --- Spacing (unchanged — grid stays mathematical) --- */
  --sp-1: 4px;
  --sp-2: 8px;
  --sp-3: 12px;
  --sp-4: 16px;
  --sp-5: 24px;
  --sp-6: 32px;
  --sp-7: 64px;

  /* --- Shape: zero radius everywhere --- */
  --radius:        0px;
  --radius-sm:     0px;
  --radius-md:     0px;
  --radius-lg:     0px;
  --radius-full:   0px;

  /* --- Elevation: borders only, never shadows --- */
  --shadow-sm:  none;
  --shadow-md:  none;
  --shadow-lg:  none;
  --card-border: 1px solid #000000;

  /* --- Button tokens --- */
  --btn-font:        var(--font-heading);
  --btn-size:        10px;
  --btn-weight:      700;
  --btn-tracking:    var(--tracking-caps);
  --btn-transform:   uppercase;
  --btn-radius:      0px;
  --btn-padding-x:   var(--sp-4);
  --btn-padding-y:   var(--sp-2);

  /* Primary button */
  --btn-primary-bg:           #FFFFFF;
  --btn-primary-color:        #000000;
  --btn-primary-border:       1px solid #000000;
  --btn-primary-bg-hover:     #000000;
  --btn-primary-color-hover:  #FFFFFF;

  /* Secondary button */
  --btn-secondary-bg:           transparent;
  --btn-secondary-color:        #000000;
  --btn-secondary-border:       1px solid #000000;
  --btn-secondary-bg-hover:     #000000;
  --btn-secondary-color-hover:  #FFFFFF;

  /* Danger button */
  --btn-danger-bg:          #E63329;
  --btn-danger-color:       #FFFFFF;
  --btn-danger-border:      1px solid #E63329;
  --btn-danger-bg-hover:    #000000;
  --btn-danger-color-hover: #FFFFFF;

  /* --- Input tokens --- */
  --input-bg:           #FFFFFF;
  --input-border:       1px solid #000000;
  --input-border-focus: 1px solid #000000;
  --input-ring:         none;
  --input-radius:       0px;
  --input-color:        #000000;
  --input-placeholder:  #767676;

  /* --- Card tokens --- */
  --card-bg:      #FFFFFF;
  --card-radius:  0px;
  --card-shadow:  none;
  --card-padding: var(--sp-5);
}
```

### Button Hover (add to your stylesheet)

Variables alone cannot express two-state hover. Add this rule once:

```css
/* Swiss button hover — invert fill */
.btn-primary:hover,
.btn-secondary:hover {
  background-color: var(--btn-primary-bg-hover);
  color:            var(--btn-primary-color-hover);
  border-color:     var(--btn-primary-bg-hover);
}
```

### What to Change Manually

| Thing | Why CSS variables cannot fix it | What to do |
|---|---|---|
| Font import | `@import` inside `:root {}` is ignored by browsers | Add `<link>` for Inter in `<head>`; purchase and self-host Neue Haas Grotesk (Linotype/Monotype) |
| `border-radius` on individual components | Many component libraries hardcode radius via utility classes (e.g., Tailwind `rounded-md`) rather than reading a CSS variable | Audit each component and replace `rounded-*` classes with `rounded-none`, or set `--radius: 0` in your Tailwind config |
| Box shadows on dropdowns / popovers | Libraries like Radix emit `box-shadow` directly in component CSS | Override per-component: `.your-dropdown { box-shadow: none; border: 1px solid #000; }` |
| Image assets / illustrations | Colorful icons and illustrations break the monochrome aesthetic | Replace with geometric SVGs or inline icon fonts; filter: `grayscale(1)` is a quick stopgap |
| Focus rings | Default browser outlines are blue; Swiss aesthetic uses thin black outlines | Add `:focus-visible { outline: 2px solid #000; outline-offset: 2px; }` globally |
| Transition / animation | Swiss style avoids decorative motion | Remove or reduce `transition-duration` values; disable CSS animations where possible |

---

## Theme 2: Palantir Light (Blueprint.js-Inspired)

### Principles

Based on Palantir's Blueprint.js design system. White surfaces, near-black text, blue primary action, light gray borders. Utilitarian and data-dense — every pixel earns its place. Slightly rounded corners (2–3px) to soften without feeling consumer. System font stack for OS-native rendering.

Blueprint.js color scale reference (light theme):
- `DARK_GRAY1` #1C2127 — primary text
- `GRAY1` #5F6B7C — muted text
- `LIGHT_GRAY1` #D3D8DE — borders
- `LIGHT_GRAY4` #EDEFF2 — elevated surfaces
- `LIGHT_GRAY5` #F6F7F9 — app background
- `BLUE3` #2D72D2 — primary intent
- `RED3` #CD4246 — danger intent
- `GREEN3` #238551 — success intent

### CSS Overrides

```css
/* ============================================================
   THEME: Palantir Light (Blueprint.js-inspired)
   Paste this block into your :root {} or as a scoped selector
   e.g.  [data-theme="palantir-light"] { ... }
   ============================================================ */

:root {
  /* --- Typography --- */
  --font-heading: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                  "Helvetica Neue", Arial, sans-serif;
  --font-body:    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                  "Helvetica Neue", Arial, sans-serif;
  --font-mono:    "SFMono-Regular", Consolas, "Liberation Mono", Menlo,
                  Courier, monospace;

  /* --- Core Color Remapping --- */
  --ink-dark:   #1C2127;   /* DARK_GRAY1 — primary text, headings               */
  --ink-mid:    #5F6B7C;   /* GRAY1 — secondary/muted text                      */
  --ink:        #1C2127;   /* same as ink-dark for consistency                  */
  --emerald:    #2D72D2;   /* BLUE3 — replaces emerald as primary action color  */
  --bg:         #F6F7F9;   /* LIGHT_GRAY5 — app-level background                */
  --border:     #D3D8DE;   /* LIGHT_GRAY1 — borders and dividers                */

  /* --- Semantic Color Aliases --- */
  --color-primary:          #2D72D2;   /* BLUE3                                  */
  --color-primary-hover:    #215DB0;   /* BLUE2 — darker on hover                */
  --color-primary-active:   #184A90;   /* BLUE1 — pressed state                  */
  --color-primary-subtle:   #ECF3FD;   /* tint for selected rows, hover surfaces */

  --color-accent:           #2D72D2;
  --color-surface:          #FFFFFF;   /* card / panel backgrounds               */
  --color-surface-raised:   #EDEFF2;   /* LIGHT_GRAY4 — elevated panels          */
  --color-surface-hover:    #F6F7F9;   /* LIGHT_GRAY5 — row hover                */
  --color-muted:            #5F6B7C;   /* GRAY1                                  */

  --color-success:          #238551;   /* GREEN3                                 */
  --color-success-subtle:   #EBF5F0;
  --color-warning:          #C87619;   /* ORANGE3                                */
  --color-warning-subtle:   #FEF3E2;
  --color-danger:           #CD4246;   /* RED3                                   */
  --color-danger-subtle:    #FCEAEA;

  /* --- Typography Scale --- */
  --text-xs:    11px;
  --text-sm:    12px;
  --text-base:  14px;   /* Blueprint default body size                          */
  --text-lg:    16px;
  --text-xl:    18px;
  --text-2xl:   20px;
  --text-3xl:   24px;
  --text-4xl:   32px;

  --leading-body:   1.5;
  --leading-tight:  1.25;
  --tracking-caps:  0.06em;
  --font-weight-heading: 600;
  --font-weight-body:    400;

  /* --- Spacing (unchanged) --- */
  --sp-1: 4px;
  --sp-2: 8px;
  --sp-3: 12px;
  --sp-4: 16px;
  --sp-5: 24px;
  --sp-6: 32px;
  --sp-7: 64px;

  /* --- Shape: 2px radius — slightly rounded, not consumer-soft --- */
  --radius:      2px;
  --radius-sm:   2px;
  --radius-md:   3px;
  --radius-lg:   4px;   /* modals, large panels only                            */
  --radius-full: 10px;  /* pill badges only                                     */

  /* --- Elevation --- */
  --shadow-sm: 0 1px 2px rgba(17, 20, 24, 0.10),
               0 0   0 1px rgba(17, 20, 24, 0.06);
  --shadow-md: 0 2px 6px rgba(17, 20, 24, 0.14),
               0 0   0 1px rgba(17, 20, 24, 0.08);
  --shadow-lg: 0 8px 24px rgba(17, 20, 24, 0.14),
               0 2px  8px rgba(17, 20, 24, 0.08),
               0 0    0 1px rgba(17, 20, 24, 0.06);
  --card-border: 1px solid #D3D8DE;

  /* --- Button tokens --- */
  --btn-font:        var(--font-body);
  --btn-size:        14px;
  --btn-weight:      600;
  --btn-tracking:    normal;
  --btn-transform:   none;
  --btn-radius:      var(--radius-sm);
  --btn-padding-x:   var(--sp-4);
  --btn-padding-y:   var(--sp-2);

  /* Primary (blue) */
  --btn-primary-bg:           #2D72D2;
  --btn-primary-color:        #FFFFFF;
  --btn-primary-border:       1px solid #2D72D2;
  --btn-primary-bg-hover:     #215DB0;
  --btn-primary-color-hover:  #FFFFFF;

  /* Secondary (ghost) */
  --btn-secondary-bg:           #FFFFFF;
  --btn-secondary-color:        #1C2127;
  --btn-secondary-border:       1px solid #D3D8DE;
  --btn-secondary-bg-hover:     #EDEFF2;
  --btn-secondary-color-hover:  #1C2127;

  /* Danger */
  --btn-danger-bg:          #CD4246;
  --btn-danger-color:       #FFFFFF;
  --btn-danger-border:      1px solid #CD4246;
  --btn-danger-bg-hover:    #AC2F33;
  --btn-danger-color-hover: #FFFFFF;

  /* Minimal / ghost (data table actions) */
  --btn-minimal-bg:           transparent;
  --btn-minimal-color:        #1C2127;
  --btn-minimal-border:       1px solid transparent;
  --btn-minimal-bg-hover:     #EDEFF2;
  --btn-minimal-color-hover:  #1C2127;

  /* --- Input tokens --- */
  --input-bg:           #FFFFFF;
  --input-border:       1px solid #D3D8DE;
  --input-border-focus: 1px solid #2D72D2;
  --input-ring:         0 0 0 2px rgba(45, 114, 210, 0.20);
  --input-radius:       var(--radius-sm);
  --input-color:        #1C2127;
  --input-placeholder:  #5F6B7C;
  --input-height:       30px;   /* Blueprint uses compact 30px inputs           */

  /* --- Card / Panel tokens --- */
  --card-bg:      #FFFFFF;
  --card-radius:  var(--radius-sm);
  --card-shadow:  var(--shadow-sm);
  --card-padding: var(--sp-4);

  /* --- Table tokens (data-dense) --- */
  --table-header-bg:    #F6F7F9;
  --table-header-color: #5F6B7C;
  --table-header-size:  11px;
  --table-header-weight: 600;
  --table-row-border:   1px solid #EDEFF2;
  --table-row-hover-bg: #F6F7F9;
  --table-row-selected-bg: #ECF3FD;

  /* --- Tag / Badge tokens --- */
  --tag-radius:   var(--radius-sm);
  --tag-size:     11px;
  --tag-weight:   600;
  --tag-tracking: 0.04em;

  /* --- Callout / Toast --- */
  --callout-radius:   var(--radius-sm);
  --callout-border-l: 3px solid currentColor;
}
```

### What to Change Manually

| Thing | Why CSS variables cannot fix it | What to do |
|---|---|---|
| Font stack override | Component libraries that import Google Fonts (Geist Mono, Inter) via `<link>` will override your system-font stack | Remove those `<link>` tags from `<head>` — system-ui renders immediately with no network cost |
| Button `text-transform: uppercase` | If your base theme sets `text-transform: uppercase` on buttons via a class, a CSS variable cannot undo it | Add `.btn { text-transform: none; letter-spacing: normal; font-size: 14px; }` to your override stylesheet |
| `border-radius` utility classes | Tailwind / CSS Modules that hardcode `rounded-md` ignore your `--radius` variable | In Tailwind config set `theme.borderRadius.DEFAULT` to `2px`; or do a codebase find-and-replace of `rounded-md` / `rounded-lg` to `rounded-sm` |
| Geist Mono on button labels | Base theme uses Geist Mono for buttons; Palantir Light uses system sans | Override `.btn { font-family: var(--font-body); }` explicitly — `--btn-font` only works if your component reads that token |
| Icon set | Blueprint uses its own blueprint-icons SVG set (16px, 20px grid) | You do not have to adopt Blueprint icons, but size icons to 16px and use `#5F6B7C` for default / `#1C2127` for active to match the aesthetic |
| Condensed table row height | Blueprint defaults to 30px row height for data density | If your table rows are taller, add `tr { height: 30px; } td { padding: 0 8px; }` |
| Focus ring color | Default browser / library focus ring is often green (from `--emerald`) | Add globally: `:focus-visible { outline: 2px solid #2D72D2; outline-offset: 2px; }` |
| Popover / tooltip shadow | Radix / Floating UI components often compute shadows inline | Target the data attribute: `[data-radix-popper-content-wrapper] { box-shadow: var(--shadow-md); }` |
| Monospace font for data cells | Blueprint uses `SFMono-Regular` / Consolas for numeric data columns | Add `font-family: var(--font-mono)` to `td[data-type="number"]` or equivalent numeric cell selectors |

---

## Quick Comparison

| Token | Base | Swiss | Palantir Light |
|---|---|---|---|
| `--bg` | #FAFBF8 | #FFFFFF | #F6F7F9 |
| `--ink-dark` | #072A20 | #000000 | #1C2127 |
| `--emerald` (primary) | #047A55 | #E63329 | #2D72D2 |
| `--border` | rgba(46,59,54,.10) | #000000 | #D3D8DE |
| `--radius` | 0px | 0px | 2px |
| Font heading | Geist Mono | Neue Haas Grotesk / Helvetica Neue | system-ui |
| Button style | Black fill, uppercase mono | White fill → black hover | Blue fill, regular weight |
| Elevation | None | None (border only) | Subtle multi-layer shadow |

---

## References

- [Palantir Blueprint GitHub](https://github.com/palantir/blueprint) — source for all color and token values
- [Blueprint color aliases SCSS](https://github.com/palantir/blueprint/blob/develop/packages/core/src/common/_color-aliases.scss)
- [Blueprint colors.ts](https://github.com/palantir/blueprint/blob/develop/packages/colors/src/colors.ts)
- [pnnl/blueprint-styler](https://github.com/pnnl/blueprint-styler) — community CSS variable overrides for Blueprint
- Josef Muller-Brockmann, *Grid Systems in Graphic Design* — the authoritative source on Swiss grid principles
