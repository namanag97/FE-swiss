'use client'

import { useState } from 'react'
import Link from 'next/link'
import { blogContent } from '@/content/blog'
import type { BlogPost } from '@/content/blog'
import s from './blog.module.css'

/* ═══════════════════════════════════════════════════════════════
   Blog Page — "use client" for filter tabs
   Sections: Hero -> FilterTabs -> FeaturedPost -> BlogList -> NewsletterBand
   ═══════════════════════════════════════════════════════════════ */

const TAG_CLASS: Record<string, string> = {
  Announcements: s.tagAnnouncements,
  Engineering: s.tagEngineering,
  Team: s.tagTeam,
  Research: s.tagResearch,
}

export default function BlogPage() {
  const { hero, categories, featured, posts, newsletter } = blogContent
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredPosts =
    activeCategory === 'All'
      ? posts
      : posts.filter((p) => p.category === activeCategory)

  return (
    <>
      <div className="page" style={{ padding: '0 var(--sp-5)' }}>

        {/* ── BLOG HERO ── */}
        <div className={s.blogHero}>
          <h1>
            {hero.title}{' '}
            <em>{hero.titleAccent}</em>{' '}
            {hero.titleEnd}
          </h1>
          <p className={s.blogHeroSub}>{hero.subtitle}</p>
        </div>

        {/* ── FILTER TABS ── */}
        <div className={s.filterRow}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${s.filterTab} ${activeCategory === cat ? s.filterTabActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── FEATURED POST ── */}
        {activeCategory === 'All' && (
          <Link href={featured.href} className={s.featuredPost}>
            <div className={s.featuredVisual}>
              <span className={s.featuredVisualLabel}>Featured Image</span>
            </div>
            <div className={s.featuredContent}>
              <span className={`${s.blogTag} ${TAG_CLASS[featured.category] ?? ''}`}>
                {featured.category}
              </span>
              <h2 className={s.featuredTitle}>{featured.title}</h2>
              <p className={s.featuredExcerpt}>{featured.excerpt}</p>
              <div className={s.featuredMeta}>
                <span className={s.avatar}>{featured.authorInitials}</span>
                <span className={s.metaName}>{featured.author}</span>
                <span className={s.metaDate}>{featured.date}</span>
              </div>
            </div>
          </Link>
        )}

        {/* ── BLOG LIST ── */}
        <div className={s.blogList}>
          {filteredPosts.map((post) => (
            <Link key={post.title} href={post.href} className={s.blogEntry}>
              <div className={s.blogEntryContent}>
                <h2 className={s.blogEntryTitle}>{post.title}</h2>
                <div className={s.blogEntryMeta}>
                  <span className={s.blogEntryAuthor}>{post.author}</span>
                  <span className={`${s.blogTag} ${TAG_CLASS[post.category] ?? ''}`}>
                    {post.category}
                  </span>
                </div>
              </div>
              <span className={s.blogEntryRight}>{post.date}</span>
            </Link>
          ))}
        </div>

        <div style={{ height: 'var(--sp-7)' }} />
      </div>

      {/* ── NEWSLETTER BAND (full-bleed) ── */}
      <div className={s.newsletterBand}>
        <h2>{newsletter.title} <em>{newsletter.titleAccent}</em></h2>
        <p>{newsletter.subtitle}</p>
        <div className={s.nlRow}>
          <input
            className={s.nlInput}
            type="email"
            placeholder="you@company.com"
          />
          <button className={s.nlBtn}>Subscribe</button>
        </div>
      </div>
    </>
  )
}
