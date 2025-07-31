import React from "react";
import Image from "next/image";
import styles from "../page.module.css";

function Photos() {
  return (
    <div className={styles.photosPage}>
      <h1>Photos of Nicholas Egner</h1>
      <p>
        A collection of portraits, candid moments, and behind-the-scenes shots
        from my work in web development, video production, and creative content.
      </p>

      <div className={styles.photoGrid}>
        <img
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner-portfolio.jpg"
          alt="Nicholas Egner presenting a project portfolio"
        />
        <img
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner-outline.webp"
          alt="Nicholas Egner - color image"
        />
        <img
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner.jpg"
          alt="Portrait of Nicholas Egner - Digital Creator"
        />
        <img
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/digital-portfolio.jpg"
          alt="Portrait of Nicholas Egner - Digital portfolio"
        />
        <img
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/NE-blue.svg"
          alt="Nicholas Egner - Logo"
        />
        <img
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner-vikings.jpg"
          alt="Picture of Nicholas Egner - Minnesota Vikings"
        />
        <img
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/images/nicholas-egner-backtothefuture.png"
          alt="Picture of Nicholas Egner - Back to the Future"
        />
        {/* Add more images as needed */}
      </div>
    </div>
  );
}

export default Photos;
