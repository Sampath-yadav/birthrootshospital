import { ADDRESS_LINE, BRAND } from "./brand";

/**
 * The hospital has one branch today. Add another only when the hospital confirms it,
 * and keep `live: false` until it is open — the branches section stays hidden while
 * Mancherial is the only live entry.
 */
export type Branch = {
  slug: string;
  name: string;
  address: string;
  phone: { label: string; tel: string };
  mapsUrl: string;
  live: boolean;
};

export const BRANCHES: Branch[] = [
  {
    slug: BRAND.branch.slug,
    name: BRAND.branch.name,
    address: ADDRESS_LINE,
    phone: BRAND.helpline,
    mapsUrl: BRAND.mapsUrl,
    live: true,
  },
  // TODO(user): add further branches here when they open.
];
