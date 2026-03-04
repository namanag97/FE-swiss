import type { Metadata } from "next";
import Link from "next/link";
import { OODALoop } from "@/components/home/OODALoop";
import { PlatformTabs } from "@/components/home/PlatformTabs";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { comparisonCards, connectors, speedPhases, useCaseCards } from "@/data/home";

export const metadata: Metadata = {
  description: "See how your business actually runs. Connect your ERP, CRM, or ITSM — get a living map of every process, bottleneck, and workaround. Built automatically from your data.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        eyebrow="Early access"
        heading={<>See how your business <em>actually runs</em></>}
        description="Connect your ERP, CRM, or ITSM. Get a living map of every process, every bottleneck, every workaround — built automatically from the data you already have."
        maxWidth={540}
      >
        <div style={{ display: "flex", gap: "var(--sp-3)", justifyContent: "center", marginTop: "var(--sp-6)" }}>
          <Link href="/contact" className="btn btn-primary">Request early access</Link>
          <Link href="/platform" className="btn btn-ghost">How it works</Link>
        </div>
        <p style={{ fontFamily: "var(--body)", fontSize: "var(--fs-sm)", color: "var(--ink-faint)", marginTop: "var(--sp-3)", letterSpacing: "-.01em" }}>
          No credit card &middot; No consultants &middot; First process map in under an hour
        </p>
      </PageHero>

      {/* ── Three levels of seeing ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "var(--sp-6)" }}>
              <span className="eyebrow eyebrow-bracket">The problem</span>
              <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
                Dashboards tell you <em>what.</em><br />
                We show you <em>why.</em>
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 reveal-stagger" style={{ gap: "var(--sp-4)" }}>
            {comparisonCards.map((c) => (
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

      {/* ── Connectors ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: "var(--sp-5) 0" }}>
          <p className="type-label" style={{ textAlign: "center", marginBottom: "var(--sp-4)" }}>
            Works with the systems you already run
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "var(--sp-3)", flexWrap: "wrap", alignItems: "center" }}>
            {connectors.map((name) => (
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

      {/* ── Continuous Intelligence ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "var(--sp-6)" }}>
              <span className="eyebrow eyebrow-bracket">Continuous</span>
              <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
                It never stops <em>watching</em>
              </h2>
              <p className="type-body" style={{ maxWidth: 500, margin: "0 auto", marginTop: "var(--sp-3)", color: "var(--ink-mid)" }}>
                Meridian doesn&apos;t generate a report and walk away. It observes
                your processes continuously, detects when something drifts,
                predicts what breaks next, and recommends what to fix.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <OODALoop />
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
            {speedPhases.map((t) => (
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
              From raw data to <em>action</em>
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
      <CtaBand
        heading={<>Your processes are talking. <em>Start listening.</em></>}
        description="We're building the intelligence layer for operations. Be among the first to see it."
        buttonText="Request early access"
        secondaryText="Explore platform"
        secondaryHref="/platform"
      />
    </>
  );
}
