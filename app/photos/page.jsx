"use client";
import React from "react";
import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";
import Particles from "../components/particlesBackground";

function Photos() {
  const photoObject = [
    {
      url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner-portfolio.jpg",
      alt: "Nicholas Egner presenting a project portfolio",
    },
    {
      url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/fiverr-cover-1.png",
      alt: "Picture of Nicholas Egner - Modern Business Website",
    },
    {
      url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner-outline.webp",
      alt: "Nicholas Egner - color image",
    },
    {
      url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner.jpg",
      alt: "Portrait of Nicholas Egner - Digital Creator",
    },
    {
      url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/digital-portfolio.jpg",
      alt: "Portrait of Nicholas Egner - Digital portfolio",
    },
    {
      url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/NE-blue.svg",
      alt: "Nicholas Egner - Logo",
    },
    {
      url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner-vikings.jpg",
      alt: "Picture of Nicholas Egner - Minnesota Vikings",
    },
    {
      url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner-backtothefuture.png",
      alt: "Picture of Nicholas Egner - Back to the Future",
    },

    {
      url: "https://nciholasegner.s3.us-east-2.amazonaws.com/images/fiverr-devices.png",
      alt: "Picture of Nicholas Egner - Modern Responsive Website",
    },
  ];

  return (
    <div className={styles.photosPage}>
      <div className={styles.mainBackColor}></div>
      <Particles />
      <Link href={"../about"}>
        <h2 className={styles.skillsBtn}>Back</h2>
      </Link>
      <h1 style={{ color: "white" }}>Photos of Nicholas Egner</h1>
      <p style={{ color: "white" }}>
        A collection of portraits, candid moments, and behind-the-scenes shots
        from my work in web development, video production, and creative content.
      </p>

      <div className={styles.photoGrid}>
        {Object.values(photoObject).map((item, index) => (
          <img key={index} src={item.url} alt={item.alt} />
        ))}

        {/* Add more images as needed */}
      </div>
    </div>
  );
}

export default Photos;
