"use client";

import { useState, useEffect } from "react";
import posthog from "posthog-js";

function getStorage(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}

function setStorage(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* private browsing */ }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getStorage("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    setStorage("cookie-consent", "accepted");
    try {
      posthog.opt_in_capturing();
      posthog.set_config({ persistence: "localStorage+cookie" });
    } catch { /* posthog unavailable */ }
    setVisible(false);
  }

  function decline() {
    setStorage("cookie-consent", "declined");
    try { posthog.opt_out_capturing(); } catch { /* posthog unavailable */ }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border)] bg-[var(--bg)] p-[var(--sp-4)]">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="type-body-sm">
          We use cookies to improve your experience. By continuing, you agree to our{" "}
          <a href="/legal/privacy" className="text-[color:var(--emerald)] underline underline-offset-2">privacy policy</a>.
        </p>
        <div className="flex gap-[var(--sp-2)]">
          <button onClick={decline} className="btn btn-ghost">Decline</button>
          <button onClick={accept} className="btn btn-primary">Accept</button>
        </div>
      </div>
    </div>
  );
}
