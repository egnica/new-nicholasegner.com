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
    <>
      <div>
        <div className={styles.controlContain2}>
          <div className={styles.arrow2} onClick={goPrev}>
            ←
          </div>
          {prospectArray.map((_, index) => (
            <div
              key={index}
              onClick={() => clickDot(index)}
              className={`${styles.dot2} ${
                index === changeIndex ? styles.dotActive : ""
              }`}
            ></div>
          ))}
          <div className={styles.arrow2} onClick={goNext}>
            →
          </div>
        </div>
      </div>
      <div className={styles.imageTextCont2}>
        <AnimatePresence mode="wait">
          <motion.div
            key={changeIndex + "image"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeIn" }}
            className={styles.imageWrapper}
          >
            <a href={prospectArray[changeIndex].urlImage} target="_blank">
              <img
                src={prospectArray[changeIndex].image}
                alt={prospectArray[changeIndex].imageAlt}
                className={styles.imageCarousel}
              />
            </a>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={changeIndex + "text"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeIn" }}
            className={styles.textIdea}
          >
            <h2>{prospectArray[changeIndex].title}</h2>
            <h4>{prospectArray[changeIndex].subtitle}</h4>
            <br />
            <p
              dangerouslySetInnerHTML={{
                __html: prospectArray[changeIndex].body,
              }}
            ></p>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default Carousel;
