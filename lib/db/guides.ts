import { prisma } from "@/lib/prisma";
import { Guide } from "@/lib/types";

type GuideRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  readingTime: string;
  type: string;
  publishedAt: Date;
};

const toGuide = (row: GuideRow): Guide => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  excerpt: row.excerpt,
  content: row.content,
  type: row.type,
  readingTime: row.readingTime,
  publishedAt: row.publishedAt.toISOString().slice(0, 10),
});

export async function getGuides(): Promise<Guide[]> {
  const rows = (await prisma.guide.findMany({
    orderBy: { publishedAt: "desc" },
  })) as GuideRow[];

  return rows.map((row: GuideRow) => toGuide(row));
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  const row = (await prisma.guide.findUnique({ where: { slug } })) as GuideRow | null;
  if (!row) return null;
  return toGuide(row);
}
