
import React from 'react';
import { LayoutGrid, Library, Settings, Palette, Terminal, User, Database, Search, Zap } from 'lucide-react';
import { useStore } from '../services/store';
import { twMerge } from 'tailwind-merge';
import { Avatar } from './DataDisplay';

export const Sidebar: React.FC = () => {
  const { currentView, navigateTo } = useStore();

  return (
    <div className="w-20 h-full fixed left-0 top-0 z-50 border-r border-braun-200 bg-white flex flex-col items-center py-6 select-none">
      {/* Brand Identity - Stark, Industrial */}
      <button 
        className="mb-12 w-10 h-10 bg-braun-900 text-white flex items-center justify-center font-mono font-bold text-lg hover:bg-braun-orange transition-colors duration-300 rounded-sm"
        onClick={() => navigateTo('HOME')}
        title="Kinematics Platform"
      >
        K
      </button>

      {/* Primary Navigation */}
      <nav className="flex-1 flex flex-col gap-4 w-full px-3">
        <NavIconButton 
          icon={LayoutGrid} 
          label="Dashboard" 
          active={currentView === 'HOME' || currentView === 'WORKSPACE_WIZARD'}
          onClick={() => navigateTo('HOME')}
        />
        
        {/* Contextual Views */}
        <NavIconButton 
          icon={Database} 
          label="Data Integration" 
          active={currentView === 'DATA_INTEGRATION'}
          onClick={() => navigateTo('DATA_INTEGRATION', { wsId: 'ws-101' })} 
        />
        <NavIconButton 
          icon={Search} 
          label="Case Explorer" 
          active={currentView === 'CASE_EXPLORER'}
          onClick={() => navigateTo('CASE_EXPLORER', { wsId: 'ws-101' })} 
        />
        <NavIconButton 
          icon={Zap} 
          label="Automation Studio" 
          active={currentView === 'STUDIO'}
          onClick={() => navigateTo('STUDIO', { wsId: 'ws-101' })} 
        />

        <NavIconButton 
          icon={Terminal} 
          label="Active Unit" 
          active={currentView === 'EXPLORATION'}
          onClick={() => {}} 
          disabled={currentView !== 'EXPLORATION'}
        />
        
        <div className="my-2 border-b border-braun-100 w-1/2 mx-auto" />

        <NavIconButton 
          icon={Library} 
          label="Library" 
          active={currentView === 'LIBRARY'}
          onClick={() => navigateTo('LIBRARY')}
        />
        <NavIconButton 
          icon={Palette} 
          label="System" 
          active={currentView === 'DESIGN_SYSTEM'}
          onClick={() => navigateTo('DESIGN_SYSTEM')}
        />
      </nav>

      {/* Utility / Footer */}
      <div className="mt-auto mb-4 px-3 flex flex-col gap-4 items-center">
        <NavIconButton icon={Settings} label="Config" onClick={() => {}} />
        
        <div className="w-full h-px bg-braun-100" />
        
        {/* Minimal User Profile Trigger */}
        <button className="group relative outline-none">
            <Avatar initials="AU" size="sm" className="bg-braun-100 text-braun-900 border-transparent group-hover:bg-braun-900 group-hover:text-white transition-colors" />
            <div className="absolute left-full ml-4 px-3 py-2 bg-braun-900 text-white text-[9px] font-mono opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 rounded-sm -bottom-2">
                <div className="font-bold uppercase tracking-widest">Admin User</div>
                <div className="opacity-70">ORG_001</div>
                {/* Arrow */}
                <div className="absolute bottom-3 -left-1 border-4 border-transparent border-r-braun-900" />
            </div>
        </button>
      </div>
    </div>
  );
};

// Specialized Atom for Sidebar Navigation
const NavIconButton: React.FC<{ 
    icon: React.ElementType; 
    label: string; 
    active?: boolean; 
    disabled?: boolean;
    onClick?: () => void 
}> = ({ icon: Icon, label, active, disabled, onClick }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={twMerge(
      "w-full aspect-square flex items-center justify-center rounded-sm transition-all duration-200 group relative outline-none",
      active ? "bg-braun-50 text-braun-900 ring-1 ring-braun-900/10" : "text-braun-400 hover:text-braun-900 hover:bg-braun-50",
      disabled && "opacity-20 cursor-not-allowed hover:bg-transparent hover:text-braun-400"
    )}
  >
    <Icon size={20} strokeWidth={1.5} />
    
    {/* Popover Label - Industrial Style */}
    <div className="absolute left-full ml-4 px-2 py-1 bg-braun-900 text-white text-[9px] font-mono font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 rounded-sm shadow-sm">
      {label}
      <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-4 border-transparent border-r-braun-900" />
    </div>
  </button>
);
