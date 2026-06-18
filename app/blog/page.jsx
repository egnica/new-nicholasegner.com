import React from "react";
import Posts from "../../blog.json";
import Link from "next/link";
import styles from "./blog.module.css";
import Image from "next/image";
import Particles from "../components/particlesBackground";
import Footer from "../components/footerBlog";
import Header from "../components/header";
import JsonLd from "../components/JsonLd/JsonLd";
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

function blogMain() {
  const featuredPosts = Object.values(Posts).filter((post) => post.featured);
  const latest = Object.values(Posts).sort(
    (a, b) => new Date(b.published_time) - new Date(a.published_time),
  )[0];

  return (
    <>
      <JsonLd data={getBlogHubSchema(Posts)} />
      <div style={{ margin: "15px 0 0 15px" }}>
        <Link className={styles.navBtn} href={"/"}>
          Home
        </Link>
      </div>

      <div className={styles.postsContainer}>
        <div className={styles.backColor} />
        <Particles />

        <h1>Nicholas Egner's Blog</h1>

        <Link href={`blog/${latest.slug}`}>
          <div className={styles.latestContain}>
            <div className={styles.lateSplit}>
              <div>
                <h2>Latest post</h2>
                <Image
                  alt={latest.title}
                  className={styles.latestImage}
                  src={latest.hero_image}
                  width={1200}
                  height={630}
                />
              </div>

              <div className={styles.recentPostText}>
                <h2>{latest.title}</h2>
                <p>{latest.description}</p>
                <p className={styles.latestDate}>{latest.date}</p>
              </div>
            </div>
          </div>
        </Link>
        <h2>Featured</h2>
        <div className={styles.featuredContain}>
          {featuredPosts.map((item, index) => (
            <Link
              className={styles.featuredItemContain}
              key={index}
              href={`blog/${item.slug}`}
            >
              <Image
                className={styles.featuredImage}
                src={item.hero_image}
                width={300}
                height={158}
                alt={`${item.title} main image`}
              />
              <div className={styles.featureText}>
                <h3>{item.title}</h3>
                <p className={styles.latestDate}>{item.date}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.btnDiv}>
          <Link className={styles.navBtn} href={"/blog/archive"}>
            Full Archive
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default blogMain;
