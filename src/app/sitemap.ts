import { type MetadataRoute } from "next";

import { DOCTORS } from "~/config/doctors";
import { POSTS } from "~/config/posts";
import { SPECIALITIES } from "~/config/specialities";
import { url } from "~/lib/seo";

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

/**
 * One list of routes, so adding a page means adding a line here.
 * A route that 404s would waste crawl budget, so pages that do not exist yet are
 * listed as TODOs below rather than as entries.
 */
const ROUTES: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/book", priority: 0.9, changeFrequency: "monthly" },
  { path: "/fertility-ivf", priority: 0.9, changeFrequency: "monthly" },
  { path: "/specialists", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  ...DOCTORS.map((d) => ({
    path: `/specialists/${d.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
];

// TODO(user): add once the pages exist —
// /blogs, /news, SPECIALITIES → /services/<id>, POSTS → /blogs/<slug>
void SPECIALITIES;
void POSTS;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((route) => ({
    url: url(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
