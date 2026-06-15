"use client";
import { useState, useEffect } from "react";
import styles from "./AboutPopup.module.css";

export default function AboutPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user already closed it this session
    const hasSeenPopup = sessionStorage.getItem("seenNicholasAboutPopup");

    if (!hasSeenPopup) {
      // 3-second delay to keep things user-friendly and SEO-safe
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("seenNicholasAboutPopup", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.popupContainer}>
      <div className={styles.flexContainer}>
        <div className={styles.headerRow}>
          <h3 className={styles.title}>About Nicholas Egner</h3>
          <button
            onClick={handleClose}
            className={styles.closeButton}
            aria-label="Close popup"
          >
            ✕
          </button>
        </div>
        <p className={styles.description}>
          I am a Minneapolis-based web developer, SEO strategist, and content
          creator. I combine clean code with thoughtful design to help
          businesses grow their digital presence.
        </p>
        <a href="/about" className={styles.ctaLink}>
          Read Full Journey
        </a>
      </div>
    </div>
  );
}
