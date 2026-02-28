import Link from "next/link";
import { ArrowRight, GitBranch, Search, BarChart3, Workflow, Database, BrainCircuit } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProcessMapHero } from "@/components/home/ProcessMapHero";
import { siteConfig } from "@/lib/config";

const capabilities = [
  { icon: GitBranch, title: "Process Discovery", desc: "Reconstruct real process flows from event logs. Every path, variant, and exception — automatically." },
  { icon: Search, title: "Conformance Checking", desc: "Compare actual behavior against intended models. Find deviations, skipped steps, and compliance gaps." },
  { icon: BarChart3, title: "Visual Analytics", desc: "Dashboards built for processes, not just metrics. Filter by variant, trace individual cases end to end." },
  { icon: Workflow, title: "Variant Analysis", desc: "Understand why the same process runs differently. Cluster variants, compare durations, find the happy path." },
  { icon: Database, title: "Beyond SQL", desc: "Process-aware queries that understand sequences, durations, and causality. Questions SQL can't answer." },
  { icon: BrainCircuit, title: "AI Insights", desc: "Predict delays, detect anomalies, surface optimization opportunities from your operational data." },
];

const useCases = [
  { title: "Order-to-Cash", desc: "Find where invoices stall and cash gets trapped in your fulfillment process." },
  { title: "Procure-to-Pay", desc: "Catch maverick buying, duplicate payments, and approval bottlenecks." },
  { title: "IT Service Management", desc: "Trace tickets from creation to resolution. Identify escalation patterns." },
  { title: "Patient Journey", desc: "Follow patients through care pathways. Reduce wait times, verify protocols." },
];

const numbers = [
  { value: "10M+", label: "Events processed daily" },
  { value: "<2s", label: "Query response" },
  { value: "40%", label: "Avg bottleneck reduction" },
  { value: "23", label: "Industries served" },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero (light) ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-7) var(--sp-5) var(--sp-6)' }}>
          <div className="eyebrow">
            <span className="pulse" />
            <span>Now available</span>
          </div>
          <h1 className="type-display" style={{ marginTop: 'var(--sp-4)', maxWidth: 680 }}>
            {siteConfig.tagline.replace('.', '').split(' ').slice(0, -1).join(' ')}{' '}
            <em>{siteConfig.tagline.replace('.', '').split(' ').slice(-1)[0]}</em>.
          </h1>
          <p className="type-body" style={{ marginTop: 'var(--sp-4)', maxWidth: 400 }}>
            {siteConfig.description}
          </p>
          <div className="flex items-center" style={{ marginTop: 'var(--sp-5)', gap: 'var(--sp-3)' }}>
            <Link href="/contact" data-track="cta-hero-start" className="btn btn-primary">
              Get Started
              <ArrowRight style={{ width: 12, height: 12 }} />
            </Link>
            <Link href="/contact" data-track="cta-hero-demo" className="btn btn-ghost">
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ── Product Visual ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-6) var(--sp-5)' }}>
          <ProcessMapHero />
        </div>
      </section>

      {/* ── Logos ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi flex items-center" style={{ gap: 0, padding: 'var(--sp-4) var(--sp-5)' }}>
          <span className="type-label shrink-0" style={{ paddingRight: 'var(--sp-4)' }}>Trusted by</span>
          {["Siemens", "Bosch", "Maersk", "ABB", "Roche"].map((n) => (
            <span
              key={n}
              className="flex items-center transition-colors"
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '.03em',
                color: 'var(--ink-faint)',
                padding: '0 var(--sp-3)',
                height: 32,
                borderLeft: '1px solid var(--border)',
              }}
            >
              {n}
            </span>
          ))}
        </div>
      </section>

      {/* ── Numbers ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-6) var(--sp-5)' }}>
          <div className="grid grid-cols-2 gap-0 md:grid-cols-4">
            {numbers.map((n) => (
              <div key={n.label} className="card-stat">
                <span className="type-label">{n.label}</span>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-2xl)', fontWeight: 400, letterSpacing: '-.04em', lineHeight: 1, color: 'var(--ink-dark)' }}>
                  {n.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-7) var(--sp-5)' }}>
          <div className="section-header">
            <span className="eyebrow eyebrow-bracket">Platform</span>
            <h2 className="type-h2">
              Process intelligence meets modern <em>analytics</em>
            </h2>
            <p className="type-body">From raw event data to operational clarity.</p>
          </div>
          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.title} className="card-feature">
                <div className="card-icon">
                  <c.icon style={{ width: 16, height: 16 }} />
                </div>
                <p className="card-title">{c.title}</p>
                <p className="card-body">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-7) var(--sp-5)' }}>
          <div className="section-header">
            <span className="eyebrow eyebrow-bracket">Use cases</span>
            <h2 className="type-h2">
              Built for the processes that <em>matter</em> most
            </h2>
          </div>
          <div className="grid gap-0 sm:grid-cols-2">
            {useCases.map((uc) => (
              <Link key={uc.title} href="/use-cases" className="card-feature group">
                <p className="card-title">{uc.title}</p>
                <p className="card-body">{uc.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-7) var(--sp-5)' }}>
          <div className="card-quote mx-auto" style={{ maxWidth: 540 }}>
            <p style={{ fontFamily: 'var(--caslon)', fontSize: 'var(--fs-lg)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.5, color: 'var(--ink)' }}>
              &ldquo;We spent months trying to understand our order-to-cash process with SQL and spreadsheets.
              {siteConfig.name} showed us the full picture in an afternoon.&rdquo;
            </p>
            <div className="flex items-center" style={{ gap: 'var(--sp-3)', paddingTop: 'var(--sp-3)', borderTop: '1px solid var(--border)' }}>
              <div className="flex shrink-0 items-center justify-center rounded-full" style={{ width: 32, height: 32, background: 'var(--ink-dark)', fontFamily: 'var(--sans)', fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,.7)' }}>
                AB
              </div>
              <div>
                <p style={{ fontFamily: 'var(--body)', fontSize: 'var(--fs-sm)', fontWeight: 500, color: 'var(--ink-dark)', letterSpacing: '-.01em' }}>Anna Berglund</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', fontWeight: 400, color: 'var(--ink-faint)', letterSpacing: '.04em', textTransform: 'uppercase' }}>Director of Operations, Nordic Manufacturing Co.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="cta-band">
        <span className="eyebrow" style={{ color: 'rgba(255,255,255,.45)' }}>Get started</span>
        <h2>See what your processes are <em>really</em> doing</h2>
        <p>Book a 20-minute demo. We&apos;ll map one of your processes live.</p>
        <div className="flex items-center" style={{ gap: 'var(--sp-3)' }}>
          <Link href="/contact" data-track="cta-bottom-start" className="btn btn-primary">
            Get Started <ArrowRight style={{ width: 12, height: 12 }} />
          </Link>
          <Link href="/contact" data-track="cta-bottom-demo" className="btn btn-ghost">
            Request Demo
          </Link>
        </div>
      </section>
    </>
  );
}
