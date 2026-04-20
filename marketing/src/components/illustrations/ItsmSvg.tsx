/* eslint-disable react/forbid-dom-props */

import { C } from "@/lib/colors";
import { SvgNode, SvgArrow } from "@/components/svg/SvgPrimitives";

export function ItsmSvg() {
  return (
    <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ITSM ticket lifecycle showing L1 resolution at 72%, L2 escalation at 28%, and L3 escalation at 15%" style={{ width: "100%", height: "auto" }}>
      <text x={240} y={16} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1}>ITSM TICKET LIFECYCLE</text>

      <SvgNode x={180} y={36} w={120} h={30} label="Ticket Create" />
      <SvgArrow x1={240} y1={66} x2={240} y2={86} />
      <SvgNode x={180} y={86} w={120} h={30} label="Triage (L1)" />

      {/* Branch */}
      <line x1={240} y1={116} x2={240} y2={130} stroke={C.muted} strokeWidth={1} />
      <line x1={120} y1={130} x2={360} y2={130} stroke={C.muted} strokeWidth={1} />

      {/* L1 Resolve */}
      <SvgArrow x1={120} y1={130} x2={120} y2={152} />
      <SvgNode x={60} y={152} w={120} h={30} label="Resolve (L1)" accent />
      <text x={120} y={198} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={500} fill={C.green}>72%</text>

      {/* L2 Escalate */}
      <SvgArrow x1={360} y1={130} x2={360} y2={152} />
      <SvgNode x={300} y={152} w={120} h={30} label="Escalate (L2)" />
      <text x={360} y={198} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.mid}>28%</text>

      {/* L2 sub-branch */}
      <line x1={360} y1={206} x2={360} y2={218} stroke={C.muted} strokeWidth={1} />
      <line x1={260} y1={218} x2={440} y2={218} stroke={C.muted} strokeWidth={1} />

      <SvgArrow x1={260} y1={218} x2={260} y2={236} />
      <SvgNode x={200} y={236} w={120} h={30} label="Resolve (L2)" accent />
      <text x={260} y={280} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.green}>85%</text>

      <SvgArrow x1={440} y1={218} x2={440} y2={236} />
      <SvgNode x={380} y={236} w={120} h={30} label="Escalate (L3)" warn />
      <text x={440} y={280} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.amber}>15%</text>
    </svg>
  );
}
