import Link from "next/link";
import styles from "./FeaturedProjectCards.module.css";
import { projects } from "../../lib/projects";

function getProjectEyebrow(project) {
  return (
    project.eyebrow ||
    project.category ||
    project.type ||
    project.practiceArea ||
    "Case Study"
  );
}

function getProjectSummary(project) {
  return (
    project.cardSummary ||
    project.summary ||
    project.description ||
    project.heroMedia?.caption ||
    "A focused digital project built around clearer structure, stronger content, and a better user experience."
  );
}

function ProjectCardMedia({ media, title }) {
  if (!media?.src) return null;

  if (media.type === "video") {
    return (
      <video
        className={styles.cardVideo}
        src={media.src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
    );
  }

  if (media.type === "image") {
    return (
      <img
        className={styles.cardImage}
        src={media.src}
        alt={media.alt || `${title} preview`}
        loading="lazy"
      />
    );
  }

  return null;
}

export default function FeaturedProjectCards() {
  const featuredProjects = projects
    .filter((project) => project.featured !== false)
    .slice(0, 4);

  return (
    <section className={styles.featuredProjects}>
      <div className={styles.sectionHeader}>
        <p className={styles.kicker}>Selected Work</p>

        <h2>
          Examples of work built to be found, understood, and trusted.
        </h2>

        <p className={styles.intro}>
          A few recent projects across websites, content systems, video
          strategy, and digital tools.
        </p>
      </div>

      <div className={styles.grid}>
        {featuredProjects.map((project) => {
          const eyebrow = getProjectEyebrow(project);
          const summary = getProjectSummary(project);

          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={styles.card}
              aria-label={`View ${project.title} case study`}
            >
              <div className={styles.cardInner}>
                <div className={`${styles.cardFace} ${styles.cardFront}`}>
                  <ProjectCardMedia
                    media={project.heroMedia}
                    title={project.title}
                  />

                  <div className={styles.mediaOverlay} />

                  <div className={styles.frontContent}>
                    <p className={styles.eyebrow}>{eyebrow}</p>

                    <div>
                      <h3>{project.title}</h3>
                      <span className={styles.hint}>View project</span>
                    </div>
                  </div>
                </div>

                <div className={`${styles.cardFace} ${styles.cardBack}`}>
                  <p>{summary}</p>
                  <span>View case study</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
