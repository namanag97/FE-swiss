import type { Metadata } from "next";
import Link from "next/link";
import { Check, Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent pricing for teams of every size. Start with a pilot, scale across the org.",
  alternates: { canonical: "/pricing" },
  openGraph: { images: ["/og.png"] },
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

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="faq-item group">
      <summary className="faq-q">
        {q}
        <Plus style={{ width: 14, height: 14, flexShrink: 0, color: 'var(--ink-faint)', transition: 'transform .15s ease' }} className="group-open:rotate-45" />
      </summary>
      <div className="faq-a">{a}</div>
    </details>
  );
}

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-7) var(--sp-5) var(--sp-6)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--sp-3)' }}>
          <span className="eyebrow eyebrow-bracket">Pricing</span>
          <h1 style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-3xl)', fontWeight: 400, lineHeight: .89, letterSpacing: '-.03em', color: 'var(--ink)' }}>
            Transparent pricing
          </h1>
          <p className="type-body" style={{ textAlign: 'center', maxWidth: 420 }}>
            Start with a free pilot. Scale when you&apos;re ready.
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="pricing-grid" style={{ padding: '0 var(--sp-5) var(--sp-7)' }}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card${plan.featured ? ' pricing-card--featured' : ''}`}
            >
              {plan.featured && <div className="pricing-badge">Most popular</div>}
              <p style={{ fontFamily: 'var(--sans)', fontSize: 8, fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>Tier</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-sm)', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-dark)' }}>{plan.name}</p>
              <p className="type-body-sm">{plan.desc}</p>
              <div className="flex items-baseline" style={{ gap: 4 }}>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-2xl)', fontWeight: 400, letterSpacing: '-.04em', lineHeight: 1, color: 'var(--ink-dark)' }}>{plan.price}</span>
                {plan.period && <span style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', fontWeight: 400, letterSpacing: '.04em', color: 'var(--ink-faint)' }}>{plan.period}</span>}
              </div>
              <div className="flex flex-1 flex-col" style={{ gap: 'var(--sp-2)', paddingTop: 'var(--sp-3)', borderTop: '1px solid var(--border)' }}>
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start" style={{ gap: 8, fontFamily: 'var(--body)', fontSize: 'var(--fs-sm)', fontWeight: 260, lineHeight: 1.5, color: 'var(--ink-muted)' }}>
                    <Check style={{ width: 14, height: 14, flexShrink: 0, marginTop: 1, color: 'var(--emerald)' }} />
                    {f}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 'var(--sp-4)' }}>
                <Link href={plan.href} data-track="cta-pricing" className={`btn btn-full ${plan.featured ? 'btn-primary' : 'btn-ghost'}`}>{plan.cta}</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* FAQ */}
      <section className="gr">
        <div className="gi" style={{ padding: 'var(--sp-7) var(--sp-5)' }}>
          <h2 className="type-h2" style={{ textAlign: 'center', marginBottom: 'var(--sp-6)' }}>Common questions</h2>
          <div className="faq-list">
            {faq.map((item) => <FaqItem key={item.q} q={item.q} a={item.a} />)}
          </div>
          <p style={{ textAlign: 'center', marginTop: 'var(--sp-5)', fontFamily: 'var(--body)', fontSize: 'var(--fs-sm)', fontWeight: 260, color: 'var(--ink-faint)' }}>
            More questions? <Link href="/contact" style={{ textDecoration: 'underline', textUnderlineOffset: 2 }}>Get in touch</Link>
          </p>
        </div>
      </section>

      <section className="cta-band">
        <h2>Ready to get <em>started</em>?</h2>
        <p>Book a 20-minute demo. See Meridian on your data.</p>
        <Link href="/contact" className="btn btn-primary">Request Demo</Link>
      </section>
    </>
  );
}
