import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thanks for contacting Sancalana.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="gr section-pad">
      <div className="gi max-w-[720px]">
        <span className="eyebrow eyebrow-bracket">Received</span>
        <h1 className="type-display mt-3">
          We&apos;ll take it from <em>here</em>.
        </h1>
        <p className="type-body mt-4 text-mid">
          Thanks for sharing the process context. We will review the systems, workflow, and urgency you sent, then reply with the right next step.
        </p>
        <div className="mt-[var(--sp-6)] flex flex-wrap gap-[var(--sp-3)]">
          <Link href="/blog" className="btn btn-primary" data-track="thank_you_blog_clicked">Read the journal</Link>
          <Link href="/platform" className="btn btn-ghost" data-track="thank_you_platform_clicked">See the product</Link>
        </div>
      </div>
    </section>
  );
}
