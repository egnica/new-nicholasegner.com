"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./dont-forget.module.css";

const POSTER_URL =
  "https://nciholasegner.s3.us-east-2.amazonaws.com/video-page-website/dont-forget.gif";
const YOUTUBE_ID = "CdqoNKCCt7A";

function sanitizeName(value) {
  if (!value) return "";

  return value
    .normalize("NFKC")
    .replace(/[^\p{L}\p{M} .'-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
}

export default function DontForgetPlayer() {
  const searchParams = useSearchParams();
  const [playing, setPlaying] = useState(false);

  const name = useMemo(
    () => sanitizeName(searchParams.get("name")),
    [searchParams]
  );

  return (
    <section className={styles.experience}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>A small hello from Nicholas Egner</p>
        <h1>{name ? `${name}, it’s been a while.` : "It’s been a while."}</h1>
        <p className={styles.lead}>I’d like to keep the conversation going.</p>
      </div>

      <div
        className={`${styles.playerShell} ${playing ? styles.playerShellPlaying : ""}`}
      >
        {playing ? (
          <iframe
            className={styles.iframe}
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
            title="Simple Minds — Don’t You (Forget About Me)"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className={styles.posterButton}
            onClick={() => setPlaying(true)}
            aria-label="Play Don’t You (Forget About Me) by Simple Minds"
          >
            <img
              src={POSTER_URL}
              alt="Don’t You Forget About Me — Nicholas Egner"
              className={styles.posterImage}
            />

            <span className={styles.posterShade} aria-hidden="true" />

            <span className={styles.playControl} aria-hidden="true">
              <span className={styles.playCircle}>
                <svg viewBox="0 0 64 64" role="presentation">
                  <path d="M25 18.5 46 32 25 45.5Z" />
                </svg>
              </span>
              <span className={styles.playText}>Play video</span>
            </span>
          </button>
        )}
      </div>

      <div className={styles.credits}>
        <div>
          <strong>Don’t You (Forget About Me)</strong>
          <span>Simple Minds · Official video via YouTube</span>
        </div>
        <a
          href="https://www.youtube.com/watch?v=CdqoNKCCt7A"
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch on YouTube ↗
        </a>
      </div>
    </section>
  );
}
