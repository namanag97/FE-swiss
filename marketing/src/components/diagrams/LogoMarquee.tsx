"use client";

const logos = [
  "Siemens", "Bosch", "Maersk", "ABB", "Roche", "Nestlé", "Philips", "Volvo",
];

export function LogoMarquee() {
  const items = [...logos, ...logos];

  return (
    <div className="marquee-wrap">
      <div
        style={{
          fontFamily: "var(--sans)",
          fontSize: "var(--fs-xs)",
          fontWeight: 400,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: "var(--ink-faint)",
          textAlign: "center",
          marginBottom: "var(--sp-3)",
        }}
      >
        Trusted by operations teams at
      </div>
      <div className="marquee-track">
        {items.map((name, i) => (
          <span key={`${name}-${i}`} className="marquee-item">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
