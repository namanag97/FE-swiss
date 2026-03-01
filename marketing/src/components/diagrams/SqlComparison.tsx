"use client";

export function SqlComparison() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 0,
        border: "1px solid var(--border-mid)",
      }}
    >
      {/* SQL side */}
      <div
        style={{
          padding: "var(--sp-5)",
          background: "var(--white)",
          borderRight: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--sans)",
            fontSize: 8,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--ink-faint)",
            marginBottom: "var(--sp-4)",
          }}
        >
          Traditional SQL
        </div>

        {/* Terminal mockup */}
        <div
          style={{
            background: "var(--ink-dark)",
            padding: "var(--sp-3) var(--sp-4)",
            fontFamily: "var(--sans)",
            fontSize: "var(--fs-xs)",
            color: "rgba(255,255,255,.6)",
            lineHeight: 1.8,
          }}
        >
          <div>
            <span style={{ color: "rgba(255,255,255,.3)" }}>{">"}</span>{" "}
            <span style={{ color: "rgba(4,122,85,.7)" }}>SELECT</span>{" "}
            <span style={{ color: "rgba(255,255,255,.8)" }}>COUNT</span>
            (*)
          </div>
          <div>
            {"  "}
            <span style={{ color: "rgba(4,122,85,.7)" }}>FROM</span> orders
          </div>
          <div>
            {"  "}
            <span style={{ color: "rgba(4,122,85,.7)" }}>WHERE</span>{" "}
            status = <span style={{ color: "#fcd34d" }}>&apos;late&apos;</span>
          </div>
          <div style={{ marginTop: 12, borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: 8 }}>
            <span style={{ color: "rgba(255,255,255,.3)" }}>→</span>{" "}
            <span style={{ color: "rgba(255,255,255,.9)", fontWeight: 500 }}>847</span>{" "}
            late orders
          </div>
        </div>

        <div
          style={{
            marginTop: "var(--sp-4)",
            fontFamily: "var(--body)",
            fontSize: "var(--fs-xs)",
            color: "var(--ink-faint)",
            lineHeight: 1.6,
          }}
        >
          Tells you <em>what</em> happened.
          <br />
          Flat aggregation. No context.
        </div>
      </div>

      {/* Process Mining side */}
      <div
        style={{
          padding: "var(--sp-5)",
          background: "rgba(4,122,85,.02)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--sans)",
            fontSize: 8,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--emerald)",
            marginBottom: "var(--sp-4)",
          }}
        >
          Process Mining
        </div>

        {/* Mini process flow */}
        <svg viewBox="0 0 220 100" className="h-auto w-full" fill="none">
          {/* Happy path */}
          <rect x={0} y={10} width={50} height={22} fill="rgba(4,122,85,.08)" stroke="var(--emerald)" strokeWidth={0.8} />
          <text x={25} y={24} textAnchor="middle" fill="var(--emerald)" style={{ fontSize: 7, fontFamily: "var(--body)" }}>Order</text>

          <line x1={50} y1={21} x2={70} y2={21} stroke="var(--emerald)" strokeWidth={1} />

          <rect x={70} y={10} width={50} height={22} fill="rgba(4,122,85,.08)" stroke="var(--emerald)" strokeWidth={0.8} />
          <text x={95} y={24} textAnchor="middle" fill="var(--emerald)" style={{ fontSize: 7, fontFamily: "var(--body)" }}>Verify</text>

          <line x1={120} y1={21} x2={140} y2={21} stroke="var(--emerald)" strokeWidth={1} />

          <rect x={140} y={10} width={50} height={22} fill="rgba(4,122,85,.08)" stroke="var(--emerald)" strokeWidth={0.8} />
          <text x={165} y={24} textAnchor="middle" fill="var(--emerald)" style={{ fontSize: 7, fontFamily: "var(--body)" }}>Ship</text>

          {/* Bottleneck branch */}
          <line x1={95} y1={32} x2={95} y2={50} stroke="#d97706" strokeWidth={1} strokeDasharray="3 2" />
          <rect x={60} y={50} width={70} height={22} fill="#fffbeb" stroke="#fcd34d" strokeWidth={0.8} />
          <text x={95} y={64} textAnchor="middle" fill="#92400e" style={{ fontSize: 7, fontFamily: "var(--body)" }}>Bottleneck</text>

          {/* Annotation */}
          <line x1={130} y1={61} x2={155} y2={61} stroke="#d97706" strokeWidth={0.8} />
          <text x={158} y={58} fill="#B45309" style={{ fontSize: 6, fontFamily: "var(--sans)", fontWeight: 500 }}>34% OF CASES</text>
          <text x={158} y={67} fill="#B45309" style={{ fontSize: 6, fontFamily: "var(--sans)" }}>+4.2 DAYS AVG</text>

          {/* Result callout */}
          <rect x={0} y={82} width={220} height={16} fill="rgba(4,122,85,.06)" stroke="var(--emerald)" strokeWidth={0.5} />
          <text x={110} y={93} textAnchor="middle" fill="var(--emerald)" style={{ fontSize: 7, fontFamily: "var(--body)", fontWeight: 500 }}>
            847 late → Manual Review is the root cause
          </text>
        </svg>

        <div
          style={{
            marginTop: "var(--sp-3)",
            fontFamily: "var(--body)",
            fontSize: "var(--fs-xs)",
            color: "var(--emerald)",
            lineHeight: 1.6,
            fontWeight: 500,
          }}
        >
          Shows you <em>why</em> it happened.
          <br />
          Process context. Actionable.
        </div>
      </div>
    </div>
  );
}
