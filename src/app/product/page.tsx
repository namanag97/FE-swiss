import { productContent } from '@/content/product'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'

/* ═══════════════════════════════════════════════════════════════
   Product Page (Threads)
   Sections: PageHero -> FeatureSection -> FeatureSection (reversed)
   -> QuoteBand -> StatsRow -> ClosingCTA -> CTABand
   ═══════════════════════════════════════════════════════════════ */

export default function ProductPage() {
  const { hero, features, quote, stats, closing, cta } = productContent

  return (
    <>
      <div className="page">

        {/* ── PRODUCT HERO ── */}
        <section className="product-hero">
          <h1>{hero.title}</h1>
          <p>{hero.subtitle}</p>
          <div className="product-hero-actions">
            <Button variant="ghost" href="#">Get Started</Button>
            <Button variant="primary" href="/request-demo">Request Demo</Button>
          </div>
        </section>

        {/* ── FEATURE SECTIONS ── */}
        {features.map((feat) => (
          <div
            key={feat.eyebrow}
            className={`feature${feat.reversed ? ' feature--reversed' : ''}`}
          >
            <div className="feature-text">
              <Eyebrow>{feat.eyebrow}</Eyebrow>
              <h2 className="feature-title">{feat.title}</h2>
              <p className="feature-body">{feat.body}</p>
            </div>
            <div className="feature-visual">
              <div className="screenshot">
                <span className="screenshot-label">Product Screenshot</span>
              </div>
            </div>
          </div>
        ))}

        {/* ── QUOTE BAND ── */}
        <div className="quote-band">
          <p className="quote-band-text">{quote.text}</p>
          <span className="quote-band-attrib">{quote.name} &middot; {quote.role}</span>
        </div>

        {/* ── STAT ROW ── */}
        <div className="stat-row">
          {stats.map((stat) => (
            <div key={stat.unit} className="stat-cell">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-unit">{stat.unit}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* ── CLOSING CTA ── */}
        <section className="closing-cta">
          <h2>{closing.title}</h2>
          <div style={{ marginTop: 'var(--sp-3)' }}>
            <Button variant="primary" href="/request-demo">Request Demo</Button>
          </div>
        </section>

      </div>

      {/* ── CTA BAND (full-bleed) ── */}
      <section className="product-cta-band">
        <h2>{cta.title} <em>{cta.titleAccent}</em></h2>
        <p>{cta.subtitle}</p>
        <div className="product-cta-actions">
          <Button variant="light" href="#">Get Started</Button>
          <Button variant="ghost-light" href="/request-demo">Request Demo</Button>
        </div>
      </section>

      <style>{`
        /* ── PRODUCT HERO ── */
        .product-hero {
          padding: var(--sp-7) var(--sp-5) var(--sp-6);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--sp-3);
        }
        .product-hero h1 {
          font-family: var(--font-heading);
          font-size: var(--fs-3xl);
          font-weight: 400;
          line-height: .89;
          letter-spacing: -.03em;
          color: var(--ink);
        }
        .product-hero p {
          font-family: var(--font-body);
          font-size: var(--fs-md);
          font-weight: 260;
          line-height: 1.65;
          letter-spacing: -.015em;
          color: var(--ink-muted);
          max-width: 540px;
        }
        .product-hero-actions {
          display: flex;
          gap: var(--sp-3);
          margin-top: var(--sp-3);
        }

        /* ── FEATURE SECTION (2-col) ── */
        .feature {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border-top: 1px solid var(--border);
        }
        .feature--reversed { direction: rtl; }
        .feature--reversed > * { direction: ltr; }
        .feature-text {
          padding: var(--sp-7) var(--sp-5);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: var(--sp-3);
        }
        .feature-title {
          font-family: var(--font-heading);
          font-size: clamp(24px, 2.5vw, 36px);
          font-weight: 400;
          line-height: .95;
          letter-spacing: -.025em;
          color: var(--ink);
        }
        .feature-body {
          font-family: var(--font-body);
          font-size: var(--fs-md);
          font-weight: 260;
          line-height: 1.65;
          letter-spacing: -.015em;
          color: var(--ink-muted);
          max-width: 440px;
        }
        .feature-visual {
          background: var(--white);
          border-left: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--sp-5);
          min-height: 400px;
        }
        .feature--reversed .feature-visual {
          border-left: none;
          border-right: 1px solid var(--border);
        }
        .screenshot {
          width: 100%;
          max-width: 480px;
          aspect-ratio: 4/3;
          background: var(--bg);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .screenshot-label {
          font-family: var(--font-heading);
          font-size: var(--fs-xs);
          font-weight: 400;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--ink-faint);
          opacity: .5;
        }

        /* ── QUOTE BAND ── */
        .quote-band {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: var(--sp-6) var(--sp-5);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: var(--sp-4);
        }
        .quote-band-text {
          font-family: var(--font-body);
          font-size: var(--fs-lg);
          font-weight: 260;
          line-height: 1.5;
          letter-spacing: -.015em;
          color: var(--ink);
          max-width: 600px;
        }
        .quote-band-text::before { content: '\\201C'; }
        .quote-band-text::after { content: '\\201D'; }
        .quote-band-attrib {
          font-family: var(--font-heading);
          font-size: var(--fs-xs);
          font-weight: 400;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: var(--ink-faint);
        }

        /* ── STAT ROW ── */
        .stat-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid var(--border);
        }
        .stat-cell {
          padding: var(--sp-5);
          display: flex;
          flex-direction: column;
          gap: var(--sp-2);
          border-right: 1px solid var(--border);
          text-align: center;
        }
        .stat-cell:last-child { border-right: none; }
        .stat-value {
          font-family: var(--font-heading);
          font-size: var(--fs-2xl);
          font-weight: 400;
          letter-spacing: -.04em;
          line-height: 1;
          color: var(--ink-dark);
        }
        .stat-unit {
          font-family: var(--font-heading);
          font-size: var(--fs-xs);
          font-weight: 400;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .stat-label {
          font-family: var(--font-body);
          font-size: var(--fs-sm);
          font-weight: 260;
          line-height: 1.5;
          letter-spacing: -.01em;
          color: var(--ink-muted);
        }

        /* ── CLOSING CTA ── */
        .closing-cta {
          padding: var(--sp-7) var(--sp-5);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--sp-3);
        }
        .closing-cta h2 {
          font-family: var(--font-heading);
          font-size: clamp(28px, 2.8vw, 40px);
          font-weight: 400;
          line-height: .95;
          letter-spacing: -.025em;
          color: var(--ink);
        }

        /* ── CTA BAND ── */
        .product-cta-band {
          background-color: var(--ink-dark);
          background-image:
            url('https://pub-0c8dadde61494a1b8933d138cdc802f7.r2.dev/assets/images/backgrounds/background.webp'),
            repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,.007) 3px, rgba(255,255,255,.007) 6px);
          background-size: auto, auto;
          background-repeat: repeat, repeat;
          padding: var(--sp-7) var(--sp-5);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--sp-4);
        }
        .product-cta-band h2 {
          font-family: var(--font-heading);
          font-size: clamp(28px, 3vw, var(--fs-2xl));
          font-weight: 400;
          line-height: .95;
          letter-spacing: -.03em;
          color: var(--white);
        }
        .product-cta-band h2 em {
          font-family: var(--font-accent);
          font-style: italic;
          color: var(--accent);
        }
        .product-cta-band p {
          font-family: var(--font-body);
          font-size: var(--fs-md);
          font-weight: 260;
          line-height: 1.6;
          letter-spacing: -.015em;
          color: rgba(255,255,255,.5);
          max-width: 480px;
        }
        .product-cta-actions {
          display: flex;
          gap: var(--sp-3);
          margin-top: var(--sp-2);
        }
      `}</style>
    </>
  )
}
