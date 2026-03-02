"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import posthog from "posthog-js";

const C = {
  text: "#1a2f28",
  muted: "#7a8f85",
  faint: "#a3b3ab",
  border: "#dde3e0",
  white: "#ffffff",
  red: "#dc2626",
  redLight: "#fef2f2",
} as const;

function ErrorFlowSvg() {
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

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    posthog.capture("$exception", {
      $exception_message: error.message,
      $exception_type: error.name,
      $exception_digest: error.digest,
    });
  }, [error]);

  return (
    <section
      className="gr"
      style={{
        paddingTop: "var(--sp-7)",
        paddingBottom: "var(--sp-7)",
        flex: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="gi" style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "var(--sp-5)" }}>
          <ErrorFlowSvg />
        </div>
        <p
          style={{
            fontSize: "var(--fs-3xl)",
            color: "var(--border-nav)",
            fontFamily: "var(--sans)",
            fontWeight: 200,
          }}
        >
          500
        </p>
        <h1 className="type-h3" style={{ marginTop: "var(--sp-3)" }}>
          Something went wrong
        </h1>
        <p
          className="type-body"
          style={{
            marginTop: "var(--sp-3)",
            color: "var(--ink-mid)",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          An unexpected error occurred. Please try again.
        </p>
        <div
          style={{
            display: "flex",
            gap: "var(--sp-3)",
            justifyContent: "center",
            marginTop: "var(--sp-5)",
          }}
        >
          <button
            onClick={reset}
            className="btn btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--sp-2)",
            }}
          >
            <RotateCcw style={{ width: 12, height: 12 }} />
            Try again
          </button>
          <Link
            href="/"
            className="btn btn-ghost"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--sp-2)",
            }}
          >
            <ArrowLeft style={{ width: 12, height: 12 }} />
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
}
