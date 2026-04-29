import { GuideCard } from "@/components/guide-card";
import { getGuides } from "@/lib/db/guides";
import { Guide } from "@/lib/types";

export const metadata = {
  title: "Guides",
};

export default async function BlogPage() {
  const guides = await getGuides();

  return (
    <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <div style={{ marginBottom: "2.5rem", maxWidth: "42rem" }}>
        <span className="eyebrow">Learn</span>
        <h1 className="section-heading">Guides</h1>
        <p className="section-subtext" style={{ marginTop: "0.5rem" }}>
          Builder-focused workflows, comparisons, and practical tool stacks.
        </p>
      </div>

      {guides.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {guides.map((guide: Guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            No guides yet
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", margin: 0 }}>
            Check back soon — content is being added.
          </p>
        </div>
      )}
    </div>
  );
}
