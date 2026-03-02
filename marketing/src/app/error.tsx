"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import posthog from "posthog-js";

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
        <pre className="ascii-art" style={{ marginBottom: "var(--sp-5)" }}>
{`  ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
  │ REQUEST  │────▶│  PROCESS │────▶│  RENDER  │────▶│  ERROR   │
  │          │     │          │     │          │     │  ✗ fail  │
  └──────────┘     └──────────┘     └──────────┘     └──────────┘
   incoming          handler          component        exception`}</pre>
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
