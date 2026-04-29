import {
  createAdminUserAction,
  deleteAdminUserAction,
  updateAdminPasswordAction,
} from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Admin — Users",
};

export default async function AdminUsersPage() {
  const currentUser = await requireAdmin();
  const users = await prisma.adminUser.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
          Admin Users
        </h1>
        <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
          Manage login accounts and passwords.
        </p>
      </div>

      <section className="premium-card" style={{ marginBottom: "1rem" }}>
        <h2 style={{ margin: "0 0 0.875rem", fontSize: "1rem", color: "var(--text-primary)" }}>Create Admin User</h2>
        <form action={createAdminUserAction} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
          <input name="email" type="email" placeholder="new-admin@company.com" className="admin-input" required />
          <input name="password" type="password" placeholder="Minimum 8 characters" className="admin-input" minLength={8} required />
          <button type="submit" className="btn-primary">Create User</button>
        </form>
      </section>

      <section
        style={{
          backgroundColor: "var(--surface-1)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {users.map((user, index) => {
          const isCurrent = user.id === currentUser.id;
          const canDelete = !isCurrent && users.length > 1;
          return (
            <div
              key={user.id}
              style={{
                padding: "0.95rem 1.25rem",
                borderBottom: index < users.length - 1 ? "1px solid var(--border-subtle)" : "none",
                display: "grid",
                gap: "0.75rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                <div>
                  <p style={{ margin: 0, fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)" }}>
                    {user.email} {isCurrent ? "(You)" : ""}
                  </p>
                  <p style={{ margin: "0.15rem 0 0", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    Created {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {canDelete && (
                  <form action={deleteAdminUserAction}>
                    <input type="hidden" name="id" value={user.id} />
                    <button type="submit" className="btn-danger">Delete</button>
                  </form>
                )}
              </div>

              <form action={updateAdminPasswordAction} style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <input type="hidden" name="id" value={user.id} />
                <input
                  name="password"
                  type="password"
                  minLength={8}
                  required
                  placeholder="Set new password (min 8 chars)"
                  className="admin-input"
                  style={{ minWidth: "260px", flex: 1 }}
                />
                <button type="submit" className="btn-secondary">Update Password</button>
              </form>
            </div>
          );
        })}
      </section>
    </div>
  );
}
