import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
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
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    url: articleUrl,
  };

  return (
    <article className="gr">
      <Container size="wide" style={{ padding: 'var(--sp-7) var(--sp-5)' } as React.CSSProperties}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <Link href="/blog" className="inline-flex items-center gap-1.5 transition-colors" style={{ fontSize: 'var(--fs-sm)', color: 'var(--ink-faint)' }}>
          <ArrowLeft style={{ width: 14, height: 14 }} />
          All posts
        </Link>

        <div className="mt-8 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
        </div>

        <h1 className="type-h2" style={{ marginTop: 'var(--sp-3)' }}>
          {post.title}
        </h1>

        <div className="mt-3 flex items-center" style={{ gap: 'var(--sp-3)', fontFamily: 'var(--body)', fontSize: 'var(--fs-sm)', fontWeight: 260, color: 'var(--ink-muted)' }}>
          <span style={{ fontWeight: 500, color: 'var(--ink-dark)' }}>{post.author}</span>
          <span style={{ color: 'var(--border-nav)' }}>/</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span style={{ color: 'var(--border-nav)' }}>/</span>
          <span>{post.readingTime}</span>
        </div>

        <div className="mt-4">
          <ShareButtons url={articleUrl} title={post.title} />
        </div>

        <TableOfContents content={post.content} />

        <div className="divider-h my-8" />

        <div className="grid gap-12 lg:grid-cols-[1fr_220px]">
          <div className="prose">
            <BlogContent source={post.content} />
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents content={post.content} />
            </div>
          </aside>
        </div>

        <div className="divider-h my-8" />

        {related.length > 0 && (
          <section className="mt-8">
            <h2 className="type-label">Related posts</h2>
            <div className="mt-4 grid gap-0 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="card-feature group"
                >
                  <div className="flex gap-1.5">
                    {r.tags.slice(0, 2).map((t) => <Badge key={t}>{t}</Badge>)}
                  </div>
                  <p className="card-title">{r.title}</p>
                  <p className="card-body line-clamp-2">{r.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Link href="/blog" className="mt-8 inline-flex items-center gap-1.5 transition-colors" style={{ fontSize: 'var(--fs-sm)', color: 'var(--ink-faint)' }}>
          <ArrowLeft style={{ width: 14, height: 14 }} />
          All posts
        </Link>
      </Container>
    </article>
  );
}
