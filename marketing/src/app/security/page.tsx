import Link from "next/link";
import type { Metadata } from "next";
import { Shield, Lock, Server, Key, FileCheck, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Security — SOC 2, Encryption & Data Ownership",
  description: "Your data stays yours. SOC 2 Type II, AES-256 encryption, customer-managed keys, and full data ownership. Built for enterprise process data.",
  alternates: { canonical: "/security" },
  openGraph: { images: ["/og.png"] },
};

const C = {
  dark: "#072A20",
  text: "#1a2f28",
  mid: "#4a6259",
  muted: "#7a8f85",
  faint: "#a3b3ab",
  green: "#047A55",
  greenLight: "#e8f5ef",
  border: "#dde3e0",
  white: "#ffffff",
  bg: "#FAFBF8",
} as const;

function SecurityArchSvg() {
  const lx = 24;
  const rw = 472;
  const layers = [
    { label: "CLIENT LAYER", detail: "TLS 1.3 · CSP · HSTS · SRI", fill: C.white },
    { label: "API GATEWAY", detail: "Rate limiting · JWT · RBAC", fill: C.white },
    { label: "APPLICATION LAYER", detail: "Isolated VPC · WAF · IDS", fill: C.greenLight },
    { label: "DATA LAYER", detail: "AES-256 at rest · TLS in transit · Customer-managed keys", fill: C.white },
    { label: "INFRASTRUCTURE", detail: "AWS · SOC 2 · Multi-AZ · Automated backups", fill: C.bg },
  ];

  return (
    <svg viewBox="0 0 520 320" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Security architecture: client layer with TLS, API gateway with RBAC, application layer with VPC, data layer with AES-256, and AWS infrastructure" style={{ width: "100%", height: "auto" }}>
      {/* Title */}
      <text x={260} y={20} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1.5}>SECURITY ARCHITECTURE</text>

      {/* Shield icon */}
      <rect x={240} y={28} width={40} height={36} rx={2} fill={C.greenLight} stroke={C.green} />
      <text x={260} y={50} textAnchor="middle" fontSize={16} fill={C.green}>🛡</text>

      {/* Layers */}
      {layers.map((layer, i) => {
        const y = 76 + i * 48;
        const isGreen = i === 2;
        return (
          <g key={layer.label}>
            <rect x={lx} y={y} width={rw} height={40} rx={2} fill={layer.fill} stroke={isGreen ? C.green : C.border} strokeWidth={isGreen ? 1.5 : 1} />
            <text x={lx + 16} y={y + 18} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={isGreen ? C.green : C.muted} letterSpacing={1}>{layer.label}</text>
            <text x={lx + 16} y={y + 32} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.mid}>{layer.detail}</text>
            {i < layers.length - 1 && (
              <line x1={260} y1={y + 40} x2={260} y2={y + 48} stroke={C.muted} strokeWidth={1} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function SecurityPage() {
  return (
    <>
      {/* Hero */}
      <section className="gr" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
        <div className="gi" style={{ textAlign: "center" }}>
          <span className="eyebrow eyebrow-bracket">Security</span>
          <h1 className="type-display" style={{ marginTop: "var(--sp-3)" }}>
            Your data stays <em>yours</em>
          </h1>
          <p className="type-body" style={{ maxWidth: 560, margin: "0 auto", marginTop: "var(--sp-4)", color: "var(--ink-mid)" }}>
            Process data is sensitive — it maps how your entire business operates.
            Every layer of Meridian is built with that reality in mind.
          </p>
        </div>
      </section>

      {/* Architecture SVG */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: "var(--sp-6) 0" }}>
          <div style={{ maxWidth: 680, margin: "0 auto", border: "1px solid var(--border)", padding: "var(--sp-4)", background: "var(--bg)" }}>
            <SecurityArchSvg />
          </div>
        </div>
      </section>

      {/* Security Features Grid */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
          <div className="security-grid">
            {[
              { icon: Shield, title: "SOC 2 Type II", desc: "Annual audits by independent assessors. Controls verified for security, availability, and confidentiality." },
              { icon: Lock, title: "Encryption", desc: "AES-256 encryption at rest. TLS 1.3 in transit. Customer-managed encryption keys available on Enterprise." },
              { icon: Server, title: "Infrastructure", desc: "Hosted on AWS with isolated VPCs, multi-AZ deployment, automated backups, and 99.9% uptime SLA." },
              { icon: Key, title: "Access Controls", desc: "Role-based access control, SSO (SAML 2.0, OIDC), multi-factor authentication, and audit logging." },
              { icon: FileCheck, title: "Compliance", desc: "GDPR compliant. HIPAA-ready with BAA. ISO 27001 aligned. Annual penetration testing by third parties." },
              { icon: Database, title: "Data Ownership", desc: "You own your data. Full export at any time. Data deletion on request. No vendor lock-in." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-feature" style={{ padding: "var(--sp-5)" }}>
                <div style={{ width: 32, height: 32, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "var(--sp-3)" }}>
                  <Icon style={{ width: 16, height: 16, color: "var(--ink-muted)" }} />
                </div>
                <h3 className="type-h3">{title}</h3>
                <p className="type-body" style={{ marginTop: "var(--sp-2)", color: "var(--ink-mid)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi security-stats" style={{ padding: "var(--sp-6) 0", textAlign: "center" }}>
          {[
            { value: "99.9%", label: "Uptime SLA" },
            { value: "You control", label: "Data retention" },
            { value: "Annual", label: "Penetration tests" },
          ].map((stat) => (
            <div key={stat.label}>
              <p style={{ fontFamily: "var(--sans)", fontSize: "var(--fs-2xl)", fontWeight: 300, color: "var(--ink-dark)" }}>{stat.value}</p>
              <p style={{ fontFamily: "var(--sans)", fontSize: "var(--fs-xs)", color: "var(--ink-muted)", marginTop: "var(--sp-2)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gr">
        <div className="gi" style={{ padding: "var(--sp-5) 0", display: "flex", justifyContent: "center", gap: "var(--sp-5)", flexWrap: "wrap" }}>
          <Link href="/legal/privacy" style={{ fontFamily: "var(--sans)", fontSize: "var(--fs-xs)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--emerald)" }}>Privacy Policy &rarr;</Link>
          <Link href="/legal/terms" style={{ fontFamily: "var(--sans)", fontSize: "var(--fs-xs)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--emerald)" }}>Terms of Service &rarr;</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="gi" style={{ textAlign: "center", padding: "var(--sp-7) 0" }}>
          <h2 className="type-h2" style={{ color: "var(--white)" }}>
            Need more <em>detail?</em>
          </h2>
          <p style={{ fontFamily: "var(--body)", color: "rgba(255,255,255,0.7)", maxWidth: 480, margin: "0 auto", marginTop: "var(--sp-4)" }}>
            We&apos;re happy to share SOC 2 reports, answer security questionnaires,
            or walk through our architecture with your team.
          </p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--sp-5)" }}>
            <Link href="/contact" className="btn btn-primary" style={{ background: "var(--white)", color: "var(--ink-dark)", borderColor: "var(--white)" }}>Get Early Access</Link>
          </div>
        </div>
      </section>
    </>
  );
}
