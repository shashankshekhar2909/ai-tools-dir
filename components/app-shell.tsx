"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <SiteHeader />}
      <main className="cds--content" style={{ minHeight: "calc(100vh - 56px)" }}>
        {children}
      </main>
      {!isAdminRoute && <SiteFooter />}
    </>
  );
}
