const SITE_URL = "https://www.nicholasegner.com";

import {
  getBlogData,
  getProjects,
  getTechStackData,
  getVideoWorkData,
} from "./lib/contentApi";

function validDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function lastModified(value) {
  const date = validDate(value);
  return date ? { lastModified: date } : {};
}

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

  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/video", priority: 0.8, changeFrequency: "monthly" },
    { path: "/video-experience", priority: 0.7, changeFrequency: "monthly" },
    { path: "/photos", priority: 0.6, changeFrequency: "monthly" },
    { path: "/projects", priority: 0.6, changeFrequency: "monthly" },
    { path: "/skills", priority: 0.6, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
    { path: "/blog/archive", priority: 0.6, changeFrequency: "weekly" },
  ].map(({ path, ...route }) => ({
    url: `${SITE_URL}${path}`,
    ...route,
  }));

  const posts = postsData?.posts || postsData || {};
  const blogRoutes = Object.entries(posts)
    .filter(([, post]) => post?.live !== false)
    .map(([slug, post]) => ({
      url: `${SITE_URL}/blog/${slug}`,
      ...lastModified(post?.updatedAt || post?.published_time || post?.date),
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  const skillRoutes = Object.values(technologies).map(({ slug }) => ({
    url: `${SITE_URL}/skills/${slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const projectRoutes = projects
    .filter((project) => project?.live !== false && project?.slug)
    .map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      ...lastModified(project?.updatedAt || project?.date),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const videoRoutes = videoWork
    .filter((item) => item?.type === "video" && item?.slug)
    .map((item) => ({
      url: `${SITE_URL}/video/${item.slug}`,
      ...lastModified(item?.updatedAt || item?.date),
      changeFrequency: "monthly",
      priority: 0.65,
    }));

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...skillRoutes,
    ...projectRoutes,
    ...videoRoutes,
  ];
}
