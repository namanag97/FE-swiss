import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform — Process Discovery, Conformance & AI Insights",
  description:
    "From raw event logs to automated action. Process discovery, conformance checking, visual analytics, and AI-powered insights in one platform.",
  alternates: { canonical: "/platform" },
  openGraph: { images: ["/og.png"] },
};

/* ── SVG Color Palette ── */
const C = {
  dark: "#072A20",
  text: "#1a2f28",
  mid: "#4a6259",
  muted: "#7a8f85",
  faint: "#a3b3ab",
  green: "#047A55",
  greenLight: "#e8f5ef",
  border: "#dde3e0",
  white: "#ffffff",
  bg: "#FAFBF8",
} as const;

/* ── Shared SVG helpers ── */
function Node({ x, y, w = 88, h = 32, label, accent }: { x: number; y: number; w?: number; h?: number; label: string; accent?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2} fill={accent ? C.greenLight : C.white} stroke={accent ? C.green : C.border} strokeWidth={1} />
      <text x={x + w / 2} y={y + h / 2 + 1} textAnchor="middle" dominantBaseline="middle" fill={accent ? C.green : C.text} fontSize={11} fontFamily="Inter, system-ui, sans-serif" fontWeight={accent ? 500 : 400}>{label}</text>
    </g>
  );
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;
  const tipX = x2 - ux * 1;
  const tipY = y2 - uy * 1;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.muted} strokeWidth={1} />
      <polygon
        points={`${tipX},${tipY} ${tipX - ux * 6 + uy * 3},${tipY - uy * 6 - ux * 3} ${tipX - ux * 6 - uy * 3},${tipY - uy * 6 + ux * 3}`}
        fill={C.muted}
      />
    </g>
  );
}

/* ── 01 Process Discovery ── */
function DiscoverySvg() {
  return (
    <svg viewBox="0 0 520 310" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Event log table transforming into a process map with 23 variants detected" style={{ width: "100%", height: "auto" }}>
      {/* Event Log Table */}
      <rect x={16} y={16} width={200} height={200} rx={2} fill={C.white} stroke={C.border} />
      <rect x={16} y={16} width={200} height={28} rx={2} fill={C.bg} stroke={C.border} />
      <text x={36} y={34} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.muted} letterSpacing={0.5}>CASE</text>
      <text x={96} y={34} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.muted} letterSpacing={0.5}>ACTIVITY</text>
      <text x={166} y={34} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.muted} letterSpacing={0.5}>TIME</text>
      {[
        ["1001", "Create", "09:01"],
        ["1001", "Review", "09:15"],
        ["1001", "Approve", "10:02"],
        ["1002", "Create", "09:03"],
        ["1002", "Review", "09:22"],
        ["1002", "Reject", "09:45"],
      ].map(([c, a, t], i) => (
        <g key={i}>
          <text x={36} y={62 + i * 24} fontSize={10} fontFamily="'Geist Mono', monospace" fill={C.mid}>{c}</text>
          <text x={96} y={62 + i * 24} fontSize={10} fontFamily="'Geist Mono', monospace" fill={a === "Reject" ? "#b45309" : C.text}>{a}</text>
          <text x={166} y={62 + i * 24} fontSize={10} fontFamily="'Geist Mono', monospace" fill={C.faint}>{t}</text>
          {i < 5 && <line x1={28} y1={68 + i * 24} x2={204} y2={68 + i * 24} stroke={C.border} strokeWidth={0.5} />}
        </g>
      ))}
      <text x={116} y={232} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.muted}>12,847 events</text>

      {/* Arrow */}
      <line x1={232} y1={116} x2={288} y2={116} stroke={C.green} strokeWidth={1.5} strokeDasharray="4 3" />
      <polygon points="292,116 284,112 284,120" fill={C.green} />

      {/* Process Map */}
      <Node x={304} y={32} label="Create" accent />
      <Arrow x1={348} y1={64} x2={348} y2={84} />
      <Node x={304} y={84} label="Review" />
      <Arrow x1={348} y1={116} x2={348} y2={136} />
      <Node x={304} y={136} label="Approve" />

      {/* Branch */}
      <line x1={348} y1={168} x2={348} y2={182} stroke={C.muted} strokeWidth={1} />
      <line x1={348} y1={182} x2={316} y2={182} stroke={C.muted} strokeWidth={1} />
      <line x1={348} y1={182} x2={380} y2={182} stroke={C.muted} strokeWidth={1} />

      <Arrow x1={316} y1={182} x2={316} y2={198} />
      <Arrow x1={380} y1={182} x2={380} y2={198} />

      <rect x={290} y={198} width={52} height={26} rx={2} fill={C.greenLight} stroke={C.green} />
      <text x={316} y={213} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.green}>Done</text>

      <rect x={354} y={198} width={52} height={26} rx={2} fill="#fef3c7" stroke="#b45309" />
      <text x={380} y={213} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill="#b45309">Reject</text>

      <text x={400} y={260} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.muted}>23 variants detected</text>

      {/* Labels */}
      <text x={116} y={258} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1}>EVENT LOG</text>
      <text x={370} y={258} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1}>PROCESS MAP</text>
    </svg>
  );
}

