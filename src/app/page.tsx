"use client";

import { useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { DesignSystem } from "@/components/DesignSystem";
import { useStore } from "@/services/store";

export default function Page() {
  const { navigateTo } = useStore();

  // Open the design system view by default
  useEffect(() => {
    navigateTo("DESIGN_SYSTEM");
  }, []);

  return (
    <div className="h-screen w-screen bg-substrate flex font-sans text-braun-900 overflow-hidden selection:bg-braun-900 selection:text-white">
      <Sidebar />
      <div className="pl-20 flex-1 flex flex-col h-full min-w-0 bg-braun-50">
        <Header />
        <main className="flex-1 relative overflow-hidden">
          <div className="h-full w-full animate-in fade-in duration-300">
            <DesignSystem />
          </div>
        </main>
      </div>
    </div>
  );
}
