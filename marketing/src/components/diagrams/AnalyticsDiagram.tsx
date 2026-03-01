"use client";

import { BrowserFrame } from "./BrowserFrame";

const kpis = [
  { label: "Cycle Time", value: "4.2d", trend: "down", delta: "12%", good: true },
  { label: "Throughput", value: "847/d", trend: "up", delta: "8%", good: true },
  { label: "On-Time", value: "78%", trend: "up", delta: "5%", good: true },
  { label: "Rework", value: "12%", trend: "down", delta: "3%", good: true },
];

const variants = [
  { label: "Happy path", pct: 66, color: "var(--emerald)" },
  { label: "Manual review", pct: 24, color: "#d97706" },
  { label: "Rejected", pct: 10, color: "#e11d48" },
];

const barData = [
  { label: "Mon", h: 65 },
  { label: "Tue", h: 80 },
  { label: "Wed", h: 55 },
  { label: "Thu", h: 90 },
  { label: "Fri", h: 70 },
  { label: "Sat", h: 40 },
  { label: "Sun", h: 30 },
];

export function AnalyticsDiagram() {
  return (
    <BrowserFrame
      tabs={["Dashboard", "KPIs", "Reports"]}
      activeTab={0}
      bottomBar={
        <>
          <span style={{ color: "var(--ink-faint)" }}>
            Period:{" "}
            <span style={{ fontWeight: 600, color: "var(--ink)" }}>
              Last 30 days
            </span>
          </span>
          <span style={{ color: "var(--ink-faint)" }}>
            Updated:{" "}
            <span style={{ fontWeight: 600, color: "var(--ink)" }}>
              2 min ago
            </span>
          </span>
        </>
      }
    >
      <div style={{ padding: "var(--sp-3) var(--sp-4)" }}>
        {/* KPI Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "var(--sp-2)",
            marginBottom: "var(--sp-3)",
          }}
        >
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              style={{
                padding: "var(--sp-2) var(--sp-3)",
                border: "1px solid var(--border)",
                background: "var(--white)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 7,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--ink-faint)",
                  marginBottom: 4,
                }}
              >
                {kpi.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: "var(--fs-lg)",
                  fontWeight: 400,
                  color: "var(--ink-dark)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {kpi.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 8,
                  color: kpi.good ? "var(--emerald)" : "#e11d48",
                  marginTop: 3,
                }}
              >
                {kpi.trend === "up" ? "\u2191" : "\u2193"} {kpi.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1px 1fr",
            gap: 0,
            border: "1px solid var(--border)",
            background: "var(--white)",
          }}
        >
          {/* Variant Distribution */}
          <div style={{ padding: "var(--sp-3)" }}>
            <div
              style={{
                fontFamily: "var(--sans)",
                fontSize: 8,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--ink-faint)",
                marginBottom: "var(--sp-3)",
              }}
            >
              Variant Distribution
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--sp-2)",
              }}
            >
              {variants.map((v) => (
                <div key={v.label}>
                  <div
                    className="flex items-center justify-between"
                    style={{ marginBottom: 3 }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--body)",
                        fontSize: "var(--fs-xs)",
                        color: "var(--ink-mid)",
                      }}
                    >
                      {v.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: "var(--fs-xs)",
                        color: "var(--ink)",
                        fontWeight: 500,
                      }}
                    >
                      {v.pct}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      background: "var(--border)",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        height: 4,
                        width: `${v.pct}%`,
                        background: v.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ background: "var(--border)" }} />

          {/* Weekly Throughput */}
          <div style={{ padding: "var(--sp-3)" }}>
            <div
              style={{
                fontFamily: "var(--sans)",
                fontSize: 8,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--ink-faint)",
                marginBottom: "var(--sp-3)",
              }}
            >
              Weekly Throughput
            </div>
            <svg viewBox="0 0 200 80" className="h-auto w-full" fill="none">
              {barData.map((d, i) => {
                const x = i * 28 + 4;
                const barH = d.h * 0.6;
                const y = 60 - barH;
                return (
                  <g key={d.label}>
                    <rect
                      x={x}
                      y={y}
                      width={20}
                      height={barH}
                      fill={
                        i === 3
                          ? "var(--emerald)"
                          : "rgba(46,59,54,.12)"
                      }
                    />
                    <text
                      x={x + 10}
                      y={72}
                      textAnchor="middle"
                      fill="var(--ink-faint)"
                      style={{ fontSize: 7, fontFamily: "var(--sans)" }}
                    >
                      {d.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
