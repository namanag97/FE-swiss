interface PageHeroProps {
  eyebrow: string;
  heading: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  maxWidth?: number;
}

export function PageHero({ eyebrow, heading, description, children, maxWidth = 560 }: PageHeroProps) {
  return (
    <section className="gr" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
      <div className="gi" style={{ textAlign: "center" }}>
        <span className="eyebrow eyebrow-bracket">{eyebrow}</span>
        <h1 className="type-display" style={{ marginTop: "var(--sp-3)" }}>
          {heading}
        </h1>
        {description && (
          <p className="type-body" style={{ maxWidth, margin: "0 auto", marginTop: "var(--sp-4)", color: "var(--ink-mid)" }}>
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
