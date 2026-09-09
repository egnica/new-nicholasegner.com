import { Suspense } from "react";
import Link from "next/link";
import Particles from "../components/particlesBackground";
import SiteFooter from "../components/SiteFooter/SiteFooter";
import SiteHeader from "../components/SiteHeader/SiteHeader";
import DontForgetPlayer from "./DontForgetPlayer";
import styles from "./dont-forget.module.css";

const PAGE_URL = "https://www.nicholasegner.com/dont-forget";
const POSTER_URL =
  "https://nciholasegner.s3.us-east-2.amazonaws.com/video-page-website/dont-forget.gif";

export const metadata = {
  title: "Don’t Forget | Nicholas Egner",
  description:
    "A small Nicholas Egner web, video, and interactive experience for reconnecting and keeping the conversation going.",
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Don’t Forget | Nicholas Egner",
    description: "It’s been a while. I’d like to keep the conversation going.",
    siteName: "Nicholas Egner",
    images: [
      {
        url: POSTER_URL,
        width: 800,
        height: 333,
        alt: "Don’t You Forget About Me — Nicholas Egner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Don’t Forget | Nicholas Egner",
    description: "It’s been a while. I’d like to keep the conversation going.",
    images: [POSTER_URL],
  },
};

function GenericIntro() {
  return (
    <div className={styles.intro}>
      <p className={styles.eyebrow}>A small hello from Nicholas Egner</p>
      <h1>It’s been a while.</h1>
      <p className={styles.lead}>I’d like to keep the conversation going.</p>
    </div>
  );
}

export default function DontForgetPage() {
  return (
    <main className={styles.page}>
      <Particles />
      <div className={styles.backgroundGlow} aria-hidden="true" />
      <SiteHeader />

      <div className={styles.content}>
        <Suspense fallback={<GenericIntro />}>
          <DontForgetPlayer />
        </Suspense>

        <section className={styles.more} aria-labelledby="still-making-things">
          <p className={styles.sectionEyebrow}>Still making things.</p>
          <h2 id="still-making-things">A few places to keep exploring.</h2>
          <p>
            I’ve been spending a lot of time combining video, web development,
            design, and interactive experiences. If it’s been a while since
            you’ve seen what I’m working on, these are good places to start.
          </p>

          <nav className={styles.paths} aria-label="Explore Nicholas Egner’s work">
            <Link href="/video" className={styles.pathLink}>
              <span>
                <small>Watch</small>
                Video Work
              </span>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>

            <Link href="/projects" className={styles.pathLink}>
              <span>
                <small>Explore</small>
                Projects
              </span>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>
          </nav>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
