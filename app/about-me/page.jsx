"use client";
import React from "react";
import Intro from "./video-comps/Intro";
import Past from "./video-comps/Past";
import Present from "./video-comps/Present";
import Future from "./video-comps/Future";
import Wrap from "./video-comps/Wrap";
import { useState, useEffect } from "react";
import styles from "../page.module.css";
import { motion, AnimatePresence } from "framer-motion";

function AboutMe() {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentVideo, setCurrentVideo] = useState("intro");

  const timeFunction = (time) => setCurrentTime(time);

  const titleForSection = () => {
    return currentVideo == "background"
      ? "My Backstory"
      : currentVideo == "present"
      ? "What Up Now?"
      : currentVideo == "future"
      ? "Where Am I going?"
      : currentVideo == "wrap"
      ? "Thanks For Stopping By!"
      : "Welcome to my About me Page!";
  };

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
        return <Intro fromClick={thisClick} timeStamp={timeFunction} />;
      default:
        return null;
    }
  };

  const thisClick = (item) => {
    setCurrentVideo(() => item);
  };

  const navButtons = {
    start: {
      opacity: 0,
      backgroundImage: "linear-gradient(to right, #FFE3A9 0%, #0B1D51 100%)",
    },
    visible: {
      opacity: 1,
      backgroundImage:
        "linear-gradient(to right, #7827cfff 0%, #5492fdff 100%)",
      backgroundSize: "cover",
      backgroundPosition: "50% 50%",
      color: "rgba(222, 222, 248, 1)",
      boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.5, ease: "easeIn" },
      border: "black .5px solid",
    },
    hover: {
      scale: 1.01,
      backgroundImage:
        "linear-gradient(to right, #a55ef0ff 0%, #bed4fcff 100%)",
    },
    click: {
      opacity: 1,
      height: "auto",
      backgroundImage: "linear-gradient(to right, #FFE3A9 0%, #0B1D51 100%)",
      backgroundSize: "cover",
      backgroundPosition: "40% 60%",
      color: "rgba(248, 248, 255, 1)",
    },
    selected: {
      opacity: 1,
      height: "auto",
      backgroundImage:
        "linear-gradient(to right, #a55ef0ff 0%, #01143aff 100%)",
      backgroundSize: "cover",
      backgroundPosition: "20% 80%",
      color: "rgba(222, 222, 248, 1)",
      border: "rgba(248, 248, 255, 1) .5px solid",
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  return (
    <>
      <div className={styles.backColor}></div>
      <div className={styles.videoPage}>
        <p style={{ color: "white" }}>{currentTime}</p>
        {/* <h1>{titleForSection()}</h1> */}
        <div className={styles.mainBtnContVid}>
          <motion.div
            className={styles.mainVideBtns}
            key={"intro"}
            variants={navButtons}
            initial="start"
            animate={currentVideo == "intro" ? "selected" : "visible"}
            exit="exit"
            whileHover="hover"
            whileTap="click"
            onClick={() => setCurrentVideo("intro")}
          >
            INTRO
          </motion.div>
          <motion.div
            className={styles.mainVideBtns}
            key={"background"}
            variants={navButtons}
            initial="start"
            animate={currentVideo == "background" ? "selected" : "visible"}
            exit="exit"
            whileHover="hover"
            whileTap="click"
            onClick={() => {
              setCurrentVideo("background");
            }}
          >
            BACKGROUND
          </motion.div>
          <motion.div
            className={styles.mainVideBtns}
            key={"present"}
            variants={navButtons}
            initial="start"
            animate={currentVideo == "present" ? "selected" : "visible"}
            exit="exit"
            whileHover="hover"
            whileTap="click"
            onClick={() => {
              setCurrentVideo("present");
            }}
          >
            PRESENT
          </motion.div>
          <motion.div
            className={styles.mainVideBtns}
            key={"future"}
            variants={navButtons}
            initial="start"
            animate={currentVideo == "future" ? "selected" : "visible"}
            exit="exit"
            whileHover="hover"
            whileTap="click"
            onClick={() => {
              setCurrentVideo("future");
            }}
          >
            FUTURE
          </motion.div>
          <motion.div
            className={styles.mainVideBtns}
            key={"wrap"}
            variants={navButtons}
            initial="start"
            animate={currentVideo == "wrap" ? "selected" : "visible"}
            exit="exit"
            whileHover="hover"
            whileTap="click"
            onClick={() => {
              setCurrentVideo("wrap");
            }}
          >
            WRAP-UP
          </motion.div>
        </div>
        <div>{renderVideo()}</div>
      </div>
    </>
  );
}

export default AboutMe;
