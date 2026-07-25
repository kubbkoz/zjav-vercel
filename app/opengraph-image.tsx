import { ImageResponse } from "next/og";

export const alt = "ZJAV_ — Rýchle a spoľahlivé weby na mieru";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          backgroundColor: "#06080D",
          backgroundImage:
            "radial-gradient(circle at 75% 30%, rgba(0,207,255,0.25), transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 160,
            fontWeight: 700,
            letterSpacing: -4,
            color: "#F5F7FA",
          }}
        >
          ZJAV<span style={{ color: "#00CFFF" }}>_</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#9CA3AF",
            marginTop: 20,
          }}
        >
          Web, ktorý vás zviditeľní
        </div>
      </div>
    ),
    { ...size }
  );
}
