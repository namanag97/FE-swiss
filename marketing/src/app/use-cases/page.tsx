import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Use Cases",
  description: "Process mining for Order-to-Cash, Procure-to-Pay, ITSM, patient journeys, and more.",
  alternates: { canonical: "/use-cases" },
  openGraph: { images: ["/og.png"] },
};

const cases = [
  {
    title: "Order-to-Cash",
    problem: "Orders take inconsistent paths from entry to payment. Revenue leaks through delayed invoicing and manual rework loops.",
    insight: "Discover every variant in your O2C process. Pinpoint where orders stall and how much cash is trapped in process delays.",
    metrics: ["68% faster invoice-to-payment cycle", "Identified 12 hidden rework loops", "$2.1M in trapped working capital surfaced"],
  },
  {
    title: "Procure-to-Pay",
    problem: "Maverick buying, duplicate payments, and approval bottlenecks cost enterprises millions annually.",
    insight: "Map the actual purchasing flow. Detect purchases that bypass approval and invoices matched to wrong POs.",
    metrics: ["34% reduction in maverick spend", "91% duplicate payment detection rate", "Approval cycle cut from 8 days to 2"],
  },
  {
    title: "IT Service Management",
    problem: "Tickets bounce between teams. Escalation paths are unclear. SLA breaches happen but nobody knows why.",
    insight: "Trace every ticket from creation to resolution. See escalation patterns, identify bottleneck teams.",
    metrics: ["40% fewer SLA breaches", "Resolution time reduced by 3.2 hours", "Unnecessary escalations cut by 55%"],
  },
  {
    title: "Patient Journey",
    problem: "Patients experience inconsistent care pathways. Wait times vary wildly. Protocols are followed in theory but not in practice.",
    insight: "Follow patients through intake, triage, diagnosis, treatment, and discharge. Compare pathways by outcome.",
    metrics: ["Emergency wait times reduced 28%", "Protocol conformance improved to 94%", "Bed turnover increased 18%"],
  },
];

export default function UseCasesPage() {
  return (
    <>
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-7) var(--sp-5) var(--sp-6)' }}>
          <span className="eyebrow eyebrow-bracket">Use cases</span>
          <h1 className="type-display" style={{ marginTop: 'var(--sp-4)', maxWidth: 680 }}>
            Built for the processes that <em>matter</em> most
          </h1>
          <p className="type-body" style={{ marginTop: 'var(--sp-4)' }}>
            Meridian works with any process that generates event data. Here are the use cases our customers get the most value from.
          </p>
        </div>
      </section>

      {cases.map((c) => (
        <section key={c.title} className="gr">
          <div className="h-rule h-rule--bottom" />
          <div className="gi" style={{ padding: 'var(--sp-7) var(--sp-5)' }}>
            <div className="grid gap-0 md:grid-cols-2" style={{ border: '1px solid var(--border)' }}>
              <div style={{ padding: 'var(--sp-6) var(--sp-5)', borderRight: '1px solid var(--border)' }}>
                <span className="eyebrow eyebrow-bracket">{c.title}</span>
                <h2 className="type-h3" style={{ marginTop: 'var(--sp-3)' }}>{c.title}</h2>
                <div style={{ marginTop: 'var(--sp-4)' }}>
                  <p className="type-label" style={{ marginBottom: 'var(--sp-2)' }}>The problem</p>
                  <p className="type-body-sm">{c.problem}</p>
                </div>
                <div style={{ marginTop: 'var(--sp-4)' }}>
                  <p className="type-label" style={{ marginBottom: 'var(--sp-2)' }}>What Meridian reveals</p>
                  <p className="type-body-sm">{c.insight}</p>
                </div>
              </div>
              <div style={{ padding: 'var(--sp-6) var(--sp-5)' }}>
                <p className="type-label" style={{ marginBottom: 'var(--sp-4)' }}>Typical results</p>
                <ul className="flex flex-col" style={{ gap: 'var(--sp-3)' }}>
                  {c.metrics.map((m) => (
                    <li key={m} className="flex items-start" style={{ gap: 'var(--sp-3)', fontFamily: 'var(--body)', fontSize: 'var(--fs-sm)', fontWeight: 260, lineHeight: 1.6, color: 'var(--ink-muted)' }}>
                      <span className="mt-[6px] shrink-0 rounded-full" style={{ width: 6, height: 6, background: 'var(--emerald)' }} />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="cta-band">
        <h2>Have a different process in <em>mind</em>?</h2>
        <p>If it generates event data, Meridian can mine it.</p>
        <Link href="/contact" className="btn btn-primary">
          Talk to us <ArrowRight style={{ width: 12, height: 12 }} />
        </Link>
      </section>
    </>
  );
}
