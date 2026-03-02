import { Mail, Clock, Shield } from "lucide-react";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";

export default function ContactPage() {
  return (
    <section className="gr" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
      <div className="gi">
        <div className="contact-split">
          {/* Left: Hero + Value Props */}
          <div>
            <span className="eyebrow eyebrow-bracket">Early access</span>
            <h1 className="type-display" style={{ marginTop: 'var(--sp-3)' }}>
              Get <em>early access</em>
            </h1>
            <p className="type-body" style={{ marginTop: 'var(--sp-4)', color: 'var(--ink-mid)' }}>
              We&apos;re onboarding design partners now. Book a call and tell us
              what processes you want to see.
            </p>

            <div style={{ marginTop: 'var(--sp-6)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
              {[
                { icon: Mail, title: 'hello@meridian.dev', desc: 'General inquiries' },
                { icon: Clock, title: '30-minute walkthrough', desc: 'Live demo of your use case' },
                { icon: Shield, title: 'security@meridian.dev', desc: 'Security inquiries' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'start' }}>
                  <div style={{ width: 32, height: 32, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon style={{ width: 14, height: 14, color: 'var(--ink-muted)' }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-sm)', fontWeight: 500, color: 'var(--ink)' }}>{title}</p>
                    <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', color: 'var(--ink-muted)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* What to expect */}
            <div style={{ marginTop: 'var(--sp-6)', padding: 'var(--sp-5)', border: '1px solid var(--border)' }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 'var(--sp-3)' }}>
                What to expect
              </p>
              <p style={{ fontFamily: 'var(--body)', fontSize: 'var(--fs-sm)', color: 'var(--ink-mid)', lineHeight: 1.6 }}>
                Tell us what systems you run (SAP, Oracle, ServiceNow, etc.) and
                which processes matter most to you. We&apos;ll walk you through how
                Meridian maps them — and what it finds.
              </p>
            </div>
          </div>

          {/* Right: Calendly */}
          <div>
            <CalendlyEmbed />
          </div>
        </div>
      </div>
    </section>
  );
}
