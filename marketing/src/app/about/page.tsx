import Link from "next/link";
import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { ProcessComparisonSvg, ArchitectureSvg } from "@/components/illustrations";
import { beliefs, timeline } from "@/data/about";

export const metadata: Metadata = {
  title: "About — Why We're Building Meridian",
  description: "Every company runs on processes. Almost none can see them. We're building the platform to make operational reality visible, measurable, and fixable.",
  alternates: { canonical: "/about" },
  openGraph: { images: ["/og.png"] },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="About"
        heading={<>Why we&apos;re <em>building this</em></>}
        description="Every company runs on processes. Almost none of them can see those processes. We think that's the most expensive blind spot in business."
      />

      {/* The Problem */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section-pad">
          <div className="about-split">
            <div>
              <span className="eyebrow eyebrow-bracket">The blind spot</span>
              <h2 className="type-h2 mt-3">
                You have a process diagram<br />on the wall. <em>It&apos;s wrong.</em>
              </h2>
              <p className="type-body mt-4 text-mid">
                The gap between how work is designed and how work actually happens
                is where inefficiency lives — in rework loops nobody mapped,
                approvals nobody questioned, and bottlenecks nobody can see
                because nobody is looking at the right data.
              </p>
              <p className="type-body mt-3 text-mid">
                Your BI tools tell you what happened. They can&apos;t tell you
                how — the sequence of steps, the variants, the deviations.
                That&apos;s a different kind of data. That&apos;s what we work with.
              </p>
            </div>
            <div className="illustration-frame">
              <ProcessComparisonSvg />
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section-pad">
          <div className="section-center">
            <span className="eyebrow eyebrow-bracket">Our approach</span>
            <h2 className="type-h2 mt-3">
              Algorithms first. <em>Interface second.</em>
            </h2>
            <p className="type-body text-mid max-w-[560px] mx-auto mt-4">
              We start with the math — process mining algorithms that reconstruct
              reality from raw event data. Then we build the interface that makes
              it actionable. Not the other way around.
            </p>
          </div>
          <div className="illustration-frame-lg">
            <ArchitectureSvg />
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section-pad">
          <div className="section-center">
            <span className="eyebrow eyebrow-bracket">Beliefs</span>
            <h2 className="type-h2 mt-3">What we <em>believe</em></h2>
          </div>
          <div className="about-values-grid">
            {beliefs.map((v) => (
              <div key={v.title} className="card-feature">
                <h3 className="type-h3">{v.title}</h3>
                <p className="type-body mt-3 text-mid">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section-pad">
          <div className="section-center">
            <span className="eyebrow eyebrow-bracket">Timeline</span>
            <h2 className="type-h2 mt-3">Building in <em>the open</em></h2>
          </div>
          <div className="max-w-[560px] mx-auto">
            {timeline.map((t, i) => (
              <div key={t.year} className="about-timeline-row" style={{ paddingBottom: i < timeline.length - 1 ? "var(--sp-5)" : 0 }}>
                <span className="font-[var(--sans)] text-[length:var(--fs-sm)] text-[color:var(--emerald)] text-right font-medium">
                  {t.year}
                </span>
                <div className="bg-[var(--border-mid)] relative">
                  <div className="w-[7px] h-[7px] border border-[var(--emerald)] bg-[var(--bg)] absolute top-[4px] left-[-3px]" />
                </div>
                <p className="type-body text-mid">{t.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi py-[var(--sp-6)] flex justify-center gap-[var(--sp-4)]">
          <Link href="/platform" className="inline-block py-[var(--sp-3)] px-[var(--sp-5)] border border-[var(--border)] nav-link-label no-underline hover:border-[var(--border-mid)]">
            See the platform &rarr;
          </Link>
          <Link href="/security" className="inline-block py-[var(--sp-3)] px-[var(--sp-5)] border border-[var(--border)] nav-link-label no-underline hover:border-[var(--border-mid)]">
            Security &amp; compliance &rarr;
          </Link>
        </div>
      </section>

      {/* CTA Band */}
      <CtaBand
        heading={<>We&apos;re building this <em>right now</em></>}
        description="Early access is open. Be among the first to see your processes for what they really are."
      />
    </>
  );
}
