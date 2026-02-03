import React from "react";
import Posts from "../../blog.json";
import Link from "next/link";
import styles from "./blog.module.css";
import Image from "next/image";
import Particles from "../components/particlesBackground";
import Footer from "../components/footerBlog";
import Header from "../components/header";

function blogMain() {
  const featuredPosts = Object.values(Posts).filter((post) => post.featured);
  const latest = Object.values(Posts).sort(
    (a, b) => new Date(b.published_time) - new Date(a.published_time),
  )[0];

  return (
    <>
      <div style={{ margin: "15px 0 0 15px" }}>
        <Link className={styles.navBtn} href={"/"}>
          Home
        </Link>
      </div>

      <div className={styles.postsContainer}>
        <div className={styles.backColor} />
        <Particles />

        <h1>Nicholas Egner's Blog</h1>
        <div className={styles.latestContain}>
          <div className={styles.lateSplit}>
            <Link href={`blog/${latest.slug}`}>
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
            </Link>
            <div className={styles.recentPostText}>
              <h2>{latest.title}</h2>
              <p>{latest.description}</p>
              <p className={styles.latestDate}>{latest.date}</p>
            </div>
          </div>
        </div>
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
