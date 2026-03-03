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
    <section className="gr" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)' }}>
      <div className="gi">
        <div style={{ marginBottom: 'var(--sp-6)' }}>
          <span className="eyebrow eyebrow-bracket">Legal</span>
          <h1 className="type-h2" style={{ marginTop: 'var(--sp-3)' }}>
            {title}
          </h1>
          <p className="type-label" style={{ marginTop: 'var(--sp-2)' }}>Last updated {lastUpdated}</p>
        </div>

        <div className="legal-layout">
          <nav className="legal-toc" style={{ position: 'sticky', top: 80, alignSelf: 'start' }}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 'var(--sp-3)' }}>Contents</p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    style={{ fontFamily: 'var(--body)', fontSize: 'var(--fs-sm)', color: 'var(--ink-muted)', textDecoration: 'none', transition: 'color var(--t-fast)' }}
                  >
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
