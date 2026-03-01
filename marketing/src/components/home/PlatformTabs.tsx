"use client";

import { useState, type ReactNode } from "react";

/* ── Mini diagram for each tab ── */

function DiscoverVisual() {
  return (
    <svg viewBox="0 0 280 120" className="h-auto w-full" fill="none">
      {/* Log icon */}
      <rect x={10} y={20} width={60} height={80} fill="var(--white)" stroke="var(--border-mid)" strokeWidth={1} />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={18} y1={35 + i * 14} x2={62} y2={35 + i * 14} stroke="var(--border)" strokeWidth={4} />
      ))}
      <text x={40} y={15} textAnchor="middle" fill="var(--ink-faint)" style={{ fontSize: 7, fontFamily: "var(--sans)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Log</text>

      {/* Arrow */}
      <line x1={80} y1={60} x2={115} y2={60} stroke="var(--emerald)" strokeWidth={1.5} />
      <polygon points="115,60 109,57 109,63" fill="var(--emerald)" />
      <text x={97} y={52} textAnchor="middle" fill="var(--emerald)" style={{ fontSize: 6, fontFamily: "var(--sans)", fontWeight: 500 }}>MINE</text>

      {/* Process graph */}
      <rect x={125} y={25} width={55} height={22} fill="rgba(4,122,85,.06)" stroke="var(--emerald)" strokeWidth={0.8} />
      <text x={152} y={39} textAnchor="middle" fill="var(--emerald)" style={{ fontSize: 8, fontFamily: "var(--body)" }}>Create</text>

      <line x1={152} y1={47} x2={152} y2={58} stroke="var(--border-nav)" strokeWidth={1} />

      <rect x={125} y={58} width={55} height={22} fill="var(--white)" stroke="var(--border-mid)" strokeWidth={0.8} />
      <text x={152} y={72} textAnchor="middle" fill="var(--ink)" style={{ fontSize: 8, fontFamily: "var(--body)" }}>Review</text>

      <line x1={152} y1={80} x2={135} y2={92} stroke="var(--border-nav)" strokeWidth={1} />
      <line x1={152} y1={80} x2={172} y2={92} stroke="#d97706" strokeWidth={1} strokeDasharray="3 2" />

      <rect x={105} y={92} width={55} height={18} fill="rgba(4,122,85,.06)" stroke="var(--emerald)" strokeWidth={0.8} />
      <text x={132} y={104} textAnchor="middle" fill="var(--emerald)" style={{ fontSize: 7, fontFamily: "var(--body)" }}>Approve</text>

      <rect x={165} y={92} width={55} height={18} fill="#fffbeb" stroke="#fcd34d" strokeWidth={0.8} />
      <text x={192} y={104} textAnchor="middle" fill="#92400e" style={{ fontSize: 7, fontFamily: "var(--body)" }}>Reject</text>

      {/* Stats */}
      <text x={245} y={45} fill="var(--ink-faint)" style={{ fontSize: 7, fontFamily: "var(--sans)" }}>23 variants</text>
      <text x={245} y={60} fill="var(--ink-faint)" style={{ fontSize: 7, fontFamily: "var(--sans)" }}>12,847 events</text>
      <text x={245} y={75} fill="var(--emerald)" style={{ fontSize: 7, fontFamily: "var(--sans)", fontWeight: 500 }}>Auto-discovered</text>
    </svg>
  );
}

