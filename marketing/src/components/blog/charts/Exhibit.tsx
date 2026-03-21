interface ExhibitProps {
  n: number;
  title: string;
  subtitle?: string;
  source?: string;
  children: React.ReactNode;
}

export function Exhibit({ n, title, subtitle, source, children }: ExhibitProps) {
  return (
    <figure className="exhibit">
      <figcaption className="exhibit-caption">
        <span className="exhibit-label">Exhibit {n}</span>
        <h3 className="exhibit-title">{title}</h3>
        {subtitle && <span className="exhibit-subtitle">{subtitle}</span>}
      </figcaption>
      <div className="exhibit-body">{children}</div>
      {source && <span className="exhibit-source">Source: {source}</span>}
    </figure>
  );
}
