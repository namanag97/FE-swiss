import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Use Cases",
  description: "Process mining for Order-to-Cash, Procure-to-Pay, ITSM, patient journeys, and more.",
  alternates: { canonical: "/use-cases" },
  openGraph: { images: ["/og.png"] },
};

const cases = [
  {
    title: "Order-to-Cash",
    problem: "Orders take inconsistent paths from entry to payment. Revenue leaks through delayed invoicing, credit holds, and manual rework loops.",
    insight: "Discover every variant in your O2C process. Pinpoint where orders stall, which customers trigger manual reviews, and how much cash is trapped in process delays.",
    metrics: ["68% faster invoice-to-payment cycle", "Identified 12 hidden rework loops", "$2.1M in trapped working capital surfaced"],
  },
  {
    title: "Procure-to-Pay",
    problem: "Maverick buying, duplicate payments, and approval bottlenecks cost enterprises millions annually — but they're invisible in dashboards.",
    insight: "Map the actual purchasing flow. Detect purchases that bypass approval, invoices matched to wrong POs, and suppliers consistently causing late deliveries.",
    metrics: ["34% reduction in maverick spend", "91% duplicate payment detection rate", "Approval cycle cut from 8 days to 2"],
  },
  {
    title: "IT Service Management",
    problem: "Tickets bounce between teams. Escalation paths are unclear. SLA breaches happen but nobody knows why until it's too late.",
    insight: "Trace every ticket from creation to resolution. See escalation patterns, identify teams that become bottlenecks, predict which tickets will breach SLA.",
    metrics: ["40% fewer SLA breaches", "Mean resolution time reduced by 3.2 hours", "Unnecessary escalations cut by 55%"],
  },
  {
    title: "Patient Journey",
    problem: "Patients experience inconsistent care pathways. Wait times vary wildly. Clinical protocols are followed in theory but not in practice.",
    insight: "Follow patients through intake, triage, diagnosis, treatment, and discharge. Compare pathways by outcome, find where delays cause harm, verify protocol adherence.",
    metrics: ["Emergency wait times reduced 28%", "Protocol conformance improved to 94%", "Bed turnover increased 18%"],
  },
];

export default function UseCasesPage() {
  return (
    <>
      <section className="border-b border-sand-200 bg-sand-50 py-20 md:py-24">
        <Container size="wide">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-widest text-terra-600">Use cases</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-sand-900 md:text-4xl">
              Built for the processes that matter most
            </h1>
            <p className="mt-5 text-[16px] leading-relaxed text-sand-500">
              Meridian works with any process that generates event data. Here are the use cases our customers get the most value from.
            </p>
          </div>
        </Container>
      </section>

      {cases.map((c, i) => (
        <section key={c.title} className={`py-16 md:py-20 ${i % 2 === 1 ? "bg-sand-50 border-y border-sand-200" : ""}`}>
          <Container size="wide">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-widest text-terra-600">{c.title}</p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-sand-900">{c.title}</h2>

                <div className="mt-6">
                  <h3 className="text-[12px] font-semibold uppercase tracking-wider text-sand-400">The problem</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-sand-600">{c.problem}</p>
                </div>

                <div className="mt-5">
                  <h3 className="text-[12px] font-semibold uppercase tracking-wider text-sand-400">What Meridian reveals</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-sand-600">{c.insight}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-full rounded-xl border border-sand-200 bg-white p-6">
                  <h3 className="text-[12px] font-semibold uppercase tracking-wider text-sand-400">Typical results</h3>
                  <ul className="mt-4 space-y-3">
                    {c.metrics.map((m) => (
                      <li key={m} className="flex items-start gap-3 text-[14px] text-sand-700">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terra-500" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ))}

      <section className="border-t border-sand-200 bg-sand-900 py-20 text-center">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight text-white">Have a different process in mind?</h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-sand-400">
            If it generates event data, Meridian can mine it. Let&apos;s talk about your specific use case.
          </p>
          <Link href="/contact" className="group mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-[13px] font-medium text-sand-900 hover:bg-sand-100">
            Talk to us <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Container>
      </section>
    </>
  );
}
