import React from "react";
import styles from "../../page.module.css";
import { useState, useEffect, useRef } from "react";
import AnimateTitle from "@/app/components/animateTitle";
import AnimateBtn from "@/app/components/animateBtn";
import Link from "next/link";

function Past({ timeStamp, fromClick }) {
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
    "https://nciholasegner.s3.us-east-2.amazonaws.com/video/website-videos/whittier.mp4",
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
            onClick={() => overLay(0)}
            start={1}
            end={26}
            time={currentTime}
          >
            My Childhood
          </AnimateBtn>
          <AnimateBtn
            onClick={() => overLay(1)}
            start={15.5}
            end={26}
            time={currentTime}
            style={{ border: "4px red solid" }}
          >
            <strong>The Worst Thing Ever</strong>
          </AnimateBtn>
          <AnimateBtn
            onClick={() => overLay(2)}
            start={20}
            end={26}
            time={currentTime}
          >
            Fun With Minneapolis Wildlife
          </AnimateBtn>
          <AnimateBtn
            onClick={() => overLay(6)}
            start={20}
            end={26}
            time={currentTime}
          >
            Whittier Neighborhood Documentary
          </AnimateBtn>

          <a
            href="https://www.youtube.com/watch?v=XsiiIa6bs9I"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={95.5}
              end={100
              }
              time={currentTime}
            >
              Skills?
            </AnimateBtn>
          </a>

          <AnimateBtn
            onClick={() => overLay(3)}
            start={106}
            end={118}
            time={currentTime}
          >
            My Reel
          </AnimateBtn>

          <AnimateBtn
            onClick={() => overLay(4)}
            start={106.5}
            end={118}
            time={currentTime}
          >
            Past Video
          </AnimateBtn>

          <AnimateBtn
            onClick={() => overLay(5)}
            start={107}
            end={118}
            time={currentTime}
          >
            More Current Video
          </AnimateBtn>

          <Link href="../../skills" target="_blank" rel="noopener noreferrer">
            <AnimateBtn
              onClick={() => clickStop()}
              start={123.5}
              end={300}
              time={currentTime}
            >
              Check Out My Career Section
            </AnimateBtn>
          </Link>

          <AnimateBtn
            start={126}
            end={300}
            time={currentTime}
            onClick={() => fromClick("future")}
          >
            Where I'm Going
          </AnimateBtn>

          <AnimateBtn
            start={128.5}
            end={300}
            time={currentTime}
            onClick={() => fromClick("wrap")}
          >
            Wrap It Up
          </AnimateBtn>

          {/* <span onClick={() => fromClick("background")}>
              A: My Background
            </span> */}
        </div>
        <video
          className={styles.videoContainer}
          ref={videoRef}
          controls
          autoPlay
        >
          <source
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/video/website-videos/past.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className={styles.leftBtnCont}>
          <a
            href="https://elginil.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={5.2}
              end={26}
              time={currentTime}
            >
              Elgin,
              <br /> IL.
            </AnimateBtn>
          </a>
          <a
            href="https://www.sandiego.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={10.6}
              end={26}
              time={currentTime}
            >
              San Diego, <br />
              CA.
            </AnimateBtn>
          </a>
          <a
            href="https://www.minneapolismn.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={19}
              end={26}
              time={currentTime}
            >
              Minneapolis,
              <br /> MN.
            </AnimateBtn>
          </a>
          <a
            href="https://www.nerdwallet.com/article/finance/tech-layoffs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={40}
              end={51}
              time={currentTime}
            >
              Stability in Tech? (lol)
            </AnimateBtn>
          </a>
          <a
            href="https://dunwoody.edu/generation-do/?gad_source=1&gad_campaignid=19435631678&gbraid=0AAAAADlB5TrYmoAFE_a2-fzYNbN5Y0QMa&gclid=Cj0KCQjws4fEBhD-ARIsACC3d28oCpcRVAjoyX6MnaihSOR-30im0xdsG_2qhPrGow29Ce62RnWQdbMaAq13EALw_wcB"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={47.9}
              end={61}
              time={currentTime}
            >
              Dunwoody College of Technology
            </AnimateBtn>
          </a>

          <a
            href="https://github.com/egnica/Baseball_Game_Score/tree/master#readme"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={51.2}
              end={54}
              time={currentTime}
            >
              I Made A Lot Of These C# 'Console Apps'
            </AnimateBtn>
          </a>

          <a
            href="https://github.com/egnica/Messing-around-with-useState-hooks/tree/main#readme"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={51.2}
              end={54}
              time={currentTime}
            >
              My First REACT Repo on Github
            </AnimateBtn>
          </a>

          <a
            href="https://racketmn.com/how-did-covid-change-twin-cities-restaurants-were-still-finding-out"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={55}
              end={61}
              time={currentTime}
            >
              RACKET: How Did Covid Change Twin Cities Restaurants?
            </AnimateBtn>
          </a>

          <a
            href="https://barlowresearch.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={62}
              end={92}
              time={currentTime}
            >
              Barlow Research Associates, Inc.
            </AnimateBtn>
          </a>
          <a
            href="https://www.youtube.com/watch?v=d4a9KApRUks"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={90.5}
              end={95}
              time={currentTime}
            >
              Minneapolis Miracle
              <br /> (never gets old)
            </AnimateBtn>
          </a>
          <Link href="../../skills" target="_blank" rel="noopener noreferrer">
            <AnimateBtn
              onClick={() => clickStop()}
              start={95.5}
              end={400}
              time={currentTime}
            >
              Check Out my "Skills" Section
            </AnimateBtn>
          </Link>
          <a
            href="https://latestartdev.com/posts/hello-world"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={98}
              end={115}
              time={currentTime}
            >
              My First Blog Post
            </AnimateBtn>
          </a>

          <a
            href="https://github.com/egnica/TestDrive-2025/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimateBtn
              onClick={() => clickStop()}
              start={99}
              end={115}
              time={currentTime}
            >
              My Repo for custom 'Digital Insights Hub'
            </AnimateBtn>
          </a>
        </div>
        <p></p>
        <div className={styles.textContentCont}>
          {/*
            COPY FOR NEW ADDEND TILE ELEMENT
          -
           <AnimateTitle    style={{ color: "#abaaffff" }}
              start={1}
              end={4.8}
              time={currentTime}
              tag={"h1"}>
            Seen it before...
          </AnimateTitle> 
          -
          */}
          <AnimateTitle
            style={{ color: "#abaaffff" }}
            start={1}
            end={8.29}
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
          </AnimateTitle>
          <AnimateTitle start={26} end={46} time={currentTime} tag={"h2"}>
            Life in the service industry...
          </AnimateTitle>
          <AnimateTitle
            start={47.9}
            end={61}
            time={currentTime}
            tag={"h2"}
            onClick={() => clickStop()}
            style={{ color: "#abaaffff" }}
          >
            <a
              href="https://www.youtube.com/watch?v=lwfJ7fjjwvc"
              target="_blank"
              onClick={() => clickStop()}
              rel="noopener noreferrer"
            >
              Back to School...
            </a>
          </AnimateTitle>
          <AnimateTitle start={62} end={91} time={currentTime} tag={"h2"}>
            <a
              href="https://www.youtube.com/watch?v=lwfJ7fjjwvc"
              target="_blank"
              rel="noopener noreferrer"
            >
              New Beginnings
            </a>
          </AnimateTitle>
          <AnimateTitle
            start={93}
            end={138}
            time={currentTime}
            tag={"h2"}
            onClick={() => clickStop()}
            style={{ color: "#abaaffff" }}
          >
            <a
              href="https://www.youtube.com/watch?v=52ZdwZ7Ig-8&list=RD52ZdwZ7Ig-8&start_radio=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              These Days...
            </a>
          </AnimateTitle>
          <AnimateTitle
            start={139.2}
            end={300}
            time={currentTime}
            tag={"h1"}
            onClick={() => clickStop()}
            style={{ color: "#abaaffff" }}
          >
            <a
              href="https://latestartdev.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Late Start Dev
            </a>
          </AnimateTitle>
        </div>
        {overLayOn == "on" && (
          <div onClick={() => setOverLayOn("off")} className={styles.overLay}>
            <div className={styles.cancelContain}>
              <p className={styles.cancelX}>x</p>
            </div>

            <video className={styles.videoContainer} controls autoPlay>
              <source src={videoArray[videoSelect]} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </>
  );
}

export default Past;
