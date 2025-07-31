"use client";

import Link from "next/link";
import styles from "./page.module.css";
export default function NotFound() {
  return (
    <>
      <div className={styles.mainBackColor}></div>
      <video className={styles.starOverlay} autoPlay loop muted playsInline>
        <source
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/video/star-background.webm"
          type="video/webm"
        />
      </video>
      <div
        className={styles.aboutTextCont}
        style={{ textAlign: "center", padding: "4rem" }}
      >
        <h1
          style={{ fontSize: "2rem", marginBottom: "1rem", color: "aliceblue" }}
        >
          404 — Page Not Found
        </h1>
        <p style={{ marginBottom: "2rem", color: "aliceblue" }}>
          Oops! This page doesn't exist ...
        </p>
        <Link
          href="/"
          style={{
            background: "#0a0a0a",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Go Back Home
        </Link>
      </div>
    </>
  );
}
