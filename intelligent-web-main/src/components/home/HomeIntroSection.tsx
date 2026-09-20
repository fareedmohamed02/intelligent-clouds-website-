import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/ui/section-shell";
import { useI18n } from "@/i18n";

export function HomeIntroSection() {
  const { t } = useI18n();
  const intro = t.home.intro;

  return (
    <SectionShell
      tone="white"
      title={intro.title}
      lead={intro.supporting}
      className="[&_.section-shell-body]:mt-6"
    >
      <Reveal>
        <p className="max-w-3xl text-[clamp(1rem,1.25vw,1.075rem)] leading-[1.8] text-text-600">
          {intro.description}
        </p>
      </Reveal>
    </SectionShell>
  );
}
