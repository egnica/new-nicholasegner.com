import React from "react";
import styles from "../../page.module.css";
import { useState, useEffect, useRef } from "react";
import AnimateTitle from "@/app/components/animateTitle";
import AnimateBtn from "@/app/components/animateBtn";
import Link from "next/link";

function Present({ timeStamp, fromClick }) {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [overLayOn, setOverLayOn] = useState("");
  const [videoSelect, setVideoSelect] = useState(null);

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

  const videoArray = [
    "https://nciholasegner.s3.us-east-2.amazonaws.com/video/website-videos/nick-child.mp4",
    "https://nciholasegner.s3.us-east-2.amazonaws.com/video/website-videos/worstThing.mp4",
    "https://nciholasegner.s3.us-east-2.amazonaws.com/video/website-videos/Hello-Squirrel.mp4",
    "https://nciholasegner.s3.us-east-2.amazonaws.com/video/website-videos/demo.mp4",
    "https://nciholasegner.s3.us-east-2.amazonaws.com/video/website-videos/Landscape.mp4",
    "https://nciholasegner.s3.us-east-2.amazonaws.com/video/website-videos/bbc.mp4",
  ];

  const overLay = (num) => {
    setOverLayOn("on");
    setVideoSelect(num);
  };

  const clickStop = () => {
    const video = videoRef.current;
    video.pause();
  };

  useEffect(() => {
    const video = videoRef.current;
    overLayOn == "on"
      ? video.pause()
      : overLayOn == "off"
      ? video.play()
      : null;
  }, [overLayOn]);

  return (
    <>
      <div className={styles.videoContent}>
        <div className={styles.rightBtnCont}>
          <Link href="../../skills" target="_blank" rel="noopener noreferrer">
            <AnimateBtn
              onClick={() => clickStop()}
              start={72.3}
              end={300}
              time={currentTime}
            >
              Career Section
            </AnimateBtn>
          </Link>
          <AnimateBtn
            start={74.5}
            end={300}
            time={currentTime}
            onClick={() => fromClick("future")}
          >
            Where I'm Going
          </AnimateBtn>

          <AnimateBtn
            start={77.6}
            end={300}
            time={currentTime}
            onClick={() => fromClick("wrap")}
          >
            Wrap It Up
          </AnimateBtn>
        </div>
        <video className={styles.videoContainer} ref={videoRef} controls>
          <source
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/video/website-videos/present.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className={styles.leftBtnCont}>
          <a
            href="https://www.tomshardware.com/tech-industry/tech-industry-layoffs-hit-100-000-for-2025-intel-leading-the-pack-with-over-12-000-personnel-cut-so-far"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={6.4}
              end={9.7}
              time={currentTime}
            >
              Tech Industry Layoffs
            </AnimateBtn>
          </a>

          <a
            href="https://www.npr.org/2023/01/16/1149232763/this-is-fine-meme-anniversary-gunshow-web-comic"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={9.8}
              end={23.7}
              time={currentTime}
            >
              'This is fine'
            </AnimateBtn>
          </a>
        </div>
        <p></p>
        <div className={styles.textContentCont}>
          <AnimateTitle
            style={{ color: "blue" }}
            start={6.4}
            end={23.7}
            time={currentTime}
            tag={"h2"}
            onClick={() => clickStop()}
          >
            <a
              href="https://www.youtube.com/watch?v=QT9BeGNnCqw"
              target="_blank"
              rel="noopener noreferrer"
            >
              Uncharted Waters
            </a>
          </AnimateTitle>
        </div>
        {overLayOn == "on" && (
          <div onClick={() => setOverLayOn("off")} className={styles.overLay}>
            <div className={styles.cancelContain}>
              <p className={styles.cancelX}>x</p>
              <div></div>
            </div>

            <video className={styles.videoContainer} controls>
              <source src={videoArray[videoSelect]} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </>
  );
}

export default Present;
