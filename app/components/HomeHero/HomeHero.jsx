"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import lottie from "lottie-web";
import styles from "./HomeHero.module.css";

export default function HomeHero() {
  const animationRef = useRef(null);

  useEffect(() => {
    if (!animationRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const animation = lottie.loadAnimation({
      container: animationRef.current,
      renderer: "svg",
      loop: false,
      autoplay: !prefersReducedMotion,
      path: "/nicholas-egner-animation.json",
      name: "homeHeroAnimation",
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        progressiveLoad: true,
        hideOnTransparent: true,
      },
    });

    animation.setSpeed(1.2);

    if (prefersReducedMotion) {
      animation.addEventListener("DOMLoaded", () => {
        animation.goToAndStop(animation.totalFrames - 1, true);
      });
    }

    return () => animation.destroy();
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <motion.div
          className={styles.copy}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <p className={styles.eyebrow}>Nicholas Egner · Digital Systems</p>

          <h1 id="home-hero-title" className={styles.title}>
            Digital systems for businesses that need more than a website.
          </h1>

          <p className={styles.intro}>
            I bring custom web development, video, content, SEO structure, and
            digital strategy together so businesses are easier to find,
            understand, and trust.
          </p>

          <div className={styles.actions}>
            <Link href="/projects" className={styles.primaryAction}>
              View Projects
            </Link>
            <Link href="/about" className={styles.secondaryAction}>
              About Nicholas
            </Link>
          </div>

          <div className={styles.capabilities} aria-label="Core capabilities">
            <span>Web Development</span>
            <span>Video</span>
            <span>SEO</span>
            <span>Content Systems</span>
          </div>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, scale: 0.96, x: 18 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: "easeOut" }}
          aria-hidden="true"
        >
          <div ref={animationRef} className={styles.lottie} />

          <div className={styles.logoHalo}>
            <Image
              className={styles.logo}
              src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/ne-white.svg"
              width={230}
              height={230}
              alt=""
              priority
            />
          </div>

          <div className={`${styles.orbitDot} ${styles.dotOne}`} />
          <div className={`${styles.orbitDot} ${styles.dotTwo}`} />
          <div className={`${styles.orbitDot} ${styles.dotThree}`} />
          <div className={`${styles.orbitDot} ${styles.dotFour}`} />
        </motion.div>
      </div>
    </section>
  );
}
