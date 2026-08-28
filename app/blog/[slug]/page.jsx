import Image from "next/image";
import ContentBlock from "@/app/components/contentBlock";
import styles from "../blog.module.css";
import Particles from "../../components/particlesBackground";
import SiteFooter from "@/app/components/SiteFooter/SiteFooter";
import JsonLd from "../../components/JsonLd/JsonLd";
import Link from "next/link";
import oldStyles from "../../page.module.css";
import { getBlogPostSchema } from "@/app/lib/schema";

import Posts from "../../../blog.json";
import { SITE_URL, DEFAULT_IMAGE } from "@/app/lib/schema";

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

  const isLive = post.live !== false;

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

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = Posts[slug];

  if (!post) {
    return <h1>Post not found</h1>;
  }

  return (
    <main className={styles.page}>
      <JsonLd data={getBlogPostSchema({ post, slug })} />

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
          <Link href="/projects">Projects</Link>
          <Link href="/about">About Nick</Link>
        </div>
      </nav>

      <Particles />
      <div className={styles.mainBackColor} />

      <article className={styles.articleShell}>
        <Link href="/blog" className={styles.backLink}>
          ← Back to Blog
        </Link>

        <header className={styles.articleHeader}>
          <p className={styles.eyebrow}>Blog / {post.date}</p>
          <h1>{post.title}</h1>
          {post.description && (
            <p className={styles.articleLead}>{post.description}</p>
          )}
        </header>

        {post.primaryVideo ? (
          <div className={styles.articleHeroMedia}>
            <video
              controls
              preload="metadata"
              playsInline
              poster={post.primaryVideo.thumbnail}
              aria-label={`Video: ${post.primaryVideo.title || post.title}`}
              className={styles.heroVideo}
            >
              {post.primaryVideo.src.webm && (
                <source src={post.primaryVideo.src.webm} type="video/webm" />
              )}
              {post.primaryVideo.src.mp4 && (
                <source src={post.primaryVideo.src.mp4} type="video/mp4" />
              )}
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className={`${styles.hero} ${styles.articleHeroMedia}`}>
            <Image
              src={post.hero_image}
              fill
              sizes="(max-width: 1000px) 100vw, 1200px"
              priority
              style={{ objectFit: "cover" }}
              alt={`main image for ${post.title}`}
            />
          </div>
        )}

        {post.primaryVideo?.youtube?.url && (
          <a
            className={styles.videoLink}
            href={post.primaryVideo.youtube.url}
            target="_blank"
            rel="noreferrer"
          >
            {post.primaryVideo.youtube.label}
          </a>
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
