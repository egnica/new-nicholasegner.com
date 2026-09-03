"use client";

import { useRouter } from "next/navigation";
import {
  CURRENT_PATH_KEY,
  PREVIOUS_PATH_KEY,
} from "../../components/RouteHistoryTracker/RouteHistoryTracker";
import styles from "./skill.module.css";

export default function SkillBackButton() {
  const router = useRouter();

  function handleBack() {
    const previousPath = sessionStorage.getItem(PREVIOUS_PATH_KEY);
    const currentPath =
      sessionStorage.getItem(CURRENT_PATH_KEY) ||
      `${window.location.pathname}${window.location.search}`;

    const isSafeInternalPath =
      previousPath &&
      previousPath.startsWith("/") &&
      !previousPath.startsWith("//") &&
      previousPath !== currentPath;

    router.push(isSafeInternalPath ? previousPath : "/");
  }

  return (
    <button type="button" className={styles.backButton} onClick={handleBack}>
      <span aria-hidden="true">←</span>
      Back
    </button>
  );
}
