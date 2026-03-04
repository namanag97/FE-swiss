"use client";

import { useState } from "react";

const tabs = [
  {
    id: "discover",
    label: "Discover",
    desc: "Automatically map real processes from event log data. No interviews, no guesswork.",
    ascii: `  ┌──────┐    ┌──────┐    ┌──────┐
  │ Log  │───▶│ Mine │───▶│ Map  │
  └──────┘    └──────┘    └──────┘
   SAP, SF,     Alpha      Process
   ServiceNow   Miner      Graph`,
  },
  {
    id: "diagnose",
    label: "Diagnose",
    desc: "Compare actual execution against your ideal process. Find deviations instantly.",
    ascii: `  IDEAL:    A ──▶ B ──▶ C ──▶ D
             │              ▲
  ACTUAL:    A ──▶ B ──▶ X ──┘  ← deviation
                         │
                         └──▶ Y  ← rework loop`,
  },
  {
    id: "predict",
    label: "Predict",
    desc: "Forecast bottlenecks, SLA breaches, and process failures before they happen.",
    ascii: `  CASE #4,821
  ├── Current step:  Invoice Review
  ├── Predicted:     SLA BREACH in 2.1 days
  ├── Confidence:    87%
  └── Recommended:   Escalate to Senior AP`,
  },
  {
    id: "transform",
    label: "Transform",
    desc: "Trigger automations, reassign work, and close the loop from insight to action.",
    ascii: `  ┌─────────────┐     ┌──────────┐
  │  IF:        │     │ THEN:    │
  │  Bottleneck │────▶│ Reassign │
  │  detected   │     │ + Alert  │
  └─────────────┘     └──────────┘`,
  },
];

export function PlatformTabs() {
  const [active, setActive] = useState("discover");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex overflow-x-auto border-b border-[var(--border)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`tab-button${active === tab.id ? " tab-button--active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-[var(--sp-6)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--sp-6)] items-center">
          <div>
            <h3 className="type-h3">{current.label}</h3>
            <p className="type-body text-mid mt-[var(--sp-3)]">
              {current.desc}
            </p>
          </div>
          <div className="ascii-frame overflow-x-auto">
            <pre className="ascii-art m-0">{current.ascii}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
