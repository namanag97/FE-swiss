import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Process mining, conformance checking, visual analytics, and AI insights — the complete platform for operational intelligence.",
  alternates: { canonical: "/platform" },
  openGraph: { images: ["/og.png"] },
};

export default function ProductPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="gr"
        style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}
      >
        <div className="gi" style={{ textAlign: "center" }}>
          <span className="eyebrow eyebrow-bracket">Platform</span>
          <h1
            className="type-display"
            style={{ marginTop: "var(--sp-3)", maxWidth: 680, margin: "var(--sp-3) auto 0" }}
          >
            The data platform for
            <br />
            <em>operational intelligence</em>
          </h1>
          <p
            className="type-body"
            style={{
              maxWidth: 560,
              margin: "0 auto",
              marginTop: "var(--sp-4)",
              color: "var(--ink-mid)",
            }}
          >
            From raw event logs to automated process improvements. Four modules,
            one platform.
          </p>
        </div>
      </section>

      {/* Feature 1: Process Discovery */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div
          className="gi"
          style={{
            paddingTop: "var(--sp-7)",
            paddingBottom: "var(--sp-7)",
          }}
        >
          <div className="feature-row">
            <div>
              <span className="eyebrow eyebrow-bracket">01 Discover</span>
              <h2
                className="type-h2"
                style={{ marginTop: "var(--sp-3)" }}
              >
                Process <em>Discovery</em>
              </h2>
              <p
                className="type-body"
                style={{
                  marginTop: "var(--sp-4)",
                  color: "var(--ink-mid)",
                }}
              >
                Automatically reconstruct process models from event log data. No
                interviews, no workshops — just what actually happens in your
                systems.
              </p>
              <ul
                style={{
                  marginTop: "var(--sp-4)",
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--sp-2)",
                }}
              >
                {[
                  "Alpha & Heuristic miners",
                  "Multi-source log correlation",
                  "Variant detection & clustering",
                  "Interactive process maps",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "var(--body)",
                      fontSize: "var(--fs-sm)",
                      color: "var(--ink-mid)",
                      paddingLeft: "var(--sp-4)",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        color: "var(--emerald)",
                      }}
                    >
                      &rarr;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="ascii-frame">
              <pre className="ascii-art" style={{ margin: 0 }}>
{`  EVENT LOG                    PROCESS MAP
  ┌────────────────────┐       ┌───────────┐
  │ case  act    time  │       │           │
  │ 1001  Create 09:01 │──┐    │  Create   │
  │ 1001  Review 09:15 │  │    │     │     │
  │ 1001  Approve 10:02│  ├──▶ │  Review   │
  │ 1002  Create 09:03 │  │    │     │     │
  │ 1002  Review 09:22 │  │    │  Approve  │
  │ 1002  Reject 09:45 │──┘    │   / \\    │
  └────────────────────┘       │  ✓   ✗   │
                               └───────────┘
  12,847 events                23 variants`}</pre>
            </div>
          </div>
        </div>
      </section>

      <div className="ascii-divider">· · ·   · · ·   · · ·</div>

      {/* Feature 2: Conformance Checking */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div
          className="gi"
          style={{
            paddingTop: "var(--sp-7)",
            paddingBottom: "var(--sp-7)",
          }}
        >
          <div className="feature-row feature-row--reverse">
            <div className="ascii-frame">
              <pre className="ascii-art" style={{ margin: 0 }}>
{`  IDEAL PROCESS (reference model)
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Order → Verify → Approve → Ship → Invoice

  ACTUAL PROCESS (as-is)
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Order → Verify → ┬─ Approve → Ship → Invoice
                   │
                   └─ Manual Review ──┐  ← DEVIATION
                      (34% of cases)  │
                      Approve ────────┘
                      (+4.2 days avg)

  Conformance: 66%    Deviations: 3    Fitness: 0.82`}</pre>
            </div>
            <div>
              <span className="eyebrow eyebrow-bracket">02 Diagnose</span>
              <h2
                className="type-h2"
                style={{ marginTop: "var(--sp-3)" }}
              >
                Conformance <em>Checking</em>
              </h2>
              <p
                className="type-body"
                style={{
                  marginTop: "var(--sp-4)",
                  color: "var(--ink-mid)",
                }}
              >
                Overlay your ideal process against reality. Instantly see where
                execution deviates from design — and measure the cost of each
                deviation.
              </p>
              <ul
                style={{
                  marginTop: "var(--sp-4)",
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--sp-2)",
                }}
              >
                {[
                  "Token-based replay analysis",
                  "Deviation classification",
                  "Cost-per-deviation metrics",
                  "Root cause drill-down",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "var(--body)",
                      fontSize: "var(--fs-sm)",
                      color: "var(--ink-mid)",
                      paddingLeft: "var(--sp-4)",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        color: "var(--emerald)",
                      }}
                    >
                      &rarr;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="ascii-divider">· · ·   · · ·   · · ·</div>

      {/* Feature 3: Visual Analytics */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div
          className="gi"
          style={{
            paddingTop: "var(--sp-7)",
            paddingBottom: "var(--sp-7)",
          }}
        >
          <div className="feature-row">
            <div>
              <span className="eyebrow eyebrow-bracket">03 Predict</span>
              <h2
                className="type-h2"
                style={{ marginTop: "var(--sp-3)" }}
              >
                Visual <em>Analytics</em>
              </h2>
              <p
                className="type-body"
                style={{
                  marginTop: "var(--sp-4)",
                  color: "var(--ink-mid)",
                }}
              >
                Dashboards built for process data. KPI tracking, variant
                distribution, SLA monitoring — all connected to the process
                layer beneath.
              </p>
              <ul
                style={{
                  marginTop: "var(--sp-4)",
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--sp-2)",
                }}
              >
                {[
                  "Process-aware KPI dashboards",
                  "Variant frequency distribution",
                  "SLA monitoring & alerting",
                  "Throughput time analysis",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "var(--body)",
                      fontSize: "var(--fs-sm)",
                      color: "var(--ink-mid)",
                      paddingLeft: "var(--sp-4)",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        color: "var(--emerald)",
                      }}
                    >
                      &rarr;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="ascii-frame">
              <pre className="ascii-art" style={{ margin: 0 }}>
{`  ┌─ KPI DASHBOARD ────────────────────┐
  │                                     │
  │  Cycle Time    Throughput   On-Time  │
  │  ┌────────┐   ┌────────┐  ┌──────┐ │
  │  │  4.2d  │   │  847/d │  │ 78%  │ │
  │  │  ▼ 12% │   │  ▲ 8%  │  │ ▲ 5% │ │
  │  └────────┘   └────────┘  └──────┘ │
  │                                     │
  │  Variant Distribution               │
  │  ██████████████████░░░░  Happy: 66% │
  │  ████████░░░░░░░░░░░░░░  Review: 24%│
  │  ███░░░░░░░░░░░░░░░░░░░  Reject: 10%│
  └─────────────────────────────────────┘`}</pre>
            </div>
          </div>
        </div>
      </section>

      <div className="ascii-divider">· · ·   · · ·   · · ·</div>

      {/* Feature 4: AI Insights */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div
          className="gi"
          style={{
            paddingTop: "var(--sp-7)",
            paddingBottom: "var(--sp-7)",
          }}
        >
          <div className="feature-row feature-row--reverse">
            <div className="ascii-frame">
              <pre className="ascii-art" style={{ margin: 0 }}>
{`  ┌─ AI ANALYSIS ──────────────────────┐
  │                                     │
  │  ⚠ ANOMALY DETECTED                │
  │  Case #4,821 — Invoice Processing   │
  │                                     │
  │  Pattern: Unusual rework loop       │
  │  Steps:   Review → Reject → Review  │
  │  Count:   3 iterations (avg: 1.1)   │
  │                                     │
  │  ┌─ PREDICTION ──────────────────┐  │
  │  │ SLA Breach Probability: 87%   │  │
  │  │ Estimated Delay: +2.1 days    │  │
  │  │ Recommended: Escalate to SR   │  │
  │  └───────────────────────────────┘  │
  │                                     │
  │  [Escalate]  [Dismiss]  [Details]   │
  └─────────────────────────────────────┘`}</pre>
            </div>
            <div>
              <span className="eyebrow eyebrow-bracket">04 Transform</span>
              <h2
                className="type-h2"
                style={{ marginTop: "var(--sp-3)" }}
              >
                AI-Powered <em>Insights</em>
              </h2>
              <p
                className="type-body"
                style={{
                  marginTop: "var(--sp-4)",
                  color: "var(--ink-mid)",
                }}
              >
                Machine learning models that understand process patterns. Predict
                bottlenecks before they happen, detect anomalies, and recommend
                actions.
              </p>
              <ul
                style={{
                  marginTop: "var(--sp-4)",
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--sp-2)",
                }}
              >
                {[
                  "Predictive SLA monitoring",
                  "Anomaly detection",
                  "Root cause analysis",
                  "Automated recommendations",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "var(--body)",
                      fontSize: "var(--fs-sm)",
                      color: "var(--ink-mid)",
                      paddingLeft: "var(--sp-4)",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        color: "var(--emerald)",
                      }}
                    >
                      &rarr;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: 'var(--sp-6)', paddingBottom: 'var(--sp-6)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--sp-4)' }}>
            <Link href="/use-cases" style={{ padding: 'var(--sp-4)', border: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)' }}>Next</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-sm)', color: 'var(--ink)', marginTop: 'var(--sp-1)' }}>See real use cases &rarr;</p>
            </Link>
            <Link href="/security" style={{ padding: 'var(--sp-4)', border: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)' }}>Security</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-sm)', color: 'var(--ink)', marginTop: 'var(--sp-1)' }}>Enterprise-grade security &rarr;</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band">
        <div
          className="gi"
          style={{ textAlign: "center", padding: "var(--sp-7) 0" }}
        >
          <h2 className="type-h2" style={{ color: "var(--white)" }}>
            See the platform <em>in action</em>
          </h2>
          <p
            style={{
              fontFamily: "var(--body)",
              color: "rgba(255,255,255,0.7)",
              maxWidth: 480,
              margin: "0 auto",
              marginTop: "var(--sp-4)",
            }}
          >
            Book a 30-minute demo with our team. We&apos;ll show you how
            Meridian works with your data.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "var(--sp-5)",
            }}
          >
            <Link
              href="/contact"
              className="btn btn-primary"
              style={{
                background: "var(--white)",
                color: "var(--ink-dark)",
                borderColor: "var(--white)",
              }}
            >
              Get Early Access
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
