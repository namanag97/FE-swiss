import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers, Globe, Cpu, Lock, Workflow, LineChart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Product",
  description: `Discover what ${siteConfig.name} can do for your team — unified API, real-time analytics, and workflow automation.`,
};

const capabilities = [
  { icon: Layers, title: "Unified Platform", desc: "Everything your team needs in one place. No more switching between disconnected tools." },
  { icon: Globe, title: "Global Scale", desc: "Deploy to 30+ regions. Edge caching, automatic failover, low latency everywhere." },
  { icon: Cpu, title: "AI-Powered Insights", desc: "Built-in intelligence that learns from your data and surfaces anomalies before they become problems." },
  { icon: Lock, title: "Enterprise Security", desc: "SOC 2 Type II, GDPR, HIPAA. Role-based access, audit logs, SSO — your data never leaves your control." },
  { icon: Workflow, title: "Workflow Automation", desc: "No-code builder for repetitive tasks. Triggers, conditions, and 200+ pre-built connectors." },
  { icon: LineChart, title: "Real-time Analytics", desc: "Live dashboards, custom SQL queries, scheduled reports, Slack/email alerts on any metric." },
];

const specs = [
  { label: "API Latency", value: "<50ms p99" },
  { label: "Uptime SLA", value: "99.99%" },
  { label: "Regions", value: "30+" },
  { label: "Integrations", value: "200+" },
  { label: "Compliance", value: "SOC 2, GDPR, HIPAA" },
  { label: "Support", value: "24/7 for Enterprise" },
];

export default function ProductPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero grid-pattern py-24 md:py-28">
        <Container size="wide" className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-600">
            Product
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
            The platform built for{" "}
            <span className="text-neutral-400">what comes next</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-500 md:text-lg">
            {siteConfig.name} combines powerful tools with a simple interface so your team can focus on building — not managing infrastructure.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-neutral-800 hover:shadow-md"
            >
              Request a demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Product screenshot */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-14">
        <Container size="wide">
          <div className="flex aspect-video items-center justify-center rounded-xl border border-neutral-200 bg-white shadow-sm">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-neutral-100" />
              <p className="mt-3 text-sm text-neutral-400">Product screenshot or demo video</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="py-24 md:py-28">
        <Container size="wide">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-600">
            Capabilities
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            Everything you need
          </h2>
          <p className="mt-3 max-w-lg text-base text-neutral-500">
            From idea to production — a complete toolkit for modern engineering teams.
          </p>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.title} className="flex gap-4">
                <div className="shrink-0">
                  <div className="inline-flex rounded-lg bg-neutral-100 p-2.5">
                    <c.icon className="h-5 w-5 text-neutral-700" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">{c.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-500">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Specs */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-14">
        <Container size="wide">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {specs.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-lg font-bold text-neutral-900">{s.value}</p>
                <p className="mt-0.5 text-xs text-neutral-500">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="gradient-dark border-t border-neutral-800 py-24 text-center">
        <Container>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">See it in action</h2>
          <p className="mx-auto mt-4 max-w-md text-neutral-400">
            Book a 15-minute demo and see how {siteConfig.name} fits your workflow.
          </p>
          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
          >
            Book a demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Container>
      </section>
    </>
  );
}
