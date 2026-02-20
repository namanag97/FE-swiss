
import React from 'react';
import { Calendar, Filter, Plus, X, ChevronDown, RefreshCw } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface FilterTagProps {
    label: string;
    value: string;
    onRemove: () => void;
}

const FilterTag: React.FC<FilterTagProps> = ({ label, value, onRemove }) => (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-braun-200 rounded-sm text-xs shadow-sm hover:border-braun-400 transition-colors group">
        <span className="font-mono text-braun-500 uppercase">{label}:</span>
        <span className="font-medium text-braun-900">{value}</span>
        <button onClick={onRemove} className="text-braun-300 hover:text-braun-900 transition-colors">
            <X size={12} />
        </button>
    </div>
);

export const FilterBar: React.FC<{
    className?: string;
}> = ({ className }) => {
    return (
        <div className={twMerge("bg-braun-50 border-b border-braun-200 sticky top-0 z-40 px-8 py-3 flex items-center justify-between backdrop-blur-md bg-braun-50/90", className)}>
            <div className="flex items-center gap-4 flex-1 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-2 text-braun-400 border-r border-braun-200 pr-4 mr-2">
                    <Filter size={14} />
                    <span className="text-[10px] font-mono uppercase tracking-widest">Global Filter</span>
                </div>

                {/* Active Filters */}
                <FilterTag label="Time" value="Last 30 Days" onRemove={() => {}} />
                <FilterTag label="Vendor" value="DE_Hamburg_01" onRemove={() => {}} />
                <FilterTag label="Value" value="> €10k" onRemove={() => {}} />

                {/* Add Filter Button */}
                <button className="flex items-center gap-1 px-3 py-1.5 border border-dashed border-braun-300 text-braun-500 rounded-sm text-xs hover:border-braun-900 hover:text-braun-900 transition-colors">
                    <Plus size={12} />
                    <span>Add Filter</span>
                </button>
            </div>

            <div className="flex items-center gap-4 pl-4 border-l border-braun-200">
                <span className="text-[10px] font-mono text-braun-400">1,247 Cases (100%)</span>
                <button className="p-1.5 text-braun-400 hover:text-braun-900 rounded-sm transition-colors" title="Refresh Data">
                    <RefreshCw size={14} />
                </button>
            </div>
        </div>
    );
};
