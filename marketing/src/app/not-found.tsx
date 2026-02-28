import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="gr" style={{ paddingTop: 'var(--sp-7)', paddingBottom: 'var(--sp-7)', flex: 1, display: 'flex', alignItems: 'center' }}>
      <div className="gi" style={{ textAlign: 'center' }}>
        <pre className="ascii-art" style={{ marginBottom: 'var(--sp-5)' }}>
{`  ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
  │ REQUEST  │────▶│  ROUTE   │────▶│  LOOKUP  │────▶│   404    │
  │          │     │  MATCH   │     │          │     │ NOT FOUND│
  └──────────┘     └──────────┘     └──────────┘     └──────────┘
   incoming          pattern          search           ✗ no match`}
        </pre>
        <p style={{ fontSize: 'var(--fs-3xl)', color: 'var(--border-nav)', fontFamily: 'var(--sans)', fontWeight: 200 }}>404</p>
        <h1 className="type-h3" style={{ marginTop: 'var(--sp-3)' }}>Page not found</h1>
        <p className="type-body" style={{ marginTop: 'var(--sp-3)', color: 'var(--ink-mid)', marginLeft: 'auto', marginRight: 'auto' }}>
          This page doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: 'var(--sp-5)', display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
          <ArrowLeft style={{ width: 12, height: 12 }} />
          Go home
        </Link>
      </div>
    </section>
  );
}
