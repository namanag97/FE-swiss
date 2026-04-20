export interface PlatformFeature {
  eyebrow: string;
  title: string;
  titleEm: string;
  tagline: string;
  description: string;
  items: string[];
  reverse?: boolean;
}

export const platformFeatures: PlatformFeature[] = [
  {
    eyebrow: "01 Discover",
    title: "Process",
    titleEm: "Discovery",
    tagline: "See the process your systems are actually running.",
    description: "Reconstruct the real path from event data across ERP, CRM, ITSM, and warehouse systems. No workshops, no whiteboard archaeology, no consultant theater.",
    items: ["Alpha & Heuristic miners", "Multi-source log correlation", "Variant detection & clustering", "Interactive process maps"],
  },
  {
    eyebrow: "02 Diagnose",
    title: "Conformance",
    titleEm: "Checking",
    tagline: "See where execution drifts and what that drift costs.",
    description: "Compare your intended process against actual execution, isolate the costly variants, and trace where policy, throughput, or SLA performance starts to break.",
    items: ["Token-based replay analysis", "Deviation classification", "Cost-per-deviation metrics", "Root cause drill-down"],
    reverse: true,
  },
  {
    eyebrow: "03 Analyze",
    title: "Visual",
    titleEm: "Analytics",
    tagline: "Click the KPI. Land on the exact path that caused it.",
    description: "Dashboards tied directly to process variants, queue states, and case histories. Not just charts on top of metrics. Operational context underneath every spike.",
    items: ["Process-aware KPI dashboards", "Variant frequency distribution", "SLA monitoring & alerting", "Throughput time analysis"],
  },
  {
    eyebrow: "04 Transform",
    title: "AI-Powered",
    titleEm: "Insights",
    tagline: "Turn insight into action before the queue grows teeth.",
    description: "Surface likely breaches, detect anomalies, and recommend actions in plain language so operators can intervene before the process compounds into missed revenue or missed SLAs.",
    items: ["Predictive SLA monitoring", "Anomaly detection", "Root cause analysis", "Automated recommendations"],
    reverse: true,
  },
];
