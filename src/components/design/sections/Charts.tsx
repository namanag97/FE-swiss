'use client';
import React, { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  ScatterChart, Scatter, XAxis, YAxis, ZAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  ReferenceLine, ComposedChart,
} from 'recharts';
import { SectionHeader, ComponentCard } from '../Shared';
import {
  DarkTooltip, ChartLegend, Gauge,
  CHART_COLORS, SERIES_PALETTE, AXIS_PROPS, GRID_PROPS,
} from '../../Charts';

// ─── Data ─────────────────────────────────────────────────────────────────────

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

// Multi-series line — process metrics over 12 months
const timeSeriesData = MONTHS.map((month, i) => ({
  month,
  conformant: Math.round(1100 + i * 150 + (i % 3 === 0 ? -80 : 40)),
  deviated:   Math.round(140  - i * 5  + (i % 4 === 0 ?  20 : -5)),
  automation: Math.round(42   + i * 2.7),
}));

// Stacked area — throughput composition
const stackedAreaData = MONTHS.map((month, i) => ({
  month,
  '<1d':  420 + i * 18,
  '1–5d': 880 + i * 22,
  '5–10d':360 - i * 8,
  '>10d': 180 - i * 12,
}));

// Horizontal bar — activity ranking by avg wait
const hBarData = [
  { activity: 'Manual Review',  wait: 240, sla: false },
  { activity: 'Ship Goods',     wait: 48,  sla: true  },
  { activity: 'Approve Order',  wait: 4.5, sla: true  },
  { activity: 'Create Order',   wait: 2.3, sla: true  },
  { activity: 'Invoice',        wait: 1.2, sla: true  },
  { activity: 'Credit Check',   wait: 0.8, sla: true  },
];

// Grouped bar — period comparison
const groupedBarData = [
  { period: 'Q1', cases: 4140, deviated: 370, automated: 1740 },
  { period: 'Q2', cases: 5610, deviated: 330, automated: 2310 },
  { period: 'Q3', period2: 'Q3', cases: 6570, deviated: 340, automated: 3050 },
  { period: 'Q4', cases: 8120, deviated: 400, automated: 4200 },
];

// Scatter — case duration vs event count
const scatterData = [
  { duration: 0.5, events: 5,  conformant: true  },
  { duration: 1.2, events: 5,  conformant: true  },
  { duration: 2.1, events: 6,  conformant: true  },
  { duration: 1.8, events: 6,  conformant: true  },
  { duration: 3.5, events: 7,  conformant: true  },
  { duration: 2.9, events: 6,  conformant: true  },
  { duration: 4.1, events: 7,  conformant: true  },
  { duration: 5.2, events: 8,  conformant: false },
  { duration: 7.8, events: 9,  conformant: false },
  { duration: 8.4, events: 10, conformant: false },
  { duration: 12.3,events: 11, conformant: false },
  { duration: 6.1, events: 8,  conformant: false },
  { duration: 9.5, events: 9,  conformant: false },
  { duration: 0.9, events: 5,  conformant: true  },
  { duration: 3.2, events: 7,  conformant: true  },
  { duration: 15.1,events: 13, conformant: false },
  { duration: 1.5, events: 5,  conformant: true  },
  { duration: 4.8, events: 8,  conformant: false },
];

// Conformance heatmap — activities × variants
const HEAT_ACTIVITIES = ['Create Order','Credit Check','Approve','Manual Review','Ship Goods','Invoice'];
const HEAT_VARIANTS   = ['V1 Happy','V2 Late Inv','V3 Manual','V4 Rework','V5 Skip CC'];
// Frequency (0–100 normalised) per [activity][variant]
const HEAT_VALUES: number[][] = [
  [100, 95,  75,  60,  30 ],  // Create Order
  [100, 95,  75,  60,   0 ],  // Credit Check (V5 skips it)
  [ 95, 92,  65,  55,  28 ],  // Approve
  [  0,  0, 100, 100,   0 ],  // Manual Review (only V3 & V4)
  [ 95, 82,  62,  52,  26 ],  // Ship Goods
  [ 95, 28,  60,  50,  25 ],  // Invoice
];

// ─── Heatmap cell component ───────────────────────────────────────────────────

const heatColor = (v: number) => {
  // 0=white → 50=mid-grey → 100=braun-900
  if (v === 0)   return '#fafafa';
  if (v < 30)    return '#f4f4f5';
  if (v < 60)    return '#a1a1aa';
  if (v < 85)    return '#52525b';
  return '#09090b';
};