/* ── 02 Conformance ── */
function ConformanceSvg() {
  const nodeW = 76;
  const nodeH = 28;
  const gap = 20;
  const startX = 24;
  const refY = 40;
  const actY = 160;

  const refSteps = ["Order", "Verify", "Approve", "Ship", "Invoice"];
  const actSteps = ["Order", "Verify", "Approve", "Ship", "Invoice"];

  return (
    <svg viewBox="0 0 520 310" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Conformance checking: reference model compared against actual process showing deviations" style={{ width: "100%", height: "auto" }}>
      {/* Reference Model */}
      <text x={startX} y={24} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1}>REFERENCE MODEL</text>
      {refSteps.map((s, i) => {
        const x = startX + i * (nodeW + gap);
        return (
          <g key={`ref-${s}`}>
            <Node x={x} y={refY} w={nodeW} h={nodeH} label={s} />
            {i < refSteps.length - 1 && (
              <Arrow x1={x + nodeW} y1={refY + nodeH / 2} x2={x + nodeW + gap} y2={refY + nodeH / 2} />
            )}
          </g>
        );
      })}
      <line x1={startX} y1={88} x2={500} y2={88} stroke={C.border} strokeWidth={1} strokeDasharray="3 3" />

      {/* Actual Process */}
      <text x={startX} y={140} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.faint} letterSpacing={1}>ACTUAL PROCESS</text>
      {actSteps.map((s, i) => {
        const x = startX + i * (nodeW + gap);
        const isDeviation = false;
        return (
          <g key={`act-${s}`}>
            <Node x={x} y={actY} w={nodeW} h={nodeH} label={s} accent={isDeviation} />
            {i < actSteps.length - 1 && i !== 1 && (
              <Arrow x1={x + nodeW} y1={actY + nodeH / 2} x2={x + nodeW + gap} y2={actY + nodeH / 2} />
            )}
          </g>
        );
      })}

      {/* Deviation branch from Verify */}
      {(() => {
        const vx = startX + 1 * (nodeW + gap); // Verify x
        const ax = startX + 2 * (nodeW + gap); // Approve x
        const devY = actY + 50;
        const devW = 100;
        return (
          <g>
            {/* Normal path from Verify */}
            <line x1={vx + nodeW} y1={actY + nodeH / 2} x2={vx + nodeW + 4} y2={actY + nodeH / 2} stroke={C.muted} strokeWidth={1} />
            {/* Fork down */}
            <line x1={vx + nodeW + 4} y1={actY + nodeH / 2} x2={vx + nodeW + 4} y2={devY + 14} stroke="#b45309" strokeWidth={1.5} />
            {/* Fork right (normal) */}
            <Arrow x1={vx + nodeW + 4} y1={actY + nodeH / 2} x2={ax} y2={actY + nodeH / 2} />

            {/* Deviation node */}
            <rect x={vx + nodeW - 12} y={devY} width={devW} height={nodeH} rx={2} fill="#fef3c7" stroke="#b45309" strokeWidth={1.5} />
            <text x={vx + nodeW - 12 + devW / 2} y={devY + nodeH / 2 + 1} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill="#b45309" fontWeight={500}>Manual Review</text>

            {/* Label */}
            <text x={vx + nodeW - 12 + devW / 2} y={devY + nodeH + 14} textAnchor="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill="#b45309">34% of cases · +4.2 days</text>

            {/* Return arrow from deviation to Approve */}
            <line x1={vx + nodeW - 12 + devW} y1={devY + nodeH / 2} x2={ax + nodeW / 2} y2={devY + nodeH / 2} stroke="#b45309" strokeWidth={1.5} />
            <Arrow x1={ax + nodeW / 2} y1={devY + nodeH / 2} x2={ax + nodeW / 2} y2={actY + nodeH} />
          </g>
        );
      })()}

      {/* Stats bar */}
      <rect x={24} y={270} width={472} height={32} rx={2} fill={C.bg} stroke={C.border} />
      <text x={80} y={290} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.mid}>Conformance <tspan fontWeight={600} fill={C.text}>66%</tspan></text>
      <line x1={160} y1={276} x2={160} y2={296} stroke={C.border} />
      <text x={230} y={290} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.mid}>Deviations <tspan fontWeight={600} fill="#b45309">3</tspan></text>
      <line x1={310} y1={276} x2={310} y2={296} stroke={C.border} />
      <text x={390} y={290} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.mid}>Fitness <tspan fontWeight={600} fill={C.green}>0.82</tspan></text>
    </svg>
  );
}

