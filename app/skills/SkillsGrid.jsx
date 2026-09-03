"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./skills.module.css";

const categoryLabels = {
  "Front End": "Frontend & Interaction",
  "Back End": "Backend, Data & Automation",
  "DevOps & Hosting": "DevOps & Hosting",
  "Search & Digital Visibility": "Search & Digital Visibility",
  "Creative / Design": "Video, Design & Motion",
};

function getPreview(text = "") {
  const match = text.match(/^(.+?[.!?])(?:\s|$)/);
  return match?.[1] || text;
}

const overlayBaseStyle = {
  position: "absolute",
  inset: 0,
  zIndex: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: "clamp(1rem, 1.8vw, 1.45rem)",
  overflow: "hidden",
  borderRadius: "inherit",
  background:
    "linear-gradient(155deg, rgba(9, 10, 28, 0.72), rgba(8, 18, 34, 0.86))",
  border: "1px solid rgba(118, 215, 255, 0.22)",
  boxShadow:
    "inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 0 42px rgba(118, 215, 255, 0.05)",
  backdropFilter: "blur(16px) saturate(125%)",
  WebkitBackdropFilter: "blur(16px) saturate(125%)",
  pointerEvents: "none",
  transition:
    "opacity 200ms ease, transform 220ms cubic-bezier(0.2, 0.75, 0.2, 1)",
};

export default function SkillsGrid({ skills = [], categories = [] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [revealedSkill, setRevealedSkill] = useState(null);

  const visibleSkills = useMemo(() => {
    if (activeCategory === "all") return skills;
    return skills.filter((skill) => skill.category === activeCategory);
  }, [activeCategory, skills]);

  function chooseCategory(category) {
    setRevealedSkill(null);
    setActiveCategory(category);
  }

  return (
    <>
      <div className={styles.filterBar} aria-label="Filter skills by category">
        <button
          type="button"
          className={`${styles.filterButton} ${
            activeCategory === "all" ? styles.filterButtonActive : ""
          }`}
          aria-pressed={activeCategory === "all"}
          onClick={() => chooseCategory("all")}
        >
          All Skills
          <span>{skills.length}</span>
        </button>

        {categories.map((category) => {
          const isActive = activeCategory === category.name;

          return (
            <button
              key={category.name}
              type="button"
              className={`${styles.filterButton} ${
                isActive ? styles.filterButtonActive : ""
              }`}
              aria-pressed={isActive}
              onClick={() => chooseCategory(category.name)}
            >
              {categoryLabels[category.name] || category.name}
              <span>{category.count}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.grid} aria-live="polite">
        {visibleSkills.map((skill, index) => {
          const isRevealed = revealedSkill === skill.slug;

          return (
            <Link
              key={skill.slug}
              href={`/skills/${skill.slug}`}
              className={styles.skillCard}
              style={{ "--skill-delay": `${Math.min(index * 35, 350)}ms` }}
              onMouseEnter={() => setRevealedSkill(skill.slug)}
              onMouseLeave={() => setRevealedSkill(null)}
              onFocus={() => setRevealedSkill(skill.slug)}
              onBlur={() => setRevealedSkill(null)}
            >
              <div
                className={styles.skillArt}
                aria-hidden="true"
                style={{
                  opacity: isRevealed ? 0.28 : 1,
                  filter: isRevealed
                    ? "blur(2px) saturate(0.8) drop-shadow(0 18px 28px rgba(0, 0, 0, 0.3))"
                    : undefined,
                  transition:
                    "opacity 200ms ease, filter 220ms ease, transform 240ms cubic-bezier(0.2, 0.75, 0.2, 1)",
                }}
                dangerouslySetInnerHTML={{ __html: skill.image }}
              />

              <div
                className={styles.skillCopy}
                style={{
                  opacity: isRevealed ? 0.16 : 1,
                  transition: "opacity 180ms ease",
                }}
              >
                <p className={styles.skillCategory}>
                  {categoryLabels[skill.category] || skill.category}
                </p>
                <h2>{skill.name}</h2>
              </div>

              <div
                aria-hidden="true"
                style={{
                  ...overlayBaseStyle,
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? "translateY(0)" : "translateY(12px)",
                }}
              >
                <p className={styles.skillCategory}>
                  {categoryLabels[skill.category] || skill.category}
                </p>

                <h2
                  style={{
                    margin: 0,
                    color: "#fff",
                    fontSize: "clamp(1.35rem, 1.7vw, 1.7rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {skill.name}
                </h2>

                <p
                  style={{
                    margin: "0.75rem 0 0",
                    color: "rgba(238, 243, 255, 0.8)",
                    fontSize: "0.84rem",
                    lineHeight: 1.55,
                  }}
                >
                  {getPreview(skill.text)}
                </p>

                <span
                  className={styles.skillAction}
                  style={{ marginTop: "1rem", color: "#fff" }}
                >
                  Explore skill <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
