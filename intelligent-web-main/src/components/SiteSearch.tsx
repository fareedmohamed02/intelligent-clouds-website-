import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Boxes,
  Command,
  CornerDownLeft,
  HelpCircle,
  Home,
  Layers,
  Search,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { listServicePages } from "@/content/services";
import { listSolutionPages } from "@/content/solutions";
import { useFaqs, useServices, useSolutions } from "@/hooks/useCms";
import { useI18n } from "@/i18n";
import { localizedFaq } from "@/lib/localized-faq";
import { cn } from "@/lib/utils";

type SearchGroup = "services" | "solutions" | "faq" | "site";

export type SearchHit = {
  id: string;
  title: string;
  description: string;
  href: string;
  group: SearchGroup;
};

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function matches(hit: SearchHit, q: string) {
  const hay = `${hit.title} ${hit.description}`.toLowerCase();
  const terms = q.split(/\s+/).filter(Boolean);
  return terms.every((term) => hay.includes(term));
}

function groupIcon(group: SearchGroup) {
  switch (group) {
    case "services":
      return Layers;
    case "solutions":
      return Boxes;
    case "faq":
      return HelpCircle;
    default:
      return Home;
  }
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightText({ text, query }: { text: string; query: string }) {
  const raw = query.trim();
  if (!raw || !text) return <>{text}</>;

  const terms = Array.from(
    new Set(
      [raw, ...raw.split(/\s+/).filter((t) => t.length > 0)].map((t) => t.toLowerCase()),
    ),
  )
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp);

  if (terms.length === 0) return <>{text}</>;

  const pattern = new RegExp(`(${terms.join("|")})`, "gi");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        const isMatch = terms.some((t) => new RegExp(`^${t}$`, "i").test(part));
        if (isMatch) {
          return (
            <mark
              key={`${part}-${i}`}
              className="rounded-[4px] bg-orange-500/15 px-0.5 font-semibold text-orange-600"
            >
              {part}
            </mark>
          );
        }
        return <span key={`${part}-${i}`}>{part}</span>;
      })}
    </>
  );
}

type SiteSearchProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SiteSearch({ open, onOpenChange }: SiteSearchProps) {
  const navigate = useNavigate();
  const { locale, t } = useI18n();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const services = useServices();
  const solutions = useSolutions();
  const faqs = useFaqs();

  const index = useMemo<SearchHit[]>(() => {
    const byHref = new Map<string, SearchHit>();

    const upsert = (hit: SearchHit, { preferExistingTitle = false } = {}) => {
      const prev = byHref.get(hit.href);
      if (!prev) {
        byHref.set(hit.href, hit);
        return;
      }
      byHref.set(hit.href, {
        ...prev,
        ...hit,
        title: preferExistingTitle ? prev.title || hit.title : hit.title || prev.title,
        description:
          (hit.description?.length ?? 0) > (prev.description?.length ?? 0)
            ? hit.description
            : prev.description,
      });
    };

    const pages: SearchHit[] = [
      {
        id: "page-home",
        title: t.common.home,
        description: t.search.pages.home,
        href: "/",
        group: "site",
      },
      {
        id: "page-services",
        title: t.nav.services,
        description: t.search.pages.services,
        href: "/services",
        group: "site",
      },
      {
        id: "page-solutions",
        title: t.nav.solutions,
        description: t.search.pages.solutions,
        href: "/solutions",
        group: "site",
      },
      {
        id: "page-about",
        title: t.nav.about,
        description: t.search.pages.about,
        href: "/about",
        group: "site",
      },
      {
        id: "page-contact",
        title: t.nav.contactSales,
        description: t.search.pages.contact,
        href: "/contact",
        group: "site",
      },
      {
        id: "page-faq",
        title: t.nav.faq,
        description: t.search.pages.faq,
        href: "/faq",
        group: "site",
      },
      {
        id: "page-support",
        title: t.nav.support,
        description: t.search.pages.support,
        href: "/support",
        group: "site",
      },
      {
        id: "page-book",
        title: t.nav.bookDemo,
        description: t.search.pages.book,
        href: "/book-demo",
        group: "site",
      },
    ];

    for (const hit of pages) upsert(hit);

    for (const page of listServicePages(locale)) {
      upsert({
        id: `static-service-${page.slug}`,
        title: page.title,
        description: page.summary || page.tagline || "",
        href: `/services/${page.slug}`,
        group: "services",
      });
    }

    for (const page of listSolutionPages(locale)) {
      upsert({
        id: `static-solution-${page.slug}`,
        title: page.title,
        description: page.summary || page.tagline || "",
        href: `/solutions/${page.slug}`,
        group: "solutions",
      });
    }

    if (locale !== "ar") {
      for (const item of services.data ?? []) {
        upsert({
          id: `service-${item._id}`,
          title: item.title,
          description: item.summary || "",
          href: `/services/${item.slug}`,
          group: "services",
        });
      }

      for (const item of solutions.data ?? []) {
        upsert({
          id: `solution-${item._id}`,
          title: item.title,
          description: item.summary || "",
          href: `/solutions/${item.slug}`,
          group: "solutions",
        });
      }
    }

    for (const item of faqs.data ?? []) {
      if (locale === "ar" && (!item.questionAr?.trim() || !item.answerHtmlAr?.trim())) continue;
      const loc = localizedFaq(item, locale);
      const answer = stripHtml(loc.answerHtml);
      upsert({
        id: `faq-${item._id}`,
        title: loc.question,
        description: answer || loc.question,
        href: `/faq#${item._id}`,
        group: "faq",
      });
    }

    return Array.from(byHref.values());
  }, [services.data, solutions.data, faqs.data, locale, t]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index.slice(0, 10);
    return index.filter((hit) => matches(hit, q)).slice(0, 20);
  }, [index, query]);

  useEffect(() => {
    setActive(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const go = (href: string) => {
    onOpenChange(false);
    navigate(href);
  };

  const groupLabels = t.search.groups;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-w-xl gap-0 overflow-hidden border-border-200 p-0",
          "rounded-[16px] bg-white shadow-[0_24px_64px_-24px_rgba(4,39,95,0.4)]",
          "[&>button]:hidden",
        )}
      >
        <DialogTitle className="sr-only">{t.search.title}</DialogTitle>

        <div className="border-b border-border-200 px-3 py-2.5 sm:px-4">
          <div className="flex items-center gap-2 rounded-xl border border-border-200 bg-white px-2.5 focus-within:border-orange-500/55 focus-within:ring-2 focus-within:ring-orange-500/10">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
              <Search className="h-3.5 w-3.5" aria-hidden />
            </span>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search.placeholder}
              className="h-10 w-full bg-transparent text-sm font-medium text-navy-900 outline-none placeholder:font-normal placeholder:text-text-600"
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((i) => Math.max(i - 1, 0));
                } else if (e.key === "Enter" && results[active]) {
                  e.preventDefault();
                  go(results[active].href);
                }
              }}
            />
            <kbd className="hidden shrink-0 items-center gap-1 rounded-md border border-border-200 bg-surface-50 px-1.5 py-0.5 font-mono text-[10px] text-text-600 sm:inline-flex">
              ESC
            </kbd>
          </div>
        </div>

        <div className="ic-scroll max-h-[min(22rem,50vh)] overflow-y-auto px-1.5 py-1.5 sm:px-2">
          {results.length === 0 ? (
            <div className="px-3 py-10 text-center">
              <span className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef3f8] text-navy-900/50">
                <Search className="h-4 w-4" aria-hidden />
              </span>
              <p className="text-sm font-semibold text-navy-900">
                {t.search.noMatches}
              </p>
              <p className="mt-1 text-xs text-text-600">
                {t.search.noMatchesHint.replace("{query}", query)}
              </p>
            </div>
          ) : (
            <ul className="space-y-0.5">
              {results.map((hit, indexRow) => {
                const Icon = groupIcon(hit.group);
                const label =
                  hit.group === "site" ? null : groupLabels[hit.group];
                const isActive = indexRow === active;
                const description =
                  hit.description?.trim() || t.search.noDescription;
                return (
                  <li key={hit.id}>
                    <button
                      type="button"
                      className={cn(
                        "group flex w-full items-start gap-2.5 rounded-xl border px-2.5 py-2 text-start transition-colors",
                        isActive
                          ? "border-border-200 bg-[#eef3f8]"
                          : "border-transparent hover:bg-[#f7f9fc]",
                      )}
                      onMouseEnter={() => setActive(indexRow)}
                      onClick={() => go(hit.href)}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                          isActive
                            ? "bg-white text-orange-500 ring-1 ring-border-200"
                            : "bg-[#eef3f8] text-navy-900/70",
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[13px] font-semibold leading-tight text-navy-900">
                            <HighlightText text={hit.title} query={query} />
                          </span>
                          {label ? (
                            <span className="rounded-full bg-white px-1.5 py-px font-mono text-[9px] uppercase tracking-[0.08em] text-text-600 ring-1 ring-border-200">
                              {label}
                            </span>
                          ) : null}
                        </span>
                        <span className="mt-0.5 block line-clamp-3 text-xs leading-snug text-text-600">
                          <HighlightText text={description} query={query} />
                        </span>
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors",
                          isActive
                            ? "bg-orange-500 text-white"
                            : "border border-transparent text-navy-900/40 opacity-0 group-hover:border-border-200 group-hover:bg-white group-hover:opacity-100",
                        )}
                        aria-hidden
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border-200 bg-[#f7f9fc] px-3 py-2 text-[11px] text-text-600 sm:px-4">
          <span className="inline-flex flex-wrap items-center gap-2.5">
            <Hint>
              <kbd className="rounded border border-border-200 bg-white px-1 py-0.5 font-mono text-[10px]">
                ↑
              </kbd>
              <kbd className="rounded border border-border-200 bg-white px-1 py-0.5 font-mono text-[10px]">
                ↓
              </kbd>
              {t.search.navigate}
            </Hint>
            <Hint>
              <CornerDownLeft className="h-3 w-3" aria-hidden />
              {t.search.open}
            </Hint>
            <Hint className="hidden sm:inline-flex">
              <Command className="h-3 w-3" aria-hidden />
              K
            </Hint>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-navy-900/45">
            {results.length}{" "}
            {results.length === 1 ? t.search.result : t.search.results}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Hint({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      {children}
    </span>
  );
}

/** Global ⌘K / Ctrl+K listener for site search. */
export function useSiteSearchHotkey(onOpen: () => void) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpen();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onOpen]);
}
