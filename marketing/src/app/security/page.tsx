import Link from "next/link";
import type { Metadata } from "next";
import { Shield, Lock, Server, Key, FileCheck, Database } from "lucide-react";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { SecurityArchSvg } from "@/components/illustrations";

export const metadata: Metadata = {
  title: "Security — SOC 2, Encryption & Data Ownership",
  description: "Your data stays yours. SOC 2 Type II, AES-256 encryption, customer-managed keys, and full data ownership. Built for enterprise process data.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Security"
        heading={<>Your data stays <em>yours</em></>}
        description="Process data is sensitive — it maps how your entire business operates. Every layer of Meridian is built with that reality in mind."
      />

      {/* Architecture SVG */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section-pad-sm">
          <div className="illustration-frame-lg">
            <SecurityArchSvg />
          </div>
        </div>
      </section>

      {/* Security Features Grid */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section-pad">
          <div className="security-grid">
            {[
              { icon: Shield, title: "SOC 2 Type II", desc: "Audit in progress. Designed from day one around SOC 2 controls for security, availability, and confidentiality." },
              { icon: Lock, title: "Encryption", desc: "AES-256 encryption at rest. TLS 1.3 in transit. Customer-managed encryption keys planned for Enterprise tier." },
              { icon: Server, title: "Infrastructure", desc: "Hosted on AWS with isolated VPCs, multi-AZ deployment, and automated backups. Targeting 99.9% uptime SLA at GA." },
              { icon: Key, title: "Access Controls", desc: "Role-based access control, SSO (SAML 2.0, OIDC), multi-factor authentication, and audit logging." },
              { icon: FileCheck, title: "Compliance", desc: "GDPR compliant. HIPAA readiness in progress. ISO 27001 aligned. Annual penetration testing planned." },
              { icon: Database, title: "Data Ownership", desc: "You own your data. Full export at any time. Data deletion on request. No vendor lock-in." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-feature">
                <div className="card-icon mb-[var(--sp-3)]">
                  <Icon className="w-4 h-4 text-[color:var(--ink)] opacity-60" />
                </div>
                <h3 className="type-h3">{title}</h3>
                <p className="type-body mt-[var(--sp-2)] text-mid">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi security-stats section-pad-sm text-center">
          {[
            { value: "99.9%", label: "Uptime target" },
            { value: "You control", label: "Data retention" },
            { value: "Planned", label: "Annual pen tests" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gr">
        <div className="gi py-[var(--sp-5)] flex justify-center gap-[var(--sp-5)] flex-wrap">
          <Link href="/legal/privacy" className="type-label text-[color:var(--emerald)]">Privacy Policy &rarr;</Link>
          <Link href="/legal/terms" className="type-label text-[color:var(--emerald)]">Terms of Service &rarr;</Link>
        </div>
      </section>

      {/* CTA */}
      <CtaBand
        heading={<>Need more <em>detail?</em></>}
        description="We're happy to share SOC 2 reports, answer security questionnaires, or walk through our architecture with your team."
      />
    </>
  );
}
