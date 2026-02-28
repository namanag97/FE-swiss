import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center py-32">
      <Container size="content" className="text-center">
        <p className="font-mono text-6xl font-bold text-neutral-200">404</p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-neutral-900">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Go home
        </Link>
      </Container>
    </section>
  );
}
