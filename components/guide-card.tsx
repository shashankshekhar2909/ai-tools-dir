import Link from "next/link";
import { Guide } from "@/lib/types";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="premium-card"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {/* Type label */}
      <span className="eyebrow" style={{ marginBottom: "0.625rem" }}>
        {guide.type}
      </span>

      {/* Title */}
      <h3
        className="line-clamp-2"
        style={{
          margin: "0 0 0.75rem",
          fontSize: "0.9375rem",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: "var(--text-primary)",
          lineHeight: 1.4,
          flexGrow: 1,
        }}
      >
        {guide.title}
      </h3>

      {/* Excerpt */}
      <p
        className="line-clamp-2"
        style={{
          fontSize: "0.875rem",
          lineHeight: 1.6,
          color: "var(--text-secondary)",
          margin: "0 0 1.25rem",
        }}
      >
        {guide.excerpt}
      </p>

      {/* Footer */}
      <p
        style={{
          fontSize: "0.75rem",
          color: "var(--text-muted)",
          margin: 0,
          marginTop: "auto",
        }}
      >
        {guide.readingTime} &middot; {guide.publishedAt}
      </p>
    </Link>
  );
}
