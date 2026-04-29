"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SlimTool {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  pricingType: string;
  rating: number;
  bestFor: string;
  pros: string[];
  cons: string[];
}

interface Props {
  tools: SlimTool[];
  initialA: string;
  initialB: string;
}

function PricingBadge({ type }: { type: string }) {
  const cls =
    type === "Free" ? "free" : type === "Freemium" ? "freemium" : "paid";
  return <span className={`pricing-badge ${cls}`}>{type}</span>;
}

function RatingDisplay({ value }: { value: number }) {
  return (
    <span className="rating-display">
      <span className="star" aria-hidden="true">★</span>
      <span className="value">{value.toFixed(1)}</span>
      <span style={{ color: "var(--text-muted)" }}>&nbsp;/ 5</span>
    </span>
  );
}

export function CompareClient({ tools, initialA, initialB }: Props) {
  const router = useRouter();
  const [slugA, setSlugA] = useState(initialA || tools[0]?.slug || "");
  const [slugB, setSlugB] = useState(initialB || tools[1]?.slug || "");

  const a = tools.find((t) => t.slug === slugA);
  const b = tools.find((t) => t.slug === slugB);

  function handleCompare(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/compare?a=${slugA}&b=${slugB}`);
  }

  if (tools.length === 0) {
    return (
      <div className="empty-state">
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
          No tools available for comparison yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Tool selector toolbar */}
      <form onSubmit={handleCompare} className="toolbar" style={{ marginBottom: "2rem" }}>
        <div className="toolbar-filters" style={{ flex: 1, gap: "1rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", flex: 1, minWidth: "180px" }}>
            <label
              htmlFor="compare-tool-a"
              style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)" }}
            >
              Tool A
            </label>
            <select
              id="compare-tool-a"
              className="filter-select"
              value={slugA}
              onChange={(e) => setSlugA(e.target.value)}
              style={{ height: "2.5rem", fontSize: "0.875rem", color: "var(--text-primary)" }}
            >
              {tools.map((t) => (
                <option key={t.id} value={t.slug}>{t.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", flex: 1, minWidth: "180px" }}>
            <label
              htmlFor="compare-tool-b"
              style={{ fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)" }}
            >
              Tool B
            </label>
            <select
              id="compare-tool-b"
              className="filter-select"
              value={slugB}
              onChange={(e) => setSlugB(e.target.value)}
              style={{ height: "2.5rem", fontSize: "0.875rem", color: "var(--text-primary)" }}
            >
              {tools.map((t) => (
                <option key={t.id} value={t.slug}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: "0" }}>
          <button type="submit" className="btn-primary" style={{ height: "2.5rem" }}>
            Compare
          </button>
        </div>
      </form>

      {/* Comparison panels */}
      {a && b ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {[a, b].map((tool) => (
            <div key={tool.id} className="premium-card" style={{ gap: "1.25rem" }}>
              {/* Header */}
              <div>
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "var(--text-primary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {tool.name}
                </h2>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  {tool.shortDescription}
                </p>
              </div>

              {/* Metadata grid */}
              <dl style={{ display: "flex", flexDirection: "column", gap: "1rem", margin: 0 }}>
                {/* Pricing */}
                <div>
                  <dt
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      marginBottom: "0.375rem",
                    }}
                  >
                    Pricing
                  </dt>
                  <dd style={{ margin: 0 }}>
                    <PricingBadge type={tool.pricingType} />
                  </dd>
                </div>

                {/* Rating */}
                <div>
                  <dt
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      marginBottom: "0.375rem",
                    }}
                  >
                    Rating
                  </dt>
                  <dd style={{ margin: 0 }}>
                    <RatingDisplay value={tool.rating} />
                  </dd>
                </div>

                {/* Best for */}
                <div>
                  <dt
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      marginBottom: "0.375rem",
                    }}
                  >
                    Best For
                  </dt>
                  <dd style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                    {tool.bestFor}
                  </dd>
                </div>

                {/* Pros */}
                <div>
                  <dt
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Pros
                  </dt>
                  <dd style={{ margin: 0 }}>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                      {tool.pros.map((p) => (
                        <li
                          key={p}
                          style={{ display: "flex", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}
                        >
                          <span style={{ color: "#34d399", flexShrink: 0, marginTop: "1px" }} aria-hidden="true">&#10003;</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>

                {/* Cons */}
                <div>
                  <dt
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Cons
                  </dt>
                  <dd style={{ margin: 0 }}>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                      {tool.cons.map((c) => (
                        <li
                          key={c}
                          style={{ display: "flex", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}
                        >
                          <span style={{ color: "#f87171", flexShrink: 0, marginTop: "1px" }} aria-hidden="true">&#10007;</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            Select two tools above to compare them.
          </p>
        </div>
      )}
    </div>
  );
}
