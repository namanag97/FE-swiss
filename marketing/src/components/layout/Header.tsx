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
    <header className="sticky top-0 z-50 border-b border-sand-200/60 bg-white/90 backdrop-blur-lg">
      <nav className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-6">
        <Link href="/" className="text-[15px] font-semibold tracking-tight text-sand-900">
          {siteConfig.name}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors",
                path === item.href
                  ? "text-sand-900"
                  : "text-sand-500 hover:text-sand-900"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-lg bg-sand-900 px-4 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-sand-800 md:inline-flex"
          >
            Request demo
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sand-600 hover:bg-sand-100 md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-sand-100 bg-white px-6 pb-5 pt-3 md:hidden">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-sand-600 hover:text-sand-900"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-lg bg-sand-900 px-4 py-2 text-center text-sm font-medium text-white"
          >
            Request demo
          </Link>
        </div>
      )}
    </header>
  );
}
