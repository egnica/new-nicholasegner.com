"use client";

import { useEffect, useRef } from "react";

export default function SimpleDotsBackground() {
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 80 });
  const frameRef = useRef(null);
  const lastFrameRef = useRef(0);
  const sizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const isTouchOnly = window.matchMedia("(hover: none)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouchOnly || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DOT_COUNT = 60;
    const MAX_DOTS = 90;
    const LINE_DISTANCE = 100;
    const LINE_DISTANCE_SQUARED = LINE_DISTANCE * LINE_DISTANCE;
    const FPS = 30;
    const FRAME_INTERVAL = 1000 / FPS;

    const colors = ["#5ec6ff", "#84d0ff", "#bde8ff"];

    function resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      sizeRef.current = { width, height };

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createDot(x, y, randomize = true) {
      const { width, height } = sizeRef.current;

      return {
        x: x ?? Math.random() * width,
        y: y ?? Math.random() * height,
        r: Math.random() * 1.75 + 0.75,
        dx: randomize ? (Math.random() - 0.5) * 0.45 : 0,
        dy: randomize ? (Math.random() - 0.5) * 0.45 : 0,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    }

    function handleMouseMove(e) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }

    function handleClick(e) {
      const dots = dotsRef.current;
      const newDots = [];

      for (let i = 0; i < 2; i++) {
        newDots.push(createDot(e.clientX, e.clientY, true));
      }

      while (dots.length + newDots.length > MAX_DOTS) {
        dots.shift();
      }

      dots.push(...newDots);
    }

    function draw(timestamp) {
      frameRef.current = requestAnimationFrame(draw);

      if (timestamp - lastFrameRef.current < FRAME_INTERVAL) return;
      lastFrameRef.current = timestamp;

      if (document.hidden) return;

      const dots = dotsRef.current;
      const mouse = mouseRef.current;
      const { width, height } = sizeRef.current;

      ctx.clearRect(0, 0, width, height);

      for (const dot of dots) {
        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const distanceSquared = dx * dx + dy * dy;
        const mouseRadiusSquared = mouse.radius * mouse.radius;

        if (distanceSquared < mouseRadiusSquared) {
          const distance = Math.sqrt(distanceSquared) || 1;
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);

          dot.x += Math.cos(angle) * force * 2;
          dot.y += Math.sin(angle) * force * 2;
        }

        dot.x += dot.dx * 0.5 + (mouse.x / width - 0.5) * 0.04;
        dot.y += dot.dy * 0.5 + (mouse.y / height - 0.5) * 0.04;

        if (dot.x < 0 || dot.x > width) dot.dx *= -1;
        if (dot.y < 0 || dot.y > height) dot.dy *= -1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      }

      ctx.strokeStyle = "rgba(150, 220, 255, 0.08)";
      ctx.lineWidth = 1;

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < LINE_DISTANCE_SQUARED) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }
    }

    resize();

    dotsRef.current = Array.from({ length: DOT_COUNT }, () => createDot());

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
      }}
    />
  );
}