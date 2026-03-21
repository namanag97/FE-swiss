"use client";

export interface StatDatum {
  value: string;
  label: string;
  sublabel?: string;
}

interface StatRowProps {
  data: StatDatum[];
}

export function StatRow({ data }: StatRowProps) {
  return (
    <div className="stat-row">
      {data.map((d) => (
        <div key={d.label} className="stat-row-cell">
          <div className="stat-row-value">{d.value}</div>
          <div className="stat-row-label">{d.label}</div>
          {d.sublabel && <div className="stat-row-sub">{d.sublabel}</div>}
        </div>
      ))}
    </div>
  );
}
