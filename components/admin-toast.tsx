"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const toastCopy: Record<string, { title: string; body: string }> = {
  category_created: {
    title: "Category created",
    body: "The new category was saved successfully.",
  },
  guide_created: {
    title: "Guide created",
    body: "The guide was published successfully.",
  },
  guide_deleted: {
    title: "Guide deleted",
    body: "The guide was removed successfully.",
  },
  tool_created: {
    title: "Tool created",
    body: "The tool was saved successfully.",
  },
  tool_updated: {
    title: "Tool updated",
    body: "The tool changes were saved successfully.",
  },
  tool_deleted: {
    title: "Tool deleted",
    body: "The tool was removed successfully.",
  },
  user_created: {
    title: "Admin user created",
    body: "The new login account was saved successfully.",
  },
  password_updated: {
    title: "Password updated",
    body: "The admin password was changed successfully.",
  },
  user_deleted: {
    title: "Admin user deleted",
    body: "The login account was removed successfully.",
  },
};

export function AdminToast() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const toast = searchParams.get("toast");
  const copy = toast ? toastCopy[toast] : null;

  if (!copy) return null;

  const dismiss = () => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("toast");
    const query = next.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`);
  };

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        right: "1rem",
        bottom: "1rem",
        zIndex: 50,
        maxWidth: "22rem",
        padding: "0.9rem 1rem",
        borderRadius: "12px",
        border: "1px solid rgba(34, 197, 94, 0.25)",
        background: "rgba(7, 17, 12, 0.96)",
        color: "#ecfdf5",
        boxShadow: "0 18px 40px rgba(0, 0, 0, 0.24)",
        display: "flex",
        gap: "0.75rem",
        alignItems: "flex-start",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.2rem" }}>{copy.title}</div>
        <div style={{ fontSize: "0.8125rem", color: "rgba(236, 253, 245, 0.82)", lineHeight: 1.45 }}>{copy.body}</div>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss toast"
        style={{
          border: 0,
          background: "transparent",
          color: "rgba(236, 253, 245, 0.8)",
          cursor: "pointer",
          fontSize: "1.1rem",
          lineHeight: 1,
          padding: 0,
        }}
      >
        ×
      </button>
    </div>
  );
}