/* ── 03 Analytics Dashboard ── */
function AnalyticsSvg() {
  return (
    <svg viewBox="0 0 520 310" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="KPI dashboard showing cycle time, throughput, on-time metrics and variant distribution" style={{ width: "100%", height: "auto" }}>
      {/* Dashboard frame */}
      <rect x={8} y={8} width={504} height={294} rx={2} fill={C.white} stroke={C.border} />
      <rect x={8} y={8} width={504} height={28} rx={2} fill={C.bg} stroke={C.border} />
      <text x={24} y={26} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.muted} letterSpacing={1}>KPI DASHBOARD</text>
      <circle cx={488} cy={22} r={4} fill={C.greenLight} stroke={C.green} strokeWidth={1} />

      {/* KPI Cards */}
      {[
        { label: "Cycle Time", value: "4.2d", change: "12%", down: true, x: 24 },
        { label: "Throughput", value: "847/d", change: "8%", down: false, x: 188 },
        { label: "On-Time", value: "78%", change: "5%", down: false, x: 352 },
      ].map((kpi) => (
        <g key={kpi.label}>
          <rect x={kpi.x} y={48} width={148} height={64} rx={2} fill={C.white} stroke={C.border} />
          <text x={kpi.x + 12} y={66} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={500} fill={C.muted} letterSpacing={0.3}>{kpi.label}</text>
          <text x={kpi.x + 12} y={90} fontSize={22} fontFamily="Inter, system-ui, sans-serif" fontWeight={300} fill={C.dark}>{kpi.value}</text>
          <text x={kpi.x + 12} y={104} fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={500} fill={kpi.down ? "#b45309" : C.green}>
            {kpi.down ? "↓" : "↑"} {kpi.change}
          </text>
        </g>
      ))}

      {/* Variant Distribution */}
      <text x={24} y={140} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.muted} letterSpacing={1}>VARIANT DISTRIBUTION</text>

      {/* Bars */}
      {[
        { label: "Happy path", pct: 66, color: C.green },
        { label: "With review", pct: 24, color: "#d97706" },
        { label: "Rejected", pct: 10, color: "#dc2626" },
      ].map((v, i) => {
        const y = 156 + i * 38;
        return (
          <g key={v.label}>
            <text x={24} y={y + 6} fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.mid}>{v.label}</text>
            <text x={488} y={y + 6} textAnchor="end" fontSize={10} fontFamily="'Geist Mono', monospace" fontWeight={500} fill={C.text}>{v.pct}%</text>
            <rect x={24} y={y + 12} width={440} height={8} rx={1} fill={C.bg} stroke={C.border} strokeWidth={0.5} />
            <rect x={24} y={y + 12} width={440 * v.pct / 100} height={8} rx={1} fill={v.color} opacity={0.7} />
          </g>
        );
      })}

      {/* Mini sparkline */}
      <text x={24} y={276} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.muted} letterSpacing={1}>THROUGHPUT — 30D</text>
      <polyline
        points="24,294 60,290 96,286 132,288 168,282 204,278 240,284 276,276 312,272 348,268 384,274 420,264 456,260 488,256"
        fill="none"
        stroke={C.green}
        strokeWidth={1.5}
      />
    </svg>
  );
}

