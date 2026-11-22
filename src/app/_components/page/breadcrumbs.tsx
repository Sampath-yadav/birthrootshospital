import Link from "next/link";

import { JsonLd } from "~/app/_components/page/json-ld";
import { breadcrumbJsonLd } from "~/lib/seo";

export type Crumb = { label: string; href?: string };

/**
 * The visible trail plus the matching BreadcrumbList, built from one list.
 * The last item is the current page: give it an `href` so it appears in the
 * structured data, and it is still rendered as plain text, not a link.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = items
    .filter((c) => c.href)
    .map((c) => ({ name: c.label, path: c.href! }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <nav aria-label="Breadcrumb">
        <ol className="text-charcoal flex flex-wrap items-center gap-x-2 text-[0.88rem]">
          {items.map((crumb, i) => (
            <li key={crumb.label} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden className="text-brand-soft">
                  /
                </span>
              )}
              {crumb.href && i < items.length - 1 ? (
                <Link
                  href={crumb.href}
                  className="hover:text-brand-deep underline-offset-4 hover:underline"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
