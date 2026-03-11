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

      {filtered.length === 0 ? (
        <div className="py-[var(--sp-7)] text-center">
          <p className="type-body text-[color:var(--ink-muted)]">
            No posts yet in this category. Check back soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--sp-4)]">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card-feature group"
            >
              <div className="flex items-center gap-[var(--sp-2)]">
                <span className={`blog-tag ${tagClass[post.tags[0]?.toLowerCase() || ""] || "blog-tag--engineering"}`}>
                  {post.tags[0] || "post"}
                </span>
                <span className="type-label">{post.readingTime}</span>
              </div>
              <h2 className="type-h3 mt-[var(--sp-2)]">{post.title}</h2>
              <p className="card-body line-clamp-2 mt-[var(--sp-1)]">{post.description}</p>
              <div className="flex items-center justify-between mt-auto pt-[var(--sp-3)]">
                <span className="type-body-sm">{post.author}</span>
                <span className="type-label">{formatDate(post.date)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
