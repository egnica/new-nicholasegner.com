import Image from "next/image";
import styles from "../../blog/blog.module.css";

export default function ImageBlock({ block }) {
  if (!block.src) return null;

  return (
    <figure className={styles.contentMediaFigure}>
      <div className={styles.hero}>
        <Image
          src={block.src}
          alt={block.alt || ""}
          fill
          sizes="(max-width: 900px) 100vw, 1200px"
          style={{ objectFit: "contain" }}
        />
      </div>

      {block.caption && (
        <figcaption className={styles.mediaCaption}>
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}
