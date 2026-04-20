import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { FeatureRow } from "@/components/layout/FeatureRow";
import { DiscoverySvg, ConformanceSvg, AnalyticsSvg, AiInsightsSvg } from "@/components/illustrations";
import { platformFeatures } from "@/data/platform";

export const metadata: Metadata = {
  title: "Product — Discover, Diagnose, Predict & Act",
  description:
    "See how Sancalana turns process data into operational action: discovery, conformance, analysis, and intervention in one product.",
  alternates: { canonical: "/platform" },
  openGraph: {
    images: [{ url: "/opengraph-image" }],
  },
};

const illustrations: Record<string, ReactNode> = {
  "01 Discover": <DiscoverySvg />,
  "02 Diagnose": <ConformanceSvg />,
  "03 Analyze": <AnalyticsSvg />,
  "04 Transform": <AiInsightsSvg />,
};

export default function PlatformPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Product"
        heading={<>From event logs to <em>operating decisions</em></>}
        description="Four modules. One workflow. Connect your systems, surface the actual path, isolate the costly deviations, and move from insight to action faster."
      />

      {platformFeatures.map((f) => (
        <FeatureRow
          key={f.eyebrow}
          eyebrow={f.eyebrow}
          title={<>{f.title} <em>{f.titleEm}</em></>}
          tagline={f.tagline}
          description={f.description}
          items={f.items}
          illustration={illustrations[f.eyebrow]}
          reverse={f.reverse}
        />
      ))}

      {/* Cross-links */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section-pad-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--sp-4)]">
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
        heading={<>Want the product tour <em>without the theater?</em></>}
        description="Tell us the systems you run and the process that hurts. We will show you how Sancalana maps it."
        secondaryText="See solutions"
        secondaryHref="/use-cases"
      />
    </>
  );
}
