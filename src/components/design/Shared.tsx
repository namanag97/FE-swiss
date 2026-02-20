import React from 'react';

export const SectionHeader: React.FC<{ number: string; title: string }> = ({ number, title }) => (
  <div className="flex items-baseline gap-4 mb-12 animate-slide-in-right">
    <span className="text-xs font-mono text-braun-orange font-bold">{number}</span>
    <h2 className="text-2xl font-light text-braun-900 uppercase tracking-wide">{title}</h2>
    <div className="flex-1 h-px bg-braun-200 ml-4"></div>
  </div>
);

export const SpecRule: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-baseline border-b border-braun-200 pb-2 hover:bg-braun-50 transition-colors px-2 -mx-2">
    <span className="text-xs font-mono text-braun-500 uppercase tracking-widest w-32 shrink-0">{label}</span>
    <span className="text-sm text-braun-900 text-right font-mono">{value}</span>
  </div>
);

export const ComponentCard: React.FC<{ title: string; className?: string; children: React.ReactNode }> = ({ title, className, children }) => (
  <div className={`border border-braun-200 bg-white p-8 hover:border-braun-900 transition-colors group ${className}`}>
    <h4 className="text-[10px] font-mono uppercase tracking-widest text-braun-400 mb-6 group-hover:text-braun-900 transition-colors">{title}</h4>
    {children}
  </div>
);

export const getBgClass = (step: number) => {
  const map: Record<number, string> = {
    50: 'bg-braun-50',
    100: 'bg-braun-100',
    200: 'bg-braun-200',
    300: 'bg-braun-300',
    400: 'bg-braun-400',
    500: 'bg-braun-500',
    600: 'bg-braun-600',
    800: 'bg-braun-800',
    900: 'bg-braun-900',
    950: 'bg-black',
  }
  return map[step] || 'bg-gray-500';
};
