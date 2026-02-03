import React from "react";
import styles from "../../blog/blog.module.css";
import { createHighlighter } from "shiki";

export default async function Code({ block }) {
  const code = block.code ?? "";
  const lang = block.lang ?? "javascript";

  const highlighter = await createHighlighter({
    themes: ["github-dark"],
    langs: [lang],
  });

  const html = highlighter.codeToHtml(code, {
    lang,
    theme: "github-dark",
  });

  return (
    <div
      className={styles.codeBlock}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
