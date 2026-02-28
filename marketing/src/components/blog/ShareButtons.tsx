"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  function copyLink() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center" style={{ gap: 'var(--sp-3)' }}>
      <span className="type-label">Share</span>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors"
        style={{
          fontFamily: 'var(--sans)',
          fontSize: 'var(--fs-xs)',
          fontWeight: 400,
          letterSpacing: '.06em',
          textTransform: 'uppercase',
          padding: 'var(--sp-2) var(--sp-3)',
          border: '1px solid var(--border-mid)',
          color: 'var(--ink-muted)',
        }}
      >
        X / Twitter
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors"
        style={{
          fontFamily: 'var(--sans)',
          fontSize: 'var(--fs-xs)',
          fontWeight: 400,
          letterSpacing: '.06em',
          textTransform: 'uppercase',
          padding: 'var(--sp-2) var(--sp-3)',
          border: '1px solid var(--border-mid)',
          color: 'var(--ink-muted)',
        }}
      >
        LinkedIn
      </a>
      <button
        onClick={copyLink}
        className="inline-flex items-center gap-1.5 transition-colors"
        style={{
          fontFamily: 'var(--sans)',
          fontSize: 'var(--fs-xs)',
          fontWeight: 400,
          letterSpacing: '.06em',
          textTransform: 'uppercase',
          padding: 'var(--sp-2) var(--sp-3)',
          border: '1px solid var(--border-mid)',
          color: 'var(--ink-muted)',
          cursor: 'pointer',
          background: 'transparent',
          borderRadius: 0,
        }}
      >
        {copied ? <Check style={{ width: 12, height: 12 }} /> : <Link2 style={{ width: 12, height: 12 }} />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
