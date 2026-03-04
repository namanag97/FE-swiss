import { C } from "@/lib/colors";

export function ArchitectureSvg() {
  const lx = 24;
  const rw = 472;
  return (
    <svg viewBox="0 0 520 320" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Meridian platform architecture: UI layer, process mining engine, event log store, and connectors" style={{ width: "100%", height: "auto" }}>
      {/* Outer frame */}
      <rect x={lx} y={8} width={rw} height={304} rx={2} fill={C.white} stroke={C.border} />

      {/* Title bar */}
      <rect x={lx} y={8} width={rw} height={28} rx={2} fill={C.bg} stroke={C.border} />
      <text x={260} y={26} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.muted} letterSpacing={1.5}>MERIDIAN PLATFORM</text>

      {/* Layer 1: UI */}
      {[
        { label: "Process Maps", x: 44 },
        { label: "Visual Analytics", x: 200 },
        { label: "AI Insights", x: 356 },
      ].map((mod) => (
        <g key={mod.label}>
          <rect x={mod.x} y={48} width={136} height={36} rx={2} fill={C.white} stroke={C.border} />
          <text x={mod.x + 68} y={70} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={500} fill={C.text}>{mod.label}</text>
        </g>
      ))}

      {/* Connector lines down */}
      <line x1={112} y1={84} x2={112} y2={100} stroke={C.muted} />
      <line x1={268} y1={84} x2={268} y2={100} stroke={C.muted} />
      <line x1={424} y1={84} x2={424} y2={100} stroke={C.muted} />
      <line x1={112} y1={100} x2={424} y2={100} stroke={C.muted} />
      <line x1={260} y1={100} x2={260} y2={110} stroke={C.muted} />

      {/* Layer 2: Engine */}
      <rect x={44} y={110} width={432} height={48} rx={2} fill={C.greenLight} stroke={C.green} />
      <text x={260} y={130} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.green}>PROCESS MINING ENGINE</text>
      <text x={260} y={146} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.mid}>Alpha · Heuristic · Inductive · Conformance · Prediction</text>

      {/* Connector */}
      <line x1={260} y1={158} x2={260} y2={172} stroke={C.muted} />

      {/* Layer 3: Event Store */}
      <rect x={44} y={172} width={432} height={48} rx={2} fill={C.white} stroke={C.border} />
      <text x={260} y={192} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.text}>EVENT LOG STORE</text>
      <text x={260} y={208} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.mid}>Columnar · Streaming · Indexed</text>

      {/* Connector */}
      <line x1={260} y1={220} x2={260} y2={234} stroke={C.muted} />

      {/* Layer 4: Connectors */}
      <rect x={44} y={234} width={432} height={40} rx={2} fill={C.bg} stroke={C.border} />
      <text x={260} y={250} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.muted} letterSpacing={1}>CONNECTORS</text>
      <text x={260} y={266} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill={C.faint}>SAP · ServiceNow · Salesforce · Jira · Custom</text>
    </svg>
  );
}
