import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
};

export default function PrivacyPage() {
  return (
    <section className="py-24 md:py-32">
      <Container size="content">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-neutral-400">
          Last updated: February 2026
        </p>

        <div className="prose mt-12">
          <h2>1. Information We Collect</h2>
          <p>
            Replace this section with your actual privacy policy content. Describe
            what personal data you collect and how.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            Describe how collected information is used — service delivery,
            analytics, communications, etc.
          </p>

          <h2>3. Data Sharing</h2>
          <p>
            Explain under what circumstances data may be shared with third
            parties.
          </p>

          <h2>4. Data Security</h2>
          <p>
            Describe the security measures in place to protect user data.
          </p>

          <h2>5. Contact</h2>
          <p>
            If you have questions about this policy, contact us at{" "}
            <a href="mailto:privacy@yoursite.com">privacy@yoursite.com</a>.
          </p>
        </div>
      </Container>
    </section>
  );
}
