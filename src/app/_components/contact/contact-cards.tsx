import {
  Clock,
  Mail,
  MessageCircle,
  Phone,
  Siren,
  type LucideIcon,
} from "lucide-react";

import { PageSection } from "~/app/_components/page/page-section";
import { Reveal } from "~/app/_components/ui/reveal";
import { CONTACT } from "~/config/contact";
import { cn } from "~/lib/utils";

type Card = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  note?: string;
  urgent?: boolean;
  external?: boolean;
};

/** Ways to reach us. A card appears only when its detail exists. */
export function ContactCards() {
  const cards: Card[] = [];

  if (CONTACT.emergency) {
    cards.push({
      icon: Siren,
      label: CONTACT.emergency.label,
      value: CONTACT.emergency.value,
      href: CONTACT.emergency.href,
      note: CONTACT.emergency.note,
      urgent: true,
    });
  }

  cards.push({
    icon: Phone,
    label: CONTACT.appointments.label,
    value: CONTACT.appointments.value,
    href: CONTACT.appointments.href,
    note: CONTACT.appointments.note,
  });

  if (CONTACT.email) {
    cards.push({
      icon: Mail,
      label: "Email",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      note: "We reply during working hours.",
    });
  }

  if (CONTACT.whatsapp) {
    cards.push({
      icon: MessageCircle,
      label: "WhatsApp",
      value: CONTACT.whatsapp.display,
      href: CONTACT.whatsapp.href,
      note: "Message us for non-urgent questions.",
      external: true,
    });
  }

  if (CONTACT.hours) {
    cards.push({ icon: Clock, label: "Hours", value: CONTACT.hours });
  }

  return (
    <PageSection id="ways" title="Ways to reach us" tone="white">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Reveal
              key={card.label}
              as="li"
              delay={i * 90}
              className={cn(
                "rounded-[26px] border p-6",
                card.urgent
                  ? "bg-brand-deep border-transparent text-white"
                  : "border-line bg-white",
              )}
            >
              <span
                className={cn(
                  "grid size-12 place-items-center rounded-full",
                  card.urgent ? "bg-white/20" : "bg-brand-tint-1",
                )}
              >
                <Icon
                  className={cn(
                    "size-5",
                    card.urgent ? "text-white" : "text-brand-deep",
                  )}
                  aria-hidden
                />
              </span>

              <p
                className={cn(
                  "mt-4 text-[0.95rem] font-bold",
                  card.urgent ? "text-white/85" : "text-charcoal",
                )}
              >
                {card.label}
              </p>

              {card.href ? (
                <a
                  href={card.href}
                  {...(card.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={cn(
                    "font-display mt-1 flex min-h-12 items-center text-[1.25rem] font-extrabold hover:underline",
                    card.urgent ? "text-white" : "text-ink",
                  )}
                >
                  {card.value}
                </a>
              ) : (
                <p
                  className={cn(
                    "font-display mt-1 text-[1.25rem] font-extrabold",
                    card.urgent ? "text-white" : "text-ink",
                  )}
                >
                  {card.value}
                </p>
              )}

              {card.note && (
                <p
                  className={cn(
                    "mt-1 text-[0.9rem]",
                    card.urgent ? "text-white/85" : "text-charcoal",
                  )}
                >
                  {card.note}
                </p>
              )}
            </Reveal>
          );
        })}
      </ul>
    </PageSection>
  );
}
