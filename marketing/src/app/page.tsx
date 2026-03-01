import Link from "next/link";
import { PlatformTabs } from "@/components/home/PlatformTabs";
import { Reveal } from "@/components/ui/Reveal";

/* ── OODA Loop SVG ── Observe → Orient → Decide → Act ── */
function OODAFlow() {
  const steps = [
    { label: "Observe", sub: "Ingest every event" },
    { label: "Orient", sub: "Map real processes" },
    { label: "Decide", sub: "Find what's broken" },
    { label: "Act", sub: "Fix it automatically" },
  ];

  const nodeW = 130;
  const nodeH = 58;
  const gap = 40;
  const totalW = steps.length * nodeW + (steps.length - 1) * gap;
  const padX = 28;
  const padY = 20;
  const svgW = totalW + padX * 2;
  const svgH = nodeH + padY * 2;

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 680, height: "auto", display: "block", margin: "0 auto" }}
      role="img"
      aria-label="OODA loop: Observe every event, Orient by mapping real processes, Decide what is broken, Act to fix it automatically"
    >
      {steps.map((step, i) => {
        const x = padX + i * (nodeW + gap);
        const y = padY;
        const cx = x + nodeW / 2;
        const cy = y + nodeH / 2;

        return (
          <g key={step.label}>
            <rect
              x={x} y={y} width={nodeW} height={nodeH}
              stroke="var(--ink-dark)" strokeWidth="1" fill="var(--white)"
            />
            <text
              x={cx} y={cy - 7}
              textAnchor="middle"
              style={{ fontFamily: "var(--sans)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fill: "var(--ink-dark)" }}
            >
              {step.label}
            </text>
            <text
              x={cx} y={cy + 11}
              textAnchor="middle"
              style={{ fontFamily: "var(--body)", fontSize: 10, fontWeight: 340, fill: "var(--ink-muted)" }}
            >
              {step.sub}
            </text>
            {i < steps.length - 1 && (
              <>
                <line
                  x1={x + nodeW + 1} y1={cy}
                  x2={x + nodeW + gap - 7} y2={cy}
                  stroke="var(--ink-dark)" strokeWidth="1"
                />
                <polygon
                  points={`${x + nodeW + gap - 7},${cy - 3} ${x + nodeW + gap - 1},${cy} ${x + nodeW + gap - 7},${cy + 3}`}
                  fill="var(--ink-dark)"
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
            Unmatched <em>Intelligence</em>
          </h1>
          <p className="type-body" style={{ maxWidth: 560, margin: "0 auto", marginTop: 24, color: "var(--ink-mid)" }}>
            AI supercharged with process intelligence. Connect your databases,
            ERPs, and CRMs. Mine event logs. Map real processes. Find
            bottlenecks before they cost you. No guesswork — just what
            actually happens in your systems.
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

      {/* ── OODA Loop ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-6)", paddingBottom: "var(--sp-6)" }}>
          <OODAFlow />
        </div>
      </section>

      {/* ── Connect Everything ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: "var(--sp-5) 0" }}>
          <p className="type-label" style={{ textAlign: "center", marginBottom: "var(--sp-4)" }}>
            Connect everything. Miss nothing.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "var(--sp-3)", flexWrap: "wrap", alignItems: "center" }}>
            {["SAP", "Oracle", "ServiceNow", "Salesforce", "Jira", "Postgres", "Snowflake"].map((name) => (
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

      {/* ── The Gap ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "var(--sp-5)" }}>
              <span className="eyebrow eyebrow-bracket">The gap</span>
              <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
                Your process on paper
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
                Your process <em>in reality</em>
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
              Intelligence is the ability to adapt. You can&apos;t adapt to what
              you can&apos;t see. Meridian closes the gap between what you think
              is happening and what actually is.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Speed ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "var(--sp-6)" }}>
              <span className="eyebrow eyebrow-bracket">Speed</span>
              <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
                Not months. <em>Minutes.</em>
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 reveal-stagger" style={{ gap: "var(--sp-4)" }}>
            {[
              { phase: "Day 1", title: "Your first process map", desc: "Plug in your ERP, CRM, or ITSM. See how work actually flows — the rework loops, the bottlenecks, the workarounds nobody talks about." },
              { phase: "Week 1", title: "Team-wide visibility", desc: "Dashboards for every operations lead. No more waiting on analysts. No more stale PowerPoints." },
              { phase: "Month 1", title: "Closed-loop intelligence", desc: "Conformance monitoring. Bottleneck prediction. Automated alerts that trigger action before things break." },
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

      {/* ── Platform ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
          <div style={{ textAlign: "center", marginBottom: "var(--sp-6)" }}>
            <span className="eyebrow eyebrow-bracket">Platform</span>
            <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
              The full <em>OODA loop</em>
            </h2>
            <p className="type-body" style={{ maxWidth: 480, margin: "0 auto", marginTop: "var(--sp-3)", color: "var(--ink-mid)" }}>
              Observe. Orient. Decide. Act. Faster than your competition.
            </p>
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
                Where it <em>hits</em>
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 reveal-stagger" style={{ gap: "var(--sp-4)" }}>
            {[
              { title: "Order-to-Cash", desc: "Your invoices take 47 days. The process says 5. Find the 12 rework loops hiding in between.", anchor: "#o2c" },
              { title: "Procure-to-Pay", desc: "3 in 10 POs bypass approval. See exactly where procurement goes off-policy — and why.", anchor: "#p2p" },
              { title: "IT Service Management", desc: "Tickets bounce between 4 teams before resolution. Map the real escalation path. Cut the noise.", anchor: "#itsm" },
              { title: "Patient Journey", desc: "Average wait time says 20 minutes. Actual patient flow tells a different story. See it.", anchor: "#healthcare" },
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

      {/* ── CTA ── */}
      <section className="cta-band">
        <div className="gi" style={{ textAlign: "center", padding: "var(--sp-7) 0" }}>
          <h2 className="type-h2" style={{ color: "var(--white)" }}>
            Faster loops. <em>Better decisions.</em>
          </h2>
          <p style={{ fontFamily: "var(--body)", color: "rgba(255,255,255,0.5)", maxWidth: 440, margin: "0 auto", marginTop: "var(--sp-4)" }}>
            Connect your data. See your real processes. Act on what you find.
            First map in under an hour — no consultants required.
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
