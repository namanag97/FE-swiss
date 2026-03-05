"use client";

import { useState, useEffect, useRef, useCallback } from "react";

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

const CYCLE_MS = 4000;
const RESUME_MS = 6000;

export function OODALoop() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startCycle = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % phases.length);
    }, CYCLE_MS);
    setPaused(false);
  }, []);

  const pauseCycle = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (resumeRef.current) clearTimeout(resumeRef.current);
    setPaused(true);
    resumeRef.current = setTimeout(startCycle, RESUME_MS);
  }, [startCycle]);

  useEffect(() => {
    startCycle();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (resumeRef.current) clearTimeout(resumeRef.current);
    };
  }, [startCycle]);

  function handleClick(i: number) {
    setActive(i);
    pauseCycle();
  }

  const current = phases[active];

  return (
    <div
      onMouseEnter={pauseCycle}
      onMouseLeave={startCycle}
    >
      {/* Phase indicators */}
      <div className="flex justify-center mb-[var(--sp-5)] overflow-x-auto">
        {phases.map((phase, i) => (
          <div key={phase.key} className="flex items-center">
            {/* Node */}
            <button
              onClick={() => handleClick(i)}
              className="relative flex flex-col items-center justify-center w-16 h-16 gap-0.5 cursor-pointer transition-all duration-[400ms]"
              style={{
                border: i === active ? "1px solid var(--ink-dark)" : "1px solid var(--border)",
                background: i === active ? "var(--ink-dark)" : "var(--white)",
              }}
            >
              <span
                className="font-[var(--sans)] text-[20px] font-semibold tracking-[0.02em] transition-colors duration-[400ms]"
                style={{ color: i === active ? "var(--white)" : "var(--ink-faint)" }}
              >
                {phase.letter}
              </span>
              <span
                className="font-[var(--sans)] text-[7px] font-medium tracking-[0.1em] uppercase transition-colors duration-[400ms]"
                style={{ color: i === active ? "rgba(255,255,255,0.6)" : "var(--ink-faint)" }}
              >
                {phase.label}
              </span>
              {/* Progress bar at bottom of active node */}
              {i === active && !paused && (
                <div className="absolute bottom-0 left-0 h-0.5 bg-[var(--emerald)]" style={{ animation: `ooda-progress ${CYCLE_MS}ms linear` }} />
              )}
              {/* Static indicator when paused */}
              {i === active && paused && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--emerald)] opacity-50" />
              )}
            </button>
            {/* Arrow connector */}
            {i < phases.length - 1 && (
              <div className="flex items-center justify-center w-10">
                <svg width="40" height="12" viewBox="0 0 40 12" fill="none" aria-hidden="true">
                  <line x1="0" y1="6" x2="32" y2="6" stroke={i < active ? "var(--ink-dark)" : "var(--border)"} strokeWidth="1" className="transition-[stroke] duration-[400ms]" />
                  <polygon points="32,3 38,6 32,9" fill={i < active ? "var(--ink-dark)" : "var(--border)"} className="transition-[fill] duration-[400ms]" />
                </svg>
              </div>
            )}
          </div>
        ))}
        {/* Loop-back arrow */}
        <div className="flex items-center justify-center w-8 ml-1">
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none" aria-hidden="true">
            <path d="M4 8 C 20 8, 20 32, 4 32" stroke="var(--border-mid)" strokeWidth="1" fill="none" />
            <polygon points="4,28 4,36 8,32" fill="var(--border-mid)" />
          </svg>
        </div>
      </div>

      {/* Active phase detail */}
      <div key={current.key} className="text-center min-h-[80px]" style={{ animation: "ooda-fade 0.4s ease" }}>
        <p className="type-body text-mid max-w-[480px] mx-auto">
          {current.desc}
        </p>
        <p className="type-label mt-[var(--sp-3)]">
          {current.systems}
        </p>
      </div>
    </div>
  );
}
