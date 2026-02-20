import React, { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { ArrowRight, Clock, User, Calendar, AlertCircle, Plus, Minus, Maximize, RotateCw } from 'lucide-react';

// --- TYPES ---
export type NodeType = 'task' | 'gateway' | 'start' | 'end';
export type NodeStatus = 'neutral' | 'success' | 'warning' | 'error';
export type Orientation = 'horizontal' | 'vertical';

// --- PRIMITIVES ---

export const ActivityChip: React.FC<{ label: string; count?: number; status?: NodeStatus }> = ({ label, count, status = 'neutral' }) => {
  const statusStyles = {
    neutral: "bg-white border-braun-200 text-braun-700",
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    error: "bg-rose-50 border-rose-200 text-rose-800",
  };

  return (
    <div className={twMerge("inline-flex items-center gap-2 px-2 py-1 rounded-sm border text-[10px] font-mono uppercase tracking-wide select-none transition-colors", statusStyles[status])}>
      <span className="truncate max-w-[120px] font-bold">{label}</span>
      {count !== undefined && (
        <>
          <div className="w-px h-3 bg-current opacity-20" />
          <span className="opacity-70">{count}</span>
        </>
      )}
    </div>
  );
};

export const ResourceBadge: React.FC<{ name: string; id?: string }> = ({ name, id }) => (
  <div className="inline-flex items-center gap-1.5 text-[10px] text-braun-500 font-mono">
    <div className="w-4 h-4 rounded-full bg-braun-100 flex items-center justify-center text-braun-600">
      <User size={8} />
    </div>
    <span className="truncate max-w-[80px]">{name}</span>
  </div>
);

export const TimestampDisplay: React.FC<{ date: string; relative?: boolean }> = ({ date, relative }) => {
  const d = new Date(date);
  const display = relative 
    ? "2m ago" 
    : d.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="inline-flex items-center gap-1.5 font-mono text-[9px] text-braun-400">
      <Calendar size={8} />
      <span>{display}</span>
    </div>
  );
};

export const EventRow: React.FC<{ 
  index: number; 
  activity: string; 
  resource: string; 
  timestamp: string; 
  duration?: string;
  isBottleneck?: boolean; 
}> = ({ index, activity, resource, timestamp, duration, isBottleneck }) => (
  <div className={twMerge(
    "flex items-center justify-between p-3 border-b border-braun-100 hover:bg-braun-50 transition-colors group",
    isBottleneck && "bg-amber-50/30 hover:bg-amber-50/50"
  )}>
    <div className="flex items-center gap-3">
       <span className="text-[9px] font-mono text-braun-300 w-4">{String(index).padStart(2, '0')}</span>
       <ActivityChip label={activity} status={isBottleneck ? 'warning' : 'neutral'} />
    </div>
    
    <div className="flex items-center gap-4">
        {duration && (
            <span className={twMerge("text-[9px] font-mono", isBottleneck ? "text-amber-600 font-bold" : "text-braun-300")}>
                {duration}
            </span>
        )}
        <ResourceBadge name={resource} />
        <TimestampDisplay date={timestamp} />
    </div>
  </div>
);

export const CaseCard: React.FC<{ 
    id: string; 
    variant: string; 
    duration: string; 
    eventCount: number; 
    startTime: string; 
    status?: NodeStatus;
    onClick?: () => void;
    active?: boolean;
}> = ({ id, variant, duration, eventCount, startTime, status = 'neutral', onClick, active }) => {
    return (
        <div 
            onClick={onClick}
            className={twMerge(
                "p-4 border bg-white cursor-pointer transition-all group relative overflow-hidden",
                active ? "border-braun-900 shadow-sm" : "border-braun-200 hover:border-braun-400",
                status === 'warning' && !active && "border-l-4 border-l-amber-400"
            )}
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-braun-900 group-hover:text-braun-orange transition-colors">{id}</span>
                    <span className="text-[9px] font-mono text-braun-400 uppercase tracking-widest">{variant}</span>
                </div>
                {status === 'warning' && <AlertCircle size={14} className="text-amber-500" />}
            </div>
            
            <div className="flex items-center gap-3 border-t border-braun-100 pt-3">
                <div className="flex flex-col">
                    <span className="text-[9px] text-braun-400 font-mono uppercase">Duration</span>
                    <span className="text-xs font-mono text-braun-700">{duration}</span>
                </div>
                <div className="w-px h-6 bg-braun-100" />
                <div className="flex flex-col">
                    <span className="text-[9px] text-braun-400 font-mono uppercase">Events</span>
                    <span className="text-xs font-mono text-braun-700">{eventCount}</span>
                </div>
            </div>
            
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={14} className="text-braun-900" />
            </div>
        </div>
    );
};

