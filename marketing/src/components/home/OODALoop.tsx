"use client";

import { useState, useEffect } from "react";

const phases = [
  {
    key: "O1",
    letter: "O",
    label: "Observe",
    desc: "Connect every system. Ingest every event log. See everything.",
    systems: "SAP · Oracle · ServiceNow · Salesforce · Jira · Snowflake",
  },
  {
    key: "O2",
    letter: "O",
    label: "Orient",
    desc: "Process mining reconstructs the real flow. Not the Visio diagram — the truth.",
    systems: "Auto-discovered process maps from raw data",
  },
  {
    key: "D",
    letter: "D",
    label: "Decide",
    desc: "AI finds bottlenecks, predicts SLA breaches, spots deviations. Before they cost you.",
    systems: "LLM-powered diagnostics + conformance checking",
  },
  {
    key: "A",
    letter: "A",
    label: "Act",
    desc: "Trigger automations. Alert the right people. Reassign work. Close the loop.",
    systems: "Automated alerts · Workflow triggers · Slack · Email",
  },
];

export function OODALoop() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % phases.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const current = phases[active];

  return (
    <div>
      {/* Phase indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: 0, marginBottom: "var(--sp-5)" }}>
        {phases.map((phase, i) => (
          <div key={phase.key} style={{ display: "flex", alignItems: "center" }}>
            {/* Node */}
            <button
              onClick={() => setActive(i)}
              style={{
                width: 64,
                height: 64,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                border: i === active ? "1px solid var(--ink-dark)" : "1px solid var(--border)",
                background: i === active ? "var(--ink-dark)" : "var(--white)",
                cursor: "pointer",
                transition: "all 0.4s ease",
                position: "relative",
              }}
            >
              <span style={{
                fontFamily: "var(--sans)",
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "0.02em",
                color: i === active ? "var(--white)" : "var(--ink-faint)",
                transition: "color 0.4s ease",
              }}>
                {phase.letter}
              </span>
              <span style={{
                fontFamily: "var(--sans)",
                fontSize: 7,
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: i === active ? "rgba(255,255,255,0.6)" : "var(--ink-faint)",
                transition: "color 0.4s ease",
              }}>
                {phase.label}
              </span>
              {/* Progress bar at bottom of active node */}
              {i === active && (
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: 2,
                  background: "var(--emerald)",
                  animation: "ooda-progress 3s linear",
                }} />
              )}
            </button>
            {/* Arrow connector */}
            {i < phases.length - 1 && (
              <div style={{
                width: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
                  <line x1="0" y1="6" x2="32" y2="6" stroke={i < active ? "var(--ink-dark)" : "var(--border)"} strokeWidth="1" style={{ transition: "stroke 0.4s ease" }} />
                  <polygon points="32,3 38,6 32,9" fill={i < active ? "var(--ink-dark)" : "var(--border)"} style={{ transition: "fill 0.4s ease" }} />
                </svg>
              </div>
            )}
          </div>
        ))}
        {/* Loop-back arrow */}
        <div style={{
          width: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 4,
        }}>
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
            <path d="M4 8 C 20 8, 20 32, 4 32" stroke="var(--border-mid)" strokeWidth="1" fill="none" />
            <polygon points="4,28 4,36 8,32" fill="var(--border-mid)" />
          </svg>
        </div>
      </div>

      {/* Active phase detail */}
      <div
        key={current.key}
        style={{
          textAlign: "center",
          animation: "ooda-fade 0.4s ease",
          minHeight: 80,
        }}
      >
        <p style={{
          fontFamily: "var(--body)",
          fontSize: "var(--fs-md)",
          fontWeight: 340,
          lineHeight: 1.6,
          color: "var(--ink-mid)",
          maxWidth: 480,
          margin: "0 auto",
        }}>
          {current.desc}
        </p>
        <p style={{
          fontFamily: "var(--sans)",
          fontSize: "var(--fs-xs)",
          letterSpacing: "0.04em",
          color: "var(--ink-faint)",
          marginTop: "var(--sp-3)",
        }}>
          {current.systems}
        </p>
      </div>
    </div>
  );
}
