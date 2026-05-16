import Link from "next/link";
import { deleteToolAction } from "@/app/admin/actions";
import { AdminToolsPagination } from "@/components/admin-tools-pagination";
import { requireAdmin } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Admin — Tools",
};

type Params = { page?: string; pageSize?: string };

export default async function AdminToolsPage({ searchParams }: { searchParams: Promise<Params> }) {
  await requireAdmin();
  const params = await searchParams;
  const page = Math.max(1, Number(params.page || "1") || 1);
  const pageSize = Math.max(1, Math.min(60, Number(params.pageSize || "20") || 20));
  const skip = (page - 1) * pageSize;

  const [tools, total] = await Promise.all([
    prisma.tool.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.tool.count(),
  ]);

  return (
    <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
            Tools
          </h1>
          <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
            {total} tool{total !== 1 ? "s" : ""} in directory
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link href="/admin/tools/import" className="btn-secondary" style={{ textDecoration: "none" }}>
            Bulk Import
          </Link>
          <Link href="/admin/tools/new" className="btn-primary" style={{ textDecoration: "none" }}>
            + Add Tool
          </Link>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "var(--surface-1)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {tools.map((tool, index) => (
          <div
            key={tool.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.875rem 1.25rem",
              borderBottom: index < tools.length - 1 ? "1px solid var(--border-subtle)" : "none",
              flexWrap: "wrap",
              gap: "0.75rem",
              transition: "background-color 150ms ease",
            }}
            className="admin-list-row"
          >
            <div>
              <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.125rem" }}>
                {tool.name}
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                /{tool.slug} &middot; {tool.category.name} &middot; {tool.pricingType}
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
              <Link href={`/admin/tools/${tool.id}/edit`} className="btn-secondary" style={{ textDecoration: "none", padding: "0.375rem 0.875rem", fontSize: "0.8125rem" }}>
                Edit
              </Link>
              <form action={deleteToolAction}>
                <input type="hidden" name="id" value={tool.id} />
                <button type="submit" className="btn-danger">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {tools.length === 0 && (
          <p style={{ padding: "3rem 2rem", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            No tools yet. Add your first tool above.
          </p>
        )}
      </div>
      {total > 0 && <AdminToolsPagination totalItems={total} page={page} pageSize={pageSize} />}
    </div>
  );
}
