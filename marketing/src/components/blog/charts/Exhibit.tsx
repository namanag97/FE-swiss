import { C } from "@/lib/colors";

interface ExhibitProps {
  n: number;
  title: string;
  subtitle?: string;
  source?: string;
  children: React.ReactNode;
}

export function Exhibit({ n, title, subtitle, source, children }: ExhibitProps) {
  return (
    <figure
      style={{
        margin: "2.5em 0",
        padding: 0,
        maxWidth: "100%",
      }}
    >
      <figcaption style={{ marginBottom: "1rem" }}>
        <span
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: C.emerald,
          }}
        >
          Exhibit {n}
        </span>
        <h3
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "1.125rem",
            fontWeight: 400,
            lineHeight: 1.35,
            color: C.ink,
            margin: "0.35rem 0 0 0",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h3>
        {subtitle && (
          <span
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "0.8125rem",
              color: C.muted,
              display: "block",
              marginTop: "0.25rem",
            }}
          >
            {subtitle}
          </span>
        )}
      </figcaption>

      <div
        style={{
          border: `1px solid ${C.border}`,
          borderRadius: "2px",
          padding: "1.5rem",
          background: C.white,
        }}
      >
        {children}
      </div>

      {source && (
        <span
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "0.6875rem",
            color: C.faint,
            display: "block",
            marginTop: "0.5rem",
          }}
        >
          Source: {source}
        </span>
      )}
    </figure>
  );
}
