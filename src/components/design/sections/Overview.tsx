'use client';
import React, { useState } from 'react';
import { SectionHeader, ComponentCard, SpecRule } from '../Shared';
import { Button, IconButton, ButtonGroup, SegmentedControl } from '../../Button';
import { Input, TextArea } from '../../Input';
import { Checkbox, Radio, Switch, Select } from '../../FormControls';
import { Badge, Tag, Avatar } from '../../DataDisplay';
import { Skeleton, SkeletonText, SkeletonKPI, SkeletonChart } from '../../Skeleton';
import { Sparkline, CHART_COLORS } from '../../Charts';
import { MetricCard } from '../../MetricCard';
import {
  Search, Menu, Grid, List as ListIcon, ArrowUpRight,
  Info, AlertTriangle, AlertCircle, CheckCircle,
  Download, Settings, Zap,
} from 'lucide-react';

// ─── Local primitive: Alert ───────────────────────────────────────────────────

const Alert: React.FC<{ type: 'info' | 'warning' | 'error' | 'success'; title: string; message: string }> = ({ type, title, message }) => {
  const styles = {
    info:    { bg: 'bg-braun-50',    border: 'border-braun-200',  icon: 'text-braun-900',  Icon: Info },
    warning: { bg: 'bg-amber-50',    border: 'border-amber-200',  icon: 'text-amber-600',  Icon: AlertTriangle },
    error:   { bg: 'bg-rose-50',     border: 'border-rose-200',   icon: 'text-rose-600',   Icon: AlertCircle },
    success: { bg: 'bg-emerald-50',  border: 'border-emerald-200',icon: 'text-emerald-600',Icon: CheckCircle },
  };
  const s = styles[type];
  return (
    <div className={`p-4 border ${s.bg} ${s.border} flex items-start gap-3`}>
      <s.Icon size={15} className={`mt-0.5 shrink-0 ${s.icon}`} />
      <div>
        <p className="text-xs font-medium text-braun-900 leading-none mb-1">{title}</p>
        <p className="text-xs text-braun-600 leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

// ─── Colour swatch ────────────────────────────────────────────────────────────

const Swatch: React.FC<{ label: string; hex: string; bg: string; dark?: boolean }> = ({ label, hex, bg, dark }) => (
  <div className={`${bg} p-3 flex flex-col justify-between h-20 hover:scale-105 transition-transform origin-bottom cursor-default group`}>
    <span className={`text-[9px] font-mono uppercase tracking-widest ${dark ? 'text-white/60' : 'text-braun-500'}`}>{label}</span>
    <span className={`text-[10px] font-mono ${dark ? 'text-white/90' : 'text-braun-800'} group-hover:opacity-70 transition-opacity`}>{hex}</span>
  </div>
);

// ─── Type specimen row ────────────────────────────────────────────────────────

const TypeRow: React.FC<{ className: string; sample: string; spec: string }> = ({ className, sample, spec }) => (
  <div className="flex items-baseline justify-between gap-8 border-b border-braun-100 py-3 group hover:border-braun-300 transition-colors">
    <span className={`${className} text-braun-900 group-hover:text-braun-orange transition-colors duration-200`}>{sample}</span>
    <span className="text-[10px] font-mono text-braun-400 shrink-0 whitespace-nowrap">{spec}</span>
  </div>
);

// ─── Main Overview ────────────────────────────────────────────────────────────

export const OverviewSection: React.FC = () => {
  const [viewMode, setViewMode]   = useState<string>('grid');
  const [period, setPeriod]       = useState<string>('weekly');
  const [radioVal, setRadioVal]   = useState<string>('a');
  const [checked, setChecked]     = useState<boolean>(true);
  const [toggled, setToggled]     = useState<boolean>(false);

  const spark1 = [12, 18, 14, 22, 19, 27, 24, 31, 28, 36];
  const spark2 = [40, 35, 38, 32, 30, 26, 22, 20, 17, 14];
  const spark3 = [10, 12, 11, 13, 12, 14, 13, 15, 14, 16];

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-20">

      {/* ── 01 · Typography ───────────────────────────────────────────────── */}
      <div>
        <SectionHeader number="01" title="Typography" />
        <div className="grid grid-cols-12 gap-12">

          {/* Display scale */}
          <div className="col-span-7 space-y-0">
            <p className="text-[10px] font-mono uppercase tracking-widest text-braun-400 mb-4">Display Scale — Inter</p>
            <TypeRow className="text-6xl font-light tracking-tighter" sample="H1. The Grid" spec="Inter Light / 60px / -0.02em" />
            <TypeRow className="text-5xl font-light tracking-tight"   sample="H2. Modular Systems"  spec="Inter Light / 48px / -0.01em" />
            <TypeRow className="text-3xl font-light"                  sample="H3. Function Over Form" spec="Inter Light / 30px" />
            <TypeRow className="text-xl font-normal"                  sample="H4. Data as Language"   spec="Inter Regular / 20px" />
            <TypeRow className="text-base font-normal text-braun-700" sample="Body Large. Information density is about clarity, not compression." spec="16px / 1.6" />
            <TypeRow className="text-sm font-normal text-braun-600"   sample="Body. Default interface text for descriptions and content." spec="14px / 1.5" />
            <TypeRow className="text-xs font-normal text-braun-500"   sample="Caption. Supporting metadata and helper text." spec="12px / 1.4" />
          </div>

          {/* Mono + rules */}
          <div className="col-span-5 space-y-8">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-braun-400 mb-4">Data / Meta — JetBrains Mono</p>
              <div className="space-y-4 border border-braun-100 p-5 bg-braun-50">
                {[
                  { cls: 'text-sm  font-mono font-bold uppercase tracking-widest', s: 'BUTTON.LABEL',    spec: '14px · bold · 0.1em' },
                  { cls: 'text-xs  font-mono uppercase tracking-widest',           s: 'SECTION.LABEL',   spec: '12px · 0.1em' },
                  { cls: 'text-xs  font-mono',                                     s: 'Data.Value_123',  spec: '12px · normal' },
                  { cls: 'text-[10px] font-mono text-braun-500',                   s: 'Meta.Timestamp',  spec: '10px' },
                  { cls: 'text-[10px] font-mono text-braun-400 uppercase tracking-widest', s: 'TABLE HEADER', spec: '10px · widest' },
                ].map(r => (
                  <div key={r.s} className="flex items-baseline justify-between gap-4 border-b border-braun-200 pb-2">
                    <span className={`${r.cls} text-braun-900`}>{r.s}</span>
                    <span className="text-[9px] font-mono text-braun-400 shrink-0">{r.spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-braun-400 mb-4">Global Variables</p>
              <div className="space-y-1">
                <SpecRule label="Corner Radius" value="0px | 2px" />
                <SpecRule label="Border Width"  value="1px" />
                <SpecRule label="Animation"     value="200ms ease-out" />
                <SpecRule label="Shadows"       value="None / Flat" />
                <SpecRule label="Font Primary"  value="Inter" />
                <SpecRule label="Font Mono"     value="JetBrains Mono" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 02 · Chromatic Scale ──────────────────────────────────────────── */}
      <div>
        <SectionHeader number="02" title="Chromatic Scale" />

        {/* Neutral ramp */}
        <div className="mb-8">
          <p className="text-[10px] font-mono uppercase tracking-widest text-braun-400 mb-3">Neutral — Braun</p>
          <div className="grid grid-cols-10 h-24">
            <Swatch label="50"  hex="#fafafa" bg="bg-braun-50"  />
            <Swatch label="100" hex="#f4f4f5" bg="bg-braun-100" />
            <Swatch label="200" hex="#e4e4e7" bg="bg-braun-200" />
            <Swatch label="300" hex="#d4d4d8" bg="bg-braun-300" />
            <Swatch label="400" hex="#a1a1aa" bg="bg-braun-400" dark />
            <Swatch label="500" hex="#71717a" bg="bg-braun-500" dark />
            <Swatch label="600" hex="#52525b" bg="bg-braun-600" dark />
            <Swatch label="800" hex="#27272a" bg="bg-braun-800" dark />
            <Swatch label="900" hex="#09090b" bg="bg-braun-900" dark />
            <Swatch label="black" hex="#000000" bg="bg-black"   dark />
          </div>
        </div>

        {/* Semantic */}
        <div className="grid grid-cols-5 gap-4">
          {[
            { label: 'Accent',   hex: '#ea580c', bg: 'bg-braun-orange', dark: true },
            { label: 'Positive', hex: '#059669', bg: 'bg-emerald-600',  dark: true },
            { label: 'Warning',  hex: '#d97706', bg: 'bg-amber-600',    dark: true },
            { label: 'Negative', hex: '#e11d48', bg: 'bg-rose-600',     dark: true },
            { label: 'Violet',   hex: '#7c3aed', bg: 'bg-violet-700',   dark: true },
          ].map(s => (
            <Swatch key={s.label} label={s.label} hex={s.hex} bg={s.bg} dark={s.dark} />
          ))}
        </div>
      </div>

      {/* ── 05 · Buttons & Controls ───────────────────────────────────────── */}
      <div>
        <SectionHeader number="05" title="Interaction" />
        <div className="grid grid-cols-3 gap-6">

          <ComponentCard title="Button Variants">
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </ComponentCard>

          <ComponentCard title="Sizes & States">
            <div className="space-y-4">
              <div className="flex gap-3 items-center">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary">Default</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
              <div className="flex gap-3 items-center">
                <Button variant="primary" isLoading>Loading</Button>
                <Button variant="secondary" disabled>Disabled</Button>
              </div>
            </div>
          </ComponentCard>

          <ComponentCard title="Icon & Groups">
            <div className="space-y-4">
              <div className="flex gap-3">
                <IconButton icon={<Menu size={16} />} variant="secondary" />
                <IconButton icon={<Search size={16} />} variant="secondary" />
                <IconButton icon={<Download size={16} />} variant="secondary" />
                <IconButton icon={<ArrowUpRight size={16} />} variant="primary" />
              </div>
              <ButtonGroup>
                <IconButton icon={<Grid size={16} />} variant={viewMode === 'grid' ? 'primary' : 'secondary'} onClick={() => setViewMode('grid')} />
                <IconButton icon={<ListIcon size={16} />} variant={viewMode === 'list' ? 'primary' : 'secondary'} onClick={() => setViewMode('list')} />
              </ButtonGroup>
            </div>
          </ComponentCard>

          <ComponentCard title="Segmented Control" className="col-span-2">
            <SegmentedControl
              value={period}
              onChange={setPeriod}
              options={[
                { value: 'daily',   label: 'Daily'   },
                { value: 'weekly',  label: 'Weekly'  },
                { value: 'monthly', label: 'Monthly' },
                { value: 'yearly',  label: 'Yearly'  },
              ]}
            />
          </ComponentCard>

          <ComponentCard title="With Icons">
            <div className="flex flex-col gap-3">
              <Button variant="primary"><Zap size={14} className="mr-1.5" />Automate</Button>
              <Button variant="secondary"><Download size={14} className="mr-1.5" />Export CSV</Button>
              <Button variant="ghost"><Settings size={14} className="mr-1.5" />Configure</Button>
            </div>
          </ComponentCard>
        </div>
      </div>

      {/* ── 06 · Form Controls ────────────────────────────────────────────── */}
      <div>
        <SectionHeader number="06" title="Form Controls" />
        <div className="grid grid-cols-3 gap-6">

          <ComponentCard title="Text Input">
            <div className="space-y-4">
              <Input label="Default"     placeholder="Enter value…" />
              <Input label="With Error"  value="Invalid input" error readOnly />
              <Input label="Disabled"    placeholder="No edit" disabled />
            </div>
          </ComponentCard>

          <ComponentCard title="Textarea">
            <TextArea label="Description" placeholder="Describe the process goal…" rows={5} />
          </ComponentCard>

          <ComponentCard title="Selection Controls">
            <div className="space-y-4">
              <Checkbox label="Enable alerts"      checked={checked}   onChange={e => setChecked(e.target.checked)} />
              <Radio    label="Option A"  name="ov1" checked={radioVal === 'a'} onChange={() => setRadioVal('a')} />
              <Radio    label="Option B"  name="ov1" checked={radioVal === 'b'} onChange={() => setRadioVal('b')} />
              <Switch   label="Live updates"       checked={toggled}   onChange={e => setToggled(e.target.checked)} />
            </div>
          </ComponentCard>
        </div>
      </div>

      {/* ── 07 · Data Display ─────────────────────────────────────────────── */}
      <div>
        <SectionHeader number="07" title="Data Display" />
        <div className="grid grid-cols-12 gap-6">

          {/* Metric cards */}
          <div className="col-span-8 grid grid-cols-3 gap-4">
            <MetricCard
              label="Cases Processed"
              value="12,843"
              trendValue="+8.4%"
              trend="up"
              sparkData={spark1}
              sparkColor={CHART_COLORS.positive}
            />
            <MetricCard
              label="Avg. Lead Time"
              value="4.7 d"
              trendValue="-12.1%"
              trend="down"
              sparkData={spark2}
              sparkColor={CHART_COLORS.negative}
            />
            <MetricCard
              label="SLA Compliance"
              value="91.2%"
              trendValue="+0.3%"
              trend="up"
              sparkData={spark3}
              sparkColor={CHART_COLORS.accent}
            />
          </div>

          {/* Badges & tags */}
          <div className="col-span-4">
            <ComponentCard title="Badges & Tags">
              <div className="space-y-5">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="neutral">Default</Badge>
                  <Badge variant="success">Conformant</Badge>
                  <Badge variant="warning">Borderline</Badge>
                  <Badge variant="error">Breach</Badge>
                  <Badge variant="outline">Pending</Badge>
                  <Badge variant="accent">Active</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Tag label="Process Mining" />
                  <Tag label="v3.2" />
                  <Tag label="KPI" />
                  <Tag label="SLA" />
                  <Tag label="BPMN" />
                </div>
                <div className="flex items-center gap-2">
                  <Avatar initials="AS" size="sm" />
                  <Avatar initials="JM" size="sm" />
                  <Avatar initials="LW" size="sm" />
                  <span className="text-[10px] font-mono text-braun-400">+11 more</span>
                </div>
              </div>
            </ComponentCard>
          </div>

          {/* Simple data table */}
          <div className="col-span-12">
            <ComponentCard title="Data Table — Case List">
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-braun-200">
                      {['Case ID', 'Variant', 'Status', 'Duration', 'Responsible'].map(h => (
                        <th key={h} className="text-left py-2 px-3 text-[10px] font-mono uppercase tracking-widest text-braun-400 font-normal">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 'C-00112', variant: 'V1 Happy Path',   status: 'conformant', dur: '3.2 d', resp: 'A. Schmidt' },
                      { id: 'C-00113', variant: 'V3 Manual Review', status: 'deviated',   dur: '7.8 d', resp: 'J. Müller'  },
                      { id: 'C-00114', variant: 'V2 Late Invoice',  status: 'conformant', dur: '2.9 d', resp: 'L. Weber'   },
                      { id: 'C-00116', variant: 'V4 Rework Loop',   status: 'deviated',   dur: '14.2 d',resp: 'J. Müller'  },
                    ].map((row, i) => (
                      <tr key={row.id} className={`border-b border-braun-100 hover:bg-braun-50 transition-colors ${i % 2 === 0 ? '' : 'bg-braun-50/40'}`}>
                        <td className="py-2 px-3 font-mono text-braun-900">{row.id}</td>
                        <td className="py-2 px-3 text-braun-700">{row.variant}</td>
                        <td className="py-2 px-3">
                          <span className={`inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest border px-2 py-0.5 ${
                            row.status === 'conformant'
                              ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                              : 'text-braun-orange bg-orange-50 border-orange-200'
                          }`}>
                            {row.status === 'conformant' ? <CheckCircle size={8} /> : <AlertTriangle size={8} />}
                            {row.status}
                          </span>
                        </td>
                        <td className="py-2 px-3 font-mono text-braun-900 text-right tabular-nums">{row.dur}</td>
                        <td className="py-2 px-3 text-braun-600">{row.resp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ComponentCard>
          </div>
        </div>
      </div>

      {/* ── 08 · Feedback ─────────────────────────────────────────────────── */}
      <div>
        <SectionHeader number="08" title="Feedback" />
        <div className="grid grid-cols-2 gap-4">
          <Alert type="info"    title="System Information"    message="The process model was last synchronized 4 hours ago. Refresh to load latest event data." />
          <Alert type="success" title="Analysis Complete"     message="12,843 cases processed. Conformance rate: 91.2%. No critical deviations detected." />
          <Alert type="warning" title="SLA Threshold Reached" message="Variant V2 (Late Invoice) has breached the 10-day SLA threshold in 38% of cases." />
          <Alert type="error"   title="Integration Failure"   message="Connection to SAP ERP data source failed. Last successful sync: 2025-01-15 at 14:32 UTC." />
        </div>
      </div>

      {/* ── Skeleton States ────────────────────────────────────────────────── */}
      <div>
        <SectionHeader number="09" title="Skeleton States" />
        <div className="grid grid-cols-3 gap-6">
          <ComponentCard title="KPI Skeleton">
            <SkeletonKPI />
          </ComponentCard>
          <ComponentCard title="Text Skeleton">
            <div className="space-y-3">
              <SkeletonText lines={1} className="w-2/3" />
              <SkeletonText lines={3} />
            </div>
          </ComponentCard>
          <ComponentCard title="Chart Skeleton">
            <SkeletonChart />
          </ComponentCard>
        </div>
      </div>

      {/* ── Design Principles footer ──────────────────────────────────────── */}
      <div className="border-t border-braun-200 pt-10 pb-4">
        <div className="grid grid-cols-3 gap-12 mb-10">
          {[
            { n: '01', title: 'Clarity',  body: 'Every element earns its place. Remove anything that does not communicate or function. Confusion is a design failure.' },
            { n: '02', title: 'Purity',   body: 'No decoration for its own sake. Surface reflects structure. The interface disappears when it works.' },
            { n: '03', title: 'Honesty',  body: 'Components tell the truth about their state. Loading, empty, error — all visible and explicit, never hidden.' },
          ].map(p => (
            <div key={p.n}>
              <div className="text-[10px] font-mono text-braun-orange mb-2">{p.n}</div>
              <h4 className="text-sm font-medium text-braun-900 uppercase tracking-widest mb-3">{p.title}</h4>
              <p className="text-xs text-braun-500 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
        <blockquote className="border-l-2 border-braun-orange pl-5 italic text-braun-600 text-sm">
          "Good design is as little design as possible." — Dieter Rams
        </blockquote>
      </div>

    </section>
  );
};
