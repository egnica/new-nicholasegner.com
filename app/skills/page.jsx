"use client";
import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../page.module.css";
import Stack from "./skillscomps/stack";
import Projects from "./skillscomps/projects";
import Header from "../components/header";
import ContState from "../components/textContState";

function Skills() {
  const [revealSkill, setRevealSkill] = useState("");
  return (
    <>
      <Header />
      <div className={styles.cont}>
        <h1>Skills - To Pay The Bills</h1>
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
            Tech Stack
            <div onClick={() => setRevealSkill("")}>Back</div>
            <Stack />
          </div>
        ) : revealSkill == "projects" ? (
          <Projects />
        ) : null}
      </div>
    </>
  );
}

export default Skills;
