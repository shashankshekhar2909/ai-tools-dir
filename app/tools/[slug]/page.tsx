import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb, BreadcrumbItem } from "@carbon/react";
import { getAlternativeTools, getToolBySlug } from "@/lib/db/tools";
import { getCategoryBySlug } from "@/lib/db/categories";
import { getSiteUrl } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) {
    return {
      title: "Tool Not Found",
      robots: { index: false, follow: false },
    };
  }

  const description = tool.shortDescription;
  const title = `${tool.name} Review, Pricing, Pros & Cons`;
  const url = `${getSiteUrl()}/tools/${tool.slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: ["/og-image.svg"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.svg"],
    },
  };
}

function PricingBadge({ type, price }: { type: string; price?: string }) {
  const cls =
    type === "Free" ? "pricing-badge free"
    : type === "Freemium" ? "pricing-badge freemium"
    : "pricing-badge paid";
  return (
    <span className={cls}>
      {type}{price ? ` — ${price}` : ""}
    </span>
  );
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) return notFound();

  const [category, alternatives] = await Promise.all([
    getCategoryBySlug(tool.categorySlug),
    getAlternativeTools(tool.categorySlug, tool.slug),
  ]);

  return (
    <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "2.5rem 1.5rem" }}>

      {/* Breadcrumb */}
      <Breadcrumb noTrailingSlash style={{ marginBottom: "2rem" }}>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/tools">Tools</BreadcrumbItem>
        {category && (
          <BreadcrumbItem href={`/category/${category.slug}`}>{category.name}</BreadcrumbItem>
        )}
        <BreadcrumbItem isCurrentPage>{tool.name}</BreadcrumbItem>
      </Breadcrumb>

      {/* Hero section */}
      <div
        style={{
          backgroundColor: "var(--surface-1)",
          border: "1px solid var(--border-subtle)",
          borderTop: `3px solid var(--accent)`,
          borderRadius: "0 0 10px 10px",
          padding: "2.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div>
            {category && (
              <Link
                href={`/category/${category.slug}`}
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  textDecoration: "none",
                }}
              >
                {category.name}
              </Link>
            )}
            <h1
              style={{
                marginTop: "0.375rem",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                lineHeight: 1.15,
              }}
            >
              {tool.name}
            </h1>
          </div>
          {tool.isEditorsPick && (
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--accent-hover)",
                background: "var(--accent-dim)",
                border: "1px solid rgba(99,102,241,0.25)",
                borderRadius: "5px",
                padding: "0.3rem 0.75rem",
              }}
            >
              Editor&apos;s Pick
            </span>
          )}
        </div>

        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "var(--text-secondary)",
            maxWidth: "42rem",
            marginBottom: "1.5rem",
          }}
        >
          {tool.shortDescription}
        </p>

        {/* Metadata row */}
        <div
          style={{
            display: "flex",
            gap: "0.875rem",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <PricingBadge type={tool.pricingType} price={tool.startingPrice} />
          <span
            className="rating-display"
            aria-label={`Rating: ${tool.rating.toFixed(1)} out of 5`}
          >
            <span className="star" aria-hidden="true">&#9733;</span>
            <span className="value">{tool.rating.toFixed(1)} / 5</span>
          </span>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {tool.websiteUrl && (
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Visit {tool.name} &#8599;
            </a>
          )}
          <Link href="/compare" className="btn-secondary">
            Compare tools
          </Link>
        </div>
      </div>

      {/* Detail grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        {/* Overview */}
        <div
          className="premium-card"
          style={{ gridColumn: "1 / -1" }}
        >
          <h2 className="eyebrow" style={{ marginBottom: "0.75rem" }}>Overview</h2>
          <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--text-secondary)", margin: 0 }}>
            {tool.longDescription}
          </p>
        </div>

        {/* Best For */}
        <div className="premium-card">
          <h2 className="eyebrow" style={{ marginBottom: "0.75rem" }}>Best For</h2>
          <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--text-secondary)", margin: 0 }}>
            {tool.bestFor}
          </p>
        </div>

        {/* Tags */}
        <div className="premium-card">
          <h2 className="eyebrow" style={{ marginBottom: "0.875rem" }}>Tags</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="stack-chip"
                style={{ fontSize: "0.8125rem" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Pros */}
        <div className="premium-card">
          <h2
            className="eyebrow"
            style={{ marginBottom: "0.875rem", color: "rgba(52, 211, 153, 0.9)" }}
          >
            Pros
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {tool.pros.map((item) => (
              <li
                key={item}
                style={{
                  display: "flex",
                  gap: "0.625rem",
                  alignItems: "flex-start",
                  fontSize: "0.9375rem",
                  lineHeight: 1.5,
                  color: "var(--text-secondary)",
                }}
              >
                <span style={{ color: "#34d399", flexShrink: 0, marginTop: "0.1em" }} aria-hidden="true">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="premium-card">
          <h2
            className="eyebrow"
            style={{ marginBottom: "0.875rem", color: "rgba(248, 113, 113, 0.9)" }}
          >
            Cons
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {tool.cons.map((item) => (
              <li
                key={item}
                style={{
                  display: "flex",
                  gap: "0.625rem",
                  alignItems: "flex-start",
                  fontSize: "0.9375rem",
                  lineHeight: 1.5,
                  color: "var(--text-secondary)",
                }}
              >
                <span style={{ color: "#f87171", flexShrink: 0, marginTop: "0.1em" }} aria-hidden="true">&#10007;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Use Cases */}
        <div className="premium-card">
          <h2 className="eyebrow" style={{ marginBottom: "0.875rem" }}>Use Cases</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {tool.useCases.map((item) => (
              <li
                key={item}
                style={{
                  display: "flex",
                  gap: "0.625rem",
                  alignItems: "flex-start",
                  fontSize: "0.9375rem",
                  lineHeight: 1.5,
                  color: "var(--text-secondary)",
                }}
              >
                <span style={{ color: "var(--accent-hover)", flexShrink: 0, marginTop: "0.1em" }} aria-hidden="true">&rarr;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Similar tools */}
      {alternatives.length > 0 && (
        <div
          className="premium-card"
          style={{ marginBottom: "1.25rem" }}
        >
          <h2 className="eyebrow" style={{ marginBottom: "1rem" }}>Similar Tools</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {alternatives.map((item) => (
              <Link
                key={item.id}
                href={`/tools/${item.slug}`}
                className="stack-chip"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Affiliate disclosure */}
      <div
        style={{
          background: "rgba(99, 102, 241, 0.07)",
          border: "1px solid rgba(99, 102, 241, 0.2)",
          borderLeft: "3px solid var(--accent)",
          borderRadius: "0 6px 6px 0",
          padding: "1rem 1.25rem",
        }}
      >
        <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "var(--text-secondary)", margin: 0 }}>
          <strong style={{ color: "var(--text-primary)" }}>Disclosure:</strong> Some links on this page
          may become affiliate links in future phases. We only recommend tools we&apos;ve actually tested.
        </p>
      </div>

    </div>
  );
}
