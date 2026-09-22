// Generates dynamic XML sitemap indexing static routes and published blog posts.
import type { MetadataRoute } from "next";
import { getAllBlogs } from "@/lib/getBlogs";

const SITE_URL = process.env.SITE_URL || "https://www.adisofttech.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllBlogs();

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogEntries,
  ];
}
