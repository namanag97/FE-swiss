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
      <section className="gr" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
        <div className="gi" style={{ textAlign: 'center' }}>
          <span className="eyebrow eyebrow-bracket">Blog</span>
          <h1 className="type-display" style={{ marginTop: 'var(--sp-3)' }}>
            Insights &amp; <em>updates</em>
          </h1>
          <p className="type-body" style={{ maxWidth: 560, margin: '0 auto', marginTop: 'var(--sp-4)', color: 'var(--ink-mid)' }}>
            Engineering deep-dives, product updates, and perspectives on process mining.
          </p>
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
        <div className="gi" style={{ textAlign: 'center', padding: 'var(--sp-7) 0' }}>
          <h2 className="type-h2" style={{ color: 'var(--white)' }}>
            Stay in the <em>loop</em>
          </h2>
          <p style={{ fontFamily: 'var(--body)', color: 'rgba(255,255,255,0.7)', maxWidth: 480, margin: '0 auto', marginTop: 'var(--sp-4)' }}>
            Engineering deep-dives, product updates, and process mining perspectives.
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'center', marginTop: 'var(--sp-5)' }}>
            <Link href="/contact" className="btn btn-primary" style={{ background: 'var(--white)', color: 'var(--ink-dark)', borderColor: 'var(--white)' }}>Get Started</Link>
            <Link href="/request-demo" className="btn btn-ghost" style={{ color: 'var(--white)', borderColor: 'rgba(255,255,255,0.3)' }}>Request Demo</Link>
          </div>
        </div>
      </section>
    </>
  );
}
