"use client";
import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../page.module.css";
import Stack from "./skillscomps/stack";
import Projects from "./skillscomps/projects";
import Header from "../components/header";
import ContState from "../components/textContState";
import Link from "next/link";

function Skills() {
  const [revealSkill, setRevealSkill] = useState("");
  const [stack, setStack] = useState("");

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
      <div className={styles.mainBackColor}></div>
      <video className={styles.starOverlay} autoPlay loop muted playsInline>
        <source
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/video/star-background.webm"
          type="video/webm"
        />
      </video>
      <Header />
      <div className={styles.cont}>
        <div className={styles.careerNav}>
          <AnimatePresence mode="wait">
            <Link href={"./"}>
              <motion.div
                key={"nameCont"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ width: "100px", marginLeft: "20px" }}
                className={styles.skillsBtn}
              >
                Home
              </motion.div>
            </Link>
          </AnimatePresence>
          {revealSkill && (
            <motion.div
              key={"nameCont"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={backBtn}
              className={styles.skillsBtn}
              style={{ width: "200px", marginLeft: "10px" }}
            >
              {stack ? "Back to Categories" : "Back to Menu"}
            </motion.div>
          )}
        </div>
        {revealSkill == "" && (
          <div className={styles.skillsBtnContain}>
            <ContState
              title={"TECH STACK"}
              btnText={"Open Tech Stack"}
              clickFun={() => setRevealSkill("stack")}
            >
              <p>
                <strong>Here’s what I build with.</strong>
                <br /> From frontend frameworks to backend databases, these are
                the tools I use to bring ideas to life. Fast, responsive, and
                scalable. Every choice here reflects real-world use, not just
                buzzwords.
              </p>
            </ContState>
            <ContState
              title={"PROJECTS"}
              btnText={"Explore My Work"}
              clickFun={() => setRevealSkill("projects")}
            >
              <p>
                <strong>This is where the stack comes alive.</strong> <br />
                Here’s a selection of projects that show what I can do. From
                interactive dashboards to full-stack apps. Everything here ties
                back to real needs, real users, and real outcomes.
              </p>
            </ContState>
          </div>
        )}

        {revealSkill == "stack" ? (
          <div>
            <Stack stackSelect={stack} onStackChange={handleStackChange} />
          </div>
        ) : revealSkill == "projects" ? (
          <Projects />
        ) : null}
      </div>
    </>
  );
}

export default Skills;
