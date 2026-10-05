import { Suspense } from "react";
import Particles from "../components/particlesBackground";
import SiteFooter from "../components/SiteFooter/SiteFooter";
import SiteHeader from "../components/SiteHeader/SiteHeader";
import WhoAreYouExperience from "./WhoAreYouExperience";
import styles from "./who-are-you.module.css";

const PAGE_URL = "https://www.nicholasegner.com/who-are-you";
const POSTER_URL =
  "https://nciholasegner.s3.us-east-2.amazonaws.com/images/who.gif";

export const metadata = {
  title: "Who Are You? | Nicholas Egner",
  description:
    "A slightly less ordinary introduction to Nicholas Egner, his work, and the things he builds.",
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
    title: "Who Are You? | Nicholas Egner",
    description: "Fair question.",
    siteName: "Nicholas Egner",
    images: [
      {
        url: POSTER_URL,
        width: 800,
        height: 333,
        alt: "Who Are You? — Nicholas Egner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Who Are You? | Nicholas Egner",
    description: "Fair question.",
    images: [POSTER_URL],
  },
};

function ExperienceFallback() {
  return (
    <section className={styles.experience}>
      <div className={styles.playerShell}>
        <img
          src={POSTER_URL}
          alt="Who Are You? — Nicholas Egner"
          className={styles.posterImage}
        />
      </div>
    </section>
  );
}

export default function WhoAreYouPage() {
  return (
    <main className={styles.page}>
      <Particles />
      <div className={styles.backgroundGlow} aria-hidden="true" />
      <SiteHeader />

      <div className={styles.content}>
        <Suspense fallback={<ExperienceFallback />}>
          <WhoAreYouExperience />
        </Suspense>
      </div>

      <SiteFooter />
    </main>
  );
}
