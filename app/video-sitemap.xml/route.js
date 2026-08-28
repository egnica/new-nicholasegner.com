import { NextResponse } from "next/server";
import blogData from "../../blog";

const SITE_URL = "https://www.nicholasegner.com";

function isoDurationToSeconds(iso) {
  if (!iso || typeof iso !== "string") return 0;

  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  return (
    Number(match[1] || 0) * 3600 +
    Number(match[2] || 0) * 60 +
    Number(match[3] || 0)
  );
}

function xmlEscape(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cdata(value = "") {
  return String(value).replace(/\]\]>/g, "]]]]><![CDATA[>");
}

function videoContentUrl(video) {
  return (
    video?.contentUrl ||
    video?.src?.mp4 ||
    video?.src?.webm ||
    undefined
  );
}

export async function GET() {
  const videos = Object.values(blogData).filter(
    (post) =>
      post?.live !== false &&
      post?.published !== false &&
      post?.primaryVideo &&
      videoContentUrl(post.primaryVideo) &&
      post.primaryVideo.thumbnail,
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videos
  .map((post) => {
    const video = post.primaryVideo;
    const contentUrl = videoContentUrl(video);
    const durationSeconds = isoDurationToSeconds(video.duration);
    const playerUrl = video.embedUrl;

    return `
  <url>
    <loc>${xmlEscape(`${SITE_URL}/blog/${post.slug}`)}</loc>
    <video:video>
      <video:thumbnail_loc>${xmlEscape(video.thumbnail)}</video:thumbnail_loc>
      <video:title><![CDATA[${cdata(video.title || post.title)}]]></video:title>
      <video:description><![CDATA[${cdata(
        video.videoDescription || video.description || post.description || "",
      )}]]></video:description>
      <video:content_loc>${xmlEscape(contentUrl)}</video:content_loc>
      ${playerUrl ? `<video:player_loc allow_embed="yes">${xmlEscape(playerUrl)}</video:player_loc>` : ""}
      ${durationSeconds ? `<video:duration>${durationSeconds}</video:duration>` : ""}
      <video:publication_date>${xmlEscape(
        video.uploadDate || post.published_time || post.date,
      )}</video:publication_date>
      <video:uploader info="${SITE_URL}">Nicholas Egner</video:uploader>
      <video:requires_subscription>no</video:requires_subscription>
      ${typeof video.familyFriendly === "boolean"
        ? `<video:family_friendly>${video.familyFriendly ? "yes" : "no"}</video:family_friendly>`
        : ""}
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
