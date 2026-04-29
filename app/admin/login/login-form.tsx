"use client";

import { useActionState } from "react";
import { loginAdminAction } from "@/app/admin/actions";
import { initialLoginState } from "@/app/admin/login/login-state";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAdminAction, initialLoginState);

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
      {state.error ? (
        <div
          role="alert"
          style={{
            borderRadius: "0.75rem",
            border: "1px solid rgba(239, 68, 68, 0.35)",
            background: "rgba(239, 68, 68, 0.08)",
            color: "#dc2626",
            padding: "0.875rem 1rem",
            fontSize: "0.875rem",
            lineHeight: 1.5,
          }}
        >
          {state.error}
        </div>
      ) : null}

      <div className="admin-field">
        <label htmlFor="email" className="admin-label">Email</label>
        <input
          id="email"
          name="email"
          type="email"
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
          autoComplete="current-password"
          required
          className="admin-input"
        />
      </div>

      <button
        type="submit"
        className="btn-primary"
        style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
        disabled={pending}
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
