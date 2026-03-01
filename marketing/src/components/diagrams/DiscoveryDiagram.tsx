"use client";

/**
 * Conceptual diagram: raw event logs → process mining → visual process map
 * Simple, clean SVG illustration — no UI chrome, no theme vars
 */
export function DiscoveryDiagram() {
  return (
    <svg viewBox="0 0 480 200" className="h-auto w-full" fill="none">
      {/* ── Left: scattered log lines ── */}
      <text x={60} y={20} textAnchor="middle" fill="#9CA3AF" fontSize={9} fontFamily="Inter, sans-serif" fontWeight={500} letterSpacing="0.08em">
        RAW EVENT LOGS
      </text>

      {/* Log lines — scattered, messy feel */}
      {[
        { y: 38, w: 80 },
        { y: 52, w: 65 },
        { y: 66, w: 90 },
        { y: 80, w: 55 },
        { y: 94, w: 75 },
        { y: 108, w: 85 },
        { y: 122, w: 60 },
        { y: 136, w: 70 },
        { y: 150, w: 50 },
        { y: 164, w: 80 },
      ].map((line, i) => (
        <rect
          key={i}
          x={20}
          y={line.y}
          width={line.w}
          height={6}
          rx={1}
          fill={i % 3 === 0 ? "#D1D5DB" : "#E5E7EB"}
        />
      ))}

      {/* ── Center: transformation arrow ── */}
      <line x1={140} y1={100} x2={195} y2={100} stroke="#047A55" strokeWidth={2} />
      <polygon points="200,100 192,95 192,105" fill="#047A55" />
      <text x={170} y={88} textAnchor="middle" fill="#047A55" fontSize={8} fontFamily="Inter, sans-serif" fontWeight={600} letterSpacing="0.06em">
        MINE
      </text>

      {/* ── Right: clean process graph ── */}
      <text x={350} y={20} textAnchor="middle" fill="#047A55" fontSize={9} fontFamily="Inter, sans-serif" fontWeight={500} letterSpacing="0.08em">
        DISCOVERED PROCESS
      </text>

      {/* Nodes */}
      <circle cx={260} cy={60} r={18} fill="white" stroke="#1F2937" strokeWidth={1.5} />
      <text x={260} y={64} textAnchor="middle" fill="#1F2937" fontSize={8} fontFamily="Inter, sans-serif">Start</text>

      <circle cx={350} cy={60} r={18} fill="white" stroke="#1F2937" strokeWidth={1.5} />
      <text x={350} y={64} textAnchor="middle" fill="#1F2937" fontSize={8} fontFamily="Inter, sans-serif">Check</text>

      <circle cx={440} cy={60} r={18} fill="white" stroke="#1F2937" strokeWidth={1.5} />
      <text x={440} y={64} textAnchor="middle" fill="#1F2937" fontSize={8} fontFamily="Inter, sans-serif">Ship</text>

      <circle cx={350} cy={140} r={18} fill="#FEF3C7" stroke="#F59E0B" strokeWidth={1.5} />
      <text x={350} y={144} textAnchor="middle" fill="#92400E" fontSize={8} fontFamily="Inter, sans-serif">Review</text>

      <circle cx={440} cy={140} r={18} fill="white" stroke="#1F2937" strokeWidth={1.5} />
      <text x={440} y={144} textAnchor="middle" fill="#1F2937" fontSize={8} fontFamily="Inter, sans-serif">End</text>

      {/* Edges */}
      <line x1={278} y1={60} x2={332} y2={60} stroke="#1F2937" strokeWidth={1.2} />
      <polygon points="332,60 326,57 326,63" fill="#1F2937" />

      <line x1={368} y1={60} x2={422} y2={60} stroke="#1F2937" strokeWidth={1.2} />
      <polygon points="422,60 416,57 416,63" fill="#1F2937" />
      <text x={395} y={52} textAnchor="middle" fill="#6B7280" fontSize={7} fontFamily="Inter, sans-serif">66%</text>

      <line x1={350} y1={78} x2={350} y2={122} stroke="#F59E0B" strokeWidth={1.2} strokeDasharray="4 3" />
      <polygon points="350,122 347,116 353,116" fill="#F59E0B" />
      <text x={365} y={98} fill="#B45309" fontSize={7} fontFamily="Inter, sans-serif">34%</text>

      <line x1={368} y1={140} x2={422} y2={140} stroke="#9CA3AF" strokeWidth={1.2} />
      <polygon points="422,140 416,137 416,143" fill="#9CA3AF" />

      {/* Reconnect from Ship to End */}
      <path d="M 440 78 L 440 122" stroke="#1F2937" strokeWidth={1.2} />
      <polygon points="440,122 437,116 443,116" fill="#1F2937" />

      {/* Variant count */}
      <text x={350} y={185} textAnchor="middle" fill="#9CA3AF" fontSize={8} fontFamily="Inter, sans-serif">
        23 variants automatically discovered
      </text>
    </svg>
  );
}
