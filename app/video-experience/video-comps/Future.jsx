import React from "react";
import styles from "../../page.module.css";
import { useState, useEffect, useRef } from "react";
import AnimateTitle from "@/app/components/animateTitle";
import AnimateBtn from "@/app/components/animateBtn";
import Link from "next/link";

function Future({ timeStamp, fromClick }) {
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
          <AnimateBtn
            start={47.5}
            end={300}
            time={currentTime}
            onClick={() => fromClick("past")}
          >
            My Past
          </AnimateBtn>

          <AnimateBtn
            start={49.5}
            end={300}
            time={currentTime}
            onClick={() => fromClick("present")}
          >
            The Present
          </AnimateBtn>
          <AnimateBtn
            start={52}
            end={300}
            time={currentTime}
            onClick={() => fromClick("wrap")}
          >
            Wrap It Up
          </AnimateBtn>
        </div>
        <video
          className={styles.videoContainer}
          ref={videoRef}
          controls
          autoPlay
          playsinline
          webkit-playsinline
          controlslist="nofullscreen noplaybackrate nodownload"
        >
          <source
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/video/website-videos/future.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className={styles.leftBtnCont}>
          <a
            href="https://www.indeed.com/career-advice/career-development/5-year-plan-template#:~:text=What%20is%20a%205%2Dyear,Goals%20to%20Improve%20Your%20Career"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={1}
              end={5}
              time={currentTime}
            >
              How to Create a 5-Year Plan
            </AnimateBtn>
          </a>
          <a
            href="https://blog.hubspot.com/marketing/5-year-plan#:~:text=Download%20Now-,What%20is%20a%20Five%2Dyear%20plan?,into%20action%20items%20and%20milestones"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={1}
              end={5}
              time={currentTime}
            >
              6 Steps to Create Five-Year Plans That Actually Stick
            </AnimateBtn>
          </a>
          <a
            href="https://smartasset.com/personal-finance/5-year-financial-plan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={1}
              end={5}
              time={currentTime}
            >
              How to Build a 5-Year Financial Plan
            </AnimateBtn>
          </a>
          <a
            href="https://www.helpguide.org/mental-health/anxiety/dealing-with-uncertainty"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={7.6}
              end={16}
              time={currentTime}
            >
              Dealing with Uncertainty
            </AnimateBtn>
          </a>

          <a
            href="https://latestartdev.com/posts/showing-up-consistently"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={7.6}
              end={300}
              time={currentTime}
            >
              Keep Showing Up - Blog Post
            </AnimateBtn>
          </a>
        </div>
        <p></p>
        <div className={styles.textContentCont}>
          {/* <AnimateTitle
            style={{ color: "blue" }}
            start={1}
            end={6}
            time={currentTime}
            tag={"h2"}
            onClick={() => clickStop()}
          >
            <a
              href="https://www.youtube.com/watch?v=5NeS4ueaU6w"
              target="_blank"
              rel="noopener noreferrer"
            >
              Everyone has a stroy...
            </a>
          </AnimateTitle> */}
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

export default Future;
