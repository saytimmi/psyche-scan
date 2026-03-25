"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TmaAnalysisAnimationProps {
  onComplete: () => void;
}

const AXES = [
  "Привязанность",
  "Стресс",
  "Мотивация",
  "Защита",
  "Детство",
];

const LINES = [
  "Анализирую 25 ответов...",
  "Выявляю паттерны...",
  "Сравниваю с базой...",
  "Генерирую профиль...",
];

// Pentagon geometry helpers
const NUM_AXES = 5;
const RADAR_SIZE = 110; // radius of the outer pentagon
const CENTER = { x: 140, y: 140 };

function polarToCartesian(radius: number, angleIndex: number, total: number) {
  const angle = (Math.PI * 2 * angleIndex) / total - Math.PI / 2;
  return {
    x: CENTER.x + radius * Math.cos(angle),
    y: CENTER.y + radius * Math.sin(angle),
  };
}

function makePentagonPath(radius: number) {
  const points = Array.from({ length: NUM_AXES }, (_, i) =>
    polarToCartesian(radius, i, NUM_AXES)
  );
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
}

// Full fill path for the animated data area (uses same shape as outer pentagon but slightly smaller)
const FILL_RADIUS = RADAR_SIZE * 0.72;
const fillPath = makePentagonPath(FILL_RADIUS);

export function TmaAnalysisAnimation({ onComplete }: TmaAnalysisAnimationProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [visibleChecks, setVisibleChecks] = useState<boolean[]>([false, false, false, false]);
  const [progress, setProgress] = useState(0);
  const [showFill, setShowFill] = useState(false);
  const [drawnAxes, setDrawnAxes] = useState(0);
  // Axis draw-in: one per second starting at 0.2s
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < NUM_AXES; i++) {
      timers.push(
        setTimeout(() => setDrawnAxes((prev) => prev + 1), 200 + i * 300)
      );
    }
    // Show fill after all axes drawn
    timers.push(
      setTimeout(() => setShowFill(true), 200 + NUM_AXES * 300 + 100)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Text lines: appear at 1s, 2s, 3s, 4s
  useEffect(() => {
    const timers = [
      setTimeout(() => {
        setVisibleLines(1);
      }, 1000),
      setTimeout(() => {
        setVisibleLines(2);
        setVisibleChecks((c) => [true, ...c.slice(1)]);
      }, 2000),
      setTimeout(() => {
        setVisibleLines(3);
        setVisibleChecks((c) => [c[0], true, ...c.slice(2)]);
      }, 3000),
      setTimeout(() => {
        setVisibleLines(4);
        setVisibleChecks((c) => [c[0], c[1], true, c[3]]);
      }, 4000),
      setTimeout(() => {
        setVisibleChecks(() => [true, true, true, true]);
      }, 4200),
      setTimeout(() => onComplete(), 4500),
    ];
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Progress counter: 0 → 100 over 4s
  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const duration = 4000;
    function tick(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-6 py-10"
      style={{ background: "#0D0A1E" }}
    >
      {/* Radar / Pentagon SVG */}
      <div className="relative flex items-center justify-center mb-8">
        <svg width={280} height={280} viewBox="0 0 280 280">
          {/* Background grid rings */}
          {[0.25, 0.5, 0.75, 1].map((scale, i) => (
            <path
              key={i}
              d={makePentagonPath(RADAR_SIZE * scale)}
              fill="none"
              stroke="rgba(124,58,237,0.12)"
              strokeWidth={1}
            />
          ))}

          {/* Axis lines drawn one by one */}
          {Array.from({ length: NUM_AXES }, (_, i) => {
            const outer = polarToCartesian(RADAR_SIZE, i, NUM_AXES);
            return (
              <motion.line
                key={i}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={outer.x}
                y2={outer.y}
                stroke="#7C3AED"
                strokeWidth={1.5}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  drawnAxes > i
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            );
          })}

          {/* Outer pentagon border, drawn after axes */}
          <motion.path
            d={makePentagonPath(RADAR_SIZE)}
            fill="none"
            stroke="#7C3AED"
            strokeWidth={1.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={drawnAxes >= NUM_AXES ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          {/* Filled area with violet glow */}
          {showFill && (
            <motion.path
              d={fillPath}
              fill="rgba(124,58,237,0.15)"
              stroke="rgba(167,139,250,0.5)"
              strokeWidth={1.5}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          )}

          {/* Axis vertex dots */}
          {Array.from({ length: NUM_AXES }, (_, i) => {
            const pt = polarToCartesian(RADAR_SIZE, i, NUM_AXES);
            return (
              <motion.circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r={3}
                fill="#A78BFA"
                initial={{ scale: 0, opacity: 0 }}
                animate={drawnAxes > i ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.25, delay: 0.1 }}
              />
            );
          })}

          {/* Axis labels */}
          {AXES.map((label, i) => {
            const labelRadius = RADAR_SIZE + 22;
            const pt = polarToCartesian(labelRadius, i, NUM_AXES);
            return (
              <motion.text
                key={i}
                x={pt.x}
                y={pt.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={9}
                fill="rgba(255,255,255,0.6)"
                fontFamily="DM Sans, sans-serif"
                initial={{ opacity: 0 }}
                animate={drawnAxes > i ? { opacity: 1 } : {}}
                transition={{ duration: 0.4 }}
              >
                {label}
              </motion.text>
            );
          })}
        </svg>
      </div>

      {/* Analysis lines */}
      <div className="w-full max-w-xs flex flex-col gap-3 mb-8">
        {LINES.map((line, i) =>
          i < visibleLines ? (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: [0.65, 0.05, 0, 1] }}
              className="flex items-center justify-between"
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                {line}
              </span>
              {visibleChecks[i] && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2, type: "spring" }}
                  style={{ color: "#10B981", fontSize: 14, marginLeft: 8 }}
                >
                  ✓
                </motion.span>
              )}
            </motion.div>
          ) : null
        )}
      </div>

      {/* Progress counter */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: "#A78BFA",
          fontFamily: "JetBrains Mono, monospace",
          letterSpacing: "0.02em",
        }}
      >
        {progress}%
      </motion.p>
    </div>
  );
}
