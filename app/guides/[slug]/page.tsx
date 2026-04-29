import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb, BreadcrumbItem } from "@carbon/react";
import { getGuideBySlug } from "@/lib/db/guides";

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return notFound();

  return (
    <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
      <article style={{ maxWidth: "48rem", margin: "0 auto" }}>
        <Breadcrumb noTrailingSlash style={{ marginBottom: "2rem" }}>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/blog">Guides</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>{guide.title}</BreadcrumbItem>
        </Breadcrumb>

        <header
          style={{
            backgroundColor: "var(--surface-1)",
            border: "1px solid var(--border-subtle)",
            borderTop: "3px solid var(--accent)",
            borderRadius: "0 0 10px 10px",
            padding: "2.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <span className="eyebrow" style={{ marginBottom: "0.75rem" }}>
            {guide.type}
          </span>
          <h1
            style={{
              margin: "0 0 0.75rem",
              fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              lineHeight: 1.2,
            }}
          >
            {guide.title}
          </h1>
          <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", margin: 0 }}>
            {guide.readingTime} &middot; {guide.publishedAt}
          </p>
        </header>

        <div
          className="premium-card"
          style={{ padding: "2.5rem" }}
        >
          <p
            style={{
              whiteSpace: "pre-line",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              fontSize: "0.9375rem",
              margin: 0,
            }}
          >
            {guide.content}
          </p>
        </div>
      </article>
    </div>
  );
}
