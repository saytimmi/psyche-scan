"use client";

import { motion } from "framer-motion";

interface ResultScreenProps {
  children: React.ReactNode;
  onNext?: () => void;
  nextLabel?: string;
  className?: string;
}

export function ResultScreen({
  children,
  onNext,
  nextLabel = "Дальше",
  className,
}: ResultScreenProps) {
  return (
    <div
      className={`min-h-dvh bg-[#0A0A0A] flex flex-col items-center justify-center px-6 ${className ?? ""}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.65, 0.05, 0, 1] }}
        className="max-w-2xl w-full"
      >
        {children}
      </motion.div>

      {onNext && (
        <button
          onClick={onNext}
          className="fixed bottom-8 bg-[#D2FF00] text-black font-medium px-8 py-3 rounded-xl hover:scale-[0.98] transition cursor-pointer"
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}
