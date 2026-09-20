import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TocItem = { id: string; text: string; level: 2 | 3 };

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Renders sanitized TipTap HTML and builds a TOC from H2/H3. */
export function RichHtml({
  html,
  className,
  onToc,
}: {
  html: string;
  className?: string;
  onToc?: (items: TocItem[]) => void;
}) {
  const [prepared, setPrepared] = useState(html);

  useEffect(() => {
    const container = document.createElement("div");
    container.innerHTML = html || "";
    const toc: TocItem[] = [];
    const used = new Set<string>();

    container.querySelectorAll("h2, h3").forEach((node) => {
      const text = node.textContent?.trim() || "";
      if (!text) return;
      let id = slugifyHeading(text) || "section";
      let n = 1;
      while (used.has(id)) {
        id = `${slugifyHeading(text)}-${n++}`;
      }
      used.add(id);
      node.id = id;
      toc.push({
        id,
        text,
        level: node.tagName.toLowerCase() === "h2" ? 2 : 3,
      });
    });

    setPrepared(container.innerHTML);
    onToc?.(toc);
  }, [html, onToc]);

  return (
    <div
      className={cn(
        "rich-html prose prose-sm max-w-none text-text-900",
        "prose-headings:scroll-mt-28 prose-headings:text-navy-900 prose-a:text-orange-500",
        "prose-pre:bg-navy-950 prose-pre:text-azure-100",
        "prose-code:rounded prose-code:bg-azure-100/60 prose-code:px-1",
        "prose-img:rounded-[10px]",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: prepared }}
    />
  );
}

/**
 * “On this page” rail — vertical track + orange active indicator (scroll spy).
 */
export function ArticleToc({
  items,
  tone = "light",
}: {
  items: TocItem[];
  tone?: "light" | "dark";
}) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const dark = tone === "dark";

  useEffect(() => {
    if (!items.length) return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0));
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.25, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    if (!activeId) return;
    const link = document.querySelector<HTMLElement>(
      `[data-toc-id="${CSS.escape(activeId)}"]`,
    );
    link?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  if (!items.length) return null;

  return (
    <nav aria-label="On this page">
      <p
        className={cn(
          "font-mono text-[10px] uppercase tracking-[0.16em]",
          dark ? "text-white/35" : "text-[#8a96a6]",
        )}
      >
        On this page
      </p>
      <ul
        className={cn(
          "relative mt-4 border-s",
          dark ? "border-white/10" : "border-border-200",
        )}
      >
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                data-toc-id={item.id}
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "relative block border-s-2 py-1.5 text-[13px] leading-snug transition-colors duration-200",
                  item.level === 3 ? "ps-5" : "ps-3.5",
                  active
                    ? "-ms-px border-orange-500 font-medium text-orange-500"
                    : dark
                      ? "border-transparent text-white/45 hover:text-white"
                      : "border-transparent text-[#6b7a8c] hover:text-navy-900",
                )}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export type { TocItem };
