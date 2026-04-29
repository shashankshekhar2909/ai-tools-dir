import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";

const sections = [
  {
    href: "/admin/tools",
    label: "Manage Tools",
    desc: "Add, edit, and remove tools from the directory.",
  },
  {
    href: "/admin/categories",
    label: "Manage Categories",
    desc: "Create and organize tool categories.",
  },
  {
    href: "/admin/guides",
    label: "Manage Guides",
    desc: "Publish and delete builder guides.",
  },
  {
    href: "/admin/newsletter",
    label: "Newsletter Subscribers",
    desc: "View all captured subscriber emails.",
  },
];

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminPage() {
  await requireAdmin();

  return (
    <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <span className="eyebrow">Control panel</span>
        <h1 className="section-heading">Admin Dashboard</h1>
        <p className="section-subtext" style={{ marginTop: "0.25rem" }}>
          Manage all content for AI Stack Lab.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1rem",
        }}
      >
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="premium-card"
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
              }}
            >
              {s.label}
            </h2>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              {s.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
