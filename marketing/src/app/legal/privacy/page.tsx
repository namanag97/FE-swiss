import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Meridian collects, uses, and protects your personal data. GDPR compliant.",
  alternates: { canonical: "/legal/privacy" },
  openGraph: { images: ["/og.png"] },
};

const sections = [
  { id: "collection", title: "1. Information Collection" },
  { id: "usage", title: "2. How We Use Information" },
  { id: "storage", title: "3. Data Storage & Security" },
  { id: "sharing", title: "4. Data Sharing" },
  { id: "cookies", title: "5. Cookies & Tracking" },
  { id: "rights", title: "6. Your Rights" },
  { id: "retention", title: "7. Data Retention" },
  { id: "children", title: "8. Children's Privacy" },
  { id: "transfers", title: "9. International Transfers" },
  { id: "contact", title: "10. Contact & DPO" },
];

export default function PrivacyPage() {
  return (
    <section className="gr" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
      <div className="gi">
        {/* Header */}
        <div style={{ marginBottom: 'var(--sp-6)' }}>
          <span className="eyebrow eyebrow-bracket">Legal</span>
          <h1 className="type-h2" style={{ marginTop: 'var(--sp-3)' }}>
            Privacy <em>Policy</em>
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
              This Privacy Policy describes how Meridian (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and
              protects information when you use our platform and services. We are committed to safeguarding
              your privacy and handling your data with transparency.
            </p>

            <h2 id="collection">1. Information Collection</h2>
            <p>
              We collect information you provide directly when you create an account, fill out a form, or
              contact us. This includes your name, email address, company name, job title, and billing details.
              We also collect usage data automatically, including IP addresses, browser type, pages visited,
              and feature interactions within the platform. When you connect data sources, we process the
              operational data you choose to import, but this data remains under your ownership at all times.
            </p>

            <h2 id="usage">2. How We Use Information</h2>
            <p>
              We use your personal information to provide, maintain, and improve our services, to communicate
              with you about your account and product updates, and to provide customer support. Usage analytics
              help us understand how customers interact with the platform so we can improve the experience. We
              use billing information solely for invoicing and payment processing. We never sell your personal
              data to third parties, and we do not use customer operational data to train machine learning models.
            </p>

            <h2 id="storage">3. Data Storage &amp; Security</h2>
            <p>
              All data is encrypted at rest using AES-256 encryption and in transit using TLS 1.3. Our
              infrastructure is hosted on AWS within isolated Virtual Private Clouds, with multi-availability-zone
              redundancy and automated daily backups. We maintain SOC 2 Type II compliance and conduct regular
              vulnerability assessments. Access to production systems is restricted to authorized personnel through
              multi-factor authentication and is logged for audit purposes.
            </p>

            <h2 id="sharing">4. Data Sharing</h2>
            <p>
              We share personal information only when necessary to provide the service: with payment processors
              for billing, with infrastructure providers for hosting, and with analytics tools for usage insights.
              All third-party sub-processors are contractually bound to equivalent privacy and security standards.
              We will disclose information if required by law, regulation, or valid legal process. We will notify
              you of such requests to the extent legally permitted. A current list of sub-processors is available
              upon request.
            </p>

            <h2 id="cookies">5. Cookies &amp; Tracking</h2>
            <p>
              We use essential cookies required for authentication and session management. We also use analytics
              cookies to understand aggregate usage patterns. You can control non-essential cookies through our
              cookie consent banner. We do not use third-party advertising trackers. Our analytics are configured
              to anonymize IP addresses and do not create cross-site profiles. You may disable cookies in your
              browser settings, though some platform features may not function correctly without essential cookies.
            </p>

            <h2 id="rights">6. Your Rights (GDPR)</h2>
            <p>
              If you are located in the European Economic Area, you have the right to access, rectify, erase,
              restrict processing of, and port your personal data. You also have the right to object to processing
              and to withdraw consent at any time without affecting the lawfulness of prior processing. To exercise
              any of these rights, contact our Data Protection Officer at <a href="mailto:dpo@meridian.dev">dpo@meridian.dev</a>.
              We will respond to all requests within 30 days. If you believe your rights have been violated, you
              have the right to lodge a complaint with your local supervisory authority.
            </p>

            <h2 id="retention">7. Data Retention</h2>
            <p>
              We retain your personal information for as long as your account is active or as needed to provide
              services. Account data is deleted within 30 days of account closure upon request. Operational data
              you import into the platform is retained according to your workspace settings and can be exported or
              deleted at any time through the platform interface. Backup copies are purged within 90 days of
              deletion. We retain anonymized, aggregate analytics data indefinitely for service improvement purposes.
            </p>

            <h2 id="children">8. Children&apos;s Privacy</h2>
            <p>
              Meridian is a business-to-business platform and is not intended for use by individuals under the
              age of 16. We do not knowingly collect personal information from children. If we become aware that
              a child has provided us with personal data, we will take steps to delete such information promptly.
              If you believe a child has submitted personal data to us, please contact us immediately.
            </p>

            <h2 id="transfers">9. International Transfers</h2>
            <p>
              Your data may be processed in countries other than your country of residence. We ensure appropriate
              safeguards are in place for all international transfers, including Standard Contractual Clauses
              approved by the European Commission and adequacy decisions where applicable. Enterprise customers
              may choose their data residency region to keep data within the EU, US, or other supported regions.
              We do not transfer data to countries without adequate protections unless compliant transfer mechanisms
              are in place.
            </p>

            <h2 id="contact">10. Contact &amp; DPO</h2>
            <p>
              For privacy-related inquiries, contact our Data Protection Officer
              at <a href="mailto:dpo@meridian.dev">dpo@meridian.dev</a>. For general questions,
              reach us at <a href="mailto:privacy@meridian.dev">privacy@meridian.dev</a>. Our mailing
              address is Meridian Inc., 548 Market St, Suite 36879, San Francisco, CA 94104. We aim to
              respond to all inquiries within five business days and to formal data subject requests within
              30 calendar days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
