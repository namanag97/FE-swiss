import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, updates, and guides from our team.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="py-24 md:py-32">
      <Container size="wide">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
          Blog
        </h1>
        <p className="mt-4 max-w-xl text-lg text-neutral-500">
          Insights, updates, and guides from our team.
        </p>

        {posts.length === 0 ? (
          <div className="mt-16 rounded-xl border border-neutral-200 bg-neutral-50 p-12 text-center">
            <p className="text-neutral-500">
              No posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-xl border border-neutral-200 bg-white transition-colors hover:border-neutral-400"
              >
                {/* Image placeholder */}
                {post.image ? (
                  <div className="aspect-[16/9] overflow-hidden rounded-t-xl bg-neutral-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] rounded-t-xl bg-neutral-100" />
                )}

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  <h2 className="mt-3 text-lg font-semibold text-neutral-900 group-hover:text-accent-600">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-500">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-neutral-400">
                    <span>{formatDate(post.date)}</span>
                    <span>&middot;</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
