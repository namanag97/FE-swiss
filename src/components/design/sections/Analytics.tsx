'use client';
import React, { useState } from 'react';
import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { SectionHeader, ComponentCard } from '../Shared';
import {
  DarkTooltip, ChartLegend, Sparkline,
  CHART_COLORS, AXIS_PROPS, GRID_PROPS,
} from '../../Charts';
import { SkeletonDashboard } from '../../Skeleton';
import { Activity, Clock, CheckCircle, Zap, AlertTriangle, ArrowRight } from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

const caseVolumeData = MONTHS.map((month, i) => ({
  month,
  conformant: Math.round(1100 + i * 148),
  deviated:   Math.round(140  - i * 0.8),
}));

const conformanceTrend = MONTHS.map((month, i) => ({
  month,
  rate: parseFloat((88.7 + i * 0.57).toFixed(1)),
}));

const bottleneckData = [
  { activity: 'Manual Review', avgWaitH: 240, frequency: 380, slaOk: false },
  { activity: 'Ship Goods',    avgWaitH: 48,  frequency: 2650, slaOk: true  },
  { activity: 'Approve Order', avgWaitH: 4.5, frequency: 2650, slaOk: true  },
  { activity: 'Create Order',  avgWaitH: 2.3, frequency: 2890, slaOk: true  },
  { activity: 'Invoice',       avgWaitH: 1.2, frequency: 2640, slaOk: true  },
  { activity: 'Credit Check',  avgWaitH: 0.8, frequency: 2890, slaOk: true  },
];

// Sparkline data (12 data points — one per month)
const SPARK = {
  cases:     [1240, 1380, 1520, 1690, 1820, 2100, 1950, 2240, 2380, 2520, 2710, 2890],
  conf:      [88.7, 90.6, 93.4, 93.5, 94.5, 94.3, 94.9, 94.6, 94.9, 94.4, 95.2, 95.5],
  thruput:   [8.4, 8.1, 7.8, 7.5, 7.2, 7.0, 6.8, 6.5, 6.2, 6.0, 5.8, 5.6],
  auto:      [42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 74],
};

// ─── KPI Card ────────────────────────────────────────────────────────────────

interface KpiCardProps {
  label: string;
  value: string;
  sub?: string;
  trend: string;
  trendUp: boolean;
  sparkData: number[];
  sparkColor?: string;
  icon: React.ReactNode;
}

