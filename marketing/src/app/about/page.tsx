import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "We believe every business process tells a story. Meridian makes those stories visible.",
  alternates: { canonical: "/about" },
  openGraph: { images: ["/og.png"] },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="gr" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
        <div className="gi" style={{ textAlign: 'center' }}>
          <span className="eyebrow eyebrow-bracket">About</span>
          <h1 className="type-display" style={{ marginTop: 'var(--sp-3)' }}>
            We believe every process<br /><em>tells a story</em>
          </h1>
          <p className="type-body" style={{ maxWidth: 560, margin: '0 auto', marginTop: 'var(--sp-4)', color: 'var(--ink-mid)' }}>
            Most businesses run on processes they can&apos;t see. We&apos;re building the tools to make
            operational reality visible, measurable, and improvable.
          </p>
        </div>
      </section>

      {/* The Problem — with ASCII art */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
          <div className="about-split">
            <div>
              <span className="eyebrow eyebrow-bracket">The Problem</span>
              <h2 className="type-h2" style={{ marginTop: 'var(--sp-3)' }}>
                Processes are <em>invisible</em>
              </h2>
              <p className="type-body" style={{ marginTop: 'var(--sp-4)', color: 'var(--ink-mid)' }}>
                Every organization has a process diagram on the wall. None of them match reality.
                The gap between how work is designed and how work actually happens is where
                inefficiency hides — in rework loops, unnecessary approvals, and bottlenecks
                that nobody can see because nobody is looking.
              </p>
              <p className="type-body" style={{ marginTop: 'var(--sp-3)', color: 'var(--ink-mid)' }}>
                Traditional analytics tells you what happened. It can&apos;t tell you how it happened —
                the sequence of steps, the variants, the deviations from the plan.
              </p>
            </div>
            <div className="ascii-frame">
              <pre className="ascii-art" style={{ margin: 0 }}>
{`  HOW YOU THINK IT WORKS:
  ━━━━━━━━━━━━━━━━━━━━━━
  Order → Check → Approve → Ship
  (clean, linear, simple)


  HOW IT ACTUALLY WORKS:
  ━━━━━━━━━━━━━━━━━━━━━━
  Order → Check → ??? → Review
     ↑              │
     └── Rework ◄───┘
           │
           ├──▶ Approve → Ship
           │          ↑
           └──▶ ??? ──┘
  (messy, looping, unknown)`}</pre>
            </div>
          </div>
        </div>
      </section>

      <div className="ascii-divider">&middot; &middot; &middot;   &middot; &middot; &middot;   &middot; &middot; &middot;</div>

      {/* Our Approach — with architecture diagram */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--sp-6)' }}>
            <span className="eyebrow eyebrow-bracket">Our Approach</span>
            <h2 className="type-h2" style={{ marginTop: 'var(--sp-3)' }}>
              Algorithms first, <em>then interface</em>
            </h2>
            <p className="type-body" style={{ maxWidth: 560, margin: '0 auto', marginTop: 'var(--sp-4)', color: 'var(--ink-mid)' }}>
              We start with the math — process mining algorithms that reconstruct reality from data.
              Then we build the interface that makes it actionable.
            </p>
          </div>
          <div className="ascii-frame" style={{ maxWidth: 680, margin: '0 auto' }}>
            <pre className="ascii-art" style={{ margin: 0 }}>
{`  ┌─────────────────────────────────────────────────────┐
  │                  MERIDIAN PLATFORM                   │
  ├─────────────────────────────────────────────────────┤
  │                                                     │
  │  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
  │  │ Process  │  │  Visual  │  │    AI    │         │
  │  │  Maps    │  │ Analytics│  │ Insights │         │
  │  └────┬─────┘  └────┬─────┘  └────┬─────┘         │
  │       └──────────────┼─────────────┘               │
  │                      │                              │
  │  ┌───────────────────┴──────────────────────┐      │
  │  │         PROCESS MINING ENGINE             │      │
  │  │  Alpha · Heuristic · Inductive miners     │      │
  │  │  Conformance · Prediction · Clustering    │      │
  │  └───────────────────┬──────────────────────┘      │
  │                      │                              │
  │  ┌───────────────────┴──────────────────────┐      │
  │  │           EVENT LOG STORE                 │      │
  │  │     Columnar · Streaming · Indexed        │      │
  │  └───────────────────┬──────────────────────┘      │
  │                      │                              │
  ├──────────────────────┼──────────────────────────────┤
  │  CONNECTORS          │                              │
  │  SAP · ServiceNow · Salesforce · JIRA · Custom     │
  └─────────────────────────────────────────────────────┘`}</pre>
          </div>
        </div>
      </section>

      <div className="ascii-divider">&middot; &middot; &middot;   &middot; &middot; &middot;   &middot; &middot; &middot;</div>

      {/* Values */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--sp-6)' }}>
            <span className="eyebrow eyebrow-bracket">Values</span>
            <h2 className="type-h2" style={{ marginTop: 'var(--sp-3)' }}>What we <em>stand for</em></h2>
          </div>
          <div className="about-values-grid">
            {[
              { title: 'Clarity over complexity', desc: 'The best tools make complex things simple, not simple things complex. Every feature earns its place.' },
              { title: 'Data honesty', desc: 'We show what the data says, not what you want to hear. Process mining reveals reality — and reality is the starting point for improvement.' },
              { title: 'Speed matters', desc: 'Insights that take weeks to produce are insights that arrive too late. Sub-second queries on millions of events.' },
              { title: 'Craft', desc: 'Software should be well-made. Clean interfaces, precise algorithms, thoughtful defaults. We sweat the details.' },
            ].map((v) => (
              <div key={v.title} className="card-feature" style={{ padding: 'var(--sp-5)' }}>
                <h3 className="type-h3">{v.title}</h3>
                <p className="type-body" style={{ marginTop: 'var(--sp-3)', color: 'var(--ink-mid)' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--sp-6)' }}>
            <span className="eyebrow eyebrow-bracket">Timeline</span>
            <h2 className="type-h2" style={{ marginTop: 'var(--sp-3)' }}>Building in <em>the open</em></h2>
          </div>
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            {[
              { year: '2024', event: 'Founded. First process mining prototype built on columnar event store.' },
              { year: '2025', event: 'Platform launch. Conformance checking, visual analytics, first enterprise customers.' },
              { year: '2026', event: 'AI-powered predictions. 10M+ events/day. Gartner recognition.' },
              { year: 'Next', event: 'Automated process improvement. Closed-loop optimization from insight to action.' },
            ].map((t, i) => (
              <div key={t.year} className="about-timeline-row" style={{
                paddingBottom: i < 3 ? 'var(--sp-5)' : 0,
              }}>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-sm)', color: 'var(--emerald)', textAlign: 'right', fontWeight: 500 }}>
                  {t.year}
                </span>
                <div style={{ background: 'var(--border-mid)', position: 'relative' }}>
                  <div style={{ width: 7, height: 7, border: '1px solid var(--emerald)', background: 'var(--bg)', position: 'absolute', top: 4, left: -3 }} />
                </div>
                <p className="type-body" style={{ color: 'var(--ink-mid)' }}>{t.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-6) 0', display: 'flex', justifyContent: 'center', gap: 'var(--sp-4)' }}>
          <Link href="/platform" style={{ padding: 'var(--sp-3) var(--sp-5)', border: '1px solid var(--border)', fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', textDecoration: 'none' }}>
            See the platform &rarr;
          </Link>
          <Link href="/security" style={{ padding: 'var(--sp-3) var(--sp-5)', border: '1px solid var(--border)', fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', textDecoration: 'none' }}>
            Security &amp; compliance &rarr;
          </Link>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band">
        <div className="gi" style={{ textAlign: 'center', padding: 'var(--sp-7) 0' }}>
          <h2 className="type-h2" style={{ color: 'var(--white)' }}>
            Join us in making processes <em>visible</em>
          </h2>
          <p style={{ fontFamily: 'var(--body)', color: 'rgba(255,255,255,0.7)', maxWidth: 480, margin: '0 auto', marginTop: 'var(--sp-4)' }}>
            We&apos;re hiring engineers and researchers who care about operational intelligence.
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'center', marginTop: 'var(--sp-5)', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary" style={{ background: 'var(--white)', color: 'var(--ink-dark)', borderColor: 'var(--white)' }}>Get Started</Link>
            <Link href="/request-demo" className="btn btn-ghost" style={{ color: 'var(--white)', borderColor: 'rgba(255,255,255,0.3)' }}>Request Demo</Link>
          </div>
        </div>
      </section>
    </>
  );
}
