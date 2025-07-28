"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import TextCont from "./components/textContBtn";
import { motion, AnimatePresence, color } from "framer-motion";

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

  const name = "nicholas egner";
  const front = "<<<<<<<<<<<<<<<";
  const back = ">>>>>>>>>>>>>>>>";

  return (
    <div className={styles.page}>
      <div className={styles.topPage}>
        <a href={"./about"}>
          <Image
            className={styles.logo}
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/NE-blue.svg"
            width={20}
            height={20}
            alt="Nicholas Egner Logo"
          />
        </a>
        <h1>Nicholas Egner - Minneapolis Web Developer</h1>
      </div>
      <div className={styles.nameTop}>
        <p>
          {front} || 1001000 100001 1100001 101011 || {back}
        </p>
      </div>
      <div className={styles.nameCont}>
        <h1>{name}</h1>

        <Star className={styles.star} />

        <h1>web developer</h1>
      </div>
      <div className={styles.nameBottom}>
        {front} || 1001000 100001 1100001 101011 || {back}
      </div>

      <div className={styles.mainBtnCont}>
        <TextCont
          title={"MY STORY"}
          btnText={"Watch the Story"}
          path={"./about-me"}
        >
          <p>
            This interactive video series walks you through my background, what
            drives me, and where I’m heading next. Click below to choose your
            path and watch the story unfold.
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

      <div className={styles.coverBottom}></div>
    </div>
  );
}
