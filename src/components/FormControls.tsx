import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, Calendar as CalendarIcon, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

// --- CHECKBOX ---
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export const Checkbox: React.FC<CheckboxProps> = ({ label, className, ...props }) => (
  <label className={twMerge("inline-flex items-center gap-3 cursor-pointer group", className)}>
    <div className="relative">
      <input type="checkbox" className="peer sr-only" {...props} />
      <div className="w-5 h-5 border border-braun-300 bg-white transition-all peer-checked:bg-braun-900 peer-checked:border-braun-900 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed group-hover:border-braun-900"></div>
      <Check size={12} className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
    </div>
    {label && <span className="text-sm text-braun-700 font-sans group-hover:text-braun-900 transition-colors select-none">{label}</span>}
  </label>
);

// --- RADIO ---
interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export const Radio: React.FC<RadioProps> = ({ label, className, ...props }) => (
  <label className={twMerge("inline-flex items-center gap-3 cursor-pointer group", className)}>
    <div className="relative">
      <input type="radio" className="peer sr-only" {...props} />
      <div className="w-5 h-5 rounded-full border border-braun-300 bg-white transition-all peer-checked:border-braun-900 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed group-hover:border-braun-900 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-braun-900 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
      </div>
    </div>
    {label && <span className="text-sm text-braun-700 font-sans group-hover:text-braun-900 transition-colors select-none">{label}</span>}
  </label>
);

// --- SWITCH ---
interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export const Switch: React.FC<SwitchProps> = ({ label, className, ...props }) => (
  <label className={twMerge("inline-flex items-center justify-between gap-4 cursor-pointer group", className)}>
    {label && <span className="text-sm font-medium text-braun-900 select-none">{label}</span>}
    <div className="relative">
      <input type="checkbox" className="peer sr-only" {...props} />
      <div className="w-10 h-6 bg-braun-200 transition-colors peer-checked:bg-braun-900 peer-disabled:opacity-50"></div>
      <div className="absolute top-1 left-1 bg-white w-4 h-4 transition-transform peer-checked:translate-x-4 shadow-sm"></div>
    </div>
  </label>
);

// --- SLIDER ---
interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
}
export const Slider: React.FC<SliderProps> = ({ label, className, ...props }) => (
  <div className={twMerge("w-full", className)}>
    {label && <div className="flex justify-between mb-2">
       <span className="text-xs font-medium text-braun-900 uppercase tracking-wide">{label}</span>
       <span className="text-xs font-mono text-braun-500">{props.value}</span>
    </div>}
    <input 
      type="range" 
      className="w-full h-1 bg-braun-200 appearance-none cursor-pointer focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-braun-900 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110" 
      {...props} 
    />
  </div>
);

// --- SELECT ---
interface SelectOption {
  value: string;
  label: string;
}
interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}
export const Select: React.FC<SelectProps> = ({ label, placeholder = 'Select...', options, value, onChange, className, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className={twMerge("w-full relative", className)} ref={containerRef}>
      {label && <label className="block text-xs font-medium text-braun-900 mb-2 font-sans uppercase tracking-wide">{label}</label>}
      <button 
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full bg-braun-50 border border-braun-200 p-3 text-sm flex items-center justify-between transition-colors focus:border-braun-900 focus:bg-white ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-braun-400 cursor-pointer'}`}
      >
        <span className={selectedOption ? 'text-braun-900' : 'text-braun-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={14} className={`text-braun-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-braun-200 shadow-lg z-50 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-100">
          {options.map((option) => (
            <div 
              key={option.value}
              onClick={() => { onChange(option.value); setIsOpen(false); }}
              className={`p-3 text-sm cursor-pointer hover:bg-braun-50 flex items-center justify-between group ${option.value === value ? 'bg-braun-50 font-medium' : ''}`}
            >
              <span className="text-braun-700 group-hover:text-braun-900">{option.label}</span>
              {option.value === value && <Check size={12} className="text-braun-900" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- DATE PICKER ---
interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export const DatePicker: React.FC<DatePickerProps> = ({ label, className, ...props }) => {
  return (
    <div className={twMerge("w-full", className)}>
      {label && <label className="block text-xs font-medium text-braun-900 mb-2 font-sans uppercase tracking-wide">{label}</label>}
      <div className="relative group">
        <input 
          type="date" 
          className="w-full bg-braun-50 border border-braun-200 p-3 pl-10 text-sm focus:border-braun-900 focus:bg-white focus:outline-none uppercase font-mono tracking-wider text-braun-900 placeholder:text-braun-400"
          {...props} 
        />
        <CalendarIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-braun-400 group-focus-within:text-braun-900 pointer-events-none" />
      </div>
    </div>
  );
};
