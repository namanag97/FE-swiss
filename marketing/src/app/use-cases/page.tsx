import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "See how process mining transforms Order-to-Cash, Procure-to-Pay, ITSM, and Patient Journey workflows.",
  alternates: { canonical: "/use-cases" },
  openGraph: { images: ["/og.png"] },
};

export default function UseCasesPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="gr"
        style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}
      >
        <div className="gi" style={{ textAlign: "center" }}>
          <span className="eyebrow eyebrow-bracket">Use Cases</span>
          <h1
            className="type-display"
            style={{ marginTop: "var(--sp-3)" }}
          >
            Built for <em>real workflows</em>
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
            Process mining works wherever there&apos;s a sequence of events.
            Here are the workflows where it delivers the most impact.
          </p>
        </div>
      </section>

      {/* ASCII Intro */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: "var(--sp-6) 0" }}>
          <div
            className="ascii-frame"
            style={{ maxWidth: 680, margin: "0 auto" }}
          >
            <pre className="ascii-art" style={{ margin: 0, textAlign: "center" }}>
{`  WHAT PROCESS MINING REVEALS

  Your ERP          Your CRM          Your ITSM
     │                  │                  │
     └──────────┬───────┘──────────────────┘
                │
         ┌──────┴──────┐
         │  EVENT LOG  │
         │  ─────────  │
         │  case_id    │
         │  activity   │
         │  timestamp  │
         └──────┬──────┘
                │
         ┌──────┴──────┐
         │   PROCESS   │
         │     MAP     │
         └─────────────┘
                │
    ┌───────────┼───────────┐
    ▼           ▼           ▼
 Variants   Bottlenecks  Deviations`}</pre>
          </div>
        </div>
      </section>

      <div className="ascii-divider">&middot; &middot; &middot;   &middot; &middot; &middot;   &middot; &middot; &middot;</div>

      {/* Use Case 1: Order-to-Cash */}
      <section id="o2c" className="gr" style={{ scrollMarginTop: 'var(--nav-h)' }}>
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
              <span className="eyebrow eyebrow-bracket">O2C</span>
              <h2
                className="type-h2"
                style={{ marginTop: "var(--sp-3)" }}
              >
                Order-to-Cash
              </h2>
              <p
                className="type-body"
                style={{
                  marginTop: "var(--sp-4)",
                  color: "var(--ink-mid)",
                }}
              >
                Reduce Days Sales Outstanding by finding where invoices get
                stuck. Identify the approval bottlenecks, credit check delays,
                and manual interventions that slow your cash conversion cycle.
              </p>
              <div
                style={{
                  marginTop: "var(--sp-5)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "var(--sp-3)",
                }}
              >
                {[
                  { value: "-34%", label: "Cycle time reduction" },
                  { value: "-3 days", label: "DSO improvement" },
                  { value: "66%", label: "Straight-through rate" },
                  { value: "23", label: "Variants discovered" },
                ].map((m) => (
                  <div
                    key={m.label}
                    style={{
                      padding: "var(--sp-3)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: "var(--fs-lg)",
                        fontWeight: 300,
                        color: "var(--emerald)",
                      }}
                    >
                      {m.value}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: "var(--fs-xs)",
                        color: "var(--ink-muted)",
                        marginTop: "var(--sp-1)",
                      }}
                    >
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="ascii-frame">
              <pre className="ascii-art" style={{ margin: 0 }}>
{`  ORDER-TO-CASH PROCESS MAP

  ┌───────┐    ┌────────┐    ┌────────┐
  │ Order │───▶│ Credit │───▶│Approve │
  │ Entry │    │ Check  │    │        │
  └───────┘    └────┬───┘    └───┬────┘
                    │            │
               34% ▼       66% ▼
          ┌─────────┐    ┌────────┐
          │ Manual  │    │  Ship  │
          │ Review  │    │        │
          │ +4.2d ⚠ │    └───┬────┘
          └────┬────┘        │
               │             │
               └─────┬───────┘
                     ▼
               ┌──────────┐
               │ Invoice  │
               │          │
               └──────────┘`}</pre>
            </div>
          </div>
        </div>
      </section>

      <div className="ascii-divider">&middot; &middot; &middot;   &middot; &middot; &middot;   &middot; &middot; &middot;</div>

      {/* Use Case 2: Procure-to-Pay */}
      <section id="p2p" className="gr" style={{ scrollMarginTop: 'var(--nav-h)' }}>
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
{`  PROCURE-TO-PAY PROCESS MAP

  ┌────────┐    ┌────────┐
  │  Req   │───▶│Approve │──┐
  └────────┘    └────────┘  │
                            │
       ┌────────────────────┘
       │
       ▼
  ┌────────┐    ┌────────┐
  │   PO   │───▶│Receive │
  │ Create │    │ Goods  │
  └────────┘    └───┬────┘
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
    ┌──────────┐       ┌──────────┐
    │ 3-Way    │       │ Maverick │
    │ Match ✓  │       │ Buy ⚠    │
    └────┬─────┘       └────┬─────┘
         │                  │
         └────────┬─────────┘
                  ▼
            ┌──────────┐
            │ Payment  │
            └──────────┘`}</pre>
            </div>
            <div>
              <span className="eyebrow eyebrow-bracket">P2P</span>
              <h2
                className="type-h2"
                style={{ marginTop: "var(--sp-3)" }}
              >
                Procure-to-Pay
              </h2>
              <p
                className="type-body"
                style={{
                  marginTop: "var(--sp-4)",
                  color: "var(--ink-mid)",
                }}
              >
                Uncover maverick buying, duplicate payments, and approval
                bottlenecks. See exactly where your procurement process
                deviates from policy — and how much those deviations cost.
              </p>
              <div
                style={{
                  marginTop: "var(--sp-5)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "var(--sp-3)",
                }}
              >
                {[
                  { value: "12%", label: "Maverick spend found" },
                  { value: "-2.1 days", label: "PO cycle time" },
                  { value: "94%", label: "3-way match rate" },
                  { value: "$2.3M", label: "Annual savings" },
                ].map((m) => (
                  <div
                    key={m.label}
                    style={{
                      padding: "var(--sp-3)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: "var(--fs-lg)",
                        fontWeight: 300,
                        color: "var(--emerald)",
                      }}
                    >
                      {m.value}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: "var(--fs-xs)",
                        color: "var(--ink-muted)",
                        marginTop: "var(--sp-1)",
                      }}
                    >
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="ascii-divider">&middot; &middot; &middot;   &middot; &middot; &middot;   &middot; &middot; &middot;</div>

      {/* Use Case 3: ITSM */}
      <section id="itsm" className="gr" style={{ scrollMarginTop: 'var(--nav-h)' }}>
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
              <span className="eyebrow eyebrow-bracket">ITSM</span>
              <h2
                className="type-h2"
                style={{ marginTop: "var(--sp-3)" }}
              >
                IT Service Management
              </h2>
              <p
                className="type-body"
                style={{
                  marginTop: "var(--sp-4)",
                  color: "var(--ink-mid)",
                }}
              >
                Map ticket lifecycles from creation to resolution. Find where
                escalations bounce, identify resolution bottlenecks, and
                optimize your support tiers.
              </p>
              <div
                style={{
                  marginTop: "var(--sp-5)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "var(--sp-3)",
                }}
              >
                {[
                  { value: "-28%", label: "Resolution time" },
                  { value: "-45%", label: "Escalation bounces" },
                  { value: "91%", label: "First-call resolution" },
                  { value: "4.2", label: "Avg touches reduced" },
                ].map((m) => (
                  <div
                    key={m.label}
                    style={{
                      padding: "var(--sp-3)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: "var(--fs-lg)",
                        fontWeight: 300,
                        color: "var(--emerald)",
                      }}
                    >
                      {m.value}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: "var(--fs-xs)",
                        color: "var(--ink-muted)",
                        marginTop: "var(--sp-1)",
                      }}
                    >
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="ascii-frame">
              <pre className="ascii-art" style={{ margin: 0 }}>
{`  ITSM TICKET LIFECYCLE

  ┌────────┐    ┌────────┐
  │ Ticket │───▶│ Triage │
  │ Create │    │  (L1)  │
  └────────┘    └───┬────┘
                    │
          ┌─────────┴─────────┐
     72% ▼               28% ▼
  ┌──────────┐       ┌──────────┐
  │ Resolve  │       │ Escalate │
  │  (L1) ✓  │       │  (L2)    │
  └──────────┘       └────┬─────┘
                          │
                ┌─────────┴────────┐
           85% ▼              15% ▼
        ┌──────────┐     ┌──────────┐
        │ Resolve  │     │ Escalate │
        │  (L2) ✓  │     │ (L3) ⚠   │
        └──────────┘     └──────────┘`}</pre>
            </div>
          </div>
        </div>
      </section>

      <div className="ascii-divider">&middot; &middot; &middot;   &middot; &middot; &middot;   &middot; &middot; &middot;</div>

      {/* Use Case 4: Patient Journey */}
      <section id="healthcare" className="gr" style={{ scrollMarginTop: 'var(--nav-h)' }}>
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
{`  PATIENT JOURNEY MAP

  ┌────────┐    ┌────────┐    ┌────────┐
  │Referral│───▶│ Intake │───▶│ Triage │
  └────────┘    └────────┘    └───┬────┘
                                  │
                    ┌─────────────┴──────┐
                    ▼                    ▼
              ┌──────────┐        ┌──────────┐
              │   Lab    │        │  Consult  │
              │  Tests   │        │           │
              └────┬─────┘        └────┬─────┘
                   │                   │
                   └─────────┬─────────┘
                             ▼
                       ┌──────────┐
                       │ Diagnosis│
                       └────┬─────┘
                            ▼
                       ┌──────────┐
                       │Treatment │
                       │  Plan    │
                       └────┬─────┘
                            ▼
                       ┌──────────┐
                       │ Follow-  │
                       │   Up     │
                       └──────────┘`}</pre>
            </div>
            <div>
              <span className="eyebrow eyebrow-bracket">Healthcare</span>
              <h2
                className="type-h2"
                style={{ marginTop: "var(--sp-3)" }}
              >
                Patient Journey
              </h2>
              <p
                className="type-body"
                style={{
                  marginTop: "var(--sp-4)",
                  color: "var(--ink-mid)",
                }}
              >
                Track patient flow through clinical pathways. Identify wait
                time hotspots, care coordination gaps, and pathway deviations
                that affect outcomes and patient satisfaction.
              </p>
              <div
                style={{
                  marginTop: "var(--sp-5)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "var(--sp-3)",
                }}
              >
                {[
                  { value: "-22%", label: "Wait time reduction" },
                  { value: "3.1h", label: "Avg time to diagnosis" },
                  { value: "89%", label: "Pathway adherence" },
                  { value: "+12%", label: "Patient satisfaction" },
                ].map((m) => (
                  <div
                    key={m.label}
                    style={{
                      padding: "var(--sp-3)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: "var(--fs-lg)",
                        fontWeight: 300,
                        color: "var(--emerald)",
                      }}
                    >
                      {m.value}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: "var(--fs-xs)",
                        color: "var(--ink-muted)",
                        marginTop: "var(--sp-1)",
                      }}
                    >
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="gr">
        <div className="gi" style={{ padding: 'var(--sp-5) 0', textAlign: 'center' }}>
          <Link href="/platform" style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--emerald)' }}>
            &larr; Explore the full platform
          </Link>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band">
        <div
          className="gi"
          style={{ textAlign: "center", padding: "var(--sp-7) 0" }}
        >
          <h2 className="type-h2" style={{ color: "var(--white)" }}>
            See your <em>process in action</em>
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
            Be among the first to run process mining on your workflows.
            Request early access today.
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
