"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import posthog from "posthog-js";
import { ErrorFlowSvg } from "@/components/illustrations";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    posthog.capture("$exception", {
      $exception_message: error.message,
      $exception_type: error.name,
      $exception_digest: error.digest,
    });
  }, [error]);

  return (
    <section className="gr section-pad flex-1 flex items-center">
      <div className="gi text-center">
        <div className="flex justify-center mb-[var(--sp-5)]">
          <ErrorFlowSvg />
        </div>
        <p className="font-[var(--sans)] text-[length:var(--fs-3xl)] text-[color:var(--border-nav)] font-extralight">
          500
        </p>
        <h1 className="type-h3 mt-3">
          Something went wrong
        </h1>
        <p className="type-body mt-3 text-mid mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex gap-[var(--sp-3)] justify-center mt-5">
          <button onClick={reset} className="btn btn-primary">
            <RotateCcw className="w-3 h-3" />
            Try again
          </button>
          <Link href="/" className="btn btn-ghost">
            <ArrowLeft className="w-3 h-3" />
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
}
