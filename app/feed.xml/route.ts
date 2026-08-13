import { getPosts } from "@/lib/posts";

function siteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return url.replace(/\/$/, "");
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const dynamic = "force-dynamic";

export function GET() {
  const origin = siteUrl();
  const posts = getPosts();

  const items = posts
    .map((post) => {
      const link = `${origin}/posts/${post.slug}`;
      const description = escapeXml(post.excerpt || post.content.slice(0, 280));
      const pubDate = new Date(`${post.date}T00:00:00Z`).toUTCString();

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Telos</title>
    <link>${origin}</link>
    <description>Notes on technology and regulation.</description>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=600, stale-while-revalidate",
    },
  });
}
