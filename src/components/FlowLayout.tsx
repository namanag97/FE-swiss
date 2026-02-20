import React from 'react';
import { Button } from './Button';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

interface FlowLayoutProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  onNext?: () => void;
  onBack?: () => void;
  onCancel?: () => void;
  isNextDisabled?: boolean;
  isProcessing?: boolean;
  nextLabel?: string;
  backLabel?: string;
  children: React.ReactNode;
}

export const FlowLayout: React.FC<FlowLayoutProps> = ({
  currentStep,
  totalSteps,
  title,
  subtitle,
  onNext,
  onBack,
  onCancel,
  isNextDisabled = false,
  isProcessing = false,
  nextLabel = 'Proceed',
  backLabel = 'Back',
  children
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white border border-braun-200 min-h-[600px] flex flex-col shadow-2xl animate-fade-in relative">
      {/* Progress Line */}
      <div className="h-1 w-full bg-braun-100 flex absolute top-0 left-0 right-0 z-10">
        <div 
          className="h-full bg-braun-900 transition-all duration-500 ease-out" 
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>

      {/* Cancel Action */}
      {onCancel && (
        <button 
          onClick={onCancel}
          className="absolute top-6 right-6 text-braun-300 hover:text-braun-900 transition-colors z-20"
          title="Cancel Process"
        >
          <X size={20} />
        </button>
      )}

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="pt-12 px-12 pb-8">
           <span className="font-mono text-xs uppercase tracking-widest text-braun-400 block mb-4">
             Step {String(currentStep).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
           </span>
           <h2 className="text-3xl font-light text-braun-900">{title}</h2>
           {subtitle && <p className="text-braun-500 mt-2 font-light">{subtitle}</p>}
        </div>

        {/* Content Body */}
        <div className="flex-1 px-12 py-4 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both">
          {children}
        </div>

        {/* Footer Navigation */}
        <div className="p-8 mt-auto flex items-center justify-between border-t border-braun-100 bg-white">
          <button 
              onClick={onBack}
              className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest transition-colors ${
                onBack ? 'text-braun-400 hover:text-braun-900 cursor-pointer' : 'text-braun-200 cursor-not-allowed'
              }`}
              disabled={!onBack}
          >
            <ArrowLeft size={14} />
            {backLabel}
          </button>

          <Button 
            onClick={onNext} 
            disabled={isNextDisabled || !onNext} 
            isLoading={isProcessing}
            className="pl-6 pr-6"
          >
            {nextLabel} <ArrowRight size={14} className="ml-2"/>
          </Button>
        </div>
      </div>
    </div>
  );
};
