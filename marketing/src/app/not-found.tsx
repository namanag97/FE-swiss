import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const C = {
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

function NotFoundSvg() {
  const steps = [
    { label: "Request", sub: "incoming", active: false },
    { label: "Route", sub: "pattern", active: false },
    { label: "Lookup", sub: "search", active: false },
    { label: "404", sub: "no match", active: true },
  ];
  return (
    <svg viewBox="0 0 480 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 480, height: "auto" }}>
      {steps.map((s, i) => {
        const x = i * 120;
        const isFail = i === 3;
        return (
          <g key={s.label}>
            <rect x={x} y={8} width={96} height={36} rx={2} fill={isFail ? "#fef3c7" : C.white} stroke={isFail ? "#b45309" : C.border} strokeWidth={isFail ? 1.5 : 1} />
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

export default function NotFound() {
  return (
    <section className="gr" style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)", flex: 1, display: "flex", alignItems: "center" }}>
      <div className="gi" style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "var(--sp-5)" }}>
          <NotFoundSvg />
        </div>
        <p style={{ fontSize: "var(--fs-3xl)", color: "var(--border-nav)", fontFamily: "var(--sans)", fontWeight: 200 }}>404</p>
        <h1 className="type-h3" style={{ marginTop: "var(--sp-3)" }}>Page not found</h1>
        <p className="type-body" style={{ marginTop: "var(--sp-3)", color: "var(--ink-mid)", marginLeft: "auto", marginRight: "auto" }}>
          This page doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: "var(--sp-5)", display: "inline-flex", alignItems: "center", gap: "var(--sp-2)" }}>
          <ArrowLeft style={{ width: 12, height: 12 }} />
          Go home
        </Link>
      </div>
    </section>
  );
}
