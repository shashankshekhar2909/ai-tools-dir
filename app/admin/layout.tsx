import Link from "next/link";
import { logoutAdminAction } from "@/app/admin/actions";

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/tools", label: "Tools" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/guides", label: "Guides" },
  { href: "/admin/newsletter", label: "Newsletter" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Admin sub-nav */}
      <nav
        aria-label="Admin navigation"
        style={{
          backgroundColor: "var(--surface-1)",
          borderBottom: "1px solid var(--border-subtle)",
          padding: "0 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.875rem 1rem",
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "var(--text-secondary)",
                textDecoration: "none",
                borderBottom: "2px solid transparent",
                transition: "color 150ms ease, border-color 150ms ease",
              }}
              className="admin-nav-link"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <form action={logoutAdminAction} style={{ padding: "0.5rem 0" }}>
          <button type="submit" className="admin-logout-btn">
            Logout
          </button>
        </form>
      </nav>

      {children}
    </div>
  );
}
