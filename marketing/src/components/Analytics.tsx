"use client";

import { Suspense } from "react";
import { PostHogProvider } from "./PostHogProvider";
import { PostHogPageview } from "./PostHogPageview";

export function Analytics({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      <Suspense fallback={null}>
        <PostHogPageview />
      </Suspense>
      {children}
    </PostHogProvider>
  );
}
