import React, { useState } from 'react';
import { SectionHeader, SpecRule, getBgClass } from '../Shared';
import { Check } from 'lucide-react';

export const ManifestoSection = () => (
  <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <SectionHeader number="00" title="System Manifesto" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-12">
      <div className="prose prose-sm max-w-none text-braun-600 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-100 fill-mode-both">
        <h3 className="text-xs font-mono uppercase tracking-widest text-braun-900 mb-4 font-bold">// The Philosophy of Less</h3>
        <p className="mb-4 leading-relaxed">
          We adhere to the principles of <strong>Dieter Rams</strong> and the <strong>Bauhaus</strong> movement. 
          A device or interface is not a canvas for decoration; it is a tool for understanding.
        </p>
        <p className="mb-4 leading-relaxed">
           The interface should be self-explanatory. We rely on standard patterns, clear typography, and 
           strict alignment to guide the user. Confusion is a design failure.
        </p>
        <blockquote className="border-l-2 border-braun-orange pl-4 italic text-braun-800 my-8">
          "Good design is as little design as possible."
        </blockquote>
      </div>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200 fill-mode-both">
        <h3 className="text-xs font-mono uppercase tracking-widest text-braun-900 mb-4 font-bold">// Global Variables</h3>
        <div className="space-y-2">
          <SpecRule label="Corner Radius" value="0px | 2px" />
          <SpecRule label="Border Width" value="1px" />
          <SpecRule label="Font Primary" value="Inter" />
          <SpecRule label="Font Mono" value="JetBrains Mono" />
          <SpecRule label="Animation" value="200ms Ease-Out" />
          <SpecRule label="Shadows" value="None / Flat" />
        </div>
      </div>
    </div>
  </section>
);

export const TypographySection = () => (
  <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <SectionHeader number="01" title="Typography" />
    <div className="space-y-16">
      
      {/* Display */}
      <div className="grid grid-cols-12 gap-8 border-b border-braun-200 pb-12 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100 fill-mode-both">
        <div className="col-span-3 text-xs font-mono text-braun-400 uppercase tracking-widest">Display Scale</div>
        <div className="col-span-9 space-y-8">
            <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-150 fill-mode-both group cursor-default">
                <span className="text-6xl font-light text-braun-900 tracking-tighter group-hover:text-braun-orange transition-colors duration-300">H1. The Grid</span>
                <div className="mt-2 text-[10px] font-mono text-braun-400 group-hover:text-braun-900 transition-colors">Inter Light / 60px / -0.02em</div>
            </div>
            <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-200 fill-mode-both group cursor-default">
                <span className="text-5xl font-light text-braun-900 tracking-tight group-hover:text-braun-orange transition-colors duration-300">H2. Modular Systems</span>
                <div className="mt-2 text-[10px] font-mono text-braun-400 group-hover:text-braun-900 transition-colors">Inter Light / 48px / -0.01em</div>
            </div>
            <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-300 fill-mode-both group cursor-default">
                <span className="text-3xl font-light text-braun-900 group-hover:text-braun-orange transition-colors duration-300">H3. Function over Form</span>
                <div className="mt-2 text-[10px] font-mono text-braun-400 group-hover:text-braun-900 transition-colors">Inter Light / 30px / Normal</div>
            </div>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-12 gap-8 border-b border-braun-200 pb-12 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300 fill-mode-both">
        <div className="col-span-3 text-xs font-mono text-braun-400 uppercase tracking-widest">Body Copy</div>
        <div className="col-span-9 grid grid-cols-2 gap-12">
            <div>
                <p className="text-base text-braun-700 leading-relaxed">
                   <strong>Body Large.</strong> Information density is not about cramming data into a small space; it is about the clarity of the relationship between data points.
                </p>
                <div className="mt-2 text-[10px] font-mono text-braun-400">Inter Regular / 16px / 1.6</div>
            </div>
            <div>
                <p className="text-sm text-braun-600 leading-relaxed">
                   <strong>Body Default.</strong> The default interface text. Used for standard descriptions, form inputs, and component content. High legibility is the priority.
                </p>
                <div className="mt-2 text-[10px] font-mono text-braun-400">Inter Regular / 14px / 1.5</div>
            </div>
        </div>
      </div>

      {/* Monospace */}
      <div className="grid grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-500 fill-mode-both">
        <div className="col-span-3 text-xs font-mono text-braun-400 uppercase tracking-widest">Data / Meta</div>
        <div className="col-span-9 space-y-6">
            <div className="flex items-baseline gap-4 group cursor-default">
                <span className="font-mono text-xs text-braun-900 uppercase tracking-widest group-hover:text-braun-orange transition-colors">Label.Uppercase</span>
                <span className="text-[10px] font-mono text-braun-400">JetBrains Mono / 12px / 0.1em</span>
            </div>
            <div className="flex items-baseline gap-4 group cursor-default">
                <span className="font-mono text-xs text-braun-900 group-hover:text-braun-orange transition-colors">Data.Value_123</span>
                <span className="text-[10px] font-mono text-braun-400">JetBrains Mono / 12px / Normal</span>
            </div>
            <div className="flex items-baseline gap-4 group cursor-default">
                <span className="font-mono text-[10px] text-braun-500 group-hover:text-braun-orange transition-colors">Meta.Timestamp</span>
                <span className="text-[10px] font-mono text-braun-400">JetBrains Mono / 10px / Normal</span>
            </div>
        </div>
      </div>
    </div>
  </section>
);

