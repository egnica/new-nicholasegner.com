"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import TextCont from "./components/textContBtn";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
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

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % skillsArray.length);
    }, 3000);
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
        </div>

        <motion.div
          key={"nameCont"}
          initial={{ opacity: 0, }}
          animate={{ opacity: 1, }}
          exit={{ opacity: 0, }}
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
            path={"./about-me"}
          >
            <p>
              This interactive video series walks you through my background,
              what drives me, and where I’m heading next. Click below to choose
              your path and watch the story unfold.
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
              that shaped them. It’s part portfolio, part proof of concept.
            </p>
          </TextCont>
        </div>
      </div>
    </>
  );
}
