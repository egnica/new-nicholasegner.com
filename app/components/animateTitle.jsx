import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function animateTitle({
  children,
  start,
  end,
  time,
  tag,
  style = {},
  onClick,
}) {
  const MotionTag = motion[tag];

  const titleVariant = {
    start: {
      opacity: 0,
      x: -150,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeIn" },
    },

    exit: {
      opacity: 0,
      x: 150,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {time > start && time < end && (
          <MotionTag
            variants={titleVariant}
            onClick={onClick}
            key={"key" + start + end}
            initial="start"
            animate="visible"
            exit="exit"
            whileHover="hover"
            whileTap="click"
            style={style}
          >
            {children}
          </MotionTag>
        )}
      </AnimatePresence>
    </>
  );
}

export default animateTitle;
