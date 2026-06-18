import React from "react";
import Posts from "../../../blog.json";
import styles from "../blog.module.css";
import Footer from "@/app/components/footerBlog";
import Link from "next/link";
import Image from "next/image";
import Particles from "../../components/particlesBackground";
import JsonLd from "../../components/JsonLd/JsonLd";
import { getBlogArchiveSchema, SITE_URL, DEFAULT_IMAGE } from "../../lib/schema";

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
function page() {
  <JsonLd data={getBlogArchiveSchema(Posts)} />;

  return (
    <>
      <Particles />
      <div className={styles.backColor} />
      <div style={{ margin: "15px 0 0 15px" }}>
        <Link className={styles.navBtn} href={`./`}>
          Back
        </Link>
      </div>
      <h1 style={{ margin: "20px" }}>Blog Archive</h1>
      <div className={styles.archiveContainer}>
        {Object.values(Posts).map((item, index) => (
          <Link
            href={`/blog/${item.slug}`}
            className={styles.archivePost}
            key={index}
          >
            <Image
              className={styles.archivePostImage}
              src={item.hero_image}
              width={300}
              height={158}
              alt={`${item.title} main image`}
            />
            <div className={styles.archivePostTextContain}>
              <p className={styles.latestDate}>{item.date}</p>
              <h2>{item.title}</h2>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default page;
