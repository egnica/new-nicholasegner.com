import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css";
import stackData from "../stack.json";
import Reviews from "../reviews.json";
import TechMarquee from "./components/techBanner/techBanner";
import FeaturedProjectCards from "./components/FeaturedProjectCards/FeaturedProjectCards";
import GoogleReviewWall from "./components/GoogleReview/GoogleReviewWall";
import SiteFooter from "./components/SiteFooter/SiteFooter";
import SiteHeader from "./components/SiteHeader/SiteHeader";
import LatestBlogPost from "./components/LatestBlogComponent/LatestBlogPost";
import JsonLd from "./components/JsonLd/JsonLd";
import HomeHero from "./components/HomeHero/HomeHero";
import { getHomePageSchema } from "./lib/schema";

const capabilityCards = [
  {
    number: "01",
    title: "Custom web systems",
    text: "Fast, flexible websites and web applications built around the way the business actually works, not around the limits of a theme or plugin stack.",
  },
  {
    number: "02",
    title: "Content and video",
    text: "Video, written content, watch pages, social assets, and publishing systems designed to turn expertise into useful material people can actually find and use.",
  },
  {
    number: "03",
    title: "Search and trust",
    text: "Technical SEO, structured data, service-page architecture, reviews, and other credibility signals that help people understand the business and feel confident taking the next step.",
  },
];

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
      <div className={styles.siteBackground} aria-hidden="true" />

      <main className={styles.page}>
        <SiteHeader />
        <HomeHero />

        <section className={styles.techBand} aria-label="Tools and platforms">
          <div className={styles.techBandInner}>
            <p className={styles.techBandLabel}>Tools &amp; platforms</p>
            <TechMarquee techIcons={techIcons} />
          </div>
        </section>

        <section className={styles.systemSection} aria-labelledby="home-system-title">
          <div className={styles.systemIntro}>
            <div className={styles.systemCopy}>
              <p className={styles.eyebrow}>What I Build</p>
              <h2 id="home-system-title">One connected digital presence.</h2>
              <p className={styles.lead}>
                Most businesses do not need another disconnected website, video,
                or SEO tactic. They need the pieces to work together.
              </p>
              <p>
                I design and build custom digital systems that connect the site,
                message, content, video, search structure, and trust signals
                around a clear business goal. The result is easier to manage,
                easier to explain, and easier for the right people to find.
              </p>

              <Link href="/about" className={styles.textLink}>
                More about how I work <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className={styles.systemMedia}>
              <Image
                src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/below-hero.webp"
                alt="Nicholas Egner working across web development, video, and digital content"
                width={1100}
                height={760}
                sizes="(max-width: 900px) 100vw, 48vw"
              />
              <div className={styles.mediaCaption}>
                <span>Development</span>
                <span>Content</span>
                <span>Visibility</span>
              </div>
            </div>
          </div>

          <div className={styles.capabilityGrid}>
            {capabilityCards.map((card) => (
              <article key={card.number} className={styles.capabilityCard}>
                <span className={styles.capabilityNumber}>{card.number}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <div className={styles.proofSection}>
          <FeaturedProjectCards />
        </div>

        <div className={styles.trustSection}>
          <GoogleReviewWall reviews={Reviews} />
        </div>

        <div className={styles.writingSection}>
          <LatestBlogPost />
        </div>

        <SiteFooter />
      </main>
    </>
  );
}
