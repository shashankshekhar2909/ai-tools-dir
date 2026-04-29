import { requireAdmin } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Admin — Newsletter",
};

export default async function AdminNewsletterPage() {
  await requireAdmin();
  const subscribers = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
          Newsletter Subscribers
        </h1>
        <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
          {subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div
        style={{
          backgroundColor: "var(--surface-1)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {subscribers.length === 0 ? (
          <p style={{ padding: "3rem 2rem", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            No subscribers yet.
          </p>
        ) : (
          subscribers.map((s, index) => (
            <div
              key={s.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.875rem 1.25rem",
                borderBottom: index < subscribers.length - 1 ? "1px solid var(--border-subtle)" : "none",
              }}
              className="admin-list-row"
            >
              <span style={{ fontSize: "0.875rem", color: "var(--text-primary)" }}>{s.email}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", flexShrink: 0 }}>
                {s.createdAt.toISOString().slice(0, 10)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
