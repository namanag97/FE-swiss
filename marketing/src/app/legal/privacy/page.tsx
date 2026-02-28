import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
};

export default function PrivacyPage() {
  return (
    <section className="py-24 md:py-28">
      <Container size="content">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-600">Legal</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900">Privacy Policy</h1>
        <p className="mt-2 text-sm text-neutral-400">Last updated: February 2026</p>
        <div className="prose mt-10">
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly — name, email, company — when you create an account, fill out a form, or contact us. We also collect usage data automatically through cookies and analytics.</p>
          <h2>2. How We Use Your Information</h2>
          <p>We use your data to provide and improve our services, communicate with you, and ensure security. We never sell your personal data.</p>
          <h2>3. Data Sharing</h2>
          <p>We share data only with service providers who help us operate (hosting, analytics, support). All providers are contractually bound to protect your data.</p>
          <h2>4. Data Security</h2>
          <p>We use industry-standard encryption (TLS 1.3, AES-256 at rest), regular security audits, and SOC 2 Type II certified infrastructure.</p>
          <h2>5. Your Rights</h2>
          <p>You can access, update, or delete your data at any time. Contact <a href="mailto:privacy@yoursite.com">privacy@yoursite.com</a> for requests.</p>
        </div>
      </Container>
    </section>
  );
}
