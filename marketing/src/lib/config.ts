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
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ],
  footer: {
    platform: [
      { label: "Process Mining", href: "/product" },
      { label: "Visual Analytics", href: "/product" },
      { label: "Pricing", href: "/pricing" },
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
