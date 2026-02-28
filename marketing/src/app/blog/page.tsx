import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Engineering insights, product updates, and technical deep-dives from our team.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="py-24 md:py-28">
      <Container size="wide">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-600">Blog</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
          Insights &amp; Updates
        </h1>
        <p className="mt-4 max-w-lg text-base text-neutral-500">
          Engineering deep-dives, product updates, and lessons learned from building at scale.
        </p>

        {posts.length === 0 ? (
          <div className="mt-16 rounded-xl border border-neutral-200 bg-neutral-50 p-12 text-center">
            <p className="text-neutral-500">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group flex flex-col rounded-xl border border-neutral-200 bg-white transition-all hover:border-neutral-300 hover:shadow-sm ${
                  i === 0 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="aspect-[16/9] rounded-t-xl bg-neutral-100" />

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  <h2 className="mt-3 text-base font-semibold text-neutral-900 group-hover:text-accent-600">
                    {post.title}
                  </h2>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-neutral-500">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <span>{formatDate(post.date)}</span>
                      <span>&middot;</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-neutral-300 transition-all group-hover:translate-x-0.5 group-hover:text-accent-600" />
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
