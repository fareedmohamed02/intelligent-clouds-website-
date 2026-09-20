import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import type { ContactStatus, ContactSubmission } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/datetime";
import { useI18n } from "@/i18n";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Inbox } from "lucide-react";

const statuses: Array<ContactStatus | "all"> = ["all", "new", "reviewed", "archived"];

function statusLabel(value: ContactStatus | "all") {
  return value === "all" ? "All" : value.charAt(0).toUpperCase() + value.slice(1);
}

export function ContactsPage() {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<ContactStatus | "all">("all");
  const [selected, setSelected] = useState<ContactSubmission | null>(null);
  const [notes, setNotes] = useState("");

  const totalQuery = useQuery({
    queryKey: ["admin-contacts-total"],
    queryFn: async () => {
      const res = await apiFetch<{ success: boolean; data: ContactSubmission[] }>(
        "/admin/contacts",
      );
      return res.data.length;
    },
  });

  const query = useQuery({
    queryKey: ["admin-contacts", status],
    queryFn: async () => {
      const qs = status === "all" ? "" : `?status=${status}`;
      const res = await apiFetch<{ success: boolean; data: ContactSubmission[] }>(
        `/admin/contacts${qs}`,
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
      status?: ContactStatus;
      adminNotes?: string;
    }) => {
      return apiFetch<{ success: boolean; data: ContactSubmission }>(
        `/admin/contacts/${payload.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status: payload.status,
            adminNotes: payload.adminNotes,
          }),
        },
      );
    },
    onSuccess: (res, variables) => {
      void queryClient.invalidateQueries({ queryKey: ["admin-contacts"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-contacts-total"] });
      setSelected(res.data);
      setNotes(res.data.adminNotes || "");
      toast.success(
        variables.adminNotes !== undefined ? t.contacts.notesSaved : "Status updated",
      );
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const openContact = (item: ContactSubmission) => {
    setSelected(item);
    setNotes(item.adminNotes || "");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-navy-900">{t.contacts.title}</h1>
          <p className="mt-1 text-text-600">{t.contacts.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ListCount
            total={totalCount}
            filtered={filteredCount}
            singular="enquiry"
            plural="enquiries"
            filterLabel={status === "all" ? null : statusLabel(status)}
            loading={query.isLoading || totalQuery.isLoading}
            icon={Inbox}
          />
          <Select
            value={status}
            onValueChange={(value) => setStatus(value as ContactStatus | "all")}
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
              title={t.contacts.emptyTitle}
              description={t.contacts.emptyDescription}
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Created</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Need</TableHead>
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
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.company}</TableCell>
                    <TableCell>{item.need}</TableCell>
                    <TableCell>
                      <StatusBadge status={item.status} />
                    </TableCell>
                    <TableCell className="text-end">
                      <Button size="sm" variant="outline" onClick={() => openContact(item)}>
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
              <SheetTitle>{selected.name}</SheetTitle>
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
                  <dt className="text-text-600">Email</dt>
                  <dd className="font-medium">{selected.email}</dd>
                </div>
                <div>
                  <dt className="text-text-600">Company</dt>
                  <dd className="font-medium">{selected.company}</dd>
                </div>
                <div>
                  <dt className="text-text-600">Phone</dt>
                  <dd className="font-medium">{selected.phone}</dd>
                </div>
                <div>
                  <dt className="text-text-600">Need</dt>
                  <dd className="font-medium">{selected.need}</dd>
                </div>
                <div>
                  <dt className="text-text-600">Message</dt>
                  <dd className="whitespace-pre-wrap">{selected.message || "—"}</dd>
                </div>
                <div>
                  <dt className="text-text-600">Status</dt>
                  <dd className="mt-1">
                    <StatusBadge status={selected.status} />
                  </dd>
                </div>
                <div>
                  <dt className="text-text-600">Meta</dt>
                  <dd className="font-mono text-xs text-text-600">
                    {selected.meta?.ip || "—"} · {selected.meta?.userAgent || "—"}
                  </dd>
                </div>
              </dl>
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-navy-900">Update status</p>
                <div className="flex flex-wrap gap-2">
                  {(["new", "reviewed", "archived"] as ContactStatus[]).map((value) => (
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
                <Label>{t.contacts.adminNotes}</Label>
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
                  {t.contacts.saveNotes}
                </Button>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}
