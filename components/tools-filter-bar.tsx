"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { Category } from "@/lib/types";

const useCaseOptions = [
  "Coding",
  "Research",
  "Design",
  "Video Creation",
  "Content Writing",
  "Automation",
  "Presentations",
  "Meeting Notes",
  "Marketing",
  "Prototyping",
];

interface Props {
  categories: Category[];
  defaultQ: string;
  defaultCategory: string;
  defaultPricing: string;
  defaultUseCase: string;
  hasFilters: boolean;
  resultCount?: number;
}

export function ToolsFilterBar({
  categories,
  defaultQ,
  defaultCategory,
  defaultPricing,
  defaultUseCase,
  hasFilters,
  resultCount,
}: Props) {
  const router = useRouter();
  const [q, setQ] = useState(defaultQ);
  const [category, setCategory] = useState(defaultCategory);
  const [pricing, setPricing] = useState(defaultPricing);
  const [useCase, setUseCase] = useState(defaultUseCase);
  const searchRef = useRef<HTMLInputElement>(null);

  function push(overrides: Partial<{ q: string; category: string; pricing: string; useCase: string }>) {
    const vals = { q, category, pricing, useCase, ...overrides };
    const params = new URLSearchParams();
    if (vals.q.trim()) params.set("q", vals.q.trim());
    if (vals.category) params.set("category", vals.category);
    if (vals.pricing) params.set("pricing", vals.pricing);
    if (vals.useCase) params.set("useCase", vals.useCase);
    router.push(`/tools${params.toString() ? `?${params}` : ""}`);
  }

  function clearFilters() {
    setQ("");
    setCategory("");
    setPricing("");
    setUseCase("");
    router.push("/tools");
    searchRef.current?.focus();
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      push({ q });
    }
  }

  return (
    <div className="toolbar" role="search" aria-label="Filter tools">
      {/* Search input */}
      <div className="toolbar-search filter-search-wrap">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6.5 11a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm3.84-.926L13 12.74" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <input
          ref={searchRef}
          type="search"
          className="filter-search-input"
          placeholder="Search tools, use cases, tags..."
          value={q}
          aria-label="Search tools"
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          onBlur={() => { if (q !== defaultQ) push({ q }); }}
        />
      </div>

      {/* Filter selects */}
      <div className="toolbar-filters">
        <label htmlFor="filter-category" className="cds--visually-hidden">Category</label>
        <select
          id="filter-category"
          className="filter-select"
          value={category}
          onChange={(e) => { setCategory(e.target.value); push({ category: e.target.value }); }}
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {categories.map((cat: Category) => (
            <option key={cat.id} value={cat.slug}>{cat.name}</option>
          ))}
        </select>

        <label htmlFor="filter-pricing" className="cds--visually-hidden">Pricing</label>
        <select
          id="filter-pricing"
          className="filter-select"
          value={pricing}
          onChange={(e) => { setPricing(e.target.value); push({ pricing: e.target.value }); }}
          aria-label="Filter by pricing"
        >
          <option value="">All pricing</option>
          <option value="Free">Free</option>
          <option value="Freemium">Freemium</option>
          <option value="Paid">Paid</option>
        </select>

        <label htmlFor="filter-usecase" className="cds--visually-hidden">Use case</label>
        <select
          id="filter-usecase"
          className="filter-select"
          value={useCase}
          onChange={(e) => { setUseCase(e.target.value); push({ useCase: e.target.value }); }}
          aria-label="Filter by use case"
        >
          <option value="">All use cases</option>
          {useCaseOptions.map((uc) => (
            <option key={uc} value={uc}>{uc}</option>
          ))}
        </select>
      </div>

      {/* Meta: count + clear */}
      <div className="toolbar-meta">
        {resultCount !== undefined && (
          <span className="result-count" aria-live="polite">
            {resultCount} tool{resultCount !== 1 ? "s" : ""}
          </span>
        )}
        {hasFilters && (
          <button
            type="button"
            className="filter-clear-btn"
            onClick={clearFilters}
            aria-label="Clear all filters"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
