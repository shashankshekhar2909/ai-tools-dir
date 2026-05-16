"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { authenticateAdmin, clearSession, createSession, requireAdmin } from "@/lib/admin/auth";

const parseCsv = (value: FormDataEntryValue | null) =>
  JSON.stringify(
    String(value || "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean),
  );

export async function loginAdminAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const user = await authenticateAdmin(email, password);
  if (!user) {
    redirect("/admin/login?error=invalid_credentials");
  }
  await createSession(user.id);
  redirect("/admin");
}

export async function logoutAdminAction() {
  await clearSession();
  redirect("/admin/login");
}

export async function createCategoryAction(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim();
  if (!name || !slug || !description) return;
  await prisma.category.create({ data: { name, slug, description } });
  revalidatePath("/admin/categories");
}

export async function createGuideAction(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const readingTime = String(formData.get("readingTime") || "").trim();
  const type = String(formData.get("type") || "").trim();
  if (!title || !slug || !excerpt || !content || !readingTime || !type) return;

  await prisma.guide.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      readingTime,
      type,
      publishedAt: new Date(),
    },
  });
  revalidatePath("/admin/guides");
  revalidatePath("/blog");
}

export async function deleteGuideAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.guide.delete({ where: { id } });
  revalidatePath("/admin/guides");
  revalidatePath("/blog");
}

export async function createToolAction(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const categoryId = String(formData.get("categoryId") || "").trim();
  const pricingType = String(formData.get("pricingType") || "Freemium");
  const startingPrice = String(formData.get("startingPrice") || "").trim();
  const rating = Number(formData.get("rating") || 4);
  const shortDescription = String(formData.get("shortDescription") || "").trim();
  const longDescription = String(formData.get("longDescription") || "").trim();
  const bestFor = String(formData.get("bestFor") || "").trim();
  const websiteUrl = String(formData.get("websiteUrl") || "").trim();
  if (!name || !slug || !categoryId || !shortDescription || !longDescription || !bestFor) return;

  await prisma.tool.create({
    data: {
      name,
      slug,
      categoryId,
      pricingType,
      startingPrice,
      rating,
      shortDescription,
      longDescription,
      bestFor,
      websiteUrl,
      pros: parseCsv(formData.get("pros")),
      cons: parseCsv(formData.get("cons")),
      useCases: parseCsv(formData.get("useCases")),
      tags: parseCsv(formData.get("tags")),
      isEditorsPick: Boolean(formData.get("isEditorsPick")),
      isHot: Boolean(formData.get("isHot")),
    },
  });

  revalidatePath("/admin/tools");
  revalidatePath("/tools");
}

export async function updateToolAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;

  await prisma.tool.update({
    where: { id },
    data: {
      name: String(formData.get("name") || "").trim(),
      slug: String(formData.get("slug") || "").trim(),
      categoryId: String(formData.get("categoryId") || "").trim(),
      pricingType: String(formData.get("pricingType") || "Freemium"),
      startingPrice: String(formData.get("startingPrice") || "").trim(),
      rating: Number(formData.get("rating") || 4),
      shortDescription: String(formData.get("shortDescription") || "").trim(),
      longDescription: String(formData.get("longDescription") || "").trim(),
      bestFor: String(formData.get("bestFor") || "").trim(),
      websiteUrl: String(formData.get("websiteUrl") || "").trim(),
      pros: parseCsv(formData.get("pros")),
      cons: parseCsv(formData.get("cons")),
      useCases: parseCsv(formData.get("useCases")),
      tags: parseCsv(formData.get("tags")),
      isEditorsPick: Boolean(formData.get("isEditorsPick")),
      isHot: Boolean(formData.get("isHot")),
    },
  });

  revalidatePath("/admin/tools");
  revalidatePath("/tools");
}

export async function deleteToolAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.tool.delete({ where: { id } });
  revalidatePath("/admin/tools");
  revalidatePath("/tools");
}

export async function createAdminUserAction(formData: FormData) {
  await requireAdmin();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  if (!email || password.length < 8) return;

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.create({
    data: {
      email,
      password: passwordHash,
    },
  });
  revalidatePath("/admin/users");
}

export async function updateAdminPasswordAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "").trim();
  const password = String(formData.get("password") || "");
  if (!id || password.length < 8) return;

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.update({
    where: { id },
    data: { password: passwordHash },
  });
  revalidatePath("/admin/users");
}

