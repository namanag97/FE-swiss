"use client";

const steps = [
  {
    label: "Extract",
    sub: "Event logs",
    icon: (
      <path
        d="M4 6h12M4 10h12M4 14h8"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
      />
    ),
  },
  {
    label: "Mine",
    sub: "Discovery",
    icon: (
      <path
        d="M3 12l4-8 4 6 4-4"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Analyze",
    sub: "Conformance",
    icon: (
      <>
        <circle
          cx={10}
          cy={10}
          r={6}
          stroke="currentColor"
          strokeWidth={1.3}
          fill="none"
        />
        <path
          d="M10 7v3l2 2"
          stroke="currentColor"
          strokeWidth={1.3}
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    label: "Act",
    sub: "Automation",
    icon: (
      <path
        d="M13 3L5 12h5l-1 8 8-9h-5l1-8z"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
];

export function PipelineDiagram() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ gap: 0, width: "100%", maxWidth: 600, margin: "0 auto" }}
    >
      {steps.map((step, i) => (
        <div
          key={step.label}
          className="flex items-center"
          style={{ flex: i < steps.length - 1 ? 1 : "none" }}
        >
          {/* Node */}
          <div className="flex flex-col items-center" style={{ minWidth: 80 }}>
            <div
              style={{
                width: 40,
                height: 40,
                border: "1px solid var(--border-mid)",
                background: "var(--white)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--ink-mid)",
              }}
            >
              <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                {step.icon}
              </svg>
            </div>
            <span
              style={{
                fontFamily: "var(--sans)",
                fontSize: "var(--fs-xs)",
                fontWeight: 400,
                color: "var(--ink)",
                marginTop: 8,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {step.label}
            </span>
            <span
              style={{
                fontFamily: "var(--body)",
                fontSize: 9,
                color: "var(--ink-faint)",
                marginTop: 2,
              }}
            >
              {step.sub}
            </span>
          </div>

          {/* Connector arrow */}
          {i < steps.length - 1 && (
            <div
              style={{
                flex: 1,
                height: 1,
                background: "var(--border-mid)",
                position: "relative",
                minWidth: 30,
                marginTop: -20,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: -1,
                  top: -3,
                  width: 0,
                  height: 0,
                  borderLeft: "5px solid var(--border-mid)",
                  borderTop: "3px solid transparent",
                  borderBottom: "3px solid transparent",
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
