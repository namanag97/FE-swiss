import { Mail, Clock, Shield } from "lucide-react";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";

export default function ContactPage() {
  return (
    <section className="gr" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
      <div className="gi">
        <div className="contact-split">
          {/* Left: Hero + Value Props */}
          <div>
            <span className="eyebrow eyebrow-bracket">Contact</span>
            <h1 className="type-display" style={{ marginTop: 'var(--sp-3)' }}>
              Book a <em>demo</em>
            </h1>
            <p className="type-body" style={{ marginTop: 'var(--sp-4)', color: 'var(--ink-mid)' }}>
              Whether you&apos;re exploring process mining for the first time or ready to deploy
              at scale, we&apos;d love to hear from you.
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

            {/* Value prop */}
            <div style={{ marginTop: 'var(--sp-6)', padding: 'var(--sp-5)', border: '1px solid var(--border)' }}>
              <p style={{ fontFamily: 'var(--caslon)', fontStyle: 'italic', color: 'var(--emerald)', lineHeight: 1.6 }}>
                &ldquo;We built Meridian for operations teams who are tired of guessing where
                their processes break down.&rdquo;
              </p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', color: 'var(--ink-muted)', marginTop: 'var(--sp-3)' }}>
                — The Meridian Team
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
