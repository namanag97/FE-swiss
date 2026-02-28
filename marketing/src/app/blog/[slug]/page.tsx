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

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `${siteConfig.url}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="py-20 md:py-24">
      <Container size="content">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All posts
        </Link>

        <div className="mt-8 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          {post.title}
        </h1>

        <div className="mt-4 flex items-center gap-3 text-sm text-neutral-500">
          <span className="font-medium text-neutral-700">{post.author}</span>
          <span className="text-neutral-300">/</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="text-neutral-300">/</span>
          <span>{post.readingTime}</span>
        </div>

        <hr className="my-10 border-neutral-200" />

        <div className="prose">
          <BlogContent source={post.content} />
        </div>

        <hr className="my-10 border-neutral-200" />

        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to all posts
        </Link>
      </Container>
    </article>
  );
}
