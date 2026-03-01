import Link from "next/link";
import { ProcessMapHero } from "@/components/home/ProcessMapHero";
import { PlatformTabs } from "@/components/home/PlatformTabs";

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="gr" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
        <div className="gi" style={{ textAlign: 'center' }}>
          {/* ASCII art process flow above the headline */}
          <pre className="ascii-art" style={{ marginBottom: 'var(--sp-5)', fontSize: 'var(--fs-xs)' }}>
{`    ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
    │ EXTRACT │────▶│  MINE   │────▶│ ANALYZE │────▶│  ACT    │
    └─────────┘     └─────────┘     └─────────┘     └─────────┘
     event logs      discovery      conformance     automation`}</pre>

          <span className="eyebrow eyebrow-bracket">Now available</span>
          <h1 className="type-display" style={{ marginTop: 'var(--sp-3)' }}>
            See how your business<br /><em>actually runs</em>
          </h1>
          <p className="type-body" style={{ maxWidth: 560, margin: '0 auto', marginTop: 'var(--sp-4)', color: 'var(--ink-mid)' }}>
            The data platform for operations teams. Process mining, visual analytics,
            and AI-powered insights — beyond what SQL can show you.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--sp-5)' }}>
            <Link href="/contact" className="btn btn-primary">Get Early Access</Link>
          </div>
        </div>
      </section>

      {/* ── Process Map Visual ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi">
          <ProcessMapHero />
        </div>
      </section>

      {/* ── Logos ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-6) 0' }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', textAlign: 'center', marginBottom: 'var(--sp-4)' }}>
            Trusted by operations teams at
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--sp-7)', flexWrap: 'wrap', alignItems: 'center' }}>
            {['Siemens', 'Bosch', 'Maersk', 'ABB', 'Roche'].map((name) => (
              <span key={name} style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-sm)', color: 'var(--ink-faint)', letterSpacing: '0.05em' }}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── ASCII Divider ── */}
      <div className="ascii-divider">&middot; &middot; &middot;   &middot; &middot; &middot;   &middot; &middot; &middot;</div>

      {/* ── Numbers ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-6) 0' }}>
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 'var(--sp-5)', textAlign: 'center' }}>
            {[
              { value: '10M+', label: 'Events processed daily' },
              { value: '<2s', label: 'Query response' },
              { value: '40%', label: 'Avg bottleneck reduction' },
              { value: '23', label: 'Industries served' },
            ].map((stat) => (
              <div key={stat.label}>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-2xl)', fontWeight: 300, color: 'var(--ink-dark)', letterSpacing: '-0.02em' }}>{stat.value}</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', color: 'var(--ink-muted)', marginTop: 'var(--sp-2)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</p>
              </div>
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

      {/* ── Use Cases ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--sp-6)' }}>
            <span className="eyebrow eyebrow-bracket">Use Cases</span>
            <h2 className="type-h2" style={{ marginTop: 'var(--sp-3)' }}>Built for <em>real workflows</em></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'var(--sp-4)' }}>
            {[
              { title: 'Order-to-Cash', desc: 'Reduce DSO by identifying invoice bottlenecks and payment delays across the entire O2C cycle.', anchor: '#o2c' },
              { title: 'Procure-to-Pay', desc: 'Uncover maverick buying, duplicate payments, and approval bottlenecks in your procurement process.', anchor: '#p2p' },
              { title: 'IT Service Management', desc: 'Map ticket lifecycles, find resolution bottlenecks, and optimize escalation paths.', anchor: '#itsm' },
              { title: 'Patient Journey', desc: 'Track patient flow through clinical pathways, identify wait times, and improve care coordination.', anchor: '#healthcare' },
            ].map((uc) => (
              <div key={uc.title} className="card-feature" style={{ padding: 'var(--sp-5)' }}>
                <h3 className="type-h3">{uc.title}</h3>
                <p className="type-body" style={{ marginTop: 'var(--sp-3)', color: 'var(--ink-mid)' }}>{uc.desc}</p>
                <Link href={`/use-cases${uc.anchor}`} style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', color: 'var(--emerald)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 'var(--sp-4)', display: 'inline-block' }}>
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)', maxWidth: 680, margin: '0 auto' }}>
          <div className="card-feature" style={{ padding: 'var(--sp-6)', textAlign: 'center' }}>
            <blockquote style={{ fontFamily: 'var(--caslon)', fontSize: 'var(--fs-lg)', fontStyle: 'italic', color: 'var(--emerald)', lineHeight: 1.6 }}>
              &ldquo;Meridian showed us process variants we didn&apos;t know existed. We reduced our order cycle time by 34% in the first quarter.&rdquo;
            </blockquote>
            <div style={{ marginTop: 'var(--sp-4)' }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-sm)', fontWeight: 500, color: 'var(--ink)' }}>Anna Berglund</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', color: 'var(--ink-muted)' }}>VP Operations, Nordic Manufacturing Co.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="cta-band">
        <div className="gi" style={{ textAlign: 'center', padding: 'var(--sp-7) 0' }}>
          <h2 className="type-h2" style={{ color: 'var(--white)' }}>
            Ready to see your <em>real processes</em>?
          </h2>
          <p style={{ fontFamily: 'var(--body)', color: 'rgba(255,255,255,0.7)', maxWidth: 480, margin: '0 auto', marginTop: 'var(--sp-4)' }}>
            Start with a free pilot. No credit card required.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--sp-5)' }}>
            <Link href="/contact" className="btn btn-primary" style={{ background: 'var(--white)', color: 'var(--ink-dark)', borderColor: 'var(--white)' }}>Get Early Access</Link>
          </div>
        </div>
      </section>
    </>
  );
}
