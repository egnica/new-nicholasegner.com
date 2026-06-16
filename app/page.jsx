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
import AboutPopup from "./components/AboutPopup";
import TechMarquee from "./components/techBanner/techBanner";
import FeaturedProjectCards from "./components/FeaturedProjectCards/FeaturedProjectCards";

// CANT BE USED WITH USE CLIENT
// export const metadata = {
//   alternates: {
//     canonical: "/",
//   },
// };

export default function Home() {
  const [index, setIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [largeString, setLargeString] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const animRef = useRef(null);
  const [heroFrames, setHeroFrames] = useState(false);

  useEffect(() => {
    const text = Reviews[reviewIndex].text;
    const words = text.split(" ");

    setShowFull(false);

    if (words.length < 40) {
      setLargeString(false);
      setDisplayText(text);
    } else {
      setLargeString(true);
      setDisplayText(words.slice(0, 40).join(" ") + "...");
    }
  }, [reviewIndex]);

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
    "Seo Specialist",
    "Digital Experiences",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % skillsArray.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % Reviews.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const name = "Nicholas Egner";

  return (
    <>
      <div className={styles.mainBackColor}></div>
      <ParticlesBackground />
      <main className={styles.page}>
        <nav className={styles.topPage}>
          <motion.a
            href="/about"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Image
              src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/ne-white.svg"
              width={60}
              height={60}
              alt="Nicholas Egner Logo"
            />
          </motion.a>
          <div className={styles.headerNavLinks}>
            <Link href={"/blog"}>Blog</Link>
            <Link href={"/about"}>About Nick</Link>
            <Link href={"/projects"}>Projects</Link>
          </div>
        </nav>

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

        <section className={styles.belowHero}>
          <img src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/below-hero.webp" />
          <div className={styles.belowHeroText}>
            <h1>
              I’m&nbsp;
              <Link href="/about" className={styles.name}>
                Nicholas Egner
              </Link>
            </h1>
            <br />
            <p>
              I build websites and content systems that help businesses get
              found, gain digital credibility, and turn attention into
              opportunity.
            </p>
            <br />
            <p>
              I work with businesses that need more than a basic website. I help
              shape the full digital experience:
              <br />
              <br />
              <strong style={{ fontSize: "1.4rem" }} className={styles.name}>
                the site, the message, the content, the SEO structure, the
                video, and the trust signals{" "}
              </strong>
              <br />
              <br />
              that make people feel confident reaching out.
            </p>
            <br />
            <p>
              Whether you need a new website, stronger service pages, video
              content, social-ready assets, or a clearer online presence, I
              bring the technical and creative pieces together into one focused
              system.
            </p>
          </div>
        </section>
        <FeaturedProjectCards />

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={styles.reviewContainer}
        >
          <div className={styles.googleImage}>
            <Image
              width={300}
              height={163}
              alt="google review image"
              src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/google-review.webp"
            />
            <div className={styles.contReviewBtns}>
              <a
                href="https://g.page/r/CSbhU6mFyb4qEBM/review"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.mainBtn}>Leave Review</div>
              </a>
              <a
                href="https://www.google.com/maps/place/Nicholas+Egner+-+Web+Development/data=!4m2!3m1!1s0x0:0x2abec985a953e126?sa=X&ved=1t:2428&ictx=111"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.mainBtn}>Read Reviews</div>
              </a>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              layout
              className={!showFull ? styles.reviewText : styles.reviewTextFull}
              key={Reviews[reviewIndex].name}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.nameImage}>
                <img src={Reviews[reviewIndex].image} />
                <h2>{Reviews[reviewIndex].name}</h2>
              </div>
              <p className={styles.review}>
                {showFull ? Reviews[reviewIndex].text : displayText}
              </p>

              {largeString && (
                <button
                  className={styles.revealFull}
                  onClick={() => setShowFull(!showFull)}
                >
                  {showFull ? "Show Less" : "Read More"}
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.section>

        <AboutPopup />
      </main>
    </>
  );
}