/* ── 04 AI Insights ── */
function AiInsightsSvg() {
  return (
    <svg viewBox="0 0 520 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      {/* Panel frame */}
      <rect x={8} y={8} width={504} height={304} rx={2} fill={C.white} stroke={C.border} />

      {/* Alert header */}
      <rect x={8} y={8} width={504} height={36} rx={2} fill="#fef3c7" stroke="#f59e0b" strokeWidth={0.5} />
      <text x={36} y={30} fontSize={11} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill="#92400e">⚠ ANOMALY DETECTED</text>
      <text x={480} y={30} textAnchor="end" fontSize={9} fontFamily="'Geist Mono', monospace" fill="#b45309">CASE #4,821</text>

      {/* Case info */}
      <text x={24} y={68} fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={500} fill={C.text}>Invoice Processing — Unusual rework loop</text>

      {/* Pattern detail */}
      <rect x={24} y={80} width={472} height={48} rx={2} fill={C.bg} stroke={C.border} />
      <text x={36} y={98} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.muted} letterSpacing={0.5}>PATTERN</text>

      {/* Mini flow inside pattern box */}
      <Node x={36} y={104} w={64} h={20} label="Review" />
      <Arrow x1={100} y1={114} x2={112} y2={114} />
      <rect x={112} y={104} width={56} height={20} rx={2} fill="#fef3c7" stroke="#b45309" />
      <text x={140} y={116} textAnchor="middle" dominantBaseline="middle" fontSize={9} fontFamily="Inter, system-ui, sans-serif" fill="#b45309">Reject</text>
      <Arrow x1={168} y1={114} x2={180} y2={114} />
      <Node x={180} y={104} w={64} h={20} label="Review" />
      <text x={280} y={116} fontSize={10} fontFamily="'Geist Mono', monospace" fill={C.mid}>× 3 iterations (avg: 1.1)</text>

      {/* Prediction box */}
      <rect x={24} y={142} width={472} height={80} rx={2} fill={C.white} stroke={C.green} strokeWidth={1.5} />
      <rect x={24} y={142} width={472} height={24} rx={2} fill={C.greenLight} stroke={C.green} strokeWidth={0.5} />
      <text x={36} y={158} fontSize={9} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.green} letterSpacing={1}>PREDICTION</text>

      <text x={36} y={184} fontSize={11} fontFamily="Inter, system-ui, sans-serif" fill={C.text}>SLA Breach Probability</text>
      <text x={220} y={184} fontSize={14} fontFamily="'Geist Mono', monospace" fontWeight={600} fill="#dc2626">87%</text>

      <text x={300} y={184} fontSize={11} fontFamily="Inter, system-ui, sans-serif" fill={C.text}>Est. Delay</text>
      <text x={400} y={184} fontSize={14} fontFamily="'Geist Mono', monospace" fontWeight={600} fill="#b45309">+2.1 days</text>

      {/* Progress bar for probability */}
      <rect x={36} y={194} width={200} height={6} rx={1} fill={C.bg} />
      <rect x={36} y={194} width={174} height={6} rx={1} fill="#dc2626" opacity={0.7} />

      <text x={36} y={216} fontSize={10} fontFamily="Inter, system-ui, sans-serif" fill={C.green} fontWeight={500}>Recommended: Escalate to Senior Reviewer</text>

      {/* Action buttons */}
      <rect x={24} y={238} width={100} height={32} rx={2} fill={C.dark} stroke={C.dark} />
      <text x={74} y={258} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={600} fill={C.white} letterSpacing={0.5}>Escalate</text>

      <rect x={136} y={238} width={88} height={32} rx={2} fill={C.white} stroke={C.border} />
      <text x={180} y={258} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={500} fill={C.mid}>Dismiss</text>

      <rect x={236} y={238} width={88} height={32} rx={2} fill={C.white} stroke={C.border} />
      <text x={280} y={258} textAnchor="middle" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={500} fill={C.mid}>Details</text>

      {/* Timestamp */}
      <text x={480} y={290} textAnchor="end" fontSize={9} fontFamily="'Geist Mono', monospace" fill={C.faint}>detected 2m ago</text>
    </svg>
  );
}