// --- INTERACTIVE CANVAS ---
interface ProcessCanvasProps {
  children: React.ReactNode;
  className?: string;
  zoom: number;
  offset: { x: number; y: number };
  onOffsetChange: (offset: { x: number; y: number }) => void;
  onZoomChange: (zoom: number) => void;
}

export const ProcessCanvas: React.FC<ProcessCanvasProps> = ({ 
  children, className, zoom, offset, onOffsetChange, onZoomChange 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent text selection
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    onOffsetChange({ x: offset.x + dx, y: offset.y + dy });
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
        // Zoom
        const delta = -e.deltaY * 0.001;
        const newZoom = Math.min(Math.max(0.2, zoom + delta), 3);
        onZoomChange(newZoom);
    } else {
        // Pan
        onOffsetChange({ x: offset.x - e.deltaX, y: offset.y - e.deltaY });
    }
  };

  return (
    <div 
      ref={containerRef}
      className={twMerge("relative w-full h-full bg-braun-50 overflow-hidden cursor-grab active:cursor-grabbing", className)}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Background Grid for Scale Context */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
            backgroundPosition: `${offset.x}px ${offset.y}px`,
            backgroundSize: `${40 * zoom}px ${40 * zoom}px`,
            backgroundImage: `linear-gradient(to right, #a1a1aa 1px, transparent 1px), linear-gradient(to bottom, #a1a1aa 1px, transparent 1px)`
        }}
      />
      
      {/* Origin Crosshair */}
      <div 
        className="absolute w-4 h-4 border-l border-t border-braun-400 pointer-events-none opacity-50 z-0"
        style={{ 
            left: 0, top: 0,
            transform: `translate(${offset.x}px, ${offset.y}px)` 
        }}
      />

      <div 
        className="w-full h-full origin-top-left"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }}
      >
        <svg className="overflow-visible w-full h-full pointer-events-none">
          <g className="pointer-events-auto">
             {children}
          </g>
        </svg>
      </div>
    </div>
  );
};

// --- NODES ---
interface ProcessNodeProps {
  x: number;
  y: number;
  label: string;
  type?: NodeType;
  status?: NodeStatus;
  metrics?: { count?: number; avgTime?: string; deviationRate?: number };
  selected?: boolean;
  dimmed?: boolean;
  onClick?: () => void;
}

