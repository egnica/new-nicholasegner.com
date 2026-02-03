import React from "react";
import ReactMarkdown from "react-markdown";
import styles from '../../blog/blog.module.css'

function Text({ block }) {
  return (
    <div className={styles.textBlock}>
      <ReactMarkdown>{block.text}</ReactMarkdown>
    </div>
  );
}

export default Text;
