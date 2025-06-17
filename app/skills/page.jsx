"use client";
import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../page.module.css";
import Stack from "./skillscomps/stack";
import Projects from "./skillscomps/projects";

function Skills() {
  const [revealSkill, setRevealSkill] = useState("");
  return (
    <div className={styles.cont}>
      <p>Skills</p>
      {revealSkill == "" && (
        <div className={styles.skillsBtnContain}>
          <div
            onClick={() => setRevealSkill("stack")}
            className={styles.skillsBtn}
          >
            Tech Stack
          </div>
          <div
            onClick={() => setRevealSkill("projects")}
            className={styles.skillsBtn}
          >
            Featured Projects
          </div>
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
  );
}

export default Skills;
