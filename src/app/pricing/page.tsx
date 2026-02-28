'use client'

import { useState } from 'react'
import Link from 'next/link'
import { pricingContent } from '@/content/pricing'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import s from './pricing.module.css'

/* ═══════════════════════════════════════════════════════════════
   Pricing Page
   Sections: PageHero -> PricingGrid -> SectionDivider ->
   DeploySection -> SectionDivider -> FAQ -> SectionDivider -> CTABand
   ═══════════════════════════════════════════════════════════════ */

function CheckSvg() {
  return (
    <svg className={s.check} viewBox="0 0 14 14" fill="none">
      <path d="M3 7.5l2.5 2.5L11 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PlusSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function PricingPage() {
  const { hero, tiers, deploy, faq, cta } = pricingContent
  const [openFaq, setOpenFaq] = useState<number>(0)

  return (
    <>
      <div className="page">

        {/* ── PRICING HERO ── */}
        <div className={s.pricingHero}>
          <h1>{hero.title}</h1>
          <p>{hero.subtitle}</p>
        </div>

        {/* ── PRICING GRID ── */}
        <div className={s.pricingGrid}>
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`${s.pricingCard} ${tier.featured ? s.pricingCardFeatured : ''}`}
            >
              {tier.featured && (
                <div className={s.pricingBadge}>Most Popular</div>
              )}
              <span className={s.tierLabel}>{tier.label}</span>
              <span className={s.tierName}>{tier.name}</span>
              <p className={s.tierDesc}>{tier.description}</p>
              <div className={s.priceRow}>
                <span className={s.priceAmount}>{tier.price}</span>
                <span className={s.pricePeriod}>{tier.period}</span>
              </div>
              <div className={s.featureList}>
                {tier.features.map((feat) => (
                  <div key={feat} className={s.featureItem}>
                    <CheckSvg />
                    {feat}
                  </div>
                ))}
              </div>
              <div className={s.cardCta}>
                <Button
                  variant={tier.cta.variant}
                  href="#"
                  fullWidth
                >
                  {tier.cta.label}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="section-divider" />

        {/* ── DEPLOY SECTION ── */}
        <div className={s.deploySection}>
          <div className={s.deploySectionHead}>
            <Eyebrow>{deploy.eyebrow}</Eyebrow>
            <h2>{deploy.title}</h2>
            <p>{deploy.body}</p>
          </div>

          <div className={s.deployGrid}>
            <div className={s.deployLeft}>
              <div className={s.deploySubtitle}>Your Air-Gapped Environment</div>
              <div className={s.deployBody}>Full data sovereignty with your cloud provider of choice.</div>
              <div style={{ marginBottom: 'var(--sp-3)' }}>
                <div className={s.diagramLabel}>Cloud Providers</div>
                <div className={s.badgeRow}>
                  {deploy.clouds.map((c) => (
                    <span key={c} className={s.badge}>{c}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className={s.diagramLabel}>Components</div>
                <div className={s.badgeRow}>
                  {deploy.components.map((c) => (
                    <span key={c} className={s.badge}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className={s.deployRight}>
              <div className={s.deploySubtitle}>Security &amp; Compliance</div>
              <div className={s.deployBody}>Enterprise-grade security with industry certifications.</div>
              <div style={{ marginBottom: 'var(--sp-3)' }}>
                <div className={s.diagramLabel}>Certifications</div>
                <div className={s.badgeRow}>
                  {deploy.certifications.map((c) => (
                    <span key={c} className={`${s.badge} ${s.badgeGreen}`}>{c}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className={s.diagramLabel}>LLM Providers</div>
                <div className={s.badgeRow}>
                  {deploy.llms.map((c) => (
                    <span key={c} className={s.badge}>{c}</span>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 'var(--sp-4)' }}>
                <div className={s.diagramLabel}>Use Cases</div>
                <div className={s.badgeRow}>
                  {deploy.useCases.map((c) => (
                    <span key={c} className={s.badge}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--sp-5)' }}>
            <Button variant="primary" href="/request-demo">Request Demo</Button>
          </div>
        </div>

        <div className="section-divider" />

        {/* ── FAQ ── */}
        <div className={s.faqSection}>
          <h2>{faq.title}</h2>
          <div className={s.faqList}>
            {faq.items.map((item, i) => (
              <div
                key={item.question}
                className={`${s.faqItem} ${openFaq === i ? s.faqItemOpen : ''}`}
              >
                <button
                  className={s.faqQ}
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  {item.question}
                  <PlusSvg />
                </button>
                <div className={s.faqA}>
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
          <p className={s.faqNote}>
            {faq.note}{' '}
            {faq.noteLinks.map((link, i) => (
              <span key={link.label}>
                {i > 0 && ' or '}
                <Link href={link.href}>{link.label}</Link>
              </span>
            ))}
          </p>
        </div>

        <div className="section-divider" />
      </div>

      {/* ── CTA BAND (full-bleed) ── */}
      <div className={s.ctaBand}>
        <h2>{cta.title} <em>{cta.titleAccent}</em></h2>
        <p>{cta.subtitle}</p>
        <div className={s.ctaActions}>
          <Button variant="light" href="#">Get Started</Button>
          <Button variant="ghost-light" href="/request-demo">Request Demo</Button>
        </div>
      </div>
    </>
  )
}