export default function PlatformPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="gr"
        style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}
      >
        <div className="gi" style={{ textAlign: "center" }}>
          <span className="eyebrow eyebrow-bracket">Platform</span>
          <h1
            className="type-display"
            style={{ marginTop: "var(--sp-3)", maxWidth: 680, margin: "var(--sp-3) auto 0" }}
          >
            From raw event logs to <em>automated action</em>
          </h1>
          <p
            className="type-body"
            style={{
              maxWidth: 560,
              margin: "0 auto",
              marginTop: "var(--sp-4)",
              color: "var(--ink-mid)",
            }}
          >
            Four modules. One platform. Connect your systems, see how work
            actually flows, find what&apos;s broken, fix it — before it costs you.
          </p>
        </div>
      </section>

      {/* Feature 1: Process Discovery */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
          <div className="feature-row">
            <div>
              <span className="eyebrow eyebrow-bracket">01 Discover</span>
              <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
                Process <em>Discovery</em>
              </h2>
              <p style={{ fontFamily: "var(--caslon)", fontStyle: "italic", fontSize: "var(--fs-md)", color: "var(--emerald)", marginTop: "var(--sp-3)", lineHeight: 1.5 }}>
                You&apos;ve never actually seen your own process. Now you will.
              </p>
              <p className="type-body" style={{ marginTop: "var(--sp-3)", color: "var(--ink-mid)" }}>
                Automatically reconstruct process models from event log data. No
                interviews, no workshops, no Post-it walls — just what actually
                happens in your systems.
              </p>
              <ul style={{ marginTop: "var(--sp-4)", listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
                {[
                  "Alpha & Heuristic miners",
                  "Multi-source log correlation",
                  "Variant detection & clustering",
                  "Interactive process maps",
                ].map((item) => (
                  <li key={item} style={{ fontFamily: "var(--body)", fontSize: "var(--fs-sm)", color: "var(--ink-mid)", paddingLeft: "var(--sp-4)", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "var(--emerald)" }}>&rarr;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ border: "1px solid var(--border)", padding: "var(--sp-3)", background: "var(--bg)" }}>
              <DiscoverySvg />
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Conformance Checking */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
          <div className="feature-row feature-row--reverse">
            <div style={{ border: "1px solid var(--border)", padding: "var(--sp-3)", background: "var(--bg)" }}>
              <ConformanceSvg />
            </div>
            <div>
              <span className="eyebrow eyebrow-bracket">02 Diagnose</span>
              <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
                Conformance <em>Checking</em>
              </h2>
              <p style={{ fontFamily: "var(--caslon)", fontStyle: "italic", fontSize: "var(--fs-md)", color: "var(--emerald)", marginTop: "var(--sp-3)", lineHeight: 1.5 }}>
                Here&apos;s what should happen. Here&apos;s what actually happens. Here&apos;s what it costs you.
              </p>
              <p className="type-body" style={{ marginTop: "var(--sp-3)", color: "var(--ink-mid)" }}>
                Overlay your ideal process against reality. Instantly see where
                execution deviates from design — and measure the cost of each
                deviation.
              </p>
              <ul style={{ marginTop: "var(--sp-4)", listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
                {[
                  "Token-based replay analysis",
                  "Deviation classification",
                  "Cost-per-deviation metrics",
                  "Root cause drill-down",
                ].map((item) => (
                  <li key={item} style={{ fontFamily: "var(--body)", fontSize: "var(--fs-sm)", color: "var(--ink-mid)", paddingLeft: "var(--sp-4)", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "var(--emerald)" }}>&rarr;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3: Visual Analytics */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
          <div className="feature-row">
            <div>
              <span className="eyebrow eyebrow-bracket">03 Analyze</span>
              <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
                Visual <em>Analytics</em>
              </h2>
              <p style={{ fontFamily: "var(--caslon)", fontStyle: "italic", fontSize: "var(--fs-md)", color: "var(--emerald)", marginTop: "var(--sp-3)", lineHeight: 1.5 }}>
                Click a spike. Land on the exact variant that caused it.
              </p>
              <p className="type-body" style={{ marginTop: "var(--sp-3)", color: "var(--ink-mid)" }}>
                Dashboards built for process data. KPI tracking, variant
                distribution, SLA monitoring — all connected to the process
                layer beneath. Not just charts. Charts that know what happened underneath.
              </p>
              <ul style={{ marginTop: "var(--sp-4)", listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
                {[
                  "Process-aware KPI dashboards",
                  "Variant frequency distribution",
                  "SLA monitoring & alerting",
                  "Throughput time analysis",
                ].map((item) => (
                  <li key={item} style={{ fontFamily: "var(--body)", fontSize: "var(--fs-sm)", color: "var(--ink-mid)", paddingLeft: "var(--sp-4)", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "var(--emerald)" }}>&rarr;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ border: "1px solid var(--border)", padding: "var(--sp-3)", background: "var(--bg)" }}>
              <AnalyticsSvg />
            </div>
          </div>
        </div>
      </section>

      {/* Feature 4: AI Insights */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)" }}>
          <div className="feature-row feature-row--reverse">
            <div style={{ border: "1px solid var(--border)", padding: "var(--sp-3)", background: "var(--bg)" }}>
              <AiInsightsSvg />
            </div>
            <div>
              <span className="eyebrow eyebrow-bracket">04 Transform</span>
              <h2 className="type-h2" style={{ marginTop: "var(--sp-3)" }}>
                AI-Powered <em>Insights</em>
              </h2>
              <p style={{ fontFamily: "var(--caslon)", fontStyle: "italic", fontSize: "var(--fs-md)", color: "var(--emerald)", marginTop: "var(--sp-3)", lineHeight: 1.5 }}>
                It doesn&apos;t just find the problem. It tells you what to do about it.
              </p>
              <p className="type-body" style={{ marginTop: "var(--sp-3)", color: "var(--ink-mid)" }}>
                LLMs that understand process patterns. Predict bottlenecks before
                they happen, detect anomalies, and recommend actions — in plain
                language, not query syntax.
              </p>
              <ul style={{ marginTop: "var(--sp-4)", listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
                {[
                  "Predictive SLA monitoring",
                  "Anomaly detection",
                  "Root cause analysis",
                  "Automated recommendations",
                ].map((item) => (
                  <li key={item} style={{ fontFamily: "var(--body)", fontSize: "var(--fs-sm)", color: "var(--ink-mid)", paddingLeft: "var(--sp-4)", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "var(--emerald)" }}>&rarr;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="gr">
        <div className="h-rule h-rule--bottom" />
        <div className="gi" style={{ paddingTop: 'var(--sp-6)', paddingBottom: 'var(--sp-6)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--sp-4)' }}>
            <Link href="/use-cases" style={{ padding: 'var(--sp-4)', border: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)' }}>Use Cases</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-sm)', color: 'var(--ink)', marginTop: 'var(--sp-1)' }}>See real workflows &rarr;</p>
            </Link>
            <Link href="/security" style={{ padding: 'var(--sp-4)', border: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)' }}>Security</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-sm)', color: 'var(--ink)', marginTop: 'var(--sp-1)' }}>Enterprise-grade security &rarr;</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band">
        <div className="gi" style={{ textAlign: "center", padding: "var(--sp-7) 0" }}>
          <h2 className="type-h2" style={{ color: "var(--white)" }}>
            See your processes <em>for the first time</em>
          </h2>
          <p style={{ fontFamily: "var(--body)", color: "rgba(255,255,255,0.7)", maxWidth: 480, margin: "0 auto", marginTop: "var(--sp-4)" }}>
            Connect your systems. Get your first process map in under an hour.
            No consultants required.
          </p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--sp-5)" }}>
            <Link href="/contact" className="btn btn-primary" style={{ background: "var(--white)", color: "var(--ink-dark)", borderColor: "var(--white)" }}>
              Get Early Access
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
