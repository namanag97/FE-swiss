'use client';
import React, { useState } from 'react';
import {
  Hash, Type, Palette, Box, TextCursor, GitMerge,
  LayoutTemplate, List, AlertCircle, Layers, MoreHorizontal,
  GitCommit, BarChart2, Zap, Activity, TrendingUp, LayoutDashboard,
} from 'lucide-react';

// Section modules
import { OverviewSection }                                       from './design/sections/Overview';
import { ManifestoSection, TypographySection, ColorSection }    from './design/sections/Foundation';
import { LayoutSection, NavigationSection }                      from './design/sections/Structure';
import { ButtonsSection, InputsSection }                         from './design/sections/Interaction';
import { DataDisplaySection }                                    from './design/sections/Content';
import { FeedbackSection, OverlaysSection }                      from './design/sections/Feedback';
import { FlowSection }                                           from './design/sections/Patterns';
import { ProcessMiningSection }                                  from './design/sections/ProcessMining';
import { AnalyticsSection }                                      from './design/sections/Analytics';
import { ChartsSection }                                         from './design/sections/Charts';
import { AutomationSection }                                     from './design/sections/Automation';

// ─── Section registry ─────────────────────────────────────────────────────────

interface Section {
  id:        string;
  title:     string;
  icon:      React.ReactNode;
  component: React.ReactNode;
  group:     string;
  isNew?:    boolean;
}

const SECTIONS: Section[] = [
  // Foundation
  { id: '00', title: 'Manifesto',      icon: <Hash          size={12}/>, component: <ManifestoSection  />, group: 'Foundation'  },
  { id: '01', title: 'Typography',     icon: <Type          size={12}/>, component: <TypographySection />, group: 'Foundation'  },
  { id: '02', title: 'Chromatic',      icon: <Palette       size={12}/>, component: <ColorSection      />, group: 'Foundation'  },
  // Structure
  { id: '03', title: 'Layout',         icon: <LayoutTemplate size={12}/>, component: <LayoutSection     />, group: 'Structure'   },
  { id: '04', title: 'Navigation',     icon: <GitMerge      size={12}/>, component: <NavigationSection />, group: 'Structure'   },
  // Interaction
  { id: '05', title: 'Interaction',    icon: <Box           size={12}/>, component: <ButtonsSection    />, group: 'Interaction' },
  { id: '06', title: 'Inputs',         icon: <TextCursor    size={12}/>, component: <InputsSection     />, group: 'Interaction' },
  // Content
  { id: '07', title: 'Data Display',   icon: <List          size={12}/>, component: <DataDisplaySection/>, group: 'Content'     },
  { id: '08', title: 'Feedback',       icon: <AlertCircle   size={12}/>, component: <FeedbackSection   />, group: 'Content'     },
  { id: '09', title: 'Overlays',       icon: <Layers        size={12}/>, component: <OverlaysSection   />, group: 'Content'     },
  { id: '10', title: 'Flows',          icon: <MoreHorizontal size={12}/>, component: <FlowSection       />, group: 'Content'     },
  // Analytics
  { id: '11', title: 'Process Mining', icon: <GitCommit     size={12}/>, component: <ProcessMiningSection/>, group: 'Analytics'  },
  { id: '12', title: 'Analytics',      icon: <TrendingUp    size={12}/>, component: <AnalyticsSection   />, group: 'Analytics'  },
  { id: '13', title: 'Charts',         icon: <BarChart2     size={12}/>, component: <ChartsSection      />, group: 'Analytics', isNew: true },
  { id: '14', title: 'Automation',     icon: <Zap           size={12}/>, component: <AutomationSection  />, group: 'Analytics'  },
];

const GROUPS = ['Foundation', 'Structure', 'Interaction', 'Content', 'Analytics'] as const;

// ─── Group accent colours ─────────────────────────────────────────────────────

const GROUP_DOT: Record<string, string> = {
  Foundation:  'bg-braun-400',
  Structure:   'bg-braun-600',
  Interaction: 'bg-braun-800',
  Content:     'bg-braun-900',
  Analytics:   'bg-braun-orange',
};

// ─── Controller ───────────────────────────────────────────────────────────────

