import { createCategoryAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Admin — Categories",
};

export default async function AdminCategoriesPage() {
  await requireAdmin();
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "1.75rem" }}>
        Categories
      </h1>

      {/* Add category form */}
      <div className="premium-card" style={{ padding: "1.75rem", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Add Category
        </h2>
        <form
          action={createCategoryAction}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div className="admin-form-row">
            <div className="admin-field">
              <label htmlFor="cat-name" className="admin-label">Name</label>
              <input id="cat-name" name="name" placeholder="AI Assistants" className="admin-input" required />
            </div>
            <div className="admin-field">
              <label htmlFor="cat-slug" className="admin-label">Slug</label>
              <input id="cat-slug" name="slug" placeholder="ai-assistants" className="admin-input" required />
            </div>
          </div>
          <div className="admin-field">
            <label htmlFor="cat-desc" className="admin-label">Description</label>
            <input id="cat-desc" name="description" placeholder="Short description" className="admin-input" required />
          </div>
          <div>
            <button type="submit" className="btn-primary">Add Category</button>
          </div>
        </form>
      </div>

      {/* Category list */}
      <div
        style={{
          backgroundColor: "var(--surface-1)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {categories.map((c, index) => (
          <div
            key={c.id}
            style={{
              padding: "0.875rem 1.25rem",
              borderBottom: index < categories.length - 1 ? "1px solid var(--border-subtle)" : "none",
            }}
            className="admin-list-row"
          >
            <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)" }}>{c.name}</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "0.75rem" }}>
              /{c.slug}
            </span>
          </div>
        ))}
        {categories.length === 0 && (
          <p style={{ padding: "3rem 2rem", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            No categories yet.
          </p>
        )}
      </div>
    </div>
  );
}
