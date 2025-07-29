import React from "react";
import Link from "next/link";
import styles from "../page.module.css";
import { motion, AnimatePresence } from "framer-motion";

function textContBtn({ children, title, btnText, path }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, rotateY: 90 }}
        animate={{ opacity: 1, rotateY: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        style={{ overflow: "hidden" }}
        key={title}
        className={styles.textCont}
      >
        <h2>{title}</h2>
        <div className={styles.textCont2}>
          <div className={styles.transparentCont}>{children}</div>
        </div>
        <Link href={path}>
          <motion.div
            key={btnText}
            whileHover={{scale: 1.1}}
            whileTap="click"
            className={styles.mainBtn}
          >
            {btnText}
          </motion.div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}

export default textContBtn;
