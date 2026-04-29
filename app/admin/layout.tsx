import Link from "next/link";
import type { Metadata } from "next";
import { logoutAdminAction } from "@/app/admin/actions";
import { getSessionUser } from "@/lib/admin/auth";

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/tools", label: "Tools" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/guides", label: "Guides" },
  { href: "/admin/newsletter", label: "Newsletter" },
  { href: "/admin/users", label: "Users" },
];

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-image-preview": "none",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) return <>{children}</>;

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
