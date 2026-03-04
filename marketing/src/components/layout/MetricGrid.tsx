interface Metric {
  value: string;
  label: string;
}

export function MetricGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-[var(--sp-3)]">
      {metrics.map((m) => (
        <div key={m.label} className="p-[var(--sp-3)] border border-[var(--border)]">
          <p className="font-[var(--sans)] text-[length:var(--fs-lg)] font-light text-[color:var(--emerald)]">{m.value}</p>
          <p className="font-[var(--sans)] text-[var(--fs-xs)] text-[var(--ink-muted)] mt-[var(--sp-1)]">{m.label}</p>
        </div>
      ))}
    </div>
  );
}
