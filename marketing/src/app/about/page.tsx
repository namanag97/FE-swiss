import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name} — our mission, values, and the team behind the platform.`,
};

const values = [
  { title: "Simplicity", desc: "The best tools stay out of your way. Every feature earns its place or gets cut." },
  { title: "Transparency", desc: "Open pricing, public roadmap, honest communication. No surprises, ever." },
  { title: "Speed", desc: "Ship fast, iterate faster. We optimize for time-to-value above all else." },
  { title: "Craft", desc: "Sweat the details. Great software is built by people who care deeply about quality." },
];

const milestones = [
  { year: "2024", event: "Founded. First commit." },
  { year: "2024", event: "Closed seed round. First 10 customers." },
  { year: "2025", event: "Launched v1. 100 teams onboarded in first month." },
  { year: "2025", event: "SOC 2 Type II certified." },
  { year: "2026", event: "Public beta. 500+ teams. 10M+ API calls/day." },
];

const team = [
  { name: "Founder Name", role: "CEO & Co-founder", bio: "Previously engineering at Stripe. CS from Stanford." },
  { name: "Founder Name", role: "CTO & Co-founder", bio: "Ex-Google infrastructure. Built systems serving 1B+ requests/day." },
  { name: "Team Member", role: "Head of Design", bio: "Former design lead at Figma. Obsessed with clarity." },
  { name: "Team Member", role: "Head of Engineering", bio: "10 years building distributed systems. Ex-AWS." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero grid-pattern py-24 md:py-28">
        <Container size="wide" className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-600">
            About
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
            Building the tools that modern teams deserve
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-500 md:text-lg">
            We started {siteConfig.name} because we were tired of duct-taping together
            tools that weren&apos;t built for how engineering teams actually work. So we built
            the platform we always wanted.
          </p>
        </Container>
      </section>

      {/* Values */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-24">
        <Container size="wide">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-600">
            Values
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900">
            What we believe
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title}>
                <h3 className="text-sm font-semibold text-neutral-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <Container size="wide">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-600">
            Journey
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900">
            Our story so far
          </h2>
          <div className="mt-10 space-y-6">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-6">
                <span className="w-12 shrink-0 font-mono text-sm font-bold text-neutral-400">
                  {m.year}
                </span>
                <div className="relative border-l border-neutral-200 pl-6">
                  <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-neutral-300 bg-white" />
                  <p className="text-sm text-neutral-700">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-24">
        <Container size="wide">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-600">
            Team
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900">
            The people behind the product
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((p) => (
              <div key={p.name + p.role} className="rounded-xl border border-neutral-200 bg-white p-6">
                <div className="mb-4 h-11 w-11 rounded-full bg-neutral-200" />
                <p className="text-sm font-semibold text-neutral-900">{p.name}</p>
                <p className="mt-0.5 text-xs font-medium text-accent-600">{p.role}</p>
                <p className="mt-2 text-xs leading-relaxed text-neutral-500">{p.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
