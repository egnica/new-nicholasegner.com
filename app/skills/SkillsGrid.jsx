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

export default function SkillsGrid({ skills = [], categories = [] }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const visibleSkills = useMemo(() => {
    if (activeCategory === "all") return skills;
    return skills.filter((skill) => skill.category === activeCategory);
  }, [activeCategory, skills]);

  return (
    <>
      <div className={styles.filterBar} aria-label="Filter skills by category">
        <button
          type="button"
          className={`${styles.filterButton} ${
            activeCategory === "all" ? styles.filterButtonActive : ""
          }`}
          aria-pressed={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
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
              onClick={() => setActiveCategory(category.name)}
            >
              {categoryLabels[category.name] || category.name}
              <span>{category.count}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.grid} aria-live="polite">
        {visibleSkills.map((skill, index) => (
          <Link
            key={skill.slug}
            href={`/skills/${skill.slug}`}
            className={styles.skillCard}
            style={{ "--skill-delay": `${Math.min(index * 35, 350)}ms` }}
          >
            <div
              className={styles.skillArt}
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: skill.image }}
            />

            <div className={styles.skillCopy}>
              <p className={styles.skillCategory}>
                {categoryLabels[skill.category] || skill.category}
              </p>
              <h2>{skill.name}</h2>
              <p className={styles.skillPreview}>{getPreview(skill.text)}</p>

              <span className={styles.skillAction}>
                Explore skill <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
