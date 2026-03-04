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
    tagline: "You've never actually seen your own process. Now you will.",
    description: "Automatically reconstruct process models from event log data. No interviews, no workshops, no Post-it walls \u2014 just what actually happens in your systems.",
    items: ["Alpha & Heuristic miners", "Multi-source log correlation", "Variant detection & clustering", "Interactive process maps"],
  },
  {
    eyebrow: "02 Diagnose",
    title: "Conformance",
    titleEm: "Checking",
    tagline: "Here's what should happen. Here's what actually happens. Here's what it costs you.",
    description: "Overlay your ideal process against reality. Instantly see where execution deviates from design \u2014 and measure the cost of each deviation.",
    items: ["Token-based replay analysis", "Deviation classification", "Cost-per-deviation metrics", "Root cause drill-down"],
    reverse: true,
  },
  {
    eyebrow: "03 Analyze",
    title: "Visual",
    titleEm: "Analytics",
    tagline: "Click a spike. Land on the exact variant that caused it.",
    description: "Dashboards built for process data. KPI tracking, variant distribution, SLA monitoring \u2014 all connected to the process layer beneath. Not just charts. Charts that know what happened underneath.",
    items: ["Process-aware KPI dashboards", "Variant frequency distribution", "SLA monitoring & alerting", "Throughput time analysis"],
  },
  {
    eyebrow: "04 Transform",
    title: "AI-Powered",
    titleEm: "Insights",
    tagline: "It doesn't just find the problem. It tells you what to do about it.",
    description: "LLMs that understand process patterns. Predict bottlenecks before they happen, detect anomalies, and recommend actions \u2014 in plain language, not query syntax.",
    items: ["Predictive SLA monitoring", "Anomaly detection", "Root cause analysis", "Automated recommendations"],
    reverse: true,
  },
];
