import type { Metadata } from "next";
import Link from "next/link";
import { OODALoop } from "@/components/home/OODALoop";
import { PlatformTabs } from "@/components/home/PlatformTabs";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { comparisonCards, connectors, speedPhases, useCaseCards } from "@/data/home";

export const metadata: Metadata = {
  description: "See how your business actually runs. Connect your ERP, CRM, or ITSM — get a living map of every process, bottleneck, and workaround. Built automatically from your data.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        eyebrow="Early access"
        heading={<>See how your business <em>actually runs</em></>}
        description="Connect your ERP, CRM, or ITSM. Get a living map of every process, every bottleneck, every workaround — built automatically from the data you already have."
        maxWidth={540}
      >
        <div className="flex justify-center gap-[var(--sp-3)] mt-[var(--sp-6)]">
          <Link href="/contact" className="btn btn-primary">Request early access</Link>
          <Link href="/platform" className="btn btn-ghost">How it works</Link>
        </div>
        <p className="type-body-sm text-[color:var(--ink-faint)] mt-[var(--sp-3)]">
          No credit card &middot; No consultants &middot; First process map in under an hour
        </p>
      </PageHero>

      {/* ── Three levels of seeing ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section-pad">
          <Reveal>
            <div className="section-center">
              <span className="eyebrow eyebrow-bracket">The problem</span>
              <h2 className="type-h2 mt-5">
                Dashboards tell you <em>what.</em><br />
                We show you <em>why.</em>
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

      {/* ── The Gap ── */}
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
              Meridian shows you the second one. Automatically. From your own data.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Connectors ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section-pad-sm">
          <p className="type-label text-center mb-[var(--sp-4)]">
            Works with the systems you already run
          </p>
          <div className="flex justify-center gap-[var(--sp-4)] flex-wrap items-center">
            {connectors.map((name) => (
              <span key={name} className="font-[var(--sans)] text-[length:var(--fs-sm)] text-[color:var(--ink-muted)] uppercase tracking-[0.06em] py-[var(--sp-3)] px-[var(--sp-5)] border border-[var(--border)] bg-[var(--white)]">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="ascii-divider">&middot; &middot; &middot; &nbsp; &middot; &middot; &middot; &nbsp; &middot; &middot; &middot;</div>

      {/* ── Continuous Intelligence ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section-pad">
          <Reveal>
            <div className="section-center">
              <span className="eyebrow eyebrow-bracket">Continuous</span>
              <h2 className="type-h2 mt-5">
                It never stops <em>watching</em>
              </h2>
              <p className="type-body mt-3 text-mid max-w-[500px] mx-auto">
                Meridian doesn&apos;t generate a report and walk away. It observes
                your processes continuously, detects when something drifts,
                predicts what breaks next, and recommends what to fix.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <OODALoop />
          </Reveal>
        </div>
      </section>

      {/* ── Speed ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section-pad">
          <Reveal>
            <div className="section-center">
              <span className="eyebrow eyebrow-bracket">Speed</span>
              <h2 className="type-h2 mt-5">
                Not months. <em>Minutes.</em>
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

      {/* ── Platform ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section-pad">
          <div className="section-center">
            <span className="eyebrow eyebrow-bracket">Platform</span>
            <h2 className="type-h2 mt-3">
              From raw data to <em>action</em>
            </h2>
          </div>
          <PlatformTabs />
        </div>
      </section>

      <div className="ascii-divider">&middot; &middot; &middot; &nbsp; &middot; &middot; &middot; &nbsp; &middot; &middot; &middot;</div>

      {/* ── Use Cases ── */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi section-pad">
          <Reveal>
            <div className="section-center">
              <span className="eyebrow eyebrow-bracket">Use cases</span>
              <h2 className="type-h2 mt-5">
                Where it <em>hits</em>
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 reveal-stagger gap-[var(--sp-4)]">
            {useCaseCards.map((uc) => (
              <Reveal key={uc.title}>
                <div className="card-feature h-full">
                  <h3 className="type-h3">{uc.title}</h3>
                  <p className="type-body mt-3 text-mid">{uc.desc}</p>
                  <Link href={`/use-cases${uc.anchor}`} className="type-label text-[color:var(--emerald)] mt-4 inline-block">
                    Learn more &rarr;
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CtaBand
        heading={<>Your processes are talking. <em>Start listening.</em></>}
        description="We're building the intelligence layer for operations. Be among the first to see it."
        buttonText="Request early access"
        secondaryText="Explore platform"
        secondaryHref="/platform"
      />
    </>
  );
}
