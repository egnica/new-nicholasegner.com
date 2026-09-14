import HomeClient from "./HomeClient";
import {
  getBlogData,
  getProjects,
  getTechnologies,
} from "./lib/contentApi";

function newestPost(posts) {
  return Object.values(posts)
    .filter(
      (post) =>
        post &&
        post.live !== false &&
        post.published !== false,
    )
    .sort(
      (a, b) =>
        new Date(b.published_time || b.date) -
        new Date(a.published_time || a.date),
    )[0];
}

export default async function Home() {
  const [blogPosts, projects, technologies] = await Promise.all([
    getBlogData(),
    getProjects(),
    getTechnologies(),
  ]);

  const latest = newestPost(blogPosts);
  const latestPost = latest
    ? {
        slug: latest.slug,
        title: latest.title,
        date: latest.date,
        description: latest.description,
        keywords: latest.keywords,
        hero_image: latest.hero_image,
      }
    : null;

  const featuredProjects = projects
    .filter((project) => project.featured !== false)
    .slice(0, 4)
    .map((project) => ({
      slug: project.slug,
      title: project.title,
      eyebrow: project.eyebrow,
      category: project.category,
      type: project.type,
      practiceArea: project.practiceArea,
      cardSummary: project.cardSummary,
      summary: project.summary,
      description: project.description,
      heroMedia: project.heroMedia,
    }));

  const marqueeTechnologies = technologies.map((technology) => ({
    name: technology.name,
    slug: technology.slug,
    image: technology.image,
  }));

  return (
    <HomeClient
      technologies={marqueeTechnologies}
      projects={featuredProjects}
      latestPost={latestPost}
    />
  );
}
