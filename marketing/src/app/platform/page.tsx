import Link from "next/link";
import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { FeatureRow } from "@/components/layout/FeatureRow";
import { DiscoverySvg, ConformanceSvg, AnalyticsSvg, AiInsightsSvg } from "@/components/illustrations";

export const metadata: Metadata = {
  title: "Platform — Process Discovery, Conformance & AI Insights",
  description:
    "From raw event logs to automated action. Process discovery, conformance checking, visual analytics, and AI-powered insights in one platform.",
  alternates: { canonical: "/platform" },
  openGraph: { images: ["/og.png"] },
};

export default function PlatformPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Platform"
        heading={<>From raw event logs to <em>automated action</em></>}
        description="Four modules. One platform. Connect your systems, see how work actually flows, find what's broken, fix it — before it costs you."
      />

      {/* Feature 1: Process Discovery */}
      <FeatureRow
        eyebrow="01 Discover"
        title={<>Process <em>Discovery</em></>}
        tagline="You've never actually seen your own process. Now you will."
        description="Automatically reconstruct process models from event log data. No interviews, no workshops, no Post-it walls — just what actually happens in your systems."
        items={["Alpha & Heuristic miners", "Multi-source log correlation", "Variant detection & clustering", "Interactive process maps"]}
        illustration={<DiscoverySvg />}
      />

      {/* Feature 2: Conformance Checking */}
      <FeatureRow
        eyebrow="02 Diagnose"
        title={<>Conformance <em>Checking</em></>}
        tagline="Here's what should happen. Here's what actually happens. Here's what it costs you."
        description="Overlay your ideal process against reality. Instantly see where execution deviates from design — and measure the cost of each deviation."
        items={["Token-based replay analysis", "Deviation classification", "Cost-per-deviation metrics", "Root cause drill-down"]}
        illustration={<ConformanceSvg />}
        reverse
      />

      {/* Feature 3: Visual Analytics */}
      <FeatureRow
        eyebrow="03 Analyze"
        title={<>Visual <em>Analytics</em></>}
        tagline="Click a spike. Land on the exact variant that caused it."
        description="Dashboards built for process data. KPI tracking, variant distribution, SLA monitoring — all connected to the process layer beneath. Not just charts. Charts that know what happened underneath."
        items={["Process-aware KPI dashboards", "Variant frequency distribution", "SLA monitoring & alerting", "Throughput time analysis"]}
        illustration={<AnalyticsSvg />}
      />

      {/* Feature 4: AI Insights */}
      <FeatureRow
        eyebrow="04 Transform"
        title={<>AI-Powered <em>Insights</em></>}
        tagline="It doesn't just find the problem. It tells you what to do about it."
        description="LLMs that understand process patterns. Predict bottlenecks before they happen, detect anomalies, and recommend actions — in plain language, not query syntax."
        items={["Predictive SLA monitoring", "Anomaly detection", "Root cause analysis", "Automated recommendations"]}
        illustration={<AiInsightsSvg />}
        reverse
      />

      {/* Cross-links */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: 'var(--sp-6)', paddingBottom: 'var(--sp-6)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--sp-4)' }}>
            <Link href="/use-cases" className="link-card">
              <p className="nav-link-label">Use Cases</p>
              <p className="nav-link-text">See real workflows &rarr;</p>
            </Link>
            <Link href="/security" className="link-card">
              <p className="nav-link-label">Security</p>
              <p className="nav-link-text">Your data stays yours &rarr;</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <CtaBand
        heading={<>See your processes <em>for the first time</em></>}
        description="Connect your systems. Get your first process map in under an hour. No consultants required."
      />
    </>
  );
}
