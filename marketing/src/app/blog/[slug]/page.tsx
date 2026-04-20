import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { BlogContent } from "@/components/blog/BlogContent";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { ArticleCta } from "@/components/blog/ArticleCta";

interface Props { params: Promise<{ slug: string }> }

export const dynamicParams = true;
export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: post.canonical ?? `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      url: `${siteConfig.url}/blog/${slug}`,
      images: post.image ? [{ url: post.image }] : undefined,
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
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
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
    dateModified: post.updatedAt ?? post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    url: articleUrl,
    image: post.image ? `${siteConfig.url}${post.image}` : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Breadcrumb ── */}
      <div className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi h-11 flex items-center justify-between">
          <Link href="/blog" className="nav-link-label hover:text-[color:var(--ink)] transition-colors inline-flex items-center gap-1.5">
            <ArrowLeft size={9} />
            Journal
          </Link>
          <span className={`blog-tag ${tagClass[post.tags[0]?.toLowerCase() ?? ""] ?? "blog-tag--engineering"}`}>
            {post.tags[0] ?? "post"}
          </span>
        </div>
      </div>

      {/* ── Article header ── */}
      <header className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section-pad" style={{ maxWidth: 680 }}>
          <h1 className="type-h2" style={{ maxWidth: '20ch' }}>
            {post.title}
          </h1>

          <p className="type-body mt-4" style={{ maxWidth: '32rem' }}>
            {post.description}
          </p>

          {post.image && (
            <Image
              src={post.image}
              alt=""
              width={1200}
              height={675}
              className="mt-[var(--sp-5)] aspect-[16/9] w-full object-cover border border-[var(--border)]"
              priority
            />
          )}

          {/* Byline */}
          <div className="mt-[var(--sp-5)] flex flex-wrap items-center gap-[var(--sp-2)]">
            <span className="w-6 h-6 bg-[var(--ink-dark)] text-[color:var(--white)] flex items-center justify-center font-[var(--sans)] font-bold text-[length:9px] select-none shrink-0">
              {post.author.charAt(0)}
            </span>
            <span className="type-label font-medium text-[color:var(--ink)]">{post.author}</span>
            <span className="type-label">&middot;</span>
            <time className="type-label" dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="type-label">&middot;</span>
            <span className="type-label">{post.readingTime}</span>
          </div>
        </div>
      </header>

      {/* ── Share ── */}
      <div className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi py-[var(--sp-3)]">
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
        <div className="gi section-pad">
          <div className="grid gap-12 lg:grid-cols-[1fr_200px]" style={{ maxWidth: 920 }}>
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

      {/* ── Article CTA ── */}
      <div className="gr">
        <div className="gi pb-[var(--sp-6)]">
          <div style={{ maxWidth: 680 }}>
            <ArticleCta post={post} />
          </div>
        </div>
      </div>

      {/* ── Related ── */}
      {related.length > 0 && (
        <div className="gr">
          <div className="h-rule h-rule--top" />
          <div className="gi section-pad-sm">
            <span className="type-label mb-[var(--sp-4)] block">Related</span>
            <div className="grid gap-0 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="card-feature group">
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
      <div className="gr">
        <div className="h-rule h-rule--top" />
        <div className="gi h-12 flex items-center justify-between">
          <Link href="/blog" className="nav-link-label hover:text-[color:var(--ink)] transition-colors inline-flex items-center gap-1.5">
            <ArrowLeft size={9} />
            All posts
          </Link>
          <span className="nav-link-label">Sancalana Journal</span>
        </div>
      </div>
    </>
  );
}
