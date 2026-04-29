"use client";

import { Pagination } from "@carbon/react";
import { useRouter } from "next/navigation";

type Props = {
  totalItems: number;
  page: number;
  pageSize: number;
};

export function AdminToolsPagination({ totalItems, page, pageSize }: Props) {
  const router = useRouter();

  const push = (nextPage: number, nextPageSize: number) => {
    const params = new URLSearchParams();
    if (nextPage > 1) params.set("page", String(nextPage));
    if (nextPageSize !== 20) params.set("pageSize", String(nextPageSize));
    router.push(`/admin/tools${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <div className="pagination-shell" style={{ marginTop: "1rem" }}>
      <Pagination
        page={page}
        pageSize={pageSize}
        pageSizes={[20, 40, 60]}
        totalItems={totalItems}
        onChange={({ page: nextPage, pageSize: nextPageSize }) => push(nextPage, nextPageSize)}
      />
    </div>
  );
}