const HeatCell: React.FC<{ value: number; label?: string }> = ({ value, label }) => (
  <div
    className="h-8 flex items-center justify-center text-[9px] font-mono transition-all cursor-default group relative"
    style={{ backgroundColor: heatColor(value), color: value > 50 ? '#fff' : '#52525b' }}
    title={label ?? `${value}%`}
  >
    {value > 0 ? `${value}%` : '—'}
    {/* Tooltip on hover */}
    {label && (
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-braun-900 text-white text-[9px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
        {label}
      </div>
    )}
  </div>
);

// ─── Section ──────────────────────────────────────────────────────────────────

export const ChartsSection = () => {
  const [activeComposed, setActiveComposed] = useState<'cases' | 'rate'>('cases');

  const maxWait = hBarData[0].wait;

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader number="13" title="Charts & Visualizations" />

      <div className="space-y-8">
        <p className="text-sm text-braun-500 max-w-2xl leading-relaxed">
          Unified chart vocabulary built on Recharts with the Braun palette. All charts share
          axis styling, tooltip design, and legend format. Use these patterns for any
          time-series, ranking, distribution, or correlation view.
        </p>

        {/* ── Row 1: Multi-series Line + Stacked Area ────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Multi-series Line */}
          <ComponentCard title="Line Chart — Multi-Series Trend">
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => setActiveComposed('cases')}
                className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1 border transition-colors ${
                  activeComposed === 'cases' ? 'bg-braun-900 text-white border-braun-900' : 'border-braun-200 text-braun-500 hover:border-braun-900'
                }`}
              >Cases</button>
              <button
                onClick={() => setActiveComposed('rate')}
                className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1 border transition-colors ${
                  activeComposed === 'rate' ? 'bg-braun-900 text-white border-braun-900' : 'border-braun-200 text-braun-500 hover:border-braun-900'
                }`}
              >Automation %</button>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={timeSeriesData} margin={{ top: 4, right: 4, bottom: 0, left: -18 }}>
                <CartesianGrid {...GRID_PROPS} />
                <XAxis dataKey="month" {...AXIS_PROPS} />
                <YAxis {...AXIS_PROPS} />
                <Tooltip content={<DarkTooltip />} />
                {activeComposed === 'cases' ? (
                  <>
                    <Line type="monotone" dataKey="conformant" name="Conformant"
                      stroke={CHART_COLORS.primary} strokeWidth={1.5} dot={false}
                      activeDot={{ r: 3, fill: CHART_COLORS.primary }} />
                    <Line type="monotone" dataKey="deviated" name="Deviated"
                      stroke={CHART_COLORS.accent} strokeWidth={1.5} dot={false}
                      activeDot={{ r: 3, fill: CHART_COLORS.accent }} />
                  </>
                ) : (
                  <Line type="monotone" dataKey="automation" name="Automation %"
                    stroke={CHART_COLORS.violet} strokeWidth={2} dot={false}
                    activeDot={{ r: 3, fill: CHART_COLORS.violet }} />
                )}
              </LineChart>
            </ResponsiveContainer>
            <ChartLegend
              items={activeComposed === 'cases'
                ? [{ label: 'Conformant', color: CHART_COLORS.primary }, { label: 'Deviated', color: CHART_COLORS.accent }]
                : [{ label: 'Automation Rate', color: CHART_COLORS.violet }]}
            />
          </ComponentCard>

          {/* Stacked Area */}
          <ComponentCard title="Area Chart — Stacked Throughput Distribution">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={stackedAreaData} margin={{ top: 4, right: 4, bottom: 0, left: -18 }}>
                <defs>
                  {(['<1d','1–5d','5–10d','>10d'] as const).map((k, i) => (
                    <linearGradient key={k} id={`sg${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={SERIES_PALETTE[i]} stopOpacity={0.6} />
                      <stop offset="95%" stopColor={SERIES_PALETTE[i]} stopOpacity={0.2} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid {...GRID_PROPS} />
                <XAxis dataKey="month" {...AXIS_PROPS} />
                <YAxis {...AXIS_PROPS} />
                <Tooltip content={<DarkTooltip />} />
                {['<1d','1–5d','5–10d','>10d'].map((k, i) => (
                  <Area key={k} type="monotone" dataKey={k} name={k}
                    stackId="a" stroke={SERIES_PALETTE[i]} strokeWidth={1}
                    fill={`url(#sg${i})`} />
                ))}
              </AreaChart>
            </ResponsiveContainer>
            <ChartLegend items={['<1d','1–5d','5–10d','>10d'].map((l, i) => ({
              label: l, color: SERIES_PALETTE[i], shape: 'square' as const,
            }))} />
          </ComponentCard>
        </div>

        {/* ── Row 2: Horizontal Bar + Grouped Bar ───────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Horizontal bar — bottleneck ranking */}
          <ComponentCard title="Bar Chart (Horizontal) — Activity Wait Time Ranking">
            <div className="space-y-0">
              {hBarData.map((item, i) => {
                const pct = (item.wait / maxWait) * 100;
                const fmtWait = item.wait >= 24 ? `${(item.wait/24).toFixed(1)}d`
                  : item.wait >= 1 ? `${item.wait}h` : `${Math.round(item.wait*60)}m`;
                return (
                  <div key={item.activity}
                    className={`flex items-center gap-3 py-2.5 ${i > 0 ? 'border-t border-braun-100' : ''}`}>
                    <div className="w-28 text-[10px] font-mono text-braun-600 flex-shrink-0 truncate">
                      {item.activity}
                    </div>
                    <div className="flex-1 h-4 bg-braun-100 relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: !item.sla ? CHART_COLORS.accent : pct > 30 ? CHART_COLORS.primary : CHART_COLORS.muted,
                        }}
                      />
                    </div>
                    <div className={`w-10 text-right text-[11px] font-mono flex-shrink-0 tabular-nums ${!item.sla ? 'text-braun-orange font-bold' : 'text-braun-700'}`}>
                      {fmtWait}
                    </div>
                    <div className="w-14 flex-shrink-0 flex justify-end">
                      {!item.sla
                        ? <span className="text-[8px] font-mono uppercase text-braun-orange border border-orange-200 bg-orange-50 px-1.5 py-0.5">SLA</span>
                        : <span className="text-[8px] font-mono uppercase text-emerald-700 border border-emerald-200 bg-emerald-50 px-1.5 py-0.5">OK</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </ComponentCard>

          {/* Grouped bar — quarterly comparison */}
          <ComponentCard title="Bar Chart (Grouped) — Quarterly Comparison">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={groupedBarData} margin={{ top: 4, right: 4, bottom: 0, left: -18 }} barGap={2} barCategoryGap="30%">
                <CartesianGrid {...GRID_PROPS} />
                <XAxis dataKey="period" {...AXIS_PROPS} />
                <YAxis {...AXIS_PROPS} />
                <Tooltip content={<DarkTooltip />} />
                <Bar dataKey="cases"     name="Total Cases" fill={CHART_COLORS.primary} radius={0} maxBarSize={24} />
                <Bar dataKey="automated" name="Automated"   fill={CHART_COLORS.violet}  radius={0} maxBarSize={24} />
                <Bar dataKey="deviated"  name="Deviated"    fill={CHART_COLORS.accent}  radius={0} maxBarSize={24} />
              </BarChart>
            </ResponsiveContainer>
            <ChartLegend items={[
              { label: 'Total Cases', color: CHART_COLORS.primary, shape: 'square' },
              { label: 'Automated',   color: CHART_COLORS.violet,  shape: 'square' },
              { label: 'Deviated',    color: CHART_COLORS.accent,  shape: 'square' },
            ]} />
          </ComponentCard>
        </div>

        {/* ── Row 3: Scatter + Heatmap ──────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Scatter — correlation */}
          <ComponentCard title="Scatter Plot — Case Duration vs. Event Count (Outlier Detection)">
            <ResponsiveContainer width="100%" height={220}>
              <ScatterChart margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
                <CartesianGrid {...GRID_PROPS} />
                <XAxis
                  type="number" dataKey="duration" name="Duration (d)"
                  {...AXIS_PROPS}
                  label={{ value: 'days', position: 'insideBottomRight', offset: -4, fontSize: 9, fill: CHART_COLORS.axis, fontFamily: '"JetBrains Mono", monospace' }}
                />
                <YAxis type="number" dataKey="events" name="Events" {...AXIS_PROPS} />
                <ZAxis range={[36, 36]} />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3', stroke: CHART_COLORS.grid }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0]?.payload as typeof scatterData[0];
                    return (
                      <div className="bg-braun-900 border border-braun-800 px-3 py-2 text-[11px] font-mono">
                        <div className="text-braun-400 mb-1 pb-1 border-b border-braun-800 text-[10px]">Case</div>
                        <div className="flex justify-between gap-4 text-white">
                          <span className="text-braun-400">Duration</span>
                          <span className="font-bold">{d.duration}d</span>
                        </div>
                        <div className="flex justify-between gap-4 text-white">
                          <span className="text-braun-400">Events</span>
                          <span className="font-bold">{d.events}</span>
                        </div>
                        <div className={`mt-1.5 text-[9px] uppercase tracking-widest ${d.conformant ? 'text-emerald-400' : 'text-orange-400'}`}>
                          {d.conformant ? 'Conformant' : 'Non-conformant'}
                        </div>
                      </div>
                    );
                  }}
                />
                {/* Conformant */}
                <Scatter
                  name="Conformant"
                  data={scatterData.filter(d => d.conformant)}
                  fill={CHART_COLORS.primary}
                  fillOpacity={0.7}
                />
                {/* Deviated */}
                <Scatter
                  name="Deviated"
                  data={scatterData.filter(d => !d.conformant)}
                  fill={CHART_COLORS.accent}
                  fillOpacity={0.8}
                />
                {/* SLA threshold line */}
                <ReferenceLine x={10} stroke={CHART_COLORS.warning} strokeDasharray="4 4" strokeWidth={1} />
              </ScatterChart>
            </ResponsiveContainer>
            <ChartLegend items={[
              { label: 'Conformant',       color: CHART_COLORS.primary, shape: 'square' },
              { label: 'Non-conformant',   color: CHART_COLORS.accent,  shape: 'square' },
              { label: 'SLA threshold 10d', color: CHART_COLORS.warning, dashed: true   },
            ]} />
          </ComponentCard>

          {/* CSS Heatmap — conformance matrix */}
          <ComponentCard title="Heatmap — Activity × Variant Conformance Matrix">
            <div className="overflow-x-auto">
              {/* Column headers */}
              <div className="grid gap-px mb-px" style={{ gridTemplateColumns: `160px repeat(${HEAT_VARIANTS.length}, 1fr)` }}>
                <div />
                {HEAT_VARIANTS.map(v => (
                  <div key={v} className="text-[9px] font-mono text-braun-500 uppercase tracking-widest text-center pb-1.5 truncate px-1">{v}</div>
                ))}
              </div>
              {/* Rows */}
              <div className="space-y-px">
                {HEAT_ACTIVITIES.map((activity, r) => (
                  <div key={activity} className="grid gap-px" style={{ gridTemplateColumns: `160px repeat(${HEAT_VARIANTS.length}, 1fr)` }}>
                    {/* Row label */}
                    <div className="flex items-center text-[10px] font-mono text-braun-600 pr-3 truncate h-8">
                      {activity}
                    </div>
                    {/* Cells */}
                    {HEAT_VALUES[r].map((val, c) => (
                      <HeatCell
                        key={c}
                        value={val}
                        label={`${activity} / ${HEAT_VARIANTS[c]}: ${val}%`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {/* Scale legend */}
            <div className="flex items-center gap-3 mt-5 pt-4 border-t border-braun-100">
              <span className="text-[10px] font-mono text-braun-400">Frequency scale:</span>
              <div className="flex gap-px">
                {[0, 25, 50, 75, 100].map(v => (
                  <div key={v} className="w-8 h-3 flex items-center justify-center text-[8px] font-mono"
                    style={{ backgroundColor: heatColor(v), color: v > 50 ? '#fff' : '#71717a' }}>
                    {v > 0 ? v : '—'}
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-mono text-braun-300">%</span>
            </div>
          </ComponentCard>
        </div>

        {/* ── Row 4: Gauges ─────────────────────────────────────────────── */}
        <ComponentCard title="Gauge — KPI Dials for Single-Value Metrics">
          <div className="grid grid-cols-3 gap-0 divide-x divide-braun-100">
            {[
              { value: 95.5, label: 'Conformance', color: CHART_COLORS.positive },
              { value: 74,   label: 'Automation',  color: CHART_COLORS.violet   },
              { value: 91.2, label: 'SLA Compliant', color: CHART_COLORS.primary },
            ].map(({ value, label, color }) => (
              <div key={label} className="flex flex-col items-center py-6 gap-2">
                <Gauge value={value} label={label} color={color} size={140} />
                <div className="text-[10px] font-mono text-braun-400 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </ComponentCard>

      </div>
    </section>
  );
};
