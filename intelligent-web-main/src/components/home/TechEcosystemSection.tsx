import { SectionShell } from "@/components/ui/section-shell";
import { IcCard } from "@/components/ui/ic-card";
import { TechBrandIcon } from "@/components/TechBrandIcon";
import type { TechBrand } from "@/lib/tech-brands";
import { getTechBrand } from "@/lib/tech-brands";
import { useI18n } from "@/i18n";

function brandsFor(ids: string[]): TechBrand[] {
  return ids.map((id) => getTechBrand(id)).filter((b): b is TechBrand => Boolean(b));
}

export function TechEcosystemSection() {
  const { t } = useI18n();
  const te = t.home.techEcosystem;

  const groups = [
    {
      title: te.cloudFoundations.title,
      body: te.cloudFoundations.body,
      brandIds: ["azure", "aws"],
    },
    {
      title: te.containers.title,
      body: te.containers.body,
      brandIds: ["kubernetes", "docker", "helm"],
    },
    {
      title: te.iac.title,
      body: te.iac.body,
      brandIds: ["terraform", "opentofu", "ansible"],
    },
    {
      title: te.delivery.title,
      body: te.delivery.body,
      brandIds: ["github-actions", "azure-devops", "argo", "gitlab"],
    },
    {
      title: te.observability.title,
      body: te.observability.body,
      brandIds: ["prometheus", "grafana", "elastic"],
    },
    {
      title: te.securityTooling.title,
      body: te.securityTooling.body,
      brandIds: ["vault", "cloudflare"],
    },
  ];

  return (
    <SectionShell tone="soft" eyebrow={te.eyebrow} title={te.title} lead={te.lead}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => {
          const brands = brandsFor(g.brandIds);
          return (
            <IcCard key={g.title} className="p-6">
              <div className="flex flex-wrap items-center gap-3">
                {brands.map((b) => (
                  <TechBrandIcon key={b.id} brand={b} size="md" />
                ))}
              </div>
              <h3 className="font-display mt-4 text-base font-semibold text-navy-900">
                {g.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-600">{g.body}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {brands.map((b) => (
                  <li
                    key={b.id}
                    className="rounded-md bg-[#eef3f8] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-navy-900/70"
                  >
                    {b.name}
                  </li>
                ))}
              </ul>
            </IcCard>
          );
        })}
      </div>
    </SectionShell>
  );
}
