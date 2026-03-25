"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const bullets = [
  "Почему ты реагируешь так а не иначе",
  "Какие убеждения из детства управляют тобой",
  "Что с этим делать — конкретно",
];

export default function TmaOnboardingPage() {
  const router = useRouter();

  return (
    <div className="min-h-dvh bg-[#050505] flex items-center justify-center px-6">
      <div className="max-w-sm w-full flex flex-col items-center text-center">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[#f97316] text-xs font-mono uppercase tracking-widest mb-6"
        >
          Psyche Scan
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 80 }}
          className="text-white text-3xl font-bold leading-tight mb-8"
        >
          Узнай почему ты такой
        </motion.h1>

        {/* Bullets */}
        <div className="flex flex-col gap-4 w-full mb-10">
          {bullets.map((bullet, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              className="flex items-start gap-3 text-left"
            >
              <span className="mt-1 w-2 h-2 rounded-full bg-[#f97316] shrink-0" />
              <span className="text-white/70 text-base leading-snug">{bullet}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.75,
            type: "spring",
            stiffness: 120,
            damping: 14,
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/tma/free/test")}
          className="w-full bg-[#f97316] text-white font-semibold text-lg py-4 rounded-2xl cursor-pointer hover:brightness-110 transition-all"
        >
          Начать (5 минут)
        </motion.button>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-white/30 text-sm mt-4"
        >
          Бесплатно · Без регистрации · Результат сразу
        </motion.p>
      </div>
    </div>
  );
}
