"use client";

/* eslint-disable @next/next/no-html-link-for-pages, @typescript-eslint/no-unused-vars */

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, system-ui, sans-serif",
          backgroundColor: "#FAFBF8",
          color: "#2E3B36",
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p
            style={{
              fontSize: 64,
              fontWeight: 200,
              color: "#dde3e0",
              margin: 0,
            }}
          >
            500
          </p>
          <h1 style={{ fontSize: 20, fontWeight: 500, marginTop: 16 }}>
            Something went wrong
          </h1>
          <p style={{ color: "#7a8f85", marginTop: 8, fontSize: 14 }}>
            An unexpected error occurred. Please try again.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              marginTop: 24,
            }}
          >
            <button
              onClick={reset}
              style={{
                padding: "8px 20px",
                fontSize: 12,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                background: "#072A20",
                color: "#FAFBF8",
                border: "1px solid #072A20",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                padding: "8px 20px",
                fontSize: 12,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                background: "transparent",
                color: "#2E3B36",
                border: "1px solid #dde3e0",
                textDecoration: "none",
              }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