export const DesignSystem: React.FC = () => {
  const [activeId, setActiveId] = useState('00');
  const activeSection = SECTIONS.find(s => s.id === activeId) ?? SECTIONS[0];

  return (
    <div className="flex h-full bg-substrate animate-in fade-in">

      {/* ── Left sidebar ─────────────────────────────────────────────────── */}
      <aside className="w-56 border-r border-braun-200 bg-braun-50 flex flex-col h-screen sticky top-0 flex-shrink-0">

        {/* Header */}
        <div className="px-5 py-5 border-b border-braun-200 bg-white">
          <div className="text-base font-light text-braun-900 tracking-tight leading-none">Design System</div>
          <div className="text-[9px] font-mono text-braun-400 mt-1.5 uppercase tracking-widest">
            v3.2 // {SECTIONS.length} sections
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3">
          {GROUPS.map(group => {
            const groupSections = SECTIONS.filter(s => s.group === group);
            const groupActive   = groupSections.some(s => s.id === activeId);
            return (
              <div key={group} className="mb-1">
                {/* Group label */}
                <div className="flex items-center gap-2 px-5 py-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${GROUP_DOT[group]}`} />
                  <span className={`text-[9px] font-mono uppercase tracking-widest ${groupActive ? 'text-braun-900 font-bold' : 'text-braun-400'}`}>
                    {group}
                  </span>
                </div>

                {/* Section items */}
                {groupSections.map(s => {
                  const isActive = s.id === activeId;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveId(s.id)}
                      className={`w-full text-left flex items-center gap-2.5 px-5 py-2 transition-all relative
                        ${isActive
                          ? 'bg-white text-braun-900 border-l-2 border-braun-900'
                          : 'text-braun-500 border-l-2 border-transparent hover:bg-white/60 hover:text-braun-900'}`}
                    >
                      {/* Section number */}
                      <span className={`text-[9px] font-mono tabular-nums flex-shrink-0 w-5 ${isActive ? 'text-braun-orange' : 'text-braun-300'}`}>
                        {s.id}
                      </span>
                      {/* Icon */}
                      <span className={`flex-shrink-0 ${isActive ? 'text-braun-900' : 'text-braun-400'}`}>
                        {s.icon}
                      </span>
                      {/* Title */}
                      <span className="text-[11px] font-mono uppercase tracking-wider truncate flex-1">
                        {s.title}
                      </span>
                      {/* New badge */}
                      {s.isNew && (
                        <span className="text-[8px] font-mono uppercase tracking-widest text-braun-orange bg-orange-50 border border-orange-200 px-1 py-px leading-none flex-shrink-0">
                          new
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-braun-200 bg-white">
          <div className="space-y-1">
            {['CLARITY', 'PURITY', 'HONESTY'].map(p => (
              <div key={p} className="text-[9px] font-mono text-braun-300 uppercase tracking-widest">
                — {p}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Content area ─────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto bg-white min-w-0">
        <div className="max-w-5xl mx-auto px-10 py-14">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-braun-400 uppercase tracking-widest mb-10">
            <span>{activeSection.group}</span>
            <span className="text-braun-200">/</span>
            <span className="text-braun-600">{activeSection.title}</span>
            <span className="ml-1 opacity-60">{activeSection.icon}</span>
          </div>

          {/* Section content */}
          <div key={activeSection.id}>
            {activeSection.component}
          </div>

          {/* Footer */}
          <div className="mt-24 pt-10 border-t border-braun-200 flex justify-between items-center text-[9px] font-mono text-braun-400 uppercase tracking-widest">
            <span>Meridian DS // v3.2</span>
            <div className="flex items-center gap-4">
              {activeId !== '00' && (
                <button
                  onClick={() => {
                    const idx = SECTIONS.findIndex(s => s.id === activeId);
                    if (idx > 0) setActiveId(SECTIONS[idx - 1].id);
                  }}
                  className="hover:text-braun-900 transition-colors"
                >
                  ← Prev
                </button>
              )}
              <span>Section {activeSection.id} / {String(SECTIONS.length - 1).padStart(2, '0')}</span>
              {activeId !== SECTIONS[SECTIONS.length - 1].id && (
                <button
                  onClick={() => {
                    const idx = SECTIONS.findIndex(s => s.id === activeId);
                    if (idx < SECTIONS.length - 1) setActiveId(SECTIONS[idx + 1].id);
                  }}
                  className="hover:text-braun-900 transition-colors"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
