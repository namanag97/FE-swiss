import Link from "next/link";
import type { Metadata } from "next";
import { C } from "@/lib/colors";
import { SvgNode, SvgArrow } from "@/components/svg/SvgPrimitives";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { FeatureRow } from "@/components/layout/FeatureRow";
import { MetricGrid } from "@/components/layout/MetricGrid";

export const metadata: Metadata = {
  title: "Use Cases — O2C, P2P, ITSM & Patient Journey",
  description:
    "See how Meridian maps real workflows. Order-to-Cash, Procure-to-Pay, IT Service Management, and Patient Journey — find what your dashboards can't show you.",
  alternates: { canonical: "/use-cases" },
  openGraph: { images: ["/og.png"] },
};

/* ── Intro Diagram: Data Sources → Event Log → Process Map ── */
function IntroSvg() {
  return (
    <svg viewBox="0 0 600 280" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Data flow from ERP, CRM, and ITSM systems through event log to process map producing variants, bottlenecks, and deviations" style={{ width: "100%", height: "auto" }}>
      {/* Data sources */}
      <SvgNode x={40} y={20} w={100} h={32} label="Your ERP" />
      <SvgNode x={250} y={20} w={100} h={32} label="Your CRM" />
      <SvgNode x={460} y={20} w={100} h={32} label="Your ITSM" />

      {/* Lines down to merge */}
      <line x1={90} y1={52} x2={90} y2={76} stroke={C.muted} strokeWidth={1} />
      <line x1={300} y1={52} x2={300} y2={76} stroke={C.muted} strokeWidth={1} />
      <line x1={510} y1={52} x2={510} y2={76} stroke={C.muted} strokeWidth={1} />
      <line x1={90} y1={76} x2={510} y2={76} stroke={C.muted} strokeWidth={1} />
      <line x1={300} y1={76} x2={300} y2={90} stroke={C.muted} strokeWidth={1} />
      <polygon points="300,96 296,88 304,88" fill={C.muted} />

      {/* Event Log */}
      <rect x={220} y={96} width={160} height={64} rx={2} fill={C.white} stroke={C.border} />
      <rect x={220} y={96} width={160} height={22} rx={2} fill={C.bg} stroke={C.border} />
      <text x={300} y={111} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.muted} letterSpacing={1}>EVENT LOG</text>
      <text x={240} y={134} fontSize={9} fontFamily="'Geist Mono', monospace" fill={C.faint}>case_id</text>
      <text x={296} y={134} fontSize={9} fontFamily="'Geist Mono', monospace" fill={C.faint}>activity</text>
      <text x={356} y={134} fontSize={9} fontFamily="'Geist Mono', monospace" fill={C.faint}>timestamp</text>
      <text x={240} y={150} fontSize={9} fontFamily="'Geist Mono', monospace" fill={C.mid}>1001</text>
      <text x={296} y={150} fontSize={9} fontFamily="'Geist Mono', monospace" fill={C.mid}>Create</text>
      <text x={356} y={150} fontSize={9} fontFamily="'Geist Mono', monospace" fill={C.mid}>09:01</text>

      {/* Arrow down */}
      <SvgArrow x1={300} y1={160} x2={300} y2={186} />

      {/* Process Map */}
      <SvgNode x={240} y={186} w={120} h={32} label="Process Map" accent />

      {/* Arrow down to outputs */}
      <line x1={300} y1={218} x2={300} y2={232} stroke={C.muted} strokeWidth={1} />
      <line x1={140} y1={232} x2={460} y2={232} stroke={C.muted} strokeWidth={1} />

      {/* Three outputs */}
      <SvgArrow x1={140} y1={232} x2={140} y2={248} />
      <SvgArrow x1={300} y1={232} x2={300} y2={248} />
      <SvgArrow x1={460} y1={232} x2={460} y2={248} />
      <text x={140} y={268} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={500} fill={C.green}>Variants</text>
      <text x={300} y={268} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={500} fill={C.green}>Bottlenecks</text>
      <text x={460} y={268} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={500} fill={C.green}>Deviations</text>
    </svg>
  );
}

