
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  Workspace, Dataset, ReferenceModel, Exploration, 
  ProcessGraph, Variant, CaseSummary, CaseEvent, AnalysisBlock 
} from '../types';

// --- MOCK DATA ---

const MOCK_EXPLORATION: Exploration = {
    id: 'exp-101',
    name: 'How long does your process take?',
    goal: 'bottleneck',
    status: 'completed',
    progress: 100,
    kpis: { 'Cycle Time': '4.2d', 'Automation': '32%' },
    insightCount: 5,
    lastModified: '2023-11-05',
    createdAt: '2023-11-01T14:30:00Z',
    layout: [
        { id: 'b1', type: 'PROCESS_MAP', title: 'Process Flow' },
        { id: 'b2', type: 'THROUGHPUT_ANALYSIS', title: 'Cycle Time Breakdown' }
    ]
};

const MOCK_WORKSPACES: Workspace[] = [
    {
        id: 'ws-101',
        name: 'Q3 Finance Audit',
        slug: 'WS_FINANCE_Q3_AUDIT',
        referenceModel: 'Procure-to-Pay',
        datasetId: 'ds-101',
        status: 'active',
        createdAt: '2023-11-01T10:00:00Z',
        description: 'Quarterly audit of P2P process flow for European region.',
        domain: 'FINANCE',
        explorations: [MOCK_EXPLORATION],
        dataset: {
            id: 'ds-101',
            name: 'SAP_P2P_Export_Nov.csv',
            fileName: 'SAP_P2P_Export_Nov.csv',
            status: 'ready',
            caseCount: 1247,
            eventCount: 15842,
            createdAt: '2023-11-01',
            stats: {
                totalRows: 15842,
                uniqueCases: 1247,
                uniqueActivities: 14,
                startDate: '2023-09-01',
                endDate: '2023-11-30'
            },
            mapping: {
                caseId: 'PURCHASE_ORDER_ID',
                activity: 'ACTIVITY_NAME',
                timestamp: 'EVENT_TIMESTAMP',
                attributes: ['VENDOR_ID', 'AMOUNT_EUR']
            }
        }
    }
];

// --- STORE TYPE ---

interface StoreState {
  currentView: 'HOME' | 'WORKSPACE_WIZARD' | 'UPLOAD_WIZARD' | 'EXPLORATION' | 'DATA_INTEGRATION' | 'CASE_EXPLORER' | 'STUDIO' | 'LIBRARY' | 'DESIGN_SYSTEM';
  activeWorkspaceId: string | null;
  activeExplorationId: string | null;
  launchpadWorkspaceId: string | null;
  lastCreatedWorkspaceName: string | null; // For success modal
  pendingWorkspaceData: Partial<Workspace> | null; // For workspace wizard flow
  workspaces: Workspace[];
  
  // Navigation
  navigateTo: (view: StoreState['currentView'], params?: { wsId?: string, expId?: string }) => void;
  openLaunchpad: (workspaceId: string) => void;
  closeLaunchpad: () => void;
  
  // Workspace Actions
  addWorkspace: (workspaceData: Partial<Workspace>) => void;
  renameWorkspace: (workspaceId: string, newName: string) => void;
  deleteWorkspace: (workspaceId: string) => void;
  clearLastCreated: () => void;
  setPendingWorkspaceData: (data: Partial<Workspace> | null) => void;

  // Exploration Actions
  addExploration: (workspaceId: string, goal: string, text: string) => void;
  renameExploration: (workspaceId: string, explorationId: string, newName: string) => void;
  deleteExploration: (workspaceId: string, explorationId: string) => void;
  
  // Dashboard Actions (New)
  addDashboardBlock: (wsId: string, expId: string, block: AnalysisBlock) => void;
  removeDashboardBlock: (wsId: string, expId: string, blockId: string) => void;
  
  // Getters
  getWorkspace: (id: string) => Workspace | undefined;
  getExploration: (wsId: string, expId: string) => Exploration | undefined;
}

