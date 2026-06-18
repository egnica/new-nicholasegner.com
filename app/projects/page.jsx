import { Suspense } from "react";
import ProjectsPageContent from "./ProjectsPageContent";
import { projects } from "../lib/projects";
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
    // images: [
    //   {
    //     url: "https://www.nicholasegner.com/og/projects.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Nicholas Egner Projects Dashboard",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Nicholas Egner",
    description:
      "Selected web, video, SEO, and digital strategy projects by Nicholas Egner.",
    //  images: ["https://www.nicholasegner.com/og/projects.jpg"],
  },
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={getProjectsHubSchema(projects)} />

      <Suspense fallback={null}>
        <ProjectsPageContent projects={projects} />
      </Suspense>
    </>
  );
}
