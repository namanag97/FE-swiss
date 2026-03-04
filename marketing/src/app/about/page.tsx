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
            <p className="type-body text-mid" style={{ maxWidth: 560, margin: "0 auto", marginTop: "var(--sp-4)" }}>
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
              <div key={v.title} className="card-feature" style={{ padding: "var(--sp-5)" }}>
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
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            {timeline.map((t, i) => (
              <div key={t.year} className="about-timeline-row" style={{ paddingBottom: i < timeline.length - 1 ? "var(--sp-5)" : 0 }}>
                <span style={{ fontFamily: "var(--sans)", fontSize: "var(--fs-sm)", color: "var(--emerald)", textAlign: "right", fontWeight: 500 }}>
                  {t.year}
                </span>
                <div style={{ background: "var(--border-mid)", position: "relative" }}>
                  <div style={{ width: 7, height: 7, border: "1px solid var(--emerald)", background: "var(--bg)", position: "absolute", top: 4, left: -3 }} />
                </div>
                <p className="type-body text-mid">{t.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: "var(--sp-6) 0", display: "flex", justifyContent: "center", gap: "var(--sp-4)" }}>
          <Link href="/platform" style={{ padding: "var(--sp-3) var(--sp-5)", border: "1px solid var(--border)", fontFamily: "var(--sans)", fontSize: "var(--fs-xs)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink)", textDecoration: "none" }}>
            See the platform &rarr;
          </Link>
          <Link href="/security" style={{ padding: "var(--sp-3) var(--sp-5)", border: "1px solid var(--border)", fontFamily: "var(--sans)", fontSize: "var(--fs-xs)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink)", textDecoration: "none" }}>
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
