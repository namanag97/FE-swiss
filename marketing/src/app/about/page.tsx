import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name} — our mission, team, and story.`,
};

const values = [
  {
    title: "Simplicity",
    description:
      "We believe the best tools stay out of your way. Every feature earns its place.",
  },
  {
    title: "Transparency",
    description:
      "Open pricing, public roadmap, honest communication. No surprises.",
  },
  {
    title: "Speed",
    description:
      "Ship fast, iterate faster. We optimize for time-to-value above all else.",
  },
  {
    title: "Craft",
    description:
      "Sweat the details. Great software is built by people who care deeply.",
  },
];

const team = [
  { name: "Founder Name", role: "CEO & Co-founder" },
  { name: "Founder Name", role: "CTO & Co-founder" },
  { name: "Team Member", role: "Head of Design" },
  { name: "Team Member", role: "Head of Engineering" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32">
        <Container size="wide" className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
            About {siteConfig.name}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-500">
            We&apos;re building the tools that modern teams deserve. Founded in 2024,
            we&apos;re on a mission to make [your domain] effortless.
          </p>
        </Container>
      </section>

      {/* Values */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-24">
        <Container size="wide">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Our values
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title}>
                <h3 className="text-base font-semibold text-neutral-900">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-24">
        <Container size="wide">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Our team
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person) => (
              <div
                key={person.name + person.role}
                className="rounded-xl border border-neutral-200 bg-white p-6"
              >
                <div className="mb-4 h-12 w-12 rounded-full bg-neutral-200" />
                <p className="font-semibold text-neutral-900">{person.name}</p>
                <p className="mt-1 text-sm text-neutral-500">{person.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
