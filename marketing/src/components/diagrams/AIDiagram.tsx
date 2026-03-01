"use client";

/**
 * Conceptual diagram: AI prediction + automated action
 * Shows a process case flowing through, getting flagged, and triggering an action
 */
export function AIDiagram() {
  return (
    <svg viewBox="0 0 480 200" className="h-auto w-full" fill="none">
      {/* ── Left: case flowing through process ── */}
      <text x={60} y={18} textAnchor="middle" fill="#9CA3AF" fontSize={9} fontFamily="Inter, sans-serif" fontWeight={500} letterSpacing="0.08em">
        LIVE CASE
      </text>

      {/* Process steps — case progressing */}
      {["Create", "Review", "Review", "Review"].map((step, i) => {
        const x = 10 + i * 50;
        const y = 30;
        const isRework = i > 1;
        return (
          <g key={i}>
            <circle
              cx={x + 16}
              cy={y + 16}
              r={14}
              fill={isRework ? "#FEE2E2" : "white"}
              stroke={isRework ? "#EF4444" : "#D1D5DB"}
              strokeWidth={1.2}
            />
            <text x={x + 16} y={y + 20} textAnchor="middle" fill={isRework ? "#991B1B" : "#374151"} fontSize={6} fontFamily="Inter, sans-serif">
              {step}
            </text>
            {i < 3 && (
              <line x1={x + 30} y1={y + 16} x2={x + 52} y2={y + 16} stroke={isRework ? "#FECACA" : "#E5E7EB"} strokeWidth={1} />
            )}
          </g>
        );
      })}

      {/* Rework loop arrow */}
      <path d="M 176 62 C 176 78, 126 78, 126 62" stroke="#EF4444" strokeWidth={1} strokeDasharray="3 2" fill="none" />
      <polygon points="126,62 123,68 129,68" fill="#EF4444" />
      <text x={151} y={88} textAnchor="middle" fill="#EF4444" fontSize={7} fontFamily="Inter, sans-serif" fontWeight={500}>
        rework loop
      </text>

      {/* ── Center: AI analysis ── */}
      <line x1={210} y1={46} x2={240} y2={46} stroke="#D1D5DB" strokeWidth={1} />

      {/* AI brain icon (simple) */}
      <circle cx={268} cy={46} r={24} fill="#F5F3FF" stroke="#7C3AED" strokeWidth={1.5} />
      <text x={268} y={42} textAnchor="middle" fill="#7C3AED" fontSize={7} fontFamily="Inter, sans-serif" fontWeight={600} letterSpacing="0.06em">
        AI
      </text>
      <text x={268} y={54} textAnchor="middle" fill="#7C3AED" fontSize={7} fontFamily="Inter, sans-serif">
        Model
      </text>

      <line x1={292} y1={46} x2={320} y2={46} stroke="#D1D5DB" strokeWidth={1} />

      {/* ── Right: prediction output ── */}
      <rect x={325} y={14} width={145} height={64} rx={6} fill="white" stroke="#E5E7EB" strokeWidth={1} />

      {/* Alert dot */}
      <circle cx={340} cy={30} r={4} fill="#EF4444" />
      <text x={350} y={33} fill="#991B1B" fontSize={8} fontFamily="Inter, sans-serif" fontWeight={600}>
        SLA Breach: 87%
      </text>

      <text x={340} y={48} fill="#6B7280" fontSize={8} fontFamily="Inter, sans-serif">
        Est. delay: +2.1 days
      </text>
      <text x={340} y={62} fill="#047A55" fontSize={8} fontFamily="Inter, sans-serif" fontWeight={500}>
        → Escalate to Senior AP
      </text>

      {/* ── Bottom: automated action flow ── */}
      <line x1={268} y1={70} x2={268} y2={110} stroke="#7C3AED" strokeWidth={1.2} strokeDasharray="4 3" />
      <polygon points="268,110 265,104 271,104" fill="#7C3AED" />

      <text x={240} y={130} textAnchor="middle" fill="#9CA3AF" fontSize={9} fontFamily="Inter, sans-serif" fontWeight={500} letterSpacing="0.08em">
        AUTOMATED RESPONSE
      </text>

      {/* Three action boxes */}
      {[
        { label: "Reassign", sub: "to senior team" },
        { label: "Alert", sub: "manager notified" },
        { label: "Log", sub: "audit trail" },
      ].map((action, i) => {
        const x = 100 + i * 140;
        return (
          <g key={action.label}>
            <rect x={x} y={140} width={110} height={40} rx={4} fill="#F5F3FF" stroke="#7C3AED" strokeWidth={1} />
            <text x={x + 55} y={158} textAnchor="middle" fill="#5B21B6" fontSize={9} fontFamily="Inter, sans-serif" fontWeight={500}>
              {action.label}
            </text>
            <text x={x + 55} y={172} textAnchor="middle" fill="#8B5CF6" fontSize={7} fontFamily="Inter, sans-serif">
              {action.sub}
            </text>
            {i < 2 && (
              <line x1={x + 110} y1={160} x2={x + 140} y2={160} stroke="#DDD6FE" strokeWidth={1} />
            )}
          </g>
        );
      })}
    </svg>
  );
}
