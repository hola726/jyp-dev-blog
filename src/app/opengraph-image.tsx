import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
          backgroundColor: "#020617",
          color: "#f1f5f9",
          gap: "20px",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {siteConfig.title}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#94a3b8",
          }}
        >
          {siteConfig.description}
        </div>
      </div>
    ),
    size
  );
}
