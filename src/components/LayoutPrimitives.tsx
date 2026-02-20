import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChevronDown, ChevronRight } from 'lucide-react';

// Container
export const Container: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className, style }) => (
  <div className={twMerge("w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)} style={style}>
    {children}
  </div>
);

// Stack
export const Stack: React.FC<{ children: React.ReactNode; className?: string; direction?: 'row' | 'col'; gap?: number; items?: 'start' | 'center' | 'end' | 'stretch' }> = ({ 
  children, className, direction = 'col', gap = 4, items = 'stretch'
}) => {
  const gapClass = {
    0: 'gap-0', 1: 'gap-1', 2: 'gap-2', 3: 'gap-3', 4: 'gap-4', 6: 'gap-6', 8: 'gap-8', 12: 'gap-12'
  }[gap] || 'gap-4';

  const itemsClass = {
    'start': 'items-start',
    'center': 'items-center',
    'end': 'items-end',
    'stretch': 'items-stretch'
  }[items];

  return (
    <div className={twMerge("flex", direction === 'col' ? 'flex-col' : 'flex-row', gapClass, itemsClass, className)}>
      {children}
    </div>
  );
};

// Grid
export const Grid: React.FC<{ children: React.ReactNode; className?: string; cols?: number; gap?: number }> = ({ 
  children, className, cols = 1, gap = 4
}) => {
    const colsClass = {
        1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6', 12: 'grid-cols-12'
    }[cols] || 'grid-cols-1';

    const gapClass = {
        0: 'gap-0', 1: 'gap-1', 2: 'gap-2', 3: 'gap-3', 4: 'gap-4', 6: 'gap-6', 8: 'gap-8', 12: 'gap-12'
    }[gap] || 'gap-4';

  return (
    <div className={twMerge("grid", colsClass, gapClass, className)}>
      {children}
    </div>
  );
};

// Divider
export const Divider: React.FC<{ className?: string; orientation?: 'horizontal' | 'vertical' }> = ({ 
  className, orientation = 'horizontal' 
}) => (
  <div className={twMerge(
    orientation === 'horizontal' ? "w-full h-px" : "h-full w-px",
    "bg-braun-200", 
    className
  )} />
);

// Card
export const Card: React.FC<{ children: React.ReactNode; className?: string; hover?: boolean; padding?: 'none' | 'sm' | 'md' | 'lg' }> = ({ 
  children, className, hover = true, padding = 'md' 
}) => {
    const padClass = {
        'none': 'p-0',
        'sm': 'p-4',
        'md': 'p-6',
        'lg': 'p-8'
    }[padding];

    return (
        <div className={twMerge(
            "bg-white border border-braun-200 transition-all duration-200",
            hover && "hover:border-braun-900 hover:shadow-sm",
            padClass,
            className
        )}>
            {children}
        </div>
    );
};

// Panel
export const Panel: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean; className?: string }> = ({ 
  title, children, defaultOpen = false, className 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={twMerge("border border-braun-200 bg-white", className)}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-braun-50 hover:bg-braun-100 transition-colors text-left group"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-braun-900 font-bold group-hover:text-braun-orange transition-colors">{title}</span>
        {isOpen ? <ChevronDown size={14} className="text-braun-500" /> : <ChevronRight size={14} className="text-braun-500" />}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-braun-200 animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};