import { loginAdminAction } from "@/app/admin/actions";

export const metadata = {
  title: "Admin Login",
};

export default function AdminLoginPage() {
  return (
    <div
      style={{
        maxWidth: "22rem",
        margin: "5rem auto 0",
        padding: "0 1rem",
      }}
    >
      <div className="premium-card" style={{ padding: "2.5rem" }}>
        {/* Brand mark */}
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.5rem" }}>
            AI Stack Lab
          </p>
          <h1 style={{ fontSize: "1.375rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)", margin: 0 }}>
            Admin Login
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "0.375rem" }}>
            Sign in to manage tools, guides, and categories.
          </p>
        </div>

        <form action={loginAdminAction} style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
          <div className="admin-field">
            <label htmlFor="email" className="admin-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="admin@aistacklab.dev"
              autoComplete="email"
              required
              className="admin-input"
            />
          </div>

          <div className="admin-field">
            <label htmlFor="password" className="admin-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
              className="admin-input"
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
