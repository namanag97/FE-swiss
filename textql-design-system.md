# TextQL Design System — Forensic Documentation

> Extracted from source CSS/HTML. All values are exact, not approximated.

---

## 1. Color Tokens

```css
/* Primary palette */
--ink:          #2E3B36   /* primary text, dark borders */
--ink-dark:     #072A20   /* deepest — ghost btn hover, dark backgrounds */
--ink-mid:      #3D5D55   /* primary button bg, secondary color */
--ink-light:    #628C82   /* tertiary accent */
--ink-muted:    #6B7268   /* muted/placeholder text */
--ink-faint:    #7C7E7B   /* very faint / disabled */
--emerald:      #047A55   /* active, hover states, underline, pulse dot */
--bg:           #FAFBF8   /* page background (warm off-white, NOT pure white) */
--white:        #FFFFFF   /* inverted text on dark surfaces */
--border:       rgba(46, 59, 54, .10)  /* ALL hairlines — nav, cards, dividers */
--border-nav:   #9EA397   /* nav bottom border (slightly more opaque) */
```

### Status colors
```css
error:   #cc4444  bg #fee2e2  dark #b91c1c
warning: #f59e0b  bg #fef3c7  dark #b45309
success: #22c55e  bg #dcfce7  dark #166534
info:    #0ea5e9  bg #dbeafe  dark #2563eb
```

---

## 2. Typography

### Font families
| Name | Usage | Weights |
|------|-------|---------|
| `GeistMono` | **Headings (h1, h2, h3), labels, tags, code, buttons** | 300, 400 |
| `Inter Variable` | Body text, descriptions, nav links | 100–900 variable; typically **260** (ultra-light) |
| `LibreCaslon` (Condensed Medium Italic) | Italic accent word in hero headings only | 500 italic |
| `JetBrainsMono` | Mono italic variant | 400 italic |

> **Critical correction (from product screenshots):** Section headings like "Deploys to meet your compliance needs" are in **GeistMono** (monospace), NOT Geist sans. The uniform letter width is clearly visible. All display headings use GeistMono.

> Key detail: Inter Variable at **weight 260** — lighter than "light" (300). This creates the characteristically delicate body text.

### Eyebrow / section label — `[ bracket ]` pattern
Confirmed from screenshot: `[ Flexible and Secure ]` — the literal bracket characters are part of the text.
```
Font: GeistMono, 10px, uppercase, letter-spacing .10em
Color: #6B7268 (muted)
Pattern: "[ " + LABEL TEXT + " ]"
```
Two variants:
1. With pulse dot (blog/live sections): `● BLOG`
2. With brackets (marketing sections): `[ FLEXIBLE AND SECURE ]`

### Font size scale
```
10px (.625rem)  — smallest: mono labels, badges, meta
12px (.75rem)   — xs: captions, dates
14px (.875rem)  — sm: body text, descriptions, nav links
16px (1rem)     — base: standard body
20px (1.25rem)  — lg: sub-headings
32px (2rem)     — xl: section headings
48px (3rem)     — 2xl: large headings
64px (4rem)     — 3xl: hero heading (also clamps to max(4rem, 3vw))
```

### Hero heading rules
```css
font-family: Geist;
font-weight: 400;
font-size: max(4rem, 3vw);   /* 64px minimum */
word-spacing: -.20em;         /* very compressed */
letter-spacing: -.02em;
line-height: 89%;             /* TIGHT — below 1.0 */
```

### Hero italic accent word
```css
font-family: LibreCaslon;     /* Condensed Medium Italic */
font-style: italic;
color: #047A55;               /* emerald */
text-decoration: underline;
text-decoration-thickness: 3px;
text-underline-offset: 10px;
text-decoration-skip-ink: none;
```

### Mono section label / eyebrow
```css
font-family: GeistMono;
font-size: 10px (.625rem);
font-weight: 400;
text-transform: uppercase;
letter-spacing: .10em;
line-height: 89%;
color: #6B7268;               /* muted */
opacity: .85;
```

### Body text
```css
font-family: Inter Variable;
font-weight: 260;             /* ultra-light, critical to aesthetic */
font-size: 14px;
line-height: 150%;
letter-spacing: -.02em;
color: #2E3B36;
```

---

## 3. Spacing Scale

```
4px  (.25rem)   — minimum gap, icon spacing
6px  (.375rem)  — xs: list item gap, badge padding
12px (.75rem)   — sm: button padding (vertical), card gap
18px (1.125rem) — md: button padding (horizontal), nav height gap, card header margin
30px (1.875rem) — lg: SECTION PADDING (the core rhythm unit)
48px (3rem)     — xl: large section gap
64px (4rem)     — 2xl: hero sections
```

**Button padding:** `12px 18px` (vertical horizontal)
**Card interior padding:** `18px` uniform
**Section padding:** `30px` all sides
**Hero section padding:** `18px` vertical, `30px` horizontal
**Nav height:** `40px`
**Max content width:** `1400px`

