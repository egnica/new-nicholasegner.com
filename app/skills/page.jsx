"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../page.module.css";
import Stack from "./skillscomps/stack";
import Projects from "./skillscomps/projects";
import Header from "../components/header";
import ContState from "../components/textContState";
import Link from "next/link";
import Particles from "../components/particlesBackground";
import lottie from "lottie-web";

function Skills() {
  const [revealSkill, setRevealSkill] = useState("");
  const [stack, setStack] = useState("");
  const animRef = useRef(null);
  const [heroFrames, setHeroFrames] = useState(false);

  useEffect(() => {
    if (!animRef.current) return;
    const anim = lottie.loadAnimation({
      container: animRef.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: "/projects-animation.json",
      rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
    });

    const onDone = () => setHeroFrames(true);
    anim.addEventListener("complete", onDone);

    return () => {
      anim.removeEventListener("complete", onDone);
      anim.destroy();
    };
  }, []);

  const handleStackChange = (value) => {
    setStack(value);
  };

  const backBtn = () => {
    if (stack) {
      setStack("");
    } else {
      setRevealSkill("");
    }
  };

  return (
    <>
      <Particles />
      <div className={styles.mainBackColor}></div>

      <Header />
      <Link
        style={{ marginLeft: "20px" }}
        className={styles.skillsBtn}
        href={"../"}
      >
        Home
      </Link>
      <div className={styles.cont}>
        <Projects />
        <div
          ref={animRef}
          className={styles.lottieBackground}
          style={{ zIndex: "-1" }}
        />
      </div>
    </>
  );
}

export default Skills;
