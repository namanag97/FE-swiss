import { C } from "@/lib/colors";

export function NotFoundSvg() {
  const steps = [
    { label: "Request", sub: "incoming", active: false },
    { label: "Route", sub: "pattern", active: false },
    { label: "Lookup", sub: "search", active: false },
    { label: "404", sub: "no match", active: true },
  ];
  return (
    <svg viewBox="0 0 480 80" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="404 flow showing request, route lookup, and no match result" style={{ width: "100%", maxWidth: 480, height: "auto" }}>
      {steps.map((s, i) => {
        const x = i * 120;
        const isFail = i === 3;
        return (
          <g key={s.label}>
            <rect x={x} y={8} width={96} height={36} rx={2} fill={isFail ? C.amberLight : C.white} stroke={isFail ? C.amber : C.border} strokeWidth={isFail ? 1.5 : 1} />
            <text x={x + 48} y={30} textAnchor="middle" dominantBaseline="middle" fontSize={11} fontFamily="Inter, system-ui, sans-serif" fontWeight={isFail ? 600 : 400} fill={isFail ? "#b45309" : C.text}>{s.label}</text>
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
