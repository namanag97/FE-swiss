import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing. No hidden fees.",
};

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "For individuals and small projects getting started.",
    features: [
      "Up to 3 projects",
      "1,000 API calls / month",
      "Community support",
      "Basic analytics",
    ],
    cta: "Get started free",
    href: "/contact",
    featured: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "per month",
    description: "For growing teams that need more power and flexibility.",
    features: [
      "Unlimited projects",
      "100,000 API calls / month",
      "Priority support",
      "Advanced analytics",
      "Custom integrations",
      "Team collaboration",
    ],
    cta: "Start free trial",
    href: "/contact",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with advanced security and compliance needs.",
    features: [
      "Everything in Pro",
      "Unlimited API calls",
      "SSO & SAML",
      "Dedicated support",
      "SLA guarantee",
      "Custom contracts",
    ],
    cta: "Contact sales",
    href: "/contact",
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <section className="py-24 md:py-32">
      <Container size="wide">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-500">
            Start for free, scale as you grow. No surprise bills.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-xl border p-8",
                plan.featured
                  ? "border-neutral-900 bg-white shadow-lg"
                  : "border-neutral-200 bg-white"
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white">
                  Most popular
                </span>
              )}

              <h3 className="text-lg font-semibold text-neutral-900">
                {plan.name}
              </h3>
              <p className="mt-2 text-sm text-neutral-500">
                {plan.description}
              </p>

              <div className="mt-6">
                <span className="text-4xl font-bold text-neutral-900">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="ml-2 text-sm text-neutral-400">
                    {plan.period}
                  </span>
                )}
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-neutral-900" />
                    <span className="text-neutral-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={cn(
                  "mt-8 block rounded-lg border px-6 py-3 text-center text-sm font-medium transition-colors",
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
  );
}
