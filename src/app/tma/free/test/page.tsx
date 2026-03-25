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
  const router = useRouter();
  const { initDataRaw } = useTma();

  // Resume from localStorage
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

  // Auto-dismiss revelation after 2.5s
  useEffect(() => {
    if (!showRevelation) return;
    const timer = setTimeout(dismissRevelation, 2500);
    return () => clearTimeout(timer);
  }, [showRevelation, dismissRevelation]);

  const handleAnswer = async (questionId: string, optionId: string) => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);
    localStorage.setItem("psyche_free_answers", JSON.stringify(newAnswers));

    const nextIndex = currentIndex + 1;

    if (currentIndex < freeQuestions.length - 1) {
      localStorage.setItem("psyche_free_index", String(nextIndex));

      // Check if we should show a micro-revelation after this question (1-based check)
      const questionNumber = currentIndex + 1; // question 1 = index 0
      const revelation = REVELATIONS[questionNumber];
      if (revelation) {
        setPendingIndex(nextIndex);
        setShowRevelation(revelation);
      } else {
        setCurrentIndex(nextIndex);
      }
    } else {
      // Last question — score and save
      const profile = scoreFreeProfile(newAnswers);
      localStorage.setItem("psyche_free_profile", JSON.stringify(profile));

      // POST answers to TMA API endpoint in background
      if (initDataRaw) {
        fetch("/api/tma/answers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: newAnswers, initData: initDataRaw }),
        }).catch(() => {
          // Non-critical — ignore errors
        });
      }

      router.push("/tma/free/result");
    }
  };

  const progressPercent = Math.round(
    (currentIndex / freeQuestions.length) * 100
  );

  return (
    <div
      className="min-h-dvh flex items-center justify-center"
      style={{ backgroundColor: "#0D0A1E" }}
    >
      {/* Fixed top progress bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{ height: "3px", backgroundColor: "rgba(255,255,255,0.08)" }}
      >
        <motion.div
          className="h-full"
          style={{ backgroundColor: "#7C3AED" }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>

      {/* Question counter */}
      <div
        className="fixed top-2 right-4 z-50"
        style={{
          fontSize: "13px",
          fontWeight: 300,
          color: "rgba(255,255,255,0.40)",
        }}
      >
        {currentIndex + 1} / {freeQuestions.length}
      </div>

      {/* Questions */}
      <div className="max-w-2xl mx-auto px-6 w-full pt-8">
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

      {/* Micro-revelation overlay */}
      <AnimatePresence>
        {showRevelation && (
          <motion.div
            key="revelation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              backgroundColor: "rgba(13,10,30,0.90)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
            onClick={dismissRevelation}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1.0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="text-center px-8 max-w-sm"
            >
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#7C3AED",
                  marginBottom: "20px",
                }}
              >
                {showRevelation.headline}
              </p>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.92)",
                  lineHeight: 1.6,
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