function DiagnoseVisual() {
  return (
    <svg viewBox="0 0 280 100" className="h-auto w-full" fill="none">
      {/* Ideal path label */}
      <text x={10} y={15} fill="var(--emerald)" style={{ fontSize: 7, fontFamily: "var(--sans)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>Ideal</text>

      {/* Ideal path nodes */}
      {["A", "B", "C", "D"].map((n, i) => (
        <g key={`ideal-${n}`}>
          <rect x={10 + i * 65} y={22} width={48} height={22} fill="rgba(4,122,85,.06)" stroke="var(--emerald)" strokeWidth={0.8} />
          <text x={34 + i * 65} y={36} textAnchor="middle" fill="var(--emerald)" style={{ fontSize: 9, fontFamily: "var(--body)" }}>{n}</text>
          {i < 3 && <line x1={58 + i * 65} y1={33} x2={75 + i * 65} y2={33} stroke="var(--emerald)" strokeWidth={1} />}
        </g>
      ))}

      {/* Actual path label */}
      <text x={10} y={62} fill="var(--ink-faint)" style={{ fontSize: 7, fontFamily: "var(--sans)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>Actual</text>

      {/* Actual path — A → B → X (deviation) → D */}
      {["A", "B"].map((n, i) => (
        <g key={`actual-${n}`}>
          <rect x={10 + i * 65} y={68} width={48} height={22} fill="var(--white)" stroke="var(--border-mid)" strokeWidth={0.8} />
          <text x={34 + i * 65} y={82} textAnchor="middle" fill="var(--ink)" style={{ fontSize: 9, fontFamily: "var(--body)" }}>{n}</text>
          {i < 1 && <line x1={58 + i * 65} y1={79} x2={75 + i * 65} y2={79} stroke="var(--border-nav)" strokeWidth={1} />}
        </g>
      ))}

      {/* Deviation node X */}
      <line x1={123} y1={79} x2={140} y2={79} stroke="#d97706" strokeWidth={1} strokeDasharray="3 2" />
      <rect x={140} y={68} width={48} height={22} fill="#fffbeb" stroke="#fcd34d" strokeWidth={0.8} />
      <text x={164} y={82} textAnchor="middle" fill="#92400e" style={{ fontSize: 9, fontFamily: "var(--body)" }}>X</text>

      {/* Deviation label */}
      <rect x={195} y={71} width={52} height={14} rx={2} fill="rgba(217,119,6,.1)" />
      <text x={221} y={81} textAnchor="middle" fill="#B45309" style={{ fontSize: 6, fontFamily: "var(--sans)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Deviation</text>

      {/* X loops back to D */}
      <path d="M 164 90 C 164 98, 230 98, 230 82" stroke="#d97706" strokeWidth={1} strokeDasharray="3 2" />
      <rect x={205} y={68} width={48} height={22} fill="var(--white)" stroke="var(--border-mid)" strokeWidth={0.8} />
      <text x={229} y={82} textAnchor="middle" fill="var(--ink)" style={{ fontSize: 9, fontFamily: "var(--body)" }}>D</text>
    </svg>
  );
}

function PredictVisual() {
  return (
    <div style={{ border: "1px solid var(--border)", background: "var(--white)", padding: "var(--sp-3) var(--sp-4)" }}>
      <div className="flex items-center" style={{ gap: "var(--sp-2)", marginBottom: "var(--sp-3)" }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#d97706" }} />
        <span style={{ fontFamily: "var(--sans)", fontSize: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "#92400e" }}>Case #4,821</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "var(--sp-3)" }}>
        <div>
          <div style={{ fontFamily: "var(--sans)", fontSize: 7, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-faint)", marginBottom: 2 }}>Current Step</div>
          <div style={{ fontFamily: "var(--body)", fontSize: "var(--fs-sm)", color: "var(--ink)" }}>Invoice Review</div>
        </div>
        <div>
          <div style={{ fontFamily: "var(--sans)", fontSize: 7, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-faint)", marginBottom: 2 }}>SLA Risk</div>
          <div style={{ fontFamily: "var(--sans)", fontSize: "var(--fs-base)", color: "#e11d48", fontWeight: 500 }}>87%</div>
          <svg viewBox="0 0 60 6" className="w-full" style={{ marginTop: 3, height: 4 }}>
            <rect x={0} y={0} width={60} height={4} fill="var(--border)" />
            <rect x={0} y={0} width={52} height={4} fill="#e11d48" />
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: "var(--sans)", fontSize: 7, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-faint)", marginBottom: 2 }}>Recommended</div>
          <div style={{ fontFamily: "var(--body)", fontSize: "var(--fs-sm)", color: "var(--emerald)", fontWeight: 500 }}>Escalate to SR</div>
        </div>
      </div>
    </div>
  );
}

function TransformVisual() {
  return (
    <svg viewBox="0 0 280 90" className="h-auto w-full" fill="none">
      {/* Trigger */}
      <rect x={10} y={10} width={100} height={34} fill="var(--white)" stroke="var(--border-mid)" strokeWidth={1} />
      <text x={60} y={22} textAnchor="middle" fill="var(--ink-faint)" style={{ fontSize: 6, fontFamily: "var(--sans)", textTransform: "uppercase", letterSpacing: "0.1em" }}>If</text>
      <text x={60} y={35} textAnchor="middle" fill="var(--ink)" style={{ fontSize: 9, fontFamily: "var(--body)" }}>Bottleneck detected</text>

      {/* Arrow */}
      <line x1={110} y1={27} x2={145} y2={27} stroke="var(--emerald)" strokeWidth={1.5} />
      <polygon points="145,27 139,24 139,30" fill="var(--emerald)" />

      {/* Action */}
      <rect x={150} y={10} width={100} height={34} fill="rgba(4,122,85,.06)" stroke="var(--emerald)" strokeWidth={1} />
      <text x={200} y={22} textAnchor="middle" fill="var(--emerald)" style={{ fontSize: 6, fontFamily: "var(--sans)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Then</text>
      <text x={200} y={35} textAnchor="middle" fill="var(--emerald)" style={{ fontSize: 9, fontFamily: "var(--body)", fontWeight: 500 }}>Reassign + Alert</text>

      {/* Second rule */}
      <rect x={10} y={54} width={100} height={34} fill="var(--white)" stroke="var(--border-mid)" strokeWidth={1} />
      <text x={60} y={66} textAnchor="middle" fill="var(--ink-faint)" style={{ fontSize: 6, fontFamily: "var(--sans)", textTransform: "uppercase", letterSpacing: "0.1em" }}>If</text>
      <text x={60} y={79} textAnchor="middle" fill="var(--ink)" style={{ fontSize: 9, fontFamily: "var(--body)" }}>SLA breach &gt; 80%</text>

      <line x1={110} y1={71} x2={145} y2={71} stroke="var(--emerald)" strokeWidth={1.5} />
      <polygon points="145,71 139,68 139,74" fill="var(--emerald)" />

      <rect x={150} y={54} width={100} height={34} fill="rgba(4,122,85,.06)" stroke="var(--emerald)" strokeWidth={1} />
      <text x={200} y={66} textAnchor="middle" fill="var(--emerald)" style={{ fontSize: 6, fontFamily: "var(--sans)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Then</text>
      <text x={200} y={79} textAnchor="middle" fill="var(--emerald)" style={{ fontSize: 9, fontFamily: "var(--body)", fontWeight: 500 }}>Escalate to SR</text>
    </svg>
  );
}

/* ── Tab definitions ── */
const tabs: { id: string; label: string; desc: string; visual: ReactNode }[] = [
  {
    id: "discover",
    label: "Discover",
    desc: "Automatically map real processes from event log data. No interviews, no guesswork.",
    visual: <DiscoverVisual />,
  },
  {
    id: "diagnose",
    label: "Diagnose",
    desc: "Compare actual execution against your ideal process. Find deviations instantly.",
    visual: <DiagnoseVisual />,
  },
  {
    id: "predict",
    label: "Predict",
    desc: "Forecast bottlenecks, SLA breaches, and process failures before they happen.",
    visual: <PredictVisual />,
  },
  {
    id: "transform",
    label: "Transform",
    desc: "Trigger automations, reassign work, and close the loop from insight to action.",
    visual: <TransformVisual />,
  },
];

export function PlatformTabs() {
  const [active, setActive] = useState("discover");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <div>
      {/* Tab buttons */}
      <div className="filter-row">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`filter-tab${active === tab.id ? " filter-tab--active" : ""}`}
            style={{ flex: 1, textAlign: "center" }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding: "var(--sp-6) 0" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--sp-6)",
            alignItems: "center",
          }}
        >
          <div>
            <h3 className="type-h3">{current.label}</h3>
            <p
              className="type-body"
              style={{ marginTop: "var(--sp-3)", color: "var(--ink-mid)" }}
            >
              {current.desc}
            </p>
          </div>
          <div>{current.visual}</div>
        </div>
      </div>
    </div>
  );
}
