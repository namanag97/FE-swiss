import Link from "next/link";
import { ArrowRight, Zap, Shield, BarChart3, Code2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built for speed from the ground up. Sub-second load times across every page.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant with end-to-end encryption. Your data stays yours.",
  },
  {
    icon: BarChart3,
    title: "Powerful Analytics",
    description:
      "Deep insights into your operations with real-time dashboards and reports.",
  },
  {
    icon: Code2,
    title: "Developer First",
    description:
      "REST & GraphQL APIs, webhooks, SDKs in every major language. Build anything.",
  },
];

const logos = [
  "Company One",
  "Company Two",
  "Company Three",
  "Company Four",
  "Company Five",
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white py-24 md:py-32">
        <Container size="wide" className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-accent-600">
            Now in public beta
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-neutral-900 md:text-6xl lg:text-7xl">
            {siteConfig.tagline}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-500">
            {siteConfig.description}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/product"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400"
            >
              See how it works
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Social Proof ── */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-12">
        <Container size="wide">
          <p className="mb-8 text-center text-xs font-medium uppercase tracking-wider text-neutral-400">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {logos.map((name) => (
              <span
                key={name}
                className="text-sm font-semibold text-neutral-300"
              >
                {name}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Features ── */}
      <section className="py-24 md:py-32">
        <Container size="wide">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              Everything you need to scale
            </h2>
            <p className="mt-4 text-lg text-neutral-500">
              A complete platform designed for modern teams.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-neutral-200 bg-white p-6">
                <div className="mb-4 inline-flex rounded-lg bg-neutral-900 p-2.5 text-white">
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

      {/* ── CTA ── */}
      <section className="border-t border-neutral-200 bg-neutral-950 py-24 text-center md:py-32">
        <Container size="wide">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-neutral-400">
            Join hundreds of teams already using {siteConfig.name} to move
            faster.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100"
            >
              Request a demo
              <ArrowRight className="h-4 w-4" />
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
