'use client';
import React, { useState, useMemo, useCallback, useId } from 'react';
import {
  ChevronUp, ChevronDown, ChevronsUpDown,
  Search, X, ChevronLeft, ChevronRight,
  Download, Settings2, Check,
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

// ─── Types ────────────────────────────────────────────────────────────────────

type SortDir = 'asc' | 'desc' | null;

export interface ColumnDef<T> {
  key: Extract<keyof T, string>;
  header: string;
  width?: string;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  /** If false, exclude column from global search. Default: true */
  searchable?: boolean;
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
}

interface SortState {
  key: string;
  dir: SortDir;
}

export interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: ColumnDef<T>[];
  /** Key that uniquely identifies a row (for selection) */
  idKey?: keyof T;
  pageSize?: number;
  searchable?: boolean;
  selectable?: boolean;
  onRowClick?: (row: T) => void;
  onSelectionChange?: (selected: T[]) => void;
  /** Extra header-right slot — e.g. action buttons */
  toolbar?: React.ReactNode;
  className?: string;
  emptyMessage?: string;
}

// ─── Sort icon ────────────────────────────────────────────────────────────────

const SortIcon: React.FC<{ dir: SortDir }> = ({ dir }) => {
  if (dir === 'asc')  return <ChevronUp size={11} className="text-braun-900" />;
  if (dir === 'desc') return <ChevronDown size={11} className="text-braun-900" />;
  return <ChevronsUpDown size={11} className="text-braun-300 group-hover:text-braun-500 transition-colors" />;
};

