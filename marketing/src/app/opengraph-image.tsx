import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Meridian — See how your business actually runs.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#072A20",
          color: "#FAFBF8",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo mark */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 22 L16 10 L24 22"
            stroke="#d97757"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="8" cy="22" r="2" fill="#d97757" />
          <circle cx="16" cy="10" r="2" fill="#d97757" />
          <circle cx="24" cy="22" r="2" fill="#d97757" />
        </svg>

        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginTop: 24,
          }}
        >
          Meridian
        </div>

        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: "rgba(250,251,248,0.6)",
            marginTop: 12,
            maxWidth: 600,
            textAlign: "center",
          }}
        >
          See how your business actually runs.
        </div>
      </div>
    ),
    { ...size }
  );
}
