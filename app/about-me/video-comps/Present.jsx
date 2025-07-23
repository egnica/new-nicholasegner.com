import React from "react";
import styles from "../../page.module.css";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function present({ timeStamp }) {
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

  const titleVariant = {
    start: {
      opacity: 0,
      x: -150,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  return (
    <>
      <p>{currentTime}</p>

      <div className={styles.videoContent}>
        <div className={styles.rightBtnCont}>
          {currentTime > 1 && currentTime < 5 && <div>Button 2</div>}
          <div>BTN 1</div>
        </div>
        <video className={styles.videoContainer} ref={videoRef} controls>
          <source
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/video/website-videos/intro.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className={styles.leftBtnCont}>
          <div>BTN 1</div>
        </div>
        <p>click links</p>
        <div className={styles.textContentCont}></div>
      </div>
    </>
  );
}

export default intro;
