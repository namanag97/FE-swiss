import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { BlogFilterTabs } from "@/components/blog/BlogFilterTabs";

export default function BlogPage() {
  const allPosts = getAllPosts();

  const posts = allPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
    author: p.author,
    tags: p.tags,
    readingTime: p.readingTime,
  }));

  return (
    <>
      {/* Hero */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-7) var(--sp-5) var(--sp-5)' }}>
          <h1 style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-3xl)', fontWeight: 400, lineHeight: .89, letterSpacing: '-.03em', color: 'var(--ink)' }}>
            Blog
          </h1>
        </div>
      </section>

      {/* Filter tabs + entries */}
      <section className="gr">
        <div className="gi">
          <BlogFilterTabs posts={posts} />
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <h2>Stay in the <em>loop</em></h2>
        <p>Engineering deep-dives, product updates, and process mining perspectives.</p>
        <Link href="/contact" className="btn btn-primary">Subscribe</Link>
      </section>
    </>
  );
}
