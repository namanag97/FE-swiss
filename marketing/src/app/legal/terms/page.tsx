import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing your use of the Meridian platform and services.",
  alternates: { canonical: "/legal/terms" },
  openGraph: { images: ["/og.png"] },
};

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "description", title: "2. Service Description" },
  { id: "account", title: "3. Account Terms" },
  { id: "data", title: "4. Data Ownership & Processing" },
  { id: "availability", title: "5. Service Availability & SLA" },
  { id: "use", title: "6. Acceptable Use" },
  { id: "liability", title: "7. Limitation of Liability" },
  { id: "termination", title: "8. Termination" },
  { id: "changes", title: "9. Changes to Terms" },
  { id: "contact", title: "10. Contact" },
];

export default function TermsPage() {
  return (
    <section className="gr" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
      <div className="gi">
        {/* Header */}
        <div style={{ marginBottom: 'var(--sp-6)' }}>
          <span className="eyebrow eyebrow-bracket">Legal</span>
          <h1 className="type-h2" style={{ marginTop: 'var(--sp-3)' }}>
            Terms of <em>Service</em>
          </h1>
          <p className="type-label" style={{ marginTop: 'var(--sp-2)' }}>Last updated February 2026</p>
        </div>

        {/* Two-column layout: ToC + Content */}
        <div className="legal-layout">
          {/* Left: Table of Contents */}
          <nav className="legal-toc" style={{ position: 'sticky', top: 80, alignSelf: 'start' }}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 'var(--sp-3)' }}>Contents</p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    style={{ fontFamily: 'var(--body)', fontSize: 'var(--fs-sm)', color: 'var(--ink-muted)', textDecoration: 'none', transition: 'color var(--t-fast)' }}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: Content */}
          <div className="prose">
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Meridian platform and
              related services. By accessing or using our services, you agree to be bound by these Terms.
              Please read them carefully.
            </p>

            <h2 id="acceptance">1. Acceptance of Terms</h2>
            <p>
              By creating an account or using any part of the Meridian platform, you confirm that you have
              read, understood, and agree to these Terms and our Privacy Policy. If you are using Meridian on
              behalf of an organization, you represent that you have the authority to bind that organization to
              these Terms. If you do not agree with any provision, you must discontinue use of the service
              immediately.
            </p>

            <h2 id="description">2. Service Description</h2>
            <p>
              Meridian provides a process intelligence platform that enables organizations to analyze, monitor,
              and optimize their business processes through data-driven insights. The service includes process
              mining, conformance checking, analytics dashboards, automation workflows, and related tools. We
              reserve the right to modify, enhance, or discontinue features with reasonable notice. New features
              may be subject to additional terms which will be presented at the time of activation.
            </p>

            <h2 id="account">3. Account Terms</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all
              activity that occurs under your account. You must provide accurate, current, and complete
              registration information and keep it updated. You agree to notify us immediately of any
              unauthorized access or use of your account. We reserve the right to suspend accounts that
              violate these Terms or that show signs of unauthorized access. One person or bot may not maintain
              more than one free account.
            </p>

            <h2 id="data">4. Data Ownership &amp; Processing</h2>
            <p>
              You retain all rights, title, and interest in the data you upload to or generate through the
              platform (&quot;Customer Data&quot;). We process Customer Data solely to provide the services you have
              requested and in accordance with our Data Processing Agreement. We do not access, use, or share
              Customer Data for any purpose other than service delivery, unless required by law. You may export
              or delete your Customer Data at any time through the platform interface. Upon termination, we will
              delete your Customer Data within 30 days unless a longer retention period is required by law.
            </p>

            <h2 id="availability">5. Service Availability &amp; SLA</h2>
            <p>
              We target 99.9% uptime for the Meridian platform, measured on a monthly basis excluding scheduled
              maintenance windows. Enterprise plan customers receive a formal Service Level Agreement with
              financial credits for downtime exceeding the guaranteed threshold. Scheduled maintenance is
              performed during off-peak hours with at least 48 hours&apos; notice. We will use commercially
              reasonable efforts to minimize disruption, but we do not guarantee uninterrupted service. Status
              updates are available at our public status page.
            </p>

            <h2 id="use">6. Acceptable Use</h2>
            <p>
              You agree to use Meridian only for lawful purposes and in compliance with all applicable laws and
              regulations. You may not attempt to gain unauthorized access to any part of the service, interfere
              with or disrupt the platform or its infrastructure, reverse-engineer or decompile any part of the
              software, or use the service to store or transmit malicious code. You are responsible for ensuring
              that all data you upload complies with applicable data protection laws and that you have the
              necessary rights and consents to process such data through our platform.
            </p>

            <h2 id="liability">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Meridian and its affiliates shall not be liable
              for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits,
              revenue, data, or business opportunities arising from your use of the service. Our total aggregate
              liability for any claims arising under these Terms shall not exceed the amount you paid to us in
              the twelve months preceding the claim. This limitation applies regardless of the theory of
              liability, whether in contract, tort, or otherwise.
            </p>

            <h2 id="termination">8. Termination</h2>
            <p>
              You may terminate your account at any time through the platform settings or by contacting support.
              We may suspend or terminate your access if you breach these Terms, if your account is inactive for
              12 consecutive months, or if required by law. Upon termination, your right to use the service
              ceases immediately. We will provide a reasonable period for you to export your data before
              deletion, unless termination is due to a material breach. Sections relating to data ownership,
              limitation of liability, and dispute resolution survive termination.
            </p>

            <h2 id="changes">9. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time to reflect changes in our services, legal requirements,
              or business practices. We will notify you of material changes at least 30 days before they take
              effect via email or an in-product notification. Your continued use of the service after the
              effective date constitutes acceptance of the revised Terms. If you do not agree to the updated
              Terms, you must stop using the service and may request account deletion.
            </p>

            <h2 id="contact">10. Contact</h2>
            <p>
              For questions about these Terms, contact us at <a href="mailto:legal@meridian.dev">legal@meridian.dev</a>.
              For security concerns, reach our security team at <a href="mailto:security@meridian.dev">security@meridian.dev</a>.
              Our mailing address is Meridian Inc., 548 Market St, Suite 36879, San Francisco, CA 94104.
              These Terms are governed by the laws of the State of California, without regard to conflict of
              law principles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
