export interface Belief {
  title: string;
  desc: string;
}

export interface TimelineEntry {
  year: string;
  event: string;
}

export const beliefs: Belief[] = [
  { title: "Show reality, not comfort", desc: "We show what the data says, not what you want to hear. The first step to fixing a process is admitting what it actually looks like." },
  { title: "Fast or useless", desc: "Insights that take weeks to produce arrive too late. If you can\u2019t query a million events in under a second, you\u2019ve already lost the feedback loop." },
  { title: "Complexity is the enemy", desc: "The best tools make complex things simple. If you need a consultant to use it, it\u2019s not a product \u2014 it\u2019s a project." },
  { title: "Craft matters", desc: "Software should be well-made. Clean interfaces, precise algorithms, thoughtful defaults. The details are the product." },
];

export const timeline: TimelineEntry[] = [
  { year: "2024", event: "Founded. First process mining prototype on a columnar event store." },
  { year: "2025", event: "Core platform: process discovery, conformance checking, visual analytics." },
  { year: "2026", event: "Early access. AI-powered predictions. First design partners." },
  { year: "Next", event: "General availability. Closed-loop optimization from insight to action." },
];
