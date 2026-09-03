import Image from "next/image";
import { notFound } from "next/navigation";
import ContentBlock from "@/app/components/contentBlock";
import styles from "../blog.module.css";
import Particles from "../../components/particlesBackground";
import SiteFooter from "@/app/components/SiteFooter/SiteFooter";
import SiteHeader from "../../components/SiteHeader/SiteHeader";
import JsonLd from "../../components/JsonLd/JsonLd";
import Link from "next/link";
import oldStyles from "../../page.module.css";
import {
  getBlogPostSchema,
  SITE_URL,
  DEFAULT_IMAGE,
} from "@/app/lib/schema";
import Posts from "../../../blog";

function videoContentUrl(video) {
  return (
    video?.contentUrl ||
    video?.src?.mp4 ||
    video?.src?.webm ||
    undefined
  );
}

function videoMimeType(video) {
  const url = videoContentUrl(video);

  if (!url) return undefined;
  if (/\.mp4(?:$|\?)/i.test(url)) return "video/mp4";
  if (/\.webm(?:$|\?)/i.test(url)) return "video/webm";

  return undefined;
}

function formatDuration(duration) {
  if (!duration) return null;

  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return null;

  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);

  if (hours) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = Posts[slug];

  if (!post) {
    return {
      title: "Post not found | Nicholas Egner",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const url = `${SITE_URL}/blog/${slug}`;
  const title = post.meta_title || post.title;
  const description =
    post.meta_description ||
    post.description ||
    post.excerpt ||
    "Read the latest writing from Nicholas Egner on web development, SEO, video, and digital systems.";

  const image = post.meta_image || post.hero_image || DEFAULT_IMAGE;
  const imageAlt =
    post.meta_image_alt ||
    post.hero_image_alt ||
    post.hero_alt ||
    `${post.title} | Nicholas Egner`;

  const publishedTime = post.published_time || post.date;
  const modifiedTime = post.modified_time || publishedTime;
  const isLive = post.live !== false && post.published !== false;

  const videoUrl = videoContentUrl(post.primaryVideo);
  const videoType = videoMimeType(post.primaryVideo);

  return {
    title: `${title} | Nicholas Egner`,
    description,

    robots: {
      index: isLive,
      follow: isLive,
    },

    alternates: {
      canonical: url,
    },

    openGraph: {
      type: "article",
      url,
      title,
      description,
      publishedTime,
      modifiedTime,
      authors: [SITE_URL],
      tags: Array.isArray(post.keywords) ? post.keywords : undefined,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: imageAlt,
            },
          ]
        : [],
      videos: videoUrl
        ? [
            {
              url: videoUrl,
              type: videoType,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@NicholasEgner",
      images: image ? [image] : [],
    },
  };
}

function PrimaryVideo({ post }) {
  const video = post.primaryVideo;
  if (!video) return null;

  const sources =
    typeof video.src === "string"
      ? { mp4: video.src }
      : video.src || {};

  const mp4 = sources.mp4 || (video.contentUrl?.includes(".mp4") ? video.contentUrl : null);
  const webm = sources.webm || (video.contentUrl?.includes(".webm") ? video.contentUrl : null);

  if (!mp4 && !webm) return null;

  const duration = formatDuration(video.duration);

  return (
    <>
      <div className={styles.articleHeroMedia}>
        <video
          controls
          preload="metadata"
          playsInline
          poster={video.thumbnail}
          aria-label={`Video: ${video.title || post.title}`}
          className={styles.heroVideo}
        >
          {webm && <source src={webm} type="video/webm" />}
          {mp4 && <source src={mp4} type="video/mp4" />}
          Your browser does not support the video tag.
        </video>
      </div>

      <div className={styles.watchDetails}>
        <div>
          <p className={styles.watchDetailsLabel}>Featured video</p>
          <p className={styles.watchDetailsTitle}>
            {video.title || post.title}
            {duration ? <span> · {duration}</span> : null}
          </p>
        </div>

        {video.youtube?.url && (
          <a
            className={styles.videoLink}
            href={video.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {video.youtube.label || "Watch on YouTube"}
          </a>
        )}
      </div>
    </>
  );
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = Posts[slug];

  if (!post || post.live === false || post.published === false) {
    notFound();
  }

  const isWatchPage = Boolean(post.primaryVideo || post.isWatchPage);

  return (
    <main className={styles.page}>
      <JsonLd data={getBlogPostSchema({ post, slug })} />
      <SiteHeader />

      <Particles />
      <div className={styles.mainBackColor} />

      <article
        className={`${styles.articleShell} ${isWatchPage ? styles.watchPage : ""}`}
      >
        <Link href="/blog" className={styles.backLink}>
          ← Back to Blog
        </Link>

        <header className={styles.articleHeader}>
          <p className={styles.eyebrow}>
            {isWatchPage ? "Watch / Video" : "Blog"} / {post.date}
          </p>

          <h1>{post.title}</h1>

          {post.description && (
            <p className={styles.articleLead}>{post.description}</p>
          )}
        </header>

        {post.primaryVideo ? (
          <PrimaryVideo post={post} />
        ) : (
          <div className={`${styles.hero} ${styles.articleHeroMedia}`}>
            <Image
              src={post.hero_image}
              fill
              sizes="(max-width: 1000px) 100vw, 1440px"
              priority
              style={{ objectFit: "contain" }}
              alt={post.hero_image_alt || `main image for ${post.title}`}
            />
          </div>
        )}

        <div className={styles.postContainer}>
          <ContentBlock content={post.contentBlocks} />
        </div>

        <div className={styles.articleFooter}>
          <Link href="/blog" className={styles.primaryCta}>
            More from the blog
          </Link>
          <Link href="/blog/archive" className={styles.secondaryLink}>
            Browse full archive
          </Link>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
