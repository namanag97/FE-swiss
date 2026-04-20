import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const isProduction = process.env.NODE_ENV === "production";

interface BlogRedirect {
  source: string;
  destination: string;
  permanent?: boolean;
}

function getBlogRedirects(): BlogRedirect[] {
  const redirectsPath = path.join(process.cwd(), "content/blog/redirects.json");
  if (!fs.existsSync(redirectsPath)) return [];
  return JSON.parse(fs.readFileSync(redirectsPath, "utf8")) as BlogRedirect[];
}

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  outputFileTracingRoot: process.cwd(),
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "posthog-js"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-XSS-Protection",
            value: "0",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              [
                "script-src 'self' 'unsafe-inline'",
                isProduction ? "" : "'unsafe-eval'",
                "https://assets.calendly.com https://us.i.posthog.com https://unpkg.com",
              ].filter(Boolean).join(" "),
              "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
              "img-src 'self' data: blob: https://avatars.githubusercontent.com https://pub-0c8dadde61494a1b8933d138cdc802f7.r2.dev",
              "font-src 'self' data:",
              "frame-src https://calendly.com",
              "connect-src 'self' https://us.i.posthog.com https://calendly.com https://api.github.com https://api.netlify.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/product",
        destination: "/platform",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "/platform",
        permanent: true,
      },
      {
        source: "/request-demo",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/versus",
        destination: "/platform",
        permanent: true,
      },
      ...getBlogRedirects().map((redirect) => ({
        source: `/blog/${redirect.source}`,
        destination: `/blog/${redirect.destination}`,
        permanent: redirect.permanent ?? true,
      })),
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
});

export default withMDX(nextConfig);
