import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogFilterTabs } from "@/components/blog/BlogFilterTabs";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Blog — Engineering, Process Mining & Product Updates",
  description: "How we think about process mining, what we're building, and why. Engineering deep-dives, architecture decisions, and perspectives from the Meridian team.",
  alternates: { canonical: "/blog" },
  openGraph: { images: ["/og.png"] },
};

export default function BlogPage() {
  const allPosts = getAllPosts();

  const posts = allPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
    author: p.author,
    tags: p.tags,
    readingTime: p.readingTime,
  }));

  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Blog"
        heading={<>From the <em>team</em></>}
        description="How we think about process mining, what we're building, and why."
      />

      {/* Filter tabs + entries */}
      <section className="gr">
        <div className="gi">
          <BlogFilterTabs posts={posts} />
        </div>
      </section>

      {/* CTA */}
      <CtaBand
        heading={<>Stay in the <em>loop</em></>}
        description="See how Meridian turns raw event logs into operational clarity. Request early access."
      />
    </>
  );
}
