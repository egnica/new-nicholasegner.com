"use client";
import { useEffect, useRef } from "react";

export default function SimpleDotsBackground() {
  const canvasRef = useRef(null);
  const dots = [];
  const mouse = { x: 0, y: 0, radius: 80 };
  let width, height;

  useEffect(() => {
    // 🧠 Exit early on touch-only devices or if user prefers reduced motion
    const isTouchOnly = window.matchMedia("(hover: none)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouchOnly || prefersReducedMotion) {
      return;
    }

    const MAX_DOTS = 150;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const colors = ["#5ec6ff", "#84d0ff", "#bde8ff"];

    const createDot = (x, y, randomize = true) => {
      return {
        x: x ?? Math.random() * width,
        y: y ?? Math.random() * height,
        r: Math.random() * 2 + 1,
        dx: randomize ? (Math.random() - 0.5) * 0.5 : 0,
        dy: randomize ? (Math.random() - 0.5) * 0.5 : 0,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    for (let i = 0; i < 100; i++) {
      dots.push(createDot());
    }

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener("click", (e) => {
      const newDots = [];

      for (let i = 0; i < 2; i++) {
        newDots.push(createDot(e.clientX, e.clientY, true));
      }

      // If limit is exceeded, remove oldest
      while (dots.length + newDots.length > MAX_DOTS) {
        dots.shift();
      }

      dots.push(...newDots);
    });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let dot of dots) {
        // Repel from mouse
        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          dot.x += Math.cos(angle) * force * 2;
          dot.y += Math.sin(angle) * force * 2;
        }

        dot.x += dot.dx * 0.5 + (mouse.x / width - 0.5) * 0.05;
        dot.y += dot.dy * 0.5 + (mouse.y / height - 0.5) * 0.05;

        if (dot.x < 0 || dot.x > width) dot.dx *= -1;
        if (dot.y < 0 || dot.y > height) dot.dy *= -1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      }

      // Draw connecting lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(150, 220, 255, 0.1)";
            ctx.lineWidth = 1;
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none", // keep your content clickable
      }}
    />
  );
}
