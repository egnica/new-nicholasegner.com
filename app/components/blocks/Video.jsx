export default function Video({ block }) {
  const variant = block.variant || "supporting";

  const defaultsByVariant = {
    hero: { controls: false, autoplay: true, muted: true, loop: true },
    loop: { controls: false, autoplay: true, muted: true, loop: true },
    supporting: { controls: true, autoplay: false, muted: false, loop: false },
  };

  const defaults = defaultsByVariant[variant] || defaultsByVariant.supporting;

  const props = {
    ...defaults,
    ...block, // block wins if it defines something explicitly
  };

  return (
    <video
      src={props.src}
      controls={props.controls}
      autoPlay={props.autoplay}
      muted={props.muted}
      loop={props.loop}
      playsInline
      preload="metadata"
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  );
}
