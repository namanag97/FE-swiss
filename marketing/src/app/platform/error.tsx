"use client";

import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";

export default function PlatformError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="gr">
      <div className="gi section-pad">
        <div className="text-center py-[var(--sp-7)]">
          <p className="font-[var(--sans)] text-[length:var(--fs-3xl)] text-[color:var(--border-nav)] font-extralight">
            Error
          </p>
          <h1 className="type-h3 mt-3">
            Failed to load platform page
          </h1>
          <p className="type-body mt-3 text-mid max-w-none">
            Something went wrong. Please try again.
          </p>
          <div className="flex gap-[var(--sp-3)] justify-center mt-5">
            <button onClick={reset} className="btn btn-primary">
              <RotateCcw className="w-3 h-3" />
              Try again
            </button>
            <Link href="/" className="btn btn-ghost">
              <ArrowLeft className="w-3 h-3" />
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
