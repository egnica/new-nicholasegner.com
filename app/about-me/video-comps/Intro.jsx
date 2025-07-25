import React from "react";
import styles from "../../page.module.css";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, color } from "framer-motion";
import AnimateTitle from "@/app/components/animateTitle";
import Link from "next/link";

function Intro({ timeStamp, fromClick }) {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      timeStamp(video.currentTime);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return (
    <>
      <div className={styles.videoContent}>
        <div className={styles.rightBtnCont}></div>
        <video className={styles.videoContainer} ref={videoRef} controls>
          <source
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/video/website-videos/intro.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className={styles.leftBtnCont}></div>
        <p></p>
        <div className={styles.textContentCont}>
          {/*
            COPY FOR NEW ADDEND TILE ELEMENT
          -
           <AnimateTitle start={10} end={12} time={currentTime} tag={"h1"}>
            Seen it before...
          </AnimateTitle> 
          -
          */}

          <AnimateTitle
            style={{ color: "blue" }}
            start={1}
            end={4.8}
            time={currentTime}
            tag={"h1"}
          >
            <Link
              href={"../../about"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Nicholas Egner
            </Link>
          </AnimateTitle>

          <AnimateTitle start={1.2} end={4.6} time={currentTime} tag={"p"}>
            Minneapolis
          </AnimateTitle>
          <AnimateTitle start={1.4} end={4.4} time={currentTime} tag={"p"}>
            Web Developer
          </AnimateTitle>
          <AnimateTitle start={1.6} end={4} time={currentTime} tag={"p"}>
            Digital Content Creator
          </AnimateTitle>
          <AnimateTitle start={7.1} end={9.6} time={currentTime} tag={"h2"}>
            Something a little different...
          </AnimateTitle>
          <AnimateTitle start={11.2} end={12.5} time={currentTime} tag={"h2"}>
            Seen it before...
          </AnimateTitle>
          <AnimateTitle start={13} end={15} time={currentTime} tag={"p"}>
            (Look above the video for Pathway buttons)
          </AnimateTitle>
          <AnimateTitle start={15.5} end={33} time={currentTime} tag={"h1"}>
            Three Paths To Explore{" "}
            <span style={{ fontSize: "small" }}>(click options below)</span>
          </AnimateTitle>

          <AnimateTitle
            start={17}
            end={19.2}
            time={currentTime}
            tag={"h2"}
            style={{ cursor: "pointer", color: "blue" }}
          >
            <span onClick={() => fromClick("background")}>
              A: My Background
            </span>
          </AnimateTitle>

          <AnimateTitle
            start={19.9}
            end={21.1}
            time={currentTime}
            tag={"h2"}
            style={{ cursor: "pointer", color: "blue" }}
          >
            <span onClick={() => fromClick("present")}>
              2: Why I am doing this
            </span>
          </AnimateTitle>

          <AnimateTitle
            start={23.5}
            end={33}
            time={currentTime}
            tag={"h2"}
            style={{ cursor: "pointer", color: "blue" }}
          >
            <span onClick={() => fromClick("background")}>
              A: My Background
            </span>
          </AnimateTitle>

          <AnimateTitle
            start={23.5}
            end={33}
            time={currentTime}
            tag={"h2"}
            style={{ cursor: "pointer", color: "blue" }}
          >
            <span onClick={() => fromClick("present")}>
              2: Why I am doing this
            </span>
          </AnimateTitle>

          <AnimateTitle
            start={22}
            end={33}
            time={currentTime}
            tag={"h2"}
            style={{ cursor: "pointer", color: "blue" }}
          >
            <span onClick={() => fromClick("future")}>D: Where I am going</span>
          </AnimateTitle>
        </div>
      </div>
    </>
  );
}

export default Intro;
