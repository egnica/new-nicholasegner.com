import Posts from "../../blog.json";
import Link from "next/link";
import styles from "./blog.module.css";
import Image from "next/image";
import Particles from "../components/particlesBackground";
import SiteFooter from "../components/SiteFooter/SiteFooter";
import JsonLd from "../components/JsonLd/JsonLd";
import oldStyles from "../page.module.css";
import { SITE_URL, DEFAULT_IMAGE, getBlogHubSchema } from "../lib/schema";

export const metadata = {
  title: "Blog | Nicholas Egner",
  description:
    "Writing, videos, and notes from Nicholas Egner on web development, SEO, video, creative work, digital systems, and the process behind building things online.",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: `${SITE_URL}/blog`,
  },

  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: "Blog | Nicholas Egner",
    description:
      "Writing, videos, and notes from Nicholas Egner on web development, SEO, video, creative work, digital systems, and the process behind building things online.",
    siteName: "Nicholas Egner",
    images: [
      {
        url: DEFAULT_IMAGE,
        width: 1200,
        height: 630,
        alt: "Nicholas Egner Blog",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Blog | Nicholas Egner",
    description:
      "Writing, videos, and notes from Nicholas Egner on web development, SEO, video, creative work, digital systems, and the process behind building things online.",
    creator: "@NicholasEgner",
    images: [DEFAULT_IMAGE],
  },
};

export default function BlogMain() {
  const sortedPosts = Object.values(Posts)
    .filter((post) => post.live !== false)
    .sort(
      (a, b) => new Date(b.published_time) - new Date(a.published_time),
    );

  const latest = sortedPosts[0];
  const featuredPosts = sortedPosts
    .filter((post) => post.featured && post.slug !== latest?.slug)
    .slice(0, 6);
  const morePosts = sortedPosts
    .filter((post) => post.slug !== latest?.slug)
    .slice(0, 4);

  if (!latest) return null;

  return (
    <main className={styles.page}>
      <JsonLd data={getBlogHubSchema(Posts)} />

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

      <section className={styles.pageHeader}>
        <p className={styles.eyebrow}>Notes / Videos / Ideas</p>
        <h1>Blog</h1>
        <p>
          Notes, videos, experiments, and whatever else I am thinking about,
          from websites and SEO to movies, habits, creative work, and life.
        </p>
      </section>

      <section className={styles.blogLayout} aria-label="Blog highlights">
        <aside className={styles.postIndex} aria-label="Featured posts">
          <p className={styles.indexLabel}>Featured</p>

          <div className={styles.postIndexList}>
            {featuredPosts.length > 0 ? (
              featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={styles.indexLink}
                >
                  <span>{post.date}</span>
                  <strong>{post.title}</strong>
                </Link>
              ))
            ) : (
              morePosts.slice(0, 4).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={styles.indexLink}
                >
                  <span>{post.date}</span>
                  <strong>{post.title}</strong>
                </Link>
              ))
            )}
          </div>

          <Link href="/blog/archive" className={styles.secondaryLink}>
            Browse full archive
          </Link>
        </aside>

        <div className={styles.blogStage}>
          <article className={styles.latestPost}>
            <section className={styles.latestHero}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>Latest Post</p>
                <h2>{latest.title}</h2>
                <p className={styles.lead}>{latest.description}</p>

                <div className={styles.heroMeta}>
                  <span>{latest.date}</span>
                  <Link
                    href={`/blog/${latest.slug}`}
                    className={styles.primaryCta}
                  >
                    Read the post
                  </Link>
                </div>
              </div>

              <Link
                href={`/blog/${latest.slug}`}
                className={styles.heroMediaWrap}
                aria-label={`Read ${latest.title}`}
              >
                <Image
                  alt={latest.title}
                  className={styles.latestImage}
                  src={latest.hero_image}
                  width={1200}
                  height={630}
                  priority
                />
              </Link>
            </section>
          </article>

          {morePosts.length > 0 && (
            <section className={styles.moreSection}>
              <div className={styles.sectionIntro}>
                <p className={styles.eyebrow}>Keep Reading</p>
                <h2>More from the blog</h2>
              </div>

              <div className={styles.postGrid}>
                {morePosts.map((post) => (
                  <Link
                    className={styles.postCard}
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                  >
                    <div className={styles.cardImageWrap}>
                      <Image
                        className={styles.cardImage}
                        src={post.hero_image}
                        width={600}
                        height={315}
                        alt={`${post.title} main image`}
                      />
                    </div>

                    <div className={styles.cardCopy}>
                      <p className={styles.cardDate}>{post.date}</p>
                      <h3>{post.title}</h3>
                      {post.description && <p>{post.description}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
