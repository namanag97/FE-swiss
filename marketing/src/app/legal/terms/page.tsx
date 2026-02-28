import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <section className="py-20 md:py-24">
      <Container size="content">
        <p className="text-[11px] font-medium uppercase tracking-widest text-terra-600">Legal</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-sand-900">Terms of Service</h1>
        <p className="mt-1 text-[13px] text-sand-400">Last updated February 2026</p>
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
