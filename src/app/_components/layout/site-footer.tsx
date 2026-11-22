import { AtSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ADDRESS_LINE, BRAND } from "~/config/brand";
import { BOOK_HREF } from "~/config/navigation";

/** lucide no longer ships brand marks, so the Instagram glyph is drawn here. */
function InstagramGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="size-5"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SERVICES = [
  { label: "Fertility & IVF", href: "/fertility-ivf" },
  { label: "Maternity & Obstetrics", href: "/services/maternity" },
  { label: "Gynaecology", href: "/services/gynaecology" },
  { label: "Laparoscopy", href: "/services/laparoscopy" },
  { label: "Fetal Medicine", href: "/services/fetal-medicine" },
  { label: "Newborn & Paediatric Care", href: "/services/newborn-paediatrics" },
];

const QUICK_LINKS = [
  { label: "About us", href: "/about" },
  { label: "Our specialists", href: "/specialists" },
  { label: "Blogs", href: "/blogs" },
  { label: "News and events", href: "/news" },
  { label: "Reach us", href: "/contact" },
];

// TODO(user): add "Online consultation" once the service is confirmed.
const PATIENT_CARE = [
  { label: "Book Appointment", href: BOOK_HREF },
  { label: "Find a doctor", href: "/specialists" },
  { label: "Check my reports", href: "/reports" },
];

const linkClass =
  "text-ink hover:text-brand-deep text-[0.95rem] hover:underline underline-offset-4";

function Column({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-display text-ink text-base font-extrabold">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="bg-brand-tint-1 border-brand-soft border-t pt-10 pb-8"
    >
      <div className="site-container">
        <div className="section-inner">
          <h2 className="sr-only">Site footer</h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.1fr]">
            <div>
              <Image
                src={BRAND.logo.src}
                alt={BRAND.logo.alt}
                width={BRAND.logo.width}
                height={BRAND.logo.height}
                sizes="200px"
                className="h-12 w-auto object-contain object-left"
              />
              <p className="text-charcoal mt-4 max-w-[34ch] text-[0.95rem]">
                Maternity, fertility and women&rsquo;s surgery in Mancherial,
                Telangana.
              </p>
              <ul className="mt-5 flex gap-3">
                <li>
                  <a
                    href={BRAND.social.instagram}
                    target="_blank"
                    rel="noopener"
                    aria-label="Birth Roots Hospital on Instagram"
                    className="text-ink hover:ring-brand-strong grid size-10 place-items-center rounded-full bg-white ring-1 ring-transparent transition"
                  >
                    <InstagramGlyph />
                  </a>
                </li>
                <li>
                  <a
                    href={BRAND.social.threads}
                    target="_blank"
                    rel="noopener"
                    aria-label="Birth Roots Hospital on Threads"
                    className="text-ink hover:ring-brand-strong grid size-10 place-items-center rounded-full bg-white ring-1 ring-transparent transition"
                  >
                    <AtSign className="size-5" aria-hidden />
                  </a>
                </li>
              </ul>
            </div>

            <Column title="Our services" links={SERVICES} />
            <Column title="Quick links" links={QUICK_LINKS} />
            <div>
              <Column title="Patient care" links={PATIENT_CARE} />
              <a
                href={BRAND.mapsUrl}
                target="_blank"
                rel="noopener"
                className={`${linkClass} mt-2.5 inline-block`}
              >
                Get directions
              </a>
            </div>

            <div>
              <h3 className="font-display text-ink text-base font-extrabold">
                Visit us
              </h3>
              <address className="text-charcoal mt-4 text-[0.95rem] not-italic">
                {ADDRESS_LINE}
              </address>
              <p className="mt-3">
                <a href={`tel:${BRAND.helpline.tel}`} className={linkClass}>
                  {BRAND.helpline.label}
                </a>
              </p>
              {/* Shown only once NEXT_PUBLIC_EMERGENCY_PHONE is set */}
              {BRAND.emergency.tel && (
                <p className="mt-1">
                  <a href={`tel:${BRAND.emergency.tel}`} className={linkClass}>
                    Emergency: {BRAND.emergency.label}
                  </a>
                </p>
              )}
              {BRAND.hours && (
                <p className="text-charcoal mt-3 text-[0.95rem]">
                  {BRAND.hours}
                </p>
              )}
            </div>
          </div>

          <div className="border-brand-soft mt-8 border-t pt-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-charcoal text-[0.85rem]">
                © {year} {BRAND.name}
              </p>
              <ul className="text-charcoal flex flex-wrap gap-x-5 gap-y-2 text-[0.85rem]">
                <li>
                  <Link href="/terms" className="hover:text-brand-deep">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-brand-deep">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className="hover:text-brand-deep">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
            <p className="text-charcoal mt-4 max-w-[80ch] text-[0.85rem]">
              The information on this website is general and is not a substitute
              for medical advice. In an emergency, call the emergency number.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
