const nodes = [
  { id: "start", label: "Order\nReceived", x: 60, y: 90, type: "start" },
  { id: "credit", label: "Credit\nCheck", x: 220, y: 90, type: "default" },
  { id: "review", label: "Manual\nReview", x: 220, y: 210, type: "warn" },
  { id: "approve", label: "Approved", x: 380, y: 90, type: "default" },
  { id: "fulfill", label: "Fulfill", x: 520, y: 90, type: "default" },
  { id: "ship", label: "Ship", x: 650, y: 90, type: "default" },
  { id: "invoice", label: "Invoice", x: 780, y: 90, type: "end" },
];

const edges = [
  { from: "start", to: "credit", label: "100%" },
  { from: "credit", to: "approve", label: "66%" },
  { from: "credit", to: "review", label: "34%" },
  { from: "review", to: "approve", label: "" },
  { from: "approve", to: "fulfill", label: "" },
  { from: "fulfill", to: "ship", label: "" },
  { from: "ship", to: "invoice", label: "" },
];

const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

const styles = {
  start: { bg: "var(--bg)", border: "var(--border-mid)", text: "var(--ink-dark)" },
  end: { bg: "var(--bg)", border: "var(--border-mid)", text: "var(--ink-dark)" },
  warn: { bg: "#fffbeb", border: "#fcd34d", text: "#92400e" },
  default: { bg: "var(--white)", border: "var(--border-mid)", text: "var(--ink)" },
} as const;

export function ProcessMapHero() {
  return (
    <div style={{ border: '1px solid var(--border)', background: 'var(--white)', overflow: 'hidden' }}>
      {/* Top bar */}
      <div className="flex items-center" style={{ gap: 'var(--sp-4)', borderBottom: '1px solid var(--border)', padding: 'var(--sp-2) var(--sp-4)' }}>
        <div className="flex" style={{ gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <div className="flex" style={{ gap: 'var(--sp-4)', fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', fontWeight: 400 }}>
          <span style={{ color: 'var(--ink-dark)' }}>Process Map</span>
          <span style={{ color: 'var(--ink-faint)' }}>Variants</span>
          <span style={{ color: 'var(--ink-faint)' }}>Analytics</span>
          <span style={{ color: 'var(--ink-faint)' }}>Conformance</span>
        </div>
      </div>

      {/* SVG canvas */}
      <div className="relative overflow-x-auto" style={{ background: 'var(--bg)' }}>
        <svg viewBox="0 0 900 280" className="h-auto w-full min-w-[600px]" fill="none">
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
              <polygon points="0,0 6,3 0,6" fill="var(--border-nav)" />
            </marker>
          </defs>
          {edges.map((e) => {
            const from = nodeMap[e.from];
            const to = nodeMap[e.to];
            const fx = from.x + 50, fy = from.y + 20;
            const tx = to.x, ty = to.y + 20;

            if (e.from === "credit" && e.to === "review") {
              return (
                <g key={`${e.from}-${e.to}`}>
                  <path d={`M ${fx} ${fy} C ${fx + 40} ${fy}, ${tx - 40} ${ty}, ${tx} ${ty}`} stroke="var(--border-nav)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrowhead)" />
                  {e.label && <text x={(fx + tx) / 2 + 15} y={(fy + ty) / 2 - 5} style={{ fontSize: 9, fontWeight: 500 }} fill="#92400e">{e.label}</text>}
                </g>
              );
            }
            if (e.from === "review" && e.to === "approve") {
              return (
                <g key={`${e.from}-${e.to}`}>
                  <path d={`M ${fx} ${fy} C ${fx + 60} ${fy}, ${tx - 60} ${ty}, ${tx} ${ty}`} stroke="var(--border-nav)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrowhead)" />
                </g>
              );
            }
            return (
              <g key={`${e.from}-${e.to}`}>
                <line x1={fx} y1={fy} x2={tx} y2={ty} stroke="var(--border-nav)" strokeWidth="1.5" />
                <polygon points={`${tx},${ty} ${tx - 6},${ty - 3} ${tx - 6},${ty + 3}`} fill="var(--border-nav)" />
                {e.label && <text x={(fx + tx) / 2} y={fy - 8} textAnchor="middle" className="text-[9px] font-medium" fill="var(--ink-faint)">{e.label}</text>}
              </g>
            );
          })}

          {nodes.map((n) => {
            const s = styles[n.type as keyof typeof styles];
            return (
              <g key={n.id}>
                <rect x={n.x} y={n.y} width={100} height={40} rx={0} fill={s.bg} stroke={s.border} strokeWidth={1} />
                {n.label.split("\n").map((line, i) => (
                  <text key={i} x={n.x + 50} y={n.y + (n.label.includes("\n") ? 18 + i * 12 : 24)} textAnchor="middle" fill={s.text} style={{ fontFamily: 'var(--sans)', fontSize: 9, fontWeight: 400 }}>{line}</text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom metrics */}
      <div className="flex items-center justify-between" style={{ borderTop: '1px solid var(--border)', padding: 'var(--sp-2) var(--sp-4)', fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', fontWeight: 400 }}>
        <div className="flex" style={{ gap: 'var(--sp-5)' }}>
          <span style={{ color: 'var(--ink-faint)' }}>Cases: <span style={{ fontWeight: 600, color: 'var(--ink)' }}>12,847</span></span>
          <span style={{ color: 'var(--ink-faint)' }}>Variants: <span style={{ fontWeight: 600, color: 'var(--ink)' }}>23</span></span>
          <span style={{ color: 'var(--ink-faint)' }}>Avg Duration: <span style={{ fontWeight: 600, color: 'var(--ink)' }}>4.2 days</span></span>
        </div>
        <span style={{ color: 'var(--ink-faint)' }}>Bottleneck: <span style={{ fontWeight: 600, color: '#B45309' }}>Manual Review (34%)</span></span>
      </div>
    </div>
  );
}
