import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center py-32">
      <Container size="content" className="text-center">
        <p className="font-mono text-5xl font-semibold text-gray-200">404</p>
        <h1 className="mt-3 text-xl font-semibold text-gray-900">Page not found</h1>
        <p className="mt-2 text-[14px] text-gray-500">This page doesn&apos;t exist or has been moved.</p>
        <Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-forest-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-sand-800">
          <ArrowLeft className="h-3.5 w-3.5" />
          Go home
        </Link>
      </Container>
    </section>
  );
}
