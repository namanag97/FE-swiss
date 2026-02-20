
import React from 'react';
import { useStore } from '../services/store';
import { Breadcrumbs } from './Navigation';

export const Header: React.FC = () => {
  const { 
      currentView, 
      activeWorkspaceId, 
      activeExplorationId, 
      launchpadWorkspaceId, // Get launchpad state
      getWorkspace, 
      getExploration, 
      navigateTo,
      closeLaunchpad 
    } = useStore();

  const workspace = activeWorkspaceId ? getWorkspace(activeWorkspaceId) : (launchpadWorkspaceId ? getWorkspace(launchpadWorkspaceId) : null);
  const exploration = activeWorkspaceId && activeExplorationId ? getExploration(activeWorkspaceId, activeExplorationId) : null;

  // Transform state into Breadcrumb Items
  const getBreadcrumbItems = () => {
    const items: { label: string; onClick?: () => void }[] = [
        { label: 'INDEX', onClick: () => { closeLaunchpad(); navigateTo('HOME'); } }
    ];
    
    if (currentView === 'WORKSPACE_WIZARD') {
        items.push({ label: 'INITIALIZATION_SEQUENCE', onClick: undefined });
    } else if (currentView === 'DESIGN_SYSTEM') {
        items.push({ label: 'SYSTEM_DESIGN', onClick: undefined });
    } else if (currentView === 'LIBRARY') {
        items.push({ label: 'KNOWLEDGE_BASE', onClick: undefined });
    } else if (workspace) {
        // Workspace Level
        // If we are in Launchpad or Exploration, this is clickable to go "back" (which currently means closing/home)
        // In a real app, this might go to a dedicated Workspace Detail Page if one existed.
        // For now, let's treat it as a reset to Home context with that workspace expanded (handled by Dashboard state preservation usually, but here we just go Home)
        items.push({ 
            label: workspace.slug || workspace.name.toUpperCase(), 
            onClick: () => { closeLaunchpad(); navigateTo('HOME'); } 
        });

        // Launchpad State (Intermediary)
        if (launchpadWorkspaceId && !exploration) {
             items.push({
                 label: 'INITIALIZE_PROTOCOL',
                 onClick: undefined
             });
        }

        // Exploration Level (Deepest)
        if (exploration && currentView === 'EXPLORATION') {
            items.push({ 
                label: exploration.name.toUpperCase(), 
                onClick: undefined
            });
        }
    }
    return items;
  };

  return (
    <header className="h-16 flex items-center px-12 shrink-0 bg-transparent pointer-events-none">
      <div className="pointer-events-auto">
        <Breadcrumbs items={getBreadcrumbItems()} />
      </div>
    </header>
  );
};
