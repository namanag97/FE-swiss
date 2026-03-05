import { C } from "@/lib/colors";
import { SvgNode, SvgArrow } from "@/components/svg/SvgPrimitives";

export function AiInsightsSvg() {
  return (
    <svg viewBox="0 0 520 320" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AI anomaly detection panel showing SLA breach prediction and recommended escalation action" style={{ width: "100%", height: "auto" }}>
      {/* Panel frame */}
      <rect x={8} y={8} width={504} height={304} rx={2} fill={C.white} stroke={C.border} />

      {/* Alert header */}
      <rect x={8} y={8} width={504} height={36} rx={2} fill={C.amberLight} stroke={C.amberBorder} strokeWidth={0.5} />
      <text x={36} y={30} fontSize={11} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.amberText}>{"\u26A0"} ANOMALY DETECTED</text>
      <text x={480} y={30} textAnchor="end" fontSize={9} fontFamily="'Geist Mono', monospace" fill={C.amber}>CASE #4,821</text>

      {/* Case info */}
      <text x={24} y={68} fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={500} fill={C.text}>Invoice Processing — Unusual rework loop</text>

      {/* Pattern detail */}
      <rect x={24} y={80} width={472} height={48} rx={2} fill={C.bg} stroke={C.border} />
      <text x={36} y={98} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.muted} letterSpacing={0.5}>PATTERN</text>

      {/* Mini flow inside pattern box */}
      <SvgNode x={36} y={104} w={64} h={20} label="Review" />
      <SvgArrow x1={100} y1={114} x2={112} y2={114} />
      <rect x={112} y={104} width={56} height={20} rx={2} fill={C.amberLight} stroke={C.amber} />
      <text x={140} y={116} textAnchor="middle" dominantBaseline="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.amber}>Reject</text>
      <SvgArrow x1={168} y1={114} x2={180} y2={114} />
      <SvgNode x={180} y={104} w={64} h={20} label="Review" />
      <text x={280} y={116} fontSize={10} fontFamily="'Geist Mono', monospace" fill={C.mid}>{"\u00D7"} 3 iterations (avg: 1.1)</text>

      {/* Prediction box */}
      <rect x={24} y={142} width={472} height={80} rx={2} fill={C.white} stroke={C.green} strokeWidth={1.5} />
      <rect x={24} y={142} width={472} height={24} rx={2} fill={C.greenLight} stroke={C.green} strokeWidth={0.5} />
      <text x={36} y={158} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.green} letterSpacing={1}>PREDICTION</text>

      <text x={36} y={184} fontSize={11} fontFamily="Inter, system-ui, sans-serif" fill={C.text}>SLA Breach Probability</text>
      <text x={220} y={184} fontSize={14} fontFamily="'Geist Mono', monospace" fontWeight={600} fill={C.red}>87%</text>

      <text x={300} y={184} fontSize={11} fontFamily="Inter, system-ui, sans-serif" fill={C.text}>Est. Delay</text>
      <text x={400} y={184} fontSize={14} fontFamily="'Geist Mono', monospace" fontWeight={600} fill={C.amber}>+2.1 days</text>

      {/* Progress bar for probability */}
      <rect x={36} y={194} width={200} height={6} rx={1} fill={C.bg} />
      <rect x={36} y={194} width={174} height={6} rx={1} fill={C.red} opacity={0.7} />

      <text x={36} y={216} fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.green} fontWeight={500}>Recommended: Escalate to Senior Reviewer</text>

      {/* Action buttons */}
      <rect x={24} y={238} width={100} height={32} rx={2} fill={C.dark} stroke={C.dark} />
      <text x={74} y={258} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.white} letterSpacing={0.5}>Escalate</text>

      <rect x={136} y={238} width={88} height={32} rx={2} fill={C.white} stroke={C.border} />
      <text x={180} y={258} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={500} fill={C.mid}>Dismiss</text>

      <rect x={236} y={238} width={88} height={32} rx={2} fill={C.white} stroke={C.border} />
      <text x={280} y={258} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={500} fill={C.mid}>Details</text>

      {/* Timestamp */}
      <text x={480} y={290} textAnchor="end" fontSize={9} fontFamily="'Geist Mono', monospace" fill={C.faint}>detected 2m ago</text>
    </svg>
  );
}
