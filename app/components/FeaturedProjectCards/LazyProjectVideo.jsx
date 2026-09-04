"use client";

import { useEffect, useRef } from "react";

export default function LazyProjectVideo({ src, className }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.getAttribute("src")) {
            video.setAttribute("src", src);
            video.load();
          }

          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      {
        rootMargin: "250px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
}
