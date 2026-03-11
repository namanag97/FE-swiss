import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { CtaBand } from "@/components/layout/CtaBand";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog — Engineering, Process Mining & Product Updates",
  description: "How we think about process mining, what we're building, and why. Engineering deep-dives, architecture decisions, and perspectives from the Meridian team.",
  alternates: { canonical: "/blog" },
  openGraph: { images: ["/og.png"] },
};

const tagClass: Record<string, string> = {
  announcement: "blog-tag--announcements",
  engineering: "blog-tag--engineering",
  team: "blog-tag--team",
  research: "blog-tag--research",
  insights: "blog-tag--insights",
};

export default function BlogPage() {
  const allPosts = getAllPosts();
  const featured = allPosts[0];
  const rest = allPosts.slice(1);

  /* Group remaining posts by first tag */
  const seen = Array.from(new Set(rest.map((p) => p.tags[0] ?? "Post")));
  const lanes = seen.map((tag) => ({
    tag,
    posts: rest.filter((p) => (p.tags[0] ?? "Post") === tag),
  }));

  const gridCols =
    lanes.length <= 1 ? "md:grid-cols-1" :
    lanes.length === 2 ? "md:grid-cols-2" :
    "md:grid-cols-3";

  return (
    <>
      {/* ── Page header ── */}
      <div className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-6)' }}>
          <span className="type-label">Journal</span>
          <h1 className="type-display mt-3" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 300, maxWidth: '14ch' }}>
            Ops, process mining &amp;&nbsp;building&nbsp;in&nbsp;public.
          </h1>
          <p className="type-body mt-3" style={{ maxWidth: '420px' }}>
            How we think about process mining, what we&apos;re building, and why.
          </p>
        </div>
      </div>

      {/* ── Featured post ── */}
      {featured && (
        <div className="gr">
          <div className="h-rule h-rule--bottom" />
          <div className="gi" style={{ paddingTop: 'var(--sp-6)', paddingBottom: 'var(--sp-6)' }}>
            <div className="flex items-center gap-[var(--sp-3)] mb-[var(--sp-5)]">
              <span className="type-label">Latest</span>
              <span className="flex-1 h-px bg-[var(--border)]" />
            </div>

            <Link
              href={`/blog/${featured.slug}`}
              className="group block border border-[var(--border)] transition-[border-color] duration-300 hover:border-[var(--border-mid)]"
            >
              <div className="grid md:grid-cols-[1fr_260px]">
                {/* Main */}
                <div className="p-[var(--sp-5)] md:p-[var(--sp-6)] flex flex-col justify-between gap-[var(--sp-6)]">
                  <div>
                    <div className="flex items-center gap-[var(--sp-3)] mb-[var(--sp-5)]">
                      <span className={`blog-tag ${tagClass[featured.tags[0]?.toLowerCase() ?? ""] ?? "blog-tag--engineering"}`}>
                        {featured.tags[0] ?? "post"}
                      </span>
                      <span className="type-label">{formatDate(featured.date)}</span>
                    </div>
                    <h2
                      className="font-[var(--body)] tracking-[-0.02em] text-[color:var(--ink)] leading-[1.15] mb-[var(--sp-4)] group-hover:text-[color:var(--emerald)] transition-colors duration-300"
                      style={{ fontSize: 'clamp(1.375rem, 2.75vw, 2rem)', fontWeight: 300 }}
                    >
                      {featured.title}
                    </h2>
                    <p className="type-body-sm" style={{ maxWidth: '420px' }}>
                      {featured.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-[var(--sp-2)]">
                    <span className="type-label group-hover:text-[color:var(--ink)] transition-colors duration-200">
                      Read article
                    </span>
                    <ArrowRight size={11} className="text-[color:var(--ink-faint)] group-hover:text-[color:var(--ink)] group-hover:translate-x-0.5 transition-all duration-300" />
                  </div>
                </div>

                {/* Meta sidebar */}
                <div className="border-t md:border-t-0 md:border-l border-[var(--border)] p-[var(--sp-5)] bg-[var(--bg)] flex flex-col justify-between gap-[var(--sp-5)]">
                  <div>
                    <span className="type-label block mb-[var(--sp-4)]">Author</span>
                    <div className="flex items-start gap-[var(--sp-3)]">
                      <div className="w-8 h-8 bg-[var(--ink-dark)] text-[color:var(--white)] flex items-center justify-center font-[var(--sans)] font-bold text-[length:var(--fs-xs)] shrink-0 select-none">
                        {featured.author.charAt(0)}
                      </div>
                      <div>
                        <div className="font-[var(--sans)] text-[length:var(--fs-sm)] font-medium text-[color:var(--ink)] leading-none mb-1">
                          {featured.author}
                        </div>
                        <span className="type-label">Meridian Team</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-[var(--border)] pt-[var(--sp-4)] flex flex-col gap-[var(--sp-2)]">
                    <span className="type-label">{formatDate(featured.date)}</span>
                    <span className="type-label text-[color:var(--ink-muted)]">{featured.readingTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* ── Category lanes ── */}
      {lanes.length > 0 && (
        <div className="gr">
          <div className="gi" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
            <div className={`grid grid-cols-1 ${gridCols} divide-y divide-[var(--border)] md:divide-y-0 md:divide-x`}>
              {lanes.map(({ tag, posts: lanePosts }, i) => (
                <div
                  key={tag}
                  className={[
                    "flex flex-col gap-[var(--sp-5)] py-[var(--sp-5)] md:py-0",
                    i === 0 ? "md:pr-[var(--sp-5)]" :
                    i === lanes.length - 1 ? "md:pl-[var(--sp-5)]" :
                    "md:px-[var(--sp-5)]",
                  ].join(" ")}
                >
                  {/* Lane header */}
                  <div className="flex items-center gap-[var(--sp-3)]">
                    <span className="type-label capitalize">{tag}</span>
                    <span className="flex-1 h-px bg-[var(--border)]" />
                  </div>

                  {/* Lane posts */}
                  <div className="flex flex-col gap-[var(--sp-4)]">
                    {lanePosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col border border-[var(--border)] transition-[border-color] duration-300 hover:border-[var(--border-mid)]"
                      >
                        <div className="p-[var(--sp-4)] flex flex-col flex-1 gap-[var(--sp-3)]">
                          <div className="flex items-start justify-between gap-[var(--sp-3)]">
                            <span className={`blog-tag ${tagClass[post.tags[0]?.toLowerCase() ?? ""] ?? "blog-tag--engineering"}`}>
                              {post.tags[0] ?? "post"}
                            </span>
                            <span className="type-label">{post.readingTime}</span>
                          </div>
                          <h3
                            className="font-[var(--sans)] font-medium tracking-[-0.02em] text-[color:var(--ink)] leading-[1.25] group-hover:text-[color:var(--emerald)] transition-colors duration-300"
                            style={{ fontSize: 'clamp(0.9375rem, 1.25vw, 1.0625rem)' }}
                          >
                            {post.title}
                          </h3>
                          <p className="type-body-sm line-clamp-3">{post.description}</p>
                        </div>
                        <div className="border-t border-[var(--border)] px-[var(--sp-4)] py-[var(--sp-3)] flex items-center justify-between">
                          <span className="type-label">{formatDate(post.date)}</span>
                          <div className="flex items-center gap-1.5 text-[color:var(--ink-faint)] group-hover:text-[color:var(--ink)] transition-colors duration-200">
                            <span className="font-[var(--sans)] text-[8px] uppercase tracking-[0.1em]">Read</span>
                            <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <CtaBand
        heading={<>Stay in the <em>loop</em></>}
        description="See how Meridian turns raw event logs into operational clarity. Request early access."
      />
    </>
  );
}
