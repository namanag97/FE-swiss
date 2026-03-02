import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { BlogFilterTabs } from "@/components/blog/BlogFilterTabs";

export const metadata: Metadata = {
  title: "Blog — Engineering, Process Mining & Product Updates",
  description: "How we think about process mining, what we're building, and why. Engineering deep-dives, architecture decisions, and perspectives from the Meridian team.",
  alternates: { canonical: "/blog" },
};

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
            From the <em>team</em>
          </h1>
          <p className="type-body" style={{ maxWidth: 560, margin: '0 auto', marginTop: 'var(--sp-4)', color: 'var(--ink-mid)' }}>
            How we think about process mining, what we&apos;re building, and why.
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
            See how Meridian turns raw event logs into operational clarity. Request early access.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--sp-5)' }}>
            <Link href="/contact" className="btn btn-primary" style={{ background: 'var(--white)', color: 'var(--ink-dark)', borderColor: 'var(--white)' }}>Get Early Access</Link>
          </div>
        </div>
      </section>
    </>
  );
}
