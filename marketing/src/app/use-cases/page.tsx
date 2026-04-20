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
  title: "Solutions — O2C, P2P, ITSM & Patient Journey",
  description:
    "See where Sancalana pays off first: Order-to-Cash, Procure-to-Pay, IT Service Management, and patient flow.",
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
        eyebrow="Solutions"
        heading={<>Start where process drag <em>hurts most</em></>}
        description="Revenue operations, procurement, service delivery, and patient flow all leave behind event histories. These are the workflows where seeing the real path changes the operating conversation fast."
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
          <p className="type-body-sm mx-auto mb-[var(--sp-4)] max-w-[560px] text-[color:var(--ink-faint)]">
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
        description="Start with the workflow that is already creating noise, delay, or missed targets. We will show you the path underneath it."
        secondaryText="See the product"
        secondaryHref="/platform"
      />
    </>
  );
}
