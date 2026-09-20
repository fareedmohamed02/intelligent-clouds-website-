import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GripVertical, Plus } from "lucide-react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { apiFetch } from "@/lib/api";
import type { FaqItem } from "@/lib/types";
import { useI18n } from "@/i18n";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RowActions } from "@/components/RowActions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "@/components/ui/toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const emptyForm = {
  question: "",
  questionAr: "",
  answer: "",
  answerAr: "",
  order: 0,
  published: true,
};

function htmlToPlain(html: string): string {
  if (!html) return "";
  return html
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function plainToHtml(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  const escaped = trimmed
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .split(/\n{2,}/)
    .map((block) => `<p>${block.replace(/\n/g, "<br />")}</p>`)
    .join("");
}

function SortableFaqRow({
  item,
  index,
  disabled,
  onEdit,
  onDelete,
  editLabel,
  deleteLabel,
}: {
  item: FaqItem;
  index: number;
  disabled?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  editLabel: string;
  deleteLabel: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item._id, disabled });

  return (
    <TableRow
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(isDragging && "relative z-10 bg-azure-100/60 shadow-md")}
    >
      <TableCell>
        <div className="flex items-start gap-2">
          <button
            type="button"
            className="mt-0.5 inline-flex h-8 w-8 shrink-0 cursor-grab items-center justify-center rounded-lg text-text-600 hover:bg-[#eef3f8] hover:text-navy-900 active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Drag to reorder"
            disabled={disabled}
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <div className="min-w-0">
            <p className="font-medium text-navy-900">
              <span className="me-2 tabular-nums text-text-600">{index + 1}.</span>
              {item.question}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <StatusBadge status={item.published ? "published" : "draft"} />
      </TableCell>
      <TableCell className="text-end">
        <RowActions
          editLabel={editLabel}
          deleteLabel={deleteLabel}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}

