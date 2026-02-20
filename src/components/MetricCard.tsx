import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

// ─── Inline sparkline ─────────────────────────────────────────────────────────

const Sparkline = ({ data, color = '#09090b' }: { data: number[]; color?: string }) => {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const W = 64; const H = 24;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * W},${H - ((v - min) / range) * (H - 4) - 2}`)
    .join(' ');
  return (
    <svg width={W} height={H} className="overflow-visible flex-shrink-0 opacity-80">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

// ─── MetricCard ───────────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  highlight?: boolean;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  /** Optional array of numeric values to render as a mini sparkline */
  sparkData?: number[];
  /** Stroke color for the sparkline (default: braun-900) */
  sparkColor?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subValue,
  highlight,
  trend,
  trendValue,
  icon,
  sparkData,
  sparkColor,
  className,
}) => {
  return (
    <div className={twMerge(
      "flex flex-col gap-1 p-4 border border-transparent hover:border-braun-200 transition-colors bg-transparent",
      className
    )}>
      <div className="flex justify-between items-start mb-1">
        <span className="text-[10px] uppercase tracking-widest text-braun-500 font-mono">
          {label}
        </span>
        {icon && <span className="text-braun-400">{icon}</span>}
      </div>

      <div className="flex items-end justify-between gap-3">
        <div>
          <span className={twMerge(
            "text-2xl font-light tracking-tight text-braun-900",
            highlight && "text-braun-orange"
          )}>
            {value}
          </span>

          {(subValue || trend) && (
            <div className="flex items-center gap-2 mt-1">
              {trend && (
                <div className={twMerge(
                  "flex items-center gap-1 text-[10px] font-mono",
                  trend === 'up' ? "text-emerald-600" : trend === 'down' ? "text-rose-600" : "text-braun-400"
                )}>
                  {trend === 'up' && <ArrowUpRight size={12} />}
                  {trend === 'down' && <ArrowDownRight size={12} />}
                  {trend === 'neutral' && <Minus size={12} />}
                  <span>{trendValue}</span>
                </div>
              )}
              {subValue && (
                <span className="text-[10px] text-braun-400 font-mono uppercase">
                  {subValue}
                </span>
              )}
            </div>
          )}
        </div>

        {sparkData && sparkData.length > 1 && (
          <Sparkline data={sparkData} color={sparkColor ?? '#09090b'} />
        )}
      </div>
    </div>
  );
};