---

## 4. Grid & Layout System

### The hairline grid structure

TextQL's signature layout uses **1px `rgba(46,59,54,.1)` lines** to create a structured grid. There are two types:

#### Vertical rails (left + right content boundary)
Created via `::before` and `::after` on the container element:
```css
.section-container::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 1px; height: 100%;
  background-color: rgba(46, 59, 54, .10);
  z-index: 0;
}
.section-container::after {
  content: "";
  position: absolute;
  top: 0; right: 0;
  width: 1px; height: 100%;
  background-color: rgba(46, 59, 54, .10);
  z-index: 0;
}
```

#### Horizontal full-viewport rules (between sections)
A separate element — stretches **beyond the container** to full viewport width:
```css
.h-rule {
  position: absolute;          /* inside the container */
  top: 0;                      /* or bottom: 0 */
  left: 50%;
  transform: translate(-50%);
  width: 100vw;                /* KEY: full viewport, not container */
  height: 1px;
  background-color: rgba(46, 59, 54, .10);
  z-index: 0;
}
```

#### How they combine
Every section sits in a `position: relative` wrapper. The vertical rails persist through the full page height. Horizontal rules mark the top/bottom of each section. Together they form a paper-grid that the content "lives inside."

---

## 5. Background & Texture

### Page background
```css
background-color: #FAFBF8;
background-image: url('https://pub-0c8dadde61494a1b8933d138cdc802f7.r2.dev/assets/images/backgrounds/background.webp');
background-size: auto;
background-repeat: repeat;
background-attachment: fixed;   /* stays fixed while scrolling */
```

### Monet art overlays
Applied to cards and sections via `::before` pseudo-element at **5–8% opacity**. Five variants:
```
monet/1bg.webp through monet/5bg.webp
Base URL: https://pub-0c8dadde61494a1b8933d138cdc802f7.r2.dev/assets/images/backgrounds/
```
```css
.card::before {
  content: "";
  position: absolute; inset: 0;
  background-image: url(monet/3bg.webp);
  background-size: cover;
  background-position: center;
  opacity: .06;   /* 6% — barely visible, adds organic depth */
  z-index: 0;
  border-radius: 12px;  /* match card radius */
}
```

### Button diagonal stripe texture
Applied to ALL buttons (light on dark, dark on light):
```css
/* Primary button (dark bg) */
background-image: repeating-linear-gradient(
  45deg,
  transparent, transparent 2px,
  rgba(255,255,255,.03) 2px, rgba(255,255,255,.03) 4px
);

/* Ghost button (light bg) */
background-image: repeating-linear-gradient(
  45deg,
  transparent, transparent 2px,
  rgba(0,0,0,.03) 2px, rgba(0,0,0,.03) 4px
);
```

### Radial dot decoration
Used in hero sections as a background accent:
```css
.dot-field {
  background-image: radial-gradient(#6B7268 1.5px, transparent 1.5px);
  background-size: 12px 12px;
  opacity: .35;
  mask-image: radial-gradient(ellipse at center, black, transparent);
}
```

---

## 6. Components

### Button

**Structure:**
- Zero border-radius (sharp corners — no rounding)
- Font: `GeistMono`, 10px or 12px, uppercase, letter-spacing .05em
- Corner markers appear on hover/focus (signature detail)

```css
/* Base */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 18px;
  cursor: pointer;
  border: none;
  border-radius: 0;                    /* SQUARE — no rounding */
  position: relative;
  font-family: GeistMono;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: .05em;
  transition: background-color .2s ease, border-color .2s ease;

  /* diagonal stripe always present */
  background-image: repeating-linear-gradient(
    45deg, transparent, transparent 2px,
    rgba(255,255,255,.03) 2px, rgba(255,255,255,.03) 4px
  );
}

/* Primary */
.btn-primary {
  background-color: #3D5D55;   /* mid-tone green (NOT the emerald) */
  color: #fff;
  border: 1px solid transparent;
}
.btn-primary:hover { background-color: #047A55; }   /* emerald on hover */

/* Ghost */
.btn-ghost {
  background-color: transparent;
  color: #2E3B36;
  border: 1px solid #2E3B36;
}
.btn-ghost:hover { border-color: #072A20; }

/* Corner markers — top-left + top-right */
.btn::before {
  content: "";
  position: absolute;
  top: -4px; left: -4px;
  width: 5px; height: 5px;
  opacity: 0;
  border-top: 1px solid currentColor;
  border-left: 1px solid currentColor;
  transition: opacity .15s ease;
}
.btn::after {
  content: "";
  position: absolute;
  top: -4px; right: -4px;
  width: 5px; height: 5px;
  opacity: 0;
  border-top: 1px solid currentColor;
  border-right: 1px solid currentColor;
  transition: opacity .15s ease;
}
.btn:hover::before,
.btn:hover::after,
.btn:focus::before,
.btn:focus::after { opacity: 1; }
```

