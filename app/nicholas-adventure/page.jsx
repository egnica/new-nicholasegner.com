import { Suspense } from "react";
import Particles from "../components/particlesBackground";
import SiteFooter from "../components/SiteFooter/SiteFooter";
import SiteHeader from "../components/SiteHeader/SiteHeader";
import NicholasAdventureGame from "../components/NicholasAdventureGame/NicholasAdventureGame";
import styles from "../who-are-you/who-are-you.module.css";

const PAGE_URL = "https://www.nicholasegner.com/nicholas-adventure";
const META_IMAGE_URL = `${PAGE_URL}/opengraph-image`;

export const metadata = {
  title: "Nicholas's Adventure | Nicholas Egner",
  description:
    "A tiny retro browser game by Nicholas Egner. Find the key, avoid the enemies, and unlock the chest.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Nicholas's Adventure | Nicholas Egner",
    description:
      "A tiny retro browser game by Nicholas Egner. Find the key, avoid the enemies, and unlock the chest.",
    siteName: "Nicholas Egner",
    images: [
      {
        url: META_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Nicholas's Adventure retro browser game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicholas's Adventure | Nicholas Egner",
    description:
      "A tiny retro browser game by Nicholas Egner. Find the key, avoid the enemies, and unlock the chest.",
    images: [META_IMAGE_URL],
  },
};

export default function NicholasAdventurePage() {
  return (
    <main className={styles.page}>
      <Particles />
      <div className={styles.backgroundGlow} aria-hidden="true" />
      <SiteHeader />

      <div className={styles.content}>
        <Suspense fallback={null}>
          <NicholasAdventureGame title="Nicholas's Adventure" headingLevel="h1" />
        </Suspense>
      </div>

      <SiteFooter />
    </main>
  );
}
