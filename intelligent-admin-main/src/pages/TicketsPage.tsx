import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import type { TicketItem, TicketStatus } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/datetime";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { EmptyState, ErrorState } from "@/components/EmptyState";
import { ListPagination } from "@/components/ListPagination";
import { ListCount } from "@/components/ListCount";
import { StatusBadge } from "@/components/StatusBadge";
import { toast } from "@/components/ui/toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useListPagination } from "@/hooks/useListPagination";
import { LifeBuoy } from "lucide-react";

const statuses: Array<TicketStatus | "all"> = [
  "all",
  "new",
  "in_progress",
  "resolved",
  "closed",
];

function statusLabel(value: TicketStatus | "all") {
  if (value === "all") return "All";
  if (value === "in_progress") return "In progress";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function TicketsPage() {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<TicketStatus | "all">("all");
  const [selected, setSelected] = useState<TicketItem | null>(null);
  const [notes, setNotes] = useState("");

  const totalQuery = useQuery({
    queryKey: ["admin-tickets-total"],
    queryFn: async () => {
      const res = await apiFetch<{ success: boolean; data: TicketItem[] }>(
        "/admin/tickets",
      );
      return res.data.length;
    },
  });

  const query = useQuery({
    queryKey: ["admin-tickets", status],
    queryFn: async () => {
      const qs = status === "all" ? "" : `?status=${status}`;
      const res = await apiFetch<{ success: boolean; data: TicketItem[] }>(
        `/admin/tickets${qs}`,
      );
      return res.data;
    },
  });

  const pagination = useListPagination(query.data ?? [], { resetKey: status });
  const filteredCount = query.data?.length ?? 0;
  const totalCount = totalQuery.data ?? filteredCount;

  const update = useMutation({
    mutationFn: async (payload: {
      id: string;
      status?: TicketStatus;
      adminNotes?: string;
    }) => {
      return apiFetch<{ success: boolean; data: TicketItem }>(
        `/admin/tickets/${payload.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status: payload.status,
            adminNotes: payload.adminNotes,
          }),
        },
      );
    },
    onSuccess: (res) => {
      void queryClient.invalidateQueries({ queryKey: ["admin-tickets"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-tickets-total"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
      setSelected(res.data);
      setNotes(res.data.adminNotes || "");
      toast.success("Ticket updated");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-navy-900">Support Tickets</h1>
          <p className="mt-1 text-text-600">
            Triage public support requests by status and tier.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ListCount
            total={totalCount}
            filtered={filteredCount}
            singular="ticket"
            filterLabel={status === "all" ? null : statusLabel(status)}
            loading={query.isLoading || totalQuery.isLoading}
            icon={LifeBuoy}
          />
          <Select
            value={status}
            onValueChange={(value) => setStatus(value as TicketStatus | "all")}
          >
            <SelectTrigger className="w-[11.5rem]" aria-label="Filter by status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((value) => (
                <SelectItem key={value} value={value}>
                  {statusLabel(value)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {query.isError ? (
        <ErrorState
          description={query.error instanceof Error ? query.error.message : undefined}
          onRetry={() => void query.refetch()}
        />
      ) : (
        <div className="rounded-[12px] border border-border-200 bg-white">
          {query.isLoading ? (
            <div className="space-y-3 p-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : filteredCount === 0 ? (
            <EmptyState
              title="No tickets yet"
              description="Public support form submissions will appear here for triage."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Created</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-end">View</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagination.pageItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="text-xs text-text-600">
                      {item.createdAt ? (
                        <span className="block">
                          <span className="block font-medium text-navy-900">
                            {formatDate(item.createdAt)}
                          </span>
                          <span className="block">{formatTime(item.createdAt)}</span>
                        </span>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell className="max-w-xs font-medium">{item.subject}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="font-mono text-xs">{item.tier}</TableCell>
                    <TableCell>
                      <StatusBadge status={item.status} />
                    </TableCell>
                    <TableCell className="text-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelected(item);
                          setNotes(item.adminNotes || "");
                        }}
                      >
                        Open
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {!query.isLoading && filteredCount > 0 ? (
            <ListPagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              from={pagination.from}
              to={pagination.to}
              onPageChange={pagination.setPage}
            />
          ) : null}
        </div>
      )}

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-[min(100%,28rem)] overflow-y-auto">
          {selected ? (
            <>
              <SheetTitle>{selected.subject}</SheetTitle>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-text-600">Created</dt>
                  <dd className="font-medium">
                    {selected.createdAt
                      ? `${formatDate(selected.createdAt)}, ${formatTime(selected.createdAt)}`
                      : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-text-600">Requester</dt>
                  <dd className="font-medium">
                    {selected.name} · {selected.email}
                  </dd>
                </div>
                <div>
                  <dt className="text-text-600">Tier</dt>
                  <dd className="font-medium">{selected.tier}</dd>
                </div>
                <div>
                  <dt className="text-text-600">Status</dt>
                  <dd className="mt-1">
                    <StatusBadge status={selected.status} />
                  </dd>
                </div>
                <div>
                  <dt className="text-text-600">Body</dt>
                  <dd className="whitespace-pre-wrap">{selected.body}</dd>
                </div>
              </dl>

              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-navy-900">Status</p>
                <div className="flex flex-wrap gap-2">
                  {(
                    ["new", "in_progress", "resolved", "closed"] as TicketStatus[]
                  ).map((value) => (
                    <Button
                      key={value}
                      size="sm"
                      variant={selected.status === value ? "default" : "outline"}
                      disabled={update.isPending}
                      onClick={() =>
                        update.mutate({ id: selected._id, status: value })
                      }
                    >
                      {statusLabel(value)}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Label>Admin notes</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
                <Button
                  type="button"
                  disabled={update.isPending}
                  onClick={() =>
                    update.mutate({ id: selected._id, adminNotes: notes })
                  }
                >
                  Save notes
                </Button>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}
