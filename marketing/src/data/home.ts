export interface ComparisonCard {
  title: string;
  desc: string;
  tone: "faint" | "muted" | "emerald";
}

export interface SpeedPhase {
  phase: string;
  title: string;
  desc: string;
}

export interface UseCaseCard {
  title: string;
  desc: string;
  anchor: string;
}

export const comparisonCards: ComparisonCard[] = [
  { title: "Dashboards", desc: "\"Revenue slipped. SLA missed. Nobody knows which path caused it.\"", tone: "faint" },
  { title: "Static process maps", desc: "\"Looks tidy on paper. Breaks immediately in the real workflow.\"", tone: "muted" },
  { title: "Sancalana", desc: "\"Here is the exact variant, the deviation cost, and the next action.\"", tone: "emerald" },
];

export const connectors: string[] = ["SAP", "Oracle", "ServiceNow", "Salesforce", "Jira", "Postgres", "Snowflake", "BigQuery"];

export const speedPhases: SpeedPhase[] = [
  { phase: "Week 1", title: "Connect and normalize", desc: "Bring in event data from the systems already running your business. No workshops to reconstruct a process everyone forgot six months ago." },
  { phase: "Week 2", title: "See the real process", desc: "Map actual variants, handoff loops, rework, and policy breaks. Get from KPI miss to exact root cause path fast." },
  { phase: "Week 4", title: "Operationalize action", desc: "Turn deviation signals into reviews, escalations, and operating rituals your ops team can actually run." },
];

export const useCaseCards: UseCaseCard[] = [
  { title: "Order-to-Cash", desc: "Find the approval loops, credit holds, and re-invoice paths stretching cash conversion.", anchor: "#o2c" },
  { title: "Procure-to-Pay", desc: "See where spend bypasses policy, 3-way match breaks, and approvals get stuck.", anchor: "#p2p" },
  { title: "IT Service Management", desc: "Map escalations, bounce loops, and SLA risk across ServiceNow and support workflows.", anchor: "#itsm" },
];
