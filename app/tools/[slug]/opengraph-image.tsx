import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AI Stack Lab tool preview";

export default async function Image({ params }: { params: { slug: string } }) {
  const tool = await prisma.tool.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  const name = tool?.name ?? "AI Stack Lab";
  const desc = tool?.shortDescription ?? "Tested AI tools for people who actually ship.";
  const category = tool?.category?.name ?? "";
  const pricing = tool?.pricingType ?? "";

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
            "linear-gradient(135deg, #0a0a0f 0%, #18181f 60%, #1e1b4b 100%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top — eyebrow */}
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
            AI Stack Lab
          </div>
        </div>

        {/* Middle — name + desc */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#ffffff",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.35,
              color: "#d4d4d8",
              maxWidth: "920px",
            }}
          >
            {desc}
          </div>
        </div>

        {/* Bottom — tags */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {category ? (
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
              {category}
            </div>
          ) : null}
          {pricing ? (
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
              {pricing}
            </div>
          ) : null}
        </div>
      </div>
    ),
    { ...size },
  );
}
