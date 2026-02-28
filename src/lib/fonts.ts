import { Inter, JetBrains_Mono, Libre_Caslon_Text } from 'next/font/google'

// Note: Geist Mono is not on Google Fonts — we use JetBrains Mono as the
// closest monospace available via next/font. To use the actual Geist Mono,
// replace with a local font or self-hosted version.

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  display: 'swap',
})

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  display: 'swap',
})

export const caslon = Libre_Caslon_Text({
  subsets: ['latin'],
  variable: '--font-accent',
  weight: ['400'],
  style: ['italic'],
  display: 'swap',
})
