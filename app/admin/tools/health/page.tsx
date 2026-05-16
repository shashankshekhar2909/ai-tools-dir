import Link from "next/link";
import { syncToolUrlsAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";
import websiteUrls from "@/data/tool-urls.json";

export const metadata = {
  title: "Admin — Tool URL Health",
};

type SearchParams = { applied?: string };

const urlMap = websiteUrls as Record<string, string>;
const defaultToolUrl = (slug: string) => `https://${slug}.com`;

export default async function ToolHealthPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const justApplied = params.applied ? Number(params.applied) : null;

  const tools = await prisma.tool.findMany({
    select: { id: true, name: true, slug: true, websiteUrl: true },
    orderBy: { name: "asc" },
  });

  const mismatches = tools
    .map((t) => {
      const expected = urlMap[t.slug] || defaultToolUrl(t.slug);
      return { ...t, expected, drift: t.websiteUrl !== expected };
    })
    .filter((t) => t.drift);

  const missingFromMap = tools.filter((t) => !urlMap[t.slug]);

  return (
    <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      <div style={{ marginBottom: "1.75rem" }}>
        <Link
          href="/admin/tools"
          className="btn-secondary"
          style={{ fontSize: "0.8125rem", marginBottom: "1rem", display: "inline-flex" }}
        >
          &larr; Back to Tools
        </Link>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            margin: 0,
            marginBottom: "0.25rem",
          }}
        >
          Tool URL Health
        </h1>
        <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", margin: 0 }}>
          Compares each tool&apos;s stored website URL against{" "}
          <code style={{ background: "var(--surface-2)", padding: "0.1rem 0.35rem", borderRadius: "4px" }}>
            data/tool-urls.json
          </code>
          . Sync to fix drift.
        </p>
      </div>

      {justApplied !== null ? (
        <div className="premium-card" style={{ padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
          <strong style={{ color: "var(--text-primary)" }}>Sync complete.</strong>{" "}
          <span style={{ color: "var(--text-secondary)" }}>
            Updated {justApplied} tool{justApplied === 1 ? "" : "s"}.
          </span>
        </div>
      ) : null}

      {/* Stats strip */}
      <div
        className="premium-card"
        style={{
          padding: "1.25rem 1.5rem",
          marginBottom: "1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "1rem",
        }}
      >
        <Stat label="Total tools" value={tools.length} />
        <Stat label="URL drift" value={mismatches.length} accent={mismatches.length > 0} />
        <Stat label="Missing from map" value={missingFromMap.length} accent={missingFromMap.length > 0} />
      </div>

      {/* Sync action */}
      <form action={syncToolUrlsAction} style={{ marginBottom: "1.5rem" }}>
        <button
          type="submit"
          className="btn-primary"
          disabled={mismatches.length === 0}
          style={mismatches.length === 0 ? { opacity: 0.55, cursor: "not-allowed" } : undefined}
        >
          {mismatches.length === 0
            ? "All URLs in sync"
            : `Apply ${mismatches.length} fix${mismatches.length === 1 ? "" : "es"}`}
        </button>
      </form>

      {/* Mismatch list */}
      {mismatches.length > 0 ? (
        <div className="premium-card" style={{ padding: 0, overflow: "hidden" }}>
          <div
            style={{
              padding: "0.875rem 1.25rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              borderBottom: "1px solid var(--border-subtle)",
              background: "var(--surface-2)",
            }}
          >
            Drift detected
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {mismatches.map((m, i) => (
              <li
                key={m.id}
                style={{
                  padding: "1rem 1.25rem",
                  borderTop: i === 0 ? "none" : "1px solid var(--border-subtle)",
                  display: "grid",
                  gridTemplateColumns: "minmax(8rem, 1fr) 2.5fr",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.9375rem" }}>
                    {m.name}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{m.slug}</div>
                </div>
                <div style={{ fontSize: "0.8125rem", minWidth: 0 }}>
                  <div
                    style={{
                      color: "#dc2626",
                      wordBreak: "break-all",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <span style={{ color: "var(--text-muted)" }}>now:</span> {m.websiteUrl || "(empty)"}
                  </div>
                  <div style={{ color: "#16a34a", wordBreak: "break-all" }}>
                    <span style={{ color: "var(--text-muted)" }}>fix:</span> {m.expected}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div
          className="premium-card"
          style={{
            padding: "3rem 1.5rem",
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "0.9375rem",
          }}
        >
          All tool URLs match the JSON map.
        </div>
      )}

      {/* Missing slugs (informational) */}
      {missingFromMap.length > 0 ? (
        <details className="premium-card" style={{ padding: "1.25rem 1.5rem", marginTop: "1.5rem" }}>
          <summary style={{ cursor: "pointer", fontWeight: 600, color: "var(--text-primary)" }}>
            {missingFromMap.length} slug{missingFromMap.length === 1 ? "" : "s"} not in tool-urls.json
          </summary>
          <div
            style={{
              marginTop: "0.75rem",
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
              lineHeight: 1.7,
            }}
          >
            These tools fall back to <code>https://&lt;slug&gt;.com</code>. Add real URLs to
            <code style={{ marginLeft: "0.25rem", background: "var(--surface-2)", padding: "0.1rem 0.35rem", borderRadius: "4px" }}>
              data/tool-urls.json
            </code>{" "}
            to fix:
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.75rem" }}>
            {missingFromMap.map((t) => (
              <code
                key={t.id}
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "6px",
                  padding: "0.2rem 0.5rem",
                  fontSize: "0.75rem",
                  color: "var(--text-secondary)",
                }}
              >
                {t.slug}
              </code>
            ))}
          </div>
        </details>
      ) : null}
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div>
      <div
        style={{
          fontSize: "0.6875rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          fontWeight: 600,
          marginBottom: "0.25rem",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "1.75rem",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: accent ? "var(--accent)" : "var(--text-primary)",
        }}
      >
        {value}
      </div>
    </div>
  );
}
