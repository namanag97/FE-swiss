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
      <div style={{
        display: "flex",
        borderBottom: "1px solid var(--border)",
        gap: "0",
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              flex: 1,
              padding: "var(--sp-4) var(--sp-3)",
              fontFamily: "var(--sans)",
              fontSize: "var(--fs-xs)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              background: "none",
              border: "none",
              borderBottom: active === tab.id ? "2px solid var(--emerald)" : "2px solid transparent",
              color: active === tab.id ? "var(--ink)" : "var(--ink-muted)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding: "var(--sp-6) 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--sp-6)", alignItems: "center" }}>
          <div>
            <h3 className="type-h3">{current.label}</h3>
            <p className="type-body" style={{ marginTop: "var(--sp-3)", color: "var(--ink-mid)" }}>
              {current.desc}
            </p>
          </div>
          <div className="ascii-frame">
            <pre className="ascii-art" style={{ margin: 0 }}>
              {current.ascii}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
