"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./video.module.css";
import { getTech } from "../lib/techStack";

const DEAD_ZONE = 0.34;
const MAX_SCROLL_SPEED = 3.4;

function SkillLinks({ skills = [] }) {
  if (!skills.length) return null;

  return (
    <div className={styles.skillRow}>
      {skills.map((slug) => {
        const tech = getTech(slug);

        return (
          <Link
            key={slug}
            href={`/skills/${slug}`}
            className={styles.skillBadge}
            title={tech?.name || slug}
          >
            {tech?.name || slug}
          </Link>
        );
      })}
    </div>
  );
}

function PosterImage({ item, fallbackPoster, className = "" }) {
  return (
    <img
      className={className}
      src={item.poster || fallbackPoster}
      alt={
        item.poster
          ? `${item.title} video poster`
          : `${item.title} video portfolio preview`
      }
      loading="lazy"
    />
  );
}

function ExternalOrInternalLink({ href, className, children }) {
  const external = /^https?:\/\//i.test(href);

  if (external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function FilteredWorkCard({ item, fallbackPoster }) {
  const detailHref = item.slug ? `/video/${item.slug}` : item.url;
  const actionLabel = item.slug
    ? "View project details"
    : item.type === "video"
      ? "Watch example"
      : "Explore experience";

  return (
    <article className={styles.filterCard}>
      <div className={styles.filterMedia}>
        <PosterImage
          item={item}
          fallbackPoster={fallbackPoster}
          className={styles.filterImage}
        />
      </div>

      <div className={styles.filterCopy}>
        <p className={styles.stageCategory}>{item.category}</p>
        <h3>{item.title}</h3>
        <p>{item.description}</p>

        <SkillLinks skills={item.skills} />

        <ExternalOrInternalLink href={detailHref} className={styles.textLink}>
          {actionLabel} <span aria-hidden="true">→</span>
        </ExternalOrInternalLink>
      </div>
    </article>
  );
}

export default function VideoHubClient({ items, assets, capabilities = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeFocus = searchParams.get("focus");
  const activeCapability = capabilities.find(
    (capability) => capability.slug === activeFocus,
  );
  const filteredItems = activeCapability
    ? items.filter((item) => item.capabilities?.includes(activeCapability.slug))
    : [];
  const mainStageVideos = useMemo(
    () =>
      items.filter(
        (item) => item.type === "video" && item.mainStage === true,
      ),
    [items],
  );

  const webExperiences = useMemo(
    () =>
      items.filter(
        (item) =>
          item.type === "webpage" &&
          !["External Video", "Social Video"].includes(item.category),
      ),
    [items],
  );

  const moreVideos = useMemo(
    () =>
      items.filter(
        (item) =>
          (item.type === "video" && item.mainStage !== true) ||
          (item.type === "webpage" &&
            ["External Video", "Social Video"].includes(item.category)),
      ),
    [items],
  );

  const [selectedTitle, setSelectedTitle] = useState(
    mainStageVideos[0]?.title || "",
  );
  const [playing, setPlaying] = useState(false);

  const selected =
    mainStageVideos.find((item) => item.title === selectedTitle) ||
    mainStageVideos[0];

  const navViewportRef = useRef(null);
  const navVelocityRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const tick = () => {
      if (navViewportRef.current && navVelocityRef.current !== 0) {
        navViewportRef.current.scrollTop += navVelocityRef.current;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function handleNavPointerMove(event) {
    if (!navViewportRef.current || event.pointerType === "touch") return;

    const rect = navViewportRef.current.getBoundingClientRect();
    const y = event.clientY - rect.top;
    const percentage = y / rect.height;
    const centered = percentage * 2 - 1;
    const distanceFromCenter = Math.abs(centered);

    if (distanceFromCenter < DEAD_ZONE) {
      navVelocityRef.current = 0;
      return;
    }

    const normalized = (distanceFromCenter - DEAD_ZONE) / (1 - DEAD_ZONE);
    navVelocityRef.current =
      Math.sign(centered) * MAX_SCROLL_SPEED * normalized * normalized;
  }

  function stopNavMovement() {
    navVelocityRef.current = 0;
  }

  function scrollNav(direction) {
    const viewport = navViewportRef.current;
    if (!viewport) return;

    const isHorizontal =
      viewport.scrollWidth > viewport.clientWidth &&
      viewport.scrollHeight <= viewport.clientHeight + 12;

    viewport.scrollBy(
      isHorizontal
        ? { left: direction * 220, behavior: "smooth" }
        : { top: direction * 180, behavior: "smooth" },
    );
  }

  function selectVideo(item) {
    setSelectedTitle(item.title);
    setPlaying(false);
  }

  function clearCapabilityFilter() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("focus");

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  if (activeCapability) {
    return (
      <section id="video-work-results" className={styles.filterResultsSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Filtered Video Work</p>
          <h2>{activeCapability.label}</h2>
          <p>{activeCapability.description}</p>
        </div>

        <div className={styles.filterToolbar}>
          <span>
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "example" : "examples"}
          </span>

          <button
            type="button"
            className={styles.clearFilterButton}
            onClick={clearCapabilityFilter}
          >
            Show all video work
          </button>
        </div>

        <div className={styles.filterGrid}>
          {filteredItems.map((item) => (
            <FilteredWorkCard
              key={item.title}
              item={item}
              fallbackPoster={assets.fallbackPoster}
            />
          ))}
        </div>
      </section>
    );
  }

  if (!selected) return null;

  return (
    <>
      <section id="video-work-results" className={styles.featuredSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Featured Video</p>
          <h2>Choose a piece. Watch it here.</h2>
          <p>
            The main stage is a curated selection of video work. Hover to
            explore the list, click to select a piece, and press play when you
            are ready to watch.
          </p>
        </div>

        <div className={styles.stageLayout}>
          <aside className={styles.stageNav} aria-label="Featured video selector">
            <button
              type="button"
              className={styles.navArrow}
              onClick={() => scrollNav(-1)}
              aria-label="Show earlier featured videos"
            >
              <span aria-hidden="true">↑</span>
              <small>More</small>
            </button>

            <div
              ref={navViewportRef}
              className={styles.navViewport}
              onPointerMove={handleNavPointerMove}
              onPointerLeave={stopNavMovement}
              onBlur={stopNavMovement}
            >
              <div className={styles.navList}>
                {mainStageVideos.map((item, index) => {
                  const active = item.title === selected.title;

                  return (
                    <button
                      type="button"
                      key={item.title}
                      className={`${styles.videoNavButton} ${
                        active ? styles.videoNavButtonActive : ""
                      }`}
                      onClick={() => selectVideo(item)}
                      aria-pressed={active}
                    >
                      <div className={styles.navThumbWrap}>
                        <PosterImage
                          item={item}
                          fallbackPoster={assets.fallbackPoster}
                          className={styles.navThumb}
                        />
                      </div>

                      <div className={styles.navButtonCopy}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <strong>{item.title}</strong>
                        <small>{item.category}</small>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              className={styles.navArrow}
              onClick={() => scrollNav(1)}
              aria-label="Show more featured videos"
            >
              <small>More</small>
              <span aria-hidden="true">↓</span>
            </button>
          </aside>

          <article className={styles.stage}>
            <div className={styles.playerShell}>
              {playing ? (
                <video
                  key={selected.url}
                  className={styles.stageVideo}
                  src={selected.url}
                  poster={selected.poster || undefined}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                />
              ) : (
                <button
                  type="button"
                  className={styles.posterButton}
                  onClick={() => setPlaying(true)}
                  aria-label={`Play ${selected.title}`}
                >
                  <PosterImage
                    item={selected}
                    fallbackPoster={assets.fallbackPoster}
                    className={styles.stagePoster}
                  />
                  <span className={styles.posterScrim} />
                  <span className={styles.playButton} aria-hidden="true">
                    ▶
                  </span>
                  <span className={styles.playLabel}>Play video</span>
                </button>
              )}
            </div>

            <div className={styles.stageDetails}>
              <div>
                <p className={styles.stageCategory}>{selected.category}</p>
                <h3>{selected.title}</h3>
                <p>{selected.description}</p>
              </div>

              <SkillLinks skills={selected.skills} />

              {selected.slug && (
                <Link
                  href={`/video/${selected.slug}`}
                  className={styles.textLink}
                >
                  View project details <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          </article>
        </div>
      </section>

      <section className={styles.productionSection}>
        <div className={styles.productionImage}>
          <img
            src={assets.production}
            alt="Camera rig representing Nicholas Egner video production work"
            loading="lazy"
          />
        </div>

        <div className={styles.productionCopy}>
          <p className={styles.eyebrow}>From Production Through Post</p>
          <h2>Video production, editing, and finishing in one workflow.</h2>
          <p>
            My video work includes business interviews, event coverage, brand
            storytelling, documentary-style editing, social content, motion
            graphics, and post-production for websites and digital campaigns.
            I work across the production process, but I am especially focused on
            what happens after the footage is captured: shaping the story,
            controlling pacing, clarifying the message, and preparing the final
            video for the places people will actually watch it.
          </p>
          <p>
            For businesses and organizations looking for video production and
            editing in Minneapolis, that means the finished piece is considered
            alongside the website, search strategy, social channels, and other
            content surrounding it.
          </p>

          <SkillLinks skills={["premiere", "aftereffects", "photoshop"]} />
        </div>
      </section>

      <section className={styles.beyondSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Video Beyond the Edit</p>
          <h2>The video is sometimes only part of the experience.</h2>
          <p>
            Some of my strongest video work combines production with web
            development, structured content, search optimization, and custom
            user experiences.
          </p>
        </div>

        <div className={styles.experienceGrid}>
          {webExperiences.map((item) => (
            <article key={item.title} className={styles.experienceCard}>
              <div className={styles.experienceMedia}>
                <PosterImage
                  item={item}
                  fallbackPoster={assets.fallbackPoster}
                  className={styles.experienceImage}
                />
              </div>

              <div className={styles.experienceCopy}>
                <p className={styles.stageCategory}>{item.category}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <SkillLinks skills={item.skills} />

                <ExternalOrInternalLink
                  href={item.url}
                  className={styles.primaryLink}
                >
                  {item.title.includes("Experience")
                    ? "Launch experience"
                    : item.title.includes("Hub")
                      ? "Explore video hub"
                      : "Visit page"}{" "}
                  <span aria-hidden="true">→</span>
                </ExternalOrInternalLink>

                {item.relatedPages?.length > 0 && (
                  <div className={styles.relatedLinks}>
                    {item.relatedPages.map((page) => (
                      <ExternalOrInternalLink
                        key={page.url}
                        href={page.url}
                        className={styles.relatedLink}
                      >
                        {page.label}
                      </ExternalOrInternalLink>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {moreVideos.length > 0 && (
        <section className={styles.moreSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>More Video Work</p>
            <h2>Additional edits and supporting pieces.</h2>
          </div>

          <div className={styles.moreGrid}>
            {moreVideos.map((item) => (
              <article key={item.title} className={styles.moreCard}>
                <PosterImage
                  item={item}
                  fallbackPoster={assets.fallbackPoster}
                  className={styles.moreImage}
                />
                <div className={styles.moreCopy}>
                  <p className={styles.stageCategory}>{item.category}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {item.slug ? (
                    <Link
                      href={`/video/${item.slug}`}
                      className={styles.textLink}
                    >
                      View project details <span aria-hidden="true">→</span>
                    </Link>
                  ) : (
                    <ExternalOrInternalLink
                      href={item.url}
                      className={styles.textLink}
                    >
                      Watch example <span aria-hidden="true">→</span>
                    </ExternalOrInternalLink>
                  )}

                  {item.relatedPages?.length > 0 && (
                    <div className={styles.relatedLinks}>
                      {item.relatedPages.map((page) => (
                        <ExternalOrInternalLink
                          key={page.url}
                          href={page.url}
                          className={styles.relatedLink}
                        >
                          {page.label}
                        </ExternalOrInternalLink>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className={styles.studioSection}>
        <div className={styles.studioCopy}>
          <p className={styles.eyebrow}>Video for the Web</p>
          <h2>Content designed for where it will live.</h2>
          <p>
            A finished edit is more useful when it has a clear destination. I
            think about video for websites, search results, social platforms,
            dedicated watch pages, and long-term content libraries. That can
            include video SEO, VideoObject structured data, supporting written
            content, internal links, thumbnails, transcripts, and page
            experiences designed around the viewer rather than a bare media
            file.
          </p>
          <p>
            That combination of video editing, web development, and SEO is a
            recurring part of my work: producing the content and building the
            digital system that helps people find and understand it.
          </p>
        </div>

        <div className={styles.studioImage}>
          <img
            src={assets.studio}
            alt="Green screen production setup representing video and compositing work"
            loading="lazy"
          />
        </div>
      </section>

      <section className={styles.ctaSection}>
        <p className={styles.eyebrow}>Have a Video Project?</p>
        <h2>Build the video and the experience around it.</h2>
        <p>
          If you need video production, editing, motion graphics, or a better
          way to publish video on the web, I can help connect those pieces.
        </p>
        <a href="mailto:nick@nicholasegner.com" className={styles.ctaButton}>
          Email Me
        </a>
      </section>
    </>
  );
}
