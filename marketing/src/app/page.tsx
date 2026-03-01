import Link from "next/link";
import { ProcessMapHero } from "@/components/home/ProcessMapHero";
import { PlatformTabs } from "@/components/home/PlatformTabs";

/* Decorative wave SVG — inspired by textql.com's organic line patterns */
function WaveLines({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg className={className} width="300" height="400" viewBox="0 0 300 400" fill="none" preserveAspectRatio="xMidYMid slice">
      <g opacity="0.35">
        <path d="M-50 50C-30 50 20 120 80 118C140 116 100 200 50 280C0 360 250 400 320 420" stroke={color} strokeWidth="0.5" />
        <path d="M200 0C160 60 80 250 180 300C280 350 400 50 380 220" stroke={color} strokeWidth="0.5" />
        <path d="M-20 200C40 180 120 60 200 100C280 140 300 300 350 350" stroke={color} strokeWidth="0.5" />
        <path d="M100 -20C80 80 200 150 150 250C100 350 300 380 350 300" stroke={color} strokeWidth="0.5" />
        <path d="M-30 300C50 280 100 180 180 200C260 220 280 350 320 380" stroke={color} strokeWidth="0.5" />
        <path d="M250 -10C220 80 140 120 160 220C180 320 320 300 350 250" stroke={color} strokeWidth="0.5" />
      </g>
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="gr" style={{ paddingTop: 96, paddingBottom: 80, overflow: 'hidden', position: 'relative' }}>
        {/* Decorative background waves */}
        <div style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
          <WaveLines className="h-full w-full" color="var(--border-nav)" />
        </div>

        <div className="gi" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
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
        <div className="gi">
          <ProcessMapHero />
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
          <div style={{ textAlign: 'center', marginBottom: 'var(--sp-6)' }}>
            <span className="eyebrow eyebrow-bracket">Timeline</span>
            <h2 className="type-h2" style={{ marginTop: 'var(--sp-3)' }}>
              From event log to <em>actionable insight</em>
            </h2>
            <p className="type-body" style={{ maxWidth: 480, margin: '0 auto', marginTop: 'var(--sp-3)', color: 'var(--ink-mid)' }}>
              Process intelligence shouldn&apos;t take months to implement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 'var(--sp-4)' }}>
            {[
              { phase: 'Day 1', title: 'Answers in minutes', desc: 'Connect your ERP or ITSM system. See your first process map within the hour.' },
              { phase: 'Week 1', title: 'Share with your team', desc: 'Roll out dashboards to operations leads. Self-serve process insights without analyst back-and-forth.' },
              { phase: 'Month 1', title: 'Full process intelligence', desc: 'Conformance checking, bottleneck prediction, and automated alerts across all your workflows.' },
            ].map((t) => (
              <div key={t.phase} className="card-feature" style={{ padding: 'var(--sp-5)' }}>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--emerald)', fontWeight: 500 }}>{t.phase}</span>
                <h3 className="type-h3" style={{ marginTop: 'var(--sp-2)' }}>{t.title}</h3>
                <p className="type-body" style={{ marginTop: 'var(--sp-3)', color: 'var(--ink-mid)' }}>{t.desc}</p>
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

      <div className="ascii-divider">&middot; &middot; &middot;   &middot; &middot; &middot;   &middot; &middot; &middot;</div>

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
              { title: 'Order-to-Cash', desc: 'Find where invoices stall. Reduce DSO by mapping every step from order entry to payment.', anchor: '#o2c' },
              { title: 'Procure-to-Pay', desc: 'Spot maverick buying and duplicate payments. See exactly where procurement deviates from policy.', anchor: '#p2p' },
              { title: 'IT Service Management', desc: 'Map ticket lifecycles from creation to resolution. Cut escalation bounces.', anchor: '#itsm' },
              { title: 'Patient Journey', desc: 'Track patient flow through clinical pathways. Identify wait-time hotspots and care gaps.', anchor: '#healthcare' },
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

      {/* ── Mission ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)', maxWidth: 680, margin: '0 auto' }}>
          <div className="card-feature" style={{ padding: 'var(--sp-6)', textAlign: 'center' }}>
            <blockquote style={{ fontFamily: 'var(--caslon)', fontSize: 'var(--fs-lg)', fontStyle: 'italic', color: 'var(--emerald)', lineHeight: 1.6 }}>
              &ldquo;Every organization has a process diagram on the wall. None of them match reality.
              We built Meridian to close that gap.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="cta-band" style={{ overflow: 'hidden', position: 'relative' }}>
        {/* Wave texture on dark bg */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: '60%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
          <WaveLines className="h-full w-full" color="rgba(255,255,255,0.08)" />
        </div>

        <div className="gi" style={{ textAlign: 'center', padding: 'var(--sp-7) 0', position: 'relative', zIndex: 1 }}>
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
