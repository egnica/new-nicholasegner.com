import React from "react";
import styles from "../../page.module.css";
import { useState, useEffect, useRef } from "react";

function intro({ timeStamp }) {
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
        <div className={styles.textContentCont}>

        </div>
      </div>
    </>
  );
}

export default intro;
