/**
 * FREE LEAD MAGNET — Test flow (25 questions)
 * Route: /free/test
 * After completion → redirects to /free/result
 */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { freeQuestions } from "@/data/free-questions";
import { scoreFreeProfile } from "@/lib/free-scoring";
import { FreeQuestionCard } from "@/components/FreeQuestionCard";

export default function FreeTestPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<"intro" | "questions" | "done">("intro");
  const router = useRouter();

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

  const handleAnswer = (questionId: string, optionId: string) => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);
    localStorage.setItem("psyche_free_answers", JSON.stringify(newAnswers));

    if (currentIndex < freeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      localStorage.setItem("psyche_free_index", String(currentIndex + 1));
    } else {
      // Last question — score and redirect
      const profile = scoreFreeProfile(newAnswers);
      localStorage.setItem("psyche_free_profile", JSON.stringify(profile));
      router.push("/free/result");
    }
  };

  return (
    <div className="min-h-dvh bg-[#0A0A0A] flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 w-full">
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
              className="font-[family-name:var(--font-dm-sans)] text-xl md:text-2xl text-white/90 leading-relaxed mb-3"
            >
              5 минут. 25 ситуаций. Без воды.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-[family-name:var(--font-dm-sans)] text-base text-white/50 mb-10"
            >
              Выбирай что ближе — правильных ответов нет.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              onClick={() => setPhase("questions")}
              className="bg-[#D2FF00] text-black font-medium px-8 py-3 rounded-xl cursor-pointer hover:brightness-110 transition-all"
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
