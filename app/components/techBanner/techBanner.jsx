"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import styles from "./TechMarquee.module.css";

const DEFAULT_SPEED = -28; // px per second. Negative means icons move left.
const MAX_SPEED = 180; // px per second at the far edges.
const DEAD_ZONE = 0.16; // center area where movement slows/pauses.

export default function TechMarquee({ techIcons = [], className = "" }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const groupRef = useRef(null);

  const positionRef = useRef(0);
  const currentSpeedRef = useRef(DEFAULT_SPEED);
  const targetSpeedRef = useRef(DEFAULT_SPEED);
  const copyWidthRef = useRef(0);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);

  const icons = useMemo(() => {
    if (!Array.isArray(techIcons)) return [];
    return techIcons.filter((icon) => icon?.name && icon?.svg && icon?.href);
  }, [techIcons]);

  useEffect(() => {
    if (!icons.length) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const measure = () => {
      if (!groupRef.current) return;

      copyWidthRef.current = groupRef.current.scrollWidth;

      if (copyWidthRef.current > 0) {
        while (positionRef.current <= -copyWidthRef.current) {
          positionRef.current += copyWidthRef.current;
        }

        while (positionRef.current > 0) {
          positionRef.current -= copyWidthRef.current;
        }
      }
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);

    if (groupRef.current) resizeObserver.observe(groupRef.current);
    if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);

    const tick = (time) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }

      const deltaSeconds = Math.min(0.05, (time - lastTimeRef.current) / 1000);

      lastTimeRef.current = time;

      const easing = 1 - Math.exp(-8 * deltaSeconds);

      currentSpeedRef.current +=
        (targetSpeedRef.current - currentSpeedRef.current) * easing;

      positionRef.current += currentSpeedRef.current * deltaSeconds;

      const copyWidth = copyWidthRef.current;

      if (copyWidth > 0) {
        while (positionRef.current <= -copyWidth) {
          positionRef.current += copyWidth;
        }

        while (positionRef.current > 0) {
          positionRef.current -= copyWidth;
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      resizeObserver.disconnect();

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [icons.length]);

  function handlePointerMove(event) {
    if (!wrapperRef.current) return;
    if (event.pointerType === "touch") return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = x / rect.width;

    // Converts mouse position into a value from -1 to 1.
    // -1 = far left, 0 = center, 1 = far right.
    const centered = percentage * 2 - 1;
    const distanceFromCenter = Math.abs(centered);

    if (distanceFromCenter < DEAD_ZONE) {
      targetSpeedRef.current = 0;
      return;
    }

    const normalized = (distanceFromCenter - DEAD_ZONE) / (1 - DEAD_ZONE);

    const easedIntensity = normalized * normalized;

    // Right side should make icons move left.
    // Left side should make icons move right.
    targetSpeedRef.current = -Math.sign(centered) * MAX_SPEED * easedIntensity;
  }

  function handlePointerLeave() {
    targetSpeedRef.current = DEFAULT_SPEED;
  }

  function handleFocus() {
    targetSpeedRef.current = 0;
  }

  function handleBlur() {
    targetSpeedRef.current = DEFAULT_SPEED;
  }

  if (!icons.length) return null;

  return (
    <div
      ref={wrapperRef}
      className={`${styles.marquee} ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div ref={trackRef} className={styles.marqueeTrack}>
        {[0, 1, 2].map((copyIndex) => (
          <div
            key={copyIndex}
            ref={copyIndex === 0 ? groupRef : null}
            className={styles.marqueeGroup}
            aria-hidden={copyIndex > 0}
          >
            {icons.map((icon, iconIndex) => (
              <Link
                key={`${copyIndex}-${icon.name}-${iconIndex}`}
                href={icon.href}
                className={styles.techLink}
                tabIndex={copyIndex > 0 ? -1 : 0}
                aria-label={`View ${icon.name} skill page`}
              >
                <div
                  className={styles.techIcon}
                  dangerouslySetInnerHTML={{ __html: icon.svg }}
                />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
