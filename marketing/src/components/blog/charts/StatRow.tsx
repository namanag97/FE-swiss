import { C } from "@/lib/colors";

export interface StatDatum {
  value: string;
  label: string;
  sublabel?: string;
}

interface StatRowProps {
  data: StatDatum[];
}

export function StatRow({ data }: StatRowProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${data.length}, 1fr)`,
        gap: "1px",
        background: C.border,
        border: `1px solid ${C.border}`,
        borderRadius: "2px",
        overflow: "hidden",
      }}
    >
      {data.map((d) => (
        <div
          key={d.label}
          style={{
            background: C.white,
            padding: "1.25rem 1rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "1.75rem",
              fontWeight: 300,
              color: C.ink,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {d.value}
          </div>
          <div
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              color: C.muted,
              marginTop: "0.5rem",
            }}
          >
            {d.label}
          </div>
          {d.sublabel && (
            <div
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "0.75rem",
                color: C.faint,
                marginTop: "0.2rem",
              }}
            >
              {d.sublabel}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