// ─── DataTable ────────────────────────────────────────────────────────────────

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  idKey,
  pageSize = 10,
  searchable = true,
  selectable = false,
  onRowClick,
  onSelectionChange,
  toolbar,
  className,
  emptyMessage = 'No records found.',
}: DataTableProps<T>) {
  const uid = useId();
  const [query,    setQuery]    = useState('');
  const [sort,     setSort]     = useState<SortState>({ key: '', dir: null });
  const [page,     setPage]     = useState(1);
  const [selected, setSelected] = useState<Set<unknown>>(new Set());
  const [hiddenCols, setHiddenCols] = useState<Set<string>>(new Set());
  const [showColMenu, setShowColMenu] = useState(false);

  const visibleColumns = useMemo(
    () => columns.filter(c => !hiddenCols.has(c.key)),
    [columns, hiddenCols],
  );

  // ── filter ──────────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter(row =>
      columns.some(col => {
        if (col.searchable === false) return false;
        const v = row[col.key];
        return v != null && String(v).toLowerCase().includes(q);
      }),
    );
  }, [data, query, columns]);

  // ── sort ────────────────────────────────────────────────────────────────────
  const sorted = useMemo(() => {
    if (!sort.dir || !sort.key) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      let cmp = 0;
      if (typeof av === 'number' && typeof bv === 'number') {
        cmp = av - bv;
      } else {
        cmp = String(av ?? '').localeCompare(String(bv ?? ''));
      }
      return sort.dir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sort]);

  // ── paginate ─────────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage   = Math.min(page, totalPages);
  const pageData   = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  // ── sort handler ─────────────────────────────────────────────────────────────
  const handleSort = useCallback((key: string) => {
    setSort(prev => {
      if (prev.key !== key) return { key, dir: 'asc' };
      if (prev.dir === 'asc')  return { key, dir: 'desc' };
      return { key: '', dir: null };
    });
    setPage(1);
  }, []);

  // ── selection ─────────────────────────────────────────────────────────────────
  const rowId = (row: T) => idKey ? row[idKey] : JSON.stringify(row);

  const toggleRow = useCallback((row: T) => {
    const id = rowId(row);
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      onSelectionChange?.(data.filter(r => next.has(rowId(r))));
      return next;
    });
  }, [data, idKey, onSelectionChange]);

  const toggleAll = useCallback(() => {
    if (selected.size === pageData.length) {
      setSelected(new Set());
      onSelectionChange?.([]);
    } else {
      const ids = new Set(pageData.map(rowId));
      setSelected(ids);
      onSelectionChange?.(pageData);
    }
  }, [pageData, selected.size, onSelectionChange]);

  const allSelected = pageData.length > 0 && pageData.every(r => selected.has(rowId(r)));
  const someSelected = !allSelected && pageData.some(r => selected.has(rowId(r)));

  // ── column toggle ─────────────────────────────────────────────────────────────
  const toggleCol = useCallback((key: string) => {
    setHiddenCols(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }, []);

  // ── pages to show ─────────────────────────────────────────────────────────────
  const pageNums = useMemo(() => {
    const pages: (number | '…')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (safePage > 3) pages.push('…');
      for (let i = Math.max(2, safePage - 1); i <= Math.min(totalPages - 1, safePage + 1); i++) {
        pages.push(i);
      }
      if (safePage < totalPages - 2) pages.push('…');
      pages.push(totalPages);
    }
    return pages;
  }, [totalPages, safePage]);

  const alignClass = (align?: string) =>
    align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={twMerge('flex flex-col gap-0', className)}>

      {/* ── Toolbar ───────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-3">
        {searchable && (
          <div className="relative flex-1 max-w-sm">
            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-braun-400 pointer-events-none" />
            <input
              value={query}
              onChange={e => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search…"
              className="w-full pl-8 pr-8 py-2 text-xs font-mono border border-braun-200 bg-braun-50 focus:outline-none focus:border-braun-900 focus:bg-white transition-colors placeholder:text-braun-300"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-braun-400 hover:text-braun-900"
              >
                <X size={12} />
              </button>
            )}
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          {toolbar}

          {/* Column visibility */}
          <div className="relative">
            <button
              onClick={() => setShowColMenu(v => !v)}
              className="flex items-center gap-1.5 px-3 py-2 text-[10px] font-mono uppercase tracking-widest border border-braun-200 hover:border-braun-900 hover:bg-braun-50 transition-colors text-braun-600"
            >
              <Settings2 size={11} /> Columns
            </button>
            {showColMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-braun-200 z-30 min-w-[160px] shadow-sm">
                {columns.map(col => (
                  <button
                    key={col.key}
                    onClick={() => toggleCol(col.key)}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-[11px] font-mono hover:bg-braun-50 transition-colors"
                  >
                    <span className={twMerge(
                      'w-3.5 h-3.5 border flex items-center justify-center flex-shrink-0',
                      hiddenCols.has(col.key) ? 'border-braun-200 bg-white' : 'border-braun-900 bg-braun-900',
                    )}>
                      {!hiddenCols.has(col.key) && <Check size={9} className="text-white" />}
                    </span>
                    {col.header}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export stub */}
          <button className="flex items-center gap-1.5 px-3 py-2 text-[10px] font-mono uppercase tracking-widest border border-braun-200 hover:border-braun-900 hover:bg-braun-50 transition-colors text-braun-600">
            <Download size={11} /> Export
          </button>
        </div>
      </div>

      {/* ── Table ─────────────────────────────────────────────────────────── */}
      <div className="w-full overflow-x-auto border border-braun-200 bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-braun-50 border-b border-braun-200">
            <tr>
              {selectable && (
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    id={`${uid}-all`}
                    checked={allSelected}
                    ref={el => { if (el) el.indeterminate = someSelected; }}
                    onChange={toggleAll}
                    className="w-3.5 h-3.5 accent-braun-900 cursor-pointer"
                  />
                </th>
              )}
              {visibleColumns.map(col => (
                <th
                  key={col.key}
                  className={twMerge(
                    'px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-braun-500 font-normal whitespace-nowrap select-none',
                    col.width ? '' : '',
                    alignClass(col.align),
                    col.sortable !== false && 'cursor-pointer group hover:text-braun-900 transition-colors',
                  )}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={col.sortable !== false ? () => handleSort(col.key) : undefined}
                >
                  <div className={twMerge('inline-flex items-center gap-1.5', alignClass(col.align))}>
                    {col.header}
                    {col.sortable !== false && (
                      <SortIcon dir={sort.key === col.key ? sort.dir : null} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-braun-100">
            {pageData.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumns.length + (selectable ? 1 : 0)}
                  className="px-4 py-16 text-center text-xs text-braun-400 font-mono"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pageData.map((row, rowIdx) => {
                const id = rowId(row);
                const isSelected = selected.has(id);
                return (
                  <tr
                    key={String(id)}
                    onClick={() => {
                      if (selectable) toggleRow(row);
                      onRowClick?.(row);
                    }}
                    className={twMerge(
                      'transition-colors group',
                      (selectable || onRowClick) && 'cursor-pointer',
                      isSelected ? 'bg-braun-100' : 'hover:bg-braun-50/60',
                    )}
                  >
                    {selectable && (
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRow(row)}
                          onClick={e => e.stopPropagation()}
                          className="w-3.5 h-3.5 accent-braun-900 cursor-pointer"
                        />
                      </td>
                    )}
                    {visibleColumns.map(col => (
                      <td
                        key={col.key}
                        className={twMerge(
                          'px-4 py-3 text-xs text-braun-700 font-sans',
                          alignClass(col.align),
                        )}
                      >
                        {col.render
                          ? col.render(row[col.key], row, rowIdx)
                          : String(row[col.key] ?? '—')}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Footer: count + pagination ───────────────────────────────────── */}
      <div className="flex items-center justify-between mt-3 min-h-[32px]">
        <span className="text-[10px] font-mono text-braun-400">
          {selected.size > 0
            ? `${selected.size} of ${sorted.length} selected`
            : `${sorted.length} record${sorted.length !== 1 ? 's' : ''}${query ? ` matching "${query}"` : ''}`}
        </span>

        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="w-7 h-7 flex items-center justify-center border border-braun-200 text-braun-600 hover:border-braun-900 hover:bg-braun-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={12} />
            </button>

            {pageNums.map((p, i) =>
              p === '…' ? (
                <span key={`ellipsis-${i}`} className="w-7 h-7 flex items-center justify-center text-[10px] font-mono text-braun-400">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={twMerge(
                    'w-7 h-7 text-[10px] font-mono border transition-colors',
                    p === safePage
                      ? 'bg-braun-900 text-white border-braun-900'
                      : 'border-braun-200 text-braun-600 hover:border-braun-900 hover:bg-braun-50',
                  )}
                >
                  {p}
                </button>
              ),
            )}

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="w-7 h-7 flex items-center justify-center border border-braun-200 text-braun-600 hover:border-braun-900 hover:bg-braun-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
