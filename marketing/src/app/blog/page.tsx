"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";

const posts = [
  { title: "Ana Just Got 25% Cheaper", author: "Meridian Team", tag: "Announcements", date: "January 15, 2026", slug: "ana-cheaper" },
  { title: "Introducing Sandcastles — the Sandbox for Analytical Workloads", author: "Mark Hay, Gabriel Tomitsuka, Rodney Shen, Brian Bickell", tag: "Engineering", date: "December 17, 2025", slug: "sandcastles" },
  { title: "Why I'm Joining Meridian", author: "Brian Bickell", tag: "Team", date: "October 29, 2025", slug: "joining-meridian" },
  { title: "Meridian Launches into Healthcare Vertical", author: "Ethan Ding", tag: "Announcements", date: "October 9, 2025", slug: "healthcare-launch" },
  { title: "From McKinsey to Meridian", author: "Ivy Teng", tag: "Team", date: "September 19, 2025", slug: "mckinsey-to-meridian" },
  { title: "Ana in Slack", author: "Ivy Teng", tag: "Announcements", date: "September 16, 2025", slug: "ana-slack" },
  { title: "Playbooks Launch: Ana Now Runs Autonomously", author: "Ivy Teng", tag: "Announcements", date: "September 2, 2025", slug: "playbooks-launch" },
  { title: "Ana Launch", author: "Ivy Teng", tag: "Announcements", date: "August 26, 2025", slug: "ana-launch" },
  { title: "Making AI That Can Process 1,000,000x More Data", author: "Ethan Ding", tag: "Announcements", date: "August 6, 2025", slug: "million-x-data" },
  { title: "Guide to Analytics Agent Levels for CIOs", author: "Ethan Ding", tag: "Insights", date: "June 16, 2025", slug: "analytics-agent-levels" },
  { title: "Beyond Guesswork", author: "Matt Abate", tag: "Research", date: "May 22, 2025", slug: "beyond-guesswork" },
  { title: "Benchmarking AI Vision with Puzzles", author: "Matt Abate", tag: "Research", date: "May 13, 2025", slug: "ai-vision-puzzles" },
  { title: "Open-Sourcing State of the Art Text-to-SQL", author: "Spencer Hubert", tag: "Announcements", date: "March 10, 2025", slug: "open-source-text-sql" },
  { title: "Our Ontology-Based Text to SQL Generation Process", author: "Ethan Ding", tag: "Engineering", date: "October 18, 2024", slug: "ontology-text-sql" },
  { title: "Why We Use an Ontology for Text to SQL", author: "Ethan Ding", tag: "Engineering", date: "October 17, 2024", slug: "why-ontology" },
  { title: "Haskell in Production: Meridian's Ontology Service", author: "Mark Hay", tag: "Engineering", date: "February 7, 2024", slug: "haskell-production" },
  { title: "Announcing Meridian's SOC II Report", author: "Gabriel Tomitsuka", tag: "Announcements", date: "January 29, 2024", slug: "soc-ii" },
  { title: "Meridian Joins NBA Launchpad to Revolutionize Fan Data Analytics", author: "Gabriel Tomitsuka", tag: "Announcements", date: "January 11, 2024", slug: "nba-launchpad" },
];

const tabs = ["All", "Engineering", "Announcements", "Research", "Team", "Insights"];

const tagClass: Record<string, string> = {
  Announcements: "blog-tag--announcements",
  Engineering: "blog-tag--engineering",
  Team: "blog-tag--team",
  Research: "blog-tag--research",
  Insights: "blog-tag--insights",
};

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All" ? posts : posts.filter((p) => p.tag === activeTab);

  return (
    <>
      {/* Hero */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-7) var(--sp-5) var(--sp-5)' }}>
          <h1 style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-3xl)', fontWeight: 400, lineHeight: .89, letterSpacing: '-.03em', color: 'var(--ink)' }}>
            Blog
          </h1>
        </div>
      </section>

      {/* Filter tabs + entries */}
      <section className="gr">
        <div className="gi">
          <div className="filter-row">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`filter-tab${activeTab === tab ? ' filter-tab--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-col">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group grid items-start transition-colors"
                style={{ gridTemplateColumns: '1fr auto', gap: 'var(--sp-5)', padding: 'var(--sp-5) 0', borderBottom: '1px solid var(--border)' }}
              >
                <div className="flex flex-col" style={{ gap: 'var(--sp-2)' }}>
                  <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-lg)', fontWeight: 400, letterSpacing: '-.02em', lineHeight: 1.15, color: 'var(--ink)' }}>
                    {post.title}
                  </h2>
                  <div className="flex flex-wrap items-center" style={{ gap: 'var(--sp-3)' }}>
                    <span style={{ fontFamily: 'var(--body)', fontSize: 'var(--fs-sm)', fontWeight: 260, letterSpacing: '-.01em', color: 'var(--ink-muted)' }}>
                      {post.author}
                    </span>
                    <span className={`blog-tag ${tagClass[post.tag] || 'blog-tag--engineering'}`}>
                      {post.tag}
                    </span>
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', fontWeight: 400, letterSpacing: '.04em', color: 'var(--ink-faint)', whiteSpace: 'nowrap' }}>
                  {post.date}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <h2>Stay in the <em>loop</em></h2>
        <p>Engineering deep-dives, product updates, and process mining perspectives.</p>
        <Link href="/contact" className="btn btn-primary">Subscribe</Link>
      </section>
    </>
  );
}
