import React from "react";
import Posts from "../../../blog.json";
import styles from "../blog.module.css";
import Footer from "@/app/components/footerBlog";
import Link from "next/link";
import Image from "next/image";
import Particles from "../../components/particlesBackground";
import JsonLd from "../../components/JsonLd/JsonLd";
import { getBlogArchiveSchema } from "../../lib/schema";

export const metadata = {
  title: "Blog Archive | Nicholas Egner",
  description:
    "A chronological archive of articles and notes from Nicholas Egner on web development, SEO, video, content strategy, and digital systems.",
  alternates: {
    canonical: "/blog/archive",
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
