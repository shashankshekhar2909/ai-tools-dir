import Link from "next/link";
import { notFound } from "next/navigation";
import { updateToolAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { toolFormFields } from "@/lib/admin/tool-form";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Admin — Edit Tool",
};

const unpack = (value: string) => {
  try {
    const parsed = JSON.parse(value) as string[];
    return parsed.join(", ");
  } catch {
    return "";
  }
};

type Params = { page?: string; pageSize?: string };

export default async function EditToolPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Params>;
}) {
  await requireAdmin();
  const { id } = await params;
  const query = await searchParams;
  const page = Math.max(1, Number(query.page || "1") || 1);
  const pageSize = Math.max(1, Math.min(60, Number(query.pageSize || "20") || 20));
  const pageQuery = new URLSearchParams();
  if (page > 1) pageQuery.set("page", String(page));
  if (pageSize !== 20) pageQuery.set("pageSize", String(pageSize));
  const querySuffix = pageQuery.toString() ? `?${pageQuery.toString()}` : "";
  const [tool, categories] = await Promise.all([
    prisma.tool.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!tool) return notFound();

  return (
    <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      {/* Back + heading */}
      <div style={{ marginBottom: "1.75rem" }}>
        <Link
          href={`/admin/tools${querySuffix}`}
          className="btn-secondary"
          style={{ fontSize: "0.8125rem", marginBottom: "1rem", display: "inline-flex" }}
        >
          &larr; Back to Tools
        </Link>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
          }}
        >
          Edit Tool
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
          {tool.name} &middot; /{tool.slug}
        </p>
      </div>

      <div className="premium-card" style={{ padding: "2rem" }}>
        <form
          action={updateToolAction}
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          <input type="hidden" name="id" value={tool.id} />
          <input type="hidden" name="page" value={page} />
          <input type="hidden" name="pageSize" value={pageSize} />
          {toolFormFields(categories, {
            name: tool.name,
            slug: tool.slug,
            categoryId: tool.categoryId,
            pricingType: tool.pricingType,
            startingPrice: tool.startingPrice || "",
            rating: String(tool.rating),
            shortDescription: tool.shortDescription,
            longDescription: tool.longDescription,
            bestFor: tool.bestFor,
            websiteUrl: tool.websiteUrl || "",
            pros: unpack(tool.pros),
            cons: unpack(tool.cons),
            useCases: unpack(tool.useCases),
            tags: unpack(tool.tags),
            isEditorsPick: tool.isEditorsPick,
            isHot: tool.isHot,
          })}
          <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.5rem", borderTop: "1px solid var(--border-subtle)" }}>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
            <Link href={`/admin/tools${querySuffix}`} className="btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
