/* eslint-disable react/forbid-dom-props */

import { C } from "@/lib/colors";
import { SvgNode, SvgArrow } from "@/components/svg/SvgPrimitives";

export function ConformanceSvg() {
  const nodeW = 80;
  const nodeH = 28;
  const gap = 14;
  const startX = 20;
  const refY = 36;
  const actY = 152;

  const steps = ["Order", "Verify", "Approve", "Ship", "Invoice"];

  return (
    <svg viewBox="0 0 500 310" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Conformance checking: reference model compared against actual process showing deviations" style={{ width: "100%", height: "auto" }}>
      {/* Reference Model */}
      <text x={startX} y={22} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1}>REFERENCE MODEL</text>
      {steps.map((s, i) => {
        const x = startX + i * (nodeW + gap);
        return (
          <g key={`ref-${s}`}>
            <SvgNode x={x} y={refY} w={nodeW} h={nodeH} label={s} />
            {i < steps.length - 1 && (
              <SvgArrow x1={x + nodeW} y1={refY + nodeH / 2} x2={x + nodeW + gap} y2={refY + nodeH / 2} />
            )}
          </g>
        );
      })}

      {/* Separator */}
      <line x1={startX} y1={84} x2={480} y2={84} stroke={C.border} strokeWidth={1} strokeDasharray="3 3" />

      {/* Actual Process */}
      <text x={startX} y={134} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1}>ACTUAL PROCESS</text>
      {steps.map((s, i) => {
        const x = startX + i * (nodeW + gap);
        return (
          <g key={`act-${s}`}>
            <SvgNode x={x} y={actY} w={nodeW} h={nodeH} label={s} />
            {i < steps.length - 1 && (
              <SvgArrow x1={x + nodeW} y1={actY + nodeH / 2} x2={x + nodeW + gap} y2={actY + nodeH / 2} />
            )}
          </g>
        );
      })}

      {/* Deviation: Verify → Manual Review → Approve (clean routing) */}
      {(() => {
        const approveX = startX + 2 * (nodeW + gap);
        const approveCX = approveX + nodeW / 2;
        const devY = actY + 52;
        const devW = 104;
        const devX = approveCX - devW / 2;
        return (
          <g>
            {/* Down from Approve to Manual Review */}
            <line x1={approveCX} y1={actY + nodeH} x2={approveCX} y2={devY} stroke={C.amber} strokeWidth={1.5} />

            {/* Manual Review box */}
            <rect x={devX} y={devY} width={devW} height={nodeH} rx={2} fill={C.amberLight} stroke={C.amber} strokeWidth={1.5} />
            <text x={approveCX} y={devY + nodeH / 2 + 1} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.amber} fontWeight={500}>Manual Review</text>

            {/* Annotation */}
            <text x={approveCX} y={devY + nodeH + 14} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.amber}>34% of cases · +4.2 days</text>
          </g>
        );
      })()}

      {/* Stats bar */}
      <rect x={20} y={268} width={460} height={32} rx={2} fill={C.bg} stroke={C.border} />
      <text x={90} y={288} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.mid}>Conformance <tspan fontWeight={600} fill={C.text}>66%</tspan></text>
      <line x1={172} y1={274} x2={172} y2={294} stroke={C.border} />
      <text x={250} y={288} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.mid}>Deviations <tspan fontWeight={600} fill={C.amber}>3</tspan></text>
      <line x1={328} y1={274} x2={328} y2={294} stroke={C.border} />
      <text x={400} y={288} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.mid}>Fitness <tspan fontWeight={600} fill={C.green}>0.82</tspan></text>
    </svg>
  );
}
