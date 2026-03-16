/**
 * Shared SVG color palette — mirrors the CSS custom properties in tokens.css.
 * Use these JS constants for inline SVG components; for everything else
 * prefer CSS variables (var(--ink), var(--emerald), etc.) so changes propagate
 * from a single source.
 *
 * Token names intentionally match the CSS variable names in tokens.css:
 *   --ink       -> C.ink
 *   --ink-dark  -> C.inkDark
 *   --emerald   -> C.emerald
 *   etc.
 */
export const C = {
  /* Core palette — same values as tokens.css */
  ink:          "#2E3B36",
  inkDark:      "#072A20",
  inkMid:       "#3D5D55",
  inkMuted:     "#6B7268",
  inkFaint:     "#7C7E7B",
  emerald:      "#047A55",
  emeraldLight: "#e8f5ef",
  bg:           "#FAFBF8",
  white:        "#ffffff",
  border:       "#D7DAD7",

  /* Accents */
  amber:        "#B45309",
  amberBg:      "#fffbeb",
  amberBorder:  "#fcd34d",
  amberText:    "#92400e",
  amberLight:   "#fef3c7",
  red:          "#dc2626",
  redLight:     "#fef2f2",
  indigo:       "#4F46E5",

  /* Legacy aliases — kept so existing SVG references don't break */
  dark:  "#072A20",
  text:  "#2E3B36",
  mid:   "#3D5D55",
  muted: "#6B7268",
  faint: "#7C7E7B",
  green: "#047A55",
  greenLight: "#e8f5ef",
} as const;
