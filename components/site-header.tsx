"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
} from "@carbon/react";
import { Search, Menu, Close } from "@carbon/icons-react";
import { ThemeToggle } from "./theme-toggle";
import { useRouter, usePathname } from "next/navigation";

const navLinks = [
  { href: "/tools", label: "Tools" },
  { href: "/stack", label: "Stack" },
  { href: "/workflows", label: "Workflows" },
  { href: "/compare", label: "Compare" },
  { href: "/blog", label: "Guides" },
  { href: "/help", label: "Help" },
];

// Returns true if the current path matches or starts with the link href.
// "/" is exact-only.
function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Close drawer on Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && drawerOpen) {
      setDrawerOpen(false);
    }
  }, [drawerOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      <Header aria-label="AI Stack Lab">
        <SkipToContent />

        {/* Logo / Brand */}
        <HeaderName href="/" prefix="">
          <span style={{ color: "var(--text-muted)", fontWeight: 400, marginRight: "0.25rem" }}>
            AI
          </span>
          Stack Lab
        </HeaderName>

        {/* Primary navigation — hidden <768px via CSS */}
        <HeaderNavigation aria-label="Main navigation" className="header-desktop-nav">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              // Carbon's HeaderMenuItem renders an <a> but may strip aria-current.
              // We wrap in a span that carries data-active, then target via CSS.
              <span
                key={link.href}
                data-active={active ? "true" : undefined}
                className="header-nav-item-wrap"
              >
                {/* Use Next Link for client-side navigation, styled like HeaderMenuItem */}
                <Link
                  href={link.href}
                  className="cds--header__menu-item header-nav-link"
                  aria-current={active ? "page" : undefined}
                  role="menuitem"
                >
                  {link.label}
                </Link>
              </span>
            );
          })}
        </HeaderNavigation>

        {/* Global action bar */}
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="Search tools"
            tooltipAlignment="end"
            onClick={() => router.push("/tools")}
          >
            <Search size={20} />
          </HeaderGlobalAction>

          {/* Theme switcher — visible at all viewports */}
          <div style={{ display: "flex", alignItems: "center", padding: "0 0.25rem" }}>
            <ThemeToggle />
          </div>

          {/* Hamburger — visible only <768px */}
          <HeaderGlobalAction
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav-drawer"
            tooltipAlignment="end"
            onClick={() => setDrawerOpen((v) => !v)}
            className="header-hamburger"
          >
            {drawerOpen ? <Close size={20} /> : <Menu size={20} />}
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>

      {/* Mobile drawer overlay */}
      {/* Overlay backdrop */}
      <div
        className={`mobile-nav-backdrop${drawerOpen ? " mobile-nav-backdrop--open" : ""}`}
        aria-hidden="true"
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer panel */}
      <nav
        id="mobile-nav-drawer"
        aria-label="Mobile navigation"
        aria-hidden={!drawerOpen}
        className={`mobile-nav-drawer${drawerOpen ? " mobile-nav-drawer--open" : ""}`}
      >
        <div style={{ padding: "1rem 0" }}>
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`mobile-nav-link${active ? " mobile-nav-link--active" : ""}`}
                aria-current={active ? "page" : undefined}
                tabIndex={drawerOpen ? 0 : -1}
              >
                {link.label}
              </Link>
            );
          })}

          <div style={{ margin: "1rem 1.5rem 0", borderTop: "1px solid var(--border-subtle)", paddingTop: "1rem", display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <Link href="/tools" className="btn-secondary" style={{ fontSize: "0.875rem", flex: 1, justifyContent: "center" }} tabIndex={drawerOpen ? 0 : -1}>
              Browse Tools
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
