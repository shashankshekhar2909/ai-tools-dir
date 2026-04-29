import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const [tools, categories, guides] = await Promise.all([
    prisma.tool.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.category.findMany({ select: { slug: true } }),
    prisma.guide.findMany({ select: { slug: true, publishedAt: true } }),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/tools`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/stack`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/workflows`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/workflows/build-mvp-with-ai`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/workflows/ai-coding-setup`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/workflows/content-automation`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/compare`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/help`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: tool.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: guide.publishedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...toolPages, ...categoryPages, ...guidePages];
}
