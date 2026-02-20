'use client';
import React, { useState } from 'react';
// Automation.tsx — uses shared chart colour tokens for status consistency
import { SectionHeader, ComponentCard } from '../Shared';
import {
  Zap, Calendar, Webhook, MousePointer,
  Database, Send, GitBranch, UserCheck, Code2, RefreshCw,
  Play, Pause, Clock, CheckCircle, AlertCircle, Plus,
  ArrowRight, ChevronRight, Settings, MoreHorizontal,
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const TRIGGER_TYPES = [
  {
    id: 'event',
    label: 'Process Event',
    desc: 'Fires on a detected activity or state change within the process log.',
    icon: <Zap size={18} />,
    example: 'task_start · case_deviated · sla_breach',
    accent: true,
  },
  {
    id: 'schedule',
    label: 'Schedule',
    desc: 'Runs on a cron-based schedule — daily, weekly, or custom interval.',
    icon: <Calendar size={18} />,
    example: '0 8 * * MON  (Mon 08:00 UTC)',
    accent: false,
  },
  {
    id: 'webhook',
    label: 'Webhook',
    desc: 'Triggered by an authenticated POST from an external service or API.',
    icon: <Webhook size={18} />,
    example: 'POST /api/hooks/{id}',
    accent: false,
  },
  {
    id: 'manual',
    label: 'Manual',
    desc: 'User-initiated directly from the Case Explorer or Studio toolbar.',
    icon: <MousePointer size={18} />,
    example: 'Run on selected case(s)',
    accent: false,
  },
];

const ACTION_TYPES = [
  { id: 'query',     label: 'Query',      desc: 'Fetch records from the process log or dataset', icon: <Database size={16}/>,  category: 'DATA'    },
  { id: 'transform', label: 'Transform',  desc: 'Map, reshape, or enrich data fields',             icon: <Code2 size={16}/>,     category: 'DATA'    },
  { id: 'notify',    label: 'Notify',     desc: 'Send alert or message to a stakeholder',           icon: <Send size={16}/>,      category: 'ACTION'  },
  { id: 'approve',   label: 'Approval',   desc: 'Human-in-the-loop decision gate',                  icon: <UserCheck size={16}/>, category: 'ACTION'  },
  { id: 'branch',    label: 'Branch',     desc: 'Conditional split based on expression',            icon: <GitBranch size={16}/>, category: 'CONTROL' },
  { id: 'loop',      label: 'Loop',       desc: 'Iterate over a filtered case list',                icon: <RefreshCw size={16}/>, category: 'CONTROL' },
];

const CATEGORY_COLORS: Record<string, string> = {
  DATA:    'text-[#7c3aed] bg-violet-50 border-violet-200',
  ACTION:  'text-braun-orange bg-orange-50 border-orange-200',
  CONTROL: 'text-braun-900 bg-braun-100 border-braun-200',
};

const PACKAGES = [
  {
    name: 'SLA Breach Monitor',
    desc: 'Detects cases exceeding SLA threshold and notifies the responsible owner.',
    status: 'active',
    trigger: 'Every 15 min',
    runs: 2840,
    successRate: 99.2,
    lastRun: '3m ago',
  },
  {
    name: 'Manual Review Escalation',
    desc: 'Auto-escalates stuck manual reviews after 2h of inactivity.',
    status: 'active',
    trigger: 'Event: task_idle',
    runs: 380,
    successRate: 97.4,
    lastRun: '12m ago',
  },
  {
    name: 'Weekly Conformance Report',
    desc: 'Generates conformance summary and distributes to stakeholders every Monday.',
    status: 'paused',
    trigger: 'Mon 08:00 UTC',
    runs: 52,
    successRate: 100,
    lastRun: '6d ago',
  },
  {
    name: 'Case Auto-Classification',
    desc: 'ML-powered case type classification at process start using variant fingerprint.',
    status: 'draft',
    trigger: 'Event: case_start',
    runs: 0,
    successRate: 0,
    lastRun: 'Never',
  },
];

// Simplified flow for a visual preview
const FLOW_NODES = [
  { id: 'trigger', label: 'SLA Breach', type: 'trigger', icon: <Zap size={12}/> },
  { id: 'query',   label: 'Query Case', type: 'data',    icon: <Database size={12}/> },
  { id: 'branch',  label: 'Threshold?', type: 'control', icon: <GitBranch size={12}/> },
  { id: 'notify',  label: 'Notify Owner', type: 'action', icon: <Send size={12}/> },
  { id: 'approve', label: 'Await Ack', type: 'action',  icon: <UserCheck size={12}/> },
];

const NODE_STYLE: Record<string, string> = {
  trigger: 'bg-orange-50 border-braun-orange text-braun-orange',
  data:    'bg-violet-50 border-violet-300 text-violet-700',
  control: 'bg-braun-100 border-braun-400 text-braun-800',
  action:  'bg-white border-braun-300 text-braun-700',
};

const STATUS_META: Record<string, { icon: React.ReactNode; label: string; cls: string }> = {
  active: { icon: <Play  size={10} />, label: 'Active',  cls: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  paused: { icon: <Pause size={10} />, label: 'Paused',  cls: 'text-braun-500 bg-braun-100 border-braun-200'     },
  draft:  { icon: <Settings size={10}/>, label: 'Draft', cls: 'text-braun-400 bg-braun-50 border-braun-200'      },
};

// ─── Component ────────────────────────────────────────────────────────────────

export const AutomationSection = () => {
  const [selectedTrigger, setSelectedTrigger] = useState<string>('event');
  const [selectedAction, setSelectedAction]   = useState<string | null>(null);

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader number="14" title="Automation Studio" />

      <div className="space-y-10">

        <p className="text-sm text-braun-500 max-w-xl leading-relaxed">
          Visual vocabulary for the automation flow builder — trigger definitions, typed action
          nodes, package management, and the assembled flow canvas.
        </p>

        {/* ── Trigger Palette ────────────────────────────────────────────── */}
        <ComponentCard title="Trigger Types — How a flow is initiated">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-braun-200 divide-x divide-braun-200">
            {TRIGGER_TYPES.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTrigger(t.id)}
                className={`text-left p-5 flex flex-col gap-3 transition-all group ${
                  selectedTrigger === t.id
                    ? 'bg-braun-900 text-white'
                    : 'bg-white hover:bg-braun-50'
                }`}
              >
                <div className={`w-8 h-8 flex items-center justify-center border transition-colors ${
                  selectedTrigger === t.id
                    ? 'border-white/20 text-white'
                    : t.accent
                    ? 'border-orange-200 text-braun-orange bg-orange-50'
                    : 'border-braun-200 text-braun-600'
                }`}>
                  {t.icon}
                </div>
                <div>
                  <div className={`text-xs font-mono uppercase tracking-widest font-bold mb-1 ${
                    selectedTrigger === t.id ? 'text-white' : 'text-braun-900'
                  }`}>{t.label}</div>
                  <div className={`text-xs leading-relaxed ${
                    selectedTrigger === t.id ? 'text-white/70' : 'text-braun-500'
                  }`}>{t.desc}</div>
                </div>
                {selectedTrigger === t.id && (
                  <div className="text-[10px] font-mono text-white/50 mt-auto pt-2 border-t border-white/10">
                    {TRIGGER_TYPES.find(x => x.id === t.id)?.example}
                  </div>
                )}
              </button>
            ))}
          </div>
          {/* Config preview */}
          <div className="mt-4 border border-braun-200 bg-braun-50 px-4 py-3 font-mono text-[11px] text-braun-600 flex items-center gap-3">
            <span className="text-braun-orange">trigger:</span>
            <span className="text-braun-900 font-bold">
              {selectedTrigger === 'event' ? 'on: process_event(case_deviated, sla_breach)' :
               selectedTrigger === 'schedule' ? 'on: schedule(cron: "*/15 * * * *")' :
               selectedTrigger === 'webhook' ? 'on: webhook(auth: bearer, method: POST)' :
               'on: manual(scope: case | workspace)'}
            </span>
          </div>
        </ComponentCard>

        {/* ── Action Node Palette ────────────────────────────────────────── */}
        <ComponentCard title="Action Node Types — Available steps in a flow">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {ACTION_TYPES.map(a => (
              <button
                key={a.id}
                onClick={() => setSelectedAction(a.id === selectedAction ? null : a.id)}
                className={`text-left p-4 border transition-all flex flex-col gap-2 ${
                  selectedAction === a.id
                    ? 'border-braun-900 bg-braun-900'
                    : 'border-braun-200 bg-white hover:border-braun-400 hover:bg-braun-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-2 ${selectedAction === a.id ? 'text-white' : 'text-braun-700'}`}>
                    {a.icon}
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">{a.label}</span>
                  </div>
                  <span className={`text-[9px] font-mono uppercase tracking-widest border px-1.5 py-0.5 ${
                    selectedAction === a.id ? 'text-white/60 border-white/20' : CATEGORY_COLORS[a.category]
                  }`}>
                    {a.category}
                  </span>
                </div>
                <p className={`text-[11px] leading-relaxed ${selectedAction === a.id ? 'text-white/70' : 'text-braun-500'}`}>
                  {a.desc}
                </p>
              </button>
            ))}
          </div>
        </ComponentCard>

        {/* ── Flow Canvas Preview ───────────────────────────────────────── */}
        <ComponentCard title="Flow Canvas — Assembled automation (SLA Breach Monitor)">
          <div className="flex items-center gap-0 overflow-x-auto pb-2">
            {FLOW_NODES.map((node, i) => (
              <React.Fragment key={node.id}>
                <div className={`flex-shrink-0 border px-4 py-3 flex flex-col items-center gap-1.5 min-w-[108px] ${NODE_STYLE[node.type]}`}>
                  <div className="opacity-70">{node.icon}</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-center leading-tight">
                    {node.label}
                  </div>
                  <div className={`text-[9px] font-mono opacity-60 uppercase tracking-widest`}>
                    {node.type}
                  </div>
                </div>
                {i < FLOW_NODES.length - 1 && (
                  <div className="flex-shrink-0 px-1">
                    <ArrowRight size={12} className="text-braun-300" />
                  </div>
                )}
              </React.Fragment>
            ))}
            <div className="flex-shrink-0 px-1"><ArrowRight size={12} className="text-braun-200" /></div>
            <div className="flex-shrink-0 border border-dashed border-braun-200 px-4 py-3 min-w-[108px] flex items-center justify-center gap-1 text-braun-300 hover:border-braun-400 hover:text-braun-500 transition-colors cursor-pointer">
              <Plus size={12} />
              <span className="text-[10px] font-mono uppercase">Add Step</span>
            </div>
          </div>

          {/* Flow metadata strip */}
          <div className="mt-5 pt-4 border-t border-braun-100 grid grid-cols-4 gap-4">
            {[
              { label: 'Steps', value: '5' },
              { label: 'Est. Runtime', value: '~2s' },
              { label: 'Trigger', value: 'Event-based' },
              { label: 'Last edited', value: '2h ago' },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-[10px] font-mono text-braun-400 uppercase tracking-widest">{label}</div>
                <div className="text-sm text-braun-900 font-light mt-0.5">{value}</div>
              </div>
            ))}
          </div>
        </ComponentCard>

        {/* ── Package List ──────────────────────────────────────────────── */}
        <ComponentCard title="Automation Packages — Deployed & managed flows">
          <div className="space-y-0">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_120px_80px_80px_120px_80px] gap-4 pb-3 border-b border-braun-200">
              {['Package', 'Trigger', 'Runs', 'Success', 'Last Run', 'Status'].map(h => (
                <div key={h} className="text-[10px] font-mono text-braun-400 uppercase tracking-widest">{h}</div>
              ))}
            </div>

            {PACKAGES.map((pkg, i) => {
              const meta = STATUS_META[pkg.status];
              return (
                <div
                  key={pkg.name}
                  className={`grid grid-cols-[1fr_120px_80px_80px_120px_80px] gap-4 items-center py-4 ${
                    i > 0 ? 'border-t border-braun-100' : ''
                  } hover:bg-braun-50 transition-colors group`}
                >
                  {/* Name + desc */}
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-braun-900 truncate group-hover:text-braun-orange transition-colors">
                      {pkg.name}
                    </div>
                    <div className="text-[11px] text-braun-400 truncate mt-0.5">{pkg.desc}</div>
                  </div>

                  {/* Trigger */}
                  <div className="text-[10px] font-mono text-braun-500 truncate">{pkg.trigger}</div>

                  {/* Runs */}
                  <div className="text-sm font-light tabular-nums text-braun-900">
                    {pkg.runs > 0 ? pkg.runs.toLocaleString() : '—'}
                  </div>

                  {/* Success rate */}
                  <div className="flex flex-col gap-1">
                    {pkg.runs > 0 ? (
                      <>
                        <span className={`text-xs font-mono tabular-nums ${pkg.successRate >= 99 ? 'text-emerald-600' : pkg.successRate >= 95 ? 'text-braun-900' : 'text-amber-600'}`}>
                          {pkg.successRate}%
                        </span>
                        <div className="h-0.5 bg-braun-100 w-full">
                          <div
                            className={`h-full ${pkg.successRate >= 99 ? 'bg-emerald-500' : pkg.successRate >= 95 ? 'bg-braun-900' : 'bg-amber-500'}`}
                            style={{ width: `${pkg.successRate}%` }}
                          />
                        </div>
                      </>
                    ) : (
                      <span className="text-[11px] font-mono text-braun-300">N/A</span>
                    )}
                  </div>

                  {/* Last run */}
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-braun-500">
                    <Clock size={10} className="text-braun-300 flex-shrink-0" />
                    {pkg.lastRun}
                  </div>

                  {/* Status badge */}
                  <div>
                    <span className={`inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest border px-2 py-0.5 ${meta.cls}`}>
                      {meta.icon}
                      {meta.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-5 pt-4 border-t border-braun-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-braun-400">
                {PACKAGES.filter(p => p.status === 'active').length} Active  ·  {PACKAGES.filter(p => p.status === 'paused').length} Paused  ·  {PACKAGES.filter(p => p.status === 'draft').length} Draft
              </span>
            </div>
            <button className="flex items-center gap-1.5 text-[10px] font-mono text-braun-900 uppercase tracking-widest border border-braun-200 px-3 py-1.5 hover:bg-braun-900 hover:text-white transition-colors">
              <Plus size={10} /> New Package
            </button>
          </div>
        </ComponentCard>

      </div>
    </section>
  );
};
