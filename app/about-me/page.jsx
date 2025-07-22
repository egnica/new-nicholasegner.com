"use client";
import React from "react";
import Intro from "./video-comps/Intro";
import { useState } from "react";
import styles from "../page.module.css";

function AboutMe() {
  const [title, setTitle] = useState("intro");
  const [currentTime, setCurrentTime] = useState(0);

  const timeFunction = (time) => setCurrentTime(time);

  return (
    <div className={styles.videoPage}>
      <p>{currentTime}</p>
      <h1>CHANGE TEXT FOR VIDEO</h1>
      <div className={styles.mainBtnCont}>
        <div>INTRO</div>
        <div>INTRO</div>
        <div>INTRO</div>
        <div>INTRO</div>
        <div>INTRO</div>
      </div>

      <Intro timeStamp={timeFunction} />
    </div>
  );
}

export default AboutMe;
