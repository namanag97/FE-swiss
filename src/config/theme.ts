// ─── THEME ─────────────────────────────────────────────────
// Change this file to rebrand the entire site.
// These values get injected into CSS custom properties in globals.css.
// ────────────────────────────────────────────────────────────

export const theme = {
  colors: {
    ink:       '#2E3B36',
    inkDark:   '#072A20',
    inkMid:    '#3D5D55',
    inkLight:  '#628C82',
    inkMuted:  '#6B7268',
    inkFaint:  '#7C7E7B',
    accent:    '#047A55',
    bg:        '#FAFBF8',
    white:     '#FFFFFF',
    border:    'rgba(46,59,54,.10)',
    borderMid: 'rgba(46,59,54,.18)',
    borderNav: '#9EA397',
  },

  fonts: {
    heading: "'Geist Mono', monospace",
    body:    "'Inter', sans-serif",
    accent:  "'Libre Caslon Text', Georgia, serif",
    bodyWeight: 260,
  },

  spacing: {
    1: '4px',
    2: '6px',
    3: '12px',
    4: '18px',
    5: '30px',
    6: '48px',
    7: '64px',
  },

  fontSize: {
    xs:   '10px',
    sm:   '12px',
    md:   '14px',
    base: '16px',
    lg:   '20px',
    xl:   '32px',
    '2xl': '48px',
    '3xl': '64px',
  },

  layout: {
    maxWidth:  '1400px',
    navHeight: '40px',
    borderRadius: '0px',
  },

  transitions: {
    fast: '.15s ease',
    std:  '.20s ease',
    slow: '.30s ease',
  },

  effects: {
    bgTexture: "url('https://pub-0c8dadde61494a1b8933d138cdc802f7.r2.dev/assets/images/backgrounds/background.webp')",
    diagonalStripe: true,
    cornerMarkers: true,
    navBlur: '12px',
  },
} as const
