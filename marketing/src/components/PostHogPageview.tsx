"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import posthog from "posthog-js";
import { captureMarketingEvent, getAttribution, storeAttribution } from "@/lib/analytics";

export function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    storeAttribution();
    if (pathname && posthog) {
      let url = window.origin + pathname;
      const search = searchParams.toString();
      if (search) url += `?${search}`;
      posthog.capture("$pageview", { ...getAttribution(), $current_url: url });
      const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
      if (blogMatch) {
        captureMarketingEvent("blog_article_viewed", {
          slug: blogMatch[1],
          url,
        });
      }
    }
  }, [pathname, searchParams]);

  return null;
}
