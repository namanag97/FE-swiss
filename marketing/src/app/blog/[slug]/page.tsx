import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { BlogContent } from "@/components/blog/BlogContent";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ShareButtons } from "@/components/blog/ShareButtons";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `${siteConfig.url}/blog/${slug}`,
      images: ["/og.png"],
    },
  };
}

const tagClass: Record<string, string> = {
  announcement: "blog-tag--announcements",
  engineering: "blog-tag--engineering",
  team: "blog-tag--team",
  research: "blog-tag--research",
  insights: "blog-tag--insights",
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 2);

  const articleUrl = `${siteConfig.url}/blog/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    url: articleUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Slim breadcrumb ── */}
      <div className="gr border-b border-[var(--border)]">
        <div className="gi h-11 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-[var(--sans)] text-[length:9px] uppercase tracking-[0.1em] text-[color:var(--ink-faint)] hover:text-[color:var(--ink)] transition-colors duration-200"
          >
            <ArrowLeft size={9} />
            Journal
          </Link>
          <span className={`blog-tag ${tagClass[post.tags[0]?.toLowerCase() ?? ""] ?? "blog-tag--engineering"}`}>
            {post.tags[0] ?? "post"}
          </span>
        </div>
      </div>

      {/* ── Article header ── */}
      <header className="gr border-b border-[var(--border)]">
        <div className="gi" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-6)', maxWidth: '680px' }}>
          <h1
            className="font-[var(--body)] text-[color:var(--ink)] leading-[1.05] tracking-[-0.02em] mb-[var(--sp-4)]"
            style={{ fontSize: 'clamp(1.875rem, 4.5vw, 3.25rem)', fontWeight: 300, maxWidth: '20ch', textWrap: 'balance' }}
          >
            {post.title}
          </h1>

          <p
            className="font-[var(--body)] text-[color:var(--ink-muted)] leading-[1.75] mb-[var(--sp-6)]"
            style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)', fontWeight: 300, maxWidth: '32rem' }}
          >
            {post.description}
          </p>

          {/* Byline */}
          <div className="flex flex-wrap items-center gap-[var(--sp-2)] font-[var(--sans)] text-[length:11px] tracking-[0.04em] text-[color:var(--ink-faint)]" style={{ fontFeatureSettings: '"tnum", "lnum"' }}>
            <span className="w-6 h-6 bg-[var(--ink-dark)] text-[color:var(--white)] flex items-center justify-center font-[var(--sans)] font-bold text-[length:9px] select-none shrink-0">
              {post.author.charAt(0)}
            </span>
            <span className="font-medium text-[color:var(--ink)]">{post.author}</span>
            <span className="text-[color:var(--border-nav)]">&middot;</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="text-[color:var(--border-nav)]">&middot;</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </header>

      {/* ── Share ── */}
      <div className="gr border-b border-[var(--border)]">
        <div className="gi py-[var(--sp-3)]" style={{ maxWidth: '680px' }}>
          <ShareButtons url={articleUrl} title={post.title} />
        </div>
      </div>

      {/* ── Mobile TOC ── */}
      <div className="lg:hidden gr">
        <div className="gi py-[var(--sp-4)]">
          <TableOfContents content={post.content} />
        </div>
      </div>

      {/* ── Article body + sidebar TOC ── */}
      <div className="gr">
        <div className="gi" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
          <div className="grid gap-12 lg:grid-cols-[1fr_200px]" style={{ maxWidth: '920px' }}>
            <div className="prose">
              <BlogContent source={post.content} />
            </div>
            <aside className="hidden lg:block">
              <div className="sticky" style={{ top: 'calc(var(--header-h) + var(--sp-3))' }}>
                <TableOfContents content={post.content} />
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* ── Related posts ── */}
      {related.length > 0 && (
        <div className="gr border-t border-[var(--border)]">
          <div className="gi" style={{ paddingTop: 'var(--sp-6)', paddingBottom: 'var(--sp-6)' }}>
            <span className="type-label mb-[var(--sp-4)] block">Related</span>
            <div className="grid gap-0 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="card-feature group"
                >
                  <div className="flex gap-1.5">
                    {r.tags.slice(0, 2).map((t) => (
                      <span key={t} className={`blog-tag ${tagClass[t.toLowerCase()] ?? "blog-tag--engineering"}`}>{t}</span>
                    ))}
                  </div>
                  <p className="card-title">{r.title}</p>
                  <p className="card-body line-clamp-2">{r.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Footer nav ── */}
      <div className="gr border-t border-[var(--border)]">
        <div className="gi h-12 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-[var(--sans)] text-[length:9px] uppercase tracking-[0.1em] text-[color:var(--ink-faint)] hover:text-[color:var(--ink)] transition-colors duration-200"
          >
            <ArrowLeft size={9} />
            All posts
          </Link>
          <span className="font-[var(--sans)] text-[length:9px] uppercase tracking-[0.1em] text-[color:var(--ink-faint)]">
            Meridian Journal
          </span>
        </div>
      </div>
    </>
  );
}
