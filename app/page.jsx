"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import stackData from "../stack.json";
import Reviews from "../reviews.json";
import lottie from "lottie-web";
import ParticlesBackground from "./components/particlesBackground";
import TechMarquee from "./components/techBanner/techBanner";
import FeaturedProjectCards from "./components/FeaturedProjectCards/FeaturedProjectCards";
import GoogleReviewWall from "./components/GoogleReview/GoogleReviewWall";
import SiteFooter from "./components/SiteFooter/SiteFooter";
import SiteHeader from "./components/SiteHeader/SiteHeader";
import LatestBlogPost from "./components/LatestBlogComponent/LatestBlogPost";
import LazyMount from "./components/LazyMount";
import JsonLd from "./components/JsonLd/JsonLd";
import HomeIdentitySections from "./components/HomeIdentitySections/HomeIdentitySections";

const homePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.nicholasegner.com/#webpage",
      url: "https://www.nicholasegner.com",
      name: "Nicholas Egner | Minneapolis Web Developer & Digital Strategist",
      description:
        "Nicholas Egner is a Minneapolis web developer and digital strategist who combines custom web development, SEO, video, content, and automation to build connected digital systems for businesses.",
      isPartOf: {
        "@id": "https://www.nicholasegner.com/#website",
      },
      about: {
        "@id": "https://www.nicholasegner.com/#person",
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        "@id": "https://www.nicholasegner.com/#primaryimage",
        url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/digital-portfolio.jpg",
      },
      inLanguage: "en-US",
    },
  ],
};

export default function Home() {
  const [index, setIndex] = useState(0);
  const animRef = useRef(null);
  const [heroFrames, setHeroFrames] = useState(false);

  useEffect(() => {
    if (!animRef.current) return;
    const anim = lottie.loadAnimation({
      container: animRef.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: "/nicholas-egner-animation.json",
      name: "heroAnimation",
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        // preserveAspectRatio: "xMidYMid meet",
        progressiveLoad: true,
        hideOnTransparent: true,
      },
    });
    lottie.resize("heroAnimation");
    // console.log(anim);
    anim.setSpeed(1.2); // Change speed
    anim.addEventListener("DOMLoaded", () => {
      anim.addEventListener("complete", () => {
        setHeroFrames(true);
      });
    });

    return () => {
      anim.removeEventListener("complete"); // cleanup
      anim.destroy();
    };
  }, []);

  const techIcons = stackData.stack.flatMap((category) =>
    category.technologies.map((tech) => ({
      name: tech.name,
      svg: tech.image,
      href: `/skills/${tech.slug}`,
    })),
  );

  const skillsArray = [
    "Web Developer",
    "App Developer",
    "Content Creator",
    "Video Producer",
    "Video Editor",
    "SEO Specialist",
    "Digital Experiences",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % skillsArray.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const name = "Nicholas Egner";

  return (
    <>
      <JsonLd data={homePageSchema} />
      <div className={styles.mainBackColor}></div>
      <ParticlesBackground />
      <main className={styles.page}>
        <SiteHeader />

        <motion.section className={styles.nameCont}>
          <div ref={animRef} className={styles.lottieBackground} />

          <div className={styles.heroTextContain}>
            {heroFrames && (
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 10 }}
                transition={{ duration: 0.6 }}
                className={styles.nameTitle}
              >
                {name}
              </motion.h1>
            )}

            {heroFrames && (
              <motion.div
                style={{ margin: "auto" }}
                initial={{ opacity: 0, scale: 3, y: -100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ scale: 1.1, cursor: "pointer" }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.6 }}
              >
                <Link href={"./about"}>
                  <Image
                    className={styles.logoMain}
                    src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/ne-white.svg"
                    width={160}
                    height={160}
                    alt="Nicholas Egner Logo"
                  />
                </Link>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={styles.btnTitleContain}
            >
              <Link href={"./video-experience"}>
                <div className={styles.mainBtn}>ABOUT ME</div>
              </Link>
              <Link href={"./projects"}>
                <div className={styles.mainBtn}>PROJECTS</div>
              </Link>
            </motion.div>
            {heroFrames && (
              <AnimatePresence mode="wait">
                <motion.h1
                  key={skillsArray[index]}
                  className={styles.skillTitle}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {skillsArray[index]}
                </motion.h1>
              </AnimatePresence>
            )}
          </div>
        </motion.section>

        <section className={styles.bottomBuffer}>
          <TechMarquee techIcons={techIcons} />
        </section>

        <section
          className={styles.belowHero}
          aria-labelledby="home-positioning-title"
        >
          <div className={styles.belowHeroInner}>
            <div className={styles.belowHeroMedia}>
              <img
                src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/below-hero.webp"
                alt="Web development, SEO, design, and video editing workspace"
                width="576"
                height="675"
              />
              <span
                className={styles.belowHeroGradient}
                aria-hidden="true"
              />
            </div>

            <div className={styles.belowHeroText}>
              <p className={styles.belowHeroEyebrow}>
                Developer <span aria-hidden="true">•</span> Strategist{" "}
                <span aria-hidden="true">•</span> Producer
              </p>
              <h2 id="home-positioning-title">
                One person connecting the technical and creative sides of your
                digital presence.
              </h2>
              <p>
                I’m Nicholas Egner, a Minneapolis web developer and digital
                strategist. I combine custom web development, search strategy,
                video, content, and automation to help businesses replace
                disconnected digital pieces with a system that works together.
              </p>
              <Link href="/about" className={styles.belowHeroLink}>
                See how I work <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <HomeIdentitySections />

        <LazyMount>
          <FeaturedProjectCards minHeight={700} />
        </LazyMount>

        <GoogleReviewWall reviews={Reviews} />

        <LatestBlogPost />
        <SiteFooter />
      </main>
    </>
  );
}