export async function deleteAdminUserAction(formData: FormData) {
  const currentUser = await requireAdmin();
  const id = String(formData.get("id") || "").trim();
  if (!id || id === currentUser.id) return;

  const totalUsers = await prisma.adminUser.count();
  if (totalUsers <= 1) return;

  await prisma.adminUser.delete({ where: { id } });
  revalidatePath("/admin/users");
}

// ─── Tool URL sync ────────────────────────────────────────────────────────────
// Mirrors scripts/sync-tool-urls.mjs but runnable from the admin dashboard.

import websiteUrls from "@/data/tool-urls.json";

const defaultToolUrl = (slug: string) => `https://${slug}.com`;
const urlMap = websiteUrls as Record<string, string>;

export async function syncToolUrlsAction() {
  await requireAdmin();
  const tools = await prisma.tool.findMany({
    select: { id: true, slug: true, websiteUrl: true },
  });

  let applied = 0;
  for (const tool of tools) {
    const expected = urlMap[tool.slug] || defaultToolUrl(tool.slug);
    if (tool.websiteUrl !== expected) {
      await prisma.tool.update({ where: { id: tool.id }, data: { websiteUrl: expected } });
      applied++;
    }
  }

  revalidatePath("/admin/tools/health");
  revalidatePath("/admin/tools");
  revalidatePath("/tools");
  redirect(`/admin/tools/health?applied=${applied}`);
}

// ─── Bulk guide import ────────────────────────────────────────────────────────
// Upserts guides by slug. Existing guides updated in place; new ones inserted.

type GuideImportRow = {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  readingTime?: string;
  type?: string;
  publishedAt?: string;
};

export async function bulkImportGuidesAction(formData: FormData) {
  await requireAdmin();
  const raw = String(formData.get("json") || "").trim();
  if (!raw) {
    redirect("/admin/guides/import?error=empty");
  }

  let parsed: GuideImportRow[];
  try {
    const value = JSON.parse(raw);
    parsed = Array.isArray(value) ? value : [value];
  } catch {
    redirect("/admin/guides/import?error=invalid_json");
    return;
  }

  let inserted = 0;
  let updated = 0;
  let skipped = 0;
  const skippedSlugs: string[] = [];

  for (const row of parsed) {
    const title = (row.title || "").trim();
    const slug = (row.slug || "").trim();
    const excerpt = (row.excerpt || "").trim();
    const content = (row.content || "").trim();
    const readingTime = (row.readingTime || "").trim();
    const type = (row.type || "").trim();

    if (!title || !slug || !excerpt || !content || !readingTime || !type) {
      skipped++;
      skippedSlugs.push(slug || title || "(unnamed)");
      continue;
    }

    const publishedAt = row.publishedAt ? new Date(row.publishedAt) : new Date();
    if (isNaN(publishedAt.getTime())) {
      skipped++;
      skippedSlugs.push(`${slug} (bad publishedAt)`);
      continue;
    }

    const data = { title, slug, excerpt, content, readingTime, type, publishedAt };
    const existing = await prisma.guide.findUnique({ where: { slug } });
    if (existing) {
      await prisma.guide.update({ where: { slug }, data });
      updated++;
    } else {
      await prisma.guide.create({ data });
      inserted++;
    }
  }

  revalidatePath("/admin/guides");
  revalidatePath("/blog");
  revalidatePath("/guides");

  const params = new URLSearchParams({
    inserted: String(inserted),
    updated: String(updated),
    skipped: String(skipped),
  });
  if (skippedSlugs.length) {
    params.set("skippedSlugs", skippedSlugs.slice(0, 10).join(","));
  }
  redirect(`/admin/guides/import?${params.toString()}`);
}

// ─── Bulk tool import ─────────────────────────────────────────────────────────
// Accepts a JSON array of partial tool records and upserts by slug. Existing
// tools are updated; new ones are inserted. Safe to run repeatedly.

const DEFAULT_PROS = JSON.stringify([
  "Fast to onboard",
  "Strong output quality",
  "Reliable for daily workflows",
]);
const DEFAULT_CONS = JSON.stringify([
  "Can get expensive at scale",
  "Output still needs human review",
]);

const USE_CASES_BY_CATEGORY: Record<string, string[]> = {
  "ai-assistants": ["Content Writing", "Idea Generation", "General Productivity"],
  coding: ["Coding", "Code Review", "Prototyping"],
  design: ["Design", "Brand Assets", "Prototyping"],
  "video-audio": ["Video Creation", "Voiceovers", "Content Production"],
  research: ["Research", "Fact Checking", "Knowledge Synthesis"],
  automation: ["Automation", "No-code Workflows", "Ops Tasks"],
  business: ["Presentations", "Marketing", "Business Docs"],
  productivity: ["Meeting Notes", "Task Planning", "Team Productivity"],
};

