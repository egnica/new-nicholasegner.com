"use client";

import React from "react";
import Link from "next/link";
import styles from "../page.module.css";
import { motion, AnimatePresence, animate } from "framer-motion";

function textContBtn({ children, title, btnText, path }) {
  return (
    <AnimatePresence mode="wait">
      <Link href={path}>
        <motion.div
          key={title}
          className={styles.textCont}
          whileHover="hover"
          initial="initial"
          animate="animate"
          variants={{
            initial: { scale: 1, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            hover: { scale: 1.02 },
          }}
        >
          <motion.div
            variants={{
              initial: { opacity: 0 },
              hover: { opacity: 0.15, scale: 1.05 },
            }}
          />

          {/* Main content */}
          <h2 className={styles.textTitle}>{title}</h2>
          <div className={styles.textBody}>{children}</div>

          <motion.div
            className={styles.mainBtn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {btnText}
          </motion.div>
        </motion.div>
      </Link>
    </AnimatePresence>
  );
}

export default textContBtn;
