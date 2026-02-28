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
        <ul className="mt-3 flex flex-col" style={{ gap: 'var(--sp-2)', borderLeft: '1px solid var(--border)' }}>
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className="block transition-colors"
                style={{
                  fontFamily: 'var(--body)',
                  fontSize: 'var(--fs-sm)',
                  fontWeight: activeId === h.id ? 500 : 260,
                  color: activeId === h.id ? 'var(--ink)' : 'var(--ink-faint)',
                  paddingLeft: h.level === 3 ? 'var(--sp-5)' : 'var(--sp-4)',
                  borderLeft: activeId === h.id ? '2px solid var(--emerald)' : '2px solid transparent',
                  marginLeft: -1,
                }}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: collapsible */}
      <div className="mb-8 lg:hidden" style={{ border: '1px solid var(--border)', padding: 'var(--sp-4)' }}>
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between"
          style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-sm)', fontWeight: 400, color: 'var(--ink)', background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          Table of contents
          <ChevronDown style={{ width: 16, height: 16, transition: 'transform .15s ease', transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
        </button>
        {open && (
          <ul className="flex flex-col" style={{ marginTop: 'var(--sp-3)', paddingTop: 'var(--sp-3)', borderTop: '1px solid var(--border)', gap: 'var(--sp-2)' }}>
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  onClick={() => setOpen(false)}
                  className="block transition-colors"
                  style={{
                    fontFamily: 'var(--body)',
                    fontSize: 'var(--fs-sm)',
                    fontWeight: 260,
                    color: 'var(--ink-muted)',
                    paddingLeft: h.level === 3 ? 'var(--sp-4)' : 0,
                  }}
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
