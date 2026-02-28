/** Stylized process map visualization for the homepage hero.
 *  Pure CSS — no images, no JS, renders instantly. */

const nodes = [
  { id: "start", label: "Order\nReceived", x: 60, y: 90, variant: "start" },
  { id: "credit", label: "Credit\nCheck", x: 220, y: 90, variant: "default" },
  { id: "review", label: "Manual\nReview", x: 220, y: 210, variant: "warn" },
  { id: "approve", label: "Approved", x: 380, y: 90, variant: "default" },
  { id: "fulfill", label: "Fulfill", x: 520, y: 90, variant: "default" },
  { id: "ship", label: "Ship", x: 650, y: 90, variant: "default" },
  { id: "invoice", label: "Invoice", x: 780, y: 90, variant: "end" },
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

const variantColors = {
  start: { bg: "bg-terra-50", border: "border-terra-300", text: "text-terra-700" },
  end: { bg: "bg-terra-50", border: "border-terra-300", text: "text-terra-700" },
  warn: { bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-700" },
  default: { bg: "bg-white", border: "border-sand-200", text: "text-sand-700" },
} as const;

export function ProcessMapHero() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-sand-200 bg-white p-1">
      {/* Top bar */}
      <div className="flex items-center gap-4 border-b border-sand-100 px-4 py-2">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-sand-300" />
          <span className="h-2 w-2 rounded-full bg-sand-300" />
          <span className="h-2 w-2 rounded-full bg-sand-300" />
        </div>
        <div className="flex gap-4 text-[10px] font-medium text-sand-400">
          <span className="text-sand-900">Process Map</span>
          <span>Variants</span>
          <span>Analytics</span>
          <span>Conformance</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative overflow-x-auto">
        <svg viewBox="0 0 880 280" className="h-auto w-full min-w-[600px]" fill="none">
          {/* Edges */}
          {edges.map((e) => {
            const from = nodeMap[e.from];
            const to = nodeMap[e.to];
            const fx = from.x + 50;
            const fy = from.y + 20;
            const tx = to.x;
            const ty = to.y + 20;

            // Curved edge for credit->review (downward)
            if (e.from === "credit" && e.to === "review") {
              return (
                <g key={`${e.from}-${e.to}`}>
                  <path
                    d={`M ${fx} ${fy} C ${fx + 40} ${fy}, ${tx - 40} ${ty}, ${tx} ${ty}`}
                    stroke="#d5d0c4"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  {e.label && (
                    <text x={(fx + tx) / 2 + 15} y={(fy + ty) / 2 - 5} className="fill-amber-600 text-[9px] font-medium">
                      {e.label}
                    </text>
                  )}
                </g>
              );
            }
            // Curved edge for review->approve (upward)
            if (e.from === "review" && e.to === "approve") {
              return (
                <g key={`${e.from}-${e.to}`}>
                  <path
                    d={`M ${fx} ${fy} C ${fx + 60} ${fy}, ${tx - 60} ${ty}, ${tx} ${ty}`}
                    stroke="#d5d0c4"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                </g>
              );
            }

            return (
              <g key={`${e.from}-${e.to}`}>
                <line x1={fx} y1={fy} x2={tx} y2={ty} stroke="#d5d0c4" strokeWidth="1.5" />
                <polygon
                  points={`${tx},${ty} ${tx - 6},${ty - 3} ${tx - 6},${ty + 3}`}
                  fill="#d5d0c4"
                />
                {e.label && (
                  <text x={(fx + tx) / 2} y={fy - 8} textAnchor="middle" className="fill-sand-500 text-[9px] font-medium">
                    {e.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Node overlays */}
        <div className="pointer-events-none absolute inset-0 min-w-[600px]" style={{ aspectRatio: "880/280" }}>
          {nodes.map((n) => {
            const v = variantColors[n.variant as keyof typeof variantColors];
            const xPct = (n.x / 880) * 100;
            const yPct = (n.y / 280) * 100;
            const wPct = (100 / 880) * 100;
            const hPct = (40 / 280) * 100;

            return (
              <div
                key={n.id}
                className={`absolute rounded-md border px-2 py-1 ${v.bg} ${v.border}`}
                style={{
                  left: `${xPct}%`,
                  top: `${yPct}%`,
                  width: `${wPct}%`,
                  height: `${hPct}%`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span className={`whitespace-pre-line text-center text-[9px] font-medium leading-tight ${v.text}`}>
                  {n.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom metrics bar */}
      <div className="flex items-center justify-between border-t border-sand-100 px-4 py-2 text-[10px]">
        <div className="flex gap-6">
          <span className="text-sand-400">Cases: <span className="font-medium text-sand-700">12,847</span></span>
          <span className="text-sand-400">Variants: <span className="font-medium text-sand-700">23</span></span>
          <span className="text-sand-400">Avg Duration: <span className="font-medium text-sand-700">4.2 days</span></span>
        </div>
        <div className="flex gap-4">
          <span className="text-sand-400">Bottleneck: <span className="font-medium text-amber-600">Manual Review (34%)</span></span>
        </div>
      </div>
    </div>
  );
}
