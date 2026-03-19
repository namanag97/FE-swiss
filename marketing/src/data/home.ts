export interface ComparisonCard {
  title: string;
  desc: string;
  tone: string;
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
  { title: "SQL + dashboards", desc: "\"Something is slow. Somewhere. Good luck.\"", tone: "var(--ink-faint)" },
  { title: "Process mining", desc: "\"Here are 14 paths. Now hire someone to figure out which one matters.\"", tone: "var(--ink-muted)" },
  { title: "Sancalana", desc: "\"Path 7 has a rework loop costing you 11 days. Here\u2019s the fix.\"", tone: "var(--emerald)" },
];

export const connectors: string[] = ["SAP", "Oracle", "ServiceNow", "Salesforce", "Jira", "Postgres", "Snowflake", "BigQuery"];

export const speedPhases: SpeedPhase[] = [
  { phase: "Day 1", title: "Your first process map", desc: "Not a POC. Not a workshop. The real thing, from your real data. See the rework loops, the bottlenecks, the workarounds nobody talks about." },
  { phase: "Week 1", title: "Every ops lead has a dashboard", desc: "No more waiting on analysts. No more stale PowerPoints passed around in email. Live data, always current." },
  { phase: "Month 1", title: "Processes that improve themselves", desc: "Conformance monitoring catches drift. Predictions flag SLA breaches before they happen. Alerts trigger action automatically." },
];

export const useCaseCards: UseCaseCard[] = [
  { title: "Order-to-Cash", desc: "Your invoices take 47 days. The process says 5. Find the 12 rework loops hiding in between.", anchor: "#o2c" },
  { title: "Procure-to-Pay", desc: "3 in 10 POs bypass approval. See exactly where procurement goes off-policy \u2014 and why.", anchor: "#p2p" },
  { title: "IT Service Management", desc: "Tickets bounce between 4 teams before resolution. Map the real escalation path. Cut the noise.", anchor: "#itsm" },
  { title: "Patient Journey", desc: "Average wait time says 20 minutes. Actual patient flow tells a different story. See it.", anchor: "#healthcare" },
];
