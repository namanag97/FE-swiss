
import React, { useState } from 'react';
import { 
    ChevronDown, Database, Scan, Braces, 
    Settings, Plus, Trash2, ArrowRight, Sparkles, Hash, 
    AlertTriangle, FileJson, CheckCircle2, RefreshCw, MoreVertical, Archive, Edit2
} from 'lucide-react';
import { Workspace } from '../types';

// Atomic Components
import { Card, Grid } from './LayoutPrimitives';
import { Badge } from './DataDisplay';
import { Button } from './Button';
import { Tabs } from './Navigation';
import { DropdownMenu } from './Overlays';

interface WorkspaceCardProps {
    workspace: Workspace;
    onStartExploration: () => void;
    onSelectExploration: (workspaceId: string, explorationId: string) => void;
    onDeleteWorkspace: (workspaceId: string) => void;
    onRenameWorkspace?: (workspaceId: string) => void;
}

export const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ 
    workspace: ws, 
    onStartExploration, 
    onSelectExploration, 
    onDeleteWorkspace,
    onRenameWorkspace
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState('analyses');

    // Simulated Data Quality Score
    const dataQuality = ws.dataset ? 98 : 0;

    return (
        <div 
            className={`bg-white border transition-all duration-300 group ${isExpanded ? 'border-braun-900 shadow-lg ring-1 ring-black/5' : 'border-braun-200 hover:border-braun-400'}`}
        >
            {/* --- FOLDER SPINE (HEADER) --- */}
            <div className="relative">
                {/* Status Indicator Strip */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors ${isExpanded ? 'bg-braun-900' : 'bg-transparent group-hover:bg-braun-200'}`} />

                <div className="p-6 pl-8">
                    <Grid cols={12} gap={4}>
                        {/* Title & Context */}
                        <div 
                            className="col-span-12 md:col-span-6 cursor-pointer"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Badge variant="neutral" size="sm">{ws.referenceModel}</Badge>
                                <span className="text-[9px] font-mono text-braun-400 uppercase tracking-widest">{ws.slug}</span>
                            </div>
                            <h3 className="text-xl font-medium text-braun-900 flex items-center gap-3">
                                <FolderIcon isOpen={isExpanded} />
                                {ws.name}
                            </h3>
                            <div className="flex items-center gap-4 text-xs font-mono text-braun-500 mt-2 pl-8">
                                <span className="flex items-center gap-2">
                                    <Database size={12} /> {ws.dataset?.name || "No Dataset"}
                                </span>
                            </div>
                        </div>

                        {/* Quick Metrics & Actions */}
                        <div className="col-span-12 md:col-span-6 flex items-center justify-end gap-8">
                             <div className="text-right hidden md:block">
                                <span className="text-[9px] font-mono font-bold uppercase text-braun-400 block mb-1">Total Events</span>
                                <span className="text-lg font-light text-braun-900">{ws.dataset?.stats.totalRows.toLocaleString() || 0}</span>
                             </div>
                             
                             {/* Context Menu (3-Dots) */}
                             <div className="flex items-center gap-4">
                                 <DropdownMenu 
                                    align="right"
                                    trigger={
                                        <button className="w-8 h-8 flex items-center justify-center text-braun-400 hover:text-braun-900 hover:bg-braun-50 rounded-sm transition-colors">
                                            <MoreVertical size={16} />
                                        </button>
                                    }
                                    items={[
                                        { label: 'Rename Unit', icon: <Edit2 size={14} />, onClick: () => onRenameWorkspace?.(ws.id) },
                                        { label: 'Export Data', icon: <FileJson size={14} />, onClick: () => {} },
                                        { label: 'Archive Unit', icon: <Archive size={14} />, onClick: () => {} },
                                        { label: 'Delete Workspace', icon: <Trash2 size={14} />, onClick: () => onDeleteWorkspace(ws.id), danger: true },
                                    ]}
                                 />

                                 {/* Expansion Toggle */}
                                 <div 
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className={`w-8 h-8 rounded-full border border-braun-200 flex items-center justify-center text-braun-400 transition-all cursor-pointer ${isExpanded ? 'bg-braun-900 text-white border-braun-900 rotate-180' : 'hover:border-braun-900 hover:text-braun-900'}`}
                                 >
                                    <ChevronDown size={16} />
                                 </div>
                             </div>
                        </div>
                    </Grid>
                </div>
            </div>

            {/* --- FOLDER CONTENTS (EXPANDED) --- */}
            {isExpanded && (
                <div className="border-t border-braun-200 animate-in slide-in-from-top-2 duration-300">
                    {/* Interior Navigation */}
                    <div className="bg-braun-50/50 px-8 border-b border-braun-100">
                        <Tabs 
                            activeId={activeTab}
                            onChange={setActiveTab}
                            className="border-none"
                            items={[
                                { id: 'analyses', label: 'Analysis Layers', icon: <Scan size={14} /> },
                                { id: 'data', label: 'Data Model', icon: <Braces size={14} /> },
                            ]}
                        />
                    </div>

                    <div className="p-8 bg-white min-h-[400px]">
                        
                        {/* TAB 1: ANALYSES (EXPLORATIONS) */}
                        {activeTab === 'analyses' && (
                            <div className="animate-in fade-in duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Action Card: New Analysis */}
                                    <div 
                                        onClick={onStartExploration}
                                        className="min-h-[200px] border-2 border-dashed border-braun-200 hover:border-braun-900 bg-braun-50/30 hover:bg-white transition-all cursor-pointer flex flex-col items-center justify-center p-8 group relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-braun-100/0 group-hover:bg-braun-100/10 transition-colors" />
                                        <div className="w-14 h-14 bg-white border border-braun-200 group-hover:bg-braun-900 group-hover:text-white rounded-full flex items-center justify-center mb-4 transition-colors shadow-sm z-10">
                                            <Plus size={24} strokeWidth={1.5} />
                                        </div>
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-braun-900 mb-1 z-10">Initialize Analysis</h4>
                                        <p className="text-[10px] font-mono text-braun-500 z-10">Create new intent-based dashboard</p>
                                    </div>

                                    {/* Existing Analyses */}
                                    {ws.explorations.map(exp => (
                                        <Card key={exp.id} className="cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all group min-h-[200px] flex flex-col" padding="none">
                                            <div onClick={() => onSelectExploration(ws.id, exp.id)} className="flex-1 flex flex-col">
                                                {/* Card Header */}
                                                <div className="p-4 border-b border-braun-100 bg-braun-50/30 flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${exp.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                                                        <span className="text-[9px] font-mono font-bold uppercase text-braun-400">{exp.status}</span>
                                                    </div>
                                                    <span className="text-[9px] font-mono text-braun-400">{exp.lastModified}</span>
                                                </div>
                                                
                                                {/* Card Body */}
                                                <div className="p-6 flex-1 flex flex-col">
                                                    <h4 className="font-medium text-braun-900 text-base mb-2 group-hover:text-braun-orange transition-colors line-clamp-2">
                                                        {exp.name}
                                                    </h4>
                                                    <p className="text-xs text-braun-500 font-mono mb-4">{exp.goal}</p>
                                                    
                                                    <div className="mt-auto pt-4 border-t border-braun-50 flex items-center justify-between">
                                                        <Badge variant="neutral" size="sm" className="bg-braun-50">
                                                            <Sparkles size={10} className="mr-1 text-braun-400" />
                                                            {exp.insightCount || 0} Insights
                                                        </Badge>
                                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-braun-50 text-braun-300 group-hover:bg-braun-900 group-hover:text-white transition-colors">
                                                            <ArrowRight size={14} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB 2: DATA MODEL (QUERY READY) */}
                        {activeTab === 'data' && (
                            <div className="animate-in fade-in duration-300">
                                <div className="grid grid-cols-12 gap-8">
                                    {/* Left: Logical Schema */}
                                    <div className="col-span-12 lg:col-span-8">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h4 className="text-sm font-bold text-braun-900 uppercase tracking-widest mb-1">Semantic Mapping</h4>
                                                <p className="text-xs text-braun-500">Logical definitions used by the mining engine.</p>
                                            </div>
                                            <Button variant="secondary" size="sm" icon={<RefreshCw size={12}/>}>Refresh Schema</Button>
                                        </div>

                                        {ws.dataset?.mapping ? (
                                            <div className="border border-braun-200 rounded-sm overflow-hidden">
                                                <table className="w-full text-left">
                                                    <thead className="bg-braun-50 border-b border-braun-200">
                                                        <tr>
                                                            <th className="px-4 py-3 text-[9px] font-mono uppercase tracking-widest text-braun-500 font-bold">Process Attribute</th>
                                                            <th className="px-4 py-3 text-[9px] font-mono uppercase tracking-widest text-braun-500 font-bold">Source Column</th>
                                                            <th className="px-4 py-3 text-[9px] font-mono uppercase tracking-widest text-braun-500 font-bold">Data Type</th>
                                                            <th className="px-4 py-3 text-[9px] font-mono uppercase tracking-widest text-braun-500 font-bold text-right">Validation</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-braun-100">
                                                        <SchemaRow label="Case Identifier" column={ws.dataset.mapping.caseId} type="String (ID)" valid />
                                                        <SchemaRow label="Activity Name" column={ws.dataset.mapping.activity} type="String" valid />
                                                        <SchemaRow label="Timestamp" column={ws.dataset.mapping.timestamp} type="ISO 8601" valid />
                                                        {ws.dataset.mapping.attributes.map((attr, i) => (
                                                            <SchemaRow key={i} label="Dimension" column={attr} type="Variant" valid />
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <div className="p-8 border border-dashed border-braun-200 text-center bg-braun-50">
                                                <AlertTriangle size={24} className="mx-auto text-amber-500 mb-2" />
                                                <p className="text-xs text-braun-500">Schema configuration missing.</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right: Physical Stats */}
                                    <div className="col-span-12 lg:col-span-4">
                                        <div className="bg-braun-50 border border-braun-200 p-6 h-full flex flex-col">
                                            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-braun-200">
                                                <div className="w-10 h-10 bg-white border border-braun-200 flex items-center justify-center text-braun-600">
                                                    <FileJson size={20} />
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-mono uppercase text-braun-400">Source File</div>
                                                    <div className="text-sm font-medium text-braun-900 break-all">{ws.dataset?.fileName || "N/A"}</div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div>
                                                    <div className="flex justify-between items-end mb-2">
                                                        <span className="text-xs font-bold text-braun-900">Data Health</span>
                                                        <span className={`text-xs font-mono font-bold ${dataQuality > 90 ? 'text-emerald-600' : 'text-amber-600'}`}>{dataQuality}%</span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-braun-200 rounded-full overflow-hidden">
                                                        <div className={`h-full rounded-full ${dataQuality > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${dataQuality}%` }} />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <StatBox label="Date Range" value="30 Days" />
                                                    <StatBox label="Completeness" value="99.9%" />
                                                    <StatBox label="Avg Events/Case" value="12.4" />
                                                    <StatBox label="Variants" value="48" />
                                                </div>
                                            </div>

                                            <div className="mt-auto pt-6">
                                                <Button variant="ghost" size="sm" className="w-full bg-white border border-braun-200">View Raw Logs</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- SUB COMPONENTS ---

const FolderIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
    <div className="relative w-5 h-4">
        <div className={`absolute inset-0 border-2 border-braun-900 rounded-[1px] transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-0'}`} />
        <div className={`absolute top-[-4px] left-0 w-2 h-1 bg-braun-900 rounded-t-[1px]`} />
    </div>
);

const SchemaRow: React.FC<{ label: string; column: string; type: string; valid: boolean }> = ({ label, column, type, valid }) => (
    <tr className="hover:bg-braun-50 transition-colors">
        <td className="px-4 py-3">
            <div className="flex items-center gap-2">
                <Hash size={12} className="text-braun-400" /> 
                <span className="text-xs font-medium text-braun-900">{label}</span>
            </div>
        </td>
        <td className="px-4 py-3 text-xs font-mono text-braun-600">{column}</td>
        <td className="px-4 py-3 text-xs font-mono text-braun-400">{type}</td>
        <td className="px-4 py-3 text-right">
            {valid ? <CheckCircle2 size={14} className="text-emerald-500 inline-block" /> : <AlertTriangle size={14} className="text-amber-500 inline-block" />}
        </td>
    </tr>
);

const StatBox: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div>
        <div className="text-[9px] text-braun-400 uppercase tracking-wide mb-1">{label}</div>
        <div className="text-sm font-mono text-braun-900">{value}</div>
    </div>
);
