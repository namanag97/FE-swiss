"use client";

/**
 * Conceptual pipeline: Extract → Mine → Analyze → Act
 * Simple horizontal flow with icons, clean and minimal
 */
export function PipelineDiagram() {
  return (
    <svg viewBox="0 0 520 80" className="h-auto w-full" fill="none" style={{ maxWidth: 560, margin: "0 auto", display: "block" }}>
      {[
        { label: "Extract", sub: "event logs", cx: 50 },
        { label: "Mine", sub: "discovery", cx: 190 },
        { label: "Analyze", sub: "conformance", cx: 330 },
        { label: "Act", sub: "automation", cx: 470 },
      ].map((step, i) => (
        <g key={step.label}>
          {/* Node circle */}
          <circle
            cx={step.cx}
            cy={30}
            r={18}
            fill="white"
            stroke={i === 3 ? "#047A55" : "#1F2937"}
            strokeWidth={1.5}
          />
          <text
            x={step.cx}
            y={34}
            textAnchor="middle"
            fill={i === 3 ? "#047A55" : "#1F2937"}
            fontSize={9}
            fontFamily="Inter, sans-serif"
            fontWeight={500}
          >
            {String(i + 1).padStart(2, "0")}
          </text>

          {/* Label below */}
          <text x={step.cx} y={62} textAnchor="middle" fill="#1F2937" fontSize={10} fontFamily="Inter, sans-serif" fontWeight={500}>
            {step.label}
          </text>
          <text x={step.cx} y={74} textAnchor="middle" fill="#9CA3AF" fontSize={8} fontFamily="Inter, sans-serif">
            {step.sub}
          </text>

          {/* Connector */}
          {i < 3 && (
            <>
              <line x1={step.cx + 20} y1={30} x2={step.cx + 118} y2={30} stroke="#D1D5DB" strokeWidth={1.2} />
              <polygon points={`${step.cx + 118},30 ${step.cx + 112},27 ${step.cx + 112},33`} fill="#D1D5DB" />
            </>
          )}
        </g>
      ))}
    </svg>
  );
}