const KpiCard: React.FC<KpiCardProps> = ({
  label, value, sub, trend, trendUp, sparkData, sparkColor, icon,
}) => (
  <div className="bg-white p-5 flex flex-col gap-2.5 hover:bg-braun-50 transition-colors cursor-default border-r border-b border-braun-200 last:border-r-0">
    <div className="flex justify-between items-start">
      <span className="text-[10px] font-mono uppercase tracking-widest text-braun-500 leading-tight max-w-[120px]">{label}</span>
      <span className="text-braun-300 flex-shrink-0">{icon}</span>
    </div>
    <div className="flex items-end justify-between gap-3">
      <div>
        <div className="text-[28px] leading-none font-light text-braun-900 tracking-tight tabular-nums">{value}</div>
        {sub && <div className="text-[10px] font-mono text-braun-400 mt-1 uppercase tracking-wider">{sub}</div>}
        <div className={`flex items-center gap-1 mt-1.5 text-[10px] font-mono ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
          <span>{trendUp ? '↑' : '↓'}</span>
          <span>{trend} vs prior period</span>
        </div>
      </div>
      <Sparkline data={sparkData} color={sparkColor ?? CHART_COLORS.primary} width={72} height={28} />
    </div>
  </div>
);

// ─── Section ──────────────────────────────────────────────────────────────────

export const AnalyticsSection = () => {
  const [range, setRange]       = useState<'3M' | '6M' | '12M'>('12M');
  const [showSkeleton, setShowSkeleton] = useState(false);

  const slicedVolume = range === '3M' ? caseVolumeData.slice(-3)
    : range === '6M' ? caseVolumeData.slice(-6) : caseVolumeData;
  const slicedTrend  = range === '3M' ? conformanceTrend.slice(-3)
    : range === '6M' ? conformanceTrend.slice(-6) : conformanceTrend;

  const maxWait = bottleneckData[0].avgWaitH;

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader number="12" title="Analytics & Dashboards" />

      <div className="space-y-10">

        {/* Description + controls */}
        <div className="flex items-start justify-between gap-8">
          <p className="text-sm text-braun-500 max-w-xl leading-relaxed">
            Dashboard patterns for process analytics — KPI grids with sparklines,
            time-series charts, conformance trend tracking, and bottleneck ranking.
            Toggle the skeleton view to see loading state patterns.
          </p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setShowSkeleton(v => !v)}
              className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest border transition-colors ${
                showSkeleton ? 'bg-braun-900 text-white border-braun-900' : 'border-braun-200 text-braun-600 hover:border-braun-900'
              }`}
            >
              {showSkeleton ? '▣ Skeleton' : '◻ Skeleton'}
            </button>
            <div className="flex border border-braun-200">
              {(['3M', '6M', '12M'] as const).map(r => (
                <button key={r} onClick={() => setRange(r)}
                  className={`px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-colors border-r last:border-r-0 border-braun-200 ${
                    range === r ? 'bg-braun-900 text-white' : 'text-braun-500 hover:bg-braun-50'
                  }`}
                >{r}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Skeleton view ──────────────────────────────────────────────── */}
        {showSkeleton ? (
          <div className="animate-in fade-in duration-300">
            <div className="text-[10px] font-mono text-braun-400 uppercase tracking-widest mb-3">
              Loading state — skeleton placeholders
            </div>
            <SkeletonDashboard />
          </div>
        ) : (
          <>
            {/* ── KPI Grid ─────────────────────────────────────────────── */}
            <div>
              <div className="text-[10px] font-mono text-braun-400 uppercase tracking-widest mb-3">KPI Dashboard Grid</div>
              <div className="border border-braun-200 grid grid-cols-2 lg:grid-cols-4">
                <KpiCard label="Total Cases"      value="2,890" sub="This period"    trend="+134%"   trendUp sparkData={SPARK.cases}   sparkColor={CHART_COLORS.primary}  icon={<Activity     size={13}/>} />
                <KpiCard label="Conformance Rate" value="95.5%" sub="Conformant"     trend="+6.8 pp" trendUp sparkData={SPARK.conf}    sparkColor={CHART_COLORS.positive} icon={<CheckCircle  size={13}/>} />
                <KpiCard label="Avg Throughput"   value="5.6d"  sub="End-to-end"     trend="−33%"    trendUp sparkData={SPARK.thruput} sparkColor={CHART_COLORS.accent}   icon={<Clock        size={13}/>} />
                <KpiCard label="Automation Rate"  value="74%"   sub="Auto-handled"   trend="+32 pp"  trendUp sparkData={SPARK.auto}    sparkColor={CHART_COLORS.violet}   icon={<Zap          size={13}/>} />
              </div>
            </div>

            {/* ── Charts Row ─────────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Case Volume */}
              <ComponentCard title="Case Volume — Conformant vs Deviated" className="lg:col-span-2">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={slicedVolume} margin={{ top: 4, right: 0, bottom: 0, left: -20 }}>
                    <defs>
                      <linearGradient id="gcA" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={CHART_COLORS.primary} stopOpacity={0.07} />
                        <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gdA" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={CHART_COLORS.accent} stopOpacity={0.18} />
                        <stop offset="95%" stopColor={CHART_COLORS.accent} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid {...GRID_PROPS} />
                    <XAxis dataKey="month" {...AXIS_PROPS} />
                    <YAxis {...AXIS_PROPS} />
                    <Tooltip content={<DarkTooltip />} />
                    <Area type="monotone" dataKey="conformant" name="Conformant" stroke={CHART_COLORS.primary} strokeWidth={1.5} fill="url(#gcA)" dot={false} />
                    <Area type="monotone" dataKey="deviated"   name="Deviated"   stroke={CHART_COLORS.accent}  strokeWidth={1.5} fill="url(#gdA)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
                <ChartLegend items={[
                  { label: 'Conformant', color: CHART_COLORS.primary },
                  { label: 'Deviated',   color: CHART_COLORS.accent  },
                ]} />
              </ComponentCard>

              {/* Conformance Trend */}
              <ComponentCard title="Conformance Rate Trend">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={slicedTrend} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
                    <CartesianGrid {...GRID_PROPS} />
                    <XAxis dataKey="month" {...AXIS_PROPS} />
                    <YAxis domain={[85, 98]} {...AXIS_PROPS} tickFormatter={v => `${v}%`} />
                    <Tooltip content={<DarkTooltip unit="%" />} />
                    <Line type="monotone" dataKey={() => 95} name="Target"
                      stroke={CHART_COLORS.grid} strokeWidth={1} strokeDasharray="4 4" dot={false} legendType="none" />
                    <Line type="monotone" dataKey="rate" name="Rate"
                      stroke={CHART_COLORS.positive} strokeWidth={2} dot={false}
                      activeDot={{ r: 3, fill: CHART_COLORS.positive }} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-braun-100">
                  <div className="flex items-center gap-2">
                    <div className="w-4 border-t border-dashed border-braun-300" />
                    <span className="text-[10px] font-mono text-braun-400">Target 95%</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5">TARGET MET ✓</span>
                </div>
              </ComponentCard>
            </div>

            {/* ── Bottleneck Analysis ──────────────────────────────────── */}
            <ComponentCard title="Activity Bottleneck Analysis — Ranked by Avg Wait Time">
              <div className="grid grid-cols-[160px_1fr_80px_90px_96px] gap-4 pb-3 mb-1 border-b border-braun-200">
                {['Activity', 'Wait (relative)', 'Avg Wait', 'Volume', 'SLA'].map(h => (
                  <div key={h} className="text-[10px] font-mono text-braun-400 uppercase tracking-widest">{h}</div>
                ))}
              </div>
              <div className="space-y-0">
                {bottleneckData.map((item, i) => {
                  const pct = (item.avgWaitH / maxWait) * 100;
                  const fmtWait = item.avgWaitH >= 24 ? `${(item.avgWaitH/24).toFixed(1)}d`
                    : item.avgWaitH >= 1 ? `${item.avgWaitH}h` : `${Math.round(item.avgWaitH*60)}m`;
                  const barColor = !item.slaOk ? CHART_COLORS.accent
                    : pct > 20 ? CHART_COLORS.primary : CHART_COLORS.muted;
                  return (
                    <div key={item.activity}
                      className={`grid grid-cols-[160px_1fr_80px_90px_96px] gap-4 items-center py-3 transition-colors ${
                        i > 0 ? 'border-t border-braun-100' : ''
                      } ${!item.slaOk ? 'bg-orange-50/30 hover:bg-orange-50/50' : 'hover:bg-braun-50'}`}
                    >
                      <div className={`text-[11px] font-mono truncate ${!item.slaOk ? 'text-braun-orange font-bold' : 'text-braun-700'}`}>
                        {!item.slaOk && <AlertTriangle size={9} className="inline mr-1.5 mb-px" />}
                        {item.activity}
                      </div>
                      <div className="h-4 bg-braun-100 relative overflow-hidden">
                        <div className="absolute inset-y-0 left-0" style={{ width: `${pct}%`, backgroundColor: barColor }} />
                      </div>
                      <div className={`text-sm font-light tabular-nums text-right ${!item.slaOk ? 'text-braun-orange' : 'text-braun-900'}`}>
                        {fmtWait}
                      </div>
                      <div className="text-[11px] font-mono text-braun-500 text-right tabular-nums">
                        {item.frequency.toLocaleString()}
                      </div>
                      <div className="flex justify-end">
                        {!item.slaOk
                          ? <span className="text-[9px] font-mono uppercase text-braun-orange bg-orange-50 border border-orange-200 px-2 py-0.5">SLA BREACH</span>
                          : <span className="text-[9px] font-mono uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5">Within SLA</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-3 border-t border-braun-100 flex items-center gap-1 text-[10px] font-mono text-braun-400">
                <ArrowRight size={10} />
                Sorted descending by avg wait time
              </div>
            </ComponentCard>
          </>
        )}

      </div>
    </section>
  );
};
