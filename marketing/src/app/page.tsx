import Link from "next/link";
import { PlatformTabs } from "@/components/home/PlatformTabs";
import { Reveal } from "@/components/ui/Reveal";

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="gr" style={{ paddingTop: 96, paddingBottom: 80 }}>
        <div className="gi" style={{ textAlign: 'center' }}>
          <span className="eyebrow eyebrow-bracket">Early access</span>
          <h1 className="type-display" style={{ marginTop: 20 }}>
            Process intelligence for<br /><em>operations teams</em>
          </h1>
          <p className="type-body" style={{ maxWidth: 540, margin: '0 auto', marginTop: 24, color: 'var(--ink-mid)' }}>
            Mine event logs. Map real processes. Find bottlenecks before they cost you.
            No guesswork — just what actually happens in your systems.
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'center', marginTop: 36 }}>
            <Link href="/contact" className="btn btn-primary">Get Early Access</Link>
            <Link href="/platform" className="btn btn-ghost">See the Platform</Link>
          </div>
          {/* Micro-trust line */}
          <p style={{ fontFamily: 'var(--body)', fontSize: 'var(--fs-sm)', color: 'var(--ink-faint)', marginTop: 16, letterSpacing: '-.01em' }}>
            No credit card required &middot; Setup in under 10 minutes
          </p>
        </div>
      </section>

      {/* ── Process Map Visual ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: 'var(--sp-5)', paddingBottom: 'var(--sp-5)' }}>
          <div className="ascii-frame overflow-x-auto">
            <pre className="ascii-art" style={{ margin: 0 }}>{`
  ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
  │  Event   │────▶│  Process  │────▶│ Diagnose │────▶│  Action  │
  │   Logs   │     │   Map     │     │          │     │          │
  └──────────┘     └──────────┘     └──────────┘     └──────────┘
       SAP              ▲               34%             Automate
       JIRA             │            bottleneck          + Alert
       Oracle       12,847 cases        found
`}</pre>
          </div>
        </div>
      </section>

      {/* ── Connectors ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-6) 0' }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', textAlign: 'center', marginBottom: 'var(--sp-4)' }}>
            Connects to your existing systems
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--sp-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            {['SAP', 'ServiceNow', 'Salesforce', 'JIRA', 'Oracle'].map((name) => (
              <span key={name} style={{
                fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', color: 'var(--ink-faint)',
                letterSpacing: '0.06em', textTransform: 'uppercase',
                padding: 'var(--sp-2) var(--sp-4)',
                border: '1px solid var(--border)',
                background: 'var(--white)',
              }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof / Metrics ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-6) 0' }}>
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 'var(--sp-4)' }}>
            {[
              { metric: '12,800+', label: 'Processes mapped' },
              { metric: '4.2 days', label: 'Avg. time to first insight' },
              { metric: '34%', label: 'Bottleneck reduction' },
              { metric: '99.9%', label: 'Platform uptime' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center', padding: 'var(--sp-4) 0' }}>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink-dark)' }}>{s.metric}</p>
                <p style={{ fontFamily: 'var(--body)', fontSize: 'var(--fs-sm)', color: 'var(--ink-faint)', marginTop: 4, fontWeight: 340 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ASCII Divider ── */}
      <div className="ascii-divider">&middot; &middot; &middot;   &middot; &middot; &middot;   &middot; &middot; &middot;</div>

      {/* ── Timeline ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 'var(--sp-6)' }}>
              <span className="eyebrow eyebrow-bracket">Timeline</span>
              <h2 className="type-h2" style={{ marginTop: 'var(--sp-3)' }}>
                From event log to <em>actionable insight</em>
              </h2>
              <p className="type-body" style={{ maxWidth: 480, margin: '0 auto', marginTop: 'var(--sp-3)', color: 'var(--ink-mid)' }}>
                Process intelligence shouldn&apos;t take months to implement.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 reveal-stagger" style={{ gap: 'var(--sp-4)' }}>
            {[
              { phase: 'Day 1', title: 'Answers in minutes', desc: 'Connect your ERP or ITSM system. See your first process map within the hour.' },
              { phase: 'Week 1', title: 'Share with your team', desc: 'Roll out dashboards to operations leads. Self-serve process insights without analyst back-and-forth.' },
              { phase: 'Month 1', title: 'Full process intelligence', desc: 'Conformance checking, bottleneck prediction, and automated alerts across all your workflows.' },
            ].map((t) => (
              <Reveal key={t.phase}>
                <div className="card-feature" style={{ padding: 'var(--sp-5)', height: '100%' }}>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--emerald)', fontWeight: 500 }}>{t.phase}</span>
                  <h3 className="type-h3" style={{ marginTop: 'var(--sp-2)' }}>{t.title}</h3>
                  <p className="type-body" style={{ marginTop: 'var(--sp-3)', color: 'var(--ink-mid)' }}>{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform Tabs ── */}
      <section className="gr" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
        <div className="gi">
          <div style={{ textAlign: 'center', marginBottom: 'var(--sp-6)' }}>
            <span className="eyebrow eyebrow-bracket">Platform</span>
            <h2 className="type-h2" style={{ marginTop: 'var(--sp-3)' }}>
              Four pillars of <em>process intelligence</em>
            </h2>
          </div>
          <PlatformTabs />
        </div>
      </section>

      <div className="ascii-divider">&middot; &middot; &middot;   &middot; &middot; &middot;   &middot; &middot; &middot;</div>

      {/* ── Use Cases ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 'var(--sp-6)' }}>
              <span className="eyebrow eyebrow-bracket">Use Cases</span>
              <h2 className="type-h2" style={{ marginTop: 'var(--sp-3)' }}>Built for <em>real workflows</em></h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 reveal-stagger" style={{ gap: 'var(--sp-4)' }}>
            {[
              { title: 'Order-to-Cash', desc: 'Find where invoices stall. Reduce DSO by mapping every step from order entry to payment.', anchor: '#o2c' },
              { title: 'Procure-to-Pay', desc: 'Spot maverick buying and duplicate payments. See exactly where procurement deviates from policy.', anchor: '#p2p' },
              { title: 'IT Service Management', desc: 'Map ticket lifecycles from creation to resolution. Cut escalation bounces.', anchor: '#itsm' },
              { title: 'Patient Journey', desc: 'Track patient flow through clinical pathways. Identify wait-time hotspots and care gaps.', anchor: '#healthcare' },
            ].map((uc) => (
              <Reveal key={uc.title}>
                <div className="card-feature" style={{ padding: 'var(--sp-5)', height: '100%' }}>
                  <h3 className="type-h3">{uc.title}</h3>
                  <p className="type-body" style={{ marginTop: 'var(--sp-3)', color: 'var(--ink-mid)' }}>{uc.desc}</p>
                  <Link href={`/use-cases${uc.anchor}`} style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', color: 'var(--emerald)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 'var(--sp-4)', display: 'inline-block' }}>
                    Learn more →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)', maxWidth: 680, margin: '0 auto' }}>
          <Reveal>
            <div className="card-feature" style={{ padding: 'var(--sp-6)', textAlign: 'center' }}>
              <blockquote style={{ fontFamily: 'var(--caslon)', fontSize: 'var(--fs-lg)', fontStyle: 'italic', color: 'var(--emerald)', lineHeight: 1.6 }}>
                &ldquo;Every organization has a process diagram on the wall. None of them match reality.
                We built Meridian to close that gap.&rdquo;
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="cta-band">
        <div className="gi" style={{ textAlign: 'center', padding: 'var(--sp-7) 0' }}>
          <h2 className="type-h2" style={{ color: 'var(--white)' }}>
            Go from event log to <em>insight</em>
          </h2>
          <p style={{ fontFamily: 'var(--body)', color: 'rgba(255,255,255,0.5)', maxWidth: 420, margin: '0 auto', marginTop: 'var(--sp-4)' }}>
            Be among the first teams to use Meridian. Request early access today.
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'center', marginTop: 'var(--sp-5)' }}>
            <Link href="/contact" className="btn btn-primary">Get Early Access</Link>
            <Link href="/platform" className="btn btn-ghost">Explore Platform</Link>
          </div>
        </div>
      </section>
    </>
  );
}
