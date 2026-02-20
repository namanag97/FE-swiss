import React from 'react';
import { Loader2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

// --- BUTTON ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  isLoading = false, 
  icon,
  className = '',
  disabled,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-mono uppercase tracking-widest font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border select-none";
  
  const variants = {
    primary: "bg-braun-900 text-white border-braun-900 hover:bg-braun-800 active:translate-y-px",
    secondary: "bg-transparent text-braun-900 border-braun-200 hover:border-braun-900 hover:bg-braun-50",
    ghost: "bg-transparent text-braun-400 border-transparent hover:text-braun-900 hover:bg-braun-50",
    danger: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 hover:border-rose-300",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[10px]",
    md: "px-6 py-3 text-xs",
    lg: "px-8 py-4 text-sm",
  };

  return (
    <button 
      className={twMerge(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-3 h-3 mr-2 animate-spin" />
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

// --- ICON BUTTON ---
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, variant = 'secondary', size = 'md', className, ...props }) => {
    const baseStyles = "inline-flex items-center justify-center border transition-all duration-200 disabled:opacity-50";
    const variants = {
        primary: "bg-braun-900 text-white border-braun-900 hover:bg-braun-800",
        secondary: "bg-white text-braun-900 border-braun-200 hover:border-braun-900 hover:bg-braun-50",
        ghost: "bg-transparent text-braun-500 border-transparent hover:text-braun-900 hover:bg-braun-50",
    };
    const sizes = {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12",
    };

    return (
        <button className={twMerge(baseStyles, variants[variant], sizes[size], className)} {...props}>
            {icon}
        </button>
    );
}

// --- BUTTON GROUP ---
export const ButtonGroup: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return (
        <div className={twMerge("inline-flex", className)}>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child as React.ReactElement<any>, {
                        className: twMerge(
                            (child as React.ReactElement<any>).props.className,
                            "rounded-none border-l-0 first:border-l first:rounded-l-sm last:rounded-r-sm"
                        )
                    });
                }
                return child;
            })}
        </div>
    );
};

// --- SEGMENTED CONTROL ---
interface SegmentedControlProps {
    options: { value: string; label: string | React.ReactNode }[];
    value: string;
    onChange: (value: string) => void;
    size?: 'sm' | 'md';
    className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, value, onChange, size = 'md', className }) => {
    return (
        <div className={twMerge("inline-flex border border-braun-200 bg-white", className)}>
            {options.map((opt) => (
                <button
                    key={opt.value}
                    onClick={() => onChange(opt.value)}
                    className={twMerge(
                        "font-mono uppercase transition-colors border-r border-braun-200 last:border-r-0 hover:bg-braun-50 focus:outline-none",
                        size === 'sm' ? "px-3 py-1.5 text-[10px]" : "px-4 py-2 text-xs",
                        value === opt.value ? "bg-braun-900 text-white hover:bg-braun-800" : "text-braun-500"
                    )}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
};