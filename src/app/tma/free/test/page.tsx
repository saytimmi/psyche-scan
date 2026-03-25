"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { freeQuestions } from "@/data/free-questions";
import { scoreFreeProfile } from "@/lib/free-scoring";
import { FreeQuestionCard } from "@/components/FreeQuestionCard";
import { useTma } from "@/app/tma/components/TmaProvider";

export default function TmaFreeTestPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<"intro" | "questions" | "done">("intro");
  const router = useRouter();
  const { initDataRaw } = useTma();

  // Resume from localStorage
  useEffect(() => {
    const savedAnswers = localStorage.getItem("psyche_free_answers");
    const savedIndex = localStorage.getItem("psyche_free_index");
    if (savedAnswers && savedIndex) {
      setAnswers(JSON.parse(savedAnswers));
      setCurrentIndex(parseInt(savedIndex));
      setPhase("questions");
    }
  }, []);

  const handleAnswer = async (questionId: string, optionId: string) => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);
    localStorage.setItem("psyche_free_answers", JSON.stringify(newAnswers));

    if (currentIndex < freeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      localStorage.setItem("psyche_free_index", String(currentIndex + 1));
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

  const progressPercent =
    phase === "questions"
      ? Math.round((currentIndex / freeQuestions.length) * 100)
      : 0;

  return (
    <div className="min-h-dvh bg-[#050505] flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 w-full">
        {/* Progress bar (top) */}
        {phase === "questions" && (
          <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
            <motion.div
              className="h-full bg-[#f97316]"
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </div>
        )}

        {/* Intro phase */}
        {phase === "intro" && (
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white/90 leading-relaxed mb-3"
            >
              5 минут. 25 ситуаций. Без воды.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base text-white/50 mb-10"
            >
              Выбирай что ближе — правильных ответов нет.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setPhase("questions")}
              className="bg-[#f97316] text-white font-semibold px-8 py-4 rounded-2xl cursor-pointer hover:brightness-110 transition-all"
            >
              Начать
            </motion.button>
          </motion.div>
        )}

        {/* Questions phase */}
        {phase === "questions" && freeQuestions[currentIndex] && (
          <AnimatePresence mode="wait">
            <FreeQuestionCard
              key={currentIndex}
              question={freeQuestions[currentIndex]}
              questionIndex={currentIndex}
              totalQuestions={freeQuestions.length}
              onAnswer={handleAnswer}
            />
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
