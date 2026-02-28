import Link from 'next/link'
import { homeContent } from '@/content/home'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

/* ═══════════════════════════════════════════════════════════════
   Homepage — composes section-level markup inline, driven by
   homeContent config.  Layout (Banner, Navbar, Footer) is in
   the root layout.tsx and does NOT appear here.
   ═══════════════════════════════════════════════════════════════ */

export default function HomePage() {
  const { hero, logos, engine, features, testimonial, connectors, playbooks, deploy, dashboards, timeline, cta } = homeContent

  return (
    <>
      {/* ── PAGE WRAPPER with vertical grid rails ── */}
      <div className="page">

        {/* ══════════ 1. HERO ══════════ */}
        <section style={{ padding: 'var(--sp-7) var(--sp-5) var(--sp-6)' }}>
          <Eyebrow variant="pulse">{hero.eyebrow}</Eyebrow>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-3xl)',
              fontWeight: 400,
              lineHeight: .89,
              letterSpacing: '-.03em',
              color: 'var(--ink)',
              marginTop: 'var(--sp-3)',
            }}
          >
            Data Analyst Agents for{' '}
            <em style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', color: 'var(--accent)' }}>
              Messy
            </em>{' '}
            Data
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-md)',
              fontWeight: 260,
              lineHeight: 1.65,
              letterSpacing: '-.015em',
              color: 'var(--ink-muted)',
              maxWidth: 540,
              marginTop: 'var(--sp-3)',
            }}
          >
            {hero.subtitle}
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-3)', marginTop: 'var(--sp-4)' }}>
            <Button variant="ghost" href="#">Get Started</Button>
            <Button variant="primary" href="/request-demo">Request Demo</Button>
          </div>
        </section>

        <div className="section-divider" />

        {/* ══════════ 2. LOGO STRIP ══════════ */}
        <section
          style={{
            padding: 'var(--sp-5) var(--sp-5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--sp-6)',
          }}
        >
          {logos.map((name) => (
            <span
              key={name}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '.03em',
                color: 'var(--ink-faint)',
              }}
            >
              {name}
            </span>
          ))}
        </section>

        <div className="section-divider" />

        {/* ══════════ 3. SECTION HEADING: Unified Data Engine ══════════ */}
        <section
          style={{
            padding: 'var(--sp-7) var(--sp-5) var(--sp-5)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--sp-3)',
          }}
        >
          <Eyebrow>{engine.eyebrow}</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 2.8vw, 40px)',
              fontWeight: 400,
              lineHeight: .95,
              letterSpacing: '-.025em',
              color: 'var(--ink)',
            }}
          >
            {engine.title}
          </h2>
        </section>

        {/* ══════════ 4. FEATURE CARDS (3-col) ══════════ */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
            padding: '0 var(--sp-5) var(--sp-7)',
          }}
        >
          {features.map((f, i) => (
            <Link
              key={f.eyebrow}
              href={f.href}
              style={{
                background: 'var(--white)',
                border: '1px solid var(--border)',
                marginLeft: i === 0 ? 0 : -1,
                padding: 'var(--sp-5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--sp-3)',
                transition: 'border-color var(--t-std)',
              }}
            >
              <Eyebrow>{f.eyebrow}</Eyebrow>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--fs-lg)',
                  fontWeight: 400,
                  letterSpacing: '-.02em',
                  color: 'var(--ink)',
                }}
              >
                {f.title}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--fs-sm)',
                  fontWeight: 260,
                  lineHeight: 1.5,
                  letterSpacing: '-.01em',
                  color: 'var(--ink-muted)',
                }}
              >
                {f.body}
              </span>
            </Link>
          ))}
        </section>

        <div className="section-divider" />

        {/* ══════════ 5. QUOTE BAND ══════════ */}
        <section
          style={{
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            padding: 'var(--sp-6) var(--sp-5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 'var(--sp-4)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-lg)',
              fontWeight: 260,
              lineHeight: 1.5,
              letterSpacing: '-.015em',
              color: 'var(--ink)',
              maxWidth: 600,
            }}
          >
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-xs)',
              fontWeight: 400,
              letterSpacing: '.06em',
              textTransform: 'uppercase',
              color: 'var(--ink-faint)',
            }}
          >
            {testimonial.name} &middot; {testimonial.role} &middot; {testimonial.company}
          </span>
        </section>

        <div className="section-divider" />

        {/* ══════════ 6. CONNECTORS ══════════ */}
        <section style={{ padding: 'var(--sp-7) var(--sp-5)' }}>
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--sp-3)',
              marginBottom: 'var(--sp-5)',
            }}
          >
            <Eyebrow>{connectors.eyebrow}</Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 2.8vw, 40px)',
                fontWeight: 400,
                lineHeight: .95,
                letterSpacing: '-.025em',
                color: 'var(--ink)',
              }}
            >
              {connectors.title}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-md)',
                fontWeight: 260,
                lineHeight: 1.6,
                letterSpacing: '-.015em',
                color: 'var(--ink-muted)',
                maxWidth: 540,
              }}
            >
              {connectors.body}
            </p>
          </div>

          {/* Active connectors */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)', justifyContent: 'center', marginBottom: 'var(--sp-3)' }}>
            {connectors.active.map((c) => (
              <Badge key={c} variant="green">{c}</Badge>
            ))}
          </div>

          {/* Available connectors */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)', justifyContent: 'center' }}>
            {connectors.available.map((c) => (
              <Badge key={c} variant="neutral">{c}</Badge>
            ))}
          </div>
        </section>

        <div className="section-divider" />

        {/* ══════════ 7. PLAYBOOKS ══════════ */}
        <section
          style={{
            padding: 'var(--sp-7) var(--sp-5)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--sp-3)',
          }}
        >
          <Eyebrow>{playbooks.eyebrow}</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 2.8vw, 40px)',
              fontWeight: 400,
              lineHeight: .95,
              letterSpacing: '-.025em',
              color: 'var(--ink)',
            }}
          >
            {playbooks.title}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-md)',
              fontWeight: 260,
              lineHeight: 1.6,
              letterSpacing: '-.015em',
              color: 'var(--ink-muted)',
              maxWidth: 540,
            }}
          >
            {playbooks.body}
          </p>
        </section>

        <div className="section-divider" />

        {/* ══════════ 8. DEPLOY ══════════ */}
        <section style={{ padding: 'var(--sp-7) var(--sp-5)' }}>
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--sp-3)',
              marginBottom: 'var(--sp-6)',
            }}
          >
            <Eyebrow>{deploy.eyebrow}</Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 2.8vw, 40px)',
                fontWeight: 400,
                lineHeight: .95,
                letterSpacing: '-.025em',
                color: 'var(--ink)',
              }}
            >
              {deploy.title}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-md)',
                fontWeight: 260,
                lineHeight: 1.6,
                letterSpacing: '-.015em',
                color: 'var(--ink-muted)',
                maxWidth: 540,
              }}
            >
              {deploy.body}
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)', justifyContent: 'center' }}>
            {deploy.certifications.map((c) => (
              <Badge key={c} variant="green">{c}</Badge>
            ))}
            {deploy.clouds.map((c) => (
              <Badge key={c} variant="neutral">{c}</Badge>
            ))}
            {deploy.llms.map((c) => (
              <Badge key={c} variant="neutral">{c}</Badge>
            ))}
          </div>
        </section>

        <div className="section-divider" />

        {/* ══════════ 9. DASHBOARDS ══════════ */}
        <section
          style={{
            padding: 'var(--sp-7) var(--sp-5)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--sp-3)',
          }}
        >
          <Eyebrow>{dashboards.eyebrow}</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 2.8vw, 40px)',
              fontWeight: 400,
              lineHeight: .95,
              letterSpacing: '-.025em',
              color: 'var(--ink)',
            }}
          >
            {dashboards.title}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-md)',
              fontWeight: 260,
              lineHeight: 1.6,
              letterSpacing: '-.015em',
              color: 'var(--ink-muted)',
              maxWidth: 540,
            }}
          >
            {dashboards.body}
          </p>
        </section>

        <div className="section-divider" />

        {/* ══════════ 10. TIMELINE STEPS ══════════ */}
        <section style={{ padding: 'var(--sp-7) var(--sp-5)' }}>
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--sp-3)',
              marginBottom: 'var(--sp-6)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 2.8vw, 40px)',
                fontWeight: 400,
                lineHeight: .95,
                letterSpacing: '-.025em',
                color: 'var(--ink)',
              }}
            >
              {timeline.title}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-md)',
                fontWeight: 260,
                lineHeight: 1.6,
                letterSpacing: '-.015em',
                color: 'var(--ink-muted)',
                maxWidth: 540,
              }}
            >
              {timeline.subtitle}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 0,
              border: '1px solid var(--border)',
            }}
          >
            {timeline.steps.map((step, i) => (
              <div
                key={step.label}
                style={{
                  padding: 'var(--sp-5)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--sp-2)',
                  borderRight: i < timeline.steps.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--fs-xs)',
                    fontWeight: 400,
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                  }}
                >
                  {step.label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--fs-lg)',
                    fontWeight: 400,
                    letterSpacing: '-.02em',
                    color: 'var(--ink)',
                  }}
                >
                  {step.title}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--fs-sm)',
                    fontWeight: 260,
                    lineHeight: 1.5,
                    letterSpacing: '-.01em',
                    color: 'var(--ink-muted)',
                  }}
                >
                  {step.body}
                </span>
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-md)',
              fontWeight: 260,
              color: 'var(--ink-muted)',
              textAlign: 'center',
              marginTop: 'var(--sp-5)',
            }}
          >
            {timeline.tagline}
          </p>
        </section>

      </div>

      {/* ══════════ 11. CTA BAND (full-bleed, outside .page) ══════════ */}
      <section className="cta-band">
        <h2 className="cta-band-heading">
          {cta.title} <em>{cta.titleAccent}</em>
        </h2>
        <p className="cta-band-sub">{cta.subtitle}</p>
        <div className="cta-band-actions">
          <Button variant="light" href="#">Get Started</Button>
          <Button variant="ghost-light" href="/request-demo">Request Demo</Button>
        </div>
      </section>

      <style>{`
        .cta-band {
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
        .cta-band-heading {
          font-family: var(--font-heading);
          font-size: clamp(28px, 3vw, var(--fs-2xl));
          font-weight: 400;
          line-height: .95;
          letter-spacing: -.03em;
          color: var(--white);
        }
        .cta-band-heading em {
          font-family: var(--font-accent);
          font-style: italic;
          color: var(--accent);
        }
        .cta-band-sub {
          font-family: var(--font-body);
          font-size: var(--fs-md);
          font-weight: 260;
          line-height: 1.6;
          letter-spacing: -.015em;
          color: rgba(255,255,255,.5);
          max-width: 480px;
        }
        .cta-band-actions {
          display: flex;
          gap: var(--sp-3);
          margin-top: var(--sp-2);
        }
      `}</style>
    </>
  )
}