export const ProcessNode: React.FC<ProcessNodeProps> = ({ 
  x, y, label, type = 'task', status = 'neutral', metrics, selected, dimmed, onClick 
}) => {
  const strokes = {
    neutral: "stroke-braun-300 fill-white",
    success: "stroke-emerald-500 fill-emerald-50",
    warning: "stroke-amber-400 fill-amber-50",
    error: "stroke-rose-400 fill-rose-50"
  };

  const textColors = {
    neutral: "fill-braun-900",
    success: "fill-emerald-800",
    warning: "fill-amber-900",
    error: "fill-rose-800"
  };

  const opacityClass = dimmed ? "opacity-20" : "opacity-100";
  const glowClass = selected ? "stroke-braun-900 stroke-2 filter drop-shadow-md" : "stroke-1";

  const renderShape = () => {
    switch (type) {
      case 'start':
        return <circle r="16" className={`${strokes['success']} stroke-2 transition-all duration-300`} />;
      case 'end':
        return <circle r="16" className={`${strokes['neutral']} stroke-2 transition-all duration-300`} />;
      case 'gateway':
        return <polygon points="0,-20 20,0 0,20 -20,0" className={`${strokes[status]} ${glowClass} transition-all duration-300`} />;
      case 'task':
      default:
        // Use a group to center the rect properly
        return <rect x="-60" y="-28" width="120" height="56" rx="2" className={`${strokes[status]} ${glowClass} transition-all duration-300`} />;
    }
  };

  return (
    <g 
      transform={`translate(${x}, ${y})`} 
      onClick={(e) => { e.stopPropagation(); onClick?.(); }}
      className={`cursor-pointer group transition-all duration-500 ease-in-out ${opacityClass}`}
    >
      {renderShape()}

      {/* Label */}
      <text 
        y={type === 'task' ? -4 : 35} 
        textAnchor="middle" 
        className={`text-[11px] font-medium font-sans pointer-events-none transition-colors duration-300 ${textColors[status]}`}
      >
        {label}
      </text>

      {/* Metrics Visualization (Braun Pill) */}
      {type === 'task' && metrics && (
        <g transform="translate(0, 14)">
            {/* Background Track */}
            <rect x="-50" y="0" width="100" height="3" rx="1.5" className="fill-braun-100" />
            
            {/* Frequency Bar */}
            {metrics.count && (
                <rect 
                    x="-50" y="0" 
                    width={Math.min((metrics.count / 1500) * 100, 100)} 
                    height="3" rx="1.5" 
                    className="fill-braun-400 group-hover:fill-braun-900 transition-colors duration-300" 
                />
            )}
            
            {/* Text Metrics */}
            <text y="14" textAnchor="middle" className="text-[9px] font-mono fill-braun-400 uppercase tracking-widest pointer-events-none">
               {metrics.count} <tspan className="fill-braun-300 mx-1">·</tspan> {metrics.avgTime}
            </text>
            
            {/* Deviation Indicator */}
            {metrics.deviationRate && metrics.deviationRate > 0.05 && (
                 <circle cx="58" cy="1.5" r="3" className="fill-amber-500 animate-pulse" />
            )}
        </g>
      )}
    </g>
  );
};

// --- SMART BEZIER EDGES ---
interface ProcessEdgeProps {
  id: string;
  source: { x: number; y: number };
  target: { x: number; y: number };
  weight?: number;
  label?: string;
  isHappyPath?: boolean;
  orientation: Orientation;
  dimmed?: boolean;
  animated?: boolean;
}

