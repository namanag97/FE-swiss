import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Lock, Server, Eye, FileCheck, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Security",
  description: "Enterprise-grade security and compliance. SOC 2 Type II, GDPR, HIPAA ready.",
  alternates: { canonical: "/security" },
  openGraph: { images: ["/og.png"] },
};

const items = [
  { icon: Shield, title: "SOC 2 Type II", desc: "Independently audited. Controls for security, availability, and confidentiality verified annually." },
  { icon: Lock, title: "Encryption", desc: "AES-256 at rest, TLS 1.3 in transit. Encryption keys managed per-tenant with automatic rotation." },
  { icon: Server, title: "Infrastructure", desc: "Hosted on AWS/GCP with multi-region redundancy. Data stored in your region of choice." },
  { icon: Eye, title: "Access Controls", desc: "Role-based access, SSO/SAML, audit logs for every action. Enforce least-privilege." },
  { icon: FileCheck, title: "Compliance", desc: "GDPR compliant with DPA available. HIPAA-ready for healthcare. Custom BAAs on request." },
  { icon: Users, title: "Data Ownership", desc: "Your data is yours. We never access, share, or train models on customer data." },
];

export default function SecurityPage() {
  return (
    <>
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-7) var(--sp-5) var(--sp-6)' }}>
          <span className="eyebrow eyebrow-bracket">Security</span>
          <h1 className="type-display" style={{ marginTop: 'var(--sp-4)', maxWidth: 680 }}>
            Enterprise-grade security and <em>compliance</em>
          </h1>
          <p className="type-body" style={{ marginTop: 'var(--sp-4)' }}>
            Your process data is some of the most sensitive data in your organization. We treat it that way.
          </p>
        </div>
      </section>

      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-7) var(--sp-5)' }}>
          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div key={item.title} className="card-feature">
                <div className="card-icon">
                  <item.icon style={{ width: 16, height: 16 }} />
                </div>
                <p className="card-title">{item.title}</p>
                <p className="card-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-6) var(--sp-5)' }}>
          <div className="grid gap-0 md:grid-cols-3">
            {[
              { label: "Uptime SLA", value: "99.9%" },
              { label: "Data retention", value: "You control" },
              { label: "Pen tests", value: "Annual + on request" },
            ].map((s) => (
              <div key={s.label} className="card-stat" style={{ textAlign: 'center' }}>
                <span className="type-label">{s.label}</span>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xl)', fontWeight: 400, letterSpacing: '-.03em', color: 'var(--ink-dark)' }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <h2>Need more <em>details</em>?</h2>
        <p>We&apos;re happy to share our SOC 2 report, complete a security questionnaire, or schedule a call.</p>
        <Link href="/contact" className="btn btn-primary">
          Contact us <ArrowRight style={{ width: 12, height: 12 }} />
        </Link>
      </section>
    </>
  );
}
