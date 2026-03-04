"use client";

import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";

export default function PlatformError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="gr">
      <div className="gi" style={{ padding: "var(--sp-7) var(--sp-5)" }}>
        <div style={{ textAlign: "center", padding: "var(--sp-7) 0" }}>
          <p style={{ fontSize: "var(--fs-3xl)", color: "var(--border-nav)", fontFamily: "var(--sans)", fontWeight: 200 }}>
            Error
          </p>
          <h1 className="type-h3" style={{ marginTop: "var(--sp-3)" }}>
            Failed to load platform page
          </h1>
          <p className="type-body" style={{ marginTop: "var(--sp-3)", color: "var(--ink-mid)", maxWidth: "none" }}>
            Something went wrong. Please try again.
          </p>
          <div style={{ display: "flex", gap: "var(--sp-3)", justifyContent: "center", marginTop: "var(--sp-5)" }}>
            <button onClick={reset} className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "var(--sp-2)" }}>
              <RotateCcw style={{ width: 12, height: 12 }} />
              Try again
            </button>
            <Link href="/" className="btn btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: "var(--sp-2)" }}>
              <ArrowLeft style={{ width: 12, height: 12 }} />
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
