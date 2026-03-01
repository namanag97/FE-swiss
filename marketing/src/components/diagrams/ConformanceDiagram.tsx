"use client";

/**
 * Conceptual diagram: ideal process vs actual process with deviation highlighted
 * Two parallel paths — green ideal, gray actual with an orange deviation branch
 */
export function ConformanceDiagram() {
  const nodeW = 56;
  const nodeH = 28;
  const gap = 80;

  return (
    <svg viewBox="0 0 480 210" className="h-auto w-full" fill="none">
      {/* ── Ideal path (top) ── */}
      <text x={20} y={18} fill="#047A55" fontSize={9} fontFamily="Inter, sans-serif" fontWeight={500} letterSpacing="0.08em">
        IDEAL
      </text>

      {["Order", "Verify", "Approve", "Ship", "Invoice"].map((label, i) => {
        const x = 20 + i * gap;
        const y = 30;
        return (
          <g key={`ideal-${label}`}>
            <rect x={x} y={y} width={nodeW} height={nodeH} rx={4} fill="#ECFDF5" stroke="#047A55" strokeWidth={1.2} />
            <text x={x + nodeW / 2} y={y + 18} textAnchor="middle" fill="#047A55" fontSize={9} fontFamily="Inter, sans-serif">
              {label}
            </text>
            {i < 4 && (
              <>
                <line x1={x + nodeW} y1={y + nodeH / 2} x2={x + gap} y2={y + nodeH / 2} stroke="#047A55" strokeWidth={1.2} />
                <polygon points={`${x + gap},${y + nodeH / 2} ${x + gap - 5},${y + nodeH / 2 - 3} ${x + gap - 5},${y + nodeH / 2 + 3}`} fill="#047A55" />
              </>
            )}
          </g>
        );
      })}

      {/* ── Actual path (bottom) ── */}
      <text x={20} y={100} fill="#6B7280" fontSize={9} fontFamily="Inter, sans-serif" fontWeight={500} letterSpacing="0.08em">
        ACTUAL
      </text>

      {/* Order → Verify (same) */}
      {["Order", "Verify"].map((label, i) => {
        const x = 20 + i * gap;
        const y = 112;
        return (
          <g key={`actual-${label}`}>
            <rect x={x} y={y} width={nodeW} height={nodeH} rx={4} fill="white" stroke="#D1D5DB" strokeWidth={1.2} />
            <text x={x + nodeW / 2} y={y + 18} textAnchor="middle" fill="#374151" fontSize={9} fontFamily="Inter, sans-serif">
              {label}
            </text>
            {i < 1 && (
              <>
                <line x1={x + nodeW} y1={y + nodeH / 2} x2={x + gap} y2={y + nodeH / 2} stroke="#D1D5DB" strokeWidth={1.2} />
                <polygon points={`${x + gap},${y + nodeH / 2} ${x + gap - 5},${y + nodeH / 2 - 3} ${x + gap - 5},${y + nodeH / 2 + 3}`} fill="#D1D5DB" />
              </>
            )}
          </g>
        );
      })}

      {/* Deviation branch from Verify */}
      <line x1={100 + nodeW} y1={126} x2={150} y2={126} stroke="#D1D5DB" strokeWidth={1.2} />

      {/* Split — 66% straight */}
      <line x1={150} y1={126} x2={180} y2={126} stroke="#D1D5DB" strokeWidth={1.2} />
      <text x={165} y={118} textAnchor="middle" fill="#9CA3AF" fontSize={7} fontFamily="Inter, sans-serif">66%</text>

      {/* Split — 34% down to Manual Review */}
      <path d="M 150 126 L 150 170" stroke="#F59E0B" strokeWidth={1.5} strokeDasharray="5 3" />
      <polygon points="150,170 147,164 153,164" fill="#F59E0B" />
      <text x={162} y={150} fill="#B45309" fontSize={7} fontFamily="Inter, sans-serif">34%</text>

      {/* Manual Review node (deviation) */}
      <rect x={110} y={174} width={80} height={28} rx={4} fill="#FEF3C7" stroke="#F59E0B" strokeWidth={1.5} />
      <text x={150} y={192} textAnchor="middle" fill="#92400E" fontSize={9} fontFamily="Inter, sans-serif" fontWeight={500}>
        Manual Review
      </text>

      {/* Deviation badge */}
      <rect x={200} y={178} width={58} height={16} rx={8} fill="#FEF3C7" />
      <text x={229} y={190} textAnchor="middle" fill="#B45309" fontSize={7} fontFamily="Inter, sans-serif" fontWeight={600}>
        +4.2 days
      </text>

      {/* Rejoin from Manual Review → Approve */}
      <path d="M 190 188 C 220 188, 240 150, 240 126" stroke="#F59E0B" strokeWidth={1.2} strokeDasharray="5 3" />

      {/* Approve → Ship → Invoice (continue) */}
      {["Approve", "Ship", "Invoice"].map((label, i) => {
        const x = 180 + i * gap;
        const y = 112;
        return (
          <g key={`actual-end-${label}`}>
            <rect x={x} y={y} width={nodeW} height={nodeH} rx={4} fill="white" stroke="#D1D5DB" strokeWidth={1.2} />
            <text x={x + nodeW / 2} y={y + 18} textAnchor="middle" fill="#374151" fontSize={9} fontFamily="Inter, sans-serif">
              {label}
            </text>
            {i < 2 && (
              <>
                <line x1={x + nodeW} y1={y + nodeH / 2} x2={x + gap} y2={y + nodeH / 2} stroke="#D1D5DB" strokeWidth={1.2} />
                <polygon points={`${x + gap},${y + nodeH / 2} ${x + gap - 5},${y + nodeH / 2 - 3} ${x + gap - 5},${y + nodeH / 2 + 3}`} fill="#D1D5DB" />
              </>
            )}
          </g>
        );
      })}

      {/* Conformance score */}
      <text x={240} y={80} textAnchor="middle" fill="#9CA3AF" fontSize={8} fontFamily="Inter, sans-serif">
        Conformance: 66%  ·  Fitness: 0.82
      </text>
    </svg>
  );
}
