import Link from "next/link";
import { PlatformTabs } from "@/components/home/PlatformTabs";
import { Reveal } from "@/components/ui/Reveal";

/* ── SVG Process Flow ── clean 4-step diagram ── */
function ProcessFlow() {
  const nodes = [
    { label: "Connect", sub: "Your systems" },
    { label: "Discover", sub: "Real processes" },
    { label: "Diagnose", sub: "Bottlenecks" },
    { label: "Act", sub: "Automate fixes" },
  ];

  const nodeW = 120;
  const nodeH = 56;
  const gap = 48;
  const totalW = nodes.length * nodeW + (nodes.length - 1) * gap;
  const padX = 32;
  const padY = 24;
  const svgW = totalW + padX * 2;
  const svgH = nodeH + padY * 2;

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 640, height: "auto", display: "block", margin: "0 auto" }}
      role="img"
      aria-label="How Meridian works: Connect your systems, Discover real processes, Diagnose bottlenecks, Act and automate fixes"
    >
      {nodes.map((node, i) => {
        const x = padX + i * (nodeW + gap);
        const y = padY;
        const cx = x + nodeW / 2;
        const cy = y + nodeH / 2;

        return (
          <g key={node.label}>
            <rect
              x={x} y={y} width={nodeW} height={nodeH}
              stroke="var(--border-mid)" strokeWidth="1" fill="var(--white)"
            />
            <text
              x={cx} y={cy - 6}
              textAnchor="middle"
              style={{ fontFamily: "var(--sans)", fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", fill: "var(--ink-dark)" }}
            >
              {node.label}
            </text>
            <text
              x={cx} y={cy + 12}
              textAnchor="middle"
              style={{ fontFamily: "var(--body)", fontSize: 10, fill: "var(--ink-faint)" }}
            >
              {node.sub}
            </text>
            {i < nodes.length - 1 && (
              <>
                <line
                  x1={x + nodeW} y1={cy}
                  x2={x + nodeW + gap - 8} y2={cy}
                  stroke="var(--border-mid)" strokeWidth="1"
                />
                <polygon
                  points={`${x + nodeW + gap - 8},${cy - 3.5} ${x + nodeW + gap},${cy} ${x + nodeW + gap - 8},${cy + 3.5}`}
                  fill="var(--border-mid)"
                />
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="gr" style={{ paddingTop: 96, paddingBottom: 64 }}>
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ textAlign: "center" }}>
          <span className="eyebrow eyebrow-bracket">Early access</span>
          <h1 className="type-display" style={{ marginTop: 20 }}>
            See what actually happens<br />in <em>your operations</em>
          </h1>
          <p className="type-body" style={{ maxWidth: 540, margin: "0 auto", marginTop: 24, color: "var(--ink-mid)" }}>
            Your ERP has thousands of transactions. Each one takes a different path.
            Meridian reads your system logs and shows you every path, which ones
            are slow, and why.
          </p>
          <div style={{ display: "flex", gap: "var(--sp-3)", justifyContent: "center", marginTop: 36 }}>
            <Link href="/contact" className="btn btn-primary">Get early access</Link>
            <Link href="/platform" className="btn btn-ghost">How it works</Link>
          </div>
          <p style={{ fontFamily: "var(--body)", fontSize: "var(--fs-sm)", color: "var(--ink-faint)", marginTop: 16, letterSpacing: "-.01em" }}>
            No credit card required &middot; First process map in under an hour
          </p>
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "var(--sp-6)" }}>
              <span className="eyebrow eyebrow-bracket">The problem</span>
              <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
                You think your process<br />looks like this
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="ascii-frame overflow-x-auto" style={{ maxWidth: 540, margin: "0 auto" }}>
              <pre className="ascii-art" style={{ margin: 0, textAlign: "center" }}>{`Order  ──▶  Approve  ──▶  Invoice  ──▶  Payment

                  Clean. Simple. 4 steps.`}</pre>
            </div>
          </Reveal>
          <Reveal>
            <div style={{ textAlign: "center", marginTop: "var(--sp-6)", marginBottom: "var(--sp-5)" }}>
              <h2 className="type-h2">
                It actually looks like <em>this</em>
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="ascii-frame overflow-x-auto" style={{ maxWidth: 640, margin: "0 auto" }}>
              <pre className="ascii-art" style={{ margin: 0 }}>{`Order ──▶ Approve ──▶ Reject ──▶ Re-submit ──▶ Approve
  │                       │            ▲
  ├──▶ Manual override    │            │
  │                       └── Escalate ┘
  └──▶ Approve ──▶ Invoice ──▶ Hold ──▶ Release ──▶ Payment
                                 │
                                 └── Dispute ──▶ Credit ──▶ Re-invoice`}</pre>
            </div>
          </Reveal>
          <Reveal>
            <p className="type-body" style={{ maxWidth: 480, margin: "0 auto", marginTop: "var(--sp-5)", textAlign: "center", color: "var(--ink-mid)" }}>
              Every organization has a process diagram on the wall.
              None of them match reality. Meridian shows you what&apos;s
              actually happening — automatically, from your own data.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "var(--sp-6)" }}>
              <span className="eyebrow eyebrow-bracket">How it works</span>
              <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
                Four steps from data to <em>action</em>
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <ProcessFlow />
          </Reveal>
        </div>
      </section>

      {/* ── Connectors ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: "var(--sp-5) 0" }}>
          <p className="type-label" style={{ textAlign: "center", marginBottom: "var(--sp-4)" }}>
            Works with your existing systems
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "var(--sp-3)", flexWrap: "wrap", alignItems: "center" }}>
            {["SAP", "ServiceNow", "Salesforce", "Jira", "Oracle"].map((name) => (
              <span key={name} style={{
                fontFamily: "var(--sans)", fontSize: "var(--fs-xs)", color: "var(--ink-faint)",
                letterSpacing: "0.06em", textTransform: "uppercase",
                padding: "var(--sp-2) var(--sp-4)",
                border: "1px solid var(--border)",
                background: "var(--white)",
              }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="ascii-divider">&middot; &middot; &middot; &nbsp; &middot; &middot; &middot; &nbsp; &middot; &middot; &middot;</div>

      {/* ── Speed to Value ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "var(--sp-6)" }}>
              <span className="eyebrow eyebrow-bracket">Speed to value</span>
              <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
                Not months. <em>Minutes.</em>
              </h2>
              <p className="type-body" style={{ maxWidth: 480, margin: "0 auto", marginTop: "var(--sp-3)", color: "var(--ink-mid)" }}>
                Most process improvement tools take months to configure.
                Meridian connects to your data and builds your first
                process map the same day.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 reveal-stagger" style={{ gap: "var(--sp-4)" }}>
            {[
              { phase: "Day 1", title: "Your first process map", desc: "Connect your ERP or ITSM system. See how work actually flows through your organization — in under an hour." },
              { phase: "Week 1", title: "Share with your team", desc: "Roll out dashboards to operations leads. Self-serve insights without waiting for analysts." },
              { phase: "Month 1", title: "Full process intelligence", desc: "Conformance checking, bottleneck alerts, and automated actions across all your workflows." },
            ].map((t) => (
              <Reveal key={t.phase}>
                <div className="card-feature" style={{ padding: "var(--sp-5)", height: "100%" }}>
                  <span className="type-label" style={{ color: "var(--emerald)" }}>{t.phase}</span>
                  <h3 className="type-h3" style={{ marginTop: "var(--sp-2)" }}>{t.title}</h3>
                  <p className="type-body" style={{ marginTop: "var(--sp-3)", color: "var(--ink-mid)" }}>{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform Tabs ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
          <div style={{ textAlign: "center", marginBottom: "var(--sp-6)" }}>
            <span className="eyebrow eyebrow-bracket">Platform</span>
            <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
              Four pillars of <em>process intelligence</em>
            </h2>
          </div>
          <PlatformTabs />
        </div>
      </section>

      <div className="ascii-divider">&middot; &middot; &middot; &nbsp; &middot; &middot; &middot; &nbsp; &middot; &middot; &middot;</div>

      {/* ── Use Cases ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "var(--sp-6)" }}>
              <span className="eyebrow eyebrow-bracket">Use cases</span>
              <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
                Built for <em>real workflows</em>
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 reveal-stagger" style={{ gap: "var(--sp-4)" }}>
            {[
              { title: "Order-to-Cash", desc: "Find where invoices stall. Reduce DSO by mapping every step from order entry to payment.", anchor: "#o2c" },
              { title: "Procure-to-Pay", desc: "Spot maverick buying and duplicate payments. See exactly where procurement deviates from policy.", anchor: "#p2p" },
              { title: "IT Service Management", desc: "Map ticket lifecycles from creation to resolution. Cut escalation bounces.", anchor: "#itsm" },
              { title: "Patient Journey", desc: "Track patient flow through clinical pathways. Identify wait-time hotspots and care gaps.", anchor: "#healthcare" },
            ].map((uc) => (
              <Reveal key={uc.title}>
                <div className="card-feature" style={{ padding: "var(--sp-5)", height: "100%" }}>
                  <h3 className="type-h3">{uc.title}</h3>
                  <p className="type-body" style={{ marginTop: "var(--sp-3)", color: "var(--ink-mid)" }}>{uc.desc}</p>
                  <Link href={`/use-cases${uc.anchor}`} className="type-label" style={{ color: "var(--emerald)", marginTop: "var(--sp-4)", display: "inline-block" }}>
                    Learn more &rarr;
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="cta-band">
        <div className="gi" style={{ textAlign: "center", padding: "var(--sp-7) 0" }}>
          <h2 className="type-h2" style={{ color: "var(--white)" }}>
            See your real processes <em>today</em>
          </h2>
          <p style={{ fontFamily: "var(--body)", color: "rgba(255,255,255,0.5)", maxWidth: 420, margin: "0 auto", marginTop: "var(--sp-4)" }}>
            Connect your data. Get your first process map in under an hour.
            No consultants, no six-month rollout.
          </p>
          <div style={{ display: "flex", gap: "var(--sp-3)", justifyContent: "center", marginTop: "var(--sp-5)" }}>
            <Link href="/contact" className="btn btn-primary">Get early access</Link>
            <Link href="/platform" className="btn btn-ghost">Explore platform</Link>
          </div>
        </div>
      </section>
    </>
  );
}
