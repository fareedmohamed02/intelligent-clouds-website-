import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { brand } from "@/lib/assets";
import { listServicePages } from "@/content/services";
import { useI18n } from "@/i18n";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const featuredServiceSlugs = [
  "cloud-computing",
  "networking",
  "analytics",
  "ai",
  "integration",
  "disaster-recovery",
] as const;

const desktopPositions = [
  { x: -430, y: -210, z: -180, rotate: -10 },
  { x: -360, y: 175, z: -80, rotate: 8 },
  { x: -150, y: -300, z: -260, rotate: -5 },
  { x: 185, y: -275, z: -100, rotate: 7 },
  { x: 400, y: -125, z: -220, rotate: -9 },
  { x: 355, y: 195, z: -60, rotate: 8 },
];

const compactPositions = [
  { x: -112, y: -190, z: -80, rotate: -8 },
  { x: 112, y: -145, z: -120, rotate: 7 },
  { x: -116, y: -15, z: -180, rotate: -5 },
  { x: 118, y: 20, z: -90, rotate: 7 },
  { x: -104, y: 165, z: -140, rotate: -8 },
  { x: 110, y: 180, z: -60, rotate: 6 },
];

/**
 * Home-route-only entry sequence. The existing Home sections render directly
 * after this component and remain otherwise untouched.
 */
export function CloudIntroExperience() {
  const root = useRef<HTMLElement | null>(null);
  const logoStage = useRef<HTMLDivElement | null>(null);
  const logo = useRef<HTMLImageElement | null>(null);
  const ambient = useRef<HTMLDivElement | null>(null);
  const scrollCue = useRef<HTMLParagraphElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reduced = usePrefersReducedMotion();
  const { locale, t } = useI18n();
  const isArabic = locale === "ar";
  const introductionLabel = isArabic
    ? `${t.brand} مقدمة للخدمات السحابية`
    : `${t.brand} services introduction`;
  const scrollCueLabel = isArabic ? "مرّر للاستكشاف" : "Scroll to explore";

  const services = useMemo(() => {
    const bySlug = new Map(listServicePages(locale).map((service) => [service.slug, service]));
    return featuredServiceSlugs.flatMap((slug) => {
      const service = bySlug.get(slug);
      return service ? [service] : [];
    });
  }, [locale]);

  useLayoutEffect(() => {
    if (reduced || !root.current || !logoStage.current || !logo.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const cards = cardRefs.current.filter((card): card is HTMLDivElement => card !== null);
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.25,
    });
    const update = (time: number) => lenis.raf(time * 1000);
    const ctx = gsap.context(() => {
      gsap.set(cards, { autoAlpha: 0, scale: 0.24, x: 0, y: 0, z: -680, rotateZ: 0 });
      gsap.set(logoStage.current, { transformPerspective: 1400, transformStyle: "preserve-3d" });
      gsap.set(logo.current, { transformPerspective: 1400, transformOrigin: "50% 50%" });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=240%",
          scrub: 0.75,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(logoStage.current, { scale: 0.94, rotateY: -5, rotateX: 3, duration: 0.22 }, 0.08)
        .to(scrollCue.current, { autoAlpha: 0, y: 12, duration: 0.12 }, 0.1);

      cards.forEach((card, index) => {
        const positions = () =>
          window.matchMedia("(max-width: 639px)").matches ? compactPositions : desktopPositions;
        const position = positions()[index] ?? desktopPositions[index];
        timeline.to(
          card,
          {
            autoAlpha: 1,
            x: () => position.x,
            y: () => position.y,
            z: () => position.z,
            rotateZ: () => position.rotate,
            scale: window.matchMedia("(max-width: 639px)").matches ? 0.82 : 1,
            duration: 0.34,
          },
          0.2 + index * 0.09,
        );
      });

      timeline
        .to(ambient.current, { scale: 1.22, autoAlpha: 0.92, duration: 0.42 }, 0.42)
        .to(cards, { autoAlpha: 0, scale: 1.2, z: 80, duration: 0.22, stagger: 0.025 }, 0.78)
        .to(logoStage.current, { rotateY: 0, rotateX: 0, duration: 0.2 }, 0.76)
        .to(logo.current, { scale: 13, autoAlpha: 0.96, duration: 0.36, ease: "power4.in" }, 0.78)
        .to(ambient.current, { scale: 2.2, autoAlpha: 1, duration: 0.34, ease: "power4.in" }, 0.8);
    }, root);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, [reduced, services.length]);

  return (
    <section
      ref={root}
      className="ic-cloud-intro relative z-[60] -mt-14 h-[100svh] min-h-[34rem] overflow-hidden bg-[whitesmoke] text-white"
      aria-label={introductionLabel}
    >
      <div ref={ambient} aria-hidden className="ic-cloud-intro__ambient" />
      <div aria-hidden className="ic-cloud-intro__grid" />
      <div className="ic-cloud-intro__scene" aria-hidden>
        <div ref={logoStage} className="ic-cloud-intro__logo-stage">
          <span className="ic-cloud-intro__halo" />
          <img
            ref={logo}
            src={brand.logo}
            alt=""
            className="ic-cloud-intro__logo"
            width={280}
            height={280}
            decoding="async"
          />
        </div>

        {services.map((service, index) => (
          <div
            key={service.slug}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            className="ic-cloud-intro__service"
          >
            <span className="ic-cloud-intro__service-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{service.title}</span>
          </div>
        ))}
      </div>

      <p ref={scrollCue} className="ic-cloud-intro__scroll-cue">
        <span aria-hidden>↓</span> {scrollCueLabel}
      </p>

      <div className="sr-only">
        <p>{introductionLabel}.</p>
        <ul>
          {services.map((service) => (
            <li key={service.slug}>{service.title}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
