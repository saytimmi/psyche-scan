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

  // Timer — counts up every second
  useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

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
      className="min-h-dvh flex flex-col"
      style={{ backgroundColor: "#F5F0E8" }}
    >
      {/* Fixed top progress bar — thin, terracotta */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{ height: "3px", backgroundColor: "rgba(26,23,20,0.08)" }}
      >
        <motion.div
          className="h-full"
          style={{ backgroundColor: "#C2814B", borderRadius: "0 2px 2px 0" }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        />
      </div>

      {/* Timer + counter */}
      <div
        className="fixed top-2 left-0 right-0 z-50 flex justify-between px-5"
        style={{
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          color: "rgba(26,23,20,0.35)",
          fontFamily: "'General Sans', system-ui",
        }}
      >
        <span>{Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")}</span>
        <span>{currentIndex + 1} / {freeQuestions.length}</span>
      </div>

      {/* Questions — vertically centered */}
      <div className="flex-1 flex items-center justify-center px-5 pt-8 pb-6">
        <div className="w-full max-w-md">
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

      {/* Micro-revelation overlay */}
      <AnimatePresence>
        {showRevelation && (
          <motion.div
            key="revelation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              backgroundColor: "rgba(245,240,232,0.92)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
            onClick={dismissRevelation}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="text-center px-8 max-w-xs"
            >
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: 400,
                  fontFamily: "'Zodiak', Georgia, serif",
                  color: "#C2814B",
                  marginBottom: "16px",
                  letterSpacing: "-0.02em",
                }}
              >
                {showRevelation.headline}
              </p>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: 400,
                  fontFamily: "'General Sans', system-ui",
                  color: "rgba(26,23,20,0.7)",
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
