import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { FeatureRow } from "@/components/layout/FeatureRow";
import { MetricGrid } from "@/components/layout/MetricGrid";
import { IntroSvg, O2cSvg, P2pSvg, ItsmSvg, PatientSvg } from "@/components/illustrations";
import { useCases } from "@/data/use-cases";

export const metadata: Metadata = {
  title: "Use Cases — O2C, P2P, ITSM & Patient Journey",
  description:
    "See how Meridian maps real workflows. Order-to-Cash, Procure-to-Pay, IT Service Management, and Patient Journey — find what your dashboards can't show you.",
  alternates: { canonical: "/use-cases" },
};

const illustrations: Record<string, ReactNode> = {
  o2c: <O2cSvg />,
  p2p: <P2pSvg />,
  itsm: <ItsmSvg />,
  healthcare: <PatientSvg />,
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
        <div className="gi section-pad-sm">
          <div className="illustration-frame-lg">
            <IntroSvg />
          </div>
        </div>
      </section>

      {useCases.map((uc) => (
        <FeatureRow
          key={uc.id}
          id={uc.id}
          eyebrow={uc.eyebrow}
          title={uc.title}
          tagline={uc.tagline}
          description={uc.description}
          illustration={illustrations[uc.id]}
          reverse={uc.reverse}
        >
          <MetricGrid metrics={uc.metrics} />
        </FeatureRow>
      ))}

      <section className="gr">
        <div className="gi py-[var(--sp-5)] text-center">
          <p className="type-body-sm text-[color:var(--ink-faint)] mb-[var(--sp-4)]" style={{ maxWidth: 560, margin: '0 auto var(--sp-4)' }}>
            ¹ Metrics reflect published industry benchmarks from process mining research (IEEE Task Force on Process Mining, Gartner). Actual results vary by organization.
          </p>
          <Link href="/platform" className="type-label text-[color:var(--emerald)]">
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