/* ── O2C Process Map ── */
function O2cSvg() {
  return (
    <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Order-to-Cash process map showing happy path and manual review deviation adding 4.2 days" style={{ width: "100%", height: "auto" }}>
      <text x={240} y={16} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1}>ORDER-TO-CASH</text>

      {/* Main flow */}
      <SvgNode x={24} y={36} label="Order Entry" />
      <SvgArrow x1={104} y1={51} x2={128} y2={51} />
      <SvgNode x={128} y={36} label="Credit Check" />
      <SvgArrow x1={208} y1={51} x2={232} y2={51} />
      <SvgNode x={232} y={36} label="Approve" accent />

      {/* Branch after Approve */}
      <line x1={272} y1={66} x2={272} y2={86} stroke={C.muted} strokeWidth={1} />
      <line x1={160} y1={86} x2={384} y2={86} stroke={C.muted} strokeWidth={1} />

      {/* Left branch: Manual review (deviation) */}
      <SvgArrow x1={160} y1={86} x2={160} y2={106} />
      <SvgNode x={110} y={106} w={100} h={30} label="Manual Review" warn />
      <text x={160} y={150} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.amber}>34% · +4.2 days</text>

      {/* Right branch: Ship */}
      <SvgArrow x1={384} y1={86} x2={384} y2={106} />
      <SvgNode x={344} y={106} label="Ship" accent />
      <text x={384} y={150} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.green}>66% happy path</text>

      {/* Both merge to Invoice */}
      <line x1={160} y1={162} x2={160} y2={180} stroke={C.muted} strokeWidth={1} />
      <line x1={384} y1={136} x2={384} y2={180} stroke={C.muted} strokeWidth={1} />
      <line x1={160} y1={180} x2={384} y2={180} stroke={C.muted} strokeWidth={1} />
      <SvgArrow x1={272} y1={180} x2={272} y2={200} />
      <SvgNode x={232} y={200} label="Invoice" accent />

      <SvgArrow x1={272} y1={230} x2={272} y2={250} />
      <SvgNode x={232} y={250} label="Payment" accent />
    </svg>
  );
}

/* ── P2P Process Map ── */
function P2pSvg() {
  return (
    <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Procure-to-Pay process map showing 3-way match path and maverick buy deviation at 12% off-policy" style={{ width: "100%", height: "auto" }}>
      <text x={240} y={16} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1}>PROCURE-TO-PAY</text>

      <SvgNode x={24} y={36} label="Requisition" />
      <SvgArrow x1={104} y1={51} x2={128} y2={51} />
      <SvgNode x={128} y={36} label="Approve" />
      <SvgArrow x1={208} y1={51} x2={232} y2={51} />
      <SvgNode x={232} y={36} label="PO Create" accent />
      <SvgArrow x1={312} y1={51} x2={336} y2={51} />
      <SvgNode x={336} y={36} label="Receive" />

      {/* Branch after receive */}
      <line x1={376} y1={66} x2={376} y2={100} stroke={C.muted} strokeWidth={1} />
      <line x1={180} y1={100} x2={376} y2={100} stroke={C.muted} strokeWidth={1} />

      {/* Left: 3-way match (good) */}
      <SvgArrow x1={180} y1={100} x2={180} y2={120} />
      <SvgNode x={130} y={120} w={100} h={30} label="3-Way Match" accent />
      <text x={180} y={166} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.green}>88% matched</text>

      {/* Right: Maverick buy (deviation) */}
      <SvgArrow x1={340} y1={100} x2={340} y2={120} />
      <SvgNode x={290} y={120} w={100} h={30} label="Maverick Buy" warn />
      <text x={340} y={166} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.amber}>12% off-policy</text>

      {/* Merge to Payment */}
      <line x1={180} y1={176} x2={180} y2={196} stroke={C.muted} strokeWidth={1} />
      <line x1={340} y1={176} x2={340} y2={196} stroke={C.muted} strokeWidth={1} />
      <line x1={180} y1={196} x2={340} y2={196} stroke={C.muted} strokeWidth={1} />
      <SvgArrow x1={260} y1={196} x2={260} y2={216} />
      <SvgNode x={220} y={216} label="Invoice" />
      <SvgArrow x1={260} y1={246} x2={260} y2={262} />
      <SvgNode x={220} y={262} label="Payment" accent />
    </svg>
  );
}

