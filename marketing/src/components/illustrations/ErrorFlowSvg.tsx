import { C } from "@/lib/colors";

export function ErrorFlowSvg() {
  const steps = [
    { label: "Request", sub: "incoming", fail: false },
    { label: "Process", sub: "handler", fail: false },
    { label: "Render", sub: "component", fail: false },
    { label: "Error", sub: "exception", fail: true },
  ];
  return (
    <svg viewBox="0 0 480 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 480, height: "auto" }}>
      {steps.map((s, i) => {
        const x = i * 120;
        return (
          <g key={s.label}>
            <rect x={x} y={8} width={96} height={36} rx={2} fill={s.fail ? C.redLight : C.white} stroke={s.fail ? C.red : C.border} strokeWidth={s.fail ? 1.5 : 1} />
            <text x={x + 48} y={30} textAnchor="middle" dominantBaseline="middle" fontSize={11} fontFamily="Inter, system-ui, sans-serif" fontWeight={s.fail ? 600 : 400} fill={s.fail ? C.red : C.text}>{s.label}</text>
            <text x={x + 48} y={62} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.faint}>{s.sub}</text>
            {i < 3 && (
              <g>
                <line x1={x + 96} y1={26} x2={x + 120} y2={26} stroke={C.muted} />
                <polygon points={`${x + 120},26 ${x + 114},23 ${x + 114},29`} fill={C.muted} />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}
