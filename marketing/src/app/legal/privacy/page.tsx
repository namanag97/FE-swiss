import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/legal/privacy" },
  openGraph: { images: ["/og.png"] },
};

export default function PrivacyPage() {
  return (
    <section className="gr">
      <Container size="content" style={{ padding: 'var(--sp-7) var(--sp-5)' } as React.CSSProperties}>
        <span className="eyebrow eyebrow-bracket">Legal</span>
        <h1 className="type-h2" style={{ marginTop: 'var(--sp-3)' }}>Privacy Policy</h1>
        <p className="type-label" style={{ marginTop: 'var(--sp-2)' }}>Last updated February 2026</p>
        <div className="prose mt-8">
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly — name, email, company — when you create an account, fill out a form, or contact us. We also collect usage data automatically through analytics.</p>
          <h2>2. How We Use Your Information</h2>
          <p>We use your data to provide and improve our services, communicate with you, and ensure security. We never sell your personal data.</p>
          <h2>3. Data Security</h2>
          <p>We use encryption at rest and in transit, conduct regular security audits, and maintain SOC 2 Type II compliant infrastructure.</p>
          <h2>4. Your Rights</h2>
          <p>You can access, update, or delete your data at any time. Contact <a href="mailto:privacy@meridian.dev">privacy@meridian.dev</a>.</p>
        </div>
      </Container>
    </section>
  );
}
