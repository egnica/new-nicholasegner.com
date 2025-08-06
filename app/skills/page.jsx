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

      <Header />
      <Link href={"../"}>
        <h2 style={{ marginLeft: "20px" }} className={styles.skillsBtn}>
          Home
        </h2>
      </Link>
      <div className={styles.cont}>
        <Projects />
      </div>
    </>
  );
}

export default Skills;
