"use client";

import Link from "next/link";
import { ArrowRight } from "@carbon/icons-react";
import { Tool } from "@/lib/types";

function PricingBadge({ type }: { type: string }) {
  const cls =
    type === "Free" ? "pricing-badge free"
    : type === "Freemium" ? "pricing-badge freemium"
    : "pricing-badge paid";
  return <span className={cls}>{type}</span>;
}

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="premium-card">
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
        <h3
          style={{
            margin: 0,
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: "var(--text-primary)",
            lineHeight: 1.3,
          }}
        >
          {tool.name}
        </h3>
        {tool.isEditorsPick && (
          <span
            style={{
              flexShrink: 0,
              fontSize: "0.625rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--accent-hover)",
              background: "var(--accent-dim)",
              border: "1px solid rgba(99,102,241,0.25)",
              borderRadius: "4px",
              padding: "0.2rem 0.5rem",
            }}
          >
            Pick
          </span>
        )}
      </div>

      {/* Meta row: category + rating */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.875rem" }}>
        <PricingBadge type={tool.pricingType} />
        <span
          className="rating-display"
          aria-label={`Rating: ${tool.rating.toFixed(1)} out of 5`}
        >
          <span className="star" aria-hidden="true">&#9733;</span>
          <span className="value">{tool.rating.toFixed(1)}</span>
        </span>
      </div>

      {/* Description */}
      <p
        className="line-clamp-3"
        style={{
          fontSize: "0.875rem",
          lineHeight: 1.6,
          color: "var(--text-secondary)",
          margin: "0 0 1.25rem",
          flexGrow: 1,
        }}
      >
        {tool.shortDescription}
      </p>

      {/* CTA */}
      <Link href={`/tools/${tool.slug}`} className="btn-tool-cta">
        View Tool
        <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </div>
  );
}
