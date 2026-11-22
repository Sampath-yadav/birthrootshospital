export type NavLeaf = {
  label: string;
  href: string;
  badge?: string;
  /** TODO(confirm): details not verified with the hospital yet */
  unconfirmed?: boolean;
};

export type NavItem =
  | { label: string; href: string; children?: undefined }
  | { label: string; href?: undefined; children: NavLeaf[] };

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Our Services",
    children: [
      { label: "Maternity & Obstetrics", href: "/services/maternity" },
      { label: "Gynaecology", href: "/services/gynaecology" },
      { label: "Laparoscopy", href: "/services/laparoscopy" },
      {
        label: "Newborn Care",
        href: "/services/newborn-paediatrics",
      },
    ],
  },
  { label: "Fertility & IVF", href: "/fertility-ivf" },
  { label: "Our Specialists", href: "/specialists" },
  { label: "Reach Us", href: "/contact" },
];

export const BOOK_HREF = "/book";

/** Pathname → is this nav item (or any child) the active route? */
export function isActive(item: NavItem, pathname: string): boolean {
  const match = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);
  if (item.children) return item.children.some((c) => match(c.href));
  return match(item.href);
}
