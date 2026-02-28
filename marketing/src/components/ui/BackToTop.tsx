"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 inline-flex h-10 w-10 items-center justify-center transition-colors"
      style={{
        border: '1px solid var(--border-mid)',
        background: 'var(--bg)',
        color: 'var(--ink-faint)',
        borderRadius: 0,
      }}
      aria-label="Back to top"
    >
      <ArrowUp style={{ width: 16, height: 16 }} />
    </button>
  );
}
