import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center py-24 md:py-32">
      <Container size="content" className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-neutral-400">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-neutral-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Go home
        </Link>
      </Container>
    </section>
  );
}
