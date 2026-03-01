"use client";

/**
 * Conceptual diagram: process-aware analytics
 * Shows KPI numbers connected to a process flow beneath — the point is that
 * metrics are tied to process context, not flat aggregation
 */
export function AnalyticsDiagram() {
  // Mini bar chart data
  const bars = [35, 52, 44, 68, 58, 72, 48];

  return (
    <svg viewBox="0 0 480 220" className="h-auto w-full" fill="none">
      {/* ── Top: KPI cards ── */}
      {[
        { label: "Cycle Time", value: "4.2d", delta: "↓ 12%", color: "#047A55" },
        { label: "Throughput", value: "847/d", delta: "↑ 8%", color: "#047A55" },
        { label: "On-Time", value: "78%", delta: "↑ 5%", color: "#047A55" },
        { label: "Rework", value: "12%", delta: "↓ 3%", color: "#047A55" },
      ].map((kpi, i) => {
        const x = 18 + i * 116;
        return (
          <g key={kpi.label}>
            <rect x={x} y={10} width={104} height={55} rx={4} fill="white" stroke="#E5E7EB" strokeWidth={1} />
            <text x={x + 12} y={28} fill="#9CA3AF" fontSize={7} fontFamily="Inter, sans-serif" fontWeight={500} letterSpacing="0.08em">
              {kpi.label.toUpperCase()}
            </text>
            <text x={x + 12} y={48} fill="#1F2937" fontSize={16} fontFamily="Inter, sans-serif" fontWeight={300} letterSpacing="-0.02em">
              {kpi.value}
            </text>
            <text x={x + 72} y={48} fill={kpi.color} fontSize={9} fontFamily="Inter, sans-serif" fontWeight={500}>
              {kpi.delta}
            </text>
          </g>
        );
      })}

      {/* ── Middle: mini bar chart + variant bars ── */}
      <rect x={18} y={76} width={220} height={90} rx={4} fill="white" stroke="#E5E7EB" strokeWidth={1} />
      <text x={30} y={94} fill="#9CA3AF" fontSize={7} fontFamily="Inter, sans-serif" fontWeight={500} letterSpacing="0.08em">
        WEEKLY THROUGHPUT
      </text>
      {bars.map((h, i) => (
        <rect
          key={i}
          x={30 + i * 26}
          y={140 - h}
          width={18}
          height={h}
          rx={2}
          fill={i === 5 ? "#047A55" : "#E5E7EB"}
        />
      ))}

      {/* Variant distribution */}
      <rect x={248} y={76} width={214} height={90} rx={4} fill="white" stroke="#E5E7EB" strokeWidth={1} />
      <text x={260} y={94} fill="#9CA3AF" fontSize={7} fontFamily="Inter, sans-serif" fontWeight={500} letterSpacing="0.08em">
        VARIANT DISTRIBUTION
      </text>

      {[
        { label: "Happy path", pct: 66, color: "#047A55" },
        { label: "Manual review", pct: 24, color: "#F59E0B" },
        { label: "Rejected", pct: 10, color: "#EF4444" },
      ].map((v, i) => {
        const y = 106 + i * 18;
        return (
          <g key={v.label}>
            <text x={260} y={y + 4} fill="#6B7280" fontSize={8} fontFamily="Inter, sans-serif">
              {v.label}
            </text>
            <rect x={345} y={y - 5} width={80} height={6} rx={3} fill="#F3F4F6" />
            <rect x={345} y={y - 5} width={80 * v.pct / 100} height={6} rx={3} fill={v.color} />
            <text x={432} y={y + 4} fill="#6B7280" fontSize={8} fontFamily="Inter, sans-serif" fontWeight={500}>
              {v.pct}%
            </text>
          </g>
        );
      })}

      {/* ── Bottom: connection line to show process-awareness ── */}
      <line x1={240} y1={170} x2={240} y2={185} stroke="#D1D5DB" strokeWidth={1} strokeDasharray="3 2" />
      <text x={240} y={200} textAnchor="middle" fill="#9CA3AF" fontSize={8} fontFamily="Inter, sans-serif" fontStyle="italic">
        Every metric traced back to the process
      </text>
    </svg>
  );
}
