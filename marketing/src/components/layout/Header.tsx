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
        <span className="banner-text">Sancalana is now accepting early access requests</span>
        <div className="banner-dot" />
        <Link href="/contact" className="banner-link" data-track="cta_banner_apply_clicked" data-track-location="announcement-banner">
          Apply now
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5h6M5 2.5L7.5 5 5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Navigation */}
      <header className="nav-wrap nav-header sticky top-0 z-50">
        <nav className="relative mx-auto flex items-center justify-between h-[var(--nav-h)] px-[var(--sp-4)] max-w-[var(--max-w)]">
          {/* Left/right vertical rails */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-px bg-[var(--border)]" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-[var(--border)]" />

          {/* Logo */}
          <Link href="/" className="nav-brand">
            <div className="flex shrink-0 items-center justify-center w-[18px] h-[18px] border-[1.5px] border-[var(--ink-dark)]">
              <span className="rounded-full w-[6px] h-[6px] bg-[var(--emerald)]" />
            </div>
            {siteConfig.name}
          </Link>

          {/* Center links */}
          <div className="hidden items-center md:flex">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex h-[var(--nav-h)] items-center gap-1 whitespace-nowrap border-l border-[var(--border)] px-[var(--sp-4)] font-[var(--body)] text-[length:var(--fs-md)] font-normal tracking-[-0.015em] transition-colors ${path === item.href ? "text-[color:var(--emerald)]" : "text-[color:var(--ink)]"}`}
              >
                {item.label}
              </Link>
            ))}
            {/* Close the last link border */}
            <div className="border-r border-[var(--border)] h-[var(--nav-h)]" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-[var(--sp-2)]">
            <Link href="/contact" data-track="cta-header-early-access" className="btn btn-primary hidden md:inline-flex">
              Request early access
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex h-9 w-9 items-center justify-center text-[color:var(--ink)] md:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu — always rendered, animated via max-height */}
        <div
          className={`overflow-hidden border-t border-[var(--border)] bg-[var(--bg)] px-[var(--sp-5)] transition-[max-height,opacity,padding] duration-300 md:hidden ${open ? "max-h-[420px] pb-[var(--sp-5)] pt-[var(--sp-3)] opacity-100" : "max-h-0 py-0 opacity-0"}`}
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block py-[var(--sp-3)] font-[var(--body)] text-[length:var(--fs-md)] transition-colors ${path === item.href ? "text-[color:var(--emerald)]" : "text-[color:var(--ink)]"}`}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-[var(--sp-3)] flex flex-col gap-[var(--sp-2)]">
            <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary w-full text-center" data-track="cta_mobile_header_clicked" data-track-location="mobile-header">
              Request early access
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
