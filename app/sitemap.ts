import type { MetadataRoute } from "next";

const siteUrl = "https://zjav.sk";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/firemne-weby`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/e-shop-shopware`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/cennik`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
