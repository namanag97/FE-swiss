import { Container } from "@/components/ui/Container";

export default function BlogPostLoading() {
  return (
    <article className="gr">
      <Container size="wide" style={{ padding: "var(--sp-7) var(--sp-5)" }}>
        {/* Back link */}
        <div style={{ width: 80, height: 16, background: "var(--border)", borderRadius: 2 }} />

        {/* Tags */}
        <div className="mt-8 flex gap-1.5">
          <div style={{ width: 80, height: 22, background: "var(--border)", borderRadius: 2 }} />
          <div style={{ width: 64, height: 22, background: "var(--border)", borderRadius: 2 }} />
        </div>

        {/* Title */}
        <div style={{ marginTop: "var(--sp-3)" }}>
          <div style={{ width: "80%", height: 28, background: "var(--border)", borderRadius: 2 }} />
          <div style={{ width: "50%", height: 28, background: "var(--border)", borderRadius: 2, marginTop: 8 }} />
        </div>

        {/* Meta */}
        <div style={{ marginTop: "var(--sp-3)", display: "flex", gap: "var(--sp-3)" }}>
          <div style={{ width: 100, height: 14, background: "var(--border)", borderRadius: 2 }} />
          <div style={{ width: 80, height: 14, background: "var(--border)", borderRadius: 2 }} />
          <div style={{ width: 60, height: 14, background: "var(--border)", borderRadius: 2 }} />
        </div>

        <div className="divider-h my-8" />

        {/* Body lines */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 680 }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: `${60 + Math.random() * 40}%`,
                height: 14,
                background: "var(--border)",
                borderRadius: 2,
                opacity: 1 - i * 0.05,
              }}
            />
          ))}
        </div>
      </Container>
    </article>
  );
}
