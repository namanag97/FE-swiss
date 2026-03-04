"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";

const EMBED_HEIGHT = 660;
const LOAD_TIMEOUT = 10000;

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
    }, LOAD_TIMEOUT);

    return () => {
      clearTimeout(timeout);
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-[var(--sp-3)] border border-[var(--border)]" style={{ height: EMBED_HEIGHT }}>
        <p className="type-body-sm text-mid">
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
        <a href="mailto:hello@meridian.dev" className="type-label">
          or email hello@meridian.dev
        </a>
      </div>
    );
  }

  return (
    <div style={{ minHeight: EMBED_HEIGHT }}>
      {!loaded && (
        <div className="flex items-center justify-center border border-[var(--border)]" style={{ height: EMBED_HEIGHT }}>
          <p className="type-body-sm text-[color:var(--ink-muted)]">
            Loading scheduler&hellip;
          </p>
        </div>
      )}
      <div
        className="calendly-inline-widget"
        data-url={siteConfig.calendlyUrl}
        style={{ minWidth: 320, height: EMBED_HEIGHT, display: loaded ? "block" : "none" }}
      />
    </div>
  );
}
