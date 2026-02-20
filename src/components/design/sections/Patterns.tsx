import React, { useState } from 'react';
import { SectionHeader } from '../Shared';
import { FlowLayout } from '../../FlowLayout';
import { CheckCircle } from 'lucide-react';
import { Input } from '../../Input';
import { Select } from '../../FormControls';

export const FlowSection = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', source: 'db', method: 'fast' });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else {
        setStep(1); // Reset
        setFormData({ name: '', source: 'db', method: 'fast' });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionHeader number="10" title="Sequential Flows" />
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
        <p className="text-sm text-braun-600 max-w-2xl">
            Complex operations are broken down into linear sequences. The <code>FlowLayout</code> component enforces the visual hierarchy of Progress {'>'} Context {'>'} Action.
        </p>
        {/* Removed scale to prevent blurriness, used simple border wrapper */}
        <div className="border border-braun-200 shadow-xl bg-braun-50 p-8 max-w-4xl animate-in fade-in duration-700 delay-200 fill-mode-both">
            <FlowLayout 
            currentStep={step} 
            totalSteps={4} 
            title={step === 4 ? "Review & Confirm" : "Sequence Configuration"}
            subtitle="Demonstration of a multi-step process wizard."
            nextLabel={step === 4 ? "Finish (Reset)" : "Continue"}
            backLabel="Previous"
            onNext={handleNext}
            onBack={step > 1 ? handleBack : undefined}
            >
            <div className="min-h-[200px] flex flex-col justify-center animate-in fade-in duration-300">
                {step === 1 && (
                    <div className="space-y-6 max-w-md">
                        <Input 
                            label="Process Name" 
                            placeholder="e.g. Order Fulfillment" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                         <Select 
                            label="Data Source"
                            value={formData.source}
                            onChange={(val) => setFormData({...formData, source: val})}
                            options={[
                                { value: 'db', label: 'Primary Database (Postgres)' },
                                { value: 'api', label: 'External API Stream' },
                                { value: 'file', label: 'Flat File Upload (CSV)' }
                            ]}
                        />
                    </div>
                )}
                {step === 2 && (
                    <div className="space-y-6 max-w-md">
                        <div className="p-4 bg-white border border-braun-200 text-xs font-mono text-braun-500 mb-4">
                            Source: {formData.source === 'db' ? 'Primary Database' : formData.source === 'api' ? 'External API' : 'File Upload'}
                        </div>
                        <Select 
                            label="Ingestion Method"
                            value={formData.method}
                            onChange={(val) => setFormData({...formData, method: val})}
                            options={[
                                { value: 'fast', label: 'Quick Scan (Metadata Only)' },
                                { value: 'deep', label: 'Deep Analysis (Full Payload)' }
                            ]}
                        />
                    </div>
                )}
                {step === 3 && (
                    <div className="space-y-4">
                         <h4 className="text-sm font-medium text-braun-900">Validation Checks</h4>
                         <div className="space-y-2">
                            <div className="flex items-center gap-3 text-sm text-braun-600">
                                <CheckCircle size={14} className="text-emerald-500" />
                                <span>Schema Integrity Verified</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-braun-600">
                                <CheckCircle size={14} className="text-emerald-500" />
                                <span>Connection Latency: 45ms</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-braun-600">
                                <CheckCircle size={14} className="text-emerald-500" />
                                <span>Access Permissions Confirmed</span>
                            </div>
                         </div>
                    </div>
                )}
                {step === 4 && (
                    <div className="flex flex-col items-center justify-center gap-4 text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <CheckCircle size={32} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-braun-900">Configuration Complete</h3>
                            <p className="text-sm text-braun-500 mt-1">Ready to deploy process "{formData.name || 'Untitled'}".</p>
                        </div>
                    </div>
                )}
            </div>
            </FlowLayout>
        </div>
        </div>
    </section>
  );
};