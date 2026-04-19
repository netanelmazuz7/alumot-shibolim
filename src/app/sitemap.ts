import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://alumat-shibolim.co.il";
  const now = new Date();

  const staticPaths = [
    "",
    "/about",
    "/how-it-works",
    "/community",
    "/blog",
    "/faq",
    "/requirements",
    "/contact",
    "/join",
    "/security",
    "/privacy",
    "/terms",
    "/accessibility-statement",
  ];

  const blogPosts = [
    "why-community-protection",
    "ai-transparency-in-claims",
    "what-is-p2p-protection",
  ];

  return [
    ...staticPaths.map((p) => ({
      url: `${baseUrl}${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1.0 : 0.7,
    })),
    ...blogPosts.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
