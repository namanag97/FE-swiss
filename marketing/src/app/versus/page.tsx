import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare",
  description: "See how Meridian compares to Celonis, SAP Signavio, Apromore, and other process mining platforms.",
  alternates: { canonical: "/versus" },
  openGraph: { images: ["/og.png"] },
};

const competitors = [
  {
    name: "Celonis",
    desc: "The enterprise incumbent. Powerful but complex, expensive, and built for consultants, not operators.",
    differentiators: ["10x faster setup", "No consultants required", "Transparent pricing"],
  },
  {
    name: "SAP Signavio",
    desc: "Acquired by SAP. Strong process modeling, but process mining is a secondary capability.",
    differentiators: ["Native mining engine", "Non-SAP data sources", "Real-time analysis"],
  },
  {
    name: "Apromore",
    desc: "Academic origins, good algorithms. Limited enterprise features and integration ecosystem.",
    differentiators: ["Enterprise-grade infra", "Production SLAs", "Pre-built connectors"],
  },
  {
    name: "UiPath Process Mining",
    desc: "Part of UiPath\u2019s RPA suite. Process mining serves automation, not operational intelligence.",
    differentiators: ["Standalone platform", "Deeper analytics", "Not just RPA prep"],
  },
  {
    name: "ABBYY Timeline",
    desc: "Task mining focus. Good for desktop-level process capture, limited for enterprise event logs.",
    differentiators: ["Scalable event processing", "Multi-system correlation", "AI predictions"],
  },
  {
    name: "Microsoft Process Mining",
    desc: "Power Platform add-on. Accessible but limited in depth, variant analysis, and conformance.",
    differentiators: ["Full conformance checking", "Unlimited variants", "Custom event schemas"],
  },
];

export default function VersusPage() {
  return (
    <>
      {/* Hero */}
      <section className="gr" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
        <div className="gi" style={{ textAlign: 'center' }}>
          <span className="eyebrow eyebrow-bracket">Compare</span>
          <h1 className="type-display" style={{ marginTop: 'var(--sp-3)' }}>
            How Meridian <em>compares</em>
          </h1>
          <p className="type-body" style={{ maxWidth: 560, margin: '0 auto', marginTop: 'var(--sp-4)', color: 'var(--ink-mid)' }}>
            We respect every tool in this space. Here&apos;s an honest look at where
            Meridian differs — and where each platform has its strengths.
          </p>
        </div>
      </section>

      {/* ASCII overview */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-6) 0' }}>
          <div className="ascii-frame" style={{ maxWidth: 680, margin: '0 auto' }}>
            <pre className="ascii-art" style={{ margin: 0, textAlign: 'center' }}>
{`  THE PROCESS MINING LANDSCAPE

  ┌─────────────────────────────────────────────────┐
  │                                                 │
  │  ENTERPRISE              │  MODERN              │
  │  (complex, expensive)    │  (fast, focused)      │
  │                          │                       │
  │  Celonis ·               │         · Meridian ←  │
  │  SAP Signavio ·          │                       │
  │                          │                       │
  │  ABBYY ·                 │                       │
  │  UiPath ·                │                       │
  │                          │                       │
  │  Microsoft ·   Apromore ·│                       │
  │                          │                       │
  │──────────────────────────┼───────────────────────│
  │  BASIC                   │  ADVANCED             │
  └─────────────────────────────────────────────────┘`}</pre>
          </div>
        </div>
      </section>

      <div className="ascii-divider">&middot; &middot; &middot;   &middot; &middot; &middot;   &middot; &middot; &middot;</div>

      {/* Competitor Grid */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
          <div className="versus-grid">
            {competitors.map((comp) => (
              <div key={comp.name} className="card-feature" style={{ padding: 'var(--sp-5)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-3)' }}>
                  <div style={{ width: 8, height: 8, background: 'var(--emerald)', flexShrink: 0 }} />
                  <h3 className="type-h3" style={{ margin: 0 }}>vs {comp.name}</h3>
                </div>
                <p className="type-body" style={{ color: 'var(--ink-mid)', flex: 1 }}>
                  {comp.desc}
                </p>
                <div style={{ marginTop: 'var(--sp-4)', borderTop: '1px solid var(--border)', paddingTop: 'var(--sp-3)' }}>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 'var(--sp-2)' }}>
                    Meridian advantage
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--sp-1)' }}>
                    {comp.differentiators.map((d) => (
                      <li key={d} style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', color: 'var(--emerald)' }}>
                        &rarr; {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Meridian section */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--sp-6)' }}>
            <span className="eyebrow eyebrow-bracket">Why Meridian</span>
            <h2 className="type-h2" style={{ marginTop: 'var(--sp-3)' }}>Built <em>differently</em></h2>
          </div>
          <div className="versus-reasons-grid">
            {[
              { title: 'Deploy in hours, not months', desc: 'No 6-month implementation project. Connect your data source, see your first process map the same day.' },
              { title: 'Transparent pricing', desc: 'No per-user enterprise sales. Published pricing. Free pilot tier. Scale when you\u2019re ready.' },
              { title: 'Built for operators', desc: 'Designed for the people who run processes, not the consultants who model them.' },
            ].map((item) => (
              <div key={item.title} className="card-feature" style={{ padding: 'var(--sp-5)' }}>
                <h3 className="type-h3">{item.title}</h3>
                <p className="type-body" style={{ marginTop: 'var(--sp-3)', color: 'var(--ink-mid)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band">
        <div className="gi" style={{ textAlign: 'center', padding: 'var(--sp-7) 0' }}>
          <h2 className="type-h2" style={{ color: 'var(--white)' }}>
            See the <em>difference</em> yourself
          </h2>
          <p style={{ fontFamily: 'var(--body)', color: 'rgba(255,255,255,0.7)', maxWidth: 480, margin: '0 auto', marginTop: 'var(--sp-4)' }}>
            Start with a free pilot. Compare Meridian against your current tools with your own data.
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
