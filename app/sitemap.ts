import type { MetadataRoute } from "next";
import { reader } from "./reader";

const BASE_URL = "https://rodi-sites.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pageSlugs = await reader.collections.pages.list();

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pageSlugs.map((slug) => ({
      url: `${BASE_URL}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
