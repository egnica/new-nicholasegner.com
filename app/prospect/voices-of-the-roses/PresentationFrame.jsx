"use client";

import { useEffect, useRef } from "react";

const sectionIds = new Set(["vision", "program", "website", "story", "media", "rhythm", "investment", "next"]);

export default function PresentationFrame() {
  const frame = useRef(null);

  useEffect(() => {
    const syncHash = () => {
      const section = window.location.hash.slice(1);
      if (sectionIds.has(section) && frame.current) {
        frame.current.contentWindow?.postMessage({ type: "rose-section", section }, window.location.origin);
      }
    };
    const receive = (event) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === "rose-section-change" && sectionIds.has(event.data.section)) {
        window.history.replaceState(null, "", `#${event.data.section}`);
      }
      if (event.data?.type === "rose-ready") syncHash();
    };
    window.addEventListener("message", receive);
    window.addEventListener("hashchange", syncHash);
    syncHash();
    return () => {
      window.removeEventListener("message", receive);
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);

  return <iframe ref={frame} title="Voices of the Roses board presentation and proposal" src="/voices-of-the-roses/index.html" style={{ position: "fixed", inset: 0, width: "100%", height: "100dvh", border: 0, zIndex: 20, background: "#f7f3eb" }} />;
}
