import Posts from "../../../blog.json";
import Image from "next/image";
import ContentBlock from "@/app/components/contentBlock";
import styles from "../blog.module.css";
import Particles from "../../components/particlesBackground";
import Footer from "@/app/components/footerBlog";
import BackButton from "../../components/backButton";

const SITE_URL = "https://www.nicholasegner.com";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const post = Posts[slug];

  if (!post) {
    return {
      title: "Post not found | Nicholas Egner",
      robots: { index: false, follow: false },
    };
  }

  const url = `${SITE_URL}/blog/${slug}`;
  const title = post.title;
  const description = post.description;
  const image = post.meta_image || post.hero_image;

  return {
    title: `${title} | Nicholas Egner`,
    description,
    keywords: post.keywords,
    alternates: { canonical: url },

    openGraph: {
      type: "article",
      url,
      title,
      description,
      publishedTime: post.published_time,
      modifiedTime: post.modified_time,
      images: image ? [{ url: image }] : [],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

function buildVideoObjectFromPrimary({ primaryVideo, post, url, image }) {
  const contentUrl = primaryVideo?.src?.mp4 || primaryVideo?.src?.webm;

  return {
    "@type": "VideoObject",
    name: post.title,
    description: post.description,
    thumbnailUrl: primaryVideo.thumbnail || image,
    uploadDate: post.published_time,
    duration: primaryVideo.duration, // e.g. "PT6M10S"
    contentUrl: contentUrl,
    embedUrl: primaryVideo.embedUrl || contentUrl,
    // If you have YouTube, you can include it as a sameAs (optional)
    sameAs: primaryVideo?.youtube?.url ? [primaryVideo.youtube.url] : undefined,
    // Connect the video to the page
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
  };
}

function buildVideoObjectFromBlock({ block, post, url, image, index }) {
  return {
    "@type": "VideoObject",
    name: `${post.title}${index != null ? ` (Video ${index + 1})` : ""}`,
    description: post.description,
    thumbnailUrl: image,
    uploadDate: post.published_time,
    contentUrl: block.src,
    embedUrl: block.src,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
  };
}

function buildJsonLd({ post, slug }) {
  const url = `${SITE_URL}/blog/${slug}`;
  const image = post.meta_image || post.hero_image;

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.description,
    image: image ? [image] : undefined,
    datePublished: post.published_time,
    dateModified: post.modified_time,
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    keywords: Array.isArray(post.keywords)
      ? post.keywords.join(", ")
      : undefined,
  };

  // --- Collect supporting videos from contentBlocks ---
  const blockVideos = Array.isArray(post.contentBlocks)
    ? post.contentBlocks.filter((b) => b.type === "video" && b.src)
    : [];

  // --- Build VideoObjects ---
  const videoObjects = [];

  // Primary video (if exists)
  if (post.primaryVideo) {
    const primaryVideoObject = buildVideoObjectFromPrimary({
      primaryVideo: post.primaryVideo,
      post,
      url,
      image,
    });

    // Signal primary video clearly
    blogPosting.video = primaryVideoObject;

    // Also include in hasPart list
    videoObjects.push(primaryVideoObject);
  }

  // Supporting videos
  blockVideos.forEach((block, index) => {
    videoObjects.push(
      buildVideoObjectFromBlock({ block, post, url, image, index }),
    );
  });

  // Attach hasPart if any videos exist
  if (videoObjects.length) {
    blogPosting.hasPart = videoObjects;
  }

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return { blogPosting, breadcrumbs };
}

export default async function PostPage({ params }) {
  const { slug } = params;
  const post = Posts[slug];

  if (!post) {
    return <h1>Post not found</h1>;
  }

  const { blogPosting, breadcrumbs } = buildJsonLd({ post, slug });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <div style={{ margin: "15px 0 0 15px" }}>
        <BackButton />
      </div>

      <div className={styles.postContainer}>
        <div className={styles.backColor} />
        <Particles />
        <h1>{post.title}</h1>
        <p>
          <em>{post.date}</em>
        </p>

        <div className={styles.hero}>
          {post.primaryVideo ? (
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
          ) : (
            <Image
              src={post.hero_image}
              fill
              sizes="100vw"
              priority
              style={{ objectFit: "cover" }}
              alt={`main image for ${post.title}`}
            />
          )}
        </div>

        <ContentBlock content={post.contentBlocks} />
      </div>

      <Footer />
    </>
  );
}
