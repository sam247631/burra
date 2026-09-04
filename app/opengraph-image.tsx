import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Burra Bristol — Award-Winning Coffee";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#2c1a0e",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Subtle vignette border */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        {/* Decorative line top */}
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 80,
            right: 80,
            height: 1,
            background: "rgba(184,115,42,0.3)",
          }}
        />

        {/* Decorative line bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 80,
            right: 80,
            height: 1,
            background: "rgba(184,115,42,0.3)",
          }}
        />

        {/* Eyebrow */}
        <p
          style={{
            color: "#d4924a",
            fontSize: 16,
            letterSpacing: 10,
            textTransform: "uppercase",
            marginBottom: 28,
            opacity: 0.9,
          }}
        >
          Bristol · Antipodean · Award-Winning
        </p>

        {/* Wordmark */}
        <h1
          style={{
            color: "#f7f3ee",
            fontSize: 120,
            margin: 0,
            letterSpacing: -4,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          Burra
        </h1>

        {/* Divider dot */}
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#d4924a",
            margin: "28px 0",
          }}
        />

        {/* Locations */}
        <p
          style={{
            color: "rgba(247,243,238,0.45)",
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Redland · North Street · Clifton Village
        </p>
      </div>
    ),
    size
  );
}
