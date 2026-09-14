"use client";

import { useCallback, useEffect, useRef } from "react";

export default function LazyProjectVideo({ className, src }) {
  const videoRef = useRef(null);

  const loadVideo = useCallback(() => {
    const video = videoRef.current;

    if (!video || video.dataset.loaded === "true") return;

    video.dataset.loaded = "true";
    video.src = src;
    video.load();

    const playPromise = video.play();

    if (playPromise) {
      playPromise.catch(() => {
        // Muted autoplay can still be interrupted by browser or user settings.
      });
    }
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return undefined;

    if (!("IntersectionObserver" in window)) {
      loadVideo();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        loadVideo();
        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [loadVideo]);

  return (
    <video
      ref={videoRef}
      className={className}
      data-src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      onPointerEnter={loadVideo}
    />
  );
}
