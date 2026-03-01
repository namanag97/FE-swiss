"use client";

import { BrowserFrame } from "./BrowserFrame";

const logRows = [
  { case: "1001", activity: "Create", time: "09:01", highlight: false },
  { case: "1001", activity: "Review", time: "09:15", highlight: false },
  { case: "1001", activity: "Approve", time: "10:02", highlight: true },
  { case: "1002", activity: "Create", time: "09:03", highlight: false },
  { case: "1002", activity: "Review", time: "09:22", highlight: false },
  { case: "1002", activity: "Reject", time: "09:45", highlight: true },
];

const graphNodes = [
  { id: "create", label: "Create", x: 40, y: 30 },
  { id: "review", label: "Review", x: 40, y: 90 },
  { id: "approve", label: "Approve", x: 140, y: 60 },
  { id: "reject", label: "Reject", x: 140, y: 120 },
];

export function DiscoveryDiagram() {
  return (
    <BrowserFrame
      tabs={["Event Log", "Process Map", "Variants"]}
      activeTab={0}
      bottomBar={
        <>
          <div className="flex" style={{ gap: "var(--sp-5)" }}>
            <span style={{ color: "var(--ink-faint)" }}>
              Events:{" "}
              <span style={{ fontWeight: 600, color: "var(--ink)" }}>
                12,847
              </span>
            </span>
            <span style={{ color: "var(--ink-faint)" }}>
              Cases:{" "}
              <span style={{ fontWeight: 600, color: "var(--ink)" }}>
                2,156
              </span>
            </span>
            <span style={{ color: "var(--ink-faint)" }}>
              Variants:{" "}
              <span style={{ fontWeight: 600, color: "var(--ink)" }}>23</span>
            </span>
          </div>
          <span style={{ color: "var(--ink-faint)" }}>
            Source:{" "}
            <span style={{ fontWeight: 600, color: "var(--ink)" }}>
              SAP ERP
            </span>
          </span>
        </>
      }
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1px 1fr",
          minHeight: 220,
        }}
      >
        {/* Event Log Table */}
        <div style={{ padding: "var(--sp-3) var(--sp-4)" }}>
          <div
            style={{
              fontFamily: "var(--sans)",
              fontSize: 8,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--ink-faint)",
              marginBottom: "var(--sp-2)",
            }}
          >
            Event Log
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Case", "Activity", "Time"].map((h) => (
                  <th
                    key={h}
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: 8,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--ink-faint)",
                      textAlign: "left",
                      padding: "4px 6px",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logRows.map((row, i) => (
                <tr key={i}>
                  <td
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: "var(--fs-xs)",
                      color: "var(--ink-mid)",
                      padding: "3px 6px",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {row.case}
                  </td>
                  <td
                    style={{
                      fontFamily: "var(--body)",
                      fontSize: "var(--fs-xs)",
                      color: row.highlight ? "var(--emerald)" : "var(--ink)",
                      fontWeight: row.highlight ? 500 : 400,
                      padding: "3px 6px",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {row.activity}
                  </td>
                  <td
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: "var(--fs-xs)",
                      color: "var(--ink-faint)",
                      padding: "3px 6px",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {row.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Divider */}
        <div style={{ background: "var(--border)" }} />

        {/* Process Graph */}
        <div style={{ padding: "var(--sp-3) var(--sp-4)" }}>
          <div
            style={{
              fontFamily: "var(--sans)",
              fontSize: 8,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--ink-faint)",
              marginBottom: "var(--sp-2)",
            }}
          >
            Discovered Model
          </div>
          <svg viewBox="0 0 240 170" className="h-auto w-full" fill="none">
            {/* Edges */}
            <line
              x1={90}
              y1={45}
              x2={40}
              y2={85}
              stroke="var(--border-nav)"
              strokeWidth={1.5}
            />
            <line
              x1={90}
              y1={45}
              x2={140}
              y2={75}
              stroke="var(--border-nav)"
              strokeWidth={1.5}
            />
            <line
              x1={90}
              y1={105}
              x2={140}
              y2={75}
              stroke="var(--border-nav)"
              strokeWidth={1.5}
            />
            <line
              x1={90}
              y1={105}
              x2={190}
              y2={135}
              stroke="var(--border-nav)"
              strokeWidth={1.5}
              strokeDasharray="4 3"
            />

            {/* Edge labels */}
            <text
              x={55}
              y={58}
              style={{ fontSize: 8, fontFamily: "var(--sans)" }}
              fill="var(--ink-faint)"
            >
              100%
            </text>
            <text
              x={115}
              y={52}
              style={{ fontSize: 8, fontFamily: "var(--sans)" }}
              fill="var(--emerald)"
            >
              66%
            </text>
            <text
              x={130}
              y={115}
              style={{ fontSize: 8, fontFamily: "var(--sans)" }}
              fill="#B45309"
            >
              34%
            </text>

            {/* Nodes */}
            {graphNodes.map((n) => {
              const isReject = n.id === "reject";
              return (
                <g key={n.id}>
                  <rect
                    x={n.x}
                    y={n.y}
                    width={100}
                    height={30}
                    fill={isReject ? "#fffbeb" : "var(--white)"}
                    stroke={isReject ? "#fcd34d" : "var(--border-mid)"}
                    strokeWidth={1}
                  />
                  <text
                    x={n.x + 50}
                    y={n.y + 19}
                    textAnchor="middle"
                    fill={isReject ? "#92400e" : "var(--ink)"}
                    style={{
                      fontSize: 10,
                      fontFamily: "var(--body)",
                      fontWeight: 400,
                    }}
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}

            {/* Arrow connecting to graph label */}
            <path
              d="M 10 45 L 40 45"
              stroke="var(--emerald)"
              strokeWidth={1.5}
              markerEnd="url(#arrow-emerald)"
            />
            <defs>
              <marker
                id="arrow-emerald"
                viewBox="0 0 6 6"
                refX={6}
                refY={3}
                markerWidth={6}
                markerHeight={6}
                orient="auto"
              >
                <path d="M0,0 L6,3 L0,6 Z" fill="var(--emerald)" />
              </marker>
            </defs>
            <text
              x={10}
              y={38}
              style={{
                fontSize: 7,
                fontFamily: "var(--sans)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
              fill="var(--emerald)"
            >
              MINE
            </text>
          </svg>
        </div>
      </div>
    </BrowserFrame>
  );
}
