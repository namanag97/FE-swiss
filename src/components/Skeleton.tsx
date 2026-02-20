import React from 'react';
import { twMerge } from 'tailwind-merge';

// Fixed bar heights to avoid hydration mismatch (no Math.random at render time)
const BAR_HEIGHTS_PCT = [45, 72, 55, 88, 63, 91, 40, 76, 58, 82, 48, 95];

// ─── Base ─────────────────────────────────────────────────────────────────────

export const Skeleton: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className,
  style,
}) => (
  <div
    className={twMerge('bg-braun-200 animate-pulse', className)}
    style={style}
  />
);

// ─── Text lines ───────────────────────────────────────────────────────────────

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 1,
  className,
}) => (
  <div className={twMerge('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        className={`h-3 ${i === lines - 1 && lines > 1 ? 'w-2/3' : 'w-full'}`}
      />
    ))}
  </div>
);

// ─── KPI card skeleton ────────────────────────────────────────────────────────

export const SkeletonKPI: React.FC<{ className?: string }> = ({ className }) => (
  <div className={twMerge('p-5 border border-braun-200 bg-white', className)}>
    <Skeleton className="h-2.5 w-24 mb-3" />
    <Skeleton className="h-8 w-28 mb-2" />
    <Skeleton className="h-2 w-16" />
  </div>
);

// ─── Chart skeleton ───────────────────────────────────────────────────────────

export const SkeletonChart: React.FC<{ className?: string }> = ({ className }) => (
  <div className={twMerge('p-5 border border-braun-200 bg-white', className)}>
    <Skeleton className="h-2.5 w-40 mb-5" />
    <div className="flex items-end gap-1 h-36">
      {BAR_HEIGHTS_PCT.map((h, i) => (
        <Skeleton key={i} className="flex-1" style={{ height: `${h}%` }} />
      ))}
    </div>
    <div className="flex justify-between mt-3">
      {['JAN', 'MAR', 'JUN', 'SEP', 'DEC'].map(m => (
        <Skeleton key={m} className="h-2 w-6" />
      ))}
    </div>
  </div>
);

// ─── Table skeleton ───────────────────────────────────────────────────────────

const SkeletonTableRow: React.FC<{ cols?: number }> = ({ cols = 5 }) => (
  <div className="flex items-center gap-4 px-6 py-4 border-b border-braun-100">
    <Skeleton className="w-4 h-4 flex-shrink-0" />
    {Array.from({ length: cols }).map((_, i) => (
      <Skeleton
        key={i}
        className="h-3"
        style={{ width: [64, 140, 96, 72, 56][i % 5] }}
      />
    ))}
  </div>
);

export const SkeletonTable: React.FC<{ rows?: number; className?: string }> = ({
  rows = 5,
  className,
}) => (
  <div className={twMerge('border border-braun-200 bg-white overflow-hidden', className)}>
    {/* Header row */}
    <div className="flex items-center gap-4 px-6 py-3 bg-braun-50 border-b border-braun-200">
      <Skeleton className="w-4 h-2.5" />
      {[64, 140, 96, 72, 56].map((w, i) => (
        <Skeleton key={i} className="h-2.5" style={{ width: w }} />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, i) => (
      <SkeletonTableRow key={i} />
    ))}
  </div>
);

// ─── Dashboard grid skeleton ──────────────────────────────────────────────────

export const SkeletonDashboard: React.FC = () => (
  <div className="space-y-6">
    {/* KPI row */}
    <div className="grid grid-cols-4 border border-braun-200 divide-x divide-braun-200">
      {[0, 1, 2, 3].map(i => <SkeletonKPI key={i} className="border-0" />)}
    </div>
    {/* Charts row */}
    <div className="grid grid-cols-3 gap-4">
      <SkeletonChart className="col-span-2" />
      <SkeletonChart />
    </div>
    {/* Table */}
    <SkeletonTable rows={4} />
  </div>
);
