// app/sitemap.js

const SITE_URL = "https://www.nicholasegner.com";

import {
  getBlogData,
  getProjects,
  getTechStackData,
  getVideoWorkData,
} from "./lib/contentApi";

export default async function sitemap() {
  const [
    postsData,
    projects,
    { technologies },
    { items: videoWork },
  ] = await Promise.all([
    getBlogData(),
    getProjects(),
    getTechStackData(),
    getVideoWorkData(),
  ]);

  // Generate a single date instance for the build time to use on static routes
  const currentDate = new Date();

  // --- Static pages ---
  const staticRoutes = [
    {
      url: `${SITE_URL}/`,
      lastModified: currentDate,
      priority: 1.0,
      changeFrequency: "weekly",
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${SITE_URL}/video`,
      lastModified: currentDate,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${SITE_URL}/video-experience`,
      lastModified: currentDate,
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      url: `${SITE_URL}/photos`,
      lastModified: currentDate,
      priority: 0.6,
      changeFrequency: "monthly",
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: currentDate,
      priority: 0.6,
      changeFrequency: "monthly",
    },
    {
      url: `${SITE_URL}/skills`,
      lastModified: currentDate,
      priority: 0.6,
      changeFrequency: "monthly",
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: currentDate,
      priority: 0.6,
      changeFrequency: "weekly",
    },
    {
      url: `${SITE_URL}/blog/archive`,
      lastModified: currentDate,
      priority: 0.6,
      changeFrequency: "weekly",
    },
    // NOTE: Removed video-sitemap.xml from here!
  ];

  // --- Blog post routes ---
  const postsObj = postsData?.posts || postsData || {};
  const postEntries = Object.entries(postsObj);

  const blogRoutes = postEntries
    .filter(([, post]) => post?.live !== false)
    .map(([slug, post]) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: post?.updatedAt ? new Date(post.updatedAt) : currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  // --- Tech Routes ---
  const techData = Object.values(technologies);
  const mapItems = techData.map(({ slug }) => ({
    url: `${SITE_URL}/skills/${slug}`,
    lastModified: currentDate, // Added lastModified here
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // --- Project routes ---
  const projectRoutes = projects
    .filter((project) => project?.live !== false)
    .filter((project) => project?.slug)
    .map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: project?.updatedAt
        ? new Date(project.updatedAt)
        : project?.date
          ? new Date(project.date)
          : currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  // --- Video portfolio routes ---
  const videoRoutes = videoWork
    .filter((item) => item?.type === "video" && item?.slug)
    .map((item) => ({
      url: `${SITE_URL}/video/${item.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.65,
    }));

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...mapItems,
    ...projectRoutes,
    ...videoRoutes,
  ];
}
