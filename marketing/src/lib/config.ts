export const siteConfig = {
  name: "YourStartup",
  tagline: "Build faster. Ship smarter. Scale without limits.",
  description:
    "The modern platform for engineering teams. Real-time analytics, workflow automation, and enterprise-grade security — in one place.",
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
