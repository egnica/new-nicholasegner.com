// app/sitemap.js

const SITE_URL = "https://www.nicholasegner.com";

// If your posts live in a local JSON file, import it.
// Adjust the path to match your project.
import postsData from "../blog.json";
// Example structure assumed: { posts: { "my-slug": { updatedAt, live }, ... } }

export default function sitemap() {
  // --- Static pages ---
  const staticRoutes = [
    { url: `${SITE_URL}/`, priority: 1.0, changeFrequency: "weekly" },
    { url: `${SITE_URL}/about`, priority: 0.8, changeFrequency: "monthly" },
    {
      url: `${SITE_URL}/video-experience`,
      priority: 0.7,
      changeFrequency: "monthly",
    },
    { url: `${SITE_URL}/photos`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${SITE_URL}/skills`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${SITE_URL}/blog`, priority: 0.6, changeFrequency: "weekly" },
    {
      url: `${SITE_URL}/blog/archive`,
      priority: 0.6,
      changeFrequency: "weekly",
    },
  ];

  // --- Blog post routes ---
  const postsObj = postsData?.posts || postsData || {};
  const postEntries = Object.entries(postsObj);

  const blogRoutes = postEntries
    .filter(([, post]) => post?.live !== false) // keep only live posts if you track that
    .map(([slug, post]) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: post?.updatedAt ? new Date(post.updatedAt) : new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  return [...staticRoutes, ...blogRoutes];
}
