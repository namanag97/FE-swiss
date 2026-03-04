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
  buttonText = "Get Early Access",
  buttonHref = "/contact",
  secondaryText,
  secondaryHref,
}: CtaBandProps) {
  return (
    <section className="cta-band">
      <div className="gi text-center py-[var(--sp-7)]">
        <h2 className="type-h2 text-[color:var(--white)]">
          {heading}
        </h2>
        <p className="type-body-sm text-[color:rgba(255,255,255,0.7)] max-w-[480px] mx-auto mt-[var(--sp-4)]">
          {description}
        </p>
        <div className="flex gap-[var(--sp-3)] justify-center mt-[var(--sp-5)]">
          <Link href={buttonHref} className="btn btn-primary">
            {buttonText}
          </Link>
          {secondaryText && secondaryHref && (
            <Link href={secondaryHref} className="btn btn-ghost">
              {secondaryText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
