
import React from 'react';
import { MoreVertical, Maximize2, Trash2, ArrowRight, MessageSquare, Plus } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { DropdownMenu } from './Overlays';

// --- DASHBOARD CARD WRAPPER ---
interface DashboardCardProps {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    onRemove?: () => void;
    onExpand?: () => void;
    className?: string;
    height?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ 
    title, icon, children, onRemove, onExpand, className, height = 'min-h-[400px]' 
}) => {
    return (
        <div className={twMerge("bg-white border border-braun-200 shadow-sm transition-all duration-300 hover:shadow-md flex flex-col", height, className)}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-braun-100 bg-braun-50/30">
                <div className="flex items-center gap-3">
                    {icon && <span className="text-braun-400">{icon}</span>}
                    <h3 className="text-sm font-bold text-braun-900 uppercase tracking-wide">{title}</h3>
                </div>
                <div className="flex items-center gap-2">
                    {onExpand && (
                        <button onClick={onExpand} className="p-1.5 text-braun-400 hover:text-braun-900 hover:bg-braun-100 rounded-sm transition-colors">
                            <Maximize2 size={14} />
                        </button>
                    )}
                    {onRemove && (
                        <DropdownMenu 
                            align="right"
                            trigger={
                                <button className="p-1.5 text-braun-400 hover:text-braun-900 hover:bg-braun-100 rounded-sm transition-colors">
                                    <MoreVertical size={14} />
                                </button>
                            }
                            items={[
                                { label: 'Remove Block', icon: <Trash2 size={14} />, onClick: onRemove, danger: true }
                            ]}
                        />
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 relative overflow-hidden flex flex-col">
                {children}
            </div>
        </div>
    );
};

// --- QUESTION / CHAINING BAR ---
interface QuestionBarProps {
    onSelect: (questionId: string) => void;
}

export const QuestionBar: React.FC<QuestionBarProps> = ({ onSelect }) => {
    return (
        <div className="py-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-braun-200 flex-1"></div>
                <span className="text-xs font-mono uppercase tracking-widest text-braun-400 bg-braun-50 px-2">Chain Analysis</span>
                <div className="h-px bg-braun-200 flex-1"></div>
            </div>

            <h4 className="text-lg font-light text-braun-900 text-center mb-6">What would you like to analyze next?</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                <QuestionButton 
                    label="Identify bottlenecks"
                    desc="Analyze cycle time & delays"
                    onClick={() => onSelect('bottleneck')}
                />
                <QuestionButton 
                    label="Check SLA compliance"
                    desc="Deadline breaches & risks"
                    onClick={() => onSelect('deadline')}
                />
                <QuestionButton 
                    label="Compare Variants"
                    desc="Happy path vs. deviations"
                    onClick={() => onSelect('variant')}
                />
            </div>
        </div>
    );
};

const QuestionButton: React.FC<{ label: string; desc: string; onClick: () => void }> = ({ label, desc, onClick }) => (
    <button 
        onClick={onClick}
        className="text-left p-4 bg-white border border-braun-200 hover:border-braun-900 transition-all group shadow-sm hover:shadow-md relative overflow-hidden"
    >
        <div className="flex justify-between items-start mb-1">
            <span className="font-medium text-braun-900 group-hover:text-braun-orange transition-colors">{label}</span>
            <Plus size={16} className="text-braun-300 group-hover:text-braun-900" />
        </div>
        <span className="text-xs text-braun-500 font-mono">{desc}</span>
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-braun-900 group-hover:w-full transition-all duration-300" />
    </button>
);