// --- STORE IMPLEMENTATION ---

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      currentView: 'HOME',
      activeWorkspaceId: null,
      activeExplorationId: null,
      launchpadWorkspaceId: null,
      lastCreatedWorkspaceName: null,
      pendingWorkspaceData: null,
      workspaces: MOCK_WORKSPACES,

      navigateTo: (view, params) => {
        set({ 
            currentView: view,
            activeWorkspaceId: params?.wsId || (view === 'HOME' ? null : get().activeWorkspaceId),
            activeExplorationId: params?.expId || null,
            launchpadWorkspaceId: null 
        });
      },

      openLaunchpad: (workspaceId) => {
          set({ launchpadWorkspaceId: workspaceId, currentView: 'HOME' });
      },

      closeLaunchpad: () => {
          set({ launchpadWorkspaceId: null });
      },

      clearLastCreated: () => {
          set({ lastCreatedWorkspaceName: null });
      },

      setPendingWorkspaceData: (data) => {
          set({ pendingWorkspaceData: data });
      },

      deleteWorkspace: (workspaceId) => {
          set(state => ({
              workspaces: state.workspaces.filter(w => w.id !== workspaceId),
              activeWorkspaceId: state.activeWorkspaceId === workspaceId ? null : state.activeWorkspaceId,
              launchpadWorkspaceId: state.launchpadWorkspaceId === workspaceId ? null : state.launchpadWorkspaceId
          }));
      },

      renameWorkspace: (workspaceId, newName) => {
          set(state => ({
              workspaces: state.workspaces.map(w => 
                  w.id === workspaceId 
                  ? { ...w, name: newName, slug: newName.toUpperCase().replace(/[^A-Z0-9]+/g, '_') }
                  : w
              )
          }));
      },

      addWorkspace: (data) => {
        const newWorkspace: Workspace = {
            id: data.id || `ws-${Date.now()}`,
            name: data.name || 'Untitled Workspace',
            slug: data.slug || `WS_${Date.now()}`,
            description: data.description,
            domain: data.domain,
            referenceModel: data.referenceModel || 'Universal',
            status: 'active',
            dataset: data.dataset,
            explorations: [],
            createdAt: new Date().toISOString()
        };
        set(state => ({
            workspaces: [newWorkspace, ...state.workspaces],
            currentView: 'HOME',
            lastCreatedWorkspaceName: newWorkspace.name,
            pendingWorkspaceData: null // Clear pending data after workspace is created
        }));
      },

      addExploration: (wsId, goalId, text) => {
        const initialBlocks: AnalysisBlock[] = [{ id: 'b1', type: 'PROCESS_MAP', title: 'Process Flow' }];
        
        // Pre-populate blocks based on goal
        if (goalId === 'bottleneck') initialBlocks.push({ id: 'b2', type: 'THROUGHPUT_ANALYSIS', title: 'Throughput Analysis' });
        if (goalId === 'deadline') initialBlocks.push({ id: 'b2', type: 'DEADLINE_ANALYSIS', title: 'SLA Compliance' });

        const newExploration: Exploration = {
            id: `exp-${Date.now()}`,
            name: text || `${goalId} Analysis`,
            goal: goalId,
            status: 'completed',
            progress: 100,
            kpis: {},
            insightCount: 0,
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString(),
            layout: initialBlocks
        };
        
        set(state => ({
            workspaces: state.workspaces.map(ws => 
                ws.id === wsId 
                ? { ...ws, explorations: [newExploration, ...ws.explorations] }
                : ws
            )
        }));
        
        get().navigateTo('EXPLORATION', { wsId, expId: newExploration.id });
      },

      renameExploration: (wsId, expId, newName) => {
        set(state => ({
            workspaces: state.workspaces.map(ws => 
                ws.id === wsId 
                ? { 
                    ...ws, 
                    explorations: ws.explorations.map(e => 
                        e.id === expId ? { ...e, name: newName } : e
                    ) 
                  }
                : ws
            )
        }));
      },

      deleteExploration: (wsId, expId) => {
        set(state => ({
            workspaces: state.workspaces.map(ws => 
                ws.id === wsId 
                ? { ...ws, explorations: ws.explorations.filter(e => e.id !== expId) }
                : ws
            ),
            currentView: state.activeExplorationId === expId ? 'HOME' : state.currentView,
            activeExplorationId: state.activeExplorationId === expId ? null : state.activeExplorationId
        }));
      },

      addDashboardBlock: (wsId, expId, block) => {
          set(state => ({
              workspaces: state.workspaces.map(ws => 
                  ws.id === wsId ? {
                      ...ws,
                      explorations: ws.explorations.map(e => 
                          e.id === expId ? {
                              ...e,
                              layout: [...(e.layout || []), block]
                          } : e
                      )
                  } : ws
              )
          }));
      },

      removeDashboardBlock: (wsId, expId, blockId) => {
          set(state => ({
              workspaces: state.workspaces.map(ws => 
                  ws.id === wsId ? {
                      ...ws,
                      explorations: ws.explorations.map(e => 
                          e.id === expId ? {
                              ...e,
                              layout: (e.layout || []).filter(b => b.id !== blockId)
                          } : e
                      )
                  } : ws
              )
          }));
      },

      getWorkspace: (id) => get().workspaces.find(w => w.id === id),
      
      getExploration: (wsId, expId) => {
          const ws = get().workspaces.find(w => w.id === wsId);
          return ws?.explorations.find(e => e.id === expId);
      }
    }),
    {
      name: 'kinematics-store-v2', // Versioned name - changing this clears old data
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        // Only persist essential data, not navigation state
        workspaces: state.workspaces,
        pendingWorkspaceData: state.pendingWorkspaceData,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.warn('Failed to rehydrate store, clearing storage:', error);
          sessionStorage.removeItem('kinematics-store-v2');
        }
      },
    }
  )
);

