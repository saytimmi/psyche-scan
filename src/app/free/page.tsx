/**
 * FREE LEAD MAGNET — Landing page
 * Route: /free
 * Standalone page, NOT part of main landing (src/app/page.tsx)
 * Links to: /free/test → /free/result
 */
"use client"
import { motion } from "framer-motion"
import Link from "next/link"

export default function FreeLanding() {
  return (
    <div className="min-h-dvh bg-[#0A0A0A] flex items-center justify-center px-6">
      <div className="max-w-lg w-full">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white text-center leading-tight">
            Узнай свой главный паттерн
          </h1>
          <p className="text-white/50 text-center mt-6 text-lg">
            5 минут. 25 ситуаций. Без воды.
          </p>
          <p className="text-white/30 text-center mt-2">
            Выбирай что ближе — правильных ответов нет
          </p>
        </motion.div>

        <motion.div className="mt-10 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Link href="/free/test" className="inline-block bg-[#D2FF00] text-black font-medium px-10 py-4 rounded-xl text-lg hover:bg-[#D2FF00]/90 transition hover:scale-[0.98]">
            Начать тест
          </Link>
        </motion.div>

        <motion.p className="text-center mt-8 font-mono text-xs text-white/20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          На основе 22 клинических моделей
        </motion.p>
      </div>
    </div>
  )
}
