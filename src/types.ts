
export type GoalType = 'bottleneck' | 'conformance' | 'variants' | 'rework';
export type ExplorationGoal = 'RISK_ASSESSMENT' | 'EXECUTIVE_BRIEF' | 'TECHNICAL_DEEP_DIVE' | 'SENTIMENT_ANALYSIS' | 'DISCOVERY' | 'BOTTLENECK' | 'COMPLIANCE' | 'AUTOMATION';
export type EntityStatus = 'active' | 'archived' | 'error';
export type DatasetStatus = 'uploading' | 'profiling' | 'ready' | 'error';
export type ExplorationStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface IntelligenceData {
  summary: string;
  sentimentScore: number;
  keywords: string[];
  actionItems: string[];
  complexity: number;
  category: string;
  entities: {
      name: string;
      type: 'PERSON' | 'ORG' | 'LOC' | 'CONCEPT' | 'EVENT';
      relevance: number;
      context: string;
  }[];
}

export interface ReferenceModel {
  id: string;
  name: string;
  goals: GoalType[];
  kpis: string[];
}

export interface Dataset {
  id: string;
  name: string;
  fileName: string;
  status: DatasetStatus;
  caseCount: number;
  eventCount: number;
  createdAt: string;
  // Enhanced Fields
  stats: {
    totalRows: number;
    uniqueCases: number;
    uniqueActivities: number;
    startDate: string;
    endDate: string;
  };
  mapping?: {
    caseId: string;
    activity: string;
    timestamp: string;
    attributes: string[];
  };
}

export type BlockType = 'PROCESS_MAP' | 'KPI_GRID' | 'THROUGHPUT_ANALYSIS' | 'DEADLINE_ANALYSIS' | 'VARIANT_EXPLORER' | 'CASE_EXPLORER';

export interface AnalysisBlock {
    id: string;
    type: BlockType;
    title: string;
    config?: any;
    isExpanded?: boolean;
}

export interface Exploration {
  id: string;
  name: string;
  goal: string; 
  status: ExplorationStatus;
  progress: number;
  kpis: Record<string, number | string>;
  insightCount?: number;
  lastModified?: string;
  createdAt: string;
  layout?: AnalysisBlock[]; 
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description?: string;
  domain?: string;
  referenceModel: string; 
  datasetId?: string;
  dataset?: Dataset; 
  status: EntityStatus;
  explorations: Exploration[];
  createdAt: string;
}

// Graph Types
export interface GraphNode {
  id: string;
  type: 'startEvent' | 'endEvent' | 'task' | 'gateway';
  label: string;
  metrics: {
    frequency: number;
    avgDurationMs?: number;
    deviationRate?: number;
  };
  x?: number;
  y?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  metrics: {
    frequency: number;
    dependency: number;
  };
}

export interface ProcessGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

// Variant Types
export interface Variant {
  id: string;
  rank: number;
  trace: string[];
  caseCount: number;
  percentage: number;
  avgDurationMs: number;
}

export interface CaseEvent {
    act: string;
    res: string;
    time: string;
    dur: string;
    bottleneck?: boolean;
}

export interface CaseSummary {
    id: string;
    caseId: string;
    variantId: string;
    eventCount: number;
    durationMs: number;
    status: 'conforming' | 'deviated';
    startTime: string;
}

// --- DATA INTEGRATION TYPES ---
export interface DataModel {
    id: string;
    name: string;
    status: 'active' | 'building' | 'error';
    lastLoad: string;
    rowCount: number;
    tables: number;
}

export interface DataJob {
    id: string;
    name: string;
    status: 'success' | 'failed' | 'running' | 'idle';
    lastRun: string;
    schedule: string;
}

// --- STUDIO / AUTOMATION TYPES ---
export type FlowNodeType = 'TRIGGER' | 'ACTION' | 'LOGIC' | 'INTEGRATION';

export interface FlowNode {
    id: string;
    type: FlowNodeType;
    subType: string; // e.g., 'webhook', 'email', 'filter', 'celonis_pql'
    label: string;
    description?: string;
    icon: string; // Icon name as string
    config: Record<string, any>;
    status?: 'idle' | 'running' | 'success' | 'error';
    position: { x: number; y: number };
}

export interface FlowEdge {
    id: string;
    source: string;
    target: string;
    animated?: boolean;
    label?: string;
}

export interface AutomationPackage {
    id: string;
    name: string;
    description: string;
    version: string;
    status: 'active' | 'draft' | 'archived';
    lastModified: string;
    runHistory: { id: string; status: 'success'|'failed'; time: string; duration: string }[];
    nodes: FlowNode[];
    edges: FlowEdge[];
}
