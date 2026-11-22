import { type MetadataRoute } from "next";

import { BRAND } from "~/config/brand";
import { url } from "~/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing useful to crawl under the API.
      disallow: ["/api/"],
    },
    // Only point at the sitemap once the live origin is known.
    ...(BRAND.siteUrl ? { sitemap: url("/sitemap.xml"), host: BRAND.siteUrl } : {}),
  };
}
