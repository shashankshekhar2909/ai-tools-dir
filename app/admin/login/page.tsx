import { LoginForm } from "@/app/admin/login/login-form";

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

        <LoginForm />
      </div>
    </div>
  );
}
