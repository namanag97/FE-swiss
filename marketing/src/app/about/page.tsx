import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "We believe every business process tells a story. Meridian makes those stories visible.",
  alternates: { canonical: "/about" },
  openGraph: { images: ["/og.png"] },
};

const C = {
  dark: "#072A20",
  text: "#1a2f28",
  mid: "#4a6259",
  muted: "#7a8f85",
  faint: "#a3b3ab",
  green: "#047A55",
  greenLight: "#e8f5ef",
  border: "#dde3e0",
  white: "#ffffff",
  bg: "#FAFBF8",
  amber: "#b45309",
  amberLight: "#fef3c7",
} as const;

/* ── Process Comparison: How you think vs reality ── */
function ProcessComparisonSvg() {
  const nw = 76;
  const nh = 26;
  return (
    <svg viewBox="0 0 460 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      {/* Ideal */}
      <text x={16} y={20} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1}>HOW YOU THINK IT WORKS</text>
      {["Order", "Check", "Approve", "Ship"].map((s, i) => {
        const x = 16 + i * (nw + 24);
        return (
          <g key={`ideal-${s}`}>
            <rect x={x} y={32} width={nw} height={nh} rx={2} fill={C.white} stroke={C.border} />
            <text x={x + nw / 2} y={46} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.text}>{s}</text>
            {i < 3 && (
              <g>
                <line x1={x + nw} y1={45} x2={x + nw + 24} y2={45} stroke={C.muted} />
                <polygon points={`${x + nw + 24},45 ${x + nw + 18},42 ${x + nw + 18},48`} fill={C.muted} />
              </g>
            )}
          </g>
        );
      })}
      <text x={230} y={76} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontStyle="italic" fill={C.faint}>clean, linear, simple</text>

      {/* Divider */}
      <line x1={16} y1={96} x2={444} y2={96} stroke={C.border} strokeDasharray="4 4" />

      {/* Reality */}
      <text x={16} y={124} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.amber} letterSpacing={1}>HOW IT ACTUALLY WORKS</text>

      {/* Order */}
      <rect x={16} y={140} width={nw} height={nh} rx={2} fill={C.white} stroke={C.border} />
      <text x={16 + nw / 2} y={154} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.text}>Order</text>

      {/* Arrow to Check */}
      <line x1={92} y1={153} x2={116} y2={153} stroke={C.muted} />
      <polygon points="116,153 110,150 110,156" fill={C.muted} />

      {/* Check */}
      <rect x={116} y={140} width={nw} height={nh} rx={2} fill={C.white} stroke={C.border} />
      <text x={116 + nw / 2} y={154} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.text}>Check</text>

      {/* Arrow to ??? */}
      <line x1={192} y1={153} x2={216} y2={153} stroke={C.amber} />
      <polygon points="216,153 210,150 210,156" fill={C.amber} />

      {/* ??? node (unknown) */}
      <rect x={216} y={140} width={56} height={nh} rx={2} fill={C.amberLight} stroke={C.amber} strokeWidth={1.5} />
      <text x={244} y={154} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.amber} fontWeight={500}>???</text>

      {/* Rework loop arrow from ??? back to Order */}
      <line x1={244} y1={166} x2={244} y2={196} stroke={C.amber} strokeWidth={1.5} />

      {/* Rework node */}
      <rect x={206} y={196} width={76} height={nh} rx={2} fill={C.amberLight} stroke={C.amber} strokeWidth={1.5} />
      <text x={244} y={210} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.amber} fontWeight={500}>Rework</text>

      {/* Loop back to Order */}
      <line x1={206} y1={209} x2={54} y2={209} stroke={C.amber} strokeWidth={1.5} />
      <line x1={54} y1={209} x2={54} y2={166} stroke={C.amber} strokeWidth={1.5} />
      <polygon points="54,166 50,174 58,174" fill={C.amber} />

      {/* Forward from Rework to Approve */}
      <line x1={282} y1={209} x2={320} y2={209} stroke={C.muted} />
      <polygon points="320,209 314,206 314,212" fill={C.muted} />

      {/* Approve */}
      <rect x={320} y={196} width={nw} height={nh} rx={2} fill={C.greenLight} stroke={C.green} />
      <text x={320 + nw / 2} y={210} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.green}>Approve</text>

      {/* Approve to Ship */}
      <line x1={396} y1={209} x2={420} y2={209} stroke={C.muted} />
      <polygon points="420,209 414,206 414,212" fill={C.muted} />

      {/* Ship */}
      <rect x={420} y={196} width={36} height={nh} rx={2} fill={C.greenLight} stroke={C.green} />
      <text x={438} y={210} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.green}>Ship</text>

      <text x={230} y={252} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontStyle="italic" fill={C.amber}>messy, looping, unknown</text>
    </svg>
  );
}

