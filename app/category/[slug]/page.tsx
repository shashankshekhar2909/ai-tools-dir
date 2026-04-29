import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ToolCard } from "@/components/tool-card";
import { getCategoryBySlug } from "@/lib/db/categories";
import { getTools } from "@/lib/db/tools";
import { Tool } from "@/lib/types";
import { getSiteUrl } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) {
    return {
      title: "Category Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = `${category.name} AI Tools`;
  const description = category.description;
  const url = `${getSiteUrl()}/category/${category.slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: {
      title,
      description,
      url,
      type: "website",
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

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return notFound();
  const categoryTools = await getTools({ category: category.slug });

  return (
    <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "3rem 1.5rem" }}>

      {/* Category hero */}
      <div
        style={{
          backgroundColor: "var(--surface-1)",
          border: "1px solid var(--border-subtle)",
          borderTop: "3px solid var(--accent)",
          borderRadius: "0 0 10px 10px",
          padding: "2.5rem",
          marginBottom: "2.5rem",
        }}
      >
        <span className="eyebrow">Category</span>
        <h1
          style={{
            marginBottom: "0.75rem",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            lineHeight: 1.15,
          }}
        >
          {category.name}
        </h1>
        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "var(--text-secondary)",
            maxWidth: "42rem",
            margin: 0,
          }}
        >
          {category.description}
        </p>
      </div>

      {/* Results count */}
      {categoryTools.length > 0 && (
        <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          {categoryTools.length} tool{categoryTools.length !== 1 ? "s" : ""} in this category
        </p>
      )}

      {categoryTools.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {categoryTools.map((tool: Tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
            No tools in this category yet
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            Check back soon — more tools are being added.
          </p>
          <Link href="/tools" className="btn-primary" style={{ display: "inline-flex" }}>
            Browse all tools
          </Link>
        </div>
      )}
    </div>
  );
}
