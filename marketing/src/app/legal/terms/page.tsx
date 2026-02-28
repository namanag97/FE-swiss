import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: "/legal/terms" },
  openGraph: { images: ["/og.png"] },
};

export default function TermsPage() {
  return (
    <section className="gr">
      <Container size="content" style={{ padding: 'var(--sp-7) var(--sp-5)' } as React.CSSProperties}>
        <span className="eyebrow eyebrow-bracket">Legal</span>
        <h1 className="type-h2" style={{ marginTop: 'var(--sp-3)' }}>Terms of Service</h1>
        <p className="type-label" style={{ marginTop: 'var(--sp-2)' }}>Last updated February 2026</p>
        <div className="prose mt-8">
          <h2>1. Acceptance of Terms</h2>
          <p>By using Meridian, you agree to these terms. If you do not agree, do not use the service.</p>
          <h2>2. Use of Service</h2>
          <p>You may use the service for lawful purposes. You are responsible for maintaining the security of your account.</p>
          <h2>3. Data Ownership</h2>
          <p>You retain full ownership of your data. We do not access, share, or use your data for purposes other than providing the service.</p>
          <h2>4. Service Availability</h2>
          <p>We target 99.9% uptime. Enterprise plans include an SLA with financial credits for downtime.</p>
          <h2>5. Contact</h2>
          <p>Questions? Contact <a href="mailto:legal@meridian.dev">legal@meridian.dev</a>.</p>
        </div>
      </Container>
    </section>
  );
}
