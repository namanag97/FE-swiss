import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NotFoundSvg } from "@/components/illustrations";

export default function NotFound() {
  return (
    <section className="gr section-pad flex-1 flex items-center">
      <div className="gi text-center">
        <div className="flex justify-center mb-[var(--sp-5)]">
          <NotFoundSvg />
        </div>
        <p className="font-[var(--sans)] text-[length:var(--fs-3xl)] text-[color:var(--border-nav)] font-extralight">404</p>
        <h1 className="type-h3 mt-3">Page not found</h1>
        <p className="type-body mt-3 text-mid mx-auto">
          This page doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary mt-5">
          <ArrowLeft className="w-3 h-3" />
          Go home
        </Link>
      </div>
    </section>
  );
}
