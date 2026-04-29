import { ToolCard } from "@/components/tool-card";
import { ToolsFilterBar } from "@/components/tools-filter-bar";
import { getCategories } from "@/lib/db/categories";
import { getTools } from "@/lib/db/tools";
import { Category, Tool } from "@/lib/types";

type Params = { q?: string; category?: string; pricing?: string; useCase?: string };

export const metadata = {
  title: "Tools Directory",
};

export default async function ToolsPage({ searchParams }: { searchParams: Promise<Params> }) {
  const params = await searchParams;
  const [categories, filtered] = await Promise.all([
    getCategories(),
    getTools({ q: params.q?.trim(), category: params.category, pricing: params.pricing, useCase: params.useCase }),
  ]);

  const hasFilters = !!(params.q || params.category || params.pricing || params.useCase);

  return (
    <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "3rem 1.5rem" }}>

      {/* Page header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <span className="eyebrow">Directory</span>
        <h1 className="section-heading">Tools Directory</h1>
        <p className="section-subtext" style={{ marginTop: "0.5rem" }}>
          Filter by purpose to quickly find tools for your exact use case.
        </p>
      </div>

      {/* Filter toolbar */}
      <ToolsFilterBar
        categories={categories}
        defaultQ={params.q ?? ""}
        defaultCategory={params.category ?? ""}
        defaultPricing={params.pricing ?? ""}
        defaultUseCase={params.useCase ?? ""}
        hasFilters={hasFilters}
        resultCount={filtered.length}
      />

      {/* Results grid */}
      <div style={{ marginTop: "2rem" }}>
        {filtered.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {filtered.map((tool: Tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p
              style={{
                fontSize: "1.0625rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
              }}
            >
              No tools found
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              Try adjusting your search or clearing some filters.
            </p>
            <a href="/tools" className="btn-primary" style={{ display: "inline-flex" }}>
              Clear all filters
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
