/**
 * Shared SVG color palette — single source of truth.
 * Mirrors the CSS custom properties in globals.css but as JS constants
 * for use in inline SVG components across pages.
 */
export const C = {
  dark: "#072A20",
  text: "#2E3B36",
  mid: "#3D5D55",
  muted: "#6B7268",
  faint: "#7C7E7B",
  green: "#047A55",
  greenLight: "#e8f5ef",
  border: "#D7DAD7",
  white: "#ffffff",
  bg: "#FAFBF8",
  amber: "#B45309",
  amberBg: "#fffbeb",
  amberBorder: "#fcd34d",
  amberText: "#92400e",
  amberLight: "#fef3c7",
  red: "#dc2626",
  redLight: "#fef2f2",
} as const;
