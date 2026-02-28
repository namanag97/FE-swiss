import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Engineering insights, product thinking, and process mining perspectives.",
  alternates: { canonical: "/blog" },
  openGraph: { images: ["/og.png"] },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-7) var(--sp-5) var(--sp-5)' }}>
          <span className="eyebrow">
            <span className="pulse" />
            Blog
          </span>
          <h1 style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-3xl)', fontWeight: 400, lineHeight: .89, letterSpacing: '-.03em', color: 'var(--ink)', marginTop: 'var(--sp-4)' }}>
            Insights &amp; <em style={{ fontFamily: 'var(--caslon)', fontStyle: 'italic', color: 'var(--emerald)', textDecoration: 'underline', textDecorationColor: 'var(--emerald)', textDecorationThickness: 3, textUnderlineOffset: 10 }}>Updates</em>
          </h1>
        </div>
      </section>

      <section className="gr">
        <div className="gi">
          {posts.length === 0 ? (
            <div style={{ padding: 'var(--sp-7) var(--sp-5)', textAlign: 'center', border: '1px solid var(--border)' }}>
              <p className="type-body">No posts yet.</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group grid items-start transition-colors"
                  style={{ gridTemplateColumns: '1fr auto', gap: 'var(--sp-5)', padding: 'var(--sp-5) 0', borderBottom: '1px solid var(--border)' }}
                >
                  <div className="flex flex-col" style={{ gap: 'var(--sp-2)' }}>
                    <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-lg)', fontWeight: 400, letterSpacing: '-.02em', lineHeight: 1.15, color: 'var(--ink)' }}>
                      {post.title}
                    </h2>
                    <div className="flex flex-wrap items-center" style={{ gap: 'var(--sp-3)' }}>
                      <span style={{ fontFamily: 'var(--body)', fontSize: 'var(--fs-sm)', fontWeight: 260, color: 'var(--ink-muted)' }}>{post.author}</span>
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', fontWeight: 400, letterSpacing: '.04em', color: 'var(--ink-faint)', whiteSpace: 'nowrap' }}>
                    {formatDate(post.date)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="cta-band">
        <h2>Stay in the <em>loop</em></h2>
        <p>Engineering deep-dives, product updates, and process mining perspectives.</p>
        <Link href="/contact" className="btn btn-primary">Subscribe</Link>
      </section>
    </>
  );
}
