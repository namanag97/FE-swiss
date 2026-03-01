"use client";

import { type ReactNode } from "react";

interface BrowserFrameProps {
  tabs?: string[];
  activeTab?: number;
  children: ReactNode;
  className?: string;
  bottomBar?: ReactNode;
}

export function BrowserFrame({
  tabs = [],
  activeTab = 0,
  children,
  className = "",
  bottomBar,
}: BrowserFrameProps) {
  return (
    <div
      className={className}
      style={{
        border: "1px solid var(--border-mid)",
        background: "var(--white)",
        overflow: "hidden",
      }}
    >
      {/* Chrome bar */}
      <div
        className="flex items-center"
        style={{
          gap: "var(--sp-4)",
          borderBottom: "1px solid var(--border)",
          padding: "var(--sp-2) var(--sp-4)",
          background: "var(--white)",
        }}
      >
        <div className="flex" style={{ gap: 6 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#ff5f57",
            }}
          />
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#febc2e",
            }}
          />
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#28c840",
            }}
          />
        </div>
        {tabs.length > 0 && (
          <div className="flex" style={{ gap: "var(--sp-4)" }}>
            {tabs.map((tab, i) => (
              <span
                key={tab}
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: "var(--fs-xs)",
                  fontWeight: 400,
                  color: i === activeTab ? "var(--ink-dark)" : "var(--ink-faint)",
                }}
              >
                {tab}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ background: "var(--bg)" }}>{children}</div>

      {/* Optional bottom metrics bar */}
      {bottomBar && (
        <div
          className="flex items-center justify-between"
          style={{
            borderTop: "1px solid var(--border)",
            padding: "var(--sp-2) var(--sp-4)",
            fontFamily: "var(--sans)",
            fontSize: "var(--fs-xs)",
            fontWeight: 400,
            background: "var(--white)",
          }}
        >
          {bottomBar}
        </div>
      )}
    </div>
  );
}
