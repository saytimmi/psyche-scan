"use client";

import { FreeQuestion } from "@/data/free-questions";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const OPTION_LABELS = ["А", "Б", "В", "Г"] as const;

interface FreeQuestionCardProps {
  question: FreeQuestion;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (questionId: string, optionId: string) => void;
}

export function FreeQuestionCard({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
}: FreeQuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (optionId: string) => {
    if (selectedOption) return;
    setSelectedOption(optionId);
    setTimeout(() => {
      onAnswer(question.id, optionId);
    }, 600);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl mx-auto"
      >
        {/* Progress bar */}
        <div className="w-full h-1 bg-white/5 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: "#D2FF00" }}
            animate={{ width: `${(questionIndex / totalQuestions) * 100}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>

        {/* Question text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-[family-name:var(--font-dm-sans)] text-xl md:text-2xl text-white leading-relaxed mb-8"
        >
          {question.text}
        </motion.p>

        {/* Options grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {question.options.map((option, i) => {
            const isSelected = selectedOption === option.id;
            const isFaded = selectedOption !== null && !isSelected;

            return (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: isFaded ? 0.3 : 1,
                  y: 0,
                  scale: isSelected ? 1.02 : 1,
                }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.4,
                  scale: { type: "spring", stiffness: 300, damping: 20 },
                }}
                onClick={() => handleSelect(option.id)}
                disabled={selectedOption !== null}
                className={`
                  text-left p-5 rounded-xl border cursor-pointer
                  transition-colors duration-200
                  ${
                    isSelected
                      ? "border-[#D2FF00] bg-[#D2FF00]/10"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                  }
                  ${selectedOption !== null ? "cursor-default" : ""}
                `}
              >
                <span className="flex items-start">
                  <span
                    className="font-mono mr-3 shrink-0"
                    style={{ color: "#D2FF00" }}
                  >
                    {OPTION_LABELS[i]}
                  </span>
                  <span className="font-[family-name:var(--font-dm-sans)] text-base text-white/80">
                    {option.text}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