export const ProcessEdge: React.FC<ProcessEdgeProps> = ({ 
  id, source, target, weight = 1, label, isHappyPath = true, orientation, dimmed, animated 
}) => {
  // Calculate Cubic Bezier Control Points for smooth "S" curves
  const midX = (source.x + target.x) / 2;
  const midY = (source.y + target.y) / 2;
  
  let d = '';
  if (orientation === 'horizontal') {
      // S-Curve Horizontal: Control points handle X-distance
      d = `M ${source.x} ${source.y} C ${midX} ${source.y}, ${midX} ${target.y}, ${target.x} ${target.y}`;
  } else {
      // S-Curve Vertical: Control points handle Y-distance
      d = `M ${source.x} ${source.y} C ${source.x} ${midY}, ${target.x} ${midY}, ${target.x} ${target.y}`;
  }

  const opacityClass = dimmed ? "opacity-10" : "opacity-100";
  const strokeColor = isHappyPath ? "#a1a1aa" : "#fbbf24"; // Braun-400 or Amber-400

  return (
    <g className={`group transition-opacity duration-300 ${opacityClass}`}>
      <defs>
          <marker id={`arrow-${id}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill={dimmed ? "#e4e4e7" : strokeColor} />
          </marker>
      </defs>
      
      {/* Invisible thick path for easier hovering */}
      <path d={d} stroke="transparent" strokeWidth="20" fill="none" />

      {/* Visible Path */}
      <path 
        id={`path-${id}`}
        d={d} 
        stroke={strokeColor}
        strokeWidth={Math.max(1, weight)}
        strokeDasharray={isHappyPath ? "0" : "4,2"}
        fill="none"
        markerEnd={`url(#arrow-${id})`}
        className="transition-colors duration-300 group-hover:stroke-braun-900"
      />

      {/* Flow Animation Tokens */}
      {animated && !dimmed && (
        <circle r={Math.max(2, weight)} fill={isHappyPath ? "#09090b" : "#b45309"}>
          <animateMotion dur={`${3 / weight}s`} repeatCount="indefinite" path={d}>
             <mpath href={`#path-${id}`}/>
          </animateMotion>
        </circle>
      )}

      {/* Label */}
      {(weight > 2 || !dimmed) && label && (
        <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <rect 
                x={orientation === 'horizontal' ? midX - 15 : midX - 15} 
                y={orientation === 'horizontal' ? midY - 8 : midY - 8} 
                width="30" height="16" rx="2" 
                className="fill-white stroke-braun-200" 
            />
            <text 
                x={midX} 
                y={midY + 3} 
                textAnchor="middle" 
                className="text-[9px] font-mono fill-braun-900"
            >
                {label}
            </text>
        </g>
      )}
    </g>
  );
};

// --- CONTROLS ---
interface CanvasControlsProps {
    onZoomIn: () => void;
    onZoomOut: () => void;
    onFit: () => void;
    orientation: Orientation;
    onToggleOrientation: () => void;
}

export const CanvasControls: React.FC<CanvasControlsProps> = ({ 
    onZoomIn, onZoomOut, onFit, orientation, onToggleOrientation 
}) => {
    return (
        <div className="absolute bottom-8 right-8 flex flex-col gap-2 bg-white border border-braun-200 shadow-xl p-2 rounded-sm z-50 animate-in slide-in-from-bottom-4 duration-500">
            <button onClick={onZoomIn} className="p-2 hover:bg-braun-50 text-braun-600 rounded-sm active:bg-braun-100 transition-colors" title="Zoom In">
                <Plus size={16} />
            </button>
            <button onClick={onZoomOut} className="p-2 hover:bg-braun-50 text-braun-600 rounded-sm active:bg-braun-100 transition-colors" title="Zoom Out">
                <Minus size={16} />
            </button>
            <div className="h-px bg-braun-100 my-1" />
            <button onClick={onFit} className="p-2 hover:bg-braun-50 text-braun-600 rounded-sm active:bg-braun-100 transition-colors" title="Fit to Screen">
                <Maximize size={16} />
            </button>
            <button onClick={onToggleOrientation} className="p-2 hover:bg-braun-50 text-braun-600 rounded-sm group relative active:bg-braun-100 transition-colors" title="Rotate Layout">
                <RotateCw size={16} className={`transition-transform duration-500 ease-out ${orientation === 'vertical' ? 'rotate-90' : 'rotate-0'}`} />
            </button>
        </div>
    );
}

// --- VARIANT STRIP ---
export const VariantStrip: React.FC<{ steps: { label: string; duration: string; status?: 'neutral' | 'deviated' }[] }> = ({ steps }) => {
  return (
    <div className="flex items-center w-full overflow-x-auto pb-4 scrollbar-thin">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center shrink-0">
            <div className="flex flex-col items-center gap-2 relative group">
                <div className={twMerge(
                    "w-3 h-3 rounded-full border-2 z-10 transition-colors duration-300",
                    step.status === 'deviated' ? 'border-amber-500 bg-amber-50' : 'border-braun-900 bg-white'
                )} />
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-braun-900 whitespace-nowrap">{step.label}</span>
                    <span className="text-[9px] font-mono text-braun-400">{step.duration}</span>
                </div>
            </div>
            {i < steps.length - 1 && (
                <div className="w-12 h-0.5 bg-braun-200 -mt-6 mx-2" />
            )}
        </div>
      ))}
    </div>
  );
};