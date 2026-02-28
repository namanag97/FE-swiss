import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Lock, Server, Eye, FileCheck, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Security",
  description: "Enterprise-grade security and compliance. SOC 2 Type II, GDPR, HIPAA ready.",
  alternates: { canonical: "/security" },
  openGraph: { images: ["/og.png"] },
};

const items = [
  { icon: Shield, title: "SOC 2 Type II", desc: "Independently audited. Controls for security, availability, and confidentiality are verified annually." },
  { icon: Lock, title: "Encryption", desc: "AES-256 at rest, TLS 1.3 in transit. Encryption keys managed per-tenant with automatic rotation." },
  { icon: Server, title: "Infrastructure", desc: "Hosted on AWS/GCP with multi-region redundancy. All data stored in your region of choice (US, EU, APAC)." },
  { icon: Eye, title: "Access Controls", desc: "Role-based access, SSO/SAML, audit logs for every action. Enforce least-privilege across your organization." },
  { icon: FileCheck, title: "Compliance", desc: "GDPR compliant with DPA available. HIPAA-ready for healthcare use cases. Custom BAAs on request." },
  { icon: Users, title: "Data Ownership", desc: "Your data is yours. We never access, share, or train models on customer data. Delete everything at any time." },
];

export default function SecurityPage() {
  return (
    <>
      <section className="border-b border-forest-800 bg-forest-900 py-20 md:py-24">
        <Container size="wide">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-widest text-emerald-400">Security</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Enterprise-grade security and compliance
            </h1>
            <p className="mt-5 text-[16px] leading-relaxed text-forest-200/70">
              Your process data is some of the most sensitive data in your organization. We treat it that way.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-24">
        <Container size="wide">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div key={item.title} className="rounded-xl border border-sand-200 bg-white p-6">
                <div className="mb-3 inline-flex rounded-lg border border-sand-200 bg-sand-50 p-2">
                  <item.icon className="h-4 w-4 text-sand-600" />
                </div>
                <h3 className="text-[14px] font-semibold text-sand-900">{item.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-sand-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-sand-200 bg-sand-50 py-16">
        <Container size="wide">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { label: "Uptime SLA", value: "99.9%" },
              { label: "Data retention", value: "You control" },
              { label: "Pen tests", value: "Annual + on request" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-semibold text-sand-900">{s.value}</p>
                <p className="mt-0.5 text-[13px] text-sand-500">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container size="wide" className="text-center">
          <h2 className="text-xl font-semibold text-sand-900">Need more details?</h2>
          <p className="mx-auto mt-2 max-w-md text-[14px] text-sand-500">
            We&apos;re happy to share our SOC 2 report, complete a security questionnaire, or schedule a call with our security team.
          </p>
          <Link href="/contact" className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-sand-900 px-5 py-2.5 text-[13px] font-medium text-white hover:bg-sand-800">
            Contact us <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Container>
      </section>
    </>
  );
}
