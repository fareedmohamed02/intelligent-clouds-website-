import { useEffect, useMemo, useState } from "react";

export const LIST_PAGE_SIZE = 20;

export function useListPagination<T>(
  items: T[],
  options?: { pageSize?: number; resetKey?: string | number },
) {
  const pageSize = options?.pageSize ?? LIST_PAGE_SIZE;
  const resetKey = options?.resetKey;
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [resetKey]);

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  return {
    page,
    setPage,
    pageSize,
    total,
    totalPages,
    pageItems,
    from: total === 0 ? 0 : (page - 1) * pageSize + 1,
    to: Math.min(page * pageSize, total),
  };
}
