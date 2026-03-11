interface PageHeroProps {
  eyebrow: string;
  heading: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  maxWidth?: number;
  showDotField?: boolean;
}

export function PageHero({ eyebrow, heading, description, children, maxWidth = 560, showDotField = true }: PageHeroProps) {
  return (
    <section className="gr" style={{ position: 'relative', overflow: 'hidden', paddingTop: 'var(--sp-9)', paddingBottom: 'var(--sp-8)' }}>
      {/* Gradient backdrop */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(4,122,85,.05), transparent)',
          pointerEvents: 'none',
        }}
      />
      {showDotField && (
        <>
          <div className="dot-field" aria-hidden="true" />
          <div className="dot-field-left" aria-hidden="true" />
        </>
      )}
      <div className="gi text-center" style={{ position: 'relative', zIndex: 1 }}>
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
