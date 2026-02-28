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
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-gray-600">
          We use cookies to improve your experience. By continuing, you agree to our{" "}
          <a href="/legal/privacy" className="text-forest-900 underline underline-offset-2">privacy policy</a>.
        </p>
        <div className="flex gap-2">
          <button onClick={decline} className="rounded-lg border border-gray-200 px-4 py-1.5 text-[13px] font-medium text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-900">
            Decline
          </button>
          <button onClick={accept} className="rounded-lg bg-forest-900 px-4 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-forest-800">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
