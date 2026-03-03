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
      <div className="gi" style={{ textAlign: "center", padding: "var(--sp-7) 0" }}>
        <h2 className="type-h2" style={{ color: "var(--white)" }}>
          {heading}
        </h2>
        <p style={{ fontFamily: "var(--body)", color: "rgba(255,255,255,0.7)", maxWidth: 480, margin: "0 auto", marginTop: "var(--sp-4)" }}>
          {description}
        </p>
        <div style={{ display: "flex", gap: "var(--sp-3)", justifyContent: "center", marginTop: "var(--sp-5)" }}>
          <Link href={buttonHref} className="btn btn-primary" style={{ background: "var(--white)", color: "var(--ink-dark)", borderColor: "var(--white)" }}>
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
