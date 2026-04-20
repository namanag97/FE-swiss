export const siteConfig = {
  name: "Sancalana",
  tagline: "See how work actually flows.",
  description:
    "Process intelligence for operations and transformation teams. Connect your systems, map the real process, find costly deviations, and act faster.",
  url: "https://sancalana.com",
  calendlyUrl: "https://calendly.com/sancalana/30min",
  links: {
    twitter: "https://twitter.com/sancalana",
    linkedin: "https://linkedin.com/company/sancalana",
  },
  nav: [
    { label: "Product", href: "/platform" },
    { label: "Solutions", href: "/use-cases" },
    { label: "Blog", href: "/blog" },
    { label: "Security", href: "/security" },
  ],
  footer: {
    platform: [
      { label: "Product", href: "/platform" },
      { label: "Solutions", href: "/use-cases" },
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
