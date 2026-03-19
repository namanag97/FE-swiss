export const siteConfig = {
  name: "Sancalana",
  tagline: "Process intelligence. No consultants required.",
  description:
    "Your first process map in under an hour. Connect your ERP, CRM, or ITSM — Sancalana reconstructs how work actually flows, finds what's broken, and tells you what to fix.",
  url: "https://sancalana.com",
  calendlyUrl: "https://calendly.com/sancalana/30min",
  links: {
    twitter: "https://twitter.com/sancalana",
    linkedin: "https://linkedin.com/company/sancalana",
  },
  nav: [
    { label: "Platform", href: "/platform" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Security", href: "/security" },
  ],
  footer: {
    platform: [
      { label: "Overview", href: "/platform" },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Security", href: "/security" },
    ],
    solutions: [
      { label: "Order-to-Cash", href: "/use-cases#o2c" },
      { label: "Procure-to-Pay", href: "/use-cases#p2p" },
      { label: "IT Service Management", href: "/use-cases#itsm" },
      { label: "Patient Journey", href: "/use-cases#healthcare" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
} as const;
