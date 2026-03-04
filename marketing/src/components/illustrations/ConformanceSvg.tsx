import { C } from "@/lib/colors";
import { SvgNode, SvgArrow } from "@/components/svg/SvgPrimitives";

export function ConformanceSvg() {
  const nodeW = 76;
  const nodeH = 28;
  const gap = 20;
  const startX = 24;
  const refY = 40;
  const actY = 160;

  const steps = ["Order", "Verify", "Approve", "Ship", "Invoice"];

  return (
    <svg viewBox="0 0 520 310" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Conformance checking: reference model compared against actual process showing deviations" style={{ width: "100%", height: "auto" }}>
      {/* Reference Model */}
      <text x={startX} y={24} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1}>REFERENCE MODEL</text>
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
      <line x1={startX} y1={88} x2={500} y2={88} stroke={C.border} strokeWidth={1} strokeDasharray="3 3" />

      {/* Actual Process */}
      <text x={startX} y={140} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1}>ACTUAL PROCESS</text>
      {steps.map((s, i) => {
        const x = startX + i * (nodeW + gap);
        return (
          <g key={`act-${s}`}>
            <SvgNode x={x} y={actY} w={nodeW} h={nodeH} label={s} />
            {i < steps.length - 1 && i !== 1 && (
              <SvgArrow x1={x + nodeW} y1={actY + nodeH / 2} x2={x + nodeW + gap} y2={actY + nodeH / 2} />
            )}
          </g>
        );
      })}

      {/* Deviation branch from Verify */}
      {(() => {
        const vx = startX + 1 * (nodeW + gap);
        const ax = startX + 2 * (nodeW + gap);
        const devY = actY + 50;
        const devW = 100;
        return (
          <g>
            <line x1={vx + nodeW} y1={actY + nodeH / 2} x2={vx + nodeW + 4} y2={actY + nodeH / 2} stroke={C.muted} strokeWidth={1} />
            <line x1={vx + nodeW + 4} y1={actY + nodeH / 2} x2={vx + nodeW + 4} y2={devY + 14} stroke={C.amber} strokeWidth={1.5} />
            <SvgArrow x1={vx + nodeW + 4} y1={actY + nodeH / 2} x2={ax} y2={actY + nodeH / 2} />

            <rect x={vx + nodeW - 12} y={devY} width={devW} height={nodeH} rx={2} fill={C.amberLight} stroke={C.amber} strokeWidth={1.5} />
            <text x={vx + nodeW - 12 + devW / 2} y={devY + nodeH / 2 + 1} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.amber} fontWeight={500}>Manual Review</text>

            <text x={vx + nodeW - 12 + devW / 2} y={devY + nodeH + 14} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.amber}>34% of cases · +4.2 days</text>

            <line x1={vx + nodeW - 12 + devW} y1={devY + nodeH / 2} x2={ax + nodeW / 2} y2={devY + nodeH / 2} stroke={C.amber} strokeWidth={1.5} />
            <SvgArrow x1={ax + nodeW / 2} y1={devY + nodeH / 2} x2={ax + nodeW / 2} y2={actY + nodeH} />
          </g>
        );
      })()}

      {/* Stats bar */}
      <rect x={24} y={270} width={472} height={32} rx={2} fill={C.bg} stroke={C.border} />
      <text x={80} y={290} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.mid}>Conformance <tspan fontWeight={600} fill={C.text}>66%</tspan></text>
      <line x1={160} y1={276} x2={160} y2={296} stroke={C.border} />
      <text x={230} y={290} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.mid}>Deviations <tspan fontWeight={600} fill={C.amber}>3</tspan></text>
      <line x1={310} y1={276} x2={310} y2={296} stroke={C.border} />
      <text x={390} y={290} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.mid}>Fitness <tspan fontWeight={600} fill={C.green}>0.82</tspan></text>
    </svg>
  );
}
