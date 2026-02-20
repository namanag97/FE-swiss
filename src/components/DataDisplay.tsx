import React from 'react';
import { X, FolderOpen } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

// --- BADGE ---
export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'primary' | 'outline' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', size = 'md', className }) => {
  const variants = {
    neutral: "bg-braun-100 text-braun-600",
    primary: "bg-braun-900 text-white",
    outline: "border border-braun-200 text-braun-500 bg-transparent",
    accent: "bg-braun-orange text-white",
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-900",
    error: "bg-rose-100 text-rose-800",
  };

  const sizes = {
    sm: "px-1.5 py-0.5 text-[9px]",
    md: "px-2 py-1 text-[10px]",
  };

  return (
    <span className={twMerge(
      "inline-flex items-center justify-center font-mono uppercase tracking-wider rounded-sm whitespace-nowrap",
      variants[variant],
      sizes[size],
      className
    )}>
      {children}
    </span>
  );
};

// --- TAG ---
export interface TagProps {
  label: string;
  onRemove?: () => void;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ label, onRemove, className }) => {
  return (
    <span className={twMerge(
      "inline-flex items-center gap-1 pl-2 pr-1 py-1 bg-white border border-braun-200 text-xs text-braun-700 font-medium transition-all hover:border-braun-400",
      className
    )}>
      {label}
      {onRemove && (
        <button 
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="p-0.5 hover:bg-braun-100 text-braun-400 hover:text-braun-900 rounded-sm transition-colors"
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
};

// --- AVATAR ---
export interface AvatarProps {
  src?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, initials, size = 'md', className }) => {
  const sizes = {
    sm: "w-6 h-6 text-[9px]",
    md: "w-8 h-8 text-[10px]",
    lg: "w-12 h-12 text-xs",
  };

  return (
    <div className={twMerge(
      "relative inline-flex items-center justify-center overflow-hidden bg-braun-100 border border-braun-200 text-braun-500 font-mono font-bold uppercase select-none",
      sizes[size],
      className
    )}>
      {src ? (
        <img src={src} alt="Avatar" className="w-full h-full object-cover" />
      ) : (
        <span>{initials || '?'}</span>
      )}
    </div>
  );
};

// --- LIST ---
export interface ListProps {
  items: React.ReactNode[];
  type?: 'ul' | 'ol';
  variant?: 'simple' | 'divided';
  className?: string;
}

export const List: React.FC<ListProps> = ({ items, type = 'ul', variant = 'simple', className }) => {
  const Component = type;
  
  return (
    <Component className={twMerge(
      "text-sm text-braun-700", 
      type === 'ol' ? 'list-decimal list-inside' : '',
      variant === 'divided' ? 'divide-y divide-braun-100' : 'space-y-1',
      className
    )}>
      {items.map((item, i) => (
        <li key={i} className={twMerge(variant === 'divided' ? 'py-2 first:pt-0 last:pb-0' : '')}>
          {item}
        </li>
      ))}
    </Component>
  );
};

// --- EMPTY STATE ---
export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action, className }) => {
  return (
    <div className={twMerge("flex flex-col items-center justify-center p-12 text-center border border-dashed border-braun-200 bg-braun-50/50", className)}>
      <div className="mb-4 text-braun-300">
        {icon || <FolderOpen size={32} strokeWidth={1} />}
      </div>
      <h3 className="text-sm font-medium text-braun-900 mb-1">{title}</h3>
      {description && <p className="text-xs text-braun-500 max-w-xs font-sans leading-relaxed mb-6">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
};
