//BLOG SLUG -

import Image from "next/image";
import ContentBlock from "@/app/components/contentBlock";
import styles from "../blog.module.css";
import Particles from "../../components/particlesBackground";
import Footer from "@/app/components/footerBlog";
import BackButton from "../../components/backButton";
import JsonLd from "../../components/JsonLd/JsonLd";
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
  const { slug } = params;
  const post = Posts[slug];

  if (!post) {
    return <h1>Post not found</h1>;
  }

  return (
    <>
      <JsonLd data={getBlogPostSchema({ post, slug })} />

      <div style={{ margin: "15px 0 0 15px" }}>
        <BackButton />
      </div>
      <br />
      {post.primaryVideo && (
        <div className={styles.hero}>
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
      )}

      <div className={styles.postContainer}>
        <div className={styles.backColor} />
        <Particles />
        <h1>{post.title}</h1>
        <p>
          <em>{post.date}</em>
        </p>

        {!post.primaryVideo && (
          <div className={styles.hero}>
            <Image
              src={post.hero_image}
              fill
              sizes="100vw"
              priority
              style={{ objectFit: "cover" }}
              alt={`main image for ${post.title}`}
            />
          </div>
        )}

        {post.primaryVideo?.youtube.url && (
          <div style={{ display: "grid" }}>
            <br />
            <a
              style={{ textAlign: "center" }}
              href={post.primaryVideo.youtube.url}
            >
              {post.primaryVideo.youtube.label}
            </a>
            <br />
          </div>
        )}
        <ContentBlock content={post.contentBlocks} />
      </div>

      <Footer />
    </>
  );
}