export function FaqsPage() {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<FaqItem | null>(null);
  const [confirmSave, setConfirmSave] = useState(false);

  const [items, setItems] = useState<FaqItem[]>([]);

  const query = useQuery({
    queryKey: ["admin-faqs"],
    queryFn: async () => {
      const res = await apiFetch<{ success: boolean; data: FaqItem[] }>("/admin/faqs");
      return res.data;
    },
  });

  useEffect(() => {
    if (query.data) setItems(query.data);
  }, [query.data]);

  useEffect(() => {
    if (!formOpen) return;
    if (editing) {
      setForm({
        question: editing.question,
        questionAr: editing.questionAr ?? "",
        answer: htmlToPlain(editing.answerHtml),
        answerAr: htmlToPlain(editing.answerHtmlAr ?? ""),
        order: editing.order,
        published: editing.published,
      });
    } else {
      setForm(emptyForm);
    }
  }, [formOpen, editing]);

  const save = useMutation({
    mutationFn: async () => {
      const payload = {
        question: form.question,
        questionAr: form.questionAr,
        answerHtml: plainToHtml(form.answer),
        answerHtmlAr: plainToHtml(form.answerAr),
        answerJson: null,
        order: form.order,
        published: form.published,
      };
      if (editing) {
        return apiFetch(`/admin/faqs/${editing._id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      }
      return apiFetch("/admin/faqs", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-faqs"] });
      setFormOpen(false);
      setEditing(null);
      toast.success(editing ? t.faqs.updated : t.faqs.created);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      await apiFetch(`/admin/faqs/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-faqs"] });
      setDeleteTarget(null);
      toast.success(t.faqs.deleted);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const reorder = useMutation({
    mutationFn: async (items: { id: string; order: number }[]) => {
      await apiFetch("/admin/faqs/reorder", {
        method: "PUT",
        body: JSON.stringify({ items }),
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-faqs"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((item) => item._id === active.id);
    const newIndex = items.findIndex((item) => item._id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const next = arrayMove(items, oldIndex, newIndex);
    setItems(next);
    reorder.mutate(next.map((item, i) => ({ id: item._id, order: i + 1 })));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-navy-900">{t.faqs.title}</h1>
          <p className="mt-1 text-text-600">{t.faqs.description}</p>
          <p className="mt-1 text-xs text-text-600">
            Drag the handle to move a question anywhere in the list.
          </p>
        </div>
        <Button
          type="button"
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          <Plus className="h-4 w-4" /> {t.faqs.newFaq}
        </Button>
      </div>

      <div className="rounded-[12px] border border-border-200 bg-white">
        {query.isLoading ? (
          <div className="space-y-3 p-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.faqs.question}</TableHead>
                  <TableHead>{t.common.status}</TableHead>
                  <TableHead className="text-end">{t.common.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <SortableContext
                  items={items.map((item) => item._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {items.map((item, index) => (
                    <SortableFaqRow
                      key={item._id}
                      item={item}
                      index={index}
                      disabled={reorder.isPending}
                      editLabel={t.common.edit}
                      deleteLabel={t.common.delete}
                      onEdit={() => {
                        setEditing(item);
                        setFormOpen(true);
                      }}
                      onDelete={() => setDeleteTarget(item)}
                    />
                  ))}
                </SortableContext>
              </TableBody>
            </Table>
          </DndContext>
        )}
      </div>

      <Dialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditing(null);
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? t.faqs.editFaq : t.faqs.newFaq}</DialogTitle>
            <DialogDescription>{t.faqs.formDescription}</DialogDescription>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (editing) setConfirmSave(true);
              else save.mutate();
            }}
          >
            <div className="space-y-2">
              <Label>{t.common.order}</Label>
              <Input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) || 0 })}
              />
            </div>

            <Tabs defaultValue="en">
              <TabsList>
                <TabsTrigger value="en">{t.faqs.tabEn}</TabsTrigger>
                <TabsTrigger value="ar">{t.faqs.tabAr}</TabsTrigger>
              </TabsList>
              <TabsContent
                value="en"
                forceMount
                className="mt-4 space-y-4 data-[state=inactive]:hidden"
              >
                <div className="space-y-2">
                  <Label>{t.faqs.question}</Label>
                  <Input
                    value={form.question}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, question: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t.faqs.answer}</Label>
                  <Textarea
                    value={form.answer}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, answer: e.target.value }))
                    }
                    rows={6}
                    placeholder="Write the answer…"
                  />
                </div>
              </TabsContent>
              <TabsContent
                value="ar"
                forceMount
                className="mt-4 space-y-4 data-[state=inactive]:hidden"
              >
                <div className="space-y-2" dir="rtl">
                  <Label>{t.faqs.questionAr}</Label>
                  <Input
                    value={form.questionAr}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, questionAr: e.target.value }))
                    }
                    dir="rtl"
                  />
                </div>
                <div className="space-y-2" dir="rtl">
                  <Label>{t.faqs.answerAr}</Label>
                  <Textarea
                    value={form.answerAr}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, answerAr: e.target.value }))
                    }
                    rows={6}
                    dir="rtl"
                    placeholder="اكتب الإجابة…"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              {t.common.published}
            </label>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
                {t.common.cancel}
              </Button>
              <Button type="submit" disabled={save.isPending || !form.question.trim()}>
                {save.isPending
                  ? t.common.saving
                  : editing
                    ? t.common.saveChanges
                    : t.faqs.createFaq}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirmSave}
        onOpenChange={setConfirmSave}
        tone="edit"
        destructive={false}
        title={t.common.saveConfirmTitle}
        description={t.common.saveConfirmDescription}
        confirmLabel={t.common.saveChanges}
        cancelLabel={t.common.cancel}
        loading={save.isPending}
        onConfirm={() => {
          setConfirmSave(false);
          save.mutate();
        }}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        tone="danger"
        title={t.faqs.deleteTitle}
        description={
          deleteTarget
            ? t.faqs.deleteConfirm.replace("{question}", deleteTarget.question)
            : ""
        }
        confirmLabel={t.common.delete}
        cancelLabel={t.common.cancel}
        loading={remove.isPending}
        onConfirm={() => {
          if (deleteTarget) remove.mutate(deleteTarget._id);
        }}
      />
    </div>
  );
}
