import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Code2,
  Layers,
  Globe,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built for speed from the ground up. Sub-second responses, zero loading spinners.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II compliant. End-to-end encryption. Your data never leaves your control.",
  },
  {
    icon: BarChart3,
    title: "Deep Analytics",
    description:
      "Real-time dashboards, custom reports, and anomaly detection out of the box.",
  },
  {
    icon: Code2,
    title: "Developer First",
    description:
      "REST & GraphQL APIs, webhooks, SDKs in every major language. Extensible by design.",
  },
  {
    icon: Layers,
    title: "Seamless Integrations",
    description:
      "Connect to 200+ tools your team already uses. Slack, Jira, Salesforce, and more.",
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description:
      "Deployed across 30+ regions. Low latency everywhere your users are.",
  },
];

const metrics = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "<50ms", label: "Avg. Response" },
  { value: "10M+", label: "API Calls / Day" },
  { value: "500+", label: "Companies" },
];

const testimonials = [
  {
    quote:
      "We cut our operational overhead by 60% in the first quarter. The platform practically runs itself.",
    author: "Sarah Chen",
    role: "VP Engineering, Acme Corp",
  },
  {
    quote:
      "The API is the best I've worked with. Clean, fast, predictable. Our team shipped integrations in days, not weeks.",
    author: "Marcus Rivera",
    role: "CTO, Streamline Labs",
  },
  {
    quote:
      "Finally, a tool that doesn't try to do everything. It does exactly what we need, and does it exceptionally well.",
    author: "Emily Nakamura",
    role: "Head of Product, Baseline",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="gradient-hero grid-pattern relative overflow-hidden pb-24 pt-20 md:pb-32 md:pt-28">
        <Container size="wide" className="relative text-center">
          <div className="animate-fade-in">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
              <span className="text-xs font-medium text-accent-700">
                Now in public beta
              </span>
            </div>
          </div>

          <h1 className="animate-slide-up mx-auto max-w-4xl text-5xl font-bold tracking-tight text-neutral-900 md:text-6xl lg:text-7xl"
              style={{ animationDelay: "100ms" }}>
            Build faster.{" "}
            <span className="text-neutral-400">Ship smarter.</span>
            <br />
            <span className="text-neutral-400">Scale</span> without limits.
          </h1>

          <p className="animate-slide-up mx-auto mt-6 max-w-xl text-lg leading-relaxed text-neutral-500"
             style={{ animationDelay: "200ms" }}>
            {siteConfig.description}
          </p>

          <div className="animate-slide-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
               style={{ animationDelay: "300ms" }}>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-900/20"
            >
              Start building free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/product"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-7 py-3.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-900"
            >
              See how it works
            </Link>
          </div>

          {/* Product preview placeholder */}
          <div className="animate-scale-in mx-auto mt-20 max-w-4xl overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-200/60"
               style={{ animationDelay: "450ms" }}>
            <div className="flex items-center gap-2 border-b border-neutral-100 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-neutral-200" />
              <div className="h-3 w-3 rounded-full bg-neutral-200" />
              <div className="h-3 w-3 rounded-full bg-neutral-200" />
              <div className="ml-4 h-5 w-48 rounded bg-neutral-100" />
            </div>
            <div className="grid grid-cols-12 gap-0">
              <div className="col-span-3 border-r border-neutral-100 p-4">
                <div className="space-y-3">
                  <div className="h-4 w-full rounded bg-neutral-100" />
                  <div className="h-4 w-3/4 rounded bg-neutral-900/10" />
                  <div className="h-4 w-5/6 rounded bg-neutral-100" />
                  <div className="h-4 w-2/3 rounded bg-neutral-100" />
                  <div className="mt-6 h-4 w-full rounded bg-neutral-100" />
                  <div className="h-4 w-4/5 rounded bg-neutral-100" />
                </div>
              </div>
              <div className="col-span-9 p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg border border-neutral-100 p-4">
                    <div className="h-3 w-1/2 rounded bg-neutral-200" />
                    <div className="mt-3 h-8 w-2/3 rounded bg-neutral-900/10" />
                    <div className="mt-2 h-2 w-full rounded bg-accent-100" />
                  </div>
                  <div className="rounded-lg border border-neutral-100 p-4">
                    <div className="h-3 w-1/2 rounded bg-neutral-200" />
                    <div className="mt-3 h-8 w-2/3 rounded bg-neutral-900/10" />
                    <div className="mt-2 h-2 w-4/5 rounded bg-accent-100" />
                  </div>
                  <div className="rounded-lg border border-neutral-100 p-4">
                    <div className="h-3 w-1/2 rounded bg-neutral-200" />
                    <div className="mt-3 h-8 w-2/3 rounded bg-neutral-900/10" />
                    <div className="mt-2 h-2 w-3/5 rounded bg-accent-100" />
                  </div>
                </div>
                <div className="mt-6 h-40 rounded-lg border border-neutral-100 bg-neutral-50/50 p-4">
                  <div className="flex h-full items-end gap-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t bg-neutral-900/10" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Social Proof / Metrics ── */}
      <section className="border-y border-neutral-200 bg-white py-16">
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
      <section className="py-24 md:py-32">
        <Container size="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-600">
              Features
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              Everything you need to scale
            </h2>
            <p className="mt-4 text-lg text-neutral-500">
              One platform, zero compromises. Built for teams that move fast.
            </p>
          </div>

          <div className="stagger mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-300 hover:shadow-md hover:shadow-neutral-100"
              >
                <div className="mb-4 inline-flex rounded-lg bg-neutral-900 p-2.5 text-white transition-colors group-hover:bg-accent-600">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-neutral-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── How It Works ── */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-24 md:py-32">
        <Container size="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-600">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              Up and running in minutes
            </h2>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Connect your data",
                description:
                  "Plug in your existing tools and data sources. We support 200+ integrations out of the box.",
              },
              {
                step: "02",
                title: "Configure your workflow",
                description:
                  "Set up automations, dashboards, and alerts with our visual builder. No code required.",
              },
              {
                step: "03",
                title: "Ship with confidence",
                description:
                  "Monitor, iterate, and scale. Real-time analytics give you full visibility into everything.",
              },
            ].map((s) => (
              <div key={s.step} className="relative">
                <span className="font-mono text-5xl font-bold text-neutral-200">
                  {s.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 md:py-32">
        <Container size="wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-600">
              Testimonials
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              Loved by engineering teams
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="flex flex-col rounded-xl border border-neutral-200 bg-white p-8"
              >
                <blockquote className="flex-1 text-sm leading-relaxed text-neutral-600">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-neutral-200" />
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      {t.author}
                    </p>
                    <p className="text-xs text-neutral-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="gradient-dark border-t border-neutral-800 py-24 text-center md:py-32">
        <Container size="wide">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-neutral-400">
            Join 500+ teams already shipping faster with {siteConfig.name}.
            Free to start, scales with you.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-100 hover:shadow-lg"
            >
              Start building free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 px-7 py-3.5 text-sm font-medium text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
            >
              View pricing
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
