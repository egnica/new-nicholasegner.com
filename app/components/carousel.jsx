import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import styles from "../page.module.css";
import { motion, AnimatePresence } from "framer-motion";

function Carousel({ imageArray }) {
  const ArrayLength = imageArray.length;
  const [changeIndex, setChangeIndex] = useState(0);
  const [clicked, setClicked] = useState(null);

  useEffect(() => {
    if (!clicked) {
      const interval = setInterval(() => {
        setChangeIndex((prev) => (prev + 1 >= ArrayLength ? 0 : prev + 1));
      }, 9000);
      return () => clearInterval(interval);
    }
  }, [clicked, ArrayLength]);

  const goPrev = () => {
    setClicked(true);
    setChangeIndex((prev) => (prev - 1 < 0 ? ArrayLength - 1 : prev - 1));
  };
  const goNext = () => {
    setClicked(true);
    setChangeIndex((prev) => (prev + 1) % ArrayLength);
  };
  const clickDot = (index) => {
    setClicked(true);
    setChangeIndex(index);
  };

  const isImage = (url) => /\.(png|jpe?g|gif|webp|avif|svg)(?:$|\?)/i.test(url);
  const isMp4 = (url) => /\.mp4(?:$|\?)/i.test(url);

  const fadeOnly = {
    // safer for iOS
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2, ease: "easeInOut" } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } },
  };

  // If you still want rotateY for IMAGES only:
  const flipForImages = {
    initial: { opacity: 0, rotateY: 90 },
    animate: {
      opacity: 1,
      rotateY: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    },
    exit: {
      opacity: 0,
      rotateY: -90,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const current = imageArray[changeIndex];
  const url = current.imageUrl;
  const desc = current.imageDesc;
  const showVideo = isMp4(url);
  const variants = showVideo ? fadeOnly : flipForImages;

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
          key={url} // key by URL so each slide fully remounts
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          className={styles.imageCarousel} // keep sizing styles on wrapper
        >
          {showVideo ? (
            <VideoAutoplay
              src={url}
              ariaLabel={desc}
              width={640}
              height={360}
              className={styles.videoCarouselMedia}
            />
          ) : (
            <Image
              width={640}
              height={360}
              alt={desc}
              src={url}
              className={styles.imageCarouselMedia}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <p style={{ color: "#cacbcd" }}>{desc}</p>
    </div>
  );
}

function VideoAutoplay({ src, ariaLabel, width, height }) {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Try to play when metadata is ready (helps iOS)
    const onMeta = () =>
      v.play().catch(() => {
        /* ignore iOS promise rejections */
      });
    v.addEventListener("loadedmetadata", onMeta, { once: true });
    return () => v.removeEventListener("loadedmetadata", onMeta);
  }, [src]);

  return (
    <video
      key={src}
      ref={ref}
      width={width}
      height={height}
      muted
      playsInline
      autoPlay
      loop
      preload="auto"
      aria-label={ariaLabel}
      className={styles.imageCarouselMedia}
      // poster optional: poster="/placeholder.jpg"
    >
      <source src={src} type="video/mp4" />
      {/* Text fallback */}
      Your browser does not support the video tag.
    </video>
  );
}

export default Carousel;
