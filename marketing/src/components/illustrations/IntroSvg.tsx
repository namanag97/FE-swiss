import { C } from "@/lib/colors";
import { SvgNode, SvgArrow } from "@/components/svg/SvgPrimitives";

export function IntroSvg() {
  return (
    <svg viewBox="0 0 600 280" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Data flow from ERP, CRM, and ITSM systems through event log to process map producing variants, bottlenecks, and deviations" style={{ width: "100%", height: "auto" }}>
      {/* Data sources */}
      <SvgNode x={40} y={20} w={100} h={32} label="Your ERP" />
      <SvgNode x={250} y={20} w={100} h={32} label="Your CRM" />
      <SvgNode x={460} y={20} w={100} h={32} label="Your ITSM" />

      {/* Lines down to merge */}
      <line x1={90} y1={52} x2={90} y2={76} stroke={C.muted} strokeWidth={1} />
      <line x1={300} y1={52} x2={300} y2={76} stroke={C.muted} strokeWidth={1} />
      <line x1={510} y1={52} x2={510} y2={76} stroke={C.muted} strokeWidth={1} />
      <line x1={90} y1={76} x2={510} y2={76} stroke={C.muted} strokeWidth={1} />
      <line x1={300} y1={76} x2={300} y2={90} stroke={C.muted} strokeWidth={1} />
      <polygon points="300,96 296,88 304,88" fill={C.muted} />

      {/* Event Log */}
      <rect x={220} y={96} width={160} height={64} rx={2} fill={C.white} stroke={C.border} />
      <rect x={220} y={96} width={160} height={22} rx={2} fill={C.bg} stroke={C.border} />
      <text x={300} y={111} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.muted} letterSpacing={1}>EVENT LOG</text>
      <text x={240} y={134} fontSize={9} fontFamily="'Geist Mono', monospace" fill={C.faint}>case_id</text>
      <text x={296} y={134} fontSize={9} fontFamily="'Geist Mono', monospace" fill={C.faint}>activity</text>
      <text x={356} y={134} fontSize={9} fontFamily="'Geist Mono', monospace" fill={C.faint}>timestamp</text>
      <text x={240} y={150} fontSize={9} fontFamily="'Geist Mono', monospace" fill={C.mid}>1001</text>
      <text x={296} y={150} fontSize={9} fontFamily="'Geist Mono', monospace" fill={C.mid}>Create</text>
      <text x={356} y={150} fontSize={9} fontFamily="'Geist Mono', monospace" fill={C.mid}>09:01</text>

      {/* Arrow down */}
      <SvgArrow x1={300} y1={160} x2={300} y2={186} />

      {/* Process Map */}
      <SvgNode x={240} y={186} w={120} h={32} label="Process Map" accent />

      {/* Arrow down to outputs */}
      <line x1={300} y1={218} x2={300} y2={232} stroke={C.muted} strokeWidth={1} />
      <line x1={140} y1={232} x2={460} y2={232} stroke={C.muted} strokeWidth={1} />

      {/* Three outputs */}
      <SvgArrow x1={140} y1={232} x2={140} y2={248} />
      <SvgArrow x1={300} y1={232} x2={300} y2={248} />
      <SvgArrow x1={460} y1={232} x2={460} y2={248} />
      <text x={140} y={268} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={500} fill={C.green}>Variants</text>
      <text x={300} y={268} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={500} fill={C.green}>Bottlenecks</text>
      <text x={460} y={268} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={500} fill={C.green}>Deviations</text>
    </svg>
  );
}
