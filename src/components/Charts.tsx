'use client';
import React from 'react';

// ─── Design-system colour tokens for charts ───────────────────────────────────
export const CHART_COLORS = {
  primary:  '#09090b', // braun-900  — main series
  accent:   '#ea580c', // braun-orange — deviation / warning series
  positive: '#059669', // emerald-600  — good / conformant
  warning:  '#d97706', // amber-600    — borderline
  negative: '#e11d48', // rose-600     — breach / critical
  violet:   '#7c3aed', // violet-700   — secondary / automation
  muted:    '#a1a1aa', // braun-400    — disabled / background series
  grid:     '#e4e4e7', // braun-200    — grid lines
  axis:     '#a1a1aa', // braun-400    — axis labels
} as const;

/** Ordered palette for multi-series charts */
export const SERIES_PALETTE = [
  CHART_COLORS.primary,
  CHART_COLORS.accent,
  CHART_COLORS.positive,
  CHART_COLORS.violet,
  CHART_COLORS.warning,
  CHART_COLORS.negative,
] as const;

// ─── Recharts axis tick props ─────────────────────────────────────────────────
export const AXIS_TICK = {
  fontSize: 10,
  fontFamily: '"JetBrains Mono", monospace',
  fill: CHART_COLORS.axis,
} as const;

/** Common XAxis / YAxis props — spread onto recharts axis components */
export const AXIS_PROPS = {
  axisLine: false,
  tickLine: false,
  tick: AXIS_TICK,
} as const;

/** Common CartesianGrid props */
export const GRID_PROPS = {
  strokeDasharray: '2 4',
  stroke: CHART_COLORS.grid,
  vertical: false,
} as const;

// ─── Dark tooltip (Recharts custom) ──────────────────────────────────────────
interface DarkTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number | string; color: string }>;
  label?: string;
  unit?: string;
  /** Optional custom value formatter per series */
  formatter?: (value: number | string, name: string) => string;
}

export const DarkTooltip: React.FC<DarkTooltipProps> = ({
  active, payload, label, unit = '', formatter,
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-braun-900 border border-braun-800 px-3 py-2 text-[11px] font-mono shadow-lg pointer-events-none min-w-[128px]">
      {label !== undefined && (
        <div className="text-braun-400 uppercase tracking-widest text-[10px] pb-1.5 mb-1.5 border-b border-braun-800">
          {label}
        </div>
      )}
      {payload.map((e, i) => (
        <div key={i} className="flex items-center justify-between gap-4 py-0.5">
          <div className="flex items-center gap-2 text-braun-400 min-w-0">
            <span className="w-2 h-2 flex-shrink-0 rounded-none" style={{ backgroundColor: e.color }} />
            <span className="truncate">{e.name}</span>
          </div>
          <span className="font-bold text-white tabular-nums flex-shrink-0">
            {formatter
              ? formatter(e.value, e.name)
              : `${typeof e.value === 'number' ? e.value.toLocaleString() : e.value}${unit}`}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── Inline SVG sparkline ─────────────────────────────────────────────────────
interface SparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  color = CHART_COLORS.primary,
  width = 72,
  height = 28,
  strokeWidth = 1.5,
}) => {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = strokeWidth + 1;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * (width - pad * 2) + pad;
      const y = height - pad - ((v - min) / range) * (height - pad * 2);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible flex-shrink-0">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

// ─── Chart legend ─────────────────────────────────────────────────────────────
interface LegendItem {
  label: string;
  color: string;
  dashed?: boolean;
  shape?: 'line' | 'square';
}

export const ChartLegend: React.FC<{ items: LegendItem[] }> = ({ items }) => (
  <div className="flex items-center flex-wrap gap-5 mt-4 pt-4 border-t border-braun-100">
    {items.map(({ label, color, dashed, shape = 'line' }) => (
      <div key={label} className="flex items-center gap-2">
        {shape === 'square' ? (
          <div className="w-3 h-3 flex-shrink-0" style={{ backgroundColor: color }} />
        ) : dashed ? (
          <div className="w-5 flex-shrink-0" style={{ borderTop: `2px dashed ${color}` }} />
        ) : (
          <div className="w-5 h-px flex-shrink-0" style={{ backgroundColor: color }} />
        )}
        <span className="text-[10px] font-mono text-braun-500 uppercase tracking-widest">{label}</span>
      </div>
    ))}
  </div>
);

// ─── SVG Gauge arc ────────────────────────────────────────────────────────────
interface GaugeProps {
  value: number;        // 0–100
  max?: number;
  label?: string;
  color?: string;
  size?: number;        // svg viewBox side length (default 160)
}

export const Gauge: React.FC<GaugeProps> = ({
  value,
  max = 100,
  label,
  color = CHART_COLORS.positive,
  size = 160,
}) => {
  const pct   = Math.min(1, Math.max(0, value / max));
  const r     = 60;
  const cx    = size / 2;
  const cy    = size * 0.6;
  // Semi-circle sweep: from -180° to 0°  (left to right)
  const toRad = (d: number) => (d * Math.PI) / 180;
  const startAngle = -180;
  const endAngle   = 0;
  const sweepAngle = (endAngle - startAngle) * pct;

  const arcPath = (start: number, end: number, colour: string) => {
    const x1 = cx + r * Math.cos(toRad(start));
    const y1 = cy + r * Math.sin(toRad(start));
    const x2 = cx + r * Math.cos(toRad(end));
    const y2 = cy + r * Math.sin(toRad(end));
    const large = Math.abs(end - start) > 180 ? 1 : 0;
    return (
      <path
        d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`}
        fill="none"
        stroke={colour}
        strokeWidth={10}
        strokeLinecap="butt"
      />
    );
  };

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      {/* Track */}
      {arcPath(startAngle, endAngle, '#e4e4e7')}
      {/* Fill */}
      {pct > 0 && arcPath(startAngle, startAngle + sweepAngle, color)}
      {/* Value label */}
      <text
        x={cx} y={cy - 6}
        textAnchor="middle"
        fontSize={26}
        fontWeight={300}
        fill="#09090b"
        fontFamily="Inter, sans-serif"
        letterSpacing="-1"
      >
        {Math.round(value)}{max === 100 ? '%' : ''}
      </text>
      {label && (
        <text
          x={cx} y={cy + 14}
          textAnchor="middle"
          fontSize={9}
          fill="#a1a1aa"
          fontFamily='"JetBrains Mono", monospace'
          letterSpacing="1.5"
          textDecoration="none"
        >
          {label.toUpperCase()}
        </text>
      )}
    </svg>
  );
};
