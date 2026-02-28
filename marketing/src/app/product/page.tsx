import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers, Globe, Cpu, Lock, Workflow, LineChart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Product",
  description: `Discover what ${siteConfig.name} can do for your team.`,
};

const capabilities = [
  {
    icon: Layers,
    title: "Unified Platform",
    description:
      "Everything your team needs in one place. No more switching between tools.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description:
      "Deploy to 30+ regions worldwide. Low latency everywhere your users are.",
  },
  {
    icon: Cpu,
    title: "AI-Powered",
    description:
      "Built-in intelligence that learns from your workflow and surfaces insights.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II, GDPR, and HIPAA compliant. Your data never leaves your control.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Automate repetitive tasks with no-code flows. Connect to 200+ integrations.",
  },
  {
    icon: LineChart,
    title: "Real-time Analytics",
    description:
      "Live dashboards, custom reports, and anomaly detection. Know what matters.",
  },
];

export default function ProductPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32">
        <Container size="wide" className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
            The platform built for
            <br />
            what comes next
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-500">
            {siteConfig.name} combines powerful tools with a simple interface so
            your team can focus on building, not managing infrastructure.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Request a demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Product screenshot placeholder */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-16">
        <Container size="wide">
          <div className="flex aspect-video items-center justify-center rounded-xl border border-neutral-200 bg-white">
            <p className="text-sm text-neutral-400">
              Product screenshot / demo video goes here
            </p>
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="py-24 md:py-32">
        <Container size="wide">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            Capabilities
          </h2>
          <p className="mt-4 max-w-xl text-lg text-neutral-500">
            Everything you need to move from idea to production.
          </p>

          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.title} className="flex gap-4">
                <div className="shrink-0">
                  <div className="inline-flex rounded-lg bg-neutral-100 p-2.5">
                    <c.icon className="h-5 w-5 text-neutral-700" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-neutral-900">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                    {c.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-200 bg-neutral-950 py-24 text-center">
        <Container>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            See it in action
          </h2>
          <p className="mx-auto mt-4 max-w-md text-neutral-400">
            Book a 15-minute demo and see how {siteConfig.name} fits your
            workflow.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
          >
            Book a demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Container>
      </section>
    </>
  );
}
