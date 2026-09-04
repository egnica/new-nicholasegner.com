import Link from "next/link";
import styles from "./LatestBlogPost.module.css";
import blogPosts from "../../../blog";

export default function LatestBlogPost() {
  const latestPost = Object.values(blogPosts)
    .filter(
      (post) =>
        post &&
        post.live !== false &&
        post.published !== false,
    )
    .sort(
      (a, b) =>
        new Date(b.published_time || b.date) -
        new Date(a.published_time || a.date),
    )[0];

  if (!latestPost) return null;

  return (
    <section className={styles.latestWriting}>
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>Latest Thinking</p>

        <h2>A place for recent writing, videos, experiments, and reflections.</h2>

        <p>
          Posts range from web projects and video work to life habits, local
          stories, and the process of figuring things out.
        </p>
      </div>

      <article className={styles.latestPostCard}>
        <div className={styles.postContent}>
          <p className={styles.postMeta}>Featured Post · {latestPost.date}</p>

          <h3>{latestPost.title}</h3>

          <p>{latestPost.description}</p>

          {latestPost.keywords?.length > 0 && (
            <div className={styles.keywordRow}>
              {latestPost.keywords.slice(0, 4).map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>
          )}

          <div className={styles.postActions}>
            <Link href={`/blog/${latestPost.slug}`}>Read latest post</Link>

            <Link href="/blog" className={styles.secondaryLink}>
              View all posts
            </Link>
          </div>
        </div>

        {latestPost.hero_image && (
          <div className={styles.postImageWrap}>
            <img
              src={latestPost.hero_image}
              alt={latestPost.title}
              className={styles.postImage}
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
      </article>
    </section>
  );
}
