import { C } from "@/lib/colors";

export function SvgNode({ x, y, w = 80, h = 30, label, accent, warn }: { x: number; y: number; w?: number; h?: number; label: string; accent?: boolean; warn?: boolean }) {
  const fill = warn ? C.amberLight : accent ? C.greenLight : C.white;
  const stroke = warn ? C.amber : accent ? C.green : C.border;
  const textFill = warn ? C.amber : accent ? C.green : C.text;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2} fill={fill} stroke={stroke} strokeWidth={warn || accent ? 1.5 : 1} />
      <text x={x + w / 2} y={y + h / 2 + 1} textAnchor="middle" dominantBaseline="middle" fill={textFill} fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={accent || warn ? 500 : 400}>{label}</text>
    </g>
  );
}

export function SvgArrow({ x1, y1, x2, y2, color }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
  const c = color || C.muted;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={1} />
      <polygon points={`${x2},${y2} ${x2 - ux * 6 + uy * 3},${y2 - uy * 6 - ux * 3} ${x2 - ux * 6 - uy * 3},${y2 - uy * 6 + ux * 3}`} fill={c} />
    </g>
  );
}
