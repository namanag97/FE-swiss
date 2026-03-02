import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const pages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteConfig.url}/platform`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/use-cases`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/security`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/legal/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/legal/terms`, changeFrequency: "yearly", priority: 0.3 },
  ].map((p) => ({ ...p, lastModified: new Date() }));

  return [...pages, ...posts];
}
