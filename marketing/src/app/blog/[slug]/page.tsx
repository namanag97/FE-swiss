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
    <article className="py-16 md:py-20">
      <Container size="wide">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <Link href="/blog" className="inline-flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-gray-900">
          <ArrowLeft className="h-3.5 w-3.5" />
          All posts
        </Link>

        <div className="mt-8 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
        </div>

        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
          {post.title}
        </h1>

        <div className="mt-3 flex items-center gap-2 text-[13px] text-gray-500">
          <span className="font-medium text-gray-700">{post.author}</span>
          <span className="text-gray-300">/</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="text-gray-300">/</span>
          <span>{post.readingTime}</span>
        </div>

        <div className="mt-4">
          <ShareButtons url={articleUrl} title={post.title} />
        </div>

        <TableOfContents content={post.content} />

        <hr className="my-8 border-gray-200" />

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

        <hr className="my-8 border-gray-200" />

        {related.length > 0 && (
          <section className="mt-8">
            <h2 className="text-[14px] font-semibold text-gray-900">Related posts</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group rounded-lg border border-gray-200 p-5 transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex gap-1.5">
                    {r.tags.slice(0, 2).map((t) => <Badge key={t}>{t}</Badge>)}
                  </div>
                  <h3 className="mt-2 text-[14px] font-semibold text-gray-900 group-hover:text-emerald-600">{r.title}</h3>
                  <p className="mt-1 text-[13px] text-gray-500 line-clamp-2">{r.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Link href="/blog" className="mt-8 inline-flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-gray-900">
          <ArrowLeft className="h-3.5 w-3.5" />
          All posts
        </Link>
      </Container>
    </article>
  );
}
