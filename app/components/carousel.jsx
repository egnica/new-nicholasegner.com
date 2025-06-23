import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../page.module.css";

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
      }, 4000);

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
    <div>
      <div className={styles.controlContain}>
        <div className={styles.arrow} onClick={goPrev}>
          ←
        </div>
        {imageArray.map((_, index) => (
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
      <Image
        width={640}
        height={360}
        alt="project image"
        src={imageArray[changeIndex].imageUrl}
      />
      <p>{imageArray[changeIndex].imageDesc}</p>
    </div>
  );
}

export default Carousel;
