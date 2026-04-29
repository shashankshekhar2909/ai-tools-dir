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
