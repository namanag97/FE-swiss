"use client";

import { useInView } from "@/hooks/useInView";

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView({ threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  return (
    <div ref={ref} className={`reveal${inView ? " is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}
