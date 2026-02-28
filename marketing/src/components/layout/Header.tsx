"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="text-base font-bold tracking-tight text-forest-900">
          {siteConfig.name}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3.5 py-2 text-[13px] font-medium transition-colors",
                path === item.href ? "text-forest-900" : "text-gray-500 hover:text-gray-900"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/contact" data-track="cta-header-demo" className="hidden rounded-lg border border-gray-200 px-4 py-1.5 text-[13px] font-medium text-gray-700 transition-colors hover:border-gray-300 hover:text-gray-900 md:inline-flex">
            Request Demo
          </Link>
          <Link href="/contact" data-track="cta-header-start" className="hidden rounded-lg bg-forest-900 px-4 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-forest-800 md:inline-flex">
            Get Started
          </Link>
          <button onClick={() => setOpen(!open)} className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 md:hidden" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-gray-100 bg-white px-6 pb-5 pt-3 md:hidden">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2.5 text-sm text-gray-600 hover:text-gray-900">
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2">
            <Link href="/contact" onClick={() => setOpen(false)} className="rounded-lg border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700">
              Request Demo
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="rounded-lg bg-forest-900 px-4 py-2 text-center text-sm font-medium text-white">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
