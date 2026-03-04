"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.prompt("Copy this link:", url);
    }
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-[var(--sp-3)]">
      <span className="type-label">Share</span>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="share-btn"
      >
        X / Twitter
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="share-btn"
      >
        LinkedIn
      </a>
      <button onClick={copyLink} className="share-btn">
        {copied ? <Check className="w-3 h-3" /> : <Link2 className="w-3 h-3" />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
