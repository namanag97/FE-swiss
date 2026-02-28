import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
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
    <section className="py-20 md:py-24">
      <Container size="wide">
        <div className="max-w-lg">
          <p className="text-[11px] font-medium uppercase tracking-widest text-emerald-600">Blog</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
            Insights &amp; Updates
          </h1>
          <p className="mt-3 text-[15px] text-gray-500">
            Engineering deep-dives, product updates, and process mining perspectives.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="mt-14 rounded-xl border border-gray-200 bg-gray-50 p-10 text-center">
            <p className="text-[14px] text-gray-500">No posts yet.</p>
          </div>
        ) : (
          <div className="mt-14 divide-y divide-sand-200 border-t border-gray-200">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-start justify-between gap-6 py-7"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  <h2 className="mt-2 text-base font-semibold text-gray-900 group-hover:text-emerald-600">
                    {post.title}
                  </h2>
                  <p className="mt-1 text-[14px] leading-relaxed text-gray-500">
                    {post.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-[12px] text-sand-400">
                    <span>{post.author}</span>
                    <span>/</span>
                    <span>{formatDate(post.date)}</span>
                    <span>/</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
                <ArrowRight className="mt-8 h-4 w-4 shrink-0 text-sand-300 transition-all group-hover:translate-x-0.5 group-hover:text-terra-500" />
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
