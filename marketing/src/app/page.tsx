import Link from "next/link";
import { ArrowRight, Zap, Shield, BarChart3, Code2, Layers, Globe } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Sub-50ms API responses. Every dashboard loads in under a second. No spinners, ever.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "SOC 2 Type II, GDPR, HIPAA compliant. End-to-end encryption at rest and in transit.",
  },
  {
    icon: BarChart3,
    title: "Deep Analytics",
    desc: "Real-time dashboards, custom reports, anomaly detection. Know what matters instantly.",
  },
  {
    icon: Code2,
    title: "Developer First",
    desc: "REST & GraphQL APIs, webhooks, SDKs in every major language. Build on top of everything.",
  },
  {
    icon: Layers,
    title: "200+ Integrations",
    desc: "Connect your existing stack — Slack, Jira, Salesforce, GitHub, and more — in minutes.",
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    desc: "30+ regions worldwide. Edge caching. Low latency for every user, everywhere.",
  },
];

const metrics = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "<50ms", label: "Avg Response" },
  { value: "10M+", label: "API Calls / Day" },
  { value: "500+", label: "Teams" },
];

const steps = [
  {
    n: "01",
    title: "Connect your data",
    desc: "Plug in existing tools and data sources with pre-built connectors. Up and running in minutes.",
  },
  {
    n: "02",
    title: "Configure workflows",
    desc: "Build automations, dashboards, and alerts with a visual builder. No code required.",
  },
  {
    n: "03",
    title: "Ship with confidence",
    desc: "Monitor, iterate, scale. Real-time analytics give you full visibility into everything.",
  },
];

const quotes = [
  {
    text: "We cut operational overhead by 60% in the first quarter. The platform practically runs itself.",
    name: "Sarah Chen",
    title: "VP Engineering, Acme Corp",
  },
  {
    text: "The API is the best I've worked with — clean, fast, predictable. We shipped integrations in days.",
    name: "Marcus Rivera",
    title: "CTO, Streamline Labs",
  },
  {
    text: "Finally a tool that does exactly what we need, nothing more, and does it exceptionally well.",
    name: "Emily Nakamura",
    title: "Head of Product, Baseline",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="gradient-hero grid-pattern relative overflow-hidden pb-20 pt-16 md:pb-28 md:pt-24">
        <Container size="wide" className="relative text-center">
          <div className="animate-fade-in mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50/80 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            <span className="text-xs font-medium text-accent-700">Now in public beta</span>
          </div>

          <h1 className="animate-slide-up mx-auto max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl"
              style={{ animationDelay: "80ms" }}>
            Build faster.{" "}
            <span className="text-neutral-400">Ship smarter.</span>
            <br />
            <span className="text-neutral-400">Scale</span> without limits.
          </h1>

          <p className="animate-slide-up mx-auto mt-6 max-w-lg text-base leading-relaxed text-neutral-500 md:text-lg"
             style={{ animationDelay: "160ms" }}>
            {siteConfig.description}
          </p>

          <div className="animate-slide-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
               style={{ animationDelay: "240ms" }}>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-neutral-800 hover:shadow-md"
            >
              Start building free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/product"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-600 transition-colors hover:border-neutral-300 hover:text-neutral-900"
            >
              See how it works
            </Link>
          </div>

          {/* ── Product mockup ── */}
          <div className="animate-scale-in mx-auto mt-16 max-w-4xl overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-2xl shadow-neutral-200/50"
               style={{ animationDelay: "400ms" }}>
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-neutral-100 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
              <div className="ml-3 h-5 w-52 rounded-md bg-neutral-100" />
            </div>
            {/* App skeleton */}
            <div className="grid grid-cols-12">
              {/* Sidebar */}
              <div className="col-span-2 border-r border-neutral-100 bg-neutral-50/50 p-3">
                <div className="space-y-2">
                  {[60, 75, 50, 70, 45, 80, 55].map((w, i) => (
                    <div key={i} className={`h-3 rounded bg-neutral-${i === 1 ? "300" : "200/60"}`} style={{ width: `${w}%` }} />
                  ))}
                </div>
              </div>
              {/* Main content */}
              <div className="col-span-10 p-5">
                {/* KPI row */}
                <div className="grid grid-cols-4 gap-3">
                  {["bg-accent-100/60", "bg-neutral-100", "bg-neutral-100", "bg-neutral-100"].map((bg, i) => (
                    <div key={i} className={`rounded-lg border border-neutral-100 ${bg} p-3`}>
                      <div className="h-2 w-12 rounded bg-neutral-300/60" />
                      <div className="mt-2 h-5 w-16 rounded bg-neutral-900/10" />
                    </div>
                  ))}
                </div>
                {/* Chart area */}
                <div className="mt-4 rounded-lg border border-neutral-100 bg-neutral-50/30 p-4">
                  <div className="flex h-28 items-end gap-1.5">
                    {[35, 52, 41, 68, 55, 78, 62, 85, 72, 90, 65, 95, 58, 82, 70].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-neutral-900/8 transition-colors hover:bg-accent-500/20"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Metrics ── */}
      <section className="border-y border-neutral-200 bg-white py-14">
        <Container size="wide">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
                  {m.value}
                </p>
                <p className="mt-1 text-sm text-neutral-500">{m.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Features ── */}
      <section className="py-24 md:py-28">
        <Container size="wide">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-600">
              Platform
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              Everything you need to scale
            </h2>
            <p className="mt-3 text-base text-neutral-500">
              One platform. Zero compromises. Built for teams that move fast.
            </p>
          </div>

          <div className="stagger mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-300 hover:shadow-sm"
              >
                <div className="mb-3 inline-flex rounded-lg bg-neutral-900 p-2 text-white transition-colors group-hover:bg-accent-600">
                  <f.icon className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-neutral-900">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── How It Works ── */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-24 md:py-28">
        <Container size="wide">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-600">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              Up and running in minutes
            </h2>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n}>
                <span className="font-mono text-4xl font-bold text-neutral-200">{s.n}</span>
                <h3 className="mt-3 text-base font-semibold text-neutral-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 md:py-28">
        <Container size="wide">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-600">
              Testimonials
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              Loved by engineering teams
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {quotes.map((q) => (
              <div key={q.name} className="flex flex-col rounded-xl border border-neutral-200 bg-white p-7">
                <p className="flex-1 text-sm leading-relaxed text-neutral-600">
                  &ldquo;{q.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-neutral-200" />
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{q.name}</p>
                    <p className="text-xs text-neutral-400">{q.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="gradient-dark border-t border-neutral-800 py-24 text-center md:py-28">
        <Container size="wide">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-neutral-400">
            Join 500+ teams shipping faster with {siteConfig.name}. Free to start, scales with you.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-100"
            >
              Start building free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
            >
              View pricing
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
