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
      <div className="gi section-pad">
        <div className={`feature-row${reverse ? " feature-row--reverse" : ""}`}>
          {reverse ? (
            <>
              <div className="illustration-frame">
                {illustration}
              </div>
              <FeatureContent eyebrow={eyebrow} title={title} tagline={tagline} description={description} items={items}>{children}</FeatureContent>
            </>
          ) : (
            <>
              <FeatureContent eyebrow={eyebrow} title={title} tagline={tagline} description={description} items={items}>{children}</FeatureContent>
              <div className="illustration-frame">
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
      <h2 className="type-h2 mt-3">
        {title}
      </h2>
      <p className="tagline">
        {tagline}
      </p>
      <p className="type-body mt-3 text-mid">
        {description}
      </p>
      {items && (
        <ul className="mt-4 list-none p-0 flex flex-col gap-[var(--sp-2)]">
          {items.map((item) => (
            <li key={item} className="text-[var(--fs-sm)] text-mid pl-[var(--sp-4)] relative" style={{ fontFamily: "var(--body)" }}>
              <span className="absolute left-0 text-[var(--emerald)]">&rarr;</span>
              {item}
            </li>
          ))}
        </ul>
      )}
      {children}
    </div>
  );
}
