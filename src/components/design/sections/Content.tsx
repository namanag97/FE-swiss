'use client';
import React, { useState } from 'react';
import { SectionHeader, ComponentCard } from '../Shared';
import { MetricCard } from '../../MetricCard';
import { Badge, Tag, Avatar, List, EmptyState } from '../../DataDisplay';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../Table';
import { DataTable, ColumnDef } from '../../DataTable';
import { SkeletonDashboard, SkeletonTable, SkeletonChart, SkeletonKPI } from '../../Skeleton';
import { User, Activity, Database, Plus, RefreshCw, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { Button } from '../../Button';
import { Sparkline, CHART_COLORS } from '../../Charts';

// ─── Case data for DataTable demo ────────────────────────────────────────────

interface CaseRow extends Record<string, unknown> {
  id:         string;
  variant:    string;
  status:     'conformant' | 'deviated';
  startDate:  string;
  duration:   number;
  events:     number;
  responsible:string;
  sla:        'ok' | 'breach';
}

const CASE_DATA: CaseRow[] = [
  { id: 'C-00112', variant: 'V1 Happy Path',        status: 'conformant', startDate: '2025-01-04', duration: 3.2,  events: 5,  responsible: 'A. Schmidt', sla: 'ok'     },
  { id: 'C-00113', variant: 'V3 Manual Review',      status: 'deviated',   startDate: '2025-01-05', duration: 7.8,  events: 8,  responsible: 'J. Müller',  sla: 'breach' },
  { id: 'C-00114', variant: 'V1 Happy Path',        status: 'conformant', startDate: '2025-01-05', duration: 2.9,  events: 5,  responsible: 'A. Schmidt', sla: 'ok'     },
  { id: 'C-00115', variant: 'V2 Late Invoice',       status: 'conformant', startDate: '2025-01-06', duration: 11.4, events: 6,  responsible: 'L. Weber',   sla: 'breach' },
  { id: 'C-00116', variant: 'V4 Rework Loop',        status: 'deviated',   startDate: '2025-01-07', duration: 14.2, events: 10, responsible: 'J. Müller',  sla: 'breach' },
  { id: 'C-00117', variant: 'V1 Happy Path',        status: 'conformant', startDate: '2025-01-08', duration: 3.8,  events: 5,  responsible: 'A. Schmidt', sla: 'ok'     },
  { id: 'C-00118', variant: 'V5 Skip Credit Check',  status: 'deviated',   startDate: '2025-01-08', duration: 2.4,  events: 4,  responsible: 'L. Weber',   sla: 'ok'     },
  { id: 'C-00119', variant: 'V1 Happy Path',        status: 'conformant', startDate: '2025-01-09', duration: 4.1,  events: 5,  responsible: 'A. Schmidt', sla: 'ok'     },
  { id: 'C-00120', variant: 'V3 Manual Review',      status: 'deviated',   startDate: '2025-01-10', duration: 9.3,  events: 9,  responsible: 'J. Müller',  sla: 'breach' },
  { id: 'C-00121', variant: 'V1 Happy Path',        status: 'conformant', startDate: '2025-01-11', duration: 3.0,  events: 5,  responsible: 'A. Schmidt', sla: 'ok'     },
  { id: 'C-00122', variant: 'V2 Late Invoice',       status: 'conformant', startDate: '2025-01-12', duration: 10.8, events: 6,  responsible: 'L. Weber',   sla: 'breach' },
  { id: 'C-00123', variant: 'V1 Happy Path',        status: 'conformant', startDate: '2025-01-13', duration: 2.7,  events: 5,  responsible: 'A. Schmidt', sla: 'ok'     },
  { id: 'C-00124', variant: 'V4 Rework Loop',        status: 'deviated',   startDate: '2025-01-14', duration: 16.1, events: 11, responsible: 'J. Müller',  sla: 'breach' },
  { id: 'C-00125', variant: 'V1 Happy Path',        status: 'conformant', startDate: '2025-01-15', duration: 3.5,  events: 5,  responsible: 'L. Weber',   sla: 'ok'     },
];

const CASE_COLUMNS: ColumnDef<CaseRow>[] = [
  {
    key: 'id', header: 'Case ID', width: '96px', sortable: true,
    render: v => <span className="font-mono text-braun-900 text-xs">{String(v)}</span>,
  },
  {
    key: 'variant', header: 'Variant', sortable: true,
    render: v => <span className="text-xs text-braun-700">{String(v)}</span>,
  },
  {
    key: 'status', header: 'Status', width: '112px', sortable: true,
    render: v => (
      <span className={`inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest border px-2 py-0.5 ${
        v === 'conformant'
          ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
          : 'text-braun-orange bg-orange-50 border-orange-200'
      }`}>
        {v === 'conformant' ? <CheckCircle size={8}/> : <AlertTriangle size={8}/>}
        {String(v)}
      </span>
    ),
  },
  {
    key: 'duration', header: 'Duration (d)', width: '96px', align: 'right', sortable: true,
    render: v => <span className="font-mono text-xs tabular-nums text-braun-900">{String(v)}</span>,
  },
  {
    key: 'events', header: 'Events', width: '72px', align: 'right', sortable: true,
    render: v => <span className="font-mono text-xs tabular-nums text-braun-600">{String(v)}</span>,
  },
  {
    key: 'responsible', header: 'Responsible', sortable: true,
    render: v => (
      <div className="flex items-center gap-2">
        <Avatar initials={String(v).split(' ').map(n => n[0]).join('')} size="sm" />
        <span className="text-xs text-braun-700">{String(v)}</span>
      </div>
    ),
  },
  {
    key: 'sla', header: 'SLA', width: '96px', sortable: true,
    render: v => v === 'ok'
      ? <span className="text-[9px] font-mono uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5">Within SLA</span>
      : <span className="text-[9px] font-mono uppercase text-braun-orange bg-orange-50 border border-orange-200 px-2 py-0.5">SLA Breach</span>,
  },
];

export const DataDisplaySection = () => {
  const [tags, setTags] = useState(['Filter: Active', 'Region: EU', 'Type: Order']);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const removeTag = (t: string) => setTags(prev => prev.filter(x => x !== t));
  const resetTags = () => setTags(['Filter: Active', 'Region: EU', 'Type: Order']);
  const toggleRow = (id: number) => setSelectedRows(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  // Sparkline data for metric cards
  const revSpark   = [30, 33, 35, 38, 36, 42, 40, 43, 42, 44, 43, 42.5];
  const userSpark  = [900, 980, 1050, 1100, 1080, 1150, 1180, 1200, 1220, 1230, 1240, 1240];
  const loadSpark  = [88, 91, 90, 93, 94, 95, 93, 96, 95, 94, 94, 94];

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader number="07" title="Data Presentation" />
      <div className="space-y-12">

        {/* ── Metric Cards with Sparklines ─────────────────────────────── */}
        <ComponentCard title="Metric Cards — with embedded sparklines">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-braun-200 divide-x divide-braun-200">
            <MetricCard
              label="Total Revenue"
              value="$42.5M"
              trend="up"
              trendValue="12.5%"
              icon={<Activity size={14}/>}
              sparkData={revSpark}
              sparkColor={CHART_COLORS.primary}
              className="hover:bg-braun-50 cursor-default border-0"
            />
            <MetricCard
              label="Active Users"
              value="1,240"
              subValue="DAILY AVG"
              icon={<User size={14}/>}
              sparkData={userSpark}
              sparkColor={CHART_COLORS.positive}
              className="hover:bg-braun-50 cursor-default border-0"
            />
            <MetricCard
              label="System Load"
              value="94%"
              highlight
              trend="down"
              trendValue="2%"
              icon={<Database size={14}/>}
              sparkData={loadSpark}
              sparkColor={CHART_COLORS.accent}
              className="hover:bg-braun-50 cursor-default border-0"
            />
          </div>
        </ComponentCard>

        {/* ── DataTable ────────────────────────────────────────────────── */}
        <ComponentCard title="Data Table — Sortable, Filterable, Selectable (Case Explorer)">
          <DataTable
            data={CASE_DATA}
            columns={CASE_COLUMNS}
            idKey="id"
            pageSize={6}
            selectable
            searchable
            emptyMessage="No cases match the current filter."
            toolbar={
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-braun-400 uppercase tracking-widest">
                <Clock size={10}/> Last 30 days
              </div>
            }
          />
        </ComponentCard>

        {/* ── Basic Table ──────────────────────────────────────────────── */}
        <ComponentCard title="Table Primitives — Semantic HTML table with styled cells">
          <div className="mb-4 flex justify-between items-center">
            <span className="text-[10px] font-mono text-braun-400 uppercase tracking-widest">{selectedRows.size} Rows Selected</span>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input type="checkbox" className="accent-braun-900 w-3.5 h-3.5"
                    checked={selectedRows.size === 3}
                    onChange={() => selectedRows.size === 3 ? setSelectedRows(new Set()) : setSelectedRows(new Set([1,2,3]))}
                  />
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Entity Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1,2,3].map((i, idx) => (
                <TableRow
                  key={i}
                  className={`cursor-pointer transition-colors ${selectedRows.has(i) ? 'bg-braun-100' : 'hover:bg-braun-50'}`}
                  onClick={() => toggleRow(i)}
                >
                  <TableCell>
                    <input type="checkbox" checked={selectedRows.has(i)}
                      onChange={() => toggleRow(i)} className="accent-braun-900 w-3.5 h-3.5"
                    />
                  </TableCell>
                  <TableCell className="font-mono text-braun-500">#00{i}</TableCell>
                  <TableCell className="font-medium text-braun-900">Alpha_Node_{i}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar initials={`U${i}`} size="sm" />
                      <span>User {i}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={i === 2 ? 'warning' : 'success'} size="sm">
                      {i === 2 ? 'Pending' : 'Active'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-braun-600">
                    {[842.30, 271.00, 1190.50][idx].toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ComponentCard>

        {/* ── Status taxonomy + Tags ────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ComponentCard title="Status & Taxonomy — Badges and Tags">
            <div className="space-y-8">
              <div>
                <h5 className="text-[10px] font-mono text-braun-400 uppercase tracking-widest mb-4">Badges</h5>
                <div className="flex flex-wrap gap-2">
                  {(['neutral','primary','outline','accent','success','warning','error'] as const).map(variant => (
                    <Badge key={variant} variant={variant}>
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-[10px] font-mono text-braun-400 uppercase tracking-widest">Interactive Tags</h5>
                  {tags.length < 3 && (
                    <button onClick={resetTags} className="text-[10px] text-braun-900 font-mono uppercase tracking-widest flex items-center gap-1 hover:text-braun-orange transition-colors">
                      <RefreshCw size={10}/> Reset
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 min-h-[32px]">
                  {tags.map(tag => <Tag key={tag} label={tag} onRemove={() => removeTag(tag)} />)}
                  {tags.length === 0 && <span className="text-xs text-braun-300 italic py-1">No filters applied</span>}
                </div>
              </div>
            </div>
          </ComponentCard>

          <ComponentCard title="Lists & Avatars">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h5 className="text-[10px] font-mono text-braun-400 uppercase tracking-widest mb-4">Resource List</h5>
                <List variant="divided" items={[
                  <div className="flex items-center gap-3"><Avatar initials="JD"/><div><div className="font-medium text-xs">John Doe</div><div className="text-[10px] text-braun-400">Admin</div></div></div>,
                  <div className="flex items-center gap-3"><Avatar initials="AS"/><div><div className="font-medium text-xs">Alice Smith</div><div className="text-[10px] text-braun-400">Viewer</div></div></div>,
                  <div className="flex items-center gap-3"><Avatar initials="TS"/><div><div className="font-medium text-xs">Tom Scott</div><div className="text-[10px] text-braun-400">Editor</div></div></div>,
                ]} />
              </div>
              <div>
                <h5 className="text-[10px] font-mono text-braun-400 uppercase tracking-widest mb-4">Ordered Steps</h5>
                <List type="ol" items={[
                  'Initialize workspace',
                  'Configure connectors',
                  'Validate schema mapping',
                  'Execute pipeline',
                ]} />
              </div>
            </div>
          </ComponentCard>
        </div>

        {/* ── Skeleton Loading States ───────────────────────────────────── */}
        <ComponentCard title="Skeleton Loading States — Placeholders while data fetches">
          <div className="space-y-8">
            <div>
              <div className="text-[10px] font-mono text-braun-400 uppercase tracking-widest mb-4">KPI Card Skeletons</div>
              <div className="grid grid-cols-4 gap-0 border border-braun-200 divide-x divide-braun-200">
                <SkeletonKPI className="border-0" />
                <SkeletonKPI className="border-0" />
                <SkeletonKPI className="border-0" />
                <SkeletonKPI className="border-0" />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] font-mono text-braun-400 uppercase tracking-widest mb-4">Chart Skeleton</div>
                <SkeletonChart />
              </div>
              <div>
                <div className="text-[10px] font-mono text-braun-400 uppercase tracking-widest mb-4">Table Skeleton</div>
                <SkeletonTable rows={4} />
              </div>
            </div>
          </div>
        </ComponentCard>

        {/* ── Empty State ──────────────────────────────────────────────── */}
        <ComponentCard title="Empty State">
          <EmptyState
            title="No Datasets Found"
            description="Upload a process log to this workspace to begin mining."
            action={<Button variant="secondary" icon={<Plus size={14}/>}>Upload Data</Button>}
          />
        </ComponentCard>

      </div>
    </section>
  );
};
