"use client";

/**
 * Conceptual comparison: SQL flat query vs process mining contextual insight
 * Two panels side by side — simple and clear
 */
export function SqlComparison() {
  return (
    <svg viewBox="0 0 520 200" className="h-auto w-full" fill="none">
      {/* ── Left panel: SQL ── */}
      <rect x={0} y={0} width={248} height={200} rx={6} fill="white" stroke="#E5E7EB" strokeWidth={1} />

      <text x={124} y={24} textAnchor="middle" fill="#9CA3AF" fontSize={9} fontFamily="Inter, sans-serif" fontWeight={500} letterSpacing="0.08em">
        TRADITIONAL SQL
      </text>

      {/* Code block */}
      <rect x={16} y={36} width={216} height={72} rx={4} fill="#1F2937" />
      <text x={28} y={54} fill="#9CA3AF" fontSize={9} fontFamily="monospace">
        <tspan fill="#6EE7B7">SELECT</tspan> COUNT(*)
      </text>
      <text x={28} y={70} fill="#9CA3AF" fontSize={9} fontFamily="monospace">
        <tspan fill="#6EE7B7">FROM</tspan> orders
      </text>
      <text x={28} y={86} fill="#9CA3AF" fontSize={9} fontFamily="monospace">
        <tspan fill="#6EE7B7">WHERE</tspan> status = <tspan fill="#FCD34D">&apos;late&apos;</tspan>
      </text>
      <text x={28} y={100} fill="#6B7280" fontSize={8} fontFamily="monospace">
        → 847 rows
      </text>

      {/* Result */}
      <text x={124} y={132} textAnchor="middle" fill="#1F2937" fontSize={28} fontFamily="Inter, sans-serif" fontWeight={300}>
        847
      </text>
      <text x={124} y={148} textAnchor="middle" fill="#9CA3AF" fontSize={9} fontFamily="Inter, sans-serif">
        late orders
      </text>

      <text x={124} y={175} textAnchor="middle" fill="#9CA3AF" fontSize={9} fontFamily="Inter, sans-serif" fontStyle="italic">
        Tells you what happened
      </text>
      <text x={124} y={190} textAnchor="middle" fill="#D1D5DB" fontSize={8} fontFamily="Inter, sans-serif">
        No context. No why.
      </text>

      {/* ── VS label ── */}
      <circle cx={260} cy={100} r={14} fill="#F3F4F6" stroke="#E5E7EB" strokeWidth={1} />
      <text x={260} y={104} textAnchor="middle" fill="#9CA3AF" fontSize={8} fontFamily="Inter, sans-serif" fontWeight={600}>
        vs
      </text>

      {/* ── Right panel: Process Mining ── */}
      <rect x={272} y={0} width={248} height={200} rx={6} fill="#F0FDF4" stroke="#047A55" strokeWidth={1} />

      <text x={396} y={24} textAnchor="middle" fill="#047A55" fontSize={9} fontFamily="Inter, sans-serif" fontWeight={500} letterSpacing="0.08em">
        PROCESS MINING
      </text>

      {/* Mini process flow */}
      {["Order", "Verify", "Ship"].map((label, i) => {
        const x = 290 + i * 70;
        return (
          <g key={label}>
            <circle cx={x + 16} cy={54} r={12} fill="white" stroke="#047A55" strokeWidth={1} />
            <text x={x + 16} y={58} textAnchor="middle" fill="#047A55" fontSize={6} fontFamily="Inter, sans-serif">{label}</text>
            {i < 2 && <line x1={x + 28} y1={54} x2={x + 74} y2={54} stroke="#047A55" strokeWidth={0.8} />}
          </g>
        );
      })}

      {/* Bottleneck branch */}
      <line x1={376} y1={66} x2={376} y2={86} stroke="#F59E0B" strokeWidth={1.2} strokeDasharray="3 2" />
      <rect x={346} y={86} width={60} height={20} rx={10} fill="#FEF3C7" stroke="#F59E0B" strokeWidth={1} />
      <text x={376} y={100} textAnchor="middle" fill="#92400E" fontSize={7} fontFamily="Inter, sans-serif" fontWeight={500}>
        Bottleneck
      </text>

      {/* Insight */}
      <text x={396} y={128} textAnchor="middle" fill="#1F2937" fontSize={11} fontFamily="Inter, sans-serif" fontWeight={500}>
        847 late orders
      </text>
      <text x={396} y={145} textAnchor="middle" fill="#047A55" fontSize={10} fontFamily="Inter, sans-serif" fontWeight={500}>
        Root cause: Manual Review
      </text>
      <text x={396} y={160} textAnchor="middle" fill="#6B7280" fontSize={9} fontFamily="Inter, sans-serif">
        34% of cases · +4.2 days avg
      </text>

      <text x={396} y={182} textAnchor="middle" fill="#047A55" fontSize={9} fontFamily="Inter, sans-serif" fontStyle="italic" fontWeight={500}>
        Shows you why it happened
      </text>
      <text x={396} y={194} textAnchor="middle" fill="#047A55" fontSize={8} fontFamily="Inter, sans-serif" opacity={0.6}>
        Process context. Actionable.
      </text>
    </svg>
  );
}
