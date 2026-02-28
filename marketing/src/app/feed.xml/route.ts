import { Feed } from "feed";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";

export async function GET() {
  const posts = getAllPosts();

  const feed = new Feed({
    title: `${siteConfig.name} Blog`,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: "en",
    favicon: `${siteConfig.url}/favicon.svg`,
    copyright: `© ${new Date().getFullYear()} ${siteConfig.name}`,
    author: { name: siteConfig.name, link: siteConfig.url },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.url}/blog/${post.slug}`,
      link: `${siteConfig.url}/blog/${post.slug}`,
      description: post.description,
      date: new Date(post.date),
      author: [{ name: post.author }],
    });
  }

  return new Response(feed.rss2(), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
