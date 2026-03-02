import type { Metadata } from "next";
import Link from "next/link";
import { OODALoop } from "@/components/home/OODALoop";
import { PlatformTabs } from "@/components/home/PlatformTabs";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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
            ERPs, and CRMs — mine event logs, map real processes, find
            bottlenecks before they cost you. No guesswork. Just what actually
            happens in your systems.
          </p>
          <div style={{ display: "flex", gap: "var(--sp-3)", justifyContent: "center", marginTop: 36 }}>
            <Link href="/contact" className="btn btn-primary">Request early access</Link>
            <Link href="/platform" className="btn btn-ghost">How it works</Link>
          </div>
          <p style={{ fontFamily: "var(--body)", fontSize: "var(--fs-sm)", color: "var(--ink-faint)", marginTop: 16, letterSpacing: "-.01em" }}>
            No credit card &middot; No consultants &middot; First process map in under an hour
          </p>
        </div>
      </section>

      {/* ── Beyond SQL ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "var(--sp-6)" }}>
              <span className="eyebrow eyebrow-bracket">Beyond SQL</span>
              <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
                Dashboards tell you <em>what.</em><br />
                We tell you <em>why.</em>
              </h2>
              <p className="type-body" style={{ maxWidth: 520, margin: "0 auto", marginTop: "var(--sp-3)", color: "var(--ink-mid)" }}>
                Traditional BI shows you that something is slow. It can&apos;t
                show you why. Meridian combines process mining with LLMs to
                read the raw event trail your systems already produce —
                and reconstruct what actually happened.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 reveal-stagger" style={{ gap: "var(--sp-4)" }}>
            {[
              { title: "SQL + dashboards", desc: "\"Average cycle time is 47 days.\"", tone: "var(--ink-faint)" },
              { title: "Process mining", desc: "\"Here are the 14 paths your orders actually take.\"", tone: "var(--ink-muted)" },
              { title: "Meridian", desc: "\"Path 7 has a rework loop that costs you 11 days. Here's the fix.\"", tone: "var(--emerald)" },
            ].map((c) => (
              <Reveal key={c.title}>
                <div className="card-feature" style={{ padding: "var(--sp-5)", height: "100%" }}>
                  <span className="type-label" style={{ color: c.tone }}>{c.title}</span>
                  <p style={{ fontFamily: "var(--caslon)", fontSize: "var(--fs-md)", fontStyle: "italic", color: "var(--ink-mid)", lineHeight: 1.6, marginTop: "var(--sp-3)" }}>
                    {c.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Intelligence = Adapt ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "var(--sp-6)" }}>
              <span className="eyebrow eyebrow-bracket">Intelligence</span>
              <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
                Intelligence is the ability to <em>adapt</em>
              </h2>
              <p className="type-body" style={{ maxWidth: 500, margin: "0 auto", marginTop: "var(--sp-3)", color: "var(--ink-mid)" }}>
                You can&apos;t adapt to what you can&apos;t see. Meridian gives you
                a continuously running OODA loop — observe, orient, decide, act —
                faster than the problems can evolve.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <OODALoop />
          </Reveal>
        </div>
      </section>

      {/* ── Connectors ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: "var(--sp-5) 0" }}>
          <p className="type-label" style={{ textAlign: "center", marginBottom: "var(--sp-4)" }}>
            Connect everything. Miss nothing.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "var(--sp-3)", flexWrap: "wrap", alignItems: "center" }}>
            {["SAP", "Oracle", "ServiceNow", "Salesforce", "Jira", "Postgres", "Snowflake", "BigQuery"].map((name) => (
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
            <p className="type-label" style={{ textAlign: "center", marginBottom: "var(--sp-4)" }}>Your process on paper</p>
            <div className="ascii-frame overflow-x-auto" style={{ maxWidth: 500, margin: "0 auto" }}>
              <pre className="ascii-art" style={{ margin: 0, textAlign: "center" }}>{`Order  ──▶  Approve  ──▶  Invoice  ──▶  Payment`}</pre>
            </div>
          </Reveal>
          <Reveal>
            <p className="type-label" style={{ textAlign: "center", marginTop: "var(--sp-6)", marginBottom: "var(--sp-4)" }}>Your process in reality</p>
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
            <p style={{
              fontFamily: "var(--caslon)", fontSize: "var(--fs-lg)", fontStyle: "italic",
              color: "var(--emerald)", lineHeight: 1.5, textAlign: "center",
              maxWidth: 440, margin: "0 auto", marginTop: "var(--sp-6)",
            }}>
              Meridian shows you the second one. Automatically. From your own data.
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
            We&apos;re building the intelligence layer for operations.
            Be among the first to see it.
          </p>
          <div style={{ display: "flex", gap: "var(--sp-3)", justifyContent: "center", marginTop: "var(--sp-5)" }}>
            <Link href="/contact" className="btn btn-primary">Request early access</Link>
            <Link href="/platform" className="btn btn-ghost">Explore platform</Link>
          </div>
        </div>
      </section>
    </>
  );
}