const TAGS_BY_CATEGORY: Record<string, string[]> = {
  "ai-assistants": ["assistant", "chat", "workflow"],
  coding: ["developer", "code", "ide"],
  design: ["image", "ui", "creative"],
  "video-audio": ["video", "audio", "creator"],
  research: ["search", "citation", "analysis"],
  automation: ["workflow", "integration", "ops"],
  business: ["marketing", "presentation", "growth"],
  productivity: ["notes", "planning", "execution"],
};

const priceLabel = (pricing: string) =>
  pricing === "Free" ? "Free" : pricing === "Freemium" ? "$0+" : "$20/mo";

type ImportRow = {
  name?: string;
  slug?: string;
  category?: string;
  categorySlug?: string;
  pricing?: string;
  pricingType?: string;
  rating?: number;
  shortDescription?: string;
  longDescription?: string;
  bestFor?: string;
  websiteUrl?: string;
  isEditorsPick?: boolean;
  isHot?: boolean;
  pros?: string[];
  cons?: string[];
  useCases?: string[];
  tags?: string[];
};

export async function bulkImportToolsAction(formData: FormData) {
  await requireAdmin();
  const raw = String(formData.get("json") || "").trim();
  if (!raw) {
    redirect("/admin/tools/import?error=empty");
  }

  let parsed: ImportRow[];
  try {
    const value = JSON.parse(raw);
    parsed = Array.isArray(value) ? value : [value];
  } catch {
    redirect("/admin/tools/import?error=invalid_json");
    return;
  }

  let inserted = 0;
  let updated = 0;
  let skipped = 0;
  const skippedSlugs: string[] = [];

  for (const row of parsed) {
    const name = (row.name || "").trim();
    const slug = (row.slug || "").trim();
    const categorySlug = (row.categorySlug || row.category || "").trim();
    const pricing = (row.pricingType || row.pricing || "Freemium").trim();
    const rating = typeof row.rating === "number" ? row.rating : 4;
    const shortDescription = (row.shortDescription || "").trim();

    if (!name || !slug || !categorySlug || !shortDescription) {
      skipped++;
      skippedSlugs.push(slug || name || "(unnamed)");
      continue;
    }

    const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
    if (!category) {
      skipped++;
      skippedSlugs.push(`${slug} (no category '${categorySlug}')`);
      continue;
    }

    const data = {
      name,
      slug,
      categoryId: category.id,
      pricingType: pricing,
      startingPrice: priceLabel(pricing),
      rating,
      shortDescription,
      longDescription:
        (row.longDescription || "").trim() ||
        `${name} is a practical tool for builders who need speed without losing quality in production workflows.`,
      bestFor: (row.bestFor || "").trim() || "Founders, developers, and operators shipping fast",
      pros: row.pros && row.pros.length ? JSON.stringify(row.pros) : DEFAULT_PROS,
      cons: row.cons && row.cons.length ? JSON.stringify(row.cons) : DEFAULT_CONS,
      useCases: JSON.stringify(
        row.useCases && row.useCases.length
          ? row.useCases
          : USE_CASES_BY_CATEGORY[categorySlug] || ["General Productivity"],
      ),
      tags: JSON.stringify(
        row.tags && row.tags.length
          ? row.tags
          : ["ai", "builder", ...(TAGS_BY_CATEGORY[categorySlug] || ["workflow"])],
      ),
      websiteUrl: (row.websiteUrl || "").trim() || `https://${slug}.com`,
      isEditorsPick: Boolean(row.isEditorsPick),
      isHot: Boolean(row.isHot),
    };

    const existing = await prisma.tool.findUnique({ where: { slug } });
    if (existing) {
      await prisma.tool.update({ where: { slug }, data });
      updated++;
    } else {
      await prisma.tool.create({ data });
      inserted++;
    }
  }

  revalidatePath("/admin/tools");
  revalidatePath("/tools");

  const params = new URLSearchParams({
    inserted: String(inserted),
    updated: String(updated),
    skipped: String(skipped),
  });
  if (skippedSlugs.length) {
    params.set("skippedSlugs", skippedSlugs.slice(0, 10).join(","));
  }
  redirect(`/admin/tools/import?${params.toString()}`);
}
