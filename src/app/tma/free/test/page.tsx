"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { freeQuestions } from "@/data/free-questions";
import { scoreFreeProfile } from "@/lib/free-scoring";
import { FreeQuestionCard } from "@/components/FreeQuestionCard";
import { useTma } from "@/app/tma/components/TmaProvider";

interface Revelation {
  headline: string;
  body: string;
}

const REVELATIONS: Record<number, Revelation> = {
  8: {
    headline: "Интересно...",
    body: "По первым ответам уже вижу —\nты принимаешь решения эмоционально,\nа потом рационализируешь.\n\nУгадал?",
  },
  16: {
    headline: "Необычная комбинация.",
    body: "Только 4% людей отвечают\nна вопросы 3 и 7 так же как ты.\n\nЭто говорит кое-что о том,\nкак ты справляешься с потерями.",
  },
};

export default function TmaFreeTestPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showRevelation, setShowRevelation] = useState<Revelation | null>(null);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const router = useRouter();
  const { initDataRaw } = useTma();

  useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const savedAnswers = localStorage.getItem("psyche_free_answers");
    const savedIndex = localStorage.getItem("psyche_free_index");
    if (savedAnswers && savedIndex) {
      setAnswers(JSON.parse(savedAnswers));
      setCurrentIndex(parseInt(savedIndex));
    }
  }, []);

  const dismissRevelation = useCallback(() => {
    setShowRevelation(null);
    if (pendingIndex !== null) {
      setCurrentIndex(pendingIndex);
      setPendingIndex(null);
    }
  }, [pendingIndex]);

  useEffect(() => {
    if (!showRevelation) return;
    const timer = setTimeout(dismissRevelation, 2500);
    return () => clearTimeout(timer);
  }, [showRevelation, dismissRevelation]);

  const handleAnswer = async (questionId: string, optionId: string) => {
    // Haptic feedback
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tg = (window as any).Telegram;
      tg?.WebApp?.HapticFeedback?.impactOccurred?.("light");
    } catch { /* outside TG */ }

    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);
    localStorage.setItem("psyche_free_answers", JSON.stringify(newAnswers));

    const nextIndex = currentIndex + 1;

    if (currentIndex < freeQuestions.length - 1) {
      localStorage.setItem("psyche_free_index", String(nextIndex));

      const questionNumber = currentIndex + 1;
      const revelation = REVELATIONS[questionNumber];
      if (revelation) {
        setPendingIndex(nextIndex);
        setShowRevelation(revelation);
      } else {
        setCurrentIndex(nextIndex);
      }
    } else {
      const profile = scoreFreeProfile(newAnswers);
      localStorage.setItem("psyche_free_profile", JSON.stringify(profile));

      if (initDataRaw) {
        fetch("/api/tma/answers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: newAnswers, initData: initDataRaw }),
        }).catch(() => {});
      }

      router.push("/tma/free/result");
    }
  };

  const progress = currentIndex / freeQuestions.length;

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Progress — thin native-feeling bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: 2,
          background: "var(--tg-theme-secondary-bg-color, rgba(255,255,255,0.06))",
        }}
      >
        <motion.div
          className="h-full"
          style={{
            background: "var(--tg-theme-accent-text-color, var(--tg-theme-button-color, #7C93E8))",
            borderRadius: "0 1px 1px 0",
          }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 22 }}
        />
      </div>

      {/* Counter — minimal */}
      <div
        className="fixed top-1.5 right-4 z-50"
        style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.04em",
          color: "var(--tg-theme-hint-color, rgba(255,255,255,0.35))",
        }}
      >
        {currentIndex + 1}/{freeQuestions.length}
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center px-5 pt-10 pb-8">
        <div className="w-full">
          {freeQuestions[currentIndex] && (
            <AnimatePresence mode="wait">
              <FreeQuestionCard
                key={currentIndex}
                question={freeQuestions[currentIndex]}
                questionIndex={currentIndex}
                totalQuestions={freeQuestions.length}
                onAnswer={handleAnswer}
                variant="tma"
              />
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Micro-revelation */}
      <AnimatePresence>
        {showRevelation && (
          <motion.div
            key="revelation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "var(--tg-theme-bg-color, #0F0F0F)",
            }}
            onClick={dismissRevelation}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="text-center px-8 max-w-xs"
            >
              <p
                style={{
                  fontSize: 28,
                  fontWeight: 400,
                  fontFamily: "'Zodiak', Georgia, serif",
                  color: "var(--tg-theme-accent-text-color, var(--tg-theme-button-color, #7C93E8))",
                  marginBottom: 14,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                {showRevelation.headline}
              </p>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 400,
                  color: "var(--tg-theme-hint-color, rgba(255,255,255,0.5))",
                  lineHeight: 1.65,
                  whiteSpace: "pre-line",
                }}
              >
                {showRevelation.body}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
