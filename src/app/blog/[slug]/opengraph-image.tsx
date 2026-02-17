import { ImageResponse } from "next/og";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#020617",
            color: "#f1f5f9",
            fontSize: 48,
          }}
        >
          {siteConfig.title}
        </div>
      ),
      size
    );
  }

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
              gap: "12px",
            }}
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 20,
                  color: "#818cf8",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#94a3b8",
              lineHeight: 1.5,
            }}
          >
            {post.description}
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
          <span style={{ fontSize: 20, color: "#64748b" }}>
            {post.readingTime}분 읽기
          </span>
        </div>
      </div>
    ),
    size
  );
}
