import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent pricing for teams of every size. Start with a pilot, scale across the org.",
};

const plans = [
  {
    name: "Pilot",
    price: "Free",
    period: "",
    desc: "Try it on one process. No commitment.",
    features: ["1 process model", "Up to 100K events", "Process discovery", "Basic analytics", "Community support"],
    cta: "Start free pilot",
    href: "/contact",
    featured: false,
  },
  {
    name: "Team",
    price: "$990",
    period: "/ month",
    desc: "For operations teams running multiple processes.",
    features: ["Unlimited processes", "Up to 10M events / mo", "Conformance checking", "Advanced analytics & dashboards", "Variant analysis", "Priority support", "SSO"],
    cta: "Start free trial",
    href: "/contact",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For organizations with scale, compliance, and integration needs.",
    features: ["Everything in Team", "Unlimited events", "AI insights & predictions", "Custom integrations", "Dedicated CSM", "SLA guarantee", "On-premise option"],
    cta: "Contact sales",
    href: "/contact",
    featured: false,
  },
];

const faq = [
  { q: "What counts as an event?", a: "Each row in your event log — a single activity occurrence with a case ID, activity name, and timestamp." },
  { q: "Can I upgrade later?", a: "Yes. Upgrade, downgrade, or cancel at any time. Data is always retained." },
  { q: "Do you support on-premise?", a: "Enterprise plans include an on-premise deployment option for regulated industries." },
  { q: "What data formats do you accept?", a: "CSV, XES, Parquet, and direct connectors to major databases and warehouses." },
];

export default function PricingPage() {
  return (
    <>
      <section className="py-20 md:py-24">
        <Container size="wide">
          <div className="max-w-lg">
            <p className="text-[11px] font-medium uppercase tracking-widest text-terra-600">Pricing</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-sand-900 md:text-4xl">
              Transparent pricing
            </h1>
            <p className="mt-3 text-[15px] text-sand-500">
              Start with a free pilot. Scale when you&apos;re ready.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "relative flex flex-col rounded-xl border p-7",
                  plan.featured ? "border-sand-900 bg-white shadow-sm" : "border-sand-200 bg-white"
                )}
              >
                {plan.featured && (
                  <span className="absolute -top-2.5 left-5 rounded-full bg-sand-900 px-3 py-0.5 text-[10px] font-semibold text-white">
                    Most popular
                  </span>
                )}
                <h3 className="text-base font-semibold text-sand-900">{plan.name}</h3>
                <p className="mt-1 text-[13px] text-sand-500">{plan.desc}</p>
                <div className="mt-5">
                  <span className="text-3xl font-semibold tracking-tight text-sand-900">{plan.price}</span>
                  {plan.period && <span className="ml-1 text-[13px] text-sand-400">{plan.period}</span>}
                </div>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[13px]">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-terra-600" />
                      <span className="text-sand-600">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={cn(
                    "mt-7 block rounded-lg border px-4 py-2 text-center text-[13px] font-medium transition-colors",
                    plan.featured
                      ? "border-sand-900 bg-sand-900 text-white hover:bg-sand-800"
                      : "border-sand-200 text-sand-700 hover:border-sand-400"
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-sand-200 bg-sand-50 py-20">
        <Container size="wide">
          <h2 className="text-xl font-semibold tracking-tight text-sand-900">Common questions</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {faq.map((item) => (
              <div key={item.q}>
                <h3 className="text-[14px] font-semibold text-sand-900">{item.q}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-sand-500">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
