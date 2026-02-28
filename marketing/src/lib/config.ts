/** Site-wide configuration — single source of truth for all brand/copy constants */
export const siteConfig = {
  name: "YourStartup",
  tagline: "Tagline goes here",
  description:
    "One-line description of what your startup does. Replace this with your actual description.",
  url: "https://yoursite.com",
  ogImage: "/og.png",
  links: {
    twitter: "https://twitter.com/yourstartup",
    linkedin: "https://linkedin.com/company/yourstartup",
    github: "https://github.com/yourstartup",
  },
  nav: [
    { label: "Product", href: "/product" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    product: [
      { label: "Features", href: "/product" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/blog?tag=changelog" },
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
