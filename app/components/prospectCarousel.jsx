import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../page.module.css";
import { motion, AnimatePresence } from "framer-motion";

function Carousel({ prospectArray }) {
  const ArrayLength = prospectArray.length;
  const [changeIndex, setChangeIndex] = useState(0);
  const [clicked, setClicked] = useState(null);

  useEffect(() => {
    if (!clicked) {
      const interval = setInterval(() => {
        setChangeIndex((prevIndex) =>
          prevIndex + 1 >= ArrayLength ? 0 : prevIndex + 1
        );
      }, 9000);

      return () => clearInterval(interval);
    }
  }, [clicked, ArrayLength]);
  const goPrev = () => {
    setClicked(true);
    setChangeIndex((prevIndex) =>
      prevIndex - 1 < 0 ? ArrayLength - 1 : prevIndex - 1
    );
  };
  const goNext = () => {
    setClicked(true);
    setChangeIndex((prevIndex) => (prevIndex + 1) % ArrayLength);
  };
  const clickDot = (index) => {
    setClicked(true);
    setChangeIndex(index);
  };

  return (
    <div style={{ display: "grid", placeContent: "center" }}>
      <div className={styles.controlContain}>
        <div className={styles.arrow} onClick={goPrev}>
          ←
        </div>
        {prospectArray.map((_, index) => (
          <div
            key={index}
            onClick={() => clickDot(index)}
            className={styles.dot}
          ></div>
        ))}
        <div className={styles.arrow} onClick={goNext}>
          →
        </div>
      </div>

      <div>
        <h1>{prospectArray[changeIndex].title}</h1>
        <h2>{prospectArray[changeIndex].subtitle}</h2>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={changeIndex}
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: -90 }}
          transition={{ duration: 0.2, ease: "easeIn" }}
        >
          <Image
            width={640}
            height={360}
            alt={prospectArray[changeIndex].imageAlt}
            src={prospectArray[changeIndex].image}
            className={styles.imageCarousel}
          />
        </motion.div>
      </AnimatePresence>

      <div>
        <p>{prospectArray[changeIndex].body}</p>
      </div>
    </div>
  );
}

export default Carousel;
