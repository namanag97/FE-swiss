"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^\w]+/g, "-").replace(/(^-|-$)/g, "");
    headings.push({ id, text, level });
  }
  return headings;
}

export function TableOfContents({ content }: { content: string }) {
  const headings = extractHeadings(content);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 0.1 }
    );
    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <nav className="hidden lg:block" aria-label="Table of contents">
        <p className="type-label">On this page</p>
        <ul className="mt-3 flex flex-col gap-[var(--sp-2)] border-l border-[var(--border)]">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`toc-link -ml-px ${h.level === 3 ? "pl-[var(--sp-5)]" : "pl-[var(--sp-4)]"} ${activeId === h.id ? "toc-link--active" : ""}`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: collapsible */}
      <div className="mb-8 lg:hidden border border-[var(--border)] p-[var(--sp-4)]">
        <button
          onClick={() => setOpen(!open)}
          className="toc-button flex w-full items-center justify-between"
        >
          Table of contents
          <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <ul className="flex flex-col mt-[var(--sp-3)] pt-[var(--sp-3)] border-t border-[var(--border)] gap-[var(--sp-2)]">
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  onClick={() => setOpen(false)}
                  className={`toc-link ${h.level === 3 ? "pl-[var(--sp-4)]" : "pl-0"}`}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
