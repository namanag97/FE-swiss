import { C } from "@/lib/colors";
import { SvgNode, SvgArrow } from "@/components/svg/SvgPrimitives";

export function O2cSvg() {
  return (
    <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Order-to-Cash process map showing happy path and manual review deviation adding 4.2 days" style={{ width: "100%", height: "auto" }}>
      <text x={240} y={16} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1}>ORDER-TO-CASH</text>

      {/* Main flow */}
      <SvgNode x={24} y={36} label="Order Entry" />
      <SvgArrow x1={104} y1={51} x2={128} y2={51} />
      <SvgNode x={128} y={36} label="Credit Check" />
      <SvgArrow x1={208} y1={51} x2={232} y2={51} />
      <SvgNode x={232} y={36} label="Approve" accent />

      {/* Branch after Approve */}
      <line x1={272} y1={66} x2={272} y2={86} stroke={C.muted} strokeWidth={1} />
      <line x1={160} y1={86} x2={384} y2={86} stroke={C.muted} strokeWidth={1} />

      {/* Left branch: Manual review (deviation) */}
      <SvgArrow x1={160} y1={86} x2={160} y2={106} />
      <SvgNode x={110} y={106} w={100} h={30} label="Manual Review" warn />
      <text x={160} y={150} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.amber}>34% · +4.2 days</text>

      {/* Right branch: Ship */}
      <SvgArrow x1={384} y1={86} x2={384} y2={106} />
      <SvgNode x={344} y={106} label="Ship" accent />
      <text x={384} y={150} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.green}>66% happy path</text>

      {/* Both merge to Invoice */}
      <line x1={160} y1={136} x2={160} y2={180} stroke={C.muted} strokeWidth={1} />
      <line x1={384} y1={136} x2={384} y2={180} stroke={C.muted} strokeWidth={1} />
      <line x1={160} y1={180} x2={384} y2={180} stroke={C.muted} strokeWidth={1} />
      <SvgArrow x1={272} y1={180} x2={272} y2={200} />
      <SvgNode x={232} y={200} label="Invoice" accent />

      <SvgArrow x1={272} y1={230} x2={272} y2={250} />
      <SvgNode x={232} y={250} label="Payment" accent />
    </svg>
  );
}
