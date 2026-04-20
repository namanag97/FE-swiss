"use client";

import { useEffect } from "react";
import { captureMarketingEvent, storeAttribution } from "@/lib/analytics";

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

function trackPerformance() {
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  if (nav) {
    captureMarketingEvent("performance_navigation", {
      ttfb_ms: Math.round(nav.responseStart),
      dom_content_loaded_ms: Math.round(nav.domContentLoadedEventEnd),
      load_ms: Math.round(nav.loadEventEnd),
      duration_ms: Math.round(nav.duration),
    });
  }

  let cls = 0;
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) {
        captureMarketingEvent("performance_web_vital", {
          name: "LCP",
          value_ms: Math.round(last.startTime),
        });
      }
    });
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as LayoutShift[]) {
        if (!entry.hadRecentInput) cls += entry.value;
      }
    });
    clsObserver.observe({ type: "layout-shift", buffered: true });

    window.addEventListener("pagehide", () => {
      captureMarketingEvent("performance_web_vital", {
        name: "CLS",
        value: Number(cls.toFixed(4)),
      });
    }, { once: true });
  } catch {
    // PerformanceObserver support varies by browser.
  }
}

export function AnalyticsEvents() {
  useEffect(() => {
    storeAttribution();

    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-track]") : null;
      if (!target) return;

      captureMarketingEvent(target.dataset.track || "cta_clicked", {
        label: target.textContent?.trim().replace(/\s+/g, " ").slice(0, 120),
        href: target instanceof HTMLAnchorElement ? target.href : target.getAttribute("href"),
        location: target.dataset.trackLocation,
      });
    }

    window.addEventListener("click", onClick);
    if (document.readyState === "complete") {
      trackPerformance();
    } else {
      window.addEventListener("load", trackPerformance, { once: true });
    }

    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("load", trackPerformance);
    };
  }, []);

  return null;
}
