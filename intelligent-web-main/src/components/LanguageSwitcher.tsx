import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  className?: string;
  variant?: "compact" | "full" | "tab";
};

export function LanguageSwitcher({
  className,
  variant = "compact",
}: LanguageSwitcherProps) {
  if (variant === "tab") {
    return <LanguageTab className={className} />;
  }

  if (variant === "full") {
    return <LanguageFull className={className} />;
  }

  return <LanguagePill className={className} />;
}

/* ========================================================================= */
/* FLOATING EDGE TAB                                                        */
/* ========================================================================= */

function LanguageTab({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  const isArabic = locale === "ar";

  return (
    <div dir="ltr" className={cn("shrink-0", className)}>
      <div
        role="group"
        aria-label={t.nav.language}
        className={cn(
          "relative flex h-11 w-[120px] items-center overflow-hidden bg-navy-900 p-0.5",
          "transition-[border-radius] duration-500 ease-out",
          isArabic
            ? "rounded-e-[12px] rounded-s-none"
            : "rounded-s-[12px] rounded-e-none",
          "shadow-[0_6px_18px_-8px_rgba(4,39,95,0.45)]",
        )}
      >
        {/* Active background */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-[9px] bg-white shadow-[0_2px_6px_rgba(4,39,95,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: isArabic ? "translateX(100%)" : "translateX(0)" }}
        />

        {/* English */}
        <button
          type="button"
          onClick={() => setLocale("en")}
          title={t.nav.english}
          aria-label={t.nav.english}
          aria-pressed={!isArabic}
          className={cn(
            "relative z-10",
            "flex h-full w-1/2",
            "items-center justify-center",

            "cursor-pointer",

            "rounded-[18px]",

            "text-[11px]",
            "font-bold",
            "tracking-wide",

            "transition-colors duration-200",

            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-white/60",

            !isArabic ? "text-navy-900" : "text-white/55 hover:text-white",
          )}
        >
          English
        </button>

        {/* Arabic */}
        <button
          type="button"
          onClick={() => setLocale("ar")}
          title={t.nav.arabic}
          aria-label={t.nav.arabic}
          aria-pressed={isArabic}
          className={cn(
            "relative z-10",
            "flex h-full w-1/2",
            "items-center justify-center",

            "cursor-pointer",

            "rounded-[18px]",

            "font-arabic",
            "text-[17px]",
            "font-medium",
            "leading-none",

            "transition-colors duration-200",

            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-white/60",

            isArabic ? "text-navy-900" : "text-white/55 hover:text-white",
          )}
        >
          عالعربية{" "}
        </button>
      </div>
    </div>
  );
}
/* ========================================================================= */
/* COMPACT PILL                                                             */
/* ========================================================================= */

function LanguagePill({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();
  const isArabic = locale === "ar";

  return (
    <div
      dir="ltr"
      role="group"
      aria-label={t.nav.language}
      className={cn(
        "relative grid h-9 w-[5.75rem] grid-cols-2 items-center rounded-full border border-navy-900/12 p-1",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-1 start-1 w-[calc(50%-6px)] rounded-full bg-navy-900/10 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isArabic && "translate-x-full",
        )}
      />
      <button
        type="button"
        onClick={() => setLocale("en")}
        title={t.nav.english}
        aria-label={t.nav.english}
        aria-pressed={!isArabic}
        className={cn(
          "relative z-10 grid h-full place-items-center text-[11px] font-semibold leading-none tracking-wide transition-colors duration-300 ease-out",
          !isArabic ? "text-navy-900" : "text-navy-900/45 hover:text-navy-900",
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("ar")}
        title={t.nav.arabic}
        aria-label={t.nav.arabic}
        aria-pressed={isArabic}
        className={cn(
          "relative z-10 grid h-full place-items-center transition-colors duration-300 ease-out",
          isArabic ? "text-navy-900" : "text-navy-900/45 hover:text-navy-900",
        )}
      >
        <span className="inline-flex h-[11px] w-full -translate-y-px items-center justify-center font-arabic text-[12px] font-semibold leading-none">
          ع
        </span>
      </button>
    </div>
  );
}

/* ========================================================================= */
/* FULL VERSION                                                             */
/* ========================================================================= */

function LanguageFull({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  const isArabic = locale === "ar";

  return (
    <div className={cn("space-y-2", className)}>
      <p className="px-1 text-[10px] font-medium uppercase tracking-[0.12em] text-text-600">
        {t.nav.language}
      </p>

      <div
        dir="ltr"
        className="inline-flex items-center gap-1 rounded-full border border-border-200 bg-white p-1"
      >
        <button
          type="button"
          onClick={() => setLocale("en")}
          aria-pressed={!isArabic}
          className={cn(
            "flex h-8 min-w-10 items-center justify-center rounded-full px-3",
            "text-[11px] font-semibold tracking-wide transition-all",
            !isArabic ? "bg-navy-900 text-white" : "text-text-600 hover:bg-navy-900/5",
          )}
        >
          EN
        </button>

        <button
          type="button"
          onClick={() => setLocale("ar")}
          aria-pressed={isArabic}
          className={cn(
            "flex h-8 min-w-10 items-center justify-center rounded-full px-3",
            "font-arabic text-[16px] leading-none transition-all",
            isArabic ? "bg-navy-900 text-white" : "text-text-600 hover:bg-navy-900/5",
          )}
        >
          ع
        </button>
      </div>
    </div>
  );
}
