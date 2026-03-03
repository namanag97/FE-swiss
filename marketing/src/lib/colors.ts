/**
 * Shared SVG color palette — single source of truth.
 * Mirrors the CSS custom properties in globals.css but as JS constants
 * for use in inline SVG components across pages.
 */
export const C = {
  dark: "#072A20",
  text: "#1a2f28",
  mid: "#4a6259",
  muted: "#7a8f85",
  faint: "#a3b3ab",
  green: "#047A55",
  greenLight: "#e8f5ef",
  border: "#dde3e0",
  white: "#ffffff",
  bg: "#FAFBF8",
  amber: "#b45309",
  amberLight: "#fef3c7",
  red: "#dc2626",
} as const;
