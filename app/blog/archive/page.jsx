import Posts from "../../../blog";
import styles from "../blog.module.css";
import SiteFooter from "@/app/components/SiteFooter/SiteFooter";
import Link from "next/link";
import Image from "next/image";
import Particles from "../../components/particlesBackground";
import JsonLd from "../../components/JsonLd/JsonLd";
import oldStyles from "../../page.module.css";
import {
  getBlogArchiveSchema,
  SITE_URL,
  DEFAULT_IMAGE,
} from "../../lib/schema";

export const metadata = {
  title: "Blog Archive | Nicholas Egner",
  description:
    "A chronological archive of blog posts, videos, and notes from Nicholas Egner on web development, SEO, video, creative work, digital systems, and related ideas.",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: `${SITE_URL}/blog/archive`,
  },

  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog/archive`,
    title: "Blog Archive | Nicholas Egner",
    description:
      "A chronological archive of blog posts, videos, and notes from Nicholas Egner on web development, SEO, video, creative work, digital systems, and related ideas.",
    siteName: "Nicholas Egner",
    images: [
      {
        url: DEFAULT_IMAGE,
        width: 1200,
        height: 630,
        alt: "Nicholas Egner Blog Archive",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Blog Archive | Nicholas Egner",
    description:
      "A chronological archive of blog posts, videos, and notes from Nicholas Egner on web development, SEO, video, creative work, digital systems, and related ideas.",
    creator: "@NicholasEgner",
    images: [DEFAULT_IMAGE],
  },
};

export default function BlogArchive() {
  const posts = Object.values(Posts)
    .filter((post) => post.live !== false)
    .sort(
      (a, b) => new Date(b.published_time) - new Date(a.published_time),
    );

  return (
    <main className={styles.page}>
      <JsonLd data={getBlogArchiveSchema(Posts)} />

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

      <section className={styles.archiveHeader}>
        <Link href="/blog" className={styles.backLink}>
          ← Back to Blog
        </Link>
        <p className={styles.eyebrow}>Everything in one place</p>
        <h1>Blog Archive</h1>
        <p>
          The complete collection of writing, videos, experiments, ideas, and
          assorted rabbit holes.
        </p>
      </section>

      <section className={styles.archiveGrid} aria-label="Blog archive">
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            className={styles.archiveCard}
            key={post.slug}
          >
            <div className={styles.archiveImageWrap}>
              <Image
                className={styles.archivePostImage}
                src={post.hero_image}
                width={700}
                height={368}
                alt={`${post.title} main image`}
              />
            </div>

            <div className={styles.archiveCardCopy}>
              <p className={styles.cardDate}>{post.date}</p>
              <h2>{post.title}</h2>
              {post.description && <p>{post.description}</p>}
            </div>
          </Link>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
