"use client";
import styles from "./page.module.css";
import Link from "next/link";
import stackData from "../stack.json";
import Reviews from "../reviews.json";
import ParticlesBackground from "./components/particlesBackground";
import TechMarquee from "./components/techBanner/techBanner";
import FeaturedProjectCards from "./components/FeaturedProjectCards/FeaturedProjectCards";
import GoogleReviewWall from "./components/GoogleReview/GoogleReviewWall";
import SiteFooter from "./components/SiteFooter/SiteFooter";
import SiteHeader from "./components/SiteHeader/SiteHeader";
import LatestBlogPost from "./components/LatestBlogComponent/LatestBlogPost";
import LazyMount from "./components/LazyMount";
import JsonLd from "./components/JsonLd/JsonLd";
import HomeHero from "./components/HomeHero/HomeHero";
import { getHomePageSchema } from "./lib/schema";

export default function Home() {
  const techIcons = stackData.stack.flatMap((category) =>
    category.technologies.map((tech) => ({
      name: tech.name,
      svg: tech.image,
      href: `/skills/${tech.slug}`,
    })),
  );

  return (
    <>
      <JsonLd data={getHomePageSchema()} />
      <div className={styles.mainBackColor}></div>
      <ParticlesBackground />
      <main className={styles.page}>
        <SiteHeader />

        <HomeHero />

        <section className={styles.bottomBuffer}>
          <TechMarquee techIcons={techIcons} />
        </section>

        <section className={styles.belowHero}>
          <img
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/below-hero.webp"
            alt="Nicholas Egner web development and digital content workspace"
          />
          <div className={styles.belowHeroText}>
            <h2>
              I’m&nbsp;
              <Link href="/about" className={styles.name}>
                Nicholas Egner
              </Link>
            </h2>
            <br />
            <p>
              I build websites and content systems that help businesses get
              found, gain digital credibility, and turn attention into
              opportunity.
            </p>
            <br />
            <p>
              I work with businesses that need more than a basic website. I help
              shape the full digital experience:
              <br />
              <br />
              <strong style={{ fontSize: "1.4rem" }} className={styles.name}>
                the site, the message, the content, the SEO structure, the
                video, and the trust signals{" "}
              </strong>
              <br />
              <br />
              that make people feel confident reaching out.
            </p>
            <br />
            <p>
              Whether you need a new website, stronger service pages, video
              content, social-ready assets, or a clearer online presence, I
              bring the technical and creative pieces together into one focused
              system.
            </p>
          </div>
        </section>
        <LazyMount>
          <FeaturedProjectCards minHeight={700} />
        </LazyMount>

        <GoogleReviewWall reviews={Reviews} />

        <LatestBlogPost />
        <SiteFooter />
      </main>
    </>
  );
}
