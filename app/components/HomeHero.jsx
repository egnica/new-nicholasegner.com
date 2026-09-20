"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import lottie from "lottie-web";
import styles from "../page.module.css";

const SKILLS = [
  "Web Developer",
  "App Developer",
  "Content Creator",
  "Video Producer",
  "Video Editor",
  "SEO Specialist",
  "Digital Experiences",
];

export default function HomeHero() {
  const animationContainer = useRef(null);
  const [skillIndex, setSkillIndex] = useState(0);

  useEffect(() => {
    if (!animationContainer.current) return undefined;

    const animation = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: "/nicholas-egner-animation.json",
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        progressiveLoad: true,
        hideOnTransparent: true,
      },
    });

    animation.setSpeed(1.2);
    return () => animation.destroy();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSkillIndex((current) => (current + 1) % SKILLS.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <motion.section className={styles.nameCont}>
      <div
        ref={animationContainer}
        className={styles.lottieBackground}
        aria-hidden="true"
      />

      <div className={styles.heroTextContain}>
        <h1 className={styles.nameTitle}>Nicholas Egner</h1>

        <motion.div
          style={{ margin: "auto" }}
          initial={{ opacity: 0, scale: 3, y: -100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.1, cursor: "pointer" }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/about" aria-label="About Nicholas Egner">
            <Image
              className={styles.logoMain}
              src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/ne-white.svg"
              width={160}
              height={160}
              alt="Nicholas Egner Logo"
              priority
            />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={styles.btnTitleContain}
        >
          <Link href="/video-experience">
            <div className={styles.mainBtn}>ABOUT ME</div>
          </Link>
          <Link href="/projects">
            <div className={styles.mainBtn}>PROJECTS</div>
          </Link>
        </motion.div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.h1
            key={SKILLS[skillIndex]}
            className={styles.skillTitle}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.4 }}
          >
            {SKILLS[skillIndex]}
          </motion.h1>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
