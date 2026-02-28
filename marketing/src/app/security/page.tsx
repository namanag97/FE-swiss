import Link from "next/link";
import type { Metadata } from "next";
import { Shield, Lock, Server, Key, FileCheck, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Security",
  description: "Enterprise-grade security for your process data. SOC 2 Type II, encryption, and full data ownership.",
  alternates: { canonical: "/security" },
  openGraph: { images: ["/og.png"] },
};

export default function SecurityPage() {
  return (
    <>
      {/* Hero */}
      <section className="gr" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
        <div className="gi" style={{ textAlign: 'center' }}>
          <span className="eyebrow eyebrow-bracket">Security</span>
          <h1 className="type-display" style={{ marginTop: 'var(--sp-3)' }}>
            Enterprise-grade <em>security</em>
          </h1>
          <p className="type-body" style={{ maxWidth: 560, margin: '0 auto', marginTop: 'var(--sp-4)', color: 'var(--ink-mid)' }}>
            Your process data is sensitive. We treat it that way. Every layer of the
            platform is built with security as a first-class requirement.
          </p>
        </div>
      </section>

      {/* Architecture ASCII */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-6) 0' }}>
          <div className="ascii-frame" style={{ maxWidth: 680, margin: '0 auto' }}>
            <pre className="ascii-art" style={{ margin: 0, textAlign: 'center' }}>
{`  SECURITY ARCHITECTURE

  ┌─────────────────────────────────────────┐
  │              CLIENT LAYER                │
  │   TLS 1.3 · CSP · HSTS · SRI           │
  ├─────────────────────────────────────────┤
  │              API GATEWAY                 │
  │   Rate limiting · JWT · RBAC            │
  ├─────────────────────────────────────────┤
  │           APPLICATION LAYER              │
  │   Isolated VPC · WAF · IDS              │
  ├─────────────────────────────────────────┤
  │              DATA LAYER                  │
  │   AES-256 at rest · TLS in transit      │
  │   Customer-managed keys available       │
  ├─────────────────────────────────────────┤
  │            INFRASTRUCTURE                │
  │   AWS · SOC 2 · Multi-AZ · Backups     │
  └─────────────────────────────────────────┘`}
            </pre>
          </div>
        </div>
      </section>

      <div className="ascii-divider">&middot; &middot; &middot;   &middot; &middot; &middot;   &middot; &middot; &middot;</div>

      {/* Security Features Grid */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
          <div className="security-grid">
            {[
              { icon: Shield, title: 'SOC 2 Type II', desc: 'Annual audits by independent assessors. Controls verified for security, availability, and confidentiality.' },
              { icon: Lock, title: 'Encryption', desc: 'AES-256 encryption at rest. TLS 1.3 in transit. Customer-managed encryption keys available on Enterprise.' },
              { icon: Server, title: 'Infrastructure', desc: 'Hosted on AWS with isolated VPCs, multi-AZ deployment, automated backups, and 99.9% uptime SLA.' },
              { icon: Key, title: 'Access Controls', desc: 'Role-based access control, SSO (SAML 2.0, OIDC), multi-factor authentication, and audit logging.' },
              { icon: FileCheck, title: 'Compliance', desc: 'GDPR compliant. HIPAA-ready with BAA. ISO 27001 aligned. Annual penetration testing by third parties.' },
              { icon: Database, title: 'Data Ownership', desc: 'You own your data. Full export at any time. Data deletion on request. No vendor lock-in.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-feature" style={{ padding: 'var(--sp-5)' }}>
                <div style={{ width: 32, height: 32, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--sp-3)' }}>
                  <Icon style={{ width: 16, height: 16, color: 'var(--ink-muted)' }} />
                </div>
                <h3 className="type-h3">{title}</h3>
                <p className="type-body" style={{ marginTop: 'var(--sp-2)', color: 'var(--ink-mid)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi security-stats" style={{ padding: 'var(--sp-6) 0', textAlign: 'center' }}>
          {[
            { value: '99.9%', label: 'Uptime SLA' },
            { value: 'You control', label: 'Data retention' },
            { value: 'Annual', label: 'Penetration tests' },
          ].map((stat) => (
            <div key={stat.label}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-2xl)', fontWeight: 300, color: 'var(--ink-dark)' }}>{stat.value}</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', color: 'var(--ink-muted)', marginTop: 'var(--sp-2)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <h2>Security <em>questions?</em></h2>
        <p>
          Contact our security team for detailed documentation, SOC 2 reports, or custom assessments.
        </p>
        <Link href="/contact" className="btn btn-primary">Contact Security Team</Link>
      </section>
    </>
  );
}
