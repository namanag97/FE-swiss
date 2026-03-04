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
    <article className="gr">
      <Container size="wide" className="p-[var(--sp-7)_var(--sp-5)]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <Link href="/blog" className="inline-flex items-center gap-1.5 transition-colors text-[length:var(--fs-sm)] text-[color:var(--ink-faint)]">
          <ArrowLeft className="w-3.5 h-3.5" />
          All posts
        </Link>

        <div className="mt-8 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
        </div>

        <h1 className="type-h2 mt-3">
          {post.title}
        </h1>

        <div className="mt-3 flex items-center gap-[var(--sp-3)] type-body-sm">
          <span className="font-medium text-[color:var(--ink-dark)]">{post.author}</span>
          <span className="text-[color:var(--border-nav)]">/</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="text-[color:var(--border-nav)]">/</span>
          <span>{post.readingTime}</span>
        </div>

        <div className="mt-4">
          <ShareButtons url={articleUrl} title={post.title} />
        </div>

        <div className="lg:hidden">
          <TableOfContents content={post.content} />
        </div>

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

        <Link href="/blog" className="mt-8 inline-flex items-center gap-1.5 transition-colors text-[length:var(--fs-sm)] text-[color:var(--ink-faint)]">
          <ArrowLeft className="w-3.5 h-3.5" />
          All posts
        </Link>
      </Container>
    </article>
  );
}
