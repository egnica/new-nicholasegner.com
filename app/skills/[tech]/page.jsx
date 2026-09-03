import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./skill.module.css";
import oldStyles from "../../page.module.css";
import Particles from "../../components/particlesBackground";
import SiteHeader from "../../components/SiteHeader/SiteHeader";
import SiteFooter from "../../components/SiteFooter/SiteFooter";
import JsonLd from "../../components/JsonLd/JsonLd";
import SkillBackButton from "./SkillBackButton";
import { allTech, getTech } from "../../lib/techStack";
import { projects } from "../../lib/projects";
import { videoWork } from "../../lib/videoWork";
import { DEFAULT_IMAGE, SITE_URL, getSkillPageSchema } from "../../lib/schema";

export function generateStaticParams() {
  return allTech.map((tech) => ({
    tech: tech.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { tech } = await params;
  const techData = getTech(tech);

  if (!techData) {
    return {
      title: "Skill Not Found | Nicholas Egner",
    };
  }

  const pageUrl = `${SITE_URL}/skills/${techData.slug}`;

  return {
    title: `${techData.name} | Skills | Nicholas Egner`,
    description: techData.text,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      title: `${techData.name} | Nicholas Egner`,
      description: techData.text,
      images: [
        {
          url: DEFAULT_IMAGE,
          alt: `Nicholas Egner portfolio and ${techData.name} work`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${techData.name} | Nicholas Egner`,
      description: techData.text,
      images: [DEFAULT_IMAGE],
    },
  };
}

function getHeroLead(text) {
  if (!text) return "";

  const match = text.match(/^(.+?[.!?])(?:\s|$)/);
  return match?.[1] || text;
}

function getUsageCards(tech) {
  const name = tech.name;

  const cardsByCategory = {
    "Front End": [
      {
        label: "Build",
        title: "Interface architecture",
        text: `I use ${name} to turn content, application state, and business requirements into responsive interfaces that are clear and maintainable.`,
      },
      {
        label: "Experience",
        title: "Interaction and usability",
        text: "The implementation should support the user experience. I pay attention to responsive behavior, accessibility, feedback, motion, and how an interface feels across devices.",
      },
      {
        label: "Ship",
        title: "Production-ready frontend",
        text: "I connect the interface to real data, routes, APIs, metadata, and deployment workflows so the frontend is part of a complete working system.",
      },
    ],
    "Back End": [
      {
        label: "Connect",
        title: "Application logic",
        text: `I use ${name} where an application needs real data, business rules, integrations, or automated behavior behind the interface.`,
      },
      {
        label: "Model",
        title: "Data and workflows",
        text: "I focus on the shape of the data, how it changes, what should happen next, and how to keep application workflows understandable as they grow.",
      },
      {
        label: "Operate",
        title: "Reliable integrations",
        text: "Authentication, validation, errors, external services, and edge cases matter just as much as the happy path when a system supports real business activity.",
      },
    ],
    "DevOps & Hosting": [
      {
        label: "Deploy",
        title: "From code to production",
        text: `I use ${name} as part of the infrastructure that moves a project from a local build into a stable production environment.`,
      },
      {
        label: "Configure",
        title: "Domains and environments",
        text: "Hosting is connected to DNS, environment variables, repositories, media storage, email, and third-party services. I treat those pieces as one deployment system.",
      },
      {
        label: "Maintain",
        title: "Ongoing operations",
        text: "A launch is not the end of the work. I prefer setups that are easy to update, diagnose, and maintain as a project evolves.",
      },
    ],
    "Creative / Design": [
      {
        label: "Create",
        title: "Visual communication",
        text: `I use ${name} to make ideas easier to understand through editing, motion, imagery, composition, and branded visual systems.`,
      },
      {
        label: "Shape",
        title: "Story and attention",
        text: "Creative choices should support the message. I think about pacing, hierarchy, tone, and what the viewer needs to notice at each moment.",
      },
      {
        label: "Connect",
        title: "Creative work for digital systems",
        text: "The creative work often becomes part of a larger website, video hub, social publishing workflow, campaign, or interactive experience.",
      },
    ],
    "Search & Digital Visibility": [
      {
        label: "Clarify",
        title: "Make content understandable",
        text: `I use ${name} to help people and search platforms understand what a page, business, video, or piece of content is actually about.`,
      },
      {
        label: "Connect",
        title: "Build stronger signals",
        text: "Good visibility comes from connected signals across the website, structured data, local profiles, video platforms, internal links, and useful content.",
      },
      {
        label: "Improve",
        title: "Iterate with evidence",
        text: "I treat search visibility as an ongoing system. Technical structure, publishing, indexing, user behavior, and real search results all inform the next improvement.",
      },
    ],
  };

  return cardsByCategory[tech.category] || [];
}

function getRelatedSkills(currentTech) {
  const projectMatches = projects.filter((project) =>
    project.stack?.includes(currentTech.slug),
  );
  const videoMatches = videoWork.filter((video) =>
    video.skills?.includes(currentTech.slug),
  );

  return allTech
    .filter((candidate) => candidate.slug !== currentTech.slug)
    .map((candidate) => {
      const sharedProjects = projectMatches.filter((project) =>
        project.stack?.includes(candidate.slug),
      ).length;
      const sharedVideos = videoMatches.filter((video) =>
        video.skills?.includes(candidate.slug),
      ).length;
      const sameCategory = candidate.category === currentTech.category ? 1 : 0;

      return {
        ...candidate,
        score: sharedProjects * 3 + sharedVideos * 3 + sameCategory,
      };
    })
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .slice(0, 6);
}

function WorkMedia({ item }) {
  if (!item.media) return null;

  if (item.media.type === "video") {
    return (
      <video
        src={item.media.src}
        poster={item.media.poster}
        aria-label={item.media.alt || `${item.title} preview`}
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
      src={item.media.src}
      alt={item.media.alt || `${item.title} preview`}
      loading="lazy"
      decoding="async"
    />
  );
}

function RelatedWorkCard({ item }) {
  return (
    <Link href={item.href} className={styles.workCard}>
      {item.media && (
        <div className={styles.workMedia}>
          <WorkMedia item={item} />
        </div>
      )}

      <div className={styles.workCopy}>
        <span className={styles.workType}>{item.type}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </Link>
  );
}

export default async function TechPage({ params }) {
  const { tech } = await params;
  const techData = getTech(tech);

  if (!techData) notFound();

  const usageCards = getUsageCards(techData);
  const relatedSkills = getRelatedSkills(techData);

  const relatedProjects = projects
    .filter((project) => project.stack?.includes(techData.slug))
    .map((project) => ({
      type: "Project",
      title: project.title,
      description: project.summary,
      href: `/projects?project=${project.slug}`,
      media: project.heroMedia?.src
        ? {
            type: project.heroMedia.type,
            src: project.heroMedia.src,
            poster: project.heroMedia.poster,
            alt: project.heroMedia.alt,
          }
        : null,
    }));

  const relatedVideos = videoWork
    .filter(
      (video) =>
        video.type === "video" &&
        video.slug &&
        video.skills?.includes(techData.slug),
    )
    .map((video) => ({
      type: "Video",
      title: video.title,
      description: video.description,
      href: `/video/${video.slug}`,
      media: video.poster
        ? {
            type: "image",
            src: video.poster,
            alt: `${video.title} video preview`,
          }
        : {
            type: "video",
            src: video.url,
            alt: `${video.title} video preview`,
          },
    }));

  const relatedWork = [...relatedProjects, ...relatedVideos].slice(0, 6);

  return (
    <>
      <JsonLd data={getSkillPageSchema({ tech: techData })} />

      <div className={styles.page}>
        <Particles />
        <div className={oldStyles.mainBackColor} />
        <SiteHeader />

        <main className={styles.skillMain}>
          <article>
            <header className={`${styles.hero} fullBleedHero`}>
              <div className={styles.heroCopy}>
                <SkillBackButton />
                <p className={styles.eyebrow}>{techData.category}</p>
                <h1>{techData.name}</h1>
                <p className={styles.heroLead}>{getHeroLead(techData.text)}</p>
              </div>

              <div className={styles.heroArt} aria-hidden="true">
                <div
                  className={styles.heroSvg}
                  dangerouslySetInnerHTML={{ __html: techData.image }}
                />
              </div>
            </header>

            <section className={styles.section} aria-labelledby="how-i-use-it">
              <div className={styles.sectionHeader}>
                <div>
                  <p className={styles.eyebrow}>In Practice</p>
                  <h2 id="how-i-use-it">How I use it</h2>
                </div>

                <p className={styles.sectionIntro}>{techData.text}</p>
              </div>

              {usageCards.length > 0 && (
                <div className={styles.contextGrid}>
                  {usageCards.map((card) => (
                    <article key={card.title} className={styles.contextCard}>
                      <span>{card.label}</span>
                      <h3>{card.title}</h3>
                      <p>{card.text}</p>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {relatedWork.length > 0 && (
              <section className={styles.section} aria-labelledby="work-using-skill">
                <div className={styles.sectionHeader}>
                  <div>
                    <p className={styles.eyebrow}>Proof</p>
                    <h2 id="work-using-skill">Work using this skill</h2>
                  </div>

                  <p className={styles.sectionIntro}>
                    Projects and video work are connected to skill pages through
                    the same shared data used across the portfolio, so this
                    section reflects where the skill is actually referenced.
                  </p>
                </div>

                <div className={styles.workGrid}>
                  {relatedWork.map((item) => (
                    <RelatedWorkCard
                      key={`${item.type}-${item.href}`}
                      item={item}
                    />
                  ))}
                </div>
              </section>
            )}

            <section className={styles.section} aria-labelledby="related-skills">
              <div className={styles.sectionHeader}>
                <div>
                  <p className={styles.eyebrow}>Connected Stack</p>
                  <h2 id="related-skills">Related skills</h2>
                </div>

                <p className={styles.sectionIntro}>
                  These are tools and capabilities that commonly sit near this
                  skill in my project and video work, with the strongest shared
                  relationships surfaced first.
                </p>
              </div>

              <div className={styles.relatedGrid}>
                {relatedSkills.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/skills/${related.slug}`}
                    className={styles.relatedSkill}
                  >
                    <span
                      className={styles.relatedIcon}
                      aria-hidden="true"
                      dangerouslySetInnerHTML={{ __html: related.image }}
                    />
                    <span>{related.name}</span>
                  </Link>
                ))}
              </div>
            </section>

            <div className={styles.footerCta}>
              <p>
                Explore the complete set of development, visibility, deployment,
                and creative tools represented across the portfolio.
              </p>
              <Link href="/skills">
                View all skills <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
