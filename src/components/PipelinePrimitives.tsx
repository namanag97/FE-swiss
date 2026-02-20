
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Database, CheckCircle, ArrowRight, Server, Play, Zap, FileJson, Layout } from 'lucide-react';

// --- STAGE WRAPPER ---
export const PipelineStage: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={twMerge("flex flex-col h-full", className)}>
        <span className="text-[10px] font-mono uppercase tracking-widest text-braun-400 mb-4 pl-1">{title}</span>
        <div className="flex-1 relative flex flex-col justify-center">
            {children}
        </div>
    </div>
);

// --- NODE: DATA SOURCE ---
export const DataSourceNode: React.FC<{ type: 'file' | 'db'; label: string; count: number }> = ({ type, label, count }) => (
    <div className="w-16 h-16 bg-white border border-braun-200 rounded-full flex flex-col items-center justify-center shadow-sm hover:border-braun-900 hover:scale-105 transition-all cursor-pointer group z-10">
        {type === 'file' ? <FileJson size={18} className="text-braun-400 group-hover:text-braun-900" /> : <Server size={18} className="text-braun-400 group-hover:text-braun-900" />}
        <div className="absolute -bottom-6 w-32 text-center">
            <span className="text-[10px] font-medium text-braun-900 block truncate">{label}</span>
        </div>
        {count > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-braun-50 border border-braun-200 rounded-full flex items-center justify-center text-[9px] font-mono text-braun-600">
                {count}
            </div>
        )}
    </div>
);

// --- NODE: PROCESSING BOX (THE BLUE ONE) ---
export const ProcessingNode: React.FC<{ label: string; subLabel?: string; status?: 'active' | 'idle' }> = ({ label, subLabel, status = 'idle' }) => (
    <div className="relative group w-full">
        {/* The Action Bar */}
        <div className={twMerge(
            "h-12 flex items-center justify-between px-4 rounded-sm transition-all shadow-sm cursor-pointer",
            status === 'active' ? "bg-blue-600 text-white shadow-blue-200" : "bg-white border border-braun-200 hover:border-braun-900 text-braun-900"
        )}>
            <span className="text-xs font-bold uppercase tracking-wide">{label}</span>
            <div className={twMerge("w-6 h-6 rounded-full flex items-center justify-center", status === 'active' ? "bg-white text-blue-600" : "bg-braun-100 text-braun-400")}>
                <ArrowRight size={12} />
            </div>
        </div>
        
        {/* Metrics Row */}
        <div className="flex justify-between mt-3 px-2 border-t border-braun-100 pt-2 opacity-60 group-hover:opacity-100 transition-opacity">
            <div className="text-center">
                <div className="text-[10px] font-bold text-braun-900">0</div>
                <div className="text-[8px] font-mono uppercase text-braun-400">Extractions</div>
            </div>
            <div className="text-center">
                <div className="text-[10px] font-bold text-braun-900">0</div>
                <div className="text-[8px] font-mono uppercase text-braun-400">Transforms</div>
            </div>
            <div className="text-center">
                <div className="text-[10px] font-bold text-braun-900">0</div>
                <div className="text-[8px] font-mono uppercase text-braun-400">Loads</div>
            </div>
        </div>
    </div>
);

// --- NODE: STORAGE (ABSTRACT) ---
export const StorageNode: React.FC = () => (
    <div className="border border-dashed border-braun-300 bg-braun-50 rounded-full h-12 flex items-center justify-center gap-2 px-6">
        <Database size={14} className="text-braun-400" />
        <span className="text-[10px] font-mono uppercase text-braun-500">Data Storage</span>
    </div>
);

// --- NODE: OUTPUT (DATA MODEL) ---
export const DataModelNode: React.FC<{ count: number }> = ({ count }) => (
    <div className="bg-white border border-braun-200 p-3 rounded-sm flex items-center gap-3 shadow-sm min-w-[140px]">
        <div className="font-bold text-sm text-braun-900">{count}</div>
        <div className="flex flex-col">
            <span className="text-xs font-medium text-braun-900">Data Models</span>
            <span className="text-[9px] font-mono text-emerald-500 flex items-center gap-1">
                <CheckCircle size={8} /> Active
            </span>
        </div>
        <div className="ml-auto">
            <CheckCircle size={16} className="text-emerald-500" />
        </div>
    </div>
);

// --- NODE: CONSUMER (STUDIO) ---
export const StudioNode: React.FC = () => (
    <div className="border border-braun-200 bg-white px-6 py-3 rounded-sm flex items-center gap-2 hover:shadow-md transition-all cursor-pointer">
        <Layout size={14} className="text-braun-900" />
        <span className="text-xs font-bold text-braun-900 uppercase tracking-wide">Studio</span>
    </div>
);

// --- CONNECTOR ---
export const PipelineConnector: React.FC<{ length?: number }> = ({ length = 64 }) => (
    <div className="flex items-center" style={{ width: length }}>
        <div className="h-px bg-braun-300 w-full relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-braun-300 rounded-full" />
        </div>
    </div>
);
