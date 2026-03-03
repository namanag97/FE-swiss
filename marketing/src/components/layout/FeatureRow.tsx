interface FeatureRowProps {
  eyebrow: string;
  title: React.ReactNode;
  tagline: string;
  description: string;
  items?: string[];
  children?: React.ReactNode;
  illustration: React.ReactNode;
  reverse?: boolean;
  id?: string;
}

export function FeatureRow({ eyebrow, title, tagline, description, items, children, illustration, reverse, id }: FeatureRowProps) {
  return (
    <section id={id} className="gr" style={id ? { scrollMarginTop: "var(--nav-h)" } : undefined}>
      <div className="h-rule h-rule--bottom" />
      <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
        <div className={`feature-row${reverse ? " feature-row--reverse" : ""}`}>
          {reverse ? (
            <>
              <div style={{ border: "1px solid var(--border)", padding: "var(--sp-3)", background: "var(--bg)" }}>
                {illustration}
              </div>
              <FeatureContent eyebrow={eyebrow} title={title} tagline={tagline} description={description} items={items}>{children}</FeatureContent>
            </>
          ) : (
            <>
              <FeatureContent eyebrow={eyebrow} title={title} tagline={tagline} description={description} items={items}>{children}</FeatureContent>
              <div style={{ border: "1px solid var(--border)", padding: "var(--sp-3)", background: "var(--bg)" }}>
                {illustration}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function FeatureContent({ eyebrow, title, tagline, description, items, children }: Omit<FeatureRowProps, "illustration" | "reverse" | "id">) {
  return (
    <div>
      <span className="eyebrow eyebrow-bracket">{eyebrow}</span>
      <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
        {title}
      </h2>
      <p style={{ fontFamily: "var(--caslon)", fontStyle: "italic", fontSize: "var(--fs-md)", color: "var(--emerald)", marginTop: "var(--sp-3)", lineHeight: 1.5 }}>
        {tagline}
      </p>
      <p className="type-body" style={{ marginTop: "var(--sp-3)", color: "var(--ink-mid)" }}>
        {description}
      </p>
      {items && (
        <ul style={{ marginTop: "var(--sp-4)", listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
          {items.map((item) => (
            <li key={item} style={{ fontFamily: "var(--body)", fontSize: "var(--fs-sm)", color: "var(--ink-mid)", paddingLeft: "var(--sp-4)", position: "relative" }}>
              <span style={{ position: "absolute", left: 0, color: "var(--emerald)" }}>&rarr;</span>
              {item}
            </li>
          ))}
        </ul>
      )}
      {children}
    </div>
  );
}
