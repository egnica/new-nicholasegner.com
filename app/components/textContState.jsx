"use client";

import React from "react";
import styles from "../page.module.css";
import { motion } from "framer-motion";

function ContState({ children, title, btnText, clickFun }) {
  return (
    <motion.div
      className={styles.textCont}
      initial="initial"
      animate="initial"
      whileHover="hover"
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.02 },
      }}
    >
      {/* Optional: Glow effect layer */}
      <motion.div
        className={styles.glowLayer}
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 0.2, scale: 1.05 },
        }}
      />

      <h2 className={styles.textTitle}>{title}</h2>
      <div className={styles.textBody}>{children}</div>

      <motion.div
        className={styles.mainBtn}
        onClick={clickFun}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        {btnText}
      </motion.div>
    </motion.div>
  );
}

export default ContState;
