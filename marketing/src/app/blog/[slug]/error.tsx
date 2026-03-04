"use client";

import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function BlogPostError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <article className="gr">
      <Container size="wide" className="section-pad">
        <div className="text-center py-[var(--sp-7)]">
          <p className="font-[var(--sans)] text-[var(--fs-3xl)] text-[var(--border-nav)] font-extralight">
            Error
          </p>
          <h1 className="type-h3 mt-3">
            Failed to load this post
          </h1>
          <p className="type-body mt-3 text-mid">
            Something went wrong while rendering this article. Please try again.
          </p>
          <div className="flex gap-[var(--sp-3)] justify-center mt-5">
            <button onClick={reset} className="btn btn-primary">
              <RotateCcw className="w-3 h-3" />
              Try again
            </button>
            <Link href="/blog" className="btn btn-ghost">
              <ArrowLeft className="w-3 h-3" />
              All posts
            </Link>
          </div>
        </div>
      </Container>
    </article>
  );
}
