import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const tool = await prisma.tool.findUnique({
    where: { slug },
    select: { slug: true, websiteUrl: true, affiliateUrl: true },
  });

  if (!tool) {
    return NextResponse.redirect(new URL("/tools", req.url), 302);
  }

  const target = tool.affiliateUrl?.trim() || tool.websiteUrl?.trim();
  if (!target) {
    return NextResponse.redirect(new URL(`/tools/${slug}`, req.url), 302);
  }

  const source = req.nextUrl.searchParams.get("src") || null;
  const referer = req.headers.get("referer") || null;
  const userAgent = req.headers.get("user-agent") || null;
  const isBot = userAgent ? /bot|crawl|spider|preview|facebookexternalhit|slackbot/i.test(userAgent) : false;

  // Fire-and-forget log (don't block redirect on DB latency)
  if (!isBot) {
    prisma.click
      .create({ data: { toolSlug: slug, source, referer, userAgent } })
      .catch(() => {});
  }

  return NextResponse.redirect(target, 302);
}
