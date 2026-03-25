"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface BlurredScreenProps {
  children: ReactNode;
  screenNumber?: number;
  totalScreens?: number;
  title?: string;
  teaser?: string;
  onClick?: () => void;
}

const COUNTDOWN_SECONDS = 48 * 60; // 48 minutes

function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export function BlurredScreen({
  children,
  title = "Разблокируй полный результат",
  teaser,
  onClick,
}: BlurredScreenProps) {
  const countdown = useCountdown(COUNTDOWN_SECONDS);

  return (
    <div className="relative w-full">
      {/* Blurred content behind */}
      <div
        style={{ filter: "blur(20px)", pointerEvents: "none", userSelect: "none" }}
      >
        {children}
      </div>

      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(13,10,30,0.80)",
          backdropFilter: "blur(8px)",
          borderRadius: 16,
          padding: "32px 24px",
          gap: 0,
        }}
      >
        {/* Urgency timer */}
        <p
          style={{
            fontSize: 12,
            fontWeight: 400,
            color: "rgba(255,255,255,0.40)",
            marginBottom: 16,
            letterSpacing: "0.02em",
          }}
        >
          Результат удалится через{" "}
          <span style={{ color: "rgba(255,255,255,0.70)", fontWeight: 500 }}>
            {countdown}
          </span>
        </p>

        {/* Title */}
        <p
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "rgba(255,255,255,0.92)",
            textAlign: "center",
            marginBottom: teaser ? 10 : 20,
            lineHeight: 1.2,
          }}
        >
          {title}
        </p>

        {/* Teaser */}
        {teaser && (
          <p
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: "rgba(255,255,255,0.55)",
              textAlign: "center",
              marginBottom: 20,
              lineHeight: 1.5,
            }}
          >
            {teaser}
          </p>
        )}

        {/* Social proof */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#10B981",
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: "rgba(255,255,255,0.50)",
            }}
          >
            2&nbsp;847 человек разблокировали сегодня
          </p>
        </div>

        {/* Price with anchor */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: "rgba(255,255,255,0.35)",
              textDecoration: "line-through",
            }}
          >
            1990₽
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            699₽
          </span>
        </div>

        {/* CTA button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onClick}
          style={{
            width: "100%",
            maxWidth: 320,
            height: 48,
            background: "#7C3AED",
            color: "#fff",
            fontWeight: 600,
            fontSize: 16,
            border: "none",
            borderRadius: 16,
            cursor: "pointer",
            fontFamily: "inherit",
            marginBottom: 10,
            boxShadow: "0 0 20px rgba(124,58,237,0.35)",
          }}
        >
          Разблокировать — 699₽
        </motion.button>

        {/* Payment hint */}
        <p
          style={{
            fontSize: 12,
            fontWeight: 300,
            color: "rgba(255,255,255,0.30)",
          }}
        >
          Telegram Stars · Моментальный доступ
        </p>
      </motion.div>
    </div>
  );
}
