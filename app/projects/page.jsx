import ProjectsPageContent from "./ProjectsPageContent";
import { getProjects, getTechStackData } from "../lib/contentApi";
import JsonLd from "../components/JsonLd/JsonLd";
import { getProjectsHubSchema } from "../lib/schema";

export const metadata = {
  title: "Projects | Nicholas Egner",
  description:
    "Explore selected web, video, SEO, and digital strategy projects by Nicholas Egner, including websites, dashboards, case studies, and visibility systems.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Nicholas Egner",
    description:
      "Selected web, video, SEO, and digital strategy projects by Nicholas Egner.",
    url: "https://www.nicholasegner.com/projects",
    siteName: "Nicholas Egner",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Nicholas Egner",
    description:
      "Selected web, video, SEO, and digital strategy projects by Nicholas Egner.",
  },
};

export default async function ProjectsPage({ searchParams }) {
  const [resolvedSearchParams, projects, { technologies }] = await Promise.all([
    searchParams,
    getProjects(),
    getTechStackData(),
  ]);
  const selectedSlug = Array.isArray(resolvedSearchParams?.project)
    ? resolvedSearchParams.project[0]
    : resolvedSearchParams?.project;
  const selectedProject =
    projects.find((project) => project.slug === selectedSlug) || null;

  return (
    <>
      <JsonLd data={getProjectsHubSchema(projects)} />
      <ProjectsPageContent
        projects={projects}
        selectedProject={selectedProject}
        technologies={technologies}
      />
    </>
  );
}
