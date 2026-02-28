import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <section className="py-24 md:py-28">
      <Container size="content">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-600">Legal</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900">Terms of Service</h1>
        <p className="mt-2 text-sm text-neutral-400">Last updated: February 2026</p>
        <div className="prose mt-10">
          <h2>1. Acceptance of Terms</h2>
          <p>By using {siteConfig.name}, you agree to these terms. If you do not agree, do not use the service.</p>
          <h2>2. Use of Service</h2>
          <p>You may use the service for lawful purposes. You are responsible for maintaining the security of your account credentials.</p>
          <h2>3. Intellectual Property</h2>
          <p>The service, including all code, designs, and documentation, is owned by {siteConfig.name}. You retain ownership of your data.</p>
          <h2>4. Service Availability</h2>
          <p>We target 99.99% uptime. Enterprise plans include an SLA with financial credits for downtime.</p>
          <h2>5. Limitation of Liability</h2>
          <p>Our liability is limited to the fees you paid in the 12 months preceding the claim.</p>
          <h2>6. Contact</h2>
          <p>Questions? Contact <a href="mailto:legal@yoursite.com">legal@yoursite.com</a>.</p>
        </div>
      </Container>
    </section>
  );
}
