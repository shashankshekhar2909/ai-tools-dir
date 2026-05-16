import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AI Stack Lab guide preview";

export default async function Image({ params }: { params: { slug: string } }) {
  const guide = await prisma.guide.findUnique({ where: { slug: params.slug } });
  const title = guide?.title ?? "AI Stack Lab Guide";
  const excerpt = guide?.excerpt ?? "Tested AI tools for people who actually ship.";
  const type = guide?.type ?? "";
  const readingTime = guide?.readingTime ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #18181f 55%, #312e81 100%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "#6366f1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 22,
            }}
          >
            ◆
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#a5b4fc",
            }}
          >
            AI Stack Lab · Guide
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#ffffff",
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: "#d4d4d8",
              maxWidth: "960px",
            }}
          >
            {excerpt}
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {type ? (
            <div
              style={{
                padding: "10px 20px",
                borderRadius: "999px",
                background: "rgba(99, 102, 241, 0.18)",
                border: "1px solid rgba(99, 102, 241, 0.4)",
                color: "#c7d2fe",
                fontSize: 22,
                fontWeight: 500,
              }}
            >
              {type}
            </div>
          ) : null}
          {readingTime ? (
            <div
              style={{
                padding: "10px 20px",
                borderRadius: "999px",
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#e4e4e7",
                fontSize: 22,
                fontWeight: 500,
              }}
            >
              {readingTime}
            </div>
          ) : null}
        </div>
      </div>
    ),
    { ...size },
  );
}
