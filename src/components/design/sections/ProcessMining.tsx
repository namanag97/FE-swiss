'use client';
import React, { useState } from 'react';
import { SectionHeader, ComponentCard } from '../Shared';
import { ProcessCanvas, ProcessNode, ProcessEdge, VariantStrip } from '../../ProcessMining';
import { MetricCard } from '../../MetricCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { DarkTooltip, CHART_COLORS, AXIS_PROPS, GRID_PROPS } from '../../Charts';
import {
  CheckCircle, XCircle, AlertTriangle, Clock, TrendingUp, Shuffle,
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const variantData = [
  { variant: 'V1 Happy Path',        cases: 2310, conformant: true,  slaOk: true,  pct: 79.9 },
  { variant: 'V2 Late Invoice',      cases: 280,  conformant: true,  slaOk: false, pct: 9.7  },
  { variant: 'V3 Manual Review',     cases: 210,  conformant: false, slaOk: false, pct: 7.3  },
  { variant: 'V4 Rework Loop',       cases: 60,   conformant: false, slaOk: false, pct: 2.1  },
  { variant: 'V5 Skip Credit Check', cases: 30,   conformant: false, slaOk: true,  pct: 1.0  },
];

const slaData = [
  { month: 'JAN', compliant: 88, breach: 12 },
  { month: 'FEB', compliant: 90, breach: 10 },
  { month: 'MAR', compliant: 91, breach: 9  },
  { month: 'APR', compliant: 92, breach: 8  },
  { month: 'MAY', compliant: 93, breach: 7  },
  { month: 'JUN', compliant: 94, breach: 6  },
  { month: 'JUL', compliant: 94, breach: 6  },
  { month: 'AUG', compliant: 95, breach: 5  },
  { month: 'SEP', compliant: 95, breach: 5  },
  { month: 'OCT', compliant: 94, breach: 6  },
  { month: 'NOV', compliant: 96, breach: 4  },
  { month: 'DEC', compliant: 96, breach: 4  },
];

const totalCases      = variantData.reduce((s, v) => s + v.cases, 0);
const conformantCases = variantData.filter(v => v.conformant).reduce((s, v) => s + v.cases, 0);
const slaBreachCases  = variantData.filter(v => !v.slaOk).reduce((s, v) => s + v.cases, 0);

// ─── Section ──────────────────────────────────────────────────────────────────

export const ProcessMiningSection = () => {
  const [selectedNode,  setSelectedNode]  = useState<string | null>(null);
  const [zoom,          setZoom]          = useState(1);
  const [offset,        setOffset]        = useState({ x: 0, y: 0 });
  const [activeVariant, setActiveVariant] = useState<number | null>(null);

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader number="11" title="Process Intelligence" />

      <div className="space-y-10">

        {/* ── Conformance KPI row ────────────────────────────────────────── */}
        <div>
          <div className="text-[10px] font-mono text-braun-400 uppercase tracking-widest mb-3">Conformance Overview</div>
          <div className="border border-braun-200 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-braun-200">
            <div className="p-5 bg-white">
              <div className="text-[10px] font-mono text-braun-500 uppercase tracking-widest mb-3">Total Cases</div>
              <div className="text-3xl font-light text-braun-900 tabular-nums">{totalCases.toLocaleString()}</div>
              <div className="text-[10px] font-mono text-braun-400 mt-1">Current period</div>
            </div>
            <div className="p-5 bg-white">
              <div className="text-[10px] font-mono text-braun-500 uppercase tracking-widest mb-3">Conformance Rate</div>
              <div className="text-3xl font-light tabular-nums" style={{ color: CHART_COLORS.positive }}>
                {((conformantCases / totalCases) * 100).toFixed(1)}%
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono mt-1" style={{ color: CHART_COLORS.positive }}>
                <TrendingUp size={10} /> +6.8 pp vs prior period
              </div>
            </div>
            <div className="p-5 bg-white">
              <div className="text-[10px] font-mono text-braun-500 uppercase tracking-widest mb-3">SLA Breaches</div>
              <div className="text-3xl font-light tabular-nums text-braun-orange">{slaBreachCases}</div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-braun-orange mt-1">
                <AlertTriangle size={10} /> {((slaBreachCases / totalCases) * 100).toFixed(1)}% of cases
              </div>
            </div>
            <div className="p-5 bg-white">
              <div className="text-[10px] font-mono text-braun-500 uppercase tracking-widest mb-3">Distinct Variants</div>
              <div className="text-3xl font-light text-braun-900 tabular-nums">{variantData.length}</div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-braun-500 mt-1">
                <Clock size={10} /> Avg 5.6d throughput
              </div>
            </div>
          </div>
        </div>

        {/* ── Variant Frequency + SLA Chart ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Variant frequency */}
          <ComponentCard title="Variant Frequency Distribution">
            <div className="space-y-0">
              {variantData.map((v, i) => (
                <button
                  key={v.variant}
                  onClick={() => setActiveVariant(activeVariant === i ? null : i)}
                  className={`w-full text-left flex items-center gap-3 py-2.5 transition-colors px-1 -mx-1 group ${
                    i > 0 ? 'border-t border-braun-100' : ''
                  } ${activeVariant === i ? 'bg-braun-50' : 'hover:bg-braun-50/60'}`}
                >
                  <div className="flex-shrink-0">
                    {v.conformant
                      ? <CheckCircle size={12} className="text-emerald-500" />
                      : <XCircle    size={12} className="text-braun-orange" />}
                  </div>
                  <div className="w-38 text-[11px] font-mono text-braun-700 flex-shrink-0 truncate group-hover:text-braun-900 transition-colors" style={{ width: '9.5rem' }}>
                    {v.variant}
                  </div>
                  <div className="flex-1 h-3 bg-braun-100 relative overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 transition-all"
                      style={{
                        width: `${v.pct}%`,
                        backgroundColor: !v.conformant
                          ? CHART_COLORS.accent
                          : !v.slaOk
                          ? CHART_COLORS.warning
                          : CHART_COLORS.primary,
                        opacity: activeVariant === i ? 1 : 0.75,
                      }}
                    />
                  </div>
                  <div className="w-12 text-right text-[11px] font-mono text-braun-600 tabular-nums flex-shrink-0">{v.cases.toLocaleString()}</div>
                  <div className="w-9 text-right text-[10px] font-mono text-braun-400 flex-shrink-0">{v.pct}%</div>
                </button>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-braun-100 flex items-center gap-4">
              {[
                { color: CHART_COLORS.primary, label: 'Conformant'            },
                { color: CHART_COLORS.warning,  label: 'Conformant, SLA breach'},
                { color: CHART_COLORS.accent,   label: 'Non-conformant'        },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 flex-shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-[9px] font-mono text-braun-400">{label}</span>
                </div>
              ))}
            </div>
          </ComponentCard>

          {/* SLA compliance stacked bar */}
          <ComponentCard title="Monthly SLA Compliance — Compliant vs Breach %">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={slaData} margin={{ top: 4, right: 0, bottom: 0, left: -24 }} barSize={14} barCategoryGap="30%">
                <CartesianGrid {...GRID_PROPS} />
                <XAxis dataKey="month" {...AXIS_PROPS} />
                <YAxis {...AXIS_PROPS} tickFormatter={v => `${v}%`} domain={[0, 100]} />
                <Tooltip content={<DarkTooltip unit="%" />} />
                <Bar dataKey="compliant" name="Compliant" stackId="a" fill={CHART_COLORS.primary} radius={0} />
                <Bar dataKey="breach"    name="Breach"    stackId="a" fill={CHART_COLORS.accent}  radius={0} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-braun-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3" style={{ backgroundColor: CHART_COLORS.primary }} />
                  <span className="text-[10px] font-mono text-braun-400">Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3" style={{ backgroundColor: CHART_COLORS.accent }} />
                  <span className="text-[10px] font-mono text-braun-400">SLA Breach</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-600">Current: 96% ↑</span>
            </div>
          </ComponentCard>
        </div>

        {/* ── Process Map ────────────────────────────────────────────────── */}
        <ComponentCard
          title="Process Map (BPMN) — Interactive with bottleneck inspector"
          className="h-[500px] flex flex-col p-0 overflow-hidden relative"
        >
          {/* Legend overlay */}
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            {[
              { dot: 'bg-emerald-500', label: 'Happy Path'  },
              { dot: 'bg-amber-500',   label: 'Deviation'   },
              { dot: 'bg-braun-orange',label: 'Bottleneck'  },
            ].map(({ dot, label }) => (
              <div key={label} className="bg-white/90 backdrop-blur-sm border border-braun-200 px-3 py-1.5 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
                <span className="text-[10px] font-mono uppercase text-braun-500">{label}</span>
              </div>
            ))}
          </div>

          <ProcessCanvas className="flex-1" zoom={zoom} offset={offset} onZoomChange={setZoom} onOffsetChange={setOffset}>
            {/* Edges */}
            <ProcessEdge id="e1" source={{x:100,y:250}} target={{x:260,y:250}} weight={4} label="2,310" orientation="horizontal" />
            <ProcessEdge id="e2" source={{x:260,y:250}} target={{x:440,y:250}} weight={3} label="2,310" orientation="horizontal" />
            <ProcessEdge id="e3" source={{x:440,y:250}} target={{x:640,y:250}} weight={3} label="2,100" orientation="horizontal" />
            <ProcessEdge id="e4" source={{x:640,y:250}} target={{x:840,y:250}} weight={3} label="2,090" orientation="horizontal" />
            <ProcessEdge id="e5" source={{x:840,y:250}} target={{x:1000,y:250}} weight={2} label="2,090" orientation="horizontal" />
            <ProcessEdge id="e6" source={{x:440,y:250}} target={{x:440,y:400}} weight={1} label="210" isHappyPath={false} orientation="horizontal" />
            <ProcessEdge id="e7" source={{x:440,y:400}} target={{x:640,y:250}} weight={1} label="210" isHappyPath={false} orientation="horizontal" />

            {/* Nodes */}
            <ProcessNode x={100}  y={250} type="start"   label="Start"         status="success" />
            <ProcessNode x={260}  y={250} type="task"     label="Create Order"  metrics={{ count: 2890, avgTime: '2m'   }} selected={selectedNode==='create'}  onClick={() => setSelectedNode('create')} />
            <ProcessNode x={440}  y={250} type="gateway"  label="Credit Check"  metrics={{ count: 2890                 }} selected={selectedNode==='check'}   onClick={() => setSelectedNode('check')} />
            <ProcessNode x={440}  y={400} type="task"     label="Manual Review" metrics={{ count: 210,  avgTime: '4h'  }} status="warning" selected={selectedNode==='review'}  onClick={() => setSelectedNode('review')} />
            <ProcessNode x={640}  y={250} type="task"     label="Approve Order" metrics={{ count: 2100, avgTime: '4.5h'}} selected={selectedNode==='approve'} onClick={() => setSelectedNode('approve')} />
            <ProcessNode x={840}  y={250} type="task"     label="Ship Goods"    metrics={{ count: 2090, avgTime: '2d'  }} selected={selectedNode==='ship'}    onClick={() => setSelectedNode('ship')} />
            <ProcessNode x={1000} y={250} type="end"      label="End"           status="neutral" />
          </ProcessCanvas>

          {/* Inspector */}
          {selectedNode && (
            <div className="absolute right-4 top-4 bottom-4 w-60 bg-white/95 backdrop-blur border border-braun-200 p-5 animate-in slide-in-from-right-8 duration-300 flex flex-col">
              <div className="mb-5">
                <h4 className="text-sm font-medium text-braun-900">
                  {selectedNode==='create' ? 'Create Order' : selectedNode==='check' ? 'Credit Check' :
                   selectedNode==='review' ? 'Manual Review' : selectedNode==='approve' ? 'Approve Order' : 'Ship Goods'}
                </h4>
                <p className="text-[10px] font-mono text-braun-400 uppercase tracking-widest mt-0.5">Node Properties</p>
              </div>
              <div className="space-y-4 flex-1">
                <MetricCard label="Frequency"    value={selectedNode==='review' ? '210' : selectedNode==='ship'||selectedNode==='approve' ? '2,100' : '2,890'} className="p-0 border-0" />
                <MetricCard label="Avg Duration" value={selectedNode==='review' ? '4h 12m' : selectedNode==='approve' ? '4.5h' : selectedNode==='ship' ? '2d 3h' : '2m 30s'} className="p-0 border-0" />
                <MetricCard label="Rework Rate"  value={selectedNode==='review' ? '100%' : '2.4%'} highlight={selectedNode==='review'} className="p-0 border-0" />
                {selectedNode === 'review' && (
                  <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 p-2.5 mt-1">
                    <AlertTriangle size={11} className="text-braun-orange flex-shrink-0" />
                    <span className="text-[10px] font-mono text-braun-orange leading-snug">SLA breach — 4h 12m exceeds 1h threshold</span>
                  </div>
                )}
              </div>
              <div className="pt-4 border-t border-braun-200">
                <button onClick={() => setSelectedNode(null)} className="text-[10px] font-mono text-braun-500 hover:text-braun-900 uppercase tracking-widest transition-colors">
                  Close Inspector
                </button>
              </div>
            </div>
          )}
        </ComponentCard>

        {/* ── Variant Explorer ───────────────────────────────────────────── */}
        <ComponentCard title="Variant Explorer — Case Trace Comparison">
          <div className="mb-5 flex justify-between items-start gap-4">
            <p className="text-sm text-braun-600 max-w-lg leading-relaxed">
              Linear visualization of individual case traces. Deviated activities are
              highlighted. Each badge shows the inter-activity wait time.
            </p>
            <button className="flex-shrink-0 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-braun-900 border border-braun-200 px-3 py-1.5 hover:bg-braun-900 hover:text-white transition-colors">
              <Shuffle size={10} /> Randomize
            </button>
          </div>

          <div className="space-y-7">
            {[
              {
                id: 'V1', label: 'V1 — Happy Path', conformant: true, sla: '4.1d',
                steps: [
                  { label: 'Start Order',  duration: '0s'  },
                  { label: 'Credit Check', duration: '2m'  },
                  { label: 'Approve',      duration: '5m'  },
                  { label: 'Ship Goods',   duration: '2d'  },
                  { label: 'Invoice',      duration: '1d'  },
                ],
              },
              {
                id: 'V3', label: 'V3 — Manual Review', conformant: false, sla: '7.8d ⚠',
                steps: [
                  { label: 'Start Order',   duration: '0s'           },
                  { label: 'Credit Check',  duration: '2m'           },
                  { label: 'Manual Review', duration: '4h 12m', status: 'deviated' as const },
                  { label: 'Req. Info',     duration: '1d 3h',  status: 'deviated' as const },
                  { label: 'Approve',       duration: '30m'          },
                  { label: 'Ship Goods',    duration: '3d'           },
                ],
              },
              {
                id: 'V4', label: 'V4 — Rework Loop', conformant: false, sla: '12.4d ✗',
                steps: [
                  { label: 'Start Order',  duration: '0s'           },
                  { label: 'Credit Check', duration: '2m'           },
                  { label: 'Reject',       duration: '1h',    status: 'deviated' as const },
                  { label: 'Revise Order', duration: '2d',    status: 'deviated' as const },
                  { label: 'Credit Check', duration: '2m',    status: 'deviated' as const },
                  { label: 'Approve',      duration: '1h'           },
                  { label: 'Ship Goods',   duration: '3d'           },
                  { label: 'Invoice',      duration: '2d'           },
                ],
              },
            ].map(({ id, label, conformant, sla, steps }) => (
              <div key={id}>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="text-[10px] font-mono text-braun-500 uppercase tracking-widest">{label}</span>
                  <span className={`text-[9px] font-mono uppercase tracking-widest border px-2 py-0.5 ${
                    conformant ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-braun-orange bg-orange-50 border-orange-200'
                  }`}>{conformant ? 'Conformant' : 'Non-conformant'}</span>
                  <span className={`text-[9px] font-mono uppercase tracking-widest border px-2 py-0.5 ${
                    sla.includes('⚠') || sla.includes('✗') ? 'text-braun-orange bg-orange-50 border-orange-200' : 'text-braun-700 bg-braun-100 border-braun-200'
                  }`}>SLA: {sla}</span>
                </div>
                <VariantStrip steps={steps} />
              </div>
            ))}
          </div>
        </ComponentCard>

      </div>
    </section>
  );
};
