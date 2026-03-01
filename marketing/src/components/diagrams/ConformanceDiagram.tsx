"use client";

import { BrowserFrame } from "./BrowserFrame";

const idealSteps = ["Order", "Verify", "Approve", "Ship", "Invoice"];

export function ConformanceDiagram() {
  return (
    <BrowserFrame
      tabs={["Conformance", "Deviations", "Root Cause"]}
      activeTab={0}
      bottomBar={
        <>
          <div className="flex" style={{ gap: "var(--sp-5)" }}>
            <span style={{ color: "var(--ink-faint)" }}>
              Fitness:{" "}
              <span style={{ fontWeight: 600, color: "var(--emerald)" }}>
                0.82
              </span>
            </span>
            <span style={{ color: "var(--ink-faint)" }}>
              Deviations:{" "}
              <span style={{ fontWeight: 600, color: "#B45309" }}>3</span>
            </span>
          </div>
          <span style={{ color: "var(--ink-faint)" }}>
            Conformance:{" "}
            <span style={{ fontWeight: 600, color: "var(--ink)" }}>66%</span>
          </span>
        </>
      }
    >
      <div style={{ padding: "var(--sp-4)" }}>
        <svg viewBox="0 0 520 200" className="h-auto w-full" fill="none">
          <defs>
            <marker
              id="arrow-ok"
              viewBox="0 0 6 6"
              refX={6}
              refY={3}
              markerWidth={6}
              markerHeight={6}
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--emerald)" />
            </marker>
            <marker
              id="arrow-warn"
              viewBox="0 0 6 6"
              refX={6}
              refY={3}
              markerWidth={6}
              markerHeight={6}
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#d97706" />
            </marker>
            <marker
              id="arrow-neutral"
              viewBox="0 0 6 6"
              refX={6}
              refY={3}
              markerWidth={6}
              markerHeight={6}
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--border-nav)" />
            </marker>
          </defs>

          {/* Section labels */}
          <text
            x={14}
            y={25}
            style={{
              fontSize: 8,
              fontFamily: "var(--sans)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
            fill="var(--emerald)"
          >
            Ideal Process
          </text>
          <text
            x={14}
            y={115}
            style={{
              fontSize: 8,
              fontFamily: "var(--sans)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
            fill="var(--ink-faint)"
          >
            Actual Process
          </text>

          {/* ── Ideal path (top row) ── */}
          {idealSteps.map((step, i) => {
            const x = 14 + i * 100;
            const y = 38;
            return (
              <g key={step}>
                <rect
                  x={x}
                  y={y}
                  width={80}
                  height={30}
                  fill="rgba(4,122,85,.06)"
                  stroke="var(--emerald)"
                  strokeWidth={1}
                />
                <text
                  x={x + 40}
                  y={y + 19}
                  textAnchor="middle"
                  fill="var(--emerald)"
                  style={{ fontSize: 10, fontFamily: "var(--body)" }}
                >
                  {step}
                </text>
                {i < idealSteps.length - 1 && (
                  <line
                    x1={x + 80}
                    y1={y + 15}
                    x2={x + 100}
                    y2={y + 15}
                    stroke="var(--emerald)"
                    strokeWidth={1.5}
                    markerEnd="url(#arrow-ok)"
                  />
                )}
              </g>
            );
          })}

          {/* ── Actual path (bottom row) — with deviation ── */}
          {["Order", "Verify"].map((step, i) => {
            const x = 14 + i * 100;
            const y = 128;
            return (
              <g key={`actual-${step}`}>
                <rect
                  x={x}
                  y={y}
                  width={80}
                  height={30}
                  fill="var(--white)"
                  stroke="var(--border-mid)"
                  strokeWidth={1}
                />
                <text
                  x={x + 40}
                  y={y + 19}
                  textAnchor="middle"
                  fill="var(--ink)"
                  style={{ fontSize: 10, fontFamily: "var(--body)" }}
                >
                  {step}
                </text>
                {i < 1 && (
                  <line
                    x1={x + 80}
                    y1={y + 15}
                    x2={x + 100}
                    y2={y + 15}
                    stroke="var(--border-nav)"
                    strokeWidth={1.5}
                    markerEnd="url(#arrow-neutral)"
                  />
                )}
              </g>
            );
          })}

          {/* Deviation branch from Verify */}
          <line
            x1={194}
            y1={143}
            x2={224}
            y2={143}
            stroke="var(--border-nav)"
            strokeWidth={1.5}
          />

          {/* Branch split — straight goes to Approve, down goes to Manual Review */}
          {/* Straight to deviation */}
          <path
            d="M 224 143 L 224 168"
            stroke="#d97706"
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />

          {/* Manual Review node (deviation) */}
          <rect
            x={184}
            y={168}
            width={80}
            height={30}
            fill="#fffbeb"
            stroke="#fcd34d"
            strokeWidth={1}
          />
          <text
            x={224}
            y={180}
            textAnchor="middle"
            fill="#92400e"
            style={{ fontSize: 9, fontFamily: "var(--body)" }}
          >
            Manual Review
          </text>
          <text
            x={224}
            y={192}
            textAnchor="middle"
            fill="#92400e"
            style={{ fontSize: 7, fontFamily: "var(--sans)" }}
          >
            +4.2 DAYS
          </text>

          {/* Deviation label */}
          <rect x={270} y={170} width={62} height={16} rx={2} fill="rgba(217,119,6,.1)" />
          <text
            x={301}
            y={181}
            textAnchor="middle"
            fill="#B45309"
            style={{
              fontSize: 7,
              fontFamily: "var(--sans)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Deviation
          </text>

          {/* Continue from branch — Approve */}
          <line
            x1={224}
            y1={143}
            x2={314}
            y2={143}
            stroke="var(--border-nav)"
            strokeWidth={1.5}
            markerEnd="url(#arrow-neutral)"
          />
          <rect
            x={314}
            y={128}
            width={80}
            height={30}
            fill="var(--white)"
            stroke="var(--border-mid)"
            strokeWidth={1}
          />
          <text
            x={354}
            y={147}
            textAnchor="middle"
            fill="var(--ink)"
            style={{ fontSize: 10, fontFamily: "var(--body)" }}
          >
            Approve
          </text>

          {/* Rejoin from Manual Review to Approve */}
          <path
            d="M 264 183 C 290 183, 314 160, 314 143"
            stroke="#d97706"
            strokeWidth={1.5}
            strokeDasharray="4 3"
            markerEnd="url(#arrow-warn)"
          />

          {/* 66% / 34% labels */}
          <text
            x={260}
            y={136}
            textAnchor="middle"
            fill="var(--emerald)"
            style={{ fontSize: 8, fontFamily: "var(--sans)", fontWeight: 500 }}
          >
            66%
          </text>
          <text
            x={210}
            y={162}
            textAnchor="middle"
            fill="#B45309"
            style={{ fontSize: 8, fontFamily: "var(--sans)", fontWeight: 500 }}
          >
            34%
          </text>

          {/* Ship + Invoice */}
          {["Ship", "Invoice"].map((step, i) => {
            const x = 414 + i * 100;
            const y = 128;
            return (
              <g key={`actual-end-${step}`}>
                <line
                  x1={x - 20}
                  y1={y + 15}
                  x2={x}
                  y2={y + 15}
                  stroke="var(--border-nav)"
                  strokeWidth={1.5}
                  markerEnd="url(#arrow-neutral)"
                />
                <rect
                  x={x}
                  y={y}
                  width={80}
                  height={30}
                  fill="var(--white)"
                  stroke="var(--border-mid)"
                  strokeWidth={1}
                />
                <text
                  x={x + 40}
                  y={y + 19}
                  textAnchor="middle"
                  fill="var(--ink)"
                  style={{ fontSize: 10, fontFamily: "var(--body)" }}
                >
                  {step}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </BrowserFrame>
  );
}
