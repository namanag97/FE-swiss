/* eslint-disable react/forbid-dom-props */

import { C } from "@/lib/colors";
import { SvgNode, SvgArrow } from "@/components/svg/SvgPrimitives";

export function P2pSvg() {
  return (
    <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Procure-to-Pay process map showing 3-way match path and maverick buy deviation at 12% off-policy" style={{ width: "100%", height: "auto" }}>
      <text x={240} y={16} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1}>PROCURE-TO-PAY</text>

      <SvgNode x={24} y={36} label="Requisition" />
      <SvgArrow x1={104} y1={51} x2={128} y2={51} />
      <SvgNode x={128} y={36} label="Approve" />
      <SvgArrow x1={208} y1={51} x2={232} y2={51} />
      <SvgNode x={232} y={36} label="PO Create" accent />
      <SvgArrow x1={312} y1={51} x2={336} y2={51} />
      <SvgNode x={336} y={36} label="Receive" />

      {/* Branch after receive */}
      <line x1={376} y1={66} x2={376} y2={100} stroke={C.muted} strokeWidth={1} />
      <line x1={180} y1={100} x2={376} y2={100} stroke={C.muted} strokeWidth={1} />

      {/* Left: 3-way match (good) */}
      <SvgArrow x1={180} y1={100} x2={180} y2={120} />
      <SvgNode x={130} y={120} w={100} h={30} label="3-Way Match" accent />
      <text x={180} y={166} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.green}>88% matched</text>

      {/* Right: Maverick buy (deviation) */}
      <SvgArrow x1={340} y1={100} x2={340} y2={120} />
      <SvgNode x={290} y={120} w={100} h={30} label="Maverick Buy" warn />
      <text x={340} y={166} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.amber}>12% off-policy</text>

      {/* Merge to Payment */}
      <line x1={180} y1={176} x2={180} y2={196} stroke={C.muted} strokeWidth={1} />
      <line x1={340} y1={176} x2={340} y2={196} stroke={C.muted} strokeWidth={1} />
      <line x1={180} y1={196} x2={340} y2={196} stroke={C.muted} strokeWidth={1} />
      <SvgArrow x1={260} y1={196} x2={260} y2={216} />
      <SvgNode x={220} y={216} label="Invoice" />
      <SvgArrow x1={260} y1={246} x2={260} y2={262} />
      <SvgNode x={220} y={262} label="Payment" accent />
    </svg>
  );
}
