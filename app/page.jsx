import Link from "next/link";
import Reviews from "../reviews.json";
import styles from "./page.module.css";
import HomeHero from "./components/HomeHero";
import ParticlesBackground from "./components/particlesBackground";
import TechMarquee from "./components/techBanner/techBanner";
import FeaturedProjectCards from "./components/FeaturedProjectCards/FeaturedProjectCards";
import GoogleReviewWall from "./components/GoogleReview/GoogleReviewWall";
import HomeIdentitySections from "./components/HomeIdentitySections/HomeIdentitySections";
import LatestBlogPost from "./components/LatestBlogComponent/LatestBlogPost";
import SiteFooter from "./components/SiteFooter/SiteFooter";
import SiteHeader from "./components/SiteHeader/SiteHeader";
import JsonLd from "./components/JsonLd/JsonLd";
import { getHomePageSchema } from "./lib/schema";
import {
  getBlogData,
  getProjects,
  getTechnologies,
} from "./lib/contentApi";

function newestPost(posts) {
  return Object.values(posts)
    .filter((post) => post && post.live !== false && post.published !== false)
    .sort(
      (a, b) =>
        new Date(b.published_time || b.date) -
        new Date(a.published_time || a.date),
    )[0];
}

export default async function Home() {
  const [blogPosts, projects, technologies] = await Promise.all([
    getBlogData(),
    getProjects(),
    getTechnologies(),
  ]);

  const latest = newestPost(blogPosts);
  const latestPost = latest
    ? {
        slug: latest.slug,
        title: latest.title,
        date: latest.date,
        description: latest.description,
        keywords: latest.keywords,
        hero_image: latest.hero_image,
      }
    : null;

  const featuredProjects = projects
    .filter((project) => project.featured !== false)
    .slice(0, 4)
    .map((project) => ({
      slug: project.slug,
      title: project.title,
      eyebrow: project.eyebrow,
      category: project.category,
      type: project.type,
      practiceArea: project.practiceArea,
      cardSummary: project.cardSummary,
      summary: project.summary,
      description: project.description,
      heroMedia: project.heroMedia,
    }));

  const techIcons = technologies.map((technology) => ({
    name: technology.name,
    svg: technology.image,
    href: `/skills/${technology.slug}`,
  }));

  return (
    <>
      <JsonLd data={getHomePageSchema()} />
      <div className={styles.mainBackColor} />
      <ParticlesBackground />

      <main className={styles.page}>
        <SiteHeader />
        <HomeHero />

        <section className={styles.bottomBuffer}>
          <TechMarquee techIcons={techIcons} />
        </section>

        <section
          className={styles.belowHero}
          aria-labelledby="home-positioning-title"
        >
          <div className={styles.belowHeroInner}>
            <div className={styles.belowHeroMedia}>
              <img
                src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/below-hero.webp"
                alt="Web development, SEO, design, and video editing workspace"
                width="576"
                height="675"
              />
              <span className={styles.belowHeroGradient} aria-hidden="true" />
            </div>

            <div className={styles.belowHeroText}>
              <p className={styles.belowHeroEyebrow}>
                Developer <span aria-hidden="true">•</span> Strategist{" "}
                <span aria-hidden="true">•</span> Producer
              </p>
              <h2 id="home-positioning-title">
                One person connecting the technical and creative sides of your
                digital presence.
              </h2>
              <p>
                I’m Nicholas Egner, a Minneapolis web developer and digital
                strategist. I combine custom web development, search strategy,
                video, content, and automation to help businesses replace
                disconnected digital pieces with a system that works together.
              </p>
              <p>
                That work can include building a custom website, strengthening
                technical SEO and local search visibility, producing video and
                supporting content, or developing a business tool that makes
                day-to-day operations easier.
              </p>
              <Link href="/about" className={styles.belowHeroLink}>
                See how I work <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <FeaturedProjectCards projects={featuredProjects} />
        <HomeIdentitySections />
        <GoogleReviewWall reviews={Reviews} />
        <LatestBlogPost latestPost={latestPost} />
        <SiteFooter />
      </main>
    </>
  );
}
