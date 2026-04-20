"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  readingTime: string;
}

const ALL_TABS = ["All", "Engineering", "Announcements", "Research", "Team", "Insights"] as const;

const tagClass: Record<string, string> = {
  announcements: "blog-tag--announcements",
  engineering: "blog-tag--engineering",
  team: "blog-tag--team",
  research: "blog-tag--research",
  insights: "blog-tag--insights",
};

export function BlogFilterTabs({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<string>("All");

  const filtered = active === "All"
    ? posts
    : posts.filter((p) => p.tags.some((t) => t.toLowerCase() === active.toLowerCase()));

  return (
    <>
      <div className="filter-row">
        {ALL_TABS.map((tab) => (
          <button
            key={tab}
            className={`filter-tab${active === tab ? " filter-tab--active" : ""}`}
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        {filtered.length === 0 ? (
          <div className="py-[var(--sp-7)] text-center">
            <p className="type-body text-[color:var(--ink-muted)]">
              No posts yet in this category. Check back soon.
            </p>
          </div>
        ) : (
          filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group grid grid-cols-[1fr_auto] items-start gap-[var(--sp-5)] border-b border-[var(--border)] py-[var(--sp-5)] transition-colors"
            >
              <div className="flex flex-col gap-[var(--sp-2)]">
                <h2 className="type-h3">{post.title}</h2>
                <div className="flex flex-wrap items-center gap-[var(--sp-3)]">
                  <span className="type-body-sm">{post.author}</span>
                  <span className={`blog-tag ${tagClass[post.tags[0]?.toLowerCase() || ""] || "blog-tag--engineering"}`}>
                    {post.tags[0] || "post"}
                  </span>
                </div>
              </div>
              <span className="type-label whitespace-nowrap">
                {formatDate(post.date)}
              </span>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
