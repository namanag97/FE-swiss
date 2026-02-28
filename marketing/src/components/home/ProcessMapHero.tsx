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
  start: { bg: "#f0faf6", border: "#a8dfc8", text: "#1f4235" },
  end: { bg: "#f0faf6", border: "#a8dfc8", text: "#1f4235" },
  warn: { bg: "#fffbeb", border: "#fcd34d", text: "#92400e" },
  default: { bg: "#ffffff", border: "#e5e5e5", text: "#404040" },
} as const;

export function ProcessMapHero() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Top bar */}
      <div className="flex items-center gap-4 border-b border-gray-100 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex gap-4 text-[10px] font-medium">
          <span className="text-forest-900">Process Map</span>
          <span className="text-gray-400">Variants</span>
          <span className="text-gray-400">Analytics</span>
          <span className="text-gray-400">Conformance</span>
        </div>
      </div>

      {/* SVG canvas */}
      <div className="relative overflow-x-auto bg-gray-50/50">
        <svg viewBox="0 0 880 280" className="h-auto w-full min-w-[600px]" fill="none">
          {edges.map((e) => {
            const from = nodeMap[e.from];
            const to = nodeMap[e.to];
            const fx = from.x + 50, fy = from.y + 20;
            const tx = to.x, ty = to.y + 20;

            if (e.from === "credit" && e.to === "review") {
              return (
                <g key={`${e.from}-${e.to}`}>
                  <path d={`M ${fx} ${fy} C ${fx + 40} ${fy}, ${tx - 40} ${ty}, ${tx} ${ty}`} stroke="#d4d4d4" strokeWidth="1.5" strokeDasharray="4 3" />
                  {e.label && <text x={(fx + tx) / 2 + 15} y={(fy + ty) / 2 - 5} className="text-[9px] font-medium" fill="#92400e">{e.label}</text>}
                </g>
              );
            }
            if (e.from === "review" && e.to === "approve") {
              return (
                <g key={`${e.from}-${e.to}`}>
                  <path d={`M ${fx} ${fy} C ${fx + 60} ${fy}, ${tx - 60} ${ty}, ${tx} ${ty}`} stroke="#d4d4d4" strokeWidth="1.5" strokeDasharray="4 3" />
                </g>
              );
            }
            return (
              <g key={`${e.from}-${e.to}`}>
                <line x1={fx} y1={fy} x2={tx} y2={ty} stroke="#d4d4d4" strokeWidth="1.5" />
                <polygon points={`${tx},${ty} ${tx - 6},${ty - 3} ${tx - 6},${ty + 3}`} fill="#d4d4d4" />
                {e.label && <text x={(fx + tx) / 2} y={fy - 8} textAnchor="middle" className="text-[9px] font-medium" fill="#737373">{e.label}</text>}
              </g>
            );
          })}

          {/* Nodes as SVG */}
          {nodes.map((n) => {
            const s = styles[n.type as keyof typeof styles];
            return (
              <g key={n.id}>
                <rect x={n.x} y={n.y} width={100} height={40} rx={6} fill={s.bg} stroke={s.border} strokeWidth={1.5} />
                {n.label.split("\n").map((line, i) => (
                  <text key={i} x={n.x + 50} y={n.y + (n.label.includes("\n") ? 18 + i * 12 : 24)} textAnchor="middle" fill={s.text} className="text-[9px] font-medium">{line}</text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom metrics */}
      <div className="flex items-center justify-between border-t border-gray-100 px-4 py-2.5 text-[10px]">
        <div className="flex gap-6">
          <span className="text-gray-400">Cases: <span className="font-semibold text-gray-700">12,847</span></span>
          <span className="text-gray-400">Variants: <span className="font-semibold text-gray-700">23</span></span>
          <span className="text-gray-400">Avg Duration: <span className="font-semibold text-gray-700">4.2 days</span></span>
        </div>
        <span className="text-gray-400">Bottleneck: <span className="font-semibold text-amber-600">Manual Review (34%)</span></span>
      </div>
    </div>
  );
}
