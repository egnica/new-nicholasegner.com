import Posts from "../../blog";
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
  const featuredPosts = sortedPosts.filter(
    (post) => post.featured && post.slug !== latest?.slug,
  );

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

      <section className={styles.postsContainer} aria-label="Blog highlights">
        <Link
          href={`/blog/${latest.slug}`}
          className={styles.latestLink}
          aria-label={`Read ${latest.title}`}
        >
          <article className={styles.latestContain}>
            <div className={styles.latestImageWrap}>
              <p className={styles.cardLabel}>Latest Post</p>
              <Image
                alt={latest.title}
                className={styles.latestImage}
                src={latest.hero_image}
                width={1200}
                height={630}
                priority
              />
            </div>

            <div className={styles.recentPostText}>
              <p className={styles.latestDate}>{latest.date}</p>
              <h2>{latest.title}</h2>
              <p>{latest.description}</p>
              <span className={styles.readMore}>Read the post →</span>
            </div>
          </article>
        </Link>

        {featuredPosts.length > 0 && (
          <section className={styles.featuredSection}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Featured</p>
              <h2>Selected posts</h2>
            </div>

            <div className={styles.featuredContain}>
              {featuredPosts.map((item) => (
                <Link
                  className={styles.featuredItemContain}
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                >
                  <Image
                    className={styles.featuredImage}
                    src={item.hero_image}
                    width={600}
                    height={315}
                    alt={`${item.title} main image`}
                  />

                  <div className={styles.featureText}>
                    <p className={styles.latestDate}>{item.date}</p>
                    <h3>{item.title}</h3>
                    {item.description && <p>{item.description}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className={styles.btnDiv}>
          <Link className={styles.primaryCta} href="/blog/archive">
            Full Archive
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
