import { Suspense } from "react";
import { getTools } from "@/lib/db/tools";
import { Tool } from "@/lib/types";
import { CompareClient } from "@/components/compare-client";

export const metadata = {
  title: "Compare Tools",
};

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ a?: string; b?: string }> }) {
  const params = await searchParams;
  const allTools: Tool[] = await getTools();

  // Slim down data to only what compare UI needs
  const slim = allTools.map((t) => ({
    id: t.id,
    slug: t.slug,
    name: t.name,
    shortDescription: t.shortDescription,
    pricingType: t.pricingType,
    rating: t.rating,
    bestFor: t.bestFor,
    pros: t.pros,
    cons: t.cons,
  }));

  return (
    <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <span className="eyebrow">Side-by-side</span>
        <h1 className="section-heading">Compare Tools</h1>
        <p className="section-subtext" style={{ marginTop: "0.5rem" }}>
          Side-by-side evaluation across pricing, rating, and strengths.
        </p>
      </div>
      <Suspense fallback={<p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Loading comparison...</p>}>
        <CompareClient tools={slim} initialA={params.a ?? ""} initialB={params.b ?? ""} />
      </Suspense>
    </div>
  );
}
