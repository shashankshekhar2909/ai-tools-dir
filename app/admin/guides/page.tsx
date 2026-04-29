import { createGuideAction, deleteGuideAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Admin — Guides",
};

export default async function AdminGuidesPage() {
  await requireAdmin();
  const guides = await prisma.guide.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "1.75rem" }}>
        Guides
      </h1>

      {/* Add guide form */}
      <div className="premium-card" style={{ padding: "1.75rem", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Add Guide
        </h2>
        <form
          action={createGuideAction}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div className="admin-form-row">
            {[
              { id: "guide-title", name: "title", label: "Title", placeholder: "Best AI Tools for Founders" },
              { id: "guide-slug", name: "slug", label: "Slug", placeholder: "best-ai-tools-founders" },
            ].map((f) => (
              <div key={f.id} className="admin-field">
                <label htmlFor={f.id} className="admin-label">{f.label}</label>
                <input id={f.id} name={f.name} placeholder={f.placeholder} className="admin-input" required />
              </div>
            ))}
          </div>
          <div className="admin-form-row">
            {[
              { id: "guide-type", name: "type", label: "Type", placeholder: "Starter Pack" },
              { id: "guide-reading", name: "readingTime", label: "Reading time", placeholder: "8 min" },
            ].map((f) => (
              <div key={f.id} className="admin-field">
                <label htmlFor={f.id} className="admin-label">{f.label}</label>
                <input id={f.id} name={f.name} placeholder={f.placeholder} className="admin-input" required />
              </div>
            ))}
          </div>
          <div className="admin-field">
            <label htmlFor="guide-excerpt" className="admin-label">Excerpt</label>
            <textarea id="guide-excerpt" name="excerpt" placeholder="Short summary..." className="admin-textarea" rows={2} required />
          </div>
          <div className="admin-field">
            <label htmlFor="guide-content" className="admin-label">Content</label>
            <textarea id="guide-content" name="content" placeholder="Guide content..." className="admin-textarea" rows={8} required />
          </div>
          <div>
            <button type="submit" className="btn-primary">Add Guide</button>
          </div>
        </form>
      </div>

      {/* Guides list */}
      <div
        style={{
          backgroundColor: "var(--surface-1)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {guides.map((guide, index) => (
          <div
            key={guide.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.875rem 1.25rem",
              borderBottom: index < guides.length - 1 ? "1px solid var(--border-subtle)" : "none",
              gap: "1rem",
              flexWrap: "wrap",
            }}
            className="admin-list-row"
          >
            <div>
              <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.125rem" }}>
                {guide.title}
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                /{guide.slug}
              </p>
            </div>
            <form action={deleteGuideAction}>
              <input type="hidden" name="id" value={guide.id} />
              <button type="submit" className="btn-danger">
                Delete
              </button>
            </form>
          </div>
        ))}
        {guides.length === 0 && (
          <p style={{ padding: "3rem 2rem", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            No guides yet.
          </p>
        )}
      </div>
    </div>
  );
}
