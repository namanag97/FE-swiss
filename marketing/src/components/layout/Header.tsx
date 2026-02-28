"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <>
      {/* Announcement Banner */}
      <div className="banner">
        <span className="banner-text">Meet us at Gartner 2026 — Mar 9-11 in Orlando</span>
        <div className="banner-dot" />
        <Link href="/contact" className="banner-link">
          Learn more
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5h6M5 2.5L7.5 5 5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Navigation */}
      <header className="nav-wrap sticky top-0 z-50" style={{ background: 'rgba(250,251,248,.94)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-nav)' }}>
        <nav className="relative mx-auto flex items-center justify-between" style={{ height: 'var(--nav-h)', padding: '0 var(--sp-4)', maxWidth: 'var(--max-w)' }}>
          {/* Left/right vertical rails */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-px" style={{ background: 'var(--border)' }} />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-px" style={{ background: 'var(--border)' }} />

          {/* Logo */}
          <Link href="/" className="flex items-center gap-[6px]" style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600, letterSpacing: '-.03em', color: 'var(--ink-dark)' }}>
            <div className="flex shrink-0 items-center justify-center" style={{ width: 18, height: 18, border: '1.5px solid var(--ink-dark)' }}>
              <span className="rounded-full" style={{ width: 6, height: 6, background: 'var(--emerald)' }} />
            </div>
            {siteConfig.name}
          </Link>

          {/* Center links */}
          <div className="hidden items-center md:flex">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1 whitespace-nowrap transition-colors"
                style={{
                  fontFamily: 'var(--body)',
                  fontWeight: 400,
                  fontSize: 'var(--fs-md)',
                  color: path === item.href ? 'var(--emerald)' : 'var(--ink)',
                  padding: '0 var(--sp-4)',
                  height: 'var(--nav-h)',
                  letterSpacing: '-.015em',
                  borderLeft: '1px solid var(--border)',
                }}
              >
                {item.label}
              </Link>
            ))}
            {/* Close the last link border */}
            <div style={{ borderRight: '1px solid var(--border)', height: 'var(--nav-h)' }} />
          </div>

          {/* Actions */}
          <div className="flex items-center" style={{ gap: 'var(--sp-2)' }}>
            <Link href="/contact" data-track="cta-header-start" className="btn btn-ghost hidden md:inline-flex">
              Get Started
            </Link>
            <Link href="/request-demo" data-track="cta-header-demo" className="btn btn-primary hidden md:inline-flex">
              Request Demo
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex h-9 w-9 items-center justify-center md:hidden"
              style={{ color: 'var(--ink)' }}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="border-t px-[30px] pb-5 pt-3 md:hidden" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 transition-colors"
                style={{
                  fontFamily: 'var(--body)',
                  fontSize: 'var(--fs-md)',
                  color: path === item.href ? 'var(--emerald)' : 'var(--ink)',
                }}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-ghost w-full text-center">
                Get Started
              </Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary w-full text-center">
                Request Demo
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
