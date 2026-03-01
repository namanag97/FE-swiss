export const siteConfig = {
  name: "Meridian",
  tagline: "See how your business actually runs.",
  description:
    "The data platform for operations teams. Process mining, visual analytics, and AI-powered insights — beyond what SQL can show you.",
  url: "https://meridian.dev",
  ogImage: "/og.png",
  links: {
    twitter: "https://twitter.com/meridiandev",
    linkedin: "https://linkedin.com/company/meridiandev",
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
