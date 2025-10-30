"use client";
import React, { useState } from "react";
import Intro from "./video-comps/Intro";
import Past from "./video-comps/Past";
import Present from "./video-comps/Present";
import Future from "./video-comps/Future";
import Wrap from "./video-comps/Wrap";
import styles from "../page.module.css";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ParticlesBackground from "../components/particlesBackground";

function AboutMe() {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentVideo, setCurrentVideo] = useState("intro");

  const timeFunction = (time) => setCurrentTime(time);
  const thisClick = (item) => setCurrentVideo(() => item);

  const renderVideo = () => {
    switch (currentVideo) {
      case "background":
        return <Past fromClick={thisClick} timeStamp={timeFunction} />;
      case "present":
        return <Present fromClick={thisClick} timeStamp={timeFunction} />;
      case "future":
        return <Future fromClick={thisClick} timeStamp={timeFunction} />;
      case "wrap":
        return <Wrap fromClick={thisClick} timeStamp={timeFunction} />;
      case "intro":
      default:
        return <Intro fromClick={thisClick} timeStamp={timeFunction} />;
    }
  };

  const navButtons = {
    start: {
      opacity: 0,
      
    },
    visible: {
      opacity: 1,
      backgroundColor: "#1f1f8fff",
      color: "white",
      border: "1px solid black",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.01,
      backgroundImage: "linear-gradient(to right, #a55ef0 0%, #bed4fc 100%)",
    },
    click: {
      scale: 0.97,
    },
    selected: {
      opacity: 1,
      backgroundImage: "linear-gradient(to right, #a55ef0 0%, #01143a 100%)",
      color: "white",
      border: "1px solid white",
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <>
      <div className={styles.mainBackColor}></div>
      <ParticlesBackground />

      {/* <p style={{ color: "white" }}>{currentTime}</p> */}
      <Link href={"../"} className={styles.skillsBtn} style={{ margin: "2%" }}>
        Home
      </Link>
      <div className={styles.centerGroup}>
        <div className={styles.mainBtnContVid}>
          {["intro", "background", "present", "future", "wrap"].map((key) => (
            <motion.div
              key={key}
              className={styles.mainVideBtns}
              variants={navButtons}
              initial="start"
              animate={currentVideo === key ? "selected" : "visible"}
              exit="exit"
              whileHover="hover"
              whileTap="click"
              onClick={() => setCurrentVideo(key)}
            >
              {key.toUpperCase()}
            </motion.div>
          ))}
        </div>

        <div className={styles.videoShell}>{renderVideo()}</div>
      </div>
    </>
  );
}

export default AboutMe;
