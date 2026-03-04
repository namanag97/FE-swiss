import Link from "next/link";
import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { FeatureRow } from "@/components/layout/FeatureRow";
import { MetricGrid } from "@/components/layout/MetricGrid";
import { IntroSvg, O2cSvg, P2pSvg, ItsmSvg, PatientSvg } from "@/components/illustrations";

export const metadata: Metadata = {
  title: "Use Cases — O2C, P2P, ITSM & Patient Journey",
  description:
    "See how Meridian maps real workflows. Order-to-Cash, Procure-to-Pay, IT Service Management, and Patient Journey — find what your dashboards can't show you.",
  alternates: { canonical: "/use-cases" },
  openGraph: { images: ["/og.png"] },
};

export default function UseCasesPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Use Cases"
        heading={<>Built for <em>real workflows</em></>}
        description="Wherever there's a sequence of events, there's a process hiding in your data. These are the workflows where making it visible changes everything."
      />

      {/* Intro Diagram */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: "var(--sp-6) 0" }}>
          <div style={{ maxWidth: 680, margin: "0 auto", border: "1px solid var(--border)", padding: "var(--sp-4)", background: "var(--bg)" }}>
            <IntroSvg />
          </div>
        </div>
      </section>

      {/* O2C */}
      <FeatureRow
        id="o2c"
        eyebrow="O2C"
        title="Order-to-Cash"
        tagline="Your invoices take 47 days. The process says 5."
        description="Find where invoices actually get stuck — the approval bottlenecks, credit check delays, and rework loops that your dashboard can't explain. See the 12 variants hiding between order and payment."
        illustration={<O2cSvg />}
      >
        <MetricGrid metrics={[
          { value: "~34%", label: "Typical cycle time reduction" },
          { value: "~3 days", label: "Target DSO improvement" },
          { value: "66%+", label: "Straight-through target" },
          { value: "20+", label: "Variants detectable" },
        ]} />
      </FeatureRow>

      {/* P2P */}
      <FeatureRow
        id="p2p"
        eyebrow="P2P"
        title="Procure-to-Pay"
        tagline="3 in 10 POs bypass approval. Nobody knows why."
        description="Uncover maverick buying, duplicate payments, and approval bottlenecks. See exactly where procurement deviates from policy — and how much those deviations cost you every quarter."
        illustration={<P2pSvg />}
        reverse
      >
        <MetricGrid metrics={[
          { value: "~12%", label: "Typical maverick spend found" },
          { value: "~2 days", label: "Target PO cycle time savings" },
          { value: "94%+", label: "3-way match target" },
          { value: "7+", label: "Deviation types detected" },
        ]} />
      </FeatureRow>

      {/* ITSM */}
      <FeatureRow
        id="itsm"
        eyebrow="ITSM"
        title="IT Service Management"
        tagline="Tickets bounce between 4 teams before anyone fixes anything."
        description="Map ticket lifecycles from creation to resolution. See where escalations bounce, which tiers are bottlenecks, and why first-call resolution keeps dropping."
        illustration={<ItsmSvg />}
      >
        <MetricGrid metrics={[
          { value: "~28%", label: "Target resolution time savings" },
          { value: "~45%", label: "Fewer escalation bounces" },
          { value: "90%+", label: "First-call resolution target" },
          { value: "3+", label: "Escalation tiers mapped" },
        ]} />
      </FeatureRow>

      {/* Healthcare */}
      <FeatureRow
        id="healthcare"
        eyebrow="Healthcare"
        title="Patient Journey"
        tagline="Average wait time says 20 minutes. The actual patient flow tells a different story."
        description="Track patient flow through clinical pathways. Find the wait time hotspots, care coordination gaps, and pathway deviations that your averages are hiding."
        illustration={<PatientSvg />}
        reverse
      >
        <MetricGrid metrics={[
          { value: "~22%", label: "Target wait time reduction" },
          { value: "<4h", label: "Target time to diagnosis" },
          { value: "85%+", label: "Pathway adherence target" },
          { value: "5+", label: "Journey stages mapped" },
        ]} />
      </FeatureRow>

      <section className="gr">
        <div className="gi" style={{ padding: "var(--sp-5) 0", textAlign: "center" }}>
          <Link href="/platform" style={{ fontFamily: "var(--sans)", fontSize: "var(--fs-xs)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--emerald)" }}>
            &larr; Explore the full platform
          </Link>
        </div>
      </section>

      {/* CTA Band */}
      <CtaBand
        heading={<>Which process is costing you <em>the most?</em></>}
        description="Tell us what you run. We'll show you what's hiding in it."
      />
    </>
  );
}
