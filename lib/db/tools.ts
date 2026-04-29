import { prisma } from "@/lib/prisma";
import { Tool } from "@/lib/types";

type ToolRow = {
  id: string;
  name: string;
  slug: string;
  pricingType: string;
  startingPrice: string | null;
  rating: number;
  shortDescription: string;
  longDescription: string;
  bestFor: string;
  pros: string;
  cons: string;
  useCases: string;
  tags: string;
  websiteUrl: string | null;
  isEditorsPick: boolean;
  isHot: boolean;
  category: { slug: string };
};

const splitList = (value: string): string[] => {
  try {
    const parsed = JSON.parse(value) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const toTool = (row: ToolRow): Tool => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  categorySlug: row.category.slug,
  pricingType: row.pricingType as Tool["pricingType"],
  startingPrice: row.startingPrice ?? undefined,
  rating: row.rating,
  shortDescription: row.shortDescription,
  longDescription: row.longDescription,
  bestFor: row.bestFor,
  pros: splitList(row.pros),
  cons: splitList(row.cons),
  useCases: splitList(row.useCases),
  tags: splitList(row.tags),
  websiteUrl: row.websiteUrl ?? "#",
  isEditorsPick: row.isEditorsPick,
  isHot: row.isHot,
  alternatives: [],
});

function buildToolWhere(filters?: { q?: string; category?: string; pricing?: string; useCase?: string }) {
  return {
    pricingType: filters?.pricing || undefined,
    category: filters?.category ? { slug: filters.category } : undefined,
    useCases: filters?.useCase ? { contains: filters.useCase } : undefined,
    OR: filters?.q
      ? [
          { name: { contains: filters.q } },
          { shortDescription: { contains: filters.q } },
          { tags: { contains: filters.q } },
          { bestFor: { contains: filters.q } },
        ]
      : undefined,
  };
}

export async function getTools(filters?: { q?: string; category?: string; pricing?: string; useCase?: string }): Promise<Tool[]> {
  const rows = (await prisma.tool.findMany({
    where: buildToolWhere(filters),
    include: { category: true },
    orderBy: { rating: "desc" },
  })) as ToolRow[];

  return rows.map((row: ToolRow) => toTool(row));
}

export async function getToolsPage(
  filters: { q?: string; category?: string; pricing?: string; useCase?: string },
  page: number,
  pageSize: number,
): Promise<{ tools: Tool[]; total: number }> {
  const safePage = Math.max(1, page);
  const safePageSize = Math.max(1, Math.min(pageSize, 60));
  const skip = (safePage - 1) * safePageSize;

  const [rows, total] = await Promise.all([
    prisma.tool.findMany({
      where: buildToolWhere(filters),
      include: { category: true },
      orderBy: { rating: "desc" },
      skip,
      take: safePageSize,
    }),
    prisma.tool.count({
      where: buildToolWhere(filters),
    }),
  ]);

  return { tools: (rows as ToolRow[]).map((row: ToolRow) => toTool(row)), total };
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const row = (await prisma.tool.findUnique({ where: { slug }, include: { category: true } })) as ToolRow | null;
  if (!row) return null;
  return toTool(row);
}

export async function getAlternativeTools(categorySlug: string, currentSlug: string): Promise<Tool[]> {
  const rows = (await prisma.tool.findMany({
    where: { category: { slug: categorySlug }, NOT: { slug: currentSlug } },
    include: { category: true },
    take: 3,
    orderBy: { rating: "desc" },
  })) as ToolRow[];
  return rows.map((row: ToolRow) => toTool(row));
}

export async function getEditorsPicks(limit = 4): Promise<Tool[]> {
  const rows = (await prisma.tool.findMany({
    where: { isEditorsPick: true },
    include: { category: true },
    take: limit,
    orderBy: { rating: "desc" },
  })) as ToolRow[];
  return rows.map((row: ToolRow) => toTool(row));
}

export async function getToolCounts(): Promise<{ total: number; free: number }> {
  const total = await prisma.tool.count();
  const free = await prisma.tool.count({ where: { pricingType: "Free" } });
  return { total, free };
}