export const ColorSection = () => {
  const [copiedColor, setCopiedColor] = useState<number | null>(null);

  const hexMap: Record<number, string> = {
    50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa',
    500: '#71717a', 600: '#52525b', 800: '#27272a', 900: '#09090b', 950: '#000000'
  };

  const handleCopy = (step: number) => {
    const hex = hexMap[step];
    navigator.clipboard.writeText(hex);
    setCopiedColor(step);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader number="02" title="Chromatic Scale" />
      
      <div className="space-y-16">
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-braun-900 mb-6">Neutral Scale (Substrate)</h3>
          <p className="text-xs text-braun-500 mb-4 font-mono">Click to copy HEX value.</p>
          <div className="grid grid-cols-10 h-32 w-full">
            {[50, 100, 200, 300, 400, 500, 600, 800, 900, 950].map((step, i) => (
              <button 
                  key={step} 
                  onClick={() => handleCopy(step)}
                  className={`relative group h-full flex flex-col justify-end p-2 ${getBgClass(step)} animate-in fade-in zoom-in-95 duration-500 fill-mode-both hover:scale-110 hover:z-20 hover:shadow-xl transition-all origin-bottom cursor-pointer focus:outline-none ring-2 ring-transparent focus:ring-braun-400`}
                  style={{ animationDelay: `${i * 50}ms` }}
              >
                {copiedColor === step ? (
                   <div className="absolute inset-0 flex items-center justify-center bg-braun-900/10 backdrop-blur-sm animate-in fade-in duration-200">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${step > 400 ? 'text-white' : 'text-braun-900'}`}>Copied</span>
                   </div>
                ) : (
                   <>
                     <span className={`text-[10px] font-mono mb-1 text-left ${step > 400 ? 'text-white' : 'text-braun-900'}`}>{step}</span>
                     <span className={`text-[9px] font-mono opacity-50 uppercase text-left ${step > 400 ? 'text-white' : 'text-braun-900'}`}>{hexMap[step]}</span>
                   </>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-500 fill-mode-both">
          <div>
             <h3 className="text-xs font-mono uppercase tracking-widest text-braun-900 mb-6">Semantic: Accent</h3>
             <button 
                onClick={() => { navigator.clipboard.writeText('#ea580c'); }}
                className="w-full h-24 bg-braun-orange text-white p-4 flex flex-col justify-between hover:shadow-xl transition-all hover:scale-[1.02] active:scale-95 text-left cursor-pointer"
             >
                <span className="font-mono text-xs">Braun Orange</span>
                <div className="flex justify-between text-[10px] font-mono opacity-80">
                   <span>#ea580c</span>
                   <span>Primary Action / Highlight</span>
                </div>
             </button>
          </div>
          <div>
             <h3 className="text-xs font-mono uppercase tracking-widest text-braun-900 mb-6">Semantic: Utility</h3>
             <div className="grid grid-cols-3 gap-4 h-24 text-white">
                <div className="bg-emerald-600 p-2 flex items-end text-[10px] font-mono hover:bg-emerald-500 transition-colors cursor-help" title="Success State">Success</div>
                <div className="bg-amber-400 p-2 flex items-end text-[10px] font-mono text-braun-900 hover:bg-amber-300 transition-colors cursor-help" title="Warning State">Warning</div>
                <div className="bg-rose-600 p-2 flex items-end text-[10px] font-mono hover:bg-rose-500 transition-colors cursor-help" title="Error State">Error</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};