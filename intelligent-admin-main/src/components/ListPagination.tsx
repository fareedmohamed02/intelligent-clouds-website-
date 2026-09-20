import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LIST_PAGE_SIZE } from "@/hooks/useListPagination";

type ListPaginationProps = {
  page: number;
  totalPages: number;
  total: number;
  from: number;
  to: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
};

export function ListPagination({
  page,
  totalPages,
  total,
  from,
  to,
  pageSize = LIST_PAGE_SIZE,
  onPageChange,
}: ListPaginationProps) {
  if (total <= pageSize) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-200 px-4 py-3">
      <p className="text-sm text-text-600">
        Showing {from}–{to} of {total}
      </p>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <span className="min-w-[5.5rem] text-center text-sm text-text-600">
          Page {page} of {totalPages}
        </span>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
