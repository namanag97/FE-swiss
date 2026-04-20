"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";
import { captureMarketingEvent } from "@/lib/analytics";

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

    function onMessage(event: MessageEvent) {
      if (event.origin !== "https://calendly.com") return;
      const calendlyEvent = typeof event.data === "object" && event.data !== null
        ? (event.data as { event?: string }).event
        : "";
      if (calendlyEvent === "calendly.date_and_time_selected") {
        captureMarketingEvent("calendar_booking_started");
      }
      if (calendlyEvent === "calendly.event_scheduled") {
        captureMarketingEvent("calendar_booking_completed");
      }
    }

    window.addEventListener("message", onMessage);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("message", onMessage);
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
          data-track="calendar_direct_opened"
          data-track-location="calendly-error"
        >
          Open scheduler directly
        </a>
        <a href="mailto:hello@sancalana.com" className="type-label" data-track="contact_mailto_clicked" data-track-location="calendly-error">
          or email hello@sancalana.com
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
