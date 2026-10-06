"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import NicholasAdventureGame from "../components/NicholasAdventureGame/NicholasAdventureGame";
import styles from "./who-are-you.module.css";

const POSTER_URL =
  "https://nciholasegner.s3.us-east-2.amazonaws.com/images/who.gif";
const YOUTUBE_ID = "PNbBDrceCy8";

function sanitizeName(value) {
  if (!value) return "";

  return value
    .normalize("NFKC")
    .replace(/[^\p{L}\p{M} .'-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
}

export default function WhoAreYouExperience() {
  const searchParams = useSearchParams();
  const [playing, setPlaying] = useState(false);

  const name = useMemo(
    () => sanitizeName(searchParams.get("name")),
    [searchParams],
  );

  return (
    <section className={styles.experience}>
      <div
        className={`${styles.playerShell} ${playing ? styles.playerShellPlaying : ""}`}
      >
        {playing ? (
          <iframe
            className={styles.iframe}
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
            title="The Who — Who Are You"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className={styles.posterButton}
            onClick={() => setPlaying(true)}
            aria-label="Play Who Are You by The Who"
          >
            <img
              src={POSTER_URL}
              alt="Who Are You? — Nicholas Egner"
              className={styles.posterImage}
            />
            <span className={styles.posterShade} aria-hidden="true" />
            <span className={styles.playControl} aria-hidden="true">
              <span className={styles.playCircle}>
                <svg viewBox="0 0 64 64" role="presentation">
                  <path d="M25 18.5 46 32 25 45.5Z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>

      <div className={styles.credits}>
        <div>
          <strong>Who Are You</strong>
          <span>The Who · Official video via YouTube</span>
        </div>
        <a
          href="https://www.youtube.com/watch?v=PNbBDrceCy8"
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch on YouTube ↗
        </a>
      </div>

      <section className={styles.intro}>
        <h1>{name ? `${name}, so who am I?` : "So, who am I?"}</h1>
        <p className={styles.fairQuestion}>
          <strong>Fair question.</strong>
        </p>
        <p className={styles.lead}>
          I’m Nicholas Egner. I build websites, video, content systems, and
          custom tools for businesses that want their digital presence to work
          a little harder.
        </p>
      </section>

      <section className={styles.pathsSection}>
        <h2>What do you want to know?</h2>
        <nav className={styles.paths} aria-label="Explore Nicholas Egner">
          <Link href="/video-experience" className={styles.pathLink}>
            <span>
              <small>Who are you, really?</small>
              Get the longer answer
            </span>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>

          <Link href="/projects" className={styles.pathLink}>
            <span>
              <small>See what I build</small>
              Projects and work
            </span>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>

          <Link href="/blog" className={styles.pathLink}>
            <span>
              <small>What am I working on?</small>
              Recent ideas and builds
            </span>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>

          <a href="mailto:nick@nicholasegner.com" className={styles.pathLink}>
            <span>
              <small>Just say hello</small>
              Email me
            </span>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </a>
        </nav>
      </section>

      <NicholasAdventureGame messageEndpoint="/api/who-are-you" />
    </section>
  );
}
