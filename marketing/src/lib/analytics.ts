"use client";

import posthog from "posthog-js";

const ATTRIBUTION_KEY = "sancalana-attribution";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

type Attribution = Record<string, string>;

function safeLocation() {
  if (typeof window === "undefined") return null;
  return window.location;
}

function storageGet(key: string): string | null {
  try { return window.localStorage.getItem(key); } catch { return null; }
}

function storageSet(key: string, value: string) {
  try { window.localStorage.setItem(key, value); } catch { /* storage unavailable */ }
}

export function getAttribution(): Attribution {
  const stored = storageGet(ATTRIBUTION_KEY);
  if (!stored) return {};
  try {
    const parsed = JSON.parse(stored);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function storeAttribution() {
  const location = safeLocation();
  if (!location) return;

  const params = new URLSearchParams(location.search);
  const current: Attribution = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) current[key] = value;
  }

  const referrer = document.referrer;
  if (referrer) current.referrer = referrer;
  current.landing_page = `${location.pathname}${location.search}`;

  if (Object.keys(current).some((key) => key.startsWith("utm_")) || !storageGet(ATTRIBUTION_KEY)) {
    storageSet(ATTRIBUTION_KEY, JSON.stringify({ ...getAttribution(), ...current }));
  }
}

export function captureMarketingEvent(name: string, properties: Record<string, unknown> = {}) {
  try {
    posthog.capture(name, {
      ...getAttribution(),
      page_path: typeof window === "undefined" ? undefined : window.location.pathname,
      ...properties,
    });
  } catch {
    // Analytics must never break the marketing site.
  }
}
