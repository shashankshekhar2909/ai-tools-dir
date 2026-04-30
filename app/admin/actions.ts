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

function parsePositiveInt(value: FormDataEntryValue | null, fallback: number) {
  const parsed = Number(String(value || ""));
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

function buildQuery(params: Record<string, string | number | undefined>) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;
    search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}

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
  redirect(`/admin/categories${buildQuery({ toast: "category_created" })}`);
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
  redirect(`/admin/guides${buildQuery({ toast: "guide_created" })}`);
}

export async function deleteGuideAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.guide.delete({ where: { id } });
  revalidatePath("/admin/guides");
  revalidatePath("/blog");
  redirect(`/admin/guides${buildQuery({ toast: "guide_deleted" })}`);
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
  const page = parsePositiveInt(formData.get("page"), 1);
  const pageSize = parsePositiveInt(formData.get("pageSize"), 20);
  redirect(`/admin/tools${buildQuery({ page, pageSize, toast: "tool_created" })}`);
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
  const page = parsePositiveInt(formData.get("page"), 1);
  const pageSize = parsePositiveInt(formData.get("pageSize"), 20);
  redirect(`/admin/tools${buildQuery({ page, pageSize, toast: "tool_updated" })}`);
}

export async function deleteToolAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  const page = parsePositiveInt(formData.get("page"), 1);
  const pageSize = parsePositiveInt(formData.get("pageSize"), 20);

  await prisma.tool.delete({ where: { id } });
  revalidatePath("/admin/tools");
  const remaining = await prisma.tool.count();
  const maxPage = Math.max(1, Math.ceil(remaining / pageSize));
  const nextPage = Math.min(page, maxPage);
  redirect(`/admin/tools${buildQuery({ page: nextPage, pageSize, toast: "tool_deleted" })}`);
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
  redirect(`/admin/users${buildQuery({ toast: "user_created" })}`);
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
  redirect(`/admin/users${buildQuery({ toast: "password_updated" })}`);
}

export async function deleteAdminUserAction(formData: FormData) {
  const currentUser = await requireAdmin();
  const id = String(formData.get("id") || "").trim();
  if (!id || id === currentUser.id) return;

  const totalUsers = await prisma.adminUser.count();
  if (totalUsers <= 1) return;

  await prisma.adminUser.delete({ where: { id } });
  revalidatePath("/admin/users");
  redirect(`/admin/users${buildQuery({ toast: "user_deleted" })}`);
}
