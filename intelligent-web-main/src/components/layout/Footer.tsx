import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { useI18n } from "@/i18n";
import { useSettings } from "@/hooks/useCms";
import { brand } from "@/lib/assets";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164 } from "@/lib/contact";

function ColHeading({ children }: { children: string }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-navy-900/70">
      {children}
    </p>
  );
}

function ColLink({ to, children }: { to: string; children: string }) {
  return (
    <Link
      to={to}
      className="block text-[15px] leading-relaxed text-[#5C6570] transition-colors hover:text-orange-500"
    >
      {children}
    </Link>
  );
}

function ContactRow({
  href,
  icon: Icon,
  label,
  external,
}: {
  href: string;
  icon: typeof Mail;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-center gap-3"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-azure-500/12 text-azure-500 transition-colors group-hover:bg-azure-500/18">
        <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      </span>
      <span className="break-all text-[15px] font-semibold leading-snug text-navy-900 underline-offset-2 group-hover:underline">
        {label}
      </span>
    </a>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-[14px] font-medium text-navy-900 transition-colors hover:text-orange-500"
    >
      {label}
      <ArrowUpRight className="h-3.5 w-3.5 opacity-55" aria-hidden />
    </a>
  );
}

/** Soft theme-colored filled circles — no arcs / white squares. */
function FooterCircles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <span className="absolute -left-16 top-8 h-48 w-48 rounded-full bg-azure-500/[0.08]" />
      <span className="absolute -right-20 top-24 h-64 w-64 rounded-full bg-navy-900/[0.05]" />
      <span className="absolute bottom-8 left-1/3 h-36 w-36 rounded-full bg-orange-500/[0.06]" />
      <span className="absolute right-1/4 top-10 h-24 w-24 rounded-full bg-azure-500/[0.1]" />
    </div>
  );
}

const companyLinks = [
  { to: "/about", key: "about" as const },
  { to: "/book-demo", key: "bookDemo" as const },
  { to: "/contact", key: "contact" as const },
];

const engageLinks = [
  { to: "/services", key: "services" as const },
  { to: "/solutions", key: "solutions" as const },
];

const resourceLinks = [
  { to: "/faq", key: "faq" as const },
  { to: "/support", key: "support" as const },
];

export function Footer() {
  const { t } = useI18n();
  const settings = useSettings();
  const email = settings.data?.email || CONTACT_EMAIL;
  const phone = settings.data?.phone || CONTACT_PHONE_DISPLAY;
  const phoneHref = settings.data?.phone || CONTACT_PHONE_E164;
  const linkedin = settings.data?.social?.linkedin;
  const twitter = settings.data?.social?.twitter;

  const companyLabels = {
    about: t.nav.about,
    bookDemo: t.nav.bookDemo,
    contact: t.footer.contact,
  };
  const engageLabels = {
    services: t.nav.services,
    solutions: t.nav.solutions,
  };
  const resourceLabels = {
    faq: t.nav.faq,
    support: t.nav.support,
  };

  return (
    <footer className="relative overflow-hidden border-t border-[#E6E9EF] bg-[#F4F5F7] text-navy-900">
      <FooterCircles />

      <div className="relative z-10 border-b border-[#E6E9EF]">
        <div className="container-ic flex flex-col gap-5 py-9 sm:flex-row sm:items-center sm:gap-0 lg:py-10">
          <Link to="/" className="inline-flex shrink-0 items-center gap-2.5 pe-6 sm:pe-8">
            <img
              src={brand.logo}
              alt=""
              className="h-8 w-auto"
              width={32}
              height={32}
              loading="lazy"
              decoding="async"
            />
            <span className="text-[15px] font-semibold tracking-tight">
              <span className="text-navy-900">Intelligent</span>
              <span className="text-orange-500"> Cloud</span>
            </span>
          </Link>
          <div aria-hidden className="hidden h-8 w-px shrink-0 bg-[#D7DCE4] sm:block" />
          <p className="max-w-xl text-[14px] leading-relaxed text-[#6B7280] sm:ps-8 lg:text-[15px]">
            {t.footer.blurb}
          </p>
        </div>
      </div>

      {/* Two sections: Contact (left) · Company / Engage / Resources (right) */}
      <div className="relative z-10 border-b border-[#E6E9EF]">
        <div className="container-ic grid gap-12 py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-16 lg:py-14">
          {/* Left — Contact */}
          <div>
            <ColHeading>{t.footer.contact}</ColHeading>
            <div className="mt-5 space-y-4">
              <ContactRow href={`mailto:${email}`} icon={Mail} label={email} />
              <ContactRow
                href={`tel:${phoneHref.replace(/\s+/g, "")}`}
                icon={Phone}
                label={phone}
              />
            </div>
            {linkedin || twitter ? (
              <div className="mt-8">
                <ColHeading>{t.footer.follow}</ColHeading>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {linkedin ? <SocialLink href={linkedin} label="LinkedIn" /> : null}
                  {twitter ? <SocialLink href={twitter} label="X" /> : null}
                </div>
              </div>
            ) : null}
          </div>

          {/* Right — Company · Engage · Resources */}
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            <div>
              <ColHeading>{t.nav.company}</ColHeading>
              <ul className="mt-4 space-y-3">
                {companyLinks.map((l) => (
                  <li key={l.to}>
                    <ColLink to={l.to}>{companyLabels[l.key]}</ColLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <ColHeading>{t.footer.engage}</ColHeading>
              <ul className="mt-4 space-y-3">
                {engageLinks.map((l) => (
                  <li key={l.to}>
                    <ColLink to={l.to}>{engageLabels[l.key]}</ColLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <ColHeading>{t.footer.resources}</ColHeading>
              <ul className="mt-4 space-y-3">
                {resourceLinks.map((l) => (
                  <li key={l.to}>
                    <ColLink to={l.to}>{resourceLabels[l.key]}</ColLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container-ic relative z-10 flex flex-col gap-3 py-5 text-[13px] text-[#4B5563] sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0 leading-5">
          © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
        </p>
        <nav className="flex items-center gap-6" aria-label={t.footer.legal}>
          <Link
            to="/privacy"
            className="inline-flex items-center leading-5 font-medium text-navy-900 transition-colors hover:text-orange-500"
          >
            {t.footer.privacy}
          </Link>
          <Link
            to="/terms"
            className="inline-flex items-center leading-5 font-medium text-navy-900 transition-colors hover:text-orange-500"
          >
            {t.footer.terms}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
