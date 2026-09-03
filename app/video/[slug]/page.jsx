import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Particles from "../../components/particlesBackground";
import SiteFooter from "../../components/SiteFooter/SiteFooter";
import JsonLd from "../../components/JsonLd/JsonLd";
import oldStyles from "../../page.module.css";
import styles from "./video-detail.module.css";
import {
  getVideoWork,
  videoWork,
  videoHubAssets,
} from "../../lib/videoWork";
import { getTech } from "../../lib/techStack";
import {
  SITE_URL,
  getVideoPageSchema,
} from "../../lib/schema";

export function generateStaticParams() {
  return videoWork
    .filter((item) => item.type === "video" && item.slug)
    .map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getVideoWork(slug);

  if (!item) return {};

  const pageUrl = `${SITE_URL}/video/${item.slug}`;
  const image = item.poster || videoHubAssets.fallbackPoster;

  return {
    title: `${item.title} Video | Nicholas Egner`,
    description: item.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "video.other",
      url: pageUrl,
      title: `${item.title} | Nicholas Egner Video Work`,
      description: item.description,
      images: [
        {
          url: image,
          alt: `${item.title} video`,
        },
      ],
      videos: [
        {
          url: item.url,
          type: "video/mp4",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} | Nicholas Egner Video Work`,
      description: item.description,
      images: [image],
    },
  };
}

function SkillLinks({ skills = [] }) {
  return (
    <div className={styles.skillRow}>
      {skills.map((slug) => {
        const tech = getTech(slug);

        return (
          <Link key={slug} href={`/skills/${slug}`} className={styles.skill}>
            {tech?.name || slug}
          </Link>
        );
      })}
    </div>
  );
}

function RelatedLink({ page }) {
  const external = /^https?:\/\//i.test(page.url);

  if (external) {
    return (
      <a href={page.url} target="_blank" rel="noreferrer">
        {page.label} <span aria-hidden="true">→</span>
      </a>
    );
  }

  return (
    <Link href={page.url}>
      {page.label} <span aria-hidden="true">→</span>
    </Link>
  );
}

export default async function VideoDetailPage({ params }) {
  const { slug } = await params;
  const item = getVideoWork(slug);

  if (!item || item.type !== "video") notFound();

  const relatedVideos = videoWork
    .filter(
      (candidate) =>
        candidate.type === "video" &&
        candidate.slug &&
        candidate.slug !== item.slug,
    )
    .slice(0, 3);

  return (
    <>
      <JsonLd data={getVideoPageSchema({ item, slug: item.slug })} />

      <main className={styles.page}>
        <Particles />
        <div className={styles.mainBackColor} />

        <nav className={oldStyles.topPage}>
          <Link href="/" aria-label="Nicholas Egner home">
            <Image
              src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/ne-white.svg"
              width={60}
              height={60}
              alt="Nicholas Egner Logo"
            />
          </Link>

          <div className={oldStyles.headerNavLinks}>
            <Link href="/video">Video</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/about">About Nick</Link>
          </div>
        </nav>

        <article className={styles.detail}>
          <header className={styles.header}>
            <div className={styles.headerCopy}>
              <Link href="/video" className={styles.backLink}>
                ← Back to Video Work
              </Link>
              <p className={styles.eyebrow}>{item.category}</p>
              <h1>{item.title}</h1>
              <p className={styles.lead}>{item.description}</p>
              <SkillLinks skills={item.skills} />
            </div>
          </header>

          <section className={styles.videoWrap} aria-label={item.title}>
            <video
              src={item.url}
              poster={item.poster || videoHubAssets.fallbackPoster}
              controls
              playsInline
              preload="metadata"
            />
          </section>

          <section className={styles.storyGrid}>
            <div className={styles.storyHeading}>
              <p className={styles.eyebrow}>About the Work</p>
              <h2>Context behind the piece.</h2>
            </div>

            <div className={styles.storyCopy}>
              {(item.details?.length ? item.details : [item.description]).map(
                (paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ),
              )}
            </div>
          </section>

          <section className={styles.capabilitySection}>
            <div>
              <p className={styles.eyebrow}>Skills & Tools</p>
              <h2>How this work connects to my broader skill set.</h2>
              <p>
                The video portfolio is connected to the same skill library used
                throughout nicholasegner.com. Each tool below links to more
                context about how I use it across video, web, and digital
                content work.
              </p>
            </div>
            <SkillLinks skills={item.skills} />
          </section>

          {item.relatedPages?.length > 0 && (
            <section className={styles.relatedSection}>
              <p className={styles.eyebrow}>Related</p>
              <h2>More context around this work.</h2>
              <div className={styles.relatedLinks}>
                {item.relatedPages.map((page) => (
                  <RelatedLink key={page.url} page={page} />
                ))}
              </div>
            </section>
          )}

          <section className={styles.moreSection}>
            <div className={styles.moreHeader}>
              <div>
                <p className={styles.eyebrow}>More Video Work</p>
                <h2>Keep exploring.</h2>
              </div>
              <Link href="/video" className={styles.allLink}>
                View full video portfolio →
              </Link>
            </div>

            <div className={styles.moreGrid}>
              {relatedVideos.map((video) => (
                <Link
                  key={video.slug}
                  href={`/video/${video.slug}`}
                  className={styles.videoCard}
                >
                  <img
                    src={video.poster || videoHubAssets.fallbackPoster}
                    alt={`${video.title} video preview`}
                    loading="lazy"
                  />
                  <div>
                    <span>{video.category}</span>
                    <strong>{video.title}</strong>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </article>

        <SiteFooter />
      </main>
    </>
  );
}
