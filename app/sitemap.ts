import type { MetadataRoute } from "next";
import { reader } from "./reader";
import { BASE_URL } from "./lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pageSlugs, locationPageSlugs, postSlugs] = await Promise.all([
    reader.collections.pages.list(),
    reader.collections.locationPages.list(),
    reader.collections.posts.list(),
  ]);

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
    ...locationPageSlugs.map((slug) => ({
      url: `${BASE_URL}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...postSlugs.map((slug) => ({
      url: `${BASE_URL}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
