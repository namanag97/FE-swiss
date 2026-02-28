import Link from "next/link";
import { ArrowRight, GitBranch, Search, BarChart3, Workflow, Database, BrainCircuit } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProcessMapHero } from "@/components/home/ProcessMapHero";
import { siteConfig } from "@/lib/config";

const capabilities = [
  { icon: GitBranch, title: "Process Discovery", desc: "Reconstruct real process flows from event logs. Every path, variant, and exception — automatically." },
  { icon: Search, title: "Conformance Checking", desc: "Compare actual behavior against intended models. Find deviations, skipped steps, and compliance gaps." },
  { icon: BarChart3, title: "Visual Analytics", desc: "Dashboards built for processes, not just metrics. Filter by variant, trace individual cases end to end." },
  { icon: Workflow, title: "Variant Analysis", desc: "Understand why the same process runs differently. Cluster variants, compare durations, find the happy path." },
  { icon: Database, title: "Beyond SQL", desc: "Process-aware queries that understand sequences, durations, and causality. Questions SQL can't answer." },
  { icon: BrainCircuit, title: "AI Insights", desc: "Predict delays, detect anomalies, surface optimization opportunities from your operational data." },
];

const useCases = [
  { title: "Order-to-Cash", desc: "Find where invoices stall and cash gets trapped in your fulfillment process." },
  { title: "Procure-to-Pay", desc: "Catch maverick buying, duplicate payments, and approval bottlenecks." },
  { title: "IT Service Management", desc: "Trace tickets from creation to resolution. Identify escalation patterns." },
  { title: "Patient Journey", desc: "Follow patients through care pathways. Reduce wait times, verify protocols." },
];

const numbers = [
  { value: "10M+", label: "Events processed daily" },
  { value: "<2s", label: "Query response" },
  { value: "40%", label: "Avg bottleneck reduction" },
  { value: "23", label: "Industries served" },
];

export default function HomePage() {
  return (
    <>
      {/* ── Dark Hero ── */}
      <section className="bg-forest-900 py-20 md:py-28">
        <Container size="wide">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="animate-slide-up text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
              {siteConfig.tagline}
            </h1>
            <p className="animate-slide-up mx-auto mt-5 max-w-lg text-[17px] leading-relaxed text-forest-200/70" style={{ animationDelay: "80ms" }}>
              {siteConfig.description}
            </p>
            <div className="animate-slide-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: "160ms" }}>
              <Link href="/contact" data-track="cta-hero-start" className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-[14px] font-medium text-forest-900 transition-colors hover:bg-gray-100">
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/contact" data-track="cta-hero-demo" className="inline-flex items-center gap-2 rounded-lg border border-forest-600 px-6 py-3 text-[14px] font-medium text-forest-100 transition-colors hover:border-forest-400 hover:text-white">
                Request Demo
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Product Visual ── */}
      <section className="border-b border-gray-200 bg-gray-50 py-14">
        <Container size="wide">
          <ProcessMapHero />
        </Container>
      </section>

      {/* ── Logos ── */}
      <section className="border-b border-gray-200 bg-white py-8">
        <Container size="wide">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            <span className="text-[11px] font-medium uppercase tracking-widest text-gray-400">Trusted by operations teams at</span>
            {["Siemens", "Bosch", "Maersk", "ABB", "Roche"].map((n) => (
              <span key={n} className="text-[14px] font-semibold text-gray-300">{n}</span>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Numbers ── */}
      <section className="border-b border-gray-200 bg-white py-14">
        <Container size="wide">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {numbers.map((n) => (
              <div key={n.label} className="text-center">
                <p className="text-3xl font-bold tracking-tight text-forest-900 md:text-4xl">{n.value}</p>
                <p className="mt-1 text-[13px] text-gray-500">{n.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Capabilities ── */}
      <section className="py-20 md:py-24">
        <Container size="wide">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600">Platform</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              Process intelligence meets modern analytics
            </h2>
            <p className="mt-3 text-[15px] text-gray-500">From raw event data to operational clarity.</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.title} className="rounded-xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                <div className="mb-3 inline-flex rounded-lg bg-forest-900 p-2 text-white">
                  <c.icon className="h-4 w-4" />
                </div>
                <h3 className="text-[14px] font-semibold text-gray-900">{c.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-gray-500">{c.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Use Cases ── */}
      <section className="bg-gray-50 py-20 md:py-24">
        <Container size="wide">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600">Use cases</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              Built for the processes that matter most
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {useCases.map((uc) => (
              <Link key={uc.title} href="/use-cases" className="group rounded-xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                <h3 className="text-[15px] font-semibold text-gray-900 group-hover:text-forest-900">{uc.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-gray-500">{uc.desc}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Testimonial (dark) ── */}
      <section className="bg-forest-900 py-20 md:py-24">
        <Container size="wide">
          <div className="mx-auto max-w-2xl text-center">
            <blockquote className="text-xl font-medium leading-relaxed text-white md:text-2xl">
              &ldquo;We spent months trying to understand our order-to-cash process with SQL and spreadsheets.
              {siteConfig.name} showed us the full picture in an afternoon.&rdquo;
            </blockquote>
            <div className="mt-6">
              <p className="text-[13px] font-semibold text-forest-100">Anna Berglund</p>
              <p className="text-[12px] text-forest-200/60">Director of Operations, Nordic Manufacturing Co.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-24">
        <Container size="wide" className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            See what your processes are really doing
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-gray-500">
            Book a 20-minute demo. We&apos;ll map one of your processes live.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" data-track="cta-bottom-start" className="group inline-flex items-center gap-2 rounded-lg bg-forest-900 px-6 py-3 text-[14px] font-medium text-white hover:bg-forest-800">
              Get Started <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/contact" data-track="cta-bottom-demo" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-6 py-3 text-[14px] font-medium text-gray-700 hover:border-gray-300">
              Request Demo
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
