interface LegalSection {
  id: string;
  title: string;
}

interface LegalLayoutProps {
  title: React.ReactNode;
  lastUpdated: string;
  sections: LegalSection[];
  children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated, sections, children }: LegalLayoutProps) {
  return (
    <section className="gr section-pad">
      <div className="gi">
        <div className="mb-[var(--sp-6)]">
          <span className="eyebrow eyebrow-bracket">Legal</span>
          <h1 className="type-h2 mt-[var(--sp-3)]">
            {title}
          </h1>
          <p className="type-label mt-[var(--sp-2)]">Last updated {lastUpdated}</p>
        </div>

        <div className="legal-layout">
          <nav className="legal-toc sticky top-[calc(var(--header-h)+var(--sp-3))] self-start">
            <p className="type-label mb-[var(--sp-3)]">Contents</p>
            <ul className="flex flex-col gap-[var(--sp-2)] list-none p-0">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="toc-link">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="prose">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
