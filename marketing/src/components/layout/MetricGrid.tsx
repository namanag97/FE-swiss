interface Metric {
  value: string;
  label: string;
}

export function MetricGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <div style={{ marginTop: "var(--sp-5)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--sp-3)" }}>
      {metrics.map((m) => (
        <div key={m.label} style={{ padding: "var(--sp-3)", border: "1px solid var(--border)" }}>
          <p style={{ fontFamily: "var(--sans)", fontSize: "var(--fs-lg)", fontWeight: 300, color: "var(--emerald)" }}>{m.value}</p>
          <p style={{ fontFamily: "var(--sans)", fontSize: "var(--fs-xs)", color: "var(--ink-muted)", marginTop: "var(--sp-1)" }}>{m.label}</p>
        </div>
      ))}
    </div>
  );
}
