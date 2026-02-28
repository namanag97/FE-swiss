"use client";

import { useState, useEffect } from "react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--bg)',
        padding: 'var(--sp-4)',
      }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p style={{ fontFamily: 'var(--body)', fontSize: 'var(--fs-sm)', fontWeight: 260, color: 'var(--ink-muted)' }}>
          We use cookies to improve your experience. By continuing, you agree to our{" "}
          <a href="/legal/privacy" style={{ color: 'var(--emerald)', textDecoration: 'underline', textUnderlineOffset: 2 }}>privacy policy</a>.
        </p>
        <div className="flex" style={{ gap: 'var(--sp-2)' }}>
          <button onClick={decline} className="btn btn-ghost">Decline</button>
          <button onClick={accept} className="btn btn-primary">Accept</button>
        </div>
      </div>
    </div>
  );
}
