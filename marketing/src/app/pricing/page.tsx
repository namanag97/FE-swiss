import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing. No hidden fees. Start free, scale as you grow.",
};

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    desc: "For individuals and small projects.",
    features: ["Up to 3 projects", "1,000 API calls / mo", "Community support", "Basic analytics"],
    cta: "Get started free",
    href: "/contact",
    featured: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/ month",
    desc: "For growing teams that need power and flexibility.",
    features: ["Unlimited projects", "100K API calls / mo", "Priority support", "Advanced analytics", "Custom integrations", "Team collaboration"],
    cta: "Start free trial",
    href: "/contact",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For organizations with advanced security and compliance needs.",
    features: ["Everything in Pro", "Unlimited API calls", "SSO & SAML", "Dedicated CSM", "99.99% SLA", "Custom contracts"],
    cta: "Contact sales",
    href: "/contact",
    featured: false,
  },
];

const faq = [
  { q: "Can I change plans later?", a: "Yes — upgrade, downgrade, or cancel at any time. Changes take effect immediately." },
  { q: "What counts as an API call?", a: "Every request to our REST or GraphQL API. Webhooks and dashboard views are free." },
  { q: "Do you offer annual billing?", a: "Yes — save 20% with annual billing on Pro and Enterprise plans." },
  { q: "Is there a free trial?", a: "Pro includes a 14-day free trial. No credit card required." },
];

export default function PricingPage() {
  return (
    <>
      <section className="py-24 md:py-28">
        <Container size="wide">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-600">
              Pricing
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base text-neutral-500">
              Start free. Scale as you grow. No surprise bills.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "relative flex flex-col rounded-xl border p-7",
                  plan.featured
                    ? "border-neutral-900 bg-white shadow-lg shadow-neutral-200/40"
                    : "border-neutral-200 bg-white"
                )}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-semibold text-white">
                    Most popular
                  </span>
                )}

                <h3 className="text-lg font-semibold text-neutral-900">{plan.name}</h3>
                <p className="mt-1 text-sm text-neutral-500">{plan.desc}</p>

                <div className="mt-5">
                  <span className="text-4xl font-bold tracking-tight text-neutral-900">{plan.price}</span>
                  {plan.period && (
                    <span className="ml-1 text-sm text-neutral-400">{plan.period}</span>
                  )}
                </div>

                <ul className="mt-7 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-neutral-900" />
                      <span className="text-neutral-600">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={cn(
                    "mt-7 block rounded-lg border px-5 py-2.5 text-center text-sm font-medium transition-colors",
                    plan.featured
                      ? "border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-24">
        <Container size="wide">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Frequently asked questions
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {faq.map((item) => (
              <div key={item.q}>
                <h3 className="text-sm font-semibold text-neutral-900">{item.q}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
