import Link from "next/link";
import { bulkImportGuidesAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata = {
  title: "Admin — Bulk Import Guides",
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
    "title": "Best AI Tools for Solo Founders",
    "slug": "best-ai-tools-for-solo-founders",
    "excerpt": "A practical starter stack for solo builders shipping quickly.",
    "content": "Start with one assistant, one coding copilot, one research tool, and one automation tool.\\n\\nRecommended baseline:\\n- Assistant: ChatGPT or Claude\\n- Coding: Cursor or GitHub Copilot",
    "type": "Starter Pack",
    "readingTime": "8 min",
    "publishedAt": "2026-04-20"
  }
]`;

const PROMPT_TEMPLATE = `Generate a JSON array of long-form AI tool guides using this exact schema. Output only valid JSON, no prose.

Required fields per guide:
- title: string, headline-style
- slug: kebab-case, lowercase, no spaces
- excerpt: one-sentence hook, under 140 chars
- content: full article body. Use \\n for newlines and Markdown formatting (headings, lists). Aim for 400-800 words.
- type: one of [Starter Pack, Comparison, Workflow, Review, Deep Dive]
- readingTime: e.g. "8 min"
- publishedAt: ISO date string, e.g. "2026-05-16"

Topic: <REPLACE WITH YOUR TOPIC, e.g. "AI tools for indie hackers in 2026">
Generate 3 guides on this topic.`;

export default async function GuidesImportPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await requireAdmin();
  const params = await searchParams;

  const inserted = Number(params.inserted || 0);
  const updated = Number(params.updated || 0);
  const skipped = Number(params.skipped || 0);
  const hasResult = inserted || updated || skipped;
  const skippedList = params.skippedSlugs ? params.skippedSlugs.split(",") : [];

  return (
    <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      <div style={{ marginBottom: "1.75rem" }}>
        <Link
          href="/admin/guides"
          className="btn-secondary"
          style={{ fontSize: "0.8125rem", marginBottom: "1rem", display: "inline-flex" }}
        >
          &larr; Back to Guides
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
          Bulk Import Guides
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", margin: 0 }}>
          Paste a JSON array of guides. Existing guides (matched by slug) are updated in place.
          New guides are inserted. Nothing is deleted.
        </p>
      </div>

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

      <form
        action={bulkImportGuidesAction}
        className="premium-card"
        style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <label htmlFor="json" className="admin-label" style={{ fontWeight: 600 }}>
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
            Import guides
          </button>
          <Link href="/admin/guides" className="btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
