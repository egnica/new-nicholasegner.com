"use client";
import styles from "../../../page.module.css";
import React from "react";
import { useState } from "react";

function Stack() {
  const clickHandler = (string) => {};

  return (
    <div>
      <div className={styles.skillsBtnContain}>
        <div onClick={() => clickHandler("front")} className={styles.skillsBtn}>
          Frontend
        </div>
        <div onClick={() => clickHandler("back")} className={styles.skillsBtn}>
          Backend / Database
        </div>
        <div
          onClick={() => clickHandler("devops")}
          className={styles.skillsBtn}
        >
          DevOps & Hosting
        </div>
        <div
          onClick={() => clickHandler("creative")}
          className={styles.skillsBtn}
        >
          Creative / Design
        </div>
      </div>
    </div>
  );
}

export default Stack;
