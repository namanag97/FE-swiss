import React from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'underline' | 'search';
  icon?: React.ReactNode;
  label?: string;
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({ 
  variant = 'default', 
  icon, 
  label,
  error,
  className, 
  ...props 
}) => {
  
  const baseStyles = "w-full transition-all focus:outline-none placeholder:text-braun-300 disabled:opacity-50 disabled:cursor-not-allowed font-sans";
  
  const variants = {
    default: "bg-braun-50 border border-braun-200 p-3 text-sm focus:border-braun-900 focus:bg-white focus:ring-0",
    underline: "bg-transparent border-b border-braun-200 py-2 text-xl font-light focus:border-braun-900 placeholder:text-braun-200",
    search: "bg-braun-50 border border-braun-200 py-2 text-sm focus:border-braun-900 font-mono",
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-braun-900 mb-2 font-sans uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-braun-400 group-focus-within:text-braun-900 transition-colors pointer-events-none">
            {icon}
          </div>
        )}
        <input 
          className={twMerge(
            baseStyles, 
            variants[variant], 
            error ? 'border-red-500 focus:border-red-500' : '',
            icon && variant !== 'underline' ? 'pl-10 pr-4' : '', 
            className
          )} 
          {...props} 
        />
      </div>
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  variant?: 'default' | 'underline';
  error?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  variant = 'default',
  error,
  className,
  ...props
}) => {
  const baseStyles = "w-full transition-all focus:outline-none placeholder:text-braun-300 disabled:opacity-50 disabled:cursor-not-allowed font-sans resize-none";
  
  const variants = {
    default: "bg-braun-50 border border-braun-200 p-3 text-sm focus:border-braun-900 focus:bg-white focus:ring-0",
    underline: "bg-transparent border-b border-braun-200 py-2 text-xl font-light focus:border-braun-900 placeholder:text-braun-200",
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-braun-900 mb-2 font-sans uppercase tracking-wide">
          {label}
        </label>
      )}
      <textarea
        className={twMerge(
          baseStyles,
          variants[variant],
          error ? 'border-red-500 focus:border-red-500' : '',
          className
        )}
        {...props}
      />
    </div>
  );
};