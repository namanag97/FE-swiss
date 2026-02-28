import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description: `The team and mission behind ${siteConfig.name}.`,
  alternates: { canonical: "/about" },
  openGraph: { images: ["/og.png"] },
};

export default function AboutPage() {
  return (
    <>
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-7) var(--sp-5) var(--sp-6)' }}>
          <span className="eyebrow eyebrow-bracket">About</span>
          <h1 className="type-display" style={{ marginTop: 'var(--sp-4)', maxWidth: 680 }}>
            We believe every business process tells a <em>story</em>
          </h1>
          <p className="type-body" style={{ marginTop: 'var(--sp-4)', maxWidth: 540 }}>
            Most organizations don&apos;t know how their processes actually work. They have models, playbooks, SOPs — but reality drifts.
            {' '}{siteConfig.name} was built to close that gap.
          </p>
        </div>
      </section>

      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-7) var(--sp-5)' }}>
          <div className="grid gap-0 md:grid-cols-2" style={{ border: '1px solid var(--border)' }}>
            <div style={{ padding: 'var(--sp-6) var(--sp-5)', borderRight: '1px solid var(--border)' }}>
              <span className="eyebrow eyebrow-bracket">Mission</span>
              <h2 className="type-h3" style={{ marginTop: 'var(--sp-3)' }}>Make operational intelligence accessible</h2>
              <p className="type-body-sm" style={{ marginTop: 'var(--sp-3)' }}>
                Process mining has been locked inside expensive enterprise tools with steep learning curves. We&apos;re building the version that operations teams can actually use.
              </p>
            </div>
            <div style={{ padding: 'var(--sp-6) var(--sp-5)' }}>
              <span className="eyebrow eyebrow-bracket">Approach</span>
              <h2 className="type-h3" style={{ marginTop: 'var(--sp-3)' }}>Algorithms first, then interface</h2>
              <p className="type-body-sm" style={{ marginTop: 'var(--sp-3)' }}>
                We invest deeply in the science — process discovery algorithms, conformance checking, variant clustering, predictive models. Then we wrap it in an interface that doesn&apos;t require a PhD to use.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ padding: 'var(--sp-7) var(--sp-5)' }}>
          <div className="section-header">
            <span className="eyebrow eyebrow-bracket">Values</span>
            <h2 className="type-h2">What we believe</h2>
          </div>
          <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Clarity over complexity", d: "If an insight can't be explained simply, it isn't useful yet." },
              { t: "Data honesty", d: "Show what the data says, not what people want to hear." },
              { t: "Speed matters", d: "A slow tool is an unused tool. We obsess over response times." },
              { t: "Craft", d: "Details matter. Typography, transitions, error messages — everything ships polished." },
            ].map((v) => (
              <div key={v.t} className="card-feature">
                <p className="card-title">{v.t}</p>
                <p className="card-body">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <h2>See how your business actually <em>runs</em></h2>
        <p>Book a demo. 20 minutes. Your data.</p>
        <Link href="/contact" className="btn btn-primary">Request Demo</Link>
      </section>
    </>
  );
}
