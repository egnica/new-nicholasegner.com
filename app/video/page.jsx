import Link from "next/link";
import Image from "next/image";
import Particles from "../components/particlesBackground";
import SiteFooter from "../components/SiteFooter/SiteFooter";
import JsonLd from "../components/JsonLd/JsonLd";
import VideoHubClient from "./VideoHubClient";
import styles from "./video.module.css";
import oldStyles from "../page.module.css";
import { videoWork, videoHubAssets } from "../lib/videoWork";
import {
  SITE_URL,
  getVideosHubSchema,
} from "../lib/schema";

const pageUrl = `${SITE_URL}/video`;

export const metadata = {
  title: "Video Production & Editing Portfolio | Nicholas Egner",
  description:
    "Explore video production, editing, documentary storytelling, corporate event video, motion graphics, interactive video, and video SEO work by Minneapolis creative technologist Nicholas Egner.",
  keywords: [
    "Minneapolis video production and editing",
    "corporate event video editor",
    "brand storytelling video production",
    "documentary video editor Minneapolis",
    "video SEO and watch pages",
    "interactive video web experiences",
    "Adobe Premiere Pro video editor",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: "Video Work | Nicholas Egner",
    description:
      "A curated portfolio of video production, editing, storytelling, interactive video, and search-focused video experiences.",
    siteName: "Nicholas Egner",
    images: [
      {
        url: videoHubAssets.hero,
        width: 1200,
        height: 630,
        alt: "Nicholas Egner video editing and production portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Work | Nicholas Egner",
    description:
      "Video production, editing, storytelling, interactive video, and video SEO work.",
    images: [videoHubAssets.hero],
  },
};

export default function VideoPage() {
  return (
    <>
      <JsonLd data={getVideosHubSchema(videoWork)} />

      <main className={styles.page}>
        <Particles />
        <div className={styles.mainBackColor} />

        <nav className={oldStyles.topPage}>
          <Link href="/" aria-label="Nicholas Egner home">
            <Image
              src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/ne-white.svg"
              width={60}
              height={60}
              alt="Nicholas Egner Logo"
            />
          </Link>

          <div className={oldStyles.headerNavLinks}>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About Nick</Link>
            <Link href="/projects">Projects</Link>
          </div>
        </nav>

        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Video Work</p>
            <h1>Video built to be watched, understood, and useful.</h1>
            <p className={styles.heroLead}>
              I produce and edit video for businesses, organizations, events,
              websites, and digital campaigns. My work spans brand storytelling,
              documentary editing, corporate event video, motion graphics,
              interactive video experiences, and search-focused video content.
            </p>

            <div className={styles.heroTags} aria-label="Video capabilities">
              <span>Production</span>
              <span>Editing</span>
              <span>Motion</span>
              <span>Video SEO</span>
              <span>Interactive Experiences</span>
            </div>
          </div>

          <div className={styles.heroImageWrap}>
            <img
              src={videoHubAssets.hero}
              alt="Video editing workspace representing Nicholas Egner's post-production work"
            />
          </div>
        </header>

        <VideoHubClient items={videoWork} assets={videoHubAssets} />

        <SiteFooter />
      </main>
    </>
  );
}
