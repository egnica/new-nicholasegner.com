"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import SiteFooter from "../../components/SiteFooter/SiteFooter";
import styles from "./opportunity.module.css";

const EXIT_ANIMATION_MS = 280;

const CONTACT_ACTION = {
  id: "contact",
  title: "Contact",
  url: "mailto:nick@nicholasegner.com",
};

export default function OpportunityPageClient({ opportunity }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [visibleCues, setVisibleCues] = useState([]);
  const exitTimers = useRef({});
  const videoRef = useRef(null);

  const cues = opportunity.cues ?? [];
  const constantLinks = [...(opportunity.actions ?? []), CONTACT_ACTION];

  const activeCues = useMemo(() => {
    return cues.filter((cue) => {
      return currentTime >= cue.startTime && currentTime <= cue.endTime;
    });
  }, [cues, currentTime]);

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

      return cues
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
  }, [activeCues, cues]);

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
          <Link href="/" className={styles.actionButton}>
            Home
          </Link>

          <p className={styles.eyebrow}>{opportunity.eyebrow}</p>
          <h1>{opportunity.headline}</h1>
          <p>{opportunity.introduction}</p>
        </header>

        <section className={styles.applicationStage}>
          <div className={styles.videoColumn}>
            <div className={styles.videoShell}>
              <video
                ref={videoRef}
                className={styles.applicationVideo}
                src={opportunity.videoUrl}
                controls
                playsInline
                preload="metadata"
                poster={opportunity.posterUrl}
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
              {constantLinks.map((link) => {
                const isEmail = link.url.startsWith("mailto:");

                return (
                  <a
                    key={link.id}
                    className={styles.actionButton}
                    href={link.url}
                    target={isEmail ? undefined : "_blank"}
                    rel={isEmail ? undefined : "noopener noreferrer"}
                    onClick={handleLinkClick}
                  >
                    {link.title}
                  </a>
                );
              })}
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

        {opportunity.note ? (
          <section className={styles.noteSection}>
            <p className={styles.eyebrow}>{opportunity.note.eyebrow}</p>
            <h2>{opportunity.note.headline}</h2>
            <p>{opportunity.note.body}</p>
          </section>
        ) : null}
      </main>

      <SiteFooter />
    </>
  );
}