### Input / Textarea

```css
input, textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  border: 1px solid #2E3B36;   /* full dark border by default */
  border-radius: 0;             /* SQUARE */
  background: transparent;
  font-family: GeistMono;
  font-size: 14px;
  color: #2E3B36;
  outline: none;
  transition: border-color .15s ease;
}
input::placeholder { color: #6B7268; }
input:hover,
input:focus  { border-color: #43625A; }
```

### Card

```css
.card {
  position: relative;
  border-radius: 12px;
  border: 1px solid rgba(46, 59, 54, .10);
  background-color: #fff;
  background-image: url('background.webp');
  background-size: auto;
  background-repeat: repeat;
  overflow: hidden;
}

/* Monet overlay */
.card::before {
  content: "";
  position: absolute; inset: 0;
  background-image: url('monet/3bg.webp');
  background-size: cover;
  background-position: center;
  opacity: .06;
  z-index: 0;
  border-radius: 12px;
  pointer-events: none;
}

/* Content above overlay */
.card-body {
  position: relative;
  z-index: 1;
  padding: 18px;
}
```

### Mono label / eyebrow

```css
.eyebrow {
  font-family: GeistMono;
  font-size: 10px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: .10em;
  color: #6B7268;
  display: flex;
  align-items: center;
  gap: 8px;
}
```

### Pulse dot (live indicator)

```css
.pulse-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background-color: #047A55;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 4px 2px rgba(4,122,85,.3);
  }
  50% {
    opacity: .6;
    transform: scale(.85);
    box-shadow: 0 0 8px 4px rgba(4,122,85,.5);
  }
}
```

### Tag / Badge

```css
.tag {
  display: inline-flex;
  align-items: center;
  font-family: GeistMono;
  font-size: 9px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: .08em;
  padding: 2px 6px;
  border-radius: 3px;
}
.tag-neutral { background: rgba(46,59,54,.08); color: #6B7268; }
.tag-active  { background: rgba(4,122,85,.12); color: #047A55; }
```

---

## 7. Animations

```css
/* All timing functions */
--t-fast: .15s ease   /* focus, icon states */
--t-std:  .20s ease   /* button hover, opacity */
--t-slow: .30s ease   /* layout, modals */

/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Slide up (toasts/modals) */
@keyframes slideUp {
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

/* Staggered children: delay 0, .1s, .2s */

/* SVG stroke dash animation */
@keyframes strokeDash {
  from { stroke-dashoffset: 30; }
  to   { stroke-dashoffset: -100; }
}
/* Duration: 2.5s linear infinite */
/* filter: drop-shadow(0 0 3px rgba(4,122,85,.5)) */

/* Rotating border (CTA highlight) */
@keyframes borderSpin {
  0%   { box-shadow: 0 -2px rgba(255,255,255,.9); }
  25%  { box-shadow: 2px 0 rgba(255,255,255,.9); }
  50%  { box-shadow: 0 2px rgba(255,255,255,.9); }
  75%  { box-shadow: -2px 0 rgba(255,255,255,.9); }
}
/* Duration: 1.5s linear infinite */
```

---

## 8. Nav Anatomy

```
height: 40px
padding: 0 18px
3 flex zones: logo | center links | cta actions

left/right vertical grid rails via ::before/::after
bottom border: 1px solid #9EA397

Dropdown:
  - background: #FAFBF8 + background.webp texture
  - border: 1px solid rgba(46,59,54,.1)
  - border-radius: 4px (NOT 12px — small radius for menus)
  - padding: 30px (lg spacing)
  - min-width: 580px
  - box-shadow: 0 4px 20px rgba(0,0,0,.08)
  - opacity transition: .2s ease
```

---

## 9. The "Blog Post Grid" border pattern

Posts grids do NOT use individual card borders. Instead:
```css
/* Container sets left + top border */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-left: 1px solid rgba(46,59,54,.1);
  border-top: 1px solid rgba(46,59,54,.1);
}

/* Each cell adds right + bottom */
.post-cell {
  border-right: 1px solid rgba(46,59,54,.1);
  border-bottom: 1px solid rgba(46,59,54,.1);
  padding: 30px;
}
```
This creates a seamless grid with no doubled borders.

---

## 10. Quick Reference — Most Common Patterns

```
Page bg color:   #FAFBF8
Page bg texture: background.webp (fixed, repeat)
Primary text:    #2E3B36
Muted text:      #6B7268
Border (all):    rgba(46,59,54,.10)
Accent green:    #047A55
Button bg:       #3D5D55  →hover→  #047A55
Section pad:     30px
Card pad:        18px
Card radius:     12px
Menu radius:     4px
Input radius:    0 (square)
Button radius:   0 (square)
Nav height:      40px
Max width:       1400px
Body font:       Inter Variable, weight 260
Label font:      GeistMono, 10px, uppercase
Heading font:    Geist, weight 400
Accent font:     LibreCaslon italic
```
