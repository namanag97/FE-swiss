export interface UseCaseMetric {
  value: string;
  label: string;
}

export interface UseCase {
  id: string;
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  metrics: UseCaseMetric[];
  reverse?: boolean;
}

export const useCases: UseCase[] = [
  {
    id: "o2c",
    eyebrow: "O2C",
    title: "Order-to-Cash",
    tagline: "Your invoices take 47 days. The process says 5.",
    description: "Find where invoices actually get stuck \u2014 the approval bottlenecks, credit check delays, and rework loops that your dashboard can\u2019t explain. See the 12 variants hiding between order and payment.",
    metrics: [
      { value: "~34%", label: "Typical cycle time reduction" },
      { value: "~3 days", label: "Target DSO improvement" },
      { value: "66%+", label: "Straight-through target" },
      { value: "20+", label: "Variants detectable" },
    ],
  },
  {
    id: "p2p",
    eyebrow: "P2P",
    title: "Procure-to-Pay",
    tagline: "3 in 10 POs bypass approval. Nobody knows why.",
    description: "Uncover maverick buying, duplicate payments, and approval bottlenecks. See exactly where procurement deviates from policy \u2014 and how much those deviations cost you every quarter.",
    metrics: [
      { value: "~12%", label: "Typical maverick spend found" },
      { value: "~2 days", label: "Target PO cycle time savings" },
      { value: "94%+", label: "3-way match target" },
      { value: "7+", label: "Deviation types detected" },
    ],
    reverse: true,
  },
  {
    id: "itsm",
    eyebrow: "ITSM",
    title: "IT Service Management",
    tagline: "Tickets bounce between 4 teams before anyone fixes anything.",
    description: "Map ticket lifecycles from creation to resolution. See where escalations bounce, which tiers are bottlenecks, and why first-call resolution keeps dropping.",
    metrics: [
      { value: "~28%", label: "Target resolution time savings" },
      { value: "~45%", label: "Fewer escalation bounces" },
      { value: "90%+", label: "First-call resolution target" },
      { value: "3+", label: "Escalation tiers mapped" },
    ],
  },
  {
    id: "healthcare",
    eyebrow: "Healthcare",
    title: "Patient Journey",
    tagline: "Average wait time says 20 minutes. The actual patient flow tells a different story.",
    description: "Track patient flow through clinical pathways. Find the wait time hotspots, care coordination gaps, and pathway deviations that your averages are hiding.",
    metrics: [
      { value: "~22%", label: "Target wait time reduction" },
      { value: "<4h", label: "Target time to diagnosis" },
      { value: "85%+", label: "Pathway adherence target" },
      { value: "5+", label: "Journey stages mapped" },
    ],
    reverse: true,
  },
];
