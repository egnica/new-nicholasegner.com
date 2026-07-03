"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./marketing-content-producer.module.css";
import { applicationVideoCues } from "./applicationVideoCues";
import Link from "next/link";
import SiteFooter from "../components/SiteFooter/SiteFooter";
const EXIT_ANIMATION_MS = 280;

const applicationVideoUrl =
  "https://nciholasegner.s3.us-east-2.amazonaws.com/video/website-videos/Marketing_Content_Producer.mp4";

const constantLinks = [
  {
    id: "resume",
    title: "Resume",
    url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/Nicholas_Egner_Marketing_Content_Producer.pdf",
  },

  {
    id: "contact",
    title: "Contact",
    url: "mailto:nick@nicholasegner.com",
  },
];

export default function MarketingContentProducerPage() {
  const [currentTime, setCurrentTime] = useState(0);
  const [visibleCues, setVisibleCues] = useState([]);
  const exitTimers = useRef({});
  const videoRef = useRef(null);

  const activeCues = useMemo(() => {
    return applicationVideoCues.filter((cue) => {
      return currentTime >= cue.startTime && currentTime <= cue.endTime;
    });
  }, [currentTime]);

  useEffect(() => {
    const activeIds = new Set(activeCues.map((cue) => cue.id));

    activeIds.forEach((id) => {
      if (exitTimers.current[id]) {
        clearTimeout(exitTimers.current[id]);
        delete exitTimers.current[id];
      }
    });

    setVisibleCues((previousCues) => {
      const previousCueMap = new Map(
        previousCues.map((item) => [item.cue.id, item]),
      );

      previousCues.forEach((item) => {
        const cueId = item.cue.id;

        if (
          !activeIds.has(cueId) &&
          item.status !== "exiting" &&
          !exitTimers.current[cueId]
        ) {
          exitTimers.current[cueId] = setTimeout(() => {
            setVisibleCues((currentCues) =>
              currentCues.filter((entry) => entry.cue.id !== cueId),
            );

            delete exitTimers.current[cueId];
          }, EXIT_ANIMATION_MS);
        }
      });

      return applicationVideoCues
        .filter((cue) => activeIds.has(cue.id) || previousCueMap.has(cue.id))
        .map((cue) => {
          if (activeIds.has(cue.id)) {
            return {
              cue,
              status: "visible",
            };
          }

          return {
            ...previousCueMap.get(cue.id),
            status: "exiting",
          };
        });
    });
  }, [activeCues]);

  useEffect(() => {
    return () => {
      Object.values(exitTimers.current).forEach((timer) => clearTimeout(timer));
    };
  }, []);

  function handleLinkClick() {
    videoRef.current?.pause();
  }
  function handleVideoEnded() {
    if (!videoRef.current) return;

    videoRef.current.currentTime = 0;
    setCurrentTime(0);
  }

  return (
    <>
      <main className={styles.page}>
        <div className={styles.mainBackColor} />

        <header className={styles.pageHeader}>
          <Link href={"/"} className={styles.actionButton}>
            Home
          </Link>
          <br />
          <br />
          <p className={styles.eyebrow}>
            Marketing Content Producer Application
          </p>

          <h1>Video, SEO & Digital Storytelling</h1>

          <p>
            A custom application experience created for the Marketing Content
            Producer role at the Hazelden Betty Ford Foundation.
          </p>
        </header>

        <section className={styles.applicationStage}>
          <div className={styles.videoColumn}>
            <div className={styles.videoShell}>
              <video
                ref={videoRef}
                className={styles.applicationVideo}
                src={applicationVideoUrl}
                controls
                playsInline
                preload="metadata"
                poster="https://nciholasegner.s3.us-east-2.amazonaws.com/video/website-videos/Hasel-cover.webp"
                onTimeUpdate={(event) =>
                  setCurrentTime(event.currentTarget.currentTime)
                }
                onSeeked={(event) =>
                  setCurrentTime(event.currentTarget.currentTime)
                }
                onEnded={handleVideoEnded}
              />
            </div>

            <div
              className={styles.constantActions}
              aria-label="Application links"
            >
              {constantLinks.map((link) => (
                <a
                  key={link.id}
                  className={styles.actionButton}
                  href={link.url}
                  target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    link.url.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  onClick={handleLinkClick}
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          <aside className={styles.cuePanel} aria-label="Referenced work links">
            <p className={styles.cueLabel}>Referenced Work</p>

            <div className={styles.cueStack} aria-live="polite">
              {visibleCues.length > 0 ? (
                visibleCues.map((item) => (
                  <a
                    key={item.cue.id}
                    className={`${styles.cuePill} ${
                      item.status === "exiting"
                        ? styles.cuePillExit
                        : styles.cuePillEnter
                    }`}
                    href={item.cue.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                  >
                    <span>{item.cue.title}</span>
                    <span className={styles.cueArrow}>↗</span>
                  </a>
                ))
              ) : (
                <p className={styles.emptyCue}>
                  Links will appear here as the video references selected work.
                </p>
              )}
            </div>
          </aside>
        </section>

        <section className={styles.noteSection}>
          <p className={styles.eyebrow}>Why I Created This</p>

          <h2>A video application with the content system built around it.</h2>

          <p>
            This page is meant to show how I think about content production:
            combining the message, the video, the web experience, and the proof
            points into one clear digital experience.
          </p>
        </section>
        <br />
      </main>
      <SiteFooter />
    </>
  );
}
