"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const titleWords = ["Я", "знаю", "о", "тебе", "больше,", "чем", "ты", "думаешь"];

export default function TmaOnboardingPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-dvh flex items-center justify-center px-6"
      style={{ background: "transparent" }}
    >
      <div className="max-w-sm w-full flex flex-col items-center text-center">
        {/* Small violet dot icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ marginBottom: 20 }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#7C3AED",
              boxShadow: "0 0 12px rgba(124,58,237,0.6), 0 0 24px rgba(124,58,237,0.3)",
            }}
          />
        </motion.div>

        {/* Brand label */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.2em",
            color: "#7C3AED",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          Psyche Scan
        </motion.p>

        {/* Hero headline — words stagger in */}
        <h1
          style={{
            fontSize: "clamp(34px, 10vw, 44px)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "rgba(255,255,255,0.92)",
            marginBottom: 16,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0 8px",
          }}
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.2 + i * 0.08,
                ease: [0.23, 1, 0.32, 1],
              }}
              style={{ display: "inline-block" }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.95, ease: "easeOut" }}
          style={{
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.60)",
            marginBottom: 40,
          }}
        >
          Не 4 буквы MBTI. А конкретно:
          <br />
          почему ты реагируешь ТАК,
          <br />а не иначе.
        </motion.p>

        {/* CTA button with glow pulse */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
          style={{ width: "100%" }}
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/tma/free/test")}
            style={{
              width: "100%",
              height: 48,
              background: "#7C3AED",
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              border: "none",
              borderRadius: 16,
              cursor: "pointer",
              fontFamily: "inherit",
              animation: "tma-glow-pulse 2.8s ease-in-out infinite",
              transition: "opacity 0.2s",
            }}
          >
            Доказать — 3 минуты
          </motion.button>
        </motion.div>

        {/* Meta hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          style={{
            marginTop: 12,
            fontSize: 13,
            fontWeight: 300,
            color: "rgba(255,255,255,0.40)",
          }}
        >
          Бесплатно · Без регистрации
        </motion.p>
      </div>
    </div>
  );
}
