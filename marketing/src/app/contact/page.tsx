import type { Metadata } from "next";
import { Mail, Clock, Shield } from "lucide-react";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";

export const metadata: Metadata = {
  title: "Contact — Request Early Access",
  description: "Book a call with the Meridian team. We'll map your process live and show you what's hiding in your data.",
  alternates: { canonical: "/contact" },
  openGraph: { images: ["/og.png"] },
};

export default function ContactPage() {
  return (
    <section className="gr section-pad">
      <div className="gi">
        <div className="contact-split">
          {/* Left: Hero + Value Props */}
          <div>
            <span className="eyebrow eyebrow-bracket">Early access</span>
            <h1 className="type-display mt-3">
              Get <em>early access</em>
            </h1>
            <p className="type-body mt-4 text-mid">
              We&apos;re onboarding design partners now. Book a call and tell us
              what processes you want to see.
            </p>

            <div className="flex flex-col gap-[var(--sp-4)] mt-[var(--sp-6)]">
              {[
                { icon: Mail, title: 'hello@meridian.dev', desc: 'General inquiries' },
                { icon: Clock, title: '30-minute walkthrough', desc: 'We map your process live on the call' },
                { icon: Shield, title: 'security@meridian.dev', desc: 'Security inquiries' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-[var(--sp-3)] items-start">
                  <div className="card-icon shrink-0">
                    <Icon className="w-3.5 h-3.5 text-[color:var(--ink-muted)]" />
                  </div>
                  <div>
                    <p className="card-title">{title}</p>
                    <p className="type-label">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* What to expect */}
            <div className="mt-6 p-[var(--sp-5)] border border-[var(--border)]">
              <p className="type-label mb-[var(--sp-3)]">
                What to expect
              </p>
              <p className="type-body-sm text-mid">
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
