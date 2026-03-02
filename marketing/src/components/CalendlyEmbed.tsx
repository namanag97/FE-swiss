"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";

export function CalendlyEmbed() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => setLoaded(true);
    script.onerror = () => setError(true);
    document.head.appendChild(script);

    const timeout = setTimeout(() => {
      if (!loaded) setError(true);
    }, 10000);

    return () => {
      clearTimeout(timeout);
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div
        style={{
          height: 660,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--border)",
          gap: "var(--sp-3)",
        }}
      >
        <p style={{ fontFamily: "var(--sans)", fontSize: "var(--fs-sm)", color: "var(--ink-mid)" }}>
          Unable to load scheduler.
        </p>
        <a
          href={siteConfig.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Open scheduler directly
        </a>
        <a
          href="mailto:hello@meridian.dev"
          style={{ fontFamily: "var(--sans)", fontSize: "var(--fs-xs)", color: "var(--ink-muted)" }}
        >
          or email hello@meridian.dev
        </a>
      </div>
    );
  }

  return (
    <div style={{ minHeight: 660 }}>
      {!loaded && (
        <div
          style={{
            height: 660,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--sans)",
              fontSize: "var(--fs-sm)",
              color: "var(--ink-muted)",
            }}
          >
            Loading scheduler&hellip;
          </p>
        </div>
      )}
      <div
        className="calendly-inline-widget"
        data-url={siteConfig.calendlyUrl}
        style={{ minWidth: 320, height: 660, display: loaded ? "block" : "none" }}
      />
    </div>
  );
}
