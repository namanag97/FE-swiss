import Link from "next/link";

interface CtaBandProps {
  heading: React.ReactNode;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
}

export function CtaBand({
  heading,
  description,
  buttonText = "Request early access",
  buttonHref = "/contact",
  secondaryText,
  secondaryHref,
}: CtaBandProps) {
  return (
    <section className="cta-band">
      <h2 className="type-h2 text-[color:var(--white)]">
        {heading}
      </h2>
      <p className="type-body-sm text-[color:rgba(255,255,255,0.7)] max-w-[480px] mx-auto">
        {description}
      </p>
      <div className="flex gap-[var(--sp-3)] justify-center">
        <Link href={buttonHref} className="btn btn-primary" data-track="cta_clicked" data-track-location="cta-band">
          {buttonText}
        </Link>
        {secondaryText && secondaryHref && (
          <Link href={secondaryHref} className="btn btn-ghost" data-track="secondary_cta_clicked" data-track-location="cta-band">
            {secondaryText}
          </Link>
        )}
      </div>
    </section>
  );
}
