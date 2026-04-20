/* eslint-disable react/forbid-dom-props */

import { C } from "@/lib/colors";
import { SvgNode, SvgArrow } from "@/components/svg/SvgPrimitives";

export function DiscoverySvg() {
  return (
    <svg viewBox="0 0 520 300" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Event log table transforming into a process map with 23 variants detected" style={{ width: "100%", height: "auto" }}>
      {/* Event Log Table */}
      <rect x={16} y={16} width={200} height={200} rx={2} fill={C.white} stroke={C.border} />
      <rect x={16} y={16} width={200} height={28} rx={2} fill={C.bg} stroke={C.border} />
      <text x={36} y={34} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.muted} letterSpacing={0.5}>CASE</text>
      <text x={96} y={34} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.muted} letterSpacing={0.5}>ACTIVITY</text>
      <text x={166} y={34} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.muted} letterSpacing={0.5}>TIME</text>
      {[
        ["1001", "Create", "09:01"],
        ["1001", "Review", "09:15"],
        ["1001", "Approve", "10:02"],
        ["1002", "Create", "09:03"],
        ["1002", "Review", "09:22"],
        ["1002", "Reject", "09:45"],
      ].map(([c, a, t], i) => (
        <g key={i}>
          <text x={36} y={62 + i * 24} fontSize={10} fontFamily="'Geist Mono', monospace" fill={C.mid}>{c}</text>
          <text x={96} y={62 + i * 24} fontSize={10} fontFamily="'Geist Mono', monospace" fill={a === "Reject" ? C.amber : C.text}>{a}</text>
          <text x={166} y={62 + i * 24} fontSize={10} fontFamily="'Geist Mono', monospace" fill={C.faint}>{t}</text>
          {i < 5 && <line x1={28} y1={68 + i * 24} x2={204} y2={68 + i * 24} stroke={C.border} strokeWidth={0.5} />}
        </g>
      ))}
      <text x={116} y={232} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.muted}>12,847 events</text>
      <text x={116} y={250} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1}>EVENT LOG</text>

      {/* Arrow */}
      <line x1={232} y1={116} x2={288} y2={116} stroke={C.green} strokeWidth={1.5} strokeDasharray="4 3" />
      <polygon points="292,116 284,112 284,120" fill={C.green} />

      {/* Process Map */}
      <SvgNode x={308} y={32} w={84} label="Create" accent />
      <SvgArrow x1={350} y1={62} x2={350} y2={80} />
      <SvgNode x={308} y={80} w={84} label="Review" />
      <SvgArrow x1={350} y1={110} x2={350} y2={128} />
      <SvgNode x={308} y={128} w={84} label="Approve" />

      {/* Branch */}
      <line x1={350} y1={158} x2={350} y2={174} stroke={C.muted} strokeWidth={1} />
      <line x1={350} y1={174} x2={318} y2={174} stroke={C.muted} strokeWidth={1} />
      <line x1={350} y1={174} x2={382} y2={174} stroke={C.muted} strokeWidth={1} />

      <SvgArrow x1={318} y1={174} x2={318} y2={190} />
      <SvgArrow x1={382} y1={174} x2={382} y2={190} />

      <rect x={292} y={190} width={52} height={26} rx={2} fill={C.greenLight} stroke={C.green} />
      <text x={318} y={206} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.green}>Done</text>

      <rect x={356} y={190} width={52} height={26} rx={2} fill={C.amberLight} stroke={C.amber} />
      <text x={382} y={206} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.amber}>Reject</text>

      <text x={350} y={236} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.muted}>23 variants detected</text>
      <text x={350} y={250} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1}>PROCESS MAP</text>
    </svg>
  );
}
