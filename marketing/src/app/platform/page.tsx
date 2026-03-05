import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { FeatureRow } from "@/components/layout/FeatureRow";
import { DiscoverySvg, ConformanceSvg, AnalyticsSvg, AiInsightsSvg } from "@/components/illustrations";
import { platformFeatures } from "@/data/platform";

export const metadata: Metadata = {
  title: "Platform — Process Discovery, Conformance & AI Insights",
  description:
    "From raw event logs to automated action. Process discovery, conformance checking, visual analytics, and AI-powered insights in one platform.",
  alternates: { canonical: "/platform" },
  openGraph: { images: ["/og.png"] },
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
        eyebrow="Platform"
        heading={<>From raw event logs to <em>automated action</em></>}
        description="Four modules. One platform. Connect your systems, see how work actually flows, find what's broken, fix it — before it costs you."
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
          <div className="grid grid-cols-2 gap-[var(--sp-4)]">
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