/* ── Architecture Diagram ── */
function ArchitectureSvg() {
  const lx = 24;
  const rw = 472;
  const rowH = 48;
  return (
    <svg viewBox="0 0 520 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      {/* Outer frame */}
      <rect x={lx} y={8} width={rw} height={304} rx={2} fill={C.white} stroke={C.border} />

      {/* Title bar */}
      <rect x={lx} y={8} width={rw} height={28} rx={2} fill={C.bg} stroke={C.border} />
      <text x={260} y={26} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.muted} letterSpacing={1.5}>MERIDIAN PLATFORM</text>

      {/* Layer 1: UI */}
      {[
        { label: "Process Maps", x: 44 },
        { label: "Visual Analytics", x: 200 },
        { label: "AI Insights", x: 356 },
      ].map((mod) => (
        <g key={mod.label}>
          <rect x={mod.x} y={48} width={136} height={36} rx={2} fill={C.white} stroke={C.border} />
          <text x={mod.x + 68} y={70} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={500} fill={C.text}>{mod.label}</text>
        </g>
      ))}

      {/* Connector lines down */}
      <line x1={112} y1={84} x2={112} y2={100} stroke={C.muted} />
      <line x1={268} y1={84} x2={268} y2={100} stroke={C.muted} />
      <line x1={424} y1={84} x2={424} y2={100} stroke={C.muted} />
      <line x1={112} y1={100} x2={424} y2={100} stroke={C.muted} />
      <line x1={260} y1={100} x2={260} y2={110} stroke={C.muted} />

      {/* Layer 2: Engine */}
      <rect x={44} y={110} width={432} height={rowH} rx={2} fill={C.greenLight} stroke={C.green} />
      <text x={260} y={130} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.green}>PROCESS MINING ENGINE</text>
      <text x={260} y={146} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.mid}>Alpha · Heuristic · Inductive · Conformance · Prediction</text>

      {/* Connector */}
      <line x1={260} y1={158} x2={260} y2={172} stroke={C.muted} />

      {/* Layer 3: Event Store */}
      <rect x={44} y={172} width={432} height={rowH} rx={2} fill={C.white} stroke={C.border} />
      <text x={260} y={192} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.text}>EVENT LOG STORE</text>
      <text x={260} y={208} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.mid}>Columnar · Streaming · Indexed</text>

      {/* Connector */}
      <line x1={260} y1={220} x2={260} y2={234} stroke={C.muted} />

      {/* Layer 4: Connectors */}
      <rect x={44} y={234} width={432} height={40} rx={2} fill={C.bg} stroke={C.border} />
      <text x={260} y={250} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.muted} letterSpacing={1}>CONNECTORS</text>
      <text x={260} y={266} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.faint}>SAP · ServiceNow · Salesforce · Jira · Custom</text>
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="gr" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
        <div className="gi" style={{ textAlign: "center" }}>
          <span className="eyebrow eyebrow-bracket">About</span>
          <h1 className="type-display" style={{ marginTop: "var(--sp-3)" }}>
            Why we&apos;re <em>building this</em>
          </h1>
          <p className="type-body" style={{ maxWidth: 560, margin: "0 auto", marginTop: "var(--sp-4)", color: "var(--ink-mid)" }}>
            Every company runs on processes. Almost none of them can see those
            processes. We think that&apos;s the most expensive blind spot in business.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
          <div className="about-split">
            <div>
              <span className="eyebrow eyebrow-bracket">The blind spot</span>
              <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
                You have a process diagram<br />on the wall. <em>It&apos;s wrong.</em>
              </h2>
              <p className="type-body" style={{ marginTop: "var(--sp-4)", color: "var(--ink-mid)" }}>
                The gap between how work is designed and how work actually happens
                is where inefficiency lives — in rework loops nobody mapped,
                approvals nobody questioned, and bottlenecks nobody can see
                because nobody is looking at the right data.
              </p>
              <p className="type-body" style={{ marginTop: "var(--sp-3)", color: "var(--ink-mid)" }}>
                Your BI tools tell you what happened. They can&apos;t tell you
                how — the sequence of steps, the variants, the deviations.
                That&apos;s a different kind of data. That&apos;s what we work with.
              </p>
            </div>
            <div style={{ border: "1px solid var(--border)", padding: "var(--sp-3)", background: "var(--bg)" }}>
              <ProcessComparisonSvg />
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
          <div style={{ textAlign: "center", marginBottom: "var(--sp-6)" }}>
            <span className="eyebrow eyebrow-bracket">Our approach</span>
            <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
              Algorithms first. <em>Interface second.</em>
            </h2>
            <p className="type-body" style={{ maxWidth: 560, margin: "0 auto", marginTop: "var(--sp-4)", color: "var(--ink-mid)" }}>
              We start with the math — process mining algorithms that reconstruct
              reality from raw event data. Then we build the interface that makes
              it actionable. Not the other way around.
            </p>
          </div>
          <div style={{ maxWidth: 680, margin: "0 auto", border: "1px solid var(--border)", padding: "var(--sp-4)", background: "var(--bg)" }}>
            <ArchitectureSvg />
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
          <div style={{ textAlign: "center", marginBottom: "var(--sp-6)" }}>
            <span className="eyebrow eyebrow-bracket">Beliefs</span>
            <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>What we <em>believe</em></h2>
          </div>
          <div className="about-values-grid">
            {[
              { title: "Show reality, not comfort", desc: "We show what the data says, not what you want to hear. The first step to fixing a process is admitting what it actually looks like." },
              { title: "Fast or useless", desc: "Insights that take weeks to produce arrive too late. If you can't query a million events in under a second, you've already lost the feedback loop." },
              { title: "Complexity is the enemy", desc: "The best tools make complex things simple. If you need a consultant to use it, it's not a product — it's a project." },
              { title: "Craft matters", desc: "Software should be well-made. Clean interfaces, precise algorithms, thoughtful defaults. The details are the product." },
            ].map((v) => (
              <div key={v.title} className="card-feature" style={{ padding: "var(--sp-5)" }}>
                <h3 className="type-h3">{v.title}</h3>
                <p className="type-body" style={{ marginTop: "var(--sp-3)", color: "var(--ink-mid)" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
          <div style={{ textAlign: "center", marginBottom: "var(--sp-6)" }}>
            <span className="eyebrow eyebrow-bracket">Timeline</span>
            <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>Building in <em>the open</em></h2>
          </div>
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            {[
              { year: "2024", event: "Founded. First process mining prototype on a columnar event store." },
              { year: "2025", event: "Core platform: process discovery, conformance checking, visual analytics." },
              { year: "2026", event: "Early access. AI-powered predictions. First design partners." },
              { year: "Next", event: "General availability. Closed-loop optimization from insight to action." },
            ].map((t, i) => (
              <div key={t.year} className="about-timeline-row" style={{ paddingBottom: i < 3 ? "var(--sp-5)" : 0 }}>
                <span style={{ fontFamily: "var(--sans)", fontSize: "var(--fs-sm)", color: "var(--emerald)", textAlign: "right", fontWeight: 500 }}>
                  {t.year}
                </span>
                <div style={{ background: "var(--border-mid)", position: "relative" }}>
                  <div style={{ width: 7, height: 7, border: "1px solid var(--emerald)", background: "var(--bg)", position: "absolute", top: 4, left: -3 }} />
                </div>
                <p className="type-body" style={{ color: "var(--ink-mid)" }}>{t.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: "var(--sp-6) 0", display: "flex", justifyContent: "center", gap: "var(--sp-4)" }}>
          <Link href="/platform" style={{ padding: "var(--sp-3) var(--sp-5)", border: "1px solid var(--border)", fontFamily: "var(--sans)", fontSize: "var(--fs-xs)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink)", textDecoration: "none" }}>
            See the platform &rarr;
          </Link>
          <Link href="/security" style={{ padding: "var(--sp-3) var(--sp-5)", border: "1px solid var(--border)", fontFamily: "var(--sans)", fontSize: "var(--fs-xs)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink)", textDecoration: "none" }}>
            Security &amp; compliance &rarr;
          </Link>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band">
        <div className="gi" style={{ textAlign: "center", padding: "var(--sp-7) 0" }}>
          <h2 className="type-h2" style={{ color: "var(--white)" }}>
            We&apos;re building this <em>right now</em>
          </h2>
          <p style={{ fontFamily: "var(--body)", color: "rgba(255,255,255,0.7)", maxWidth: 480, margin: "0 auto", marginTop: "var(--sp-4)" }}>
            Early access is open. Be among the first to see your processes
            for what they really are.
          </p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--sp-5)" }}>
            <Link href="/contact" className="btn btn-primary" style={{ background: "var(--white)", color: "var(--ink-dark)", borderColor: "var(--white)" }}>Get Early Access</Link>
          </div>
        </div>
      </section>
    </>
  );
}
