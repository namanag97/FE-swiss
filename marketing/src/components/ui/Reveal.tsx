"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView({ threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Server render + before hydration: show content (no animation).
  // After hydration: animate via IntersectionObserver.
  const visible = !mounted || inView;

  return (
    <div ref={ref} className={`reveal${visible ? " is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}
