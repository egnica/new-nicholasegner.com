import Image from "next/image";
import Link from "next/link";
import HomeHeroVisual from "./HomeHeroVisual";
import styles from "./HomeHero.module.css";

const HERO_IMAGE =
  "https://nciholasegner.s3.us-east-2.amazonaws.com/images/computer-back.webp";

export default function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <div className={styles.heroMedia} aria-hidden="true">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
      </div>
      <div className={styles.heroOverlay} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Nicholas Egner · Digital Systems</p>

          <h1 id="home-hero-title" className={styles.title}>
            Digital systems for businesses that need more than a website.
          </h1>

          <p className={styles.intro}>
            I bring custom web development, video, content, SEO structure, and
            digital strategy together so businesses are easier to find,
            understand, and trust.
          </p>

          <div className={styles.actions}>
            <Link href="/projects" className={styles.primaryAction}>
              View Projects
            </Link>
            <Link href="/about" className={styles.secondaryAction}>
              About Nicholas
            </Link>
          </div>

          <div className={styles.capabilities} aria-label="Core capabilities">
            <span>Web Development</span>
            <span>Video</span>
            <span>SEO</span>
            <span>Content Systems</span>
          </div>
        </div>

        <HomeHeroVisual />
      </div>
    </section>
  );
}
