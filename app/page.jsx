"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import TextCont from "./components/textContBtn";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import stackData from "../stack.json";
import Reviews from "../reviews.json";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);

  const techIcons = stackData.stack.flatMap((category) =>
    category.technologies.map((tech) => ({
      name: tech.name,
      svg: tech.image,
      href: `/skills/${tech.slug}`,
    }))
  );

  const Star = ({ className }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 49 49"
      xmlSpace="preserve"
    >
      <path
        fill="#ffffff"
        d="m24.5 0 3.3 21.2L49 24.5l-21.2 3.3L24.5 49l-3.3-21.2L0 24.5l21.2-3.3L24.5 0z"
      />
    </svg>
  );

  const skillsArray = [
    "web developer",
    "app developer",
    "content creator",
    "video producer",
    "video editor",
    "seo specialist",
    "digital experiences",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % skillsArray.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % Reviews.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const name = "nicholas egner";

  return (
    <>
      <div className={styles.mainBackColor}></div>
      <video className={styles.starOverlay} autoPlay loop muted playsInline>
        <source
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/video/star-background.webm"
          type="video/webm"
        />
      </video>
      <div className={styles.page}>
        <div className={styles.topPage}>
          <motion.a
            href={"./about"}
            key={"logo"}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Image
              className={styles.logo}
              src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/ne-white.svg"
              width={20}
              height={20}
              alt="Nicholas Egner Logo"
            />
          </motion.a>
          <motion.a
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className={styles.aboutNicholas}
            href="/about"
          >
            - Learn more about Nicholas Egner
          </motion.a>
        </div>
        <h1 className={styles.visuallyHidden}>
          Nicholas Egner – Web Developer, SEO Specialist, Content Creator,
          Minneapolis
        </h1>
        <motion.div
          key={"nameCont"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={styles.nameCont}
        >
          <motion.h1
            key={name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
          >
            {name}
          </motion.h1>

          <Star className={styles.star} />

          <AnimatePresence mode="wait">
            <motion.h1
              key={skillsArray[index]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {skillsArray[index]}
            </motion.h1>
          </AnimatePresence>
        </motion.div>

        <div className={styles.mainBtnCont}>
          <TextCont
            title={"MY STORY"}
            btnText={"Watch the Story"}
            path={"./video-experience"}
          >
            <p>
              This interactive video series walks you through my background,
              what drives me, and where I’m heading next. Click below and choose
              your path and watch the story unfold. It's part about me, part
              proof of concept. Click around!
            </p>
          </TextCont>

          <TextCont
            title={"CAREER DASHBOARD"}
            btnText={"Explore the Dashboard"}
            path={"./skills"}
          >
            <p>
              This interactive dashboard lets you explore my skills, tools, and
              real-world projects. Along with the creative work and work history
              that shaped them. Split into two parts - Tech Stack and Projects
            </p>
          </TextCont>
        </div>
        <Link href={"./about"}>
          <motion.section
            className={styles.homeSeoContent}
            key={"section-text"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className={styles.visuallyHidden}>About Nicholas Egner</h2>
            <p>
              I’m Nicholas Egner, a Minneapolis-based web developer and content
              creator specializing in interactive websites, SEO strategy, and
              multimedia production. I build fast, responsive, and visually
              compelling digital experiences that help businesses and
              individuals stand out online.
            </p>
          </motion.section>
        </Link>

        <div className={styles.reviewContainer}>
          <motion.div
            className={styles.googleImage}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Image
              className={styles.googleImage}
              width={300}
              height={163}
              alt="google review image"
              src={
                "https://nciholasegner.s3.us-east-2.amazonaws.com/images/google-review.webp"
              }
            />
          </motion.div>
          <AnimatePresence mode="wait">
            <div className={styles.reviewTextWrapper}>
              <motion.div
                className={styles.reviewText}
                key={Reviews[reviewIndex].name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.nameImage}>
                  <img src={Reviews[reviewIndex].image} />
                  <h2> {Reviews[reviewIndex].name}</h2>
                </div>
                <p className={styles.review}>{Reviews[reviewIndex].text}</p>
              </motion.div>
            </div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.bottomBuffer}
        >
          <motion.div className={styles.bannerWrapper}>
            <div className={styles.bannerScroll}>
              {techIcons.concat(techIcons).map((icon, i) => (
                <Link key={`${icon.name}-${i}`} href={icon.href}>
                  <div
                    className={styles.techIcon}
                    dangerouslySetInnerHTML={{ __html: icon.svg }}
                  />
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
