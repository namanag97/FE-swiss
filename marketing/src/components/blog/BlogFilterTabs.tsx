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
          <div style={{ padding: "var(--sp-7) 0", textAlign: "center" }}>
            <p className="type-body" style={{ color: "var(--ink-muted)" }}>
              No posts yet in this category. Check back soon.
            </p>
          </div>
        ) : (
          filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group grid items-start transition-colors"
              style={{
                gridTemplateColumns: "1fr auto",
                gap: "var(--sp-5)",
                padding: "var(--sp-5) 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div className="flex flex-col" style={{ gap: "var(--sp-2)" }}>
                <h2
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: "var(--fs-lg)",
                    fontWeight: 400,
                    letterSpacing: "-.02em",
                    lineHeight: 1.15,
                    color: "var(--ink)",
                  }}
                >
                  {post.title}
                </h2>
                <div className="flex flex-wrap items-center" style={{ gap: "var(--sp-3)" }}>
                  <span
                    style={{
                      fontFamily: "var(--body)",
                      fontSize: "var(--fs-sm)",
                      fontWeight: 260,
                      letterSpacing: "-.01em",
                      color: "var(--ink-muted)",
                    }}
                  >
                    {post.author}
                  </span>
                  <span
                    className={`blog-tag ${tagClass[post.tags[0]?.toLowerCase() || ""] || "blog-tag--engineering"}`}
                  >
                    {post.tags[0] || "post"}
                  </span>
                </div>
              </div>
              <span
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: "var(--fs-xs)",
                  fontWeight: 400,
                  letterSpacing: ".04em",
                  color: "var(--ink-faint)",
                  whiteSpace: "nowrap",
                }}
              >
                {formatDate(post.date)}
              </span>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
