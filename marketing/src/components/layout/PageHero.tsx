interface PageHeroProps {
  eyebrow: string;
  heading: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  maxWidth?: 540 | 600;
  showDotField?: boolean;
}

export function PageHero({ eyebrow, heading, description, children, maxWidth = 600, showDotField = true }: PageHeroProps) {
  const descriptionWidth = maxWidth === 540 ? "max-w-[540px]" : "max-w-[600px]";

  return (
    <section className="gr overflow-visible py-[5rem] pt-24">
      {showDotField && <div className="dot-field" aria-hidden="true" />}
      <div className="gi text-center">
        <span className="eyebrow eyebrow-bracket">{eyebrow}</span>
        <h1 className="type-display mt-5">
          {heading}
        </h1>
        {description && (
          <p className={`type-body text-mid mx-auto mt-5 ${descriptionWidth}`}>
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
