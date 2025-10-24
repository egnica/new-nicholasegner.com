import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../page.module.css";
import { motion, AnimatePresence } from "framer-motion";

function Carousel({ imageArray }) {
  const ArrayLength = imageArray.length;
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

  const videoOrImage = (url, description) => {
    const isMp4 = (url) => /\.mp4($|\?)/i.test(url);

    return isMp4(url) ? (
      <video
        width={640}
        height={360}
        alt={description}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={url} type="video/mp4" />
      </video>
    ) : (
      <Image
        width={640}
        height={360}
        alt={description}
        src={url}
        className={styles.imageCarousel}
      />
    );
  };

  return (
    <div style={{ display: "grid", placeContent: "center" }}>
      <div className={styles.controlContain}>
        <div className={styles.arrow} onClick={goPrev}>
          ←
        </div>
        {imageArray.map((_, index) => (
          <div
            key={index}
            onClick={() => clickDot(index)}
            className={`${styles.dot} ${
              index === changeIndex ? styles.activeDot : ""
            }`}
          />
        ))}
        <div className={styles.arrow} onClick={goNext}>
          →
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={changeIndex}
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: -90 }}
          transition={{ duration: 0.2, ease: "easeIn" }}
        >
          {videoOrImage(
            imageArray[changeIndex].imageUrl,
            imageArray[changeIndex].imageDesc
          )}
          {/* <Image
            width={640}
            height={360}
            alt={imageArray[changeIndex].imageDesc}
            src={imageArray[changeIndex].imageUrl}
            className={styles.imageCarousel}
          /> */}
        </motion.div>
      </AnimatePresence>
      <p style={{ color: "#cacbcd" }}>{imageArray[changeIndex].imageDesc}</p>
    </div>
  );
}

export default Carousel;
