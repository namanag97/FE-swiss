"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";

export function CalendlyEmbed() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
