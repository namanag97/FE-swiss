import Link from "next/link";
import type { Metadata } from "next";
import { DiscoveryDiagram } from "@/components/diagrams/DiscoveryDiagram";
import { ConformanceDiagram } from "@/components/diagrams/ConformanceDiagram";
import { AnalyticsDiagram } from "@/components/diagrams/AnalyticsDiagram";
import { AIDiagram } from "@/components/diagrams/AIDiagram";
import { FadeIn } from "@/components/diagrams/FadeIn";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Process mining, conformance checking, visual analytics, and AI insights — the complete platform for operational intelligence.",
  alternates: { canonical: "/product" },
  openGraph: { images: ["/og.png"] },
};

const features = [
  {
    num: "01",
    eyebrow: "Discover",
    title: "Process",
    titleEm: "Discovery",
    desc: "Automatically reconstruct process models from event log data. No interviews, no workshops — just what actually happens in your systems.",
    bullets: [
      "Alpha & Heuristic miners",
      "Multi-source log correlation",
      "Variant detection & clustering",
      "Interactive process maps",
    ],
    diagram: "discovery",
    reverse: false,
  },
  {
    num: "02",
    eyebrow: "Diagnose",
    title: "Conformance",
    titleEm: "Checking",
    desc: "Overlay your ideal process against reality. Instantly see where execution deviates from design — and measure the cost of each deviation.",
    bullets: [
      "Token-based replay analysis",
      "Deviation classification",
      "Cost-per-deviation metrics",
      "Root cause drill-down",
    ],
    diagram: "conformance",
    reverse: true,
  },
  {
    num: "03",
    eyebrow: "Predict",
    title: "Visual",
    titleEm: "Analytics",
    desc: "Dashboards built for process data. KPI tracking, variant distribution, SLA monitoring — all connected to the process layer beneath.",
    bullets: [
      "Process-aware KPI dashboards",
      "Variant frequency distribution",
      "SLA monitoring & alerting",
      "Throughput time analysis",
    ],
    diagram: "analytics",
    reverse: false,
  },
  {
    num: "04",
    eyebrow: "Transform",
    title: "AI-Powered",
    titleEm: "Insights",
    desc: "Machine learning models that understand process patterns. Predict bottlenecks before they happen, detect anomalies, and recommend actions.",
    bullets: [
      "Predictive SLA monitoring",
      "Anomaly detection",
      "Root cause analysis",
      "Automated recommendations",
    ],
    diagram: "ai",
    reverse: true,
  },
];

const diagrams: Record<string, React.ReactNode> = {
  discovery: <DiscoveryDiagram />,
  conformance: <ConformanceDiagram />,
  analytics: <AnalyticsDiagram />,
  ai: <AIDiagram />,
};

export default function ProductPage() {
  return (
    <>
      {/* Hero */}
      <section className="gr" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
        <div className="gi" style={{ textAlign: "center" }}>
          <FadeIn>
            <span className="eyebrow eyebrow-bracket">Platform</span>
            <h1 className="type-display" style={{ marginTop: "var(--sp-3)", maxWidth: 680, margin: "var(--sp-3) auto 0" }}>
              The data platform for<br /><em>operational intelligence</em>
            </h1>
            <p className="type-body" style={{ maxWidth: 560, margin: "0 auto", marginTop: "var(--sp-4)", color: "var(--ink-mid)" }}>
              From raw event logs to automated process improvements. Four modules, one platform.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Feature Sections */}
      {features.map((f, idx) => (
        <section key={f.num} className="gr">
          <div className="h-rule h-rule--bottom" />
          <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
            <FadeIn>
              <div className={`feature-row${f.reverse ? " feature-row--reverse" : ""}`}>
                <div>
                  <span className="eyebrow eyebrow-bracket">{f.num} {f.eyebrow}</span>
                  <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
                    {f.title} <em>{f.titleEm}</em>
                  </h2>
                  <p className="type-body" style={{ marginTop: "var(--sp-4)", color: "var(--ink-mid)" }}>
                    {f.desc}
                  </p>
                  <ul style={{ marginTop: "var(--sp-4)", listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
                    {f.bullets.map((item) => (
                      <li key={item} style={{ fontFamily: "var(--body)", fontSize: "var(--fs-sm)", color: "var(--ink-mid)", paddingLeft: "var(--sp-4)", position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, color: "var(--emerald)" }}>&rarr;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  {diagrams[f.diagram]}
                </div>
              </div>
            </FadeIn>
          </div>
          {idx < features.length - 1 && (
            <div className="ascii-divider">&middot; &middot; &middot; &nbsp; &middot; &middot; &middot; &nbsp; &middot; &middot; &middot;</div>
          )}
        </section>
      ))}

      {/* Cross-links */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: 'var(--sp-6)', paddingBottom: 'var(--sp-6)' }}>
          <FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--sp-4)' }}>
              <Link href="/use-cases" style={{ padding: 'var(--sp-4)', border: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)' }}>Next</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-sm)', color: 'var(--ink)', marginTop: 'var(--sp-1)' }}>See real use cases &rarr;</p>
              </Link>
              <Link href="/pricing" style={{ padding: 'var(--sp-4)', border: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)' }}>Pricing</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-sm)', color: 'var(--ink)', marginTop: 'var(--sp-1)' }}>View plans &rarr;</p>
              </Link>
              <Link href="/versus" style={{ padding: 'var(--sp-4)', border: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)' }}>Compare</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-sm)', color: 'var(--ink)', marginTop: 'var(--sp-1)' }}>How we&apos;re different &rarr;</p>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band">
        <div className="gi" style={{ textAlign: "center", padding: "var(--sp-7) 0" }}>
          <h2 className="type-h2" style={{ color: "var(--white)" }}>
            See the platform <em>in action</em>
          </h2>
          <p style={{ fontFamily: "var(--body)", color: "rgba(255,255,255,0.7)", maxWidth: 480, margin: "0 auto", marginTop: "var(--sp-4)" }}>
            Book a 30-minute demo with our team. We&apos;ll show you how Meridian works with your data.
          </p>
          <div style={{ display: "flex", gap: "var(--sp-3)", justifyContent: "center", marginTop: "var(--sp-5)", flexWrap: "wrap" }}>
            <Link href="/request-demo" className="btn btn-primary" style={{ background: "var(--white)", color: "var(--ink-dark)", borderColor: "var(--white)" }}>
              Request Demo
            </Link>
            <Link href="/contact" className="btn btn-ghost" style={{ color: "var(--white)", borderColor: "rgba(255,255,255,0.3)" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
