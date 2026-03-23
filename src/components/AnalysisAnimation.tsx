"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnalysisAnimationProps {
  onComplete: () => void;
}

const lines = [
  "Анализируем 25 ответов...",
  "Сопоставляем с 22 клиническими моделями...",
  "Ищем противоречия...",
  "Строим твой профиль...",
];

export function AnalysisAnimation({ onComplete }: AnalysisAnimationProps) {
  const [visibleLines, setVisibleLines] = useState(1);

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleLines(2), 1000),
      setTimeout(() => setVisibleLines(3), 2000),
      setTimeout(() => setVisibleLines(4), 3000),
      setTimeout(() => onComplete(), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="min-h-dvh bg-[#0A0A0A] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Pulsing circle */}
        <div
          className="w-24 h-24 rounded-full border-2 border-[#D2FF00] animate-pulse"
          style={{
            boxShadow: "0 0 40px rgba(210, 255, 0, 0.15), 0 0 80px rgba(210, 255, 0, 0.05)",
          }}
        />

        {/* Text lines */}
        <div className="flex flex-col items-center gap-3 mt-4">
          {lines.map((line, i) =>
            i < visibleLines ? (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.65, 0.05, 0, 1] }}
                className="font-mono text-sm text-white/50"
              >
                {line}
              </motion.p>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
