import React from "react";
import styles from "../../page.module.css";
import { useState, useEffect, useRef } from "react";
import AnimateTitle from "@/app/components/animateTitle";
import AnimateBtn from "@/app/components/animateBtn";
import Link from "next/link";

function Wrap({ timeStamp, fromClick }) {
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
          <a
            href="https://www.linkedin.com/in/nicholas-egner/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={1.0}
              end={300}
              time={currentTime}
            >
              LinkedIn
            </AnimateBtn>
          </a>
          <a
            href="https://github.com/egnica"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={1.5}
              end={300}
              time={currentTime}
            >
              Github
            </AnimateBtn>
          </a>
          <a
            href="https://latestartdev.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={2}
              end={300}
              time={currentTime}
            >
              Late Start Dev
            </AnimateBtn>
          </a>
          <a
            href="https://g.co/kgs/34UbRKk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={2.5}
              end={300}
              time={currentTime}
            >
              Google Profile
            </AnimateBtn>
          </a>
          <a
            href="https://g.page/r/CSbhU6mFyb4qEAE/review"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={3}
              end={300}
              time={currentTime}
            >
              Google Reviews
            </AnimateBtn>
          </a>
        </div>
        <video
          className={styles.videoContainer}
          ref={videoRef}
          controls
          autoPlay
          playsinline
          webkit-playsinline
        >
          <source
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/video/website-videos/wrap_up.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className={styles.leftBtnCont}>
          <a
            href="https://en.wikipedia.org/wiki/Jerry_Maguire"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={16}
              end={19.8}
              time={currentTime}
            >
              Jerry Maguire
            </AnimateBtn>
          </a>
        </div>
        <p></p>
        <div className={styles.textContentCont}>
          <AnimateTitle
            start={1}
            end={60}
            time={currentTime}
            tag={"h2"}
            onClick={() => clickStop()}
            style={{ color: "#abaaffff" }}
          >
            <a
              href="mailto:nick@nicholasegner.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nicholas Egner
            </a>
          </AnimateTitle>
          <AnimateTitle
            start={1}
            end={60}
            time={currentTime}
            tag={"h4"}
            onClick={() => clickStop()}
          >
            <a
              href="mailto:nick@nicholasegner.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              nick@nicholasegner.com
            </a>
          </AnimateTitle>
          <AnimateTitle
            start={1}
            end={60}
            time={currentTime}
            tag={"h4"}
            onClick={() => clickStop()}
          >
            <a
              href="tel:+16309656187"
              target="_blank"
              rel="noopener noreferrer"
            >
              630.965.6187
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

export default Wrap;
