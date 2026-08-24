import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteUrl();
  const posts = getPosts().map((post) => ({
    url: `${origin}/essays/${post.slug}`,
    lastModified: post.date,
  }));

  return [
    { url: origin },
    { url: `${origin}/essays` },
    { url: `${origin}/about` },
    ...posts,
  ];
}