// --- HELPER FUNCTIONS FOR MOCK DATA ---
export const getGraphData = (explorationId: string): ProcessGraph => {
    return {
        nodes: [
            { id: 'start', type: 'startEvent', label: 'Start', metrics: { frequency: 1247 }, x: 100, y: 250 },
            { id: 'n1', type: 'task', label: 'Create Purchase Order', metrics: { frequency: 1247, avgDurationMs: 120000, deviationRate: 0.0 }, x: 250, y: 250 },
            { id: 'n2', type: 'gateway', label: 'Approval Check', metrics: { frequency: 1247 }, x: 450, y: 250 },
            { id: 'n3', type: 'task', label: 'Approve PO', metrics: { frequency: 1100, avgDurationMs: 300000 }, x: 600, y: 250 },
            { id: 'n4', type: 'task', label: 'Reject PO', metrics: { frequency: 147, avgDurationMs: 60000 }, x: 600, y: 400 },
            { id: 'n5', type: 'task', label: 'Receive Goods', metrics: { frequency: 1050, avgDurationMs: 86400000 }, x: 800, y: 250 },
            { id: 'n6', type: 'task', label: 'Scan Invoice', metrics: { frequency: 1050, avgDurationMs: 60000 }, x: 950, y: 250 },
            { id: 'n7', type: 'task', label: 'Match Invoice', metrics: { frequency: 1000, avgDurationMs: 5000 }, x: 1100, y: 250 },
            { id: 'n8', type: 'task', label: 'Manual Reconciliation', metrics: { frequency: 50, avgDurationMs: 1800000, deviationRate: 1.0 }, x: 1100, y: 400 },
            { id: 'n9', type: 'task', label: 'Pay Vendor', metrics: { frequency: 1050, avgDurationMs: 172800000 }, x: 1250, y: 250 },
            { id: 'end', type: 'endEvent', label: 'End', metrics: { frequency: 1247 }, x: 1400, y: 250 },
        ],
        edges: [
            { id: 'e1', source: 'start', target: 'n1', metrics: { frequency: 1247, dependency: 1.0 } },
            { id: 'e2', source: 'n1', target: 'n2', metrics: { frequency: 1247, dependency: 1.0 } },
            { id: 'e3', source: 'n2', target: 'n3', metrics: { frequency: 1100, dependency: 0.88 } },
            { id: 'e4', source: 'n2', target: 'n4', metrics: { frequency: 147, dependency: 0.12 } },
            { id: 'e5', source: 'n3', target: 'n5', metrics: { frequency: 1100, dependency: 1.0 } },
            { id: 'e6', source: 'n4', target: 'end', metrics: { frequency: 147, dependency: 1.0 } },
            { id: 'e7', source: 'n5', target: 'n6', metrics: { frequency: 1050, dependency: 0.95 } },
            { id: 'e8', source: 'n6', target: 'n7', metrics: { frequency: 1050, dependency: 1.0 } },
            { id: 'e9', source: 'n7', target: 'n9', metrics: { frequency: 1000, dependency: 0.95 } },
            { id: 'e10', source: 'n7', target: 'n8', metrics: { frequency: 50, dependency: 0.05 } },
            { id: 'e11', source: 'n8', target: 'n9', metrics: { frequency: 50, dependency: 1.0 } },
            { id: 'e12', source: 'n9', target: 'end', metrics: { frequency: 1050, dependency: 1.0 } },
        ]
    };
};

export const getVariants = (): Variant[] => [
    { id: 'v1', rank: 1, trace: ['Create', 'Approve', 'Receive', 'Invoice', 'Match', 'Pay'], caseCount: 850, percentage: 68, avgDurationMs: 432000000 },
    { id: 'v2', rank: 2, trace: ['Create', 'Reject'], caseCount: 147, percentage: 12, avgDurationMs: 200000 },
    { id: 'v3', rank: 3, trace: ['Create', 'Approve', 'Receive', 'Invoice', 'Match', 'Reconcile', 'Pay'], caseCount: 50, percentage: 4, avgDurationMs: 600000000 },
];

export const getCases = (): CaseSummary[] => [
    { id: 'c1', caseId: 'PO-2023-9001', variantId: '1', eventCount: 6, durationMs: 340000000, status: 'conforming', startTime: '2023-11-01T08:00:00Z' },
    { id: 'c2', caseId: 'PO-2023-9002', variantId: '1', eventCount: 6, durationMs: 350000000, status: 'conforming', startTime: '2023-11-01T09:15:00Z' },
    { id: 'c3', caseId: 'PO-2023-9003', variantId: '2', eventCount: 2, durationMs: 180000, status: 'conforming', startTime: '2023-11-01T10:30:00Z' },
    { id: 'c4', caseId: 'PO-2023-9004', variantId: '3', eventCount: 7, durationMs: 500000000, status: 'deviated', startTime: '2023-11-02T11:00:00Z' },
    { id: 'c5', caseId: 'PO-2023-9005', variantId: '1', eventCount: 6, durationMs: 345000000, status: 'conforming', startTime: '2023-11-02T13:45:00Z' },
];
