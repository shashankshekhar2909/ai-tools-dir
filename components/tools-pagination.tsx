"use client";

import { Pagination } from "@carbon/react";
import { useRouter } from "next/navigation";

type Props = {
  totalItems: number;
  page: number;
  pageSize: number;
  q?: string;
  category?: string;
  pricing?: string;
  useCase?: string;
};

export function ToolsPagination({ totalItems, page, pageSize, q, category, pricing, useCase }: Props) {
  const router = useRouter();

  const push = (nextPage: number, nextPageSize: number) => {
    const params = new URLSearchParams();
    if (q?.trim()) params.set("q", q.trim());
    if (category) params.set("category", category);
    if (pricing) params.set("pricing", pricing);
    if (useCase) params.set("useCase", useCase);
    if (nextPage > 1) params.set("page", String(nextPage));
    if (nextPageSize !== 12) params.set("pageSize", String(nextPageSize));
    router.push(`/tools${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <div className="pagination-shell" style={{ marginTop: "1.5rem" }}>
      <Pagination
        page={page}
        pageSize={pageSize}
        pageSizes={[12, 24, 36]}
        totalItems={totalItems}
        onChange={({ page: nextPage, pageSize: nextPageSize }) => push(nextPage, nextPageSize)}
      />
    </div>
  );
}
