"use client";

import { BrowserFrame } from "./BrowserFrame";

export function AIDiagram() {
  return (
    <BrowserFrame
      tabs={["Alerts", "Predictions", "Actions"]}
      activeTab={0}
      bottomBar={
        <>
          <div className="flex" style={{ gap: "var(--sp-5)" }}>
            <span style={{ color: "var(--ink-faint)" }}>
              Active alerts:{" "}
              <span style={{ fontWeight: 600, color: "#B45309" }}>3</span>
            </span>
            <span style={{ color: "var(--ink-faint)" }}>
              Resolved today:{" "}
              <span style={{ fontWeight: 600, color: "var(--emerald)" }}>
                12
              </span>
            </span>
          </div>
          <span style={{ color: "var(--ink-faint)" }}>
            Model:{" "}
            <span style={{ fontWeight: 600, color: "var(--ink)" }}>v2.4</span>
          </span>
        </>
      }
    >
      <div style={{ padding: "var(--sp-3) var(--sp-4)" }}>
        {/* Alert card */}
        <div
          style={{
            border: "1px solid #fcd34d",
            background: "#fffbeb",
            padding: "var(--sp-3) var(--sp-4)",
            marginBottom: "var(--sp-3)",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center" style={{ gap: "var(--sp-2)" }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#d97706",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 8,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#92400e",
                }}
              >
                Anomaly Detected
              </span>
            </div>
            <span
              style={{
                fontFamily: "var(--sans)",
                fontSize: 8,
                color: "#92400e",
                opacity: 0.6,
              }}
            >
              2 min ago
            </span>
          </div>
          <div style={{ marginTop: "var(--sp-2)" }}>
            <span
              style={{
                fontFamily: "var(--body)",
                fontSize: "var(--fs-sm)",
                color: "#92400e",
                fontWeight: 500,
              }}
            >
              Case #4,821 — Invoice Processing
            </span>
            <p
              style={{
                fontFamily: "var(--body)",
                fontSize: "var(--fs-xs)",
                color: "#92400e",
                opacity: 0.8,
                marginTop: 4,
                lineHeight: 1.5,
              }}
            >
              Unusual rework loop detected: Review → Reject → Review (3
              iterations, avg 1.1)
            </p>
          </div>
        </div>

        {/* Prediction card */}
        <div
          style={{
            border: "1px solid var(--border)",
            background: "var(--white)",
            padding: "var(--sp-3) var(--sp-4)",
            marginBottom: "var(--sp-3)",
          }}
        >
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
            Prediction
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "var(--sp-3)",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 7,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--ink-faint)",
                  marginBottom: 2,
                }}
              >
                SLA Breach
              </div>
              <div
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: "var(--fs-base)",
                  fontWeight: 400,
                  color: "#e11d48",
                }}
              >
                87%
              </div>

              {/* Mini gauge */}
              <svg
                viewBox="0 0 60 8"
                className="w-full"
                style={{ marginTop: 4, height: 6 }}
              >
                <rect
                  x={0}
                  y={0}
                  width={60}
                  height={6}
                  fill="var(--border)"
                />
                <rect
                  x={0}
                  y={0}
                  width={52}
                  height={6}
                  fill="#e11d48"
                />
              </svg>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 7,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--ink-faint)",
                  marginBottom: 2,
                }}
              >
                Est. Delay
              </div>
              <div
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: "var(--fs-base)",
                  fontWeight: 400,
                  color: "#B45309",
                }}
              >
                +2.1d
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 7,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--ink-faint)",
                  marginBottom: 2,
                }}
              >
                Action
              </div>
              <div
                style={{
                  fontFamily: "var(--body)",
                  fontSize: "var(--fs-xs)",
                  fontWeight: 500,
                  color: "var(--emerald)",
                }}
              >
                Escalate to SR
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex" style={{ gap: "var(--sp-2)" }}>
          <button
            className="btn btn-primary"
            style={{
              fontSize: 8,
              padding: "6px 12px",
              pointerEvents: "none",
            }}
          >
            Escalate
          </button>
          <button
            className="btn btn-ghost"
            style={{
              fontSize: 8,
              padding: "6px 12px",
              pointerEvents: "none",
            }}
          >
            Dismiss
          </button>
          <button
            className="btn btn-ghost"
            style={{
              fontSize: 8,
              padding: "6px 12px",
              pointerEvents: "none",
            }}
          >
            Details
          </button>
        </div>
      </div>
    </BrowserFrame>
  );
}
