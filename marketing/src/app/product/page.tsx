import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Platform",
  description: "Process mining, visual analytics, and AI insights — the complete data platform for operations teams.",
};

const sections = [
  {
    label: "Process Discovery",
    title: "Automatically map how work really happens",
    desc: "Our algorithms reconstruct full process models from raw event logs. No manual mapping, no assumptions. You see the actual flow — every path, every variant, every exception.",
    points: ["Event log ingestion from any source", "Automated process model generation", "Variant detection and clustering", "Interactive process map visualization"],
  },
  {
    label: "Conformance Checking",
    title: "Compare reality against your ideal process",
    desc: "Overlay your intended process model onto the discovered one. Instantly see deviations, skipped steps, loops, and compliance violations. Quantify how far reality drifts from the plan.",
    points: ["Model-to-reality comparison", "Deviation highlighting and scoring", "Compliance gap detection", "Root cause analysis for non-conformance"],
  },
  {
    label: "Visual Analytics",
    title: "Dashboards that understand processes",
    desc: "Go beyond bar charts. Our analytics engine understands sequences, durations, and causality. Filter by variant, drill into individual cases, overlay KPIs on the process map itself.",
    points: ["Process-aware filtering and drill-down", "SLA tracking and bottleneck heatmaps", "Cohort comparison across time periods", "Exportable reports for stakeholders"],
  },
  {
    label: "AI Insights",
    title: "Intelligence that learns from your operations",
    desc: "Predictive models that forecast delays before they happen. Anomaly detection that flags unusual process behavior. Optimization recommendations grounded in your actual data.",
    points: ["Delay prediction and early warning", "Anomaly detection on process flows", "Automated optimization suggestions", "Natural language querying of process data"],
  },
];

export default function ProductPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-forest-800 bg-forest-900 py-20 md:py-24">
        <Container size="wide">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-widest text-emerald-400">Platform</p>
            <h1 className="mt-2 text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.15] tracking-tight text-white">
              The data platform for operations intelligence
            </h1>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-forest-200/80">
              From event logs to actionable insights. {siteConfig.name} combines process mining algorithms with modern analytics to show you how your business actually runs.
            </p>
            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-[13px] font-medium text-forest-900 hover:bg-forest-50"
            >
              Request a demo
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Sections */}
      {sections.map((s, i) => (
        <section key={s.label} className={`py-20 md:py-24 ${i % 2 === 1 ? "bg-gray-50 border-y border-gray-200" : ""}`}>
          <Container size="wide">
            <div className="grid items-start gap-12 md:grid-cols-2">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-widest text-emerald-600">{s.label}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">{s.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-gray-500">{s.desc}</p>
              </div>
              <ul className="space-y-3">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[14px] text-gray-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ))}

      {/* CTA */}
      <section className="border-t border-forest-800 bg-forest-900 py-20 text-center">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">See it on your data</h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-forest-200/60">
            Bring your event logs. We&apos;ll map a real process live in 20 minutes.
          </p>
          <Link
            href="/contact"
            className="group mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-[13px] font-medium text-forest-900 hover:bg-forest-50"
          >
            Book a demo
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Container>
      </section>
    </>
  );
}
