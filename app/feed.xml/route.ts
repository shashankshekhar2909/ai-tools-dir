import { prisma } from "@/lib/prisma";
import { getSiteUrl } from "@/lib/site";

export const revalidate = 3600;

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  const baseUrl = getSiteUrl();
  const guides = await prisma.guide.findMany({
    orderBy: { publishedAt: "desc" },
    take: 50,
  });

  const lastBuildDate = guides[0]?.publishedAt ?? new Date();

  const items = guides
    .map(
      (g) => `    <item>
      <title>${escapeXml(g.title)}</title>
      <link>${baseUrl}/guides/${g.slug}</link>
      <guid isPermaLink="true">${baseUrl}/guides/${g.slug}</guid>
      <description>${escapeXml(g.excerpt)}</description>
      <category>${escapeXml(g.type)}</category>
      <pubDate>${new Date(g.publishedAt).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI Stack Lab — Guides</title>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Tested AI tools, workflows, and stacks for people who actually ship.</description>
    <language>en</language>
    <lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=600, s-maxage=3600",
    },
  });
}
