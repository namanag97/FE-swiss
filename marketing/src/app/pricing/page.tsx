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
    cta: "Start Free Pilot",
    href: "/contact",
    featured: false,
  },
  {
    name: "Team",
    price: "$990",
    period: "/ month",
    desc: "For operations teams running multiple processes.",
    features: ["Unlimited processes", "Up to 10M events / mo", "Conformance checking", "Advanced analytics & dashboards", "Variant analysis", "Priority support", "SSO"],
    cta: "Request Demo",
    href: "/request-demo",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For organizations with scale, compliance, and integration needs.",
    features: ["Everything in Team", "Unlimited events", "AI insights & predictions", "Custom integrations", "Dedicated CSM", "SLA guarantee", "On-premise option"],
    cta: "Contact Sales",
    href: "/contact",
    featured: false,
  },
];

const faq = [
  { q: "What counts as an event?", a: "Each row in your event log \u2014 a single activity occurrence with a case ID, activity name, and timestamp." },
  { q: "Can I try before I buy?", a: "Yes. The Pilot tier is completely free with no credit card required. Run it on a single process with up to 100K events for as long as you need." },
  { q: "What\u2019s included in the free Pilot?", a: "One process model, process discovery, basic analytics, and community support. It\u2019s a full working environment \u2014 not a time-limited trial." },
  { q: "How do you handle data security?", a: "SOC 2 Type II certified. Data encrypted at rest and in transit. Enterprise plans support VPC deployment and air-gapped on-premise installations." },
  { q: "What data sources do you support?", a: "SAP, ServiceNow, Salesforce, JIRA, and any system that exports CSV or connects via API. Enterprise plans include custom connector development." },
  { q: "How long does implementation take?", a: "Pilot: a few hours to upload data and see your first process map. Team: 1\u20132 weeks with guided onboarding. Enterprise: custom timeline with dedicated support." },
  { q: "Can I switch plans later?", a: "Yes. Upgrade anytime and your data carries over. Downgrade at the end of any billing cycle. No lock-in." },
  { q: "Do you offer annual billing?", a: "Yes. Annual plans include a 20% discount. Contact sales for multi-year agreements with additional savings." },
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
        <div className="gi" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--sp-3)' }}>
          <span className="eyebrow eyebrow-bracket">Pricing</span>
          <h1 className="type-display">
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

      {/* Deploy Anywhere */}
      <div className="ascii-divider">{'\u00b7'} {'\u00b7'} {'\u00b7'}   {'\u00b7'} {'\u00b7'} {'\u00b7'}   {'\u00b7'} {'\u00b7'} {'\u00b7'}</div>

      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--sp-6)' }}>
            <span className="eyebrow eyebrow-bracket">Infrastructure</span>
            <h2 className="type-h2" style={{ marginTop: 'var(--sp-3)' }}>Deploy <em>anywhere</em></h2>
          </div>
          <div className="ascii-frame" style={{ maxWidth: 680, margin: '0 auto' }}>
            <pre className="ascii-art" style={{ margin: 0 }}>
{`  CLOUD                 HYBRID                ON-PREMISE
  ─────                 ──────                ──────────

  Meridian-managed      Your VPC              Full control
  Auto-scaling          Our management        Air-gapped support
  SOC 2 certified       Data stays local      Custom SLA

  ┌───────────┐         ┌───────────┐         ┌───────────┐
  │  ▓▓▓▓▓▓▓  │         │  ░▓▓▓▓▓░  │         │  ░░▓▓░░░  │
  │  ▓▓▓▓▓▓▓  │         │  ░▓▓▓▓▓░  │         │  ░░▓▓░░░  │
  │  ▓▓▓▓▓▓▓  │         │  ░▓▓▓▓▓░  │         │  ░░▓▓░░░  │
  └───────────┘         └───────────┘         └───────────┘
   We manage it          We co-manage          You own it`}</pre>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <div className="ascii-divider">{'\u00b7'} {'\u00b7'} {'\u00b7'}   {'\u00b7'} {'\u00b7'} {'\u00b7'}   {'\u00b7'} {'\u00b7'} {'\u00b7'}</div>

      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--sp-6)' }}>
            <span className="eyebrow eyebrow-bracket">Compare</span>
            <h2 className="type-h2" style={{ marginTop: 'var(--sp-3)' }}>Feature <em>comparison</em></h2>
          </div>
          <div className="ascii-frame" style={{ maxWidth: 720, margin: '0 auto' }}>
            <pre className="ascii-art" style={{ margin: 0 }}>
{`  Feature                          Pilot      Team       Enterprise
  ═══════════════════════════════════════════════════════════════════
  Process models                   1          Unlimited  Unlimited
  Events / month                   100K       10M        Unlimited
  Process discovery                ●          ●          ●
  Basic analytics                  ●          ●          ●
  Conformance checking             ○          ●          ●
  Advanced dashboards              ○          ●          ●
  Variant analysis                 ○          ●          ●
  AI insights & predictions        ○          ○          ●
  Custom integrations              ○          ○          ●
  SSO / SAML                       ○          ●          ●
  On-premise deployment            ○          ○          ●
  Dedicated CSM                    ○          ○          ●
  SLA guarantee                    ○          ○          ●
  ───────────────────────────────────────────────────────────────────
  ● included   ○ not included`}</pre>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* FAQ */}
      <section className="gr">
        <div className="gi" style={{ padding: 'var(--sp-7) var(--sp-5)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--sp-6)' }}>
            <span className="eyebrow eyebrow-bracket">FAQ</span>
            <h2 className="type-h2" style={{ marginTop: 'var(--sp-3)' }}>Common questions</h2>
          </div>
          <div className="faq-list">
            {faq.map((item) => <FaqItem key={item.q} q={item.q} a={item.a} />)}
          </div>
          <p style={{ textAlign: 'center', marginTop: 'var(--sp-5)', fontFamily: 'var(--body)', fontSize: 'var(--fs-sm)', fontWeight: 260, color: 'var(--ink-faint)' }}>
            More questions? <Link href="/contact" style={{ textDecoration: 'underline', textUnderlineOffset: 2 }}>Get in touch</Link>
          </p>
        </div>
      </section>

      <section className="cta-band">
        <div className="gi" style={{ textAlign: 'center', padding: 'var(--sp-7) 0' }}>
          <h2 className="type-h2" style={{ color: 'var(--white)' }}>
            Ready to get <em>started</em>?
          </h2>
          <p style={{ fontFamily: 'var(--body)', color: 'rgba(255,255,255,0.7)', maxWidth: 480, margin: '0 auto', marginTop: 'var(--sp-4)' }}>
            Book a 30-minute demo. See Meridian on your data.
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'center', marginTop: 'var(--sp-5)' }}>
            <Link href="/contact" className="btn btn-primary" style={{ background: 'var(--white)', color: 'var(--ink-dark)', borderColor: 'var(--white)' }}>Get Started</Link>
            <Link href="/request-demo" className="btn btn-ghost" style={{ color: 'var(--white)', borderColor: 'rgba(255,255,255,0.3)' }}>Request Demo</Link>
          </div>
        </div>
      </section>
    </>
  );
}
