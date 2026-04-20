/* eslint-disable react/forbid-dom-props */

import { C } from "@/lib/colors";

export function ProcessComparisonSvg() {
  const nw = 76;
  const nh = 26;
  return (
    <svg viewBox="0 0 460 280" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Process comparison: ideal linear flow versus messy reality with rework loops and unknown steps" style={{ width: "100%", height: "auto" }}>
      {/* Ideal */}
      <text x={16} y={20} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1}>HOW YOU THINK IT WORKS</text>
      {["Order", "Check", "Approve", "Ship"].map((s, i) => {
        const x = 16 + i * (nw + 24);
        return (
          <g key={`ideal-${s}`}>
            <rect x={x} y={32} width={nw} height={nh} rx={2} fill={C.white} stroke={C.border} />
            <text x={x + nw / 2} y={46} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.text}>{s}</text>
            {i < 3 && (
              <g>
                <line x1={x + nw} y1={45} x2={x + nw + 24} y2={45} stroke={C.muted} />
                <polygon points={`${x + nw + 24},45 ${x + nw + 18},42 ${x + nw + 18},48`} fill={C.muted} />
              </g>
            )}
          </g>
        );
      })}
      <text x={230} y={76} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontStyle="italic" fill={C.faint}>clean, linear, simple</text>

      {/* Divider */}
      <line x1={16} y1={96} x2={444} y2={96} stroke={C.border} strokeDasharray="4 4" />

      {/* Reality */}
      <text x={16} y={124} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.amber} letterSpacing={1}>HOW IT ACTUALLY WORKS</text>

      {/* Order */}
      <rect x={16} y={140} width={nw} height={nh} rx={2} fill={C.white} stroke={C.border} />
      <text x={16 + nw / 2} y={154} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.text}>Order</text>

      {/* Arrow to Check */}
      <line x1={92} y1={153} x2={116} y2={153} stroke={C.muted} />
      <polygon points="116,153 110,150 110,156" fill={C.muted} />

      {/* Check */}
      <rect x={116} y={140} width={nw} height={nh} rx={2} fill={C.white} stroke={C.border} />
      <text x={116 + nw / 2} y={154} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.text}>Check</text>

      {/* Arrow to ??? */}
      <line x1={192} y1={153} x2={216} y2={153} stroke={C.amber} />
      <polygon points="216,153 210,150 210,156" fill={C.amber} />

      {/* ??? node (unknown) */}
      <rect x={216} y={140} width={56} height={nh} rx={2} fill={C.amberLight} stroke={C.amber} strokeWidth={1.5} />
      <text x={244} y={154} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.amber} fontWeight={500}>???</text>

      {/* Rework loop arrow from ??? back to Order */}
      <line x1={244} y1={166} x2={244} y2={196} stroke={C.amber} strokeWidth={1.5} />

      {/* Rework node */}
      <rect x={206} y={196} width={76} height={nh} rx={2} fill={C.amberLight} stroke={C.amber} strokeWidth={1.5} />
      <text x={244} y={210} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.amber} fontWeight={500}>Rework</text>

      {/* Loop back to Order */}
      <line x1={206} y1={209} x2={54} y2={209} stroke={C.amber} strokeWidth={1.5} />
      <line x1={54} y1={209} x2={54} y2={166} stroke={C.amber} strokeWidth={1.5} />
      <polygon points="54,166 50,174 58,174" fill={C.amber} />

      {/* Forward from Rework to Approve */}
      <line x1={282} y1={209} x2={320} y2={209} stroke={C.muted} />
      <polygon points="320,209 314,206 314,212" fill={C.muted} />

      {/* Approve */}
      <rect x={320} y={196} width={nw} height={nh} rx={2} fill={C.greenLight} stroke={C.green} />
      <text x={320 + nw / 2} y={210} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.green}>Approve</text>

      {/* Approve to Ship */}
      <line x1={396} y1={209} x2={420} y2={209} stroke={C.muted} />
      <polygon points="420,209 414,206 414,212" fill={C.muted} />

      {/* Ship */}
      <rect x={420} y={196} width={36} height={nh} rx={2} fill={C.greenLight} stroke={C.green} />
      <text x={438} y={210} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.green}>Ship</text>

      <text x={230} y={252} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontStyle="italic" fill={C.amber}>messy, looping, unknown</text>
    </svg>
  );
}
