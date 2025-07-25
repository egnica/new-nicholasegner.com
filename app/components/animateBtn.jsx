import React from "react";
import { motion, AnimatePresence, color } from "framer-motion";
import styles from "../page.module.css";

function AnimateBtn({ children, start, end, time, onClick, style = {} }) {
  const btnVariant = {
    start: {
      opacity: 0,
      height: 0,
      backgroundImage: "linear-gradient(to right, #FFE3A9 0%, #0B1D51 100%)",
    },
    visible: {
      opacity: 1,
      height: "auto",
      backgroundImage: "linear-gradient(to right, #7827cfff 0%, #2575fc 100%)",
      backgroundSize: "cover",
      backgroundPosition: "50% 50%",
      color: "rgba(222, 222, 248, 1)",
      boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.5, ease: "easeIn" },
    },
    hover: {
      scale: 1.05,
      backgroundImage:
        "linear-gradient(to right, #a55ef0ff 0%, #bed4fcff 100%)",
      cursor: "pointer",
    },
    click: {
      scale: 0.9,
      opacity: 1,
      height: "auto",
      backgroundImage: "linear-gradient(to right, #FFE3A9 0%, #0B1D51 100%)",
      backgroundSize: "cover",
      backgroundPosition: "60% 40%",
      color: "rgba(248, 248, 255, 1)",
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {time > start && time < end && (
        <motion.div
          onClick={onClick}
          key={"key" + start + end}
          variants={btnVariant}
          initial="start"
          animate="visible"
          exit="exit"
          whileHover="hover"
          whileTap="click"
          className={styles.interBtn}
          style={{ ...style, overflow: "hidden" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AnimateBtn;
