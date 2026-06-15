"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./projects.module.css";
import { projects } from "../lib/projects";
import Particles from "../components/particlesBackground";
import { getTech } from "../lib/techStack";
import Image from "next/image";
import oldStyles from "../page.module.css";
import { Suspense } from "react";

function ProjectMedia({ media }) {
  if (!media?.src) return null;

  if (media.type === "video") {
    return (
      <video
        className={styles.media}
        src={media.src}
        aria-label={media.alt || "Project video preview"}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }

  return (
    <img
      className={styles.media}
      src={media.src}
      alt={media.alt || "Project preview"}
      loading="lazy"
      decoding="async"
    />
  );
}

function ProjectIndex({ projects, selectedProject, onSelectProject }) {
  return (
    <aside className={styles.projectIndex} aria-label="Project index">
      <p className={styles.indexLabel}>Projects</p>

      <div className={styles.projectIndexList}>
        {projects.map((project) => {
          const isActive = selectedProject?.slug === project.slug;

          return (
            <button
              type="button"
              key={project.slug}
              className={`${styles.indexButton} ${
                isActive ? styles.activeIndexButton : ""
              }`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => onSelectProject(project.slug)}
            >
              <span>{project.eyebrow}</span>
              <strong>{project.title}</strong>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function ProjectContent({ project }) {
  const hasStack = project.stack?.length > 0;
  const hasLinks = project.links?.length > 0;
  const hasMeta = hasStack || hasLinks;

  return (
    <article
      className={styles.projectDetail}
      aria-labelledby={`${project.slug}-title`}
    >
      <section className={styles.projectHero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{project.eyebrow}</p>

          <h2 style={{ fontSize: "3rem" }} id={`${project.slug}-title`}>
            {project.title}
          </h2>

          <p className={styles.lead}>{project.summary}</p>
        </div>

        <div className={styles.heroMediaWrap}>
          <ProjectMedia media={project.heroMedia} />

          {project.heroMedia?.caption && (
            <p className={styles.mediaCaption}>{project.heroMedia.caption}</p>
          )}
        </div>
      </section>

      <section className={styles.storySection} aria-label="Project overview">
        {project.preview?.problem && (
          <div className={styles.storyItem}>
            <span>01</span>
            <h3>Problem</h3>
            <p>{project.preview.problem}</p>
          </div>
        )}

        {project.preview?.approach && (
          <div className={styles.storyItem}>
            <span>02</span>
            <h3>Approach</h3>
            <p>{project.preview.approach}</p>
          </div>
        )}

        {project.preview?.result && (
          <div className={styles.storyItem}>
            <span>03</span>
            <h3>Result</h3>
            <p>{project.preview.result}</p>
          </div>
        )}
      </section>

      {project.capabilities?.length > 0 && (
        <section className={styles.capabilitiesSection}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>Capabilities</p>
            <h2>What this project included</h2>
          </div>

          <div className={styles.capabilityGrid}>
            {project.capabilities.map((capability) => (
              <article key={capability.title} className={styles.capabilityItem}>
                <h3>{capability.title}</h3>
                <p>{capability.summary}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <footer className={styles.projectFooter}>
        {hasMeta && (
          <div className={styles.projectMeta}>
            {hasStack && (
              <div className={styles.metaGroup}>
                <h3>Stack</h3>

                <div className={styles.stackBadges}>
                  {project.stack.map((slug) => {
                    const tech = getTech(slug);

                    if (!tech) {
                      return (
                        <span key={slug} className={styles.stackBadge}>
                          {slug}
                        </span>
                      );
                    }

                    const isInlineSvg = tech.image?.trim().startsWith("<svg");

                    return (
                      <Link
                        key={tech.slug}
                        href={`/skills/${tech.slug}`}
                        className={styles.stackBadge}
                        title={tech.name}
                      >
                        {tech.image && (
                          <span className={styles.stackIcon} aria-hidden="true">
                            {isInlineSvg ? (
                              <span
                                dangerouslySetInnerHTML={{ __html: tech.image }}
                              />
                            ) : (
                              <img src={tech.image} alt="" />
                            )}
                          </span>
                        )}

                        <span>{tech.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {hasLinks && (
              <div className={styles.metaGroup}>
                <h3>Links</h3>

                <div className={styles.linkRow}>
                  {project.links.map((link) => (
                    <a
                      key={`${link.label}-${link.url}`}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.projectLink}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        <br />
        <Link href={`/projects/${project.slug}`} className={styles.primaryCta}>
          View full case study
        </Link>
      </footer>
    </article>
  );
}

function ProjectsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedSlug = searchParams.get("project");
  const selectedProject =
    projects.find((project) => project.slug === selectedSlug) || projects[0];

  function handleSelectProject(slug) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("project", slug);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <main className={styles.page}>
      <nav className={oldStyles.topPage}>
        <Link href="/about">
          <Image
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/ne-white.svg"
            width={60}
            height={60}
            alt="Nicholas Egner Logo"
          />
        </Link>

        <div className={oldStyles.headerNavLinks}>
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About Nick</Link>
        </div>
      </nav>

      <Particles />
      <div className={styles.mainBackColor} />

      <section className={styles.pageHeader}>
        <p className={styles.eyebrow}>Projects Dashboard</p>

        <h1 style={{ fontSize: "4rem" }}>Selected Work</h1>

        <p>
          Websites, dashboards, SEO systems, and video content built to make
          ideas easier to find, understand, and trust.
        </p>
      </section>

      <section className={styles.workLayout} aria-label="Selected work">
        <ProjectIndex
          projects={projects}
          selectedProject={selectedProject}
          onSelectProject={handleSelectProject}
        />

        <div className={styles.projectStage}>
          <ProjectContent project={selectedProject} />
        </div>
      </section>
    </main>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={null}>
      <ProjectsPageContent />
    </Suspense>
  );
}
