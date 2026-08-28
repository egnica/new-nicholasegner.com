import styles from "../../blog/blog.module.css";
import { createHighlighter } from "shiki";

export default async function Code({ block }) {
  const code = block.code ?? "";
  const lang = block.language ?? block.lang ?? "javascript";

  const highlighter = await createHighlighter({
    themes: ["github-dark"],
    langs: [lang],
  });

  const html = highlighter.codeToHtml(code, {
    lang,
    theme: "github-dark",
  });

  return (
    <div className={styles.codeBlock}>
      {block.filename && (
        <div className={styles.codeFilename}>{block.filename}</div>
      )}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
