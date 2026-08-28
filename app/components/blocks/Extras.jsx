import ReactMarkdown from "react-markdown";
import Link from "next/link";
import styles from "../../blog/blog.module.css";

export function Quote({ block }) {
  return (
    <blockquote className={styles.quoteBlock}>
      <ReactMarkdown>{block.text || ""}</ReactMarkdown>
    </blockquote>
  );
}

export function Callout({ block }) {
  return (
    <aside className={styles.calloutBlock}>
      <ReactMarkdown>{block.text || ""}</ReactMarkdown>
    </aside>
  );
}

export function Embed({ block }) {
  if (!block.src) return null;

  return (
    <div className={styles.embedBlock}>
      <iframe
        src={block.src}
        title={block.title || "Embedded content"}
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
}

export function LinkBlock({ block }) {
  if (!block.href) return null;

  const label = block.label || block.href;
  const isInternal = block.href.startsWith("/");

  if (isInternal) {
    return (
      <p className={styles.linkBlock}>
        <Link href={block.href}>{label}</Link>
      </p>
    );
  }

  return (
    <p className={styles.linkBlock}>
      <a
        href={block.href}
        target={block.target || "_blank"}
        rel={block.rel || "noopener noreferrer"}
      >
        {label}
      </a>
    </p>
  );
}
