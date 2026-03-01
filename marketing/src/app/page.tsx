import Link from "next/link";
import { ProcessMapHero } from "@/components/home/ProcessMapHero";
import { PlatformTabs } from "@/components/home/PlatformTabs";
import { PipelineDiagram } from "@/components/diagrams/PipelineDiagram";
import { SqlComparison } from "@/components/diagrams/SqlComparison";
import { LogoMarquee } from "@/components/diagrams/LogoMarquee";
import { FadeIn } from "@/components/diagrams/FadeIn";

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="gr section">
        <div className="gi" style={{ textAlign: "center" }}>
          <FadeIn>
            <PipelineDiagram />
          </FadeIn>

          <FadeIn delay={0.1}>
            <span className="eyebrow eyebrow-bracket" style={{ marginTop: "var(--sp-5)", display: "inline-flex" }}>
              Now available
            </span>
            <h1 className="type-display" style={{ marginTop: "var(--sp-3)" }}>
              See how your business<br /><em>actually runs</em>
            </h1>
            <p className="type-body" style={{ maxWidth: 560, margin: "var(--sp-4) auto 0" }}>
              The data platform for operations teams. Process mining, visual analytics,
              and AI-powered insights — beyond what SQL can show you.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex justify-center" style={{ gap: "var(--sp-3)", marginTop: "var(--sp-5)" }}>
              <Link href="/contact" className="btn btn-primary">Get Started</Link>
              <Link href="/request-demo" className="btn btn-ghost">Request Demo</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Process Map Visual ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi">
          <FadeIn>
            <ProcessMapHero />
          </FadeIn>
        </div>
      </section>

      {/* ── Logo Marquee ── */}
      <LogoMarquee />

      {/* ── Numbers ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: "var(--sp-5)", textAlign: "center" }}>
              {[
                { value: "10M+", label: "Events processed daily" },
                { value: "<2s", label: "Query response" },
                { value: "40%", label: "Avg bottleneck reduction" },
                { value: "23", label: "Industries served" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p style={{ fontFamily: "var(--sans)", fontSize: "var(--fs-2xl)", fontWeight: 300, color: "var(--ink-dark)", letterSpacing: "-0.02em" }}>
                    {stat.value}
                  </p>
                  <p className="type-label" style={{ marginTop: "var(--sp-2)" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SQL vs Process Mining ── */}
      <section className="gr section">
        <div className="gi">
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "var(--sp-6)" }}>
              <span className="eyebrow eyebrow-bracket">Why process mining</span>
              <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
                Go beyond <em>flat queries</em>
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <SqlComparison />
          </FadeIn>
        </div>
      </section>

      {/* ── Platform Tabs ── */}
      <section className="gr section">
        <div className="h-rule h-rule--top" />
        <div className="gi">
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "var(--sp-6)" }}>
              <span className="eyebrow eyebrow-bracket">Platform</span>
              <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
                Four pillars of <em>process intelligence</em>
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <PlatformTabs />
          </FadeIn>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="gr">
        <div className="h-rule h-rule--top" />
        <div className="gi section">
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "var(--sp-6)" }}>
              <span className="eyebrow eyebrow-bracket">Use Cases</span>
              <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>Built for <em>real workflows</em></h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "var(--sp-4)" }}>
            {[
              { title: "Order-to-Cash", desc: "Reduce DSO by identifying invoice bottlenecks and payment delays across the entire O2C cycle." },
              { title: "Procure-to-Pay", desc: "Uncover maverick buying, duplicate payments, and approval bottlenecks in your procurement process." },
              { title: "IT Service Management", desc: "Map ticket lifecycles, find resolution bottlenecks, and optimize escalation paths." },
              { title: "Patient Journey", desc: "Track patient flow through clinical pathways, identify wait times, and improve care coordination." },
            ].map((uc, i) => (
              <FadeIn key={uc.title} delay={i * 0.05}>
                <div className="card-feature" style={{ padding: "var(--sp-5)" }}>
                  <h3 className="type-h3">{uc.title}</h3>
                  <p className="type-body" style={{ marginTop: "var(--sp-3)", color: "var(--ink-mid)" }}>{uc.desc}</p>
                  <Link
                    href="/use-cases"
                    className="type-label"
                    style={{ color: "var(--emerald)", marginTop: "var(--sp-4)", display: "inline-block" }}
                  >
                    Learn more →
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="gr">
        <div className="h-rule h-rule--top" />
        <div className="gi section" style={{ maxWidth: 680, margin: "0 auto" }}>
          <FadeIn>
            <div className="card-feature" style={{ padding: "var(--sp-6)", textAlign: "center" }}>
              <blockquote style={{ fontFamily: "var(--caslon)", fontSize: "var(--fs-lg)", fontStyle: "italic", color: "var(--emerald)", lineHeight: 1.6 }}>
                &ldquo;Meridian showed us process variants we didn&apos;t know existed. We reduced our order cycle time by 34% in the first quarter.&rdquo;
              </blockquote>
              <div style={{ marginTop: "var(--sp-4)" }}>
                <p style={{ fontFamily: "var(--body)", fontSize: "var(--fs-sm)", fontWeight: 500, color: "var(--ink)" }}>Anna Berglund</p>
                <p className="type-label" style={{ marginTop: 2 }}>VP Operations, Nordic Manufacturing Co.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="cta-band">
        <div className="gi" style={{ textAlign: "center", padding: "var(--sp-7) 0" }}>
          <h2 className="type-h2" style={{ color: "var(--white)" }}>
            Ready to see your <em>real processes</em>?
          </h2>
          <p style={{ fontFamily: "var(--body)", color: "rgba(255,255,255,0.7)", maxWidth: 480, margin: "var(--sp-4) auto 0" }}>
            Start with a free pilot. No credit card required.
          </p>
          <div className="flex justify-center" style={{ gap: "var(--sp-3)", marginTop: "var(--sp-5)" }}>
            <Link href="/contact" className="btn btn-primary" style={{ background: "var(--white)", color: "var(--ink-dark)", borderColor: "var(--white)" }}>Get Started</Link>
            <Link href="/request-demo" className="btn btn-ghost" style={{ color: "var(--white)", borderColor: "rgba(255,255,255,0.3)" }}>Request Demo</Link>
          </div>
        </div>
      </section>
    </>
  );
}
