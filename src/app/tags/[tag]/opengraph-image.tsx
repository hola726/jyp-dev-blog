import { ImageResponse } from "next/og";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { siteConfig } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  const tags = getAllTags();
  return Object.keys(tags).map((tag) => ({ tag }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: "#020617",
          color: "#f1f5f9",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#818cf8",
            }}
          >
            태그
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            #{decodedTag}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#94a3b8",
            }}
          >
            {posts.length}개의 글
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 24, color: "#64748b" }}>
            {siteConfig.title}
          </span>
        </div>
      </div>
    ),
    size
  );
}
