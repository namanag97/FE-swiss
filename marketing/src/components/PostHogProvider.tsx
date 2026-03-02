"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    let consent: string | null = null;
    try { consent = localStorage.getItem("cookie-consent"); } catch { /* private browsing */ }

    try {
      posthog.init(key, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        capture_pageview: false,
        capture_pageleave: true,
        persistence: consent === "accepted" ? "localStorage+cookie" : "memory",
      });
    } catch { /* posthog init failed */ }
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
