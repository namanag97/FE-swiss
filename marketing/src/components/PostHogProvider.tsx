"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect, useCallback } from "react";

function hasConsent(): boolean {
  try { return localStorage.getItem("cookie-consent") === "accepted"; } catch { return false; }
}

export function initPostHog() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key || posthog.__loaded) return;

  try {
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      capture_pageview: false,
      capture_pageleave: true,
      persistence: "localStorage+cookie",
    });
  } catch { /* posthog init failed */ }
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const checkConsent = useCallback(() => {
    if (hasConsent()) initPostHog();
  }, []);

  useEffect(() => {
    checkConsent();

    // Re-check when consent changes (CookieConsent writes to localStorage)
    function onStorage(e: StorageEvent) {
      if (e.key === "cookie-consent" && e.newValue === "accepted") initPostHog();
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [checkConsent]);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
