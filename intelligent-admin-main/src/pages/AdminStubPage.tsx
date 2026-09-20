import { Badge } from "@/components/ui/badge";

type StubProps = { title: string; description: string };

export function AdminStubPage({ title, description }: StubProps) {
  return (
    <div className="rounded-[12px] border border-border-200 bg-white p-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold text-navy-900">{title}</h1>
        <Badge>Phase 0</Badge>
      </div>
      <p className="mt-3 max-w-2xl text-text-600">{description}</p>
    </div>
  );
}
