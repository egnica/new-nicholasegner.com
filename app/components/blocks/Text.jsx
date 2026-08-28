import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "../../blog/blog.module.css";

function Text({ block }) {
  const chunks = String(block.text || "")
    .split(/\n\s*\n+/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  if (!chunks.length) return null;

  const hasSupportingCopy = chunks.length > 1;

  return (
    <div className={styles.textBlock}>
      {chunks.map((chunk, index) => {
        const isLead = hasSupportingCopy && index === 0;

        return (
          <div
            key={index}
            className={
              isLead ? styles.paragraphLead : styles.paragraphBody
            }
          >
            <ReactMarkdown>{chunk}</ReactMarkdown>
          </div>
        );
      })}
    </div>
  );
}

export default Text;
