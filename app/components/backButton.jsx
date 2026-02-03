"use client";

import { useRouter } from "next/navigation";
import styles from "../blog/blog.module.css";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    // Works when user came from /blog or /blog/archive
    // Fallback handles refresh/new tab/direct entry
    if (window.history.length > 1) router.back();
    else router.push("/blog");
  };

  return (
    <div type="button" onClick={handleBack} className={styles.navBtn}>
      Back
    </div>
  );
}
