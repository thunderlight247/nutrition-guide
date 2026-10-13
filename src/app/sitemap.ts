import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { postsSitemapQuery } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch(postsSitemapQuery);

  return [
    {
      url: "https://nutritionguide.xyz",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://nutritionguide.xyz/blog",
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...posts.map((post: { slug: string; publishedAt?: string }) => ({
      url: `https://nutritionguide.xyz/blog/${post.slug}`,
      ...(post.publishedAt && { lastModified: new Date(post.publishedAt) }),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
