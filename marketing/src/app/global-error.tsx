"use client";

/* eslint-disable @next/next/no-html-link-for-pages, @typescript-eslint/no-unused-vars */

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="m-0 flex min-h-screen items-center justify-center bg-[#FAFBF8] font-sans text-[#2E3B36]">
        <div className="p-8 text-center">
          <p className="m-0 text-[64px] font-extralight text-[#D7DAD7]">
            500
          </p>
          <h1 className="mt-4 text-xl font-medium">
            Something went wrong
          </h1>
          <p className="mt-2 text-sm text-[#6B7268]">
            An unexpected error occurred. Please try again.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={reset}
              className="cursor-pointer border border-[#072A20] bg-[#072A20] px-5 py-2 text-xs font-medium uppercase tracking-[0.06em] text-[#FAFBF8]"
            >
              Try again
            </button>
            <a
              href="/"
              className="border border-[#D7DAD7] bg-transparent px-5 py-2 text-xs font-medium uppercase tracking-[0.06em] text-[#2E3B36] no-underline"
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
