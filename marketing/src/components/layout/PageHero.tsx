interface PageHeroProps {
  eyebrow: string;
  heading: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  maxWidth?: number;
}

export function PageHero({ eyebrow, heading, description, children, maxWidth = 560 }: PageHeroProps) {
  return (
    <section className="gr section-pad">
      <div className="gi text-center">
        <span className="eyebrow eyebrow-bracket">{eyebrow}</span>
        <h1 className="type-display mt-3">
          {heading}
        </h1>
        {description && (
          <p className="type-body mt-4 text-mid mx-auto" style={{ maxWidth }}>
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
