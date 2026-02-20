import React, { useState, useEffect, useRef } from 'react';
import { SectionHeader, ComponentCard } from '../Shared';
import { 
  AlertCircle, Loader2, CheckCircle, 
  Terminal, Info, AlertTriangle, Check, ArrowRight, 
  Activity, Calendar, Hash, RefreshCw, MoreVertical, Trash, Archive
} from 'lucide-react';
import { Button } from '../../Button';
import { Modal, Tooltip, Drawer, DropdownMenu } from '../../Overlays';

// --- PRIMITIVES: ALERTS ---
const Alert: React.FC<{ type: 'info' | 'warning' | 'error' | 'success'; title: string; message: string; }> = ({ type, title, message }) => {
  const styles = {
    info: { bg: 'bg-braun-50', border: 'border-braun-200', icon: 'text-braun-900', iconType: Info },
    warning: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600', iconType: AlertTriangle },
    error: { bg: 'bg-rose-50', border: 'border-rose-200', icon: 'text-rose-600', iconType: AlertCircle },
    success: { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'text-emerald-600', iconType: CheckCircle },
  };
  const s = styles[type];
  const Icon = s.iconType;

  return (
    <div className={`p-4 border ${s.bg} ${s.border} flex items-start gap-4`}>
      <Icon size={16} className={`mt-0.5 shrink-0 ${s.icon}`} />
      <div className="flex-1 min-w-0">
        <h5 className="text-sm font-medium text-braun-900 leading-none mb-1">{title}</h5>
        <p className="text-xs text-braun-600 leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

const LOG_MESSAGES = [
  { threshold: 10, msg: "> INITIALIZING_PARSER_MODULE..." },
  { threshold: 25, msg: "> VALIDATING_SCHEMA_INTEGRITY [OK]" },
  { threshold: 45, msg: "> MAPPING_COLUMNS: [ID, TIME, ACTIVITY]..." },
  { threshold: 60, msg: "> INDEXING_CASES [BATCH_01]..." },
  { threshold: 75, msg: "> CALCULATING_VARIANTS..." },
  { threshold: 90, msg: "> GENERATING_STATISTICS..." },
  { threshold: 100, msg: "> PROCESS_COMPLETE." }
];

const ProcessingDemo = () => {
    const [view, setView] = useState<'processing' | 'complete'>('processing');
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const intervalRef = useRef<number | null>(null);
  
    const startProcessing = () => {
      setView('processing');
      setProgress(0);
      setLogs([]);
      
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      let currentProgress = 0;
      let logIndex = 0;

      intervalRef.current = window.setInterval(() => {
        currentProgress += Math.random() * 5;
        if (currentProgress > 100) currentProgress = 100;
        
        setProgress(Math.floor(currentProgress));

        // Safe access to log messages
        if (logIndex < LOG_MESSAGES.length) {
           const nextLog = LOG_MESSAGES[logIndex];
           if (nextLog && currentProgress >= nextLog.threshold) {
             setLogs(prev => [...prev, nextLog.msg]);
             logIndex++;
           }
        }

        if (currentProgress >= 100) {
          if (intervalRef.current) {
             window.clearInterval(intervalRef.current);
             intervalRef.current = null;
          }
        }
      }, 150);
    };
  
    useEffect(() => { 
        startProcessing(); 
        return () => { 
            if (intervalRef.current) window.clearInterval(intervalRef.current); 
        }; 
    }, []);
  
    return (
      <div className="w-full">
        <div className="flex justify-center gap-4 mb-8">
          <button onClick={startProcessing} className={`px-6 py-2 text-[10px] font-mono uppercase tracking-widest font-bold border transition-all ${view === 'processing' ? 'bg-braun-900 text-white border-braun-900' : 'bg-transparent text-braun-900 border-braun-200 hover:bg-braun-50'}`}>Processing View</button>
          <button onClick={() => setView('complete')} className={`px-6 py-2 text-[10px] font-mono uppercase tracking-widest font-bold border transition-all ${view === 'complete' ? 'bg-braun-900 text-white border-braun-900' : 'bg-transparent text-braun-900 border-braun-200 hover:bg-braun-50'}`}>Complete View</button>
        </div>

        {view === 'processing' && (
          <div className="h-[400px] flex flex-col items-center justify-center bg-braun-50 border border-braun-200 p-8 animate-in fade-in duration-300">
            <div className="w-full max-w-lg">
               <div className="flex justify-between items-end mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-braun-500 font-mono">System Processing</span>
                  <span className="text-2xl font-light text-braun-900 tabular-nums">{progress}%</span>
               </div>
               
               <div className="h-1.5 w-full bg-braun-200 mb-8 overflow-hidden">
                  <div className="h-full bg-braun-900 transition-all duration-200 ease-out" style={{ width: `${progress}%` }}/>
               </div>
               
               <div className="bg-braun-900 text-braun-400 p-6 rounded-sm font-mono text-xs shadow-xl h-48 flex flex-col border border-braun-800 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-braun-900/90 border-b border-braun-800 flex items-center px-4 gap-2 z-10 backdrop-blur-sm">
                     <Terminal size={10} className="text-braun-500" />
                     <span className="text-[10px] uppercase tracking-wider text-braun-500">kin_daemon.exe</span>
                  </div>
                  <div className="flex-1 overflow-y-auto pt-8 flex flex-col justify-end gap-1">
                      {logs.map((log, i) => (
                          <div key={i} className="text-emerald-500 animate-in slide-in-from-left-2 fade-in">{log}</div>
                      ))}
                      {progress < 100 && <div className="animate-pulse text-braun-500">_</div>}
                  </div>
               </div>
            </div>
          </div>
        )}

        {view === 'complete' && (
          <div className="h-[400px] flex items-center justify-center bg-braun-100 p-8 animate-in zoom-in-95 duration-300">
             <div className="w-full max-w-2xl bg-white border border-braun-200 shadow-xl flex flex-col overflow-hidden">
                <div className="bg-braun-900 text-white p-6 flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 bg-white/10 flex items-center justify-center border border-white/20">
                            <Check size={18} className="text-emerald-400" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold uppercase tracking-widest">Ingestion Complete</h1>
                            <p className="text-[10px] text-braun-400 font-mono mt-0.5">Ready for Analysis</p>
                        </div>
                    </div>
                    <div className="px-3 py-1 bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                        Status: Validated
                    </div>
                </div>
                <div className="p-8">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="p-4 border border-braun-100 bg-braun-50/50">
                            <div className="flex items-center gap-2 text-braun-400 mb-2">
                                <Activity size={12} />
                                <span className="text-[9px] font-bold uppercase tracking-widest">Total Events</span>
                            </div>
                            <div className="text-xl font-light text-braun-900 tracking-tight">15,847</div>
                        </div>
                        <div className="p-4 border border-braun-100 bg-braun-50/50">
                            <div className="flex items-center gap-2 text-braun-400 mb-2">
                                <Hash size={12} />
                                <span className="text-[9px] font-bold uppercase tracking-widest">Unique Items</span>
                            </div>
                            <div className="text-xl font-light text-braun-900 tracking-tight">2,341</div>
                        </div>
                        <div className="p-4 border border-braun-100 bg-braun-50/50">
                            <div className="flex items-center gap-2 text-braun-400 mb-2">
                                <Calendar size={12} />
                                <span className="text-[9px] font-bold uppercase tracking-widest">Date Range</span>
                            </div>
                            <div className="text-xs font-mono text-braun-900 mt-1">Nov 01 <span className="text-braun-300">→</span> Nov 30</div>
                        </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end gap-4 pt-6 border-t border-braun-100">
                        <button onClick={startProcessing} className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-braun-500 hover:text-braun-900 transition-colors">
                            <RefreshCw size={12} /> Restart
                        </button>
                        <button onClick={() => alert('Dashboard')} className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest bg-braun-900 text-white px-4 py-2 hover:bg-black transition-colors shadow-sm">
                            View Dashboard <ArrowRight size={12} />
                        </button>
                    </div>
                </div>
             </div>
          </div>
        )}
      </div>
    );
  };

export const FeedbackSection = () => {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <SectionHeader number="08" title="Feedback & Alerts" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
         <ComponentCard title="System Alerts" className="min-h-[200px] flex flex-col">
            <div className="space-y-4 flex-1">
               <Alert type="info" title="System Info" message="Normal operation." />
               <Alert type="error" title="Critical Error" message="Connection lost." />
            </div>
         </ComponentCard>
         <ComponentCard title="Loading States" className="flex-1">
             <div className="flex flex-col items-center justify-center h-full gap-8">
                 <div className="flex items-center gap-4">
                     <Loader2 className="animate-spin text-braun-900" />
                     <span className="text-[10px] font-mono uppercase text-braun-400">Processing</span>
                 </div>
                 <div className="w-full max-w-[200px] space-y-2">
                     <div className="h-1 w-full bg-braun-100 overflow-hidden">
                         <div className="h-full w-1/2 bg-braun-900 animate-[slide-right_1s_infinite]"></div>
                     </div>
                 </div>
             </div>
         </ComponentCard>
      </div>
      <div className="border-t border-braun-200 pt-12">
        <h3 className="text-sm font-bold text-braun-900 uppercase tracking-widest mb-8">Process Simulation</h3>
        <ProcessingDemo />
      </div>
    </section>
  );
};

export const OverlaysSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <SectionHeader number="09" title="Overlays & Menus" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
         {/* MODAL & DRAWER */}
         <ComponentCard title="Dialogs" className="min-h-[250px] flex items-center justify-center gap-4">
             <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
             <Button variant="secondary" onClick={() => setIsDrawerOpen(true)}>Open Drawer</Button>

             <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title="Confirm Action"
                actions={<><Button variant="ghost" onClick={() => setIsModalOpen(false)} size="sm">Cancel</Button><Button onClick={() => setIsModalOpen(false)} size="sm">Confirm</Button></>}
             >
                <p className="text-sm text-braun-600">Are you sure you want to archive this project? This action cannot be undone.</p>
             </Modal>

             <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Settings">
                <div className="p-6">
                    <h3 className="text-lg font-light mb-6">Configuration</h3>
                    <p className="text-xs text-braun-500 mb-4">Drawer content goes here.</p>
                    <Button className="w-full" onClick={() => setIsDrawerOpen(false)}>Close Panel</Button>
                </div>
             </Drawer>
         </ComponentCard>
  
         {/* TOOLTIPS & MENUS */}
         <ComponentCard title="Contextual" className="min-h-[250px] flex flex-col items-center justify-center gap-8">
            <div className="flex gap-4">
                <Tooltip content="System ID: 8X-99">
                    <span className="text-sm font-mono underline decoration-dotted cursor-help text-braun-600">Hover Me</span>
                </Tooltip>
            </div>
            
            <div className="flex gap-4 items-center">
                <span className="text-xs font-mono uppercase text-braun-400">Context Menu:</span>
                <DropdownMenu 
                    trigger={<Button variant="secondary" size="sm" icon={<MoreVertical size={14} />}>Actions</Button>}
                    items={[
                        { label: 'Archive Item', icon: <Archive size={14}/>, onClick: () => alert('Archived') },
                        { label: 'Delete', icon: <Trash size={14}/>, onClick: () => alert('Deleted'), danger: true }
                    ]}
                />
            </div>
         </ComponentCard>
      </div>
    </section>
  );
};