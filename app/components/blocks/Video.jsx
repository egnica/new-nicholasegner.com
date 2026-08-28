import styles from "../../blog/blog.module.css";

export default function Video({ block }) {
  const variant = block.variant || "supporting";

  const defaultsByVariant = {
    hero: { controls: false, autoplay: true, muted: true, loop: true },
    loop: { controls: false, autoplay: true, muted: true, loop: true },
    supporting: { controls: true, autoplay: false, muted: false, loop: false },
  };

  const defaults = defaultsByVariant[variant] || defaultsByVariant.supporting;
  const props = { ...defaults, ...block };

  const sources =
    typeof props.src === "string"
      ? { mp4: props.src }
      : props.src || {};

  if (!sources.mp4 && !sources.webm) return null;

  return (
    <div className={styles.contentVideoBlock}>
      <video
        controls={props.controls}
        autoPlay={props.autoplay}
        muted={props.muted}
        loop={props.loop}
        playsInline
        preload="metadata"
        poster={props.poster}
      >
        {sources.webm && <source src={sources.webm} type="video/webm" />}
        {sources.mp4 && <source src={sources.mp4} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>

      {props.youtube?.url && (
        <a
          href={props.youtube.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.videoLink}
        >
          {props.youtube.label || "Watch on YouTube"}
        </a>
      )}
    </div>
  );
}
