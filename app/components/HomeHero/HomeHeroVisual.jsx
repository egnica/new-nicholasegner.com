"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./HomeHero.module.css";

export default function HomeHeroVisual() {
  const animationRef = useRef(null);

  useEffect(() => {
    let animation;
    let cancelled = false;

    async function loadAnimation() {
      const lottieModule = await import("lottie-web");
      const lottie = lottieModule.default || lottieModule;

      if (cancelled || !animationRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      animation = lottie.loadAnimation({
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
          animation?.goToAndStop(Math.max(animation.totalFrames - 1, 0), true);
        });
      }
    }

    loadAnimation();

    return () => {
      cancelled = true;
      animation?.destroy();
    };
  }, []);

  return (
    <div className={styles.visual} aria-hidden="true">
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
    </div>
  );
}
