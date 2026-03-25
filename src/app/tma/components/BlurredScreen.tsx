"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface BlurredScreenProps {
  children: ReactNode;
  screenNumber: number;
  totalScreens?: number;
}

export function BlurredScreen({
  children,
  screenNumber,
  totalScreens = 9,
}: BlurredScreenProps) {
  return (
    <div className="relative w-full">
      {/* Blurred content */}
      <div className="blur-md pointer-events-none select-none">{children}</div>

      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm bg-[#050505]/70 rounded-2xl px-6 py-8"
      >
        <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-3">
          Экран {screenNumber} из {totalScreens}
        </p>
        <p className="text-white text-xl font-bold text-center mb-6">
          Разблокируй полный результат
        </p>
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full max-w-xs bg-[#f97316] text-white font-semibold text-base py-4 rounded-2xl cursor-pointer hover:brightness-110 transition-all"
        >
          Открыть полный результат — 699₽
        </motion.button>
      </motion.div>
    </div>
  );
}
