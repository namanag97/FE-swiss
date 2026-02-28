import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description: `The team and mission behind ${siteConfig.name}.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-forest-800 bg-forest-900 py-20 md:py-24">
        <Container size="wide">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-widest text-emerald-400">About</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              We believe every business process tells a story
            </h1>
            <p className="mt-5 text-[16px] leading-relaxed text-forest-200/80">
              Most organizations don&apos;t know how their processes actually work. They have models, playbooks, SOPs — but reality drifts.
              {siteConfig.name} was built to close that gap. We take raw event data and turn it into operational clarity.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container size="wide">
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-emerald-600">Mission</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-gray-900">
                Make operational intelligence accessible
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-gray-500">
                Process mining has been locked inside expensive enterprise tools with steep learning curves. We&apos;re building the version that operations teams can actually use — intuitive, fast, and honest about what the data shows.
              </p>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-emerald-600">Approach</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-gray-900">
                Algorithms first, then interface
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-gray-500">
                We invest deeply in the science — process discovery algorithms, conformance checking, variant clustering, predictive models. Then we wrap it in an interface that doesn&apos;t require a PhD to use.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-gray-200 bg-gray-50 py-20">
        <Container size="wide">
          <p className="text-[11px] font-medium uppercase tracking-widest text-emerald-600">Values</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-gray-900">What we believe</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Clarity over complexity", d: "If an insight can't be explained simply, it isn't useful yet." },
              { t: "Data honesty", d: "Show what the data says, not what people want to hear. No vanity metrics." },
              { t: "Speed matters", d: "A slow tool is an unused tool. We obsess over response times." },
              { t: "Craft", d: "Details matter. Typography, transitions, error messages — everything ships polished." },
            ].map((v) => (
              <div key={v.t}>
                <h3 className="text-[14px] font-semibold text-gray-900">{v.t}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-gray-500">{v.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
