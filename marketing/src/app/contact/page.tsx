import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Mail, Shield, FileText } from "lucide-react";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact — Request Early Access",
  description: "Request early access to Sancalana. Tell us your systems, your process, and where the drag lives.",
  alternates: { canonical: "/contact" },
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
              Map one process with <em>us</em>
            </h1>
            <p className="type-body mt-4 text-mid">
              Bring the systems you run, the process you want to understand, and
              the KPI that is off. We will help decide whether the next step is a
              data review, process map, or live walkthrough.
            </p>

            <div className="flex flex-col gap-[var(--sp-4)] mt-[var(--sp-6)]">
              {[
                { icon: CalendarDays, title: "Book a walkthrough", desc: "Use the scheduler if you already know the process" },
                { icon: FileText, title: "What to include", desc: "Systems, workflow, KPI pain, and owner" },
                { icon: Mail, title: "hello@sancalana.com", desc: "Send the same brief directly to the team" },
                { icon: Shield, title: "security@sancalana.com", desc: "Security and diligence questions" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-[var(--sp-3)] items-start">
                  <div className="card-icon shrink-0">
                    <Icon className="w-3.5 h-3.5 text-[color:var(--ink)] opacity-60" />
                  </div>
                  <div>
                    <p className="card-title">{title}</p>
                    <p className="type-label">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* What to expect */}
            <div className="mt-[var(--sp-6)] p-[var(--sp-5)] border border-[var(--border)]">
              <p className="type-label mb-[var(--sp-3)]">Good first calls are specific</p>
              <p className="type-body-sm text-mid">
                The fastest path is one real workflow: procure-to-pay, incident
                management, order-to-cash, or migration readiness. We do not need
                a polished requirements deck.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[var(--sp-5)]">
            <ContactForm />

            <div className="border border-[var(--border)] p-[var(--sp-5)] flex flex-col gap-[var(--sp-4)] bg-[var(--white)]">
              <div>
                <p className="type-label">Already ready?</p>
                <h2 className="type-h3 mt-[var(--sp-2)]">Book the call directly</h2>
                <p className="type-body mt-[var(--sp-3)] text-mid">
                  Pick a time if you can name the source systems and the first workflow. The form above is better if the scope still needs shaping.
                </p>
              </div>
              <a
                href={siteConfig.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                data-track="calendar_direct_opened"
                data-track-location="contact-page"
              >
                Open scheduler
              </a>
              <Link href="/platform" className="btn btn-ghost text-center" data-track="contact_platform_clicked" data-track-location="contact-page">
                See the product
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="gi mt-[var(--sp-7)]">
        <div className="border-t border-[var(--border)] pt-[var(--sp-6)]">
          <p className="type-label mb-[var(--sp-4)]">Scheduler</p>
          <CalendlyEmbed />
        </div>
      </div>
    </section>
  );
}
