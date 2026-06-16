import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "../projects.module.css";
import oldStyles from "../../page.module.css";
import Particles from "../../components/particlesBackground";
import { projects } from "../../lib/projects";
import { getTech } from "../../lib/techStack";
import SiteFooter from "@/app/components/SiteFooter/SiteFooter";

function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}

function getProjectIndex(slug) {
  return projects.findIndex((project) => project.slug === slug);
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found | Nicholas Egner",
    };
  }

  const ogImage =
    project.heroMedia?.poster ||
    (project.heroMedia?.type === "image" ? project.heroMedia.src : undefined);

  return {
    title: `${project.title} | Case Study | Nicholas Egner`,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Case Study`,
      description: project.summary,
      type: "article",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

function ProjectMedia({ media, variant = "hero" }) {
  if (!media?.src) return null;

  const className =
    variant === "hero"
      ? `${styles.caseMedia} ${styles.caseHeroMedia}`
      : styles.caseMedia;

  if (media.type === "video") {
    return (
      <video
        className={className}
        src={media.src}
        poster={media.poster}
        aria-label={media.alt || "Project video preview"}
        autoPlay={variant === "hero"}
        muted={variant === "hero"}
        loop={variant === "hero"}
        playsInline
        controls={variant !== "hero"}
        preload="metadata"
      />
    );
  }

  if (media.type === "iframe") {
    return (
      <div className={`${styles.iframeShell} ${className}`}>
        <iframe
          src={media.src}
          title={media.sectionTitle || media.alt || "Project preview"}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          allow="fullscreen"
        />
      </div>
    );
  }

  return (
    <img
      className={className}
      src={media.src}
      alt={media.alt || "Project preview"}
      loading={variant === "hero" ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

function StoryBlock({ number, title, children }) {
  if (!children) return null;

  return (
    <article className={styles.caseStoryCard}>
      <span>{number}</span>
      <h2>{title}</h2>
      <p>{children}</p>
    </article>
  );
}

function StackBadges({ stack }) {
  if (!stack?.length) return null;

  return (
    <div className={styles.caseMetaBlock}>
      <h2>Stack</h2>

      <div className={styles.stackBadges}>
        {stack.map((slug) => {
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
                    <span dangerouslySetInnerHTML={{ __html: tech.image }} />
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
  );
}

function ProjectLinks({ links }) {
  if (!links?.length) return null;

  return (
    <div className={styles.caseMetaBlock}>
      <h2>Links</h2>

      <div className={styles.linkRow}>
        {links.map((link) => (
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
  );
}

export default async function ProjectCaseStudyPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = getProjectIndex(slug);
  const previousProject =
    projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const extraMedia = project.media || project.gallery || [];
  const caseSections = project.caseStudy?.sections || [];

  return (
    <main className={styles.page}>
      <nav className={oldStyles.topPage}>
        <Link href="/">
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

      <article className={styles.caseStudyPage}>
        <Link href="/projects" className={styles.backLink}>
          ← Back to projects
        </Link>

        <header className={styles.caseHero}>
          <div className={styles.caseHeroCopy}>
            <p className={styles.eyebrow}>{project.eyebrow}</p>

            <h1>{project.title}</h1>

            <p className={styles.caseLead}>{project.summary}</p>

            {project.description && (
              <p className={styles.caseDescription}>{project.description}</p>
            )}

            <div className={styles.caseQuickMeta}>
              {project.role && (
                <div>
                  <span>Role</span>
                  <strong>{project.role}</strong>
                </div>
              )}

              {project.year && (
                <div>
                  <span>Year</span>
                  <strong>{project.year}</strong>
                </div>
              )}

              {project.client && (
                <div>
                  <span>Client</span>
                  <strong>{project.client}</strong>
                </div>
              )}
            </div>
          </div>

          <div className={styles.caseHeroMediaWrap}>
            <ProjectMedia media={project.heroMedia} variant="hero" />

            {project.heroMedia?.caption && (
              <p className={styles.mediaCaption}>{project.heroMedia.caption}</p>
            )}
          </div>
        </header>

        <section className={styles.caseStoryGrid} aria-label="Case study story">
          <StoryBlock number="01" title="Problem">
            {project.preview?.problem}
          </StoryBlock>

          <StoryBlock number="02" title="Approach">
            {project.preview?.approach}
          </StoryBlock>

          <StoryBlock number="03" title="Result">
            {project.preview?.result}
          </StoryBlock>
        </section>

        {(project.caseStudy?.overview || caseSections.length > 0) && (
          <section className={styles.caseBody}>
            {project.caseStudy?.overview && (
              <div className={styles.caseTextSection}>
                <p className={styles.eyebrow}>Overview</p>
                <h2>{project.caseStudy.overviewTitle || "What changed"}</h2>
                <p>{project.caseStudy.overview}</p>
              </div>
            )}

            {caseSections.map((section) => (
              <div key={section.title} className={styles.caseTextSection}>
                {section.eyebrow && (
                  <p className={styles.eyebrow}>{section.eyebrow}</p>
                )}

                <h2>{section.title}</h2>

                {section.body && <p>{section.body}</p>}

                {section.items?.length > 0 && (
                  <ul className={styles.caseBulletList}>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {project.capabilities?.length > 0 && (
          <section className={styles.caseCapabilities}>
            <div className={styles.sectionIntro}>
              <p className={styles.eyebrow}>Capabilities</p>
              <h2>What this project included</h2>
            </div>

            <div className={styles.capabilityGrid}>
              {project.capabilities.map((capability) => (
                <article
                  key={capability.title}
                  className={styles.capabilityItem}
                >
                  <h3>{capability.title}</h3>
                  <p>{capability.summary}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {extraMedia.length > 0 && (
          <section className={styles.caseMediaSection}>
            <div className={styles.sectionIntro}>
              <p className={styles.eyebrow}>Media</p>
              <h2>Project assets</h2>
            </div>

            <div className={styles.caseMediaGrid}>
              {extraMedia.map((media, index) => (
                <figure
                  key={`${media.src}-${index}`}
                  className={styles.caseMediaFigure}
                >
                  <ProjectMedia media={media} variant="supporting" />

                  {media.caption && <figcaption>{media.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </section>
        )}

        <section className={styles.caseMetaGrid}>
          <StackBadges stack={project.stack} />
          <ProjectLinks links={project.links} />
        </section>

        <footer style={{}} className={styles.caseFooterNav}>
          <Link
            href={`/projects/${previousProject.slug}`}
            className={styles.caseNavCard}
          >
            <span>Previous</span>
            <strong>{previousProject.title}</strong>
          </Link>

          <Link href="/projects" className={styles.primaryCta}>
            View all projects
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className={styles.caseNavCard}
          >
            <span>Next</span>
            <strong>{nextProject.title}</strong>
          </Link>
        </footer>
      </article>
      <br />
      <SiteFooter />
    </main>
  );
}
