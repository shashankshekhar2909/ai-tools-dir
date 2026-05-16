import Link from "next/link";
import { bulkImportToolsAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Admin — Bulk Import Tools",
};

type SearchParams = {
  inserted?: string;
  updated?: string;
  skipped?: string;
  skippedSlugs?: string;
  error?: string;
};

const SAMPLE_JSON = `[
  {
    "name": "Cursor",
    "slug": "cursor",
    "category": "coding",
    "pricing": "Paid",
    "rating": 4.8,
    "shortDescription": "AI-first IDE for pair programming and refactors.",
    "websiteUrl": "https://cursor.com",
    "isEditorsPick": true
  },
  {
    "name": "Suno",
    "slug": "suno",
    "category": "video-audio",
    "pricing": "Freemium",
    "rating": 4.6,
    "shortDescription": "Full-song AI music generation with vocals.",
    "websiteUrl": "https://suno.com",
    "isHot": true
  }
]`;

const PROMPT_TEMPLATE = `Generate a JSON array of AI tools using this exact schema. Output only valid JSON, no prose.

Required fields per tool: name, slug, category, pricing, rating, shortDescription.
Optional fields: longDescription, bestFor, websiteUrl, isEditorsPick, isHot, pros, cons, useCases, tags.

- slug: kebab-case, lowercase, no spaces
- category: one of [ai-assistants, coding, design, video-audio, research, automation, business, productivity]
- pricing: one of [Free, Freemium, Paid]
- rating: number between 3.5 and 5.0
- shortDescription: one sentence, under 90 chars

Give me 10 new AI tools launched in 2024-2026 for the "coding" category.`;

export default async function BulkImportPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  const inserted = Number(params.inserted || 0);
  const updated = Number(params.updated || 0);
  const skipped = Number(params.skipped || 0);
  const hasResult = inserted || updated || skipped;
  const skippedList = params.skippedSlugs ? params.skippedSlugs.split(",") : [];

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
            marginBottom: "0.5rem",
          }}
        >
          Bulk Import Tools
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", margin: 0 }}>
          Paste a JSON array of tools. Existing tools (matched by slug) are updated in place.
          New tools are inserted. Nothing is deleted.
        </p>
      </div>

      {/* Result / error banner */}
      {params.error === "invalid_json" && (
        <div
          className="premium-card"
          style={{
            padding: "1rem 1.25rem",
            marginBottom: "1.25rem",
            borderColor: "#dc2626",
            color: "#dc2626",
          }}
        >
          Invalid JSON. Check syntax and try again.
        </div>
      )}
      {params.error === "empty" && (
        <div
          className="premium-card"
          style={{
            padding: "1rem 1.25rem",
            marginBottom: "1.25rem",
            color: "var(--text-secondary)",
          }}
        >
          Paste some JSON first.
        </div>
      )}
      {hasResult ? (
        <div
          className="premium-card"
          style={{ padding: "1rem 1.25rem", marginBottom: "1.25rem" }}
        >
          <div style={{ fontWeight: 600, marginBottom: "0.25rem", color: "var(--text-primary)" }}>
            Import complete
          </div>
          <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            Inserted: <strong>{inserted}</strong> &middot; Updated: <strong>{updated}</strong>
            {skipped > 0 && (
              <>
                {" "}
                &middot; Skipped: <strong>{skipped}</strong>
              </>
            )}
          </div>
          {skippedList.length > 0 && (
            <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
              Skipped: {skippedList.join(", ")}
              {skipped > skippedList.length && ` … +${skipped - skippedList.length} more`}
            </div>
          )}
        </div>
      ) : null}

      {/* Categories cheat-sheet */}
      <div className="premium-card" style={{ padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
        <div
          style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--text-muted)",
            fontWeight: 600,
            marginBottom: "0.5rem",
          }}
        >
          Allowed category slugs
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {categories.map((c) => (
            <code
              key={c.id}
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "6px",
                padding: "0.25rem 0.5rem",
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
              }}
            >
              {c.slug}
            </code>
          ))}
        </div>
      </div>

      {/* Sample JSON + AI prompt */}
      <details
        className="premium-card"
        style={{ padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}
      >
        <summary
          style={{
            cursor: "pointer",
            fontWeight: 600,
            color: "var(--text-primary)",
            listStyle: "revert",
          }}
        >
          Sample JSON &amp; AI prompt template
        </summary>
        <div style={{ marginTop: "1rem" }}>
          <div
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            Example payload
          </div>
          <pre
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "8px",
              padding: "1rem",
              fontSize: "0.8125rem",
              color: "var(--text-secondary)",
              overflow: "auto",
              margin: 0,
              marginBottom: "1.25rem",
            }}
          >
            {SAMPLE_JSON}
          </pre>

          <div
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            Copy this prompt into ChatGPT / Claude to generate batches
          </div>
          <pre
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "8px",
              padding: "1rem",
              fontSize: "0.8125rem",
              color: "var(--text-secondary)",
              overflow: "auto",
              margin: 0,
              whiteSpace: "pre-wrap",
            }}
          >
            {PROMPT_TEMPLATE}
          </pre>
        </div>
      </details>

      {/* Form */}
      <form
        action={bulkImportToolsAction}
        className="premium-card"
        style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <label
          htmlFor="json"
          className="admin-label"
          style={{ fontWeight: 600 }}
        >
          Paste JSON array
        </label>
        <textarea
          id="json"
          name="json"
          className="admin-textarea"
          rows={18}
          placeholder={SAMPLE_JSON}
          spellCheck={false}
          style={{ fontFamily: "var(--cds-code-01-font-family, monospace)", fontSize: "0.8125rem" }}
          required
        />
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            paddingTop: "0.5rem",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <button type="submit" className="btn-primary">
            Import tools
          </button>
          <Link href="/admin/tools" className="btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
