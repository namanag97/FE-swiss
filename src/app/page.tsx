"use client";

import { DesignSystem } from "@/components/DesignSystem";

export default function Page() {
  return (
    <div className="h-screen w-screen bg-braun-50 font-sans text-braun-900 overflow-hidden selection:bg-braun-900 selection:text-white">
      <DesignSystem />
    </div>
  );
}
