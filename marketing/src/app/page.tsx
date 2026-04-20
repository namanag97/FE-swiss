import type { Metadata } from "next";
import Link from "next/link";
import { PlatformTabs } from "@/components/home/PlatformTabs";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { comparisonCards, connectors, speedPhases, useCaseCards } from "@/data/home";

export const metadata: Metadata = {
  description: "Process intelligence for operations and transformation teams. Connect your systems, map the real process, find deviations, and act faster.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const switchCards = [
    {
      title: "Less services overhead",
      body: "Built for lean process and operations teams that want answers without staffing a program around the tool.",
    },
    {
      title: "Faster time to value",
      body: "Move from event data to process visibility in weeks, not quarter-long discovery cycles.",
    },
    {
      title: "Operator-ready outputs",
      body: "Show the variant, the deviation cost, and the next step so teams can act instead of admiring the graph.",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Early access"
        heading={<>See how work <em>actually flows</em></>}
        description="Connect SAP, Oracle, ServiceNow, Salesforce, or your warehouse. See the real process paths, bottlenecks, rework loops, and SLA risks hiding inside your operations data."
        maxWidth={540}
      >
        <div className="flex justify-center gap-[var(--sp-3)] mt-[var(--sp-6)]">
          <Link href="/contact" className="btn btn-primary" data-track="homepage_primary_cta_clicked" data-track-location="hero">Request early access</Link>
          <Link href="/platform" className="btn btn-ghost" data-track="homepage_secondary_cta_clicked" data-track-location="hero">See the product</Link>
        </div>
        <p className="type-body-sm mt-[var(--sp-3)]">
          Process discovery &middot; Conformance &middot; SLA risk &middot; Action
        </p>
      </PageHero>

      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section-pad">
          <Reveal>
            <div className="section-center">
              <span className="eyebrow eyebrow-bracket">The problem</span>
              <h2 className="type-h2 mt-5">
                Dashboards show the KPI.<br />
                We show the <em>path that caused it.</em>
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 reveal-stagger gap-[var(--sp-4)]">
            {comparisonCards.map((c) => (
              <Reveal key={c.title}>
                <div className="card-feature h-full">
                  <span className="type-label" style={{ color: c.tone }}>{c.title}</span>
                  <p className="tagline">
                    {c.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section-pad">
          <Reveal>
            <p className="type-label text-center mb-[var(--sp-5)]">Your process on paper</p>
            <div className="ascii-frame overflow-x-auto max-w-[600px] mx-auto">
              <pre className="ascii-art m-0 text-center">{`Order  ──▶  Approve  ──▶  Invoice  ──▶  Payment`}</pre>
            </div>
          </Reveal>
          <Reveal>
            <p className="type-label text-center mt-[var(--sp-7)] mb-[var(--sp-5)]">Your process in reality</p>
            <div className="ascii-frame overflow-x-auto max-w-[720px] mx-auto">
              <pre className="ascii-art m-0">{`Order ──▶ Approve ──▶ Reject ──▶ Re-submit ──▶ Approve
  │                       │            ▲
  ├──▶ Manual override    │            │
  │                       └── Escalate ┘
  └──▶ Approve ──▶ Invoice ──▶ Hold ──▶ Release ──▶ Payment
                                 │
                                 └── Dispute ──▶ Credit ──▶ Re-invoice`}</pre>
            </div>
          </Reveal>
          <Reveal>
            <p className="tagline text-center max-w-[500px] mx-auto mt-[var(--sp-7)]">
              Sancalana reconstructs the second one automatically from your event data.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section-pad-sm">
          <p className="type-label text-center mb-[var(--sp-4)]">
            Works with the systems you already run
          </p>
          <div className="flex justify-center gap-[var(--sp-4)] flex-wrap items-center">
            {connectors.map((name) => (
              <span key={name} className="font-[var(--sans)] text-[length:var(--fs-sm)] text-[color:var(--ink)] uppercase tracking-[0.06em] py-[var(--sp-3)] px-[var(--sp-5)] border border-[var(--border)] opacity-60">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="ascii-divider">&middot; &middot; &middot; &nbsp; &middot; &middot; &middot; &nbsp; &middot; &middot; &middot;</div>

      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section-pad">
          <Reveal>
            <div className="section-center">
              <span className="eyebrow eyebrow-bracket">Product</span>
              <h2 className="type-h2 mt-5">
                From discovery to <em>operating action</em>
              </h2>
              <p className="type-body mt-5 text-mid max-w-[500px] mx-auto">
                Map the path, isolate the deviation, understand the cost, and
                decide what to do next. That is the whole product story.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <PlatformTabs />
          </Reveal>
        </div>
      </section>

      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section-pad">
          <Reveal>
            <div className="section-center">
              <span className="eyebrow eyebrow-bracket">Speed</span>
              <h2 className="type-h2 mt-5">
                Weeks to value. <em>Not quarters.</em>
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 reveal-stagger gap-[var(--sp-4)]">
            {speedPhases.map((t) => (
              <Reveal key={t.phase}>
                <div className="card-feature h-full">
                  <span className="type-label text-[color:var(--emerald)]">{t.phase}</span>
                  <h3 className="type-h3 mt-[var(--sp-2)]">{t.title}</h3>
                  <p className="type-body mt-3 text-mid">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section-pad">
          <Reveal>
            <div className="section-center">
              <span className="eyebrow eyebrow-bracket">Why Sancalana</span>
              <h2 className="type-h2 mt-3">
                The point is not more software.<br />
                It&apos;s <em>faster operational clarity.</em>
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--sp-4)]">
            {switchCards.map((card) => (
              <div key={card.title} className="card-feature h-full">
                <h3 className="type-h3">{card.title}</h3>
                <p className="type-body mt-3 text-mid">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="ascii-divider">&middot; &middot; &middot; &nbsp; &middot; &middot; &middot; &nbsp; &middot; &middot; &middot;</div>

      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section-pad">
          <Reveal>
            <div className="section-center">
              <span className="eyebrow eyebrow-bracket">Solutions</span>
              <h2 className="type-h2 mt-5">
                Where teams start <em>first</em>
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 reveal-stagger gap-[var(--sp-4)]">
            {useCaseCards.map((uc) => (
              <Reveal key={uc.title}>
                <div className="card-feature h-full">
                  <h3 className="type-h3">{uc.title}</h3>
                  <p className="type-body mt-3 text-mid">{uc.desc}</p>
                  <Link href={`/use-cases${uc.anchor}`} className="type-label text-[color:var(--emerald)] mt-4 inline-block" data-track="use_case_card_clicked" data-track-location={uc.title}>
                    Learn more &rarr;
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading={<>See the process. Find the drift. <em>Act faster.</em></>}
        description="We are building process intelligence for teams that need to see the real path behind operational performance."
        buttonText="Request early access"
        secondaryText="See the product"
        secondaryHref="/platform"
      />
    </>
  );
}
