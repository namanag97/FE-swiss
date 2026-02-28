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
    { label: "Platform", href: "/product" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ],
  footer: {
    platform: [
      { label: "Process Mining", href: "/product" },
      { label: "Visual Analytics", href: "/product" },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Pricing", href: "/pricing" },
      { label: "Compare", href: "/versus" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Security", href: "/security" },
      { label: "Contact", href: "/contact" },
    ],
    solutions: [
      { label: "Order-to-Cash", href: "/use-cases" },
      { label: "Procure-to-Pay", href: "/use-cases" },
      { label: "IT Service Mgmt", href: "/use-cases" },
      { label: "Patient Journey", href: "/use-cases" },
    ],
    resources: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Security", href: "/security" },
    ],
  },
} as const;
