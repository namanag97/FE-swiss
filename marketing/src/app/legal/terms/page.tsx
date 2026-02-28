import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <section className="py-24 md:py-32">
      <Container size="content">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-neutral-400">
          Last updated: February 2026
        </p>

        <div className="prose mt-12">
          <h2>1. Acceptance of Terms</h2>
          <p>
            Replace this section with your actual terms of service. By using
            {siteConfig.name}, you agree to these terms.
          </p>

          <h2>2. Use of Service</h2>
          <p>
            Describe acceptable use, account responsibilities, and restrictions.
          </p>

          <h2>3. Intellectual Property</h2>
          <p>
            Describe ownership of content, trademarks, and user-generated
            content rights.
          </p>

          <h2>4. Limitation of Liability</h2>
          <p>
            Standard limitation of liability clause goes here.
          </p>

          <h2>5. Contact</h2>
          <p>
            Questions? Contact us at{" "}
            <a href="mailto:legal@yoursite.com">legal@yoursite.com</a>.
          </p>
        </div>
      </Container>
    </section>
  );
}
