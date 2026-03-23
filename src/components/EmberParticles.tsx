"use client";

import { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
}

export default function EmberParticles({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
    }

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const w = () => canvas.getBoundingClientRect().width;
    const h = () => canvas.getBoundingClientRect().height;

    const particles: Particle[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      r: 0.5 + Math.random() * 2,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -(0.1 + Math.random() * 0.4),
      opacity: 0.03 + Math.random() * 0.15,
      color: Math.random() > 0.5 ? "#f97316" : "#dc2626",
    }));

    function animate() {
      const cw = w();
      const ch = h();

      ctx!.clearRect(0, 0, cw, ch);

      for (const p of particles) {
        // Core circle
        ctx!.globalAlpha = p.opacity;
        ctx!.fillStyle = p.color;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();

        // Glow circle
        ctx!.globalAlpha = p.opacity * 0.2;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx!.fill();

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap vertically
        if (p.y < -10) {
          p.y = ch + 10;
        }

        // Wrap horizontally
        if (p.x < -10) {
          p.x = cw + 10;
        } else if (p.x > cw + 10) {
          p.x = -10;
        }
      }

      ctx!.globalAlpha = 1;

      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
