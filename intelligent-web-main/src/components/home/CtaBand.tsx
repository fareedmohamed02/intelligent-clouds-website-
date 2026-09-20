import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { whatsappExpertUrl } from "@/lib/whatsapp";
import { useI18n } from "@/i18n";

export function CtaBand() {
  const { t } = useI18n();
  const c = t.home.ctaBand;

  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 80% at 100% 50%, rgba(242,106,19,0.18), transparent 55%), radial-gradient(ellipse 40% 60% at 0% 80%, rgba(67,139,216,0.16), transparent 50%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-[0.1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(180deg, black, transparent)",
        }}
      />

      <div className="container-ic relative grid gap-10 py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center lg:gap-16 lg:pb-28 lg:pt-24">
        <Reveal>
          <p className="text-mono-label text-white/55">{c.eyebrow}</p>
          <h2 className="mt-4 max-w-3xl text-h2 text-white">{c.title}</h2>
          <p className="mt-5 max-w-lg text-lead text-white/60">{c.lead}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link to="/book-demo">
                {t.common.bookAssessment} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="light">
              <Link to="/contact">{t.common.contactSales}</Link>
            </Button>
          </div>
        </Reveal>

        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1" stagger={0.12}>
          <StaggerItem>
            <a
              href={whatsappExpertUrl(t.whatsapp.defaultMessage)}
              target="_blank"
              rel="noreferrer"
              className="group/card flex items-start gap-4 rounded-[12px] border border-white/10 bg-white/[0.04] p-5 transition-[border-color,background-color,box-shadow] duration-500 ease-out hover:border-orange-500/40 hover:bg-orange-500/10"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-orange-500/20 text-orange-500 transition-transform duration-500 group-hover/card:rotate-12 group-hover/card:scale-110">
                <MessageCircle className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block font-display text-sm font-semibold text-white">
                  {t.common.talkExpert}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-white/55">
                  {c.talkExpertBody}
                </span>
              </span>
            </a>
          </StaggerItem>
          <StaggerItem>
            <Link
              to="/services"
              className="group/card flex items-start gap-4 rounded-[12px] border border-white/10 bg-white/[0.04] p-5 transition-[border-color,background-color,box-shadow] duration-500 ease-out hover:border-orange-500/40 hover:bg-orange-500/10"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-orange-500/20 text-orange-500 transition-transform duration-500 group-hover/card:rotate-12 group-hover/card:scale-110">
                <Layers className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block font-display text-sm font-semibold text-white">
                  {c.browseServices}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-white/55">
                  {c.browseServicesBody}
                </span>
              </span>
            </Link>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
