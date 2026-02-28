import Link from "next/link";
import { ArrowRight, GitBranch, Search, BarChart3, Workflow, Database, BrainCircuit } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

const capabilities = [
  {
    icon: GitBranch,
    title: "Process Discovery",
    desc: "Automatically reconstruct real process flows from your event logs. See how work actually moves — not how you think it does.",
  },
  {
    icon: Search,
    title: "Conformance Checking",
    desc: "Compare actual behavior against your intended process models. Find deviations, bottlenecks, and compliance gaps instantly.",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    desc: "Interactive dashboards that go beyond charts. Drill into variants, filter by cohort, trace individual cases end to end.",
  },
  {
    icon: Workflow,
    title: "Variant Analysis",
    desc: "Understand why the same process runs differently every time. Cluster variants, compare performance, identify the happy path.",
  },
  {
    icon: Database,
    title: "Beyond SQL",
    desc: "Process-aware queries that understand sequences, durations, and causality. Ask questions SQL was never designed to answer.",
  },
  {
    icon: BrainCircuit,
    title: "AI Insights",
    desc: "Surface anomalies, predict delays, recommend optimizations. Intelligence that learns from your operational data.",
  },
];

const numbers = [
  { value: "10M+", label: "Events processed daily" },
  { value: "<2s", label: "Query response time" },
  { value: "40%", label: "Avg. bottleneck reduction" },
  { value: "500+", label: "Enterprise processes mapped" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-sand-200 bg-sand-50 pb-20 pt-20 md:pb-28 md:pt-24">
        <Container size="wide">
          <div className="max-w-2xl">
            <h1 className="animate-slide-up text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-sand-900">
              {siteConfig.tagline}
            </h1>
            <p className="animate-slide-up mt-6 max-w-lg text-[17px] leading-relaxed text-sand-500"
               style={{ animationDelay: "100ms" }}>
              {siteConfig.description}
            </p>
            <div className="animate-slide-up mt-8 flex flex-wrap gap-3"
                 style={{ animationDelay: "200ms" }}>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-lg bg-sand-900 px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-sand-800"
              >
                Request a demo
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/product"
                className="inline-flex items-center gap-2 rounded-lg border border-sand-300 bg-white px-5 py-2.5 text-[13px] font-medium text-sand-700 transition-colors hover:border-sand-400 hover:text-sand-900"
              >
                Explore the platform
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Numbers */}
      <section className="border-b border-sand-200 bg-white py-12">
        <Container size="wide">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {numbers.map((n) => (
              <div key={n.label}>
                <p className="text-2xl font-semibold tracking-tight text-sand-900 md:text-3xl">
                  {n.value}
                </p>
                <p className="mt-0.5 text-[13px] text-sand-500">{n.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="py-20 md:py-24">
        <Container size="wide">
          <div className="max-w-lg">
            <p className="text-[11px] font-medium uppercase tracking-widest text-terra-600">
              Platform
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-sand-900 md:text-3xl">
              Process intelligence meets modern analytics
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-sand-500">
              Go from raw event data to operational clarity. No SQL required.
            </p>
          </div>

          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.title}>
                <div className="mb-3 inline-flex rounded-lg border border-sand-200 bg-sand-50 p-2">
                  <c.icon className="h-4 w-4 text-sand-600" />
                </div>
                <h3 className="text-[14px] font-semibold text-sand-900">{c.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-sand-500">{c.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="border-y border-sand-200 bg-sand-50 py-20 md:py-24">
        <Container size="wide">
          <div className="max-w-lg">
            <p className="text-[11px] font-medium uppercase tracking-widest text-terra-600">
              How it works
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-sand-900 md:text-3xl">
              From event logs to insights in minutes
            </h2>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              { n: "01", title: "Connect your data", desc: "Upload event logs from any source — databases, CSVs, APIs, warehouse connectors. We handle the rest." },
              { n: "02", title: "Discover processes", desc: "Our algorithms reconstruct the actual process flows, surface variants, and identify where things break down." },
              { n: "03", title: "Act on insights", desc: "Interactive dashboards, conformance reports, and AI recommendations. Share findings with your team." },
            ].map((s) => (
              <div key={s.n}>
                <span className="font-mono text-3xl font-semibold text-sand-300">{s.n}</span>
                <h3 className="mt-3 text-[14px] font-semibold text-sand-900">{s.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-sand-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonial */}
      <section className="py-20 md:py-24">
        <Container size="wide">
          <div className="mx-auto max-w-2xl text-center">
            <blockquote className="text-xl font-medium leading-relaxed tracking-tight text-sand-800 md:text-2xl">
              &ldquo;We spent months trying to understand our order-to-cash process with SQL queries and spreadsheets.
              Meridian showed us the full picture in an afternoon.&rdquo;
            </blockquote>
            <div className="mt-6">
              <p className="text-[13px] font-semibold text-sand-900">Anna Berglund</p>
              <p className="text-[12px] text-sand-500">Director of Operations, Nordic Manufacturing Co.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-sand-200 bg-sand-900 py-20 md:py-24">
        <Container size="wide" className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            See what your processes are really doing
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-sand-400">
            Book a 20-minute demo. We&apos;ll map one of your processes live.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-[13px] font-medium text-sand-900 transition-colors hover:bg-sand-100"
            >
              Request a demo
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg border border-sand-700 px-5 py-2.5 text-[13px] font-medium text-sand-400 transition-colors hover:border-sand-500 hover:text-white"
            >
              View pricing
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
