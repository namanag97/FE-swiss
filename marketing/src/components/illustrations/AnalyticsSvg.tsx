/* eslint-disable react/forbid-dom-props */

import { C } from "@/lib/colors";

export function AnalyticsSvg() {
  return (
    <svg viewBox="0 0 520 310" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="KPI dashboard showing cycle time, throughput, on-time metrics and variant distribution" style={{ width: "100%", height: "auto" }}>
      {/* Dashboard frame */}
      <rect x={8} y={8} width={504} height={294} rx={2} fill={C.white} stroke={C.border} />
      <rect x={8} y={8} width={504} height={28} rx={2} fill={C.bg} stroke={C.border} />
      <text x={24} y={26} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.muted} letterSpacing={1}>KPI DASHBOARD</text>
      <circle cx={488} cy={22} r={4} fill={C.greenLight} stroke={C.green} strokeWidth={1} />

      {/* KPI Cards */}
      {[
        { label: "Cycle Time", value: "4.2d", change: "12%", down: true, x: 24 },
        { label: "Throughput", value: "847/d", change: "8%", down: false, x: 188 },
        { label: "On-Time", value: "78%", change: "5%", down: false, x: 352 },
      ].map((kpi) => (
        <g key={kpi.label}>
          <rect x={kpi.x} y={48} width={148} height={64} rx={2} fill={C.white} stroke={C.border} />
          <text x={kpi.x + 12} y={66} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={500} fill={C.muted} letterSpacing={0.3}>{kpi.label}</text>
          <text x={kpi.x + 12} y={90} fontSize={22} fontFamily="Inter, system-ui, sans-serif" fontWeight={300} fill={C.dark}>{kpi.value}</text>
          <text x={kpi.x + 12} y={104} fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={500} fill={kpi.down ? C.amber : C.green}>
            {kpi.down ? "\u2193" : "\u2191"} {kpi.change}
          </text>
        </g>
      ))}

      {/* Variant Distribution */}
      <text x={24} y={140} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.muted} letterSpacing={1}>VARIANT DISTRIBUTION</text>

      {/* Bars */}
      {[
        { label: "Happy path", pct: 66, color: C.green },
        { label: "With review", pct: 24, color: C.amber },
        { label: "Rejected", pct: 10, color: C.red },
      ].map((v, i) => {
        const y = 156 + i * 38;
        return (
          <g key={v.label}>
            <text x={24} y={y + 6} fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.mid}>{v.label}</text>
            <text x={488} y={y + 6} textAnchor="end" fontSize={10} fontFamily="'Geist Mono', monospace" fontWeight={500} fill={C.text}>{v.pct}%</text>
            <rect x={24} y={y + 12} width={440} height={8} rx={1} fill={C.bg} stroke={C.border} strokeWidth={0.5} />
            <rect x={24} y={y + 12} width={440 * v.pct / 100} height={8} rx={1} fill={v.color} opacity={0.7} />
          </g>
        );
      })}

      {/* Mini sparkline */}
      <text x={24} y={270} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.muted} letterSpacing={1}>THROUGHPUT — 30D</text>
      <polyline
        points="24,294 60,291 96,288 132,289 168,284 204,281 240,285 276,279 312,276 348,273 384,277 420,270 456,267 488,264"
        fill="none"
        stroke={C.green}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
