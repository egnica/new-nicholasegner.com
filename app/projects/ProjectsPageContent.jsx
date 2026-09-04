import Link from "next/link";
import styles from "./projects.module.css";

import Particles from "../components/particlesBackground";
import { getTech } from "../lib/techStack";
import SiteFooter from "../components/SiteFooter/SiteFooter";
import SiteHeader from "../components/SiteHeader/SiteHeader";

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

function ProjectIndex({ projects, selectedProject }) {
  return (
    <aside className={styles.projectIndex} aria-label="Project selector">
      <p className={styles.indexLabel}>Explore Projects</p>

      <div className={styles.projectIndexList}>
        {projects.map((project) => {
          const isActive = selectedProject?.slug === project.slug;
          const href = isActive ? "/projects" : `/projects?project=${project.slug}`;

          return (
            <Link
              key={project.slug}
              href={href}
              className={`${styles.indexButton} ${
                isActive ? styles.activeIndexButton : ""
              }`}
              aria-current={isActive ? "true" : undefined}
              scroll={false}
            >
              <span className={styles.indexButtonCopy}>
                <span className={styles.indexEyebrow}>{project.eyebrow}</span>
                <strong>{project.title}</strong>
              </span>

              <span className={styles.indexAction} aria-hidden="true">
                {isActive ? "×" : "→"}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

function ProjectsOverview() {
  return (
    <section className={styles.overviewHero} aria-labelledby="projects-overview-title">
      <div className={styles.overviewMedia} aria-hidden="true">
        <img
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/video-page-website/computer-screen.webp"
          alt=""
          loading="eager"
          decoding="async"
        />
      </div>

      <svg
        className={styles.overviewLogo}
        viewBox="0 0 671.32 411.97"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M671.32,192.95v26.55h-11.63c-7.74,0-13.48,2.37-17.2,7.1-3.72,4.75-5.58,12.33-5.58,22.76v108.08c0,19.28-5.12,33.19-15.35,41.72-10.23,8.54-26.66,12.8-49.29,12.8h-11.16v-26.07c16.75,0,28.75-2.85,36.03-8.54s10.94-14.86,10.94-27.49v-98.61c0-8.85,1.08-15.88,3.24-21.1s5.12-9.24,8.84-12.08c3.72-2.85,9.61-6.79,17.67-11.86-8.06-4.73-13.95-8.69-17.67-11.85s-6.67-7.27-8.84-12.33-3.24-12.01-3.24-20.87V62.57c0-12.64-3.66-21.88-10.94-27.73-7.28-5.85-19.29-8.77-36.03-8.77V0h11.16c22.63,0,39.06,4.26,49.29,12.8s15.35,22.44,15.35,41.72v108.57c0,19.9,7.58,29.86,22.77,29.86h11.64Z" />
        <polygon points="527.51 305.83 527.51 366.34 326.33 366.34 161.58 81.43 161.58 132.8 161.58 348.22 188.04 348.22 205.6 209.5 205.6 366.34 143.8 366.34 143.8 45.62 161.36 45.62 336.33 348.22 509.73 348.22 509.73 323.97 377.01 323.97 376.78 323.97 376.78 167.8 377.01 167.8 519.74 167.8 519.74 228.09 421.03 228.09 421.03 210.18 501.94 210.18 501.94 185.7 394.58 185.7 394.58 305.83 527.51 305.83" />
        <polygon points="524.4 45.62 524.4 105.92 394.58 105.92 394.58 143.31 377.01 143.31 377.01 88 506.84 88 506.84 63.53 350.56 63.53 350.56 321.46 350.33 321.02 332.77 290.65 191.15 45.62 211.6 45.62 332.77 255.29 332.77 45.62 394.58 45.62 524.4 45.62" />
        <polygon points="506.84 63.53 506.84 88 377.01 88 376.78 88 376.78 142.62 350.56 63.53 506.84 63.53" />
        <polygon points="377.01 88 377.01 143.31 376.78 142.62 376.78 88 377.01 88" />
        <polygon points="376.78 142.62 377.01 143.31 376.78 143.31 376.78 142.62" />
        <polygon points="188.04 178.9 205.6 209.5 188.04 348.22 188.04 178.9" />
        <polygon points="188.04 178.9 188.04 348.22 161.58 348.22 161.58 132.8 188.04 178.9" />
        <path d="M110.2,385.9v26.07h-11.16c-22.64,0-39.06-4.26-49.29-12.8-10.23-8.52-15.35-22.44-15.35-41.72v-108.08c0-10.43-1.86-18.02-5.58-22.76-3.72-4.73-9.45-7.1-17.21-7.1H0v-26.55h11.62c15.19,0,22.79-9.96,22.79-29.86V54.52c0-19.28,5.12-33.18,15.35-41.72S76.4,0,99.04,0h11.16v26.07c-16.75,0-28.75,2.92-36.03,8.77-7.29,5.85-10.94,15.09-10.94,27.73v98.61c0,8.86-1.08,15.81-3.24,20.87-2.18,5.06-5.12,9.17-8.84,12.33s-9.61,7.11-17.67,11.85c8.06,5.07,13.95,9.01,17.67,11.86,3.72,2.84,6.66,6.86,8.84,12.08,2.16,5.22,3.24,12.25,3.24,21.1v98.61c0,12.64,3.65,21.81,10.94,27.49,7.28,5.69,19.29,8.54,36.03,8.54h0Z" />
      </svg>

      <div className={styles.overviewCopy}>
        <p className={styles.eyebrow}>Selected Work</p>
        <h1 id="projects-overview-title">Projects &amp; Digital Systems</h1>

        <p className={styles.overviewLead}>
          A collection of websites, custom applications, content systems, SEO
          work, video experiences, and digital tools built around real business
          problems.
        </p>

        <p className={styles.overviewBody}>
          My work often sits between development, content, and digital
          strategy. These projects show how I use those disciplines together to
          make businesses easier to find, understand, operate, and trust.
        </p>
      </div>
    </section>
  );
}

function ProjectContent({ project }) {
  const hasStack = project.stack?.length > 0;
  const hasLinks = project.links?.length > 0;
  const hasMeta = hasStack || hasLinks;

  return (
    <article className={styles.projectDetail} aria-labelledby={`${project.slug}-title`}>
      <section className={styles.projectHero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{project.eyebrow}</p>
          <h1 id={`${project.slug}-title`}>{project.title}</h1>
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
            <span>01</span><h3>Problem</h3><p>{project.preview.problem}</p>
          </div>
        )}
        {project.preview?.approach && (
          <div className={styles.storyItem}>
            <span>02</span><h3>Approach</h3><p>{project.preview.approach}</p>
          </div>
        )}
        {project.preview?.result && (
          <div className={styles.storyItem}>
            <span>03</span><h3>Result</h3><p>{project.preview.result}</p>
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
                <h3>{capability.title}</h3><p>{capability.summary}</p>
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
                    if (!tech) return <span key={slug} className={styles.stackBadge}>{slug}</span>;
                    const isInlineSvg = tech.image?.trim().startsWith("<svg");
                    return (
                      <Link key={tech.slug} href={`/skills/${tech.slug}`} className={styles.stackBadge} title={tech.name}>
                        {tech.image && (
                          <span className={styles.stackIcon} aria-hidden="true">
                            {isInlineSvg ? <span dangerouslySetInnerHTML={{ __html: tech.image }} /> : <img src={tech.image} alt="" />}
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
                    <a key={`${link.label}-${link.url}`} href={link.url} target="_blank" rel="noreferrer" className={styles.projectLink}>
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

export default function ProjectsPageContent({ projects, selectedProject }) {
  return (
    <main className={styles.page}>
      <SiteHeader />
      <Particles />
      <div className={styles.mainBackColor} />

      <section className={styles.workLayout} aria-label="Selected work">
        <ProjectIndex projects={projects} selectedProject={selectedProject} />
        <div className={styles.projectStage}>
          {selectedProject ? <ProjectContent project={selectedProject} /> : <ProjectsOverview />}
        </div>
      </section>

      <br />
      <SiteFooter />
    </main>
  );
}
