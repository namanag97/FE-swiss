import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="gr flex flex-1 items-center">
      <Container size="content" className="text-center" style={{ padding: 'var(--sp-7) var(--sp-5)' } as React.CSSProperties}>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-3xl)', fontWeight: 400, color: 'var(--border-nav)' }}>404</p>
        <h1 className="type-h3" style={{ marginTop: 'var(--sp-3)' }}>Page not found</h1>
        <p className="type-body" style={{ marginTop: 'var(--sp-2)', marginLeft: 'auto', marginRight: 'auto' }}>
          This page doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: 'var(--sp-5)' }}>
          <ArrowLeft style={{ width: 12, height: 12 }} />
          Go home
        </Link>
      </Container>
    </section>
  );
}
