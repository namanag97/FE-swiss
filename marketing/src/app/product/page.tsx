import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Platform",
  description: "Process mining, visual analytics, and AI insights — the complete data platform for operations teams.",
  alternates: { canonical: "/product" },
  openGraph: { images: ["/og.png"] },
};

const sections = [
  {
    label: "Process Discovery",
    title: "Automatically map how work really happens",
    desc: "Our algorithms reconstruct full process models from raw event logs. No manual mapping, no assumptions.",
    points: ["Event log ingestion from any source", "Automated process model generation", "Variant detection and clustering", "Interactive process map visualization"],
  },
  {
    label: "Conformance Checking",
    title: "Compare reality against your ideal process",
    desc: "Overlay your intended process model onto the discovered one. Instantly see deviations, skipped steps, and compliance violations.",
    points: ["Model-to-reality comparison", "Deviation highlighting and scoring", "Compliance gap detection", "Root cause analysis for non-conformance"],
  },
  {
    label: "Visual Analytics",
    title: "Dashboards that understand processes",
    desc: "Go beyond bar charts. Our analytics engine understands sequences, durations, and causality.",
    points: ["Process-aware filtering and drill-down", "SLA tracking and bottleneck heatmaps", "Cohort comparison across time periods", "Exportable reports for stakeholders"],
  },
  {
    label: "AI Insights",
    title: "Intelligence that learns from your operations",
    desc: "Predictive models that forecast delays before they happen. Anomaly detection that flags unusual process behavior.",
    points: ["Delay prediction and early warning", "Anomaly detection on process flows", "Automated optimization suggestions", "Natural language querying of process data"],
  },
];

export default function ProductPage() {
  return (
    <>
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-7) var(--sp-5) var(--sp-6)' }}>
          <span className="eyebrow eyebrow-bracket">Platform</span>
          <h1 className="type-display" style={{ marginTop: 'var(--sp-4)', maxWidth: 680 }}>
            The data platform for operations <em>intelligence</em>
          </h1>
          <p className="type-body" style={{ marginTop: 'var(--sp-4)' }}>
            From event logs to actionable insights. {siteConfig.name} combines process mining with modern analytics.
          </p>
          <div style={{ marginTop: 'var(--sp-5)' }}>
            <Link href="/contact" className="btn btn-primary">
              Request a demo <ArrowRight style={{ width: 12, height: 12 }} />
            </Link>
          </div>
        </div>
      </section>

      {sections.map((s) => (
        <section key={s.label} className="gr">
          <div className="h-rule h-rule--bottom" />
          <div className="gi" style={{ padding: 'var(--sp-7) var(--sp-5)' }}>
            <div className="grid items-start gap-0 md:grid-cols-2" style={{ border: '1px solid var(--border)' }}>
              <div style={{ padding: 'var(--sp-6) var(--sp-5)', borderRight: '1px solid var(--border)' }}>
                <span className="eyebrow eyebrow-bracket">{s.label}</span>
                <h2 className="type-h3" style={{ marginTop: 'var(--sp-3)' }}>{s.title}</h2>
                <p className="type-body-sm" style={{ marginTop: 'var(--sp-3)' }}>{s.desc}</p>
              </div>
              <div style={{ padding: 'var(--sp-6) var(--sp-5)' }}>
                <ul className="flex flex-col" style={{ gap: 'var(--sp-2)' }}>
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start" style={{ gap: 'var(--sp-3)', fontFamily: 'var(--body)', fontSize: 'var(--fs-sm)', fontWeight: 260, lineHeight: 1.6, color: 'var(--ink-muted)' }}>
                      <span className="mt-[6px] shrink-0 rounded-full" style={{ width: 6, height: 6, background: 'var(--emerald)' }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="cta-band">
        <h2>See it on your <em>data</em></h2>
        <p>Bring your event logs. We&apos;ll map a real process live in 20 minutes.</p>
        <Link href="/contact" className="btn btn-primary">Book a demo <ArrowRight style={{ width: 12, height: 12 }} /></Link>
      </section>
    </>
  );
}
