import { NextResponse } from "next/server";
import blogData from "../../blog.json";

const SITE_URL = "https://nicholasegner.com";

// Converts "PT3M28S" -> 208 seconds
function isoDurationToSeconds(iso) {
  if (!iso || typeof iso !== "string") return 0;
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || "0", 10);
  const mins = parseInt(match[2] || "0", 10);
  const secs = parseInt(match[3] || "0", 10);
  return hours * 3600 + mins * 60 + secs;
}

export async function GET() {
  // Grab only the post objects (values), not [key, value] pairs
  const posts = Object.values(blogData);

  const videos = posts.filter(
    (post) => post?.published && post?.primaryVideo?.src?.mp4,
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${videos
    .map((post) => {
      const video = post.primaryVideo;
      const durationSeconds = isoDurationToSeconds(video.duration);

      return `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <video:video>
      <video:thumbnail_loc>${video.thumbnail}</video:thumbnail_loc>
      <video:title><![CDATA[${post.title}]]></video:title>
      <video:description><![CDATA[${post.description || ""}]]></video:description>
      <video:content_loc>${video.src.mp4}</video:content_loc>
      ${durationSeconds ? `<video:duration>${durationSeconds}</video:duration>` : ""}
      <video:publication_date>${post.published_time}</video:publication_date>
      ${video.familyFriendly ? "<video:family_friendly>yes</video:family_friendly>" : "<video:family_friendly>no</video:family_friendly>"}
    </video:video>
  </url>`;
    })
    .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
