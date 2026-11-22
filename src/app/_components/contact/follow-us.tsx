import { AtSign } from "lucide-react";

import { PageSection } from "~/app/_components/page/page-section";
import { Reveal } from "~/app/_components/ui/reveal";
import { BRAND } from "~/config/brand";

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

const HANDLE = "@birthrootshospitals";

export function FollowUs() {
  const links = [
    { label: "Instagram", href: BRAND.social.instagram, icon: <InstagramGlyph /> },
    {
      label: "Threads",
      href: BRAND.social.threads,
      icon: <AtSign className="size-5" aria-hidden />,
    },
  ];

  return (
    <PageSection id="follow" title="Follow us" tone="white">
      <Reveal>
        <ul className="flex flex-wrap gap-4">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-line text-ink hover:border-brand-strong flex min-h-12 items-center gap-3 rounded-full border bg-white px-4 py-2 transition-colors"
              >
                <span className="bg-brand-tint-1 grid size-10 place-items-center rounded-full">
                  {link.icon}
                </span>
                <span className="font-bold">{link.label}</span>
                <span className="text-charcoal text-[0.9rem]">{HANDLE}</span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </PageSection>
  );
}
