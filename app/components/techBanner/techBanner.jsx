import Link from "next/link";
import styles from "./TechMarquee.module.css";

export default function TechMarquee({ techIcons = [], className = "" }) {
  const icons = Array.isArray(techIcons)
    ? techIcons.filter((icon) => icon?.name && icon?.svg && icon?.href)
    : [];

  if (!icons.length) return null;

  return (
    <div className={`${styles.strip} ${className}`}>
      <div className={styles.list}>
        {icons.map((icon) => (
          <Link
            key={icon.href}
            href={icon.href}
            className={styles.techLink}
            aria-label={`View ${icon.name} skill page`}
          >
            <span
              className={styles.techIcon}
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: icon.svg }}
            />
            <span className={styles.techName}>{icon.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