/* ── ITSM Ticket Lifecycle ── */
function ItsmSvg() {
  return (
    <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ITSM ticket lifecycle showing L1 resolution at 72%, L2 escalation at 28%, and L3 escalation at 15%" style={{ width: "100%", height: "auto" }}>
      <text x={240} y={16} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1}>ITSM TICKET LIFECYCLE</text>

      <SvgNode x={180} y={36} w={120} h={30} label="Ticket Create" />
      <SvgArrow x1={240} y1={66} x2={240} y2={86} />
      <SvgNode x={180} y={86} w={120} h={30} label="Triage (L1)" />

      {/* Branch */}
      <line x1={240} y1={116} x2={240} y2={130} stroke={C.muted} strokeWidth={1} />
      <line x1={120} y1={130} x2={360} y2={130} stroke={C.muted} strokeWidth={1} />

      {/* L1 Resolve */}
      <SvgArrow x1={120} y1={130} x2={120} y2={152} />
      <SvgNode x={60} y={152} w={120} h={30} label="Resolve (L1)" accent />
      <text x={120} y={198} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={500} fill={C.green}>72%</text>

      {/* L2 Escalate */}
      <SvgArrow x1={360} y1={130} x2={360} y2={152} />
      <SvgNode x={300} y={152} w={120} h={30} label="Escalate (L2)" />
      <text x={360} y={198} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.mid}>28%</text>

      {/* L2 sub-branch */}
      <line x1={360} y1={206} x2={360} y2={218} stroke={C.muted} strokeWidth={1} />
      <line x1={260} y1={218} x2={440} y2={218} stroke={C.muted} strokeWidth={1} />

      <SvgArrow x1={260} y1={218} x2={260} y2={236} />
      <SvgNode x={200} y={236} w={120} h={30} label="Resolve (L2)" accent />
      <text x={260} y={280} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.green}>85%</text>

      <SvgArrow x1={440} y1={218} x2={440} y2={236} />
      <SvgNode x={380} y={236} w={120} h={30} label="Escalate (L3)" warn />
      <text x={440} y={280} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.amber}>15%</text>
    </svg>
  );
}

/* ── Patient Journey ── */
function PatientSvg() {
  return (
    <svg viewBox="0 0 480 340" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Patient journey from referral through triage, lab tests, diagnosis, treatment plan, and follow-up" style={{ width: "100%", height: "auto" }}>
      <text x={240} y={16} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1}>PATIENT JOURNEY</text>

      {/* Top row */}
      <SvgNode x={40} y={36} label="Referral" />
      <SvgArrow x1={120} y1={51} x2={160} y2={51} />
      <SvgNode x={160} y={36} label="Intake" />
      <SvgArrow x1={240} y1={51} x2={280} y2={51} />
      <SvgNode x={280} y={36} label="Triage" accent />

      {/* Branch */}
      <line x1={320} y1={66} x2={320} y2={88} stroke={C.muted} strokeWidth={1} />
      <line x1={160} y1={88} x2={400} y2={88} stroke={C.muted} strokeWidth={1} />

      <SvgArrow x1={160} y1={88} x2={160} y2={108} />
      <SvgNode x={120} y={108} label="Lab Tests" />

      <SvgArrow x1={400} y1={88} x2={400} y2={108} />
      <SvgNode x={360} y={108} label="Consult" />

      {/* Merge */}
      <line x1={160} y1={138} x2={160} y2={156} stroke={C.muted} strokeWidth={1} />
      <line x1={400} y1={138} x2={400} y2={156} stroke={C.muted} strokeWidth={1} />
      <line x1={160} y1={156} x2={400} y2={156} stroke={C.muted} strokeWidth={1} />
      <SvgArrow x1={280} y1={156} x2={280} y2={176} />

      <SvgNode x={240} y={176} label="Diagnosis" accent />
      <SvgArrow x1={280} y1={206} x2={280} y2={226} />
      <SvgNode x={230} y={226} w={100} h={30} label="Treatment Plan" />
      <SvgArrow x1={280} y1={256} x2={280} y2={276} />
      <SvgNode x={240} y={276} label="Follow-Up" accent />
    </svg>
  );
}

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
