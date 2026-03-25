"use client";

import { FreeQuestion } from "@/data/free-questions";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const OPTION_LABELS = ["А", "Б", "В", "Г"] as const;

interface FreeQuestionCardProps {
  question: FreeQuestion;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (questionId: string, optionId: string) => void | Promise<void>;
  variant?: "default" | "tma";
}

export function FreeQuestionCard({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
  variant = "default",
}: FreeQuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const isTma = variant === "tma";

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
        {/* Progress bar — only shown in default (web) variant */}
        {!isTma && (
          <div className="w-full h-1 bg-white/5 rounded-full mb-8 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: "#D2FF00" }}
              animate={{ width: `${(questionIndex / totalQuestions) * 100}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </div>
        )}

        {/* Question text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-[family-name:var(--font-dm-sans)] text-xl md:text-2xl leading-relaxed mb-8"
          style={{
            color: isTma ? "rgba(255,255,255,0.92)" : "white",
          }}
        >
          {question.text}
        </motion.p>

        {/* Options grid */}
        <div className={isTma ? "flex flex-col gap-3" : "grid grid-cols-1 md:grid-cols-2 gap-3"}>
          {question.options.map((option, i) => {
            const isSelected = selectedOption === option.id;
            const isFaded = selectedOption !== null && !isSelected;

            if (isTma) {
              return (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: isFaded ? 0.4 : 1,
                    y: 0,
                    scale: isSelected ? 1.0 : isFaded ? 0.98 : 1,
                  }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.2,
                    ease: "easeOut",
                    scale: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  onClick={() => handleSelect(option.id)}
                  disabled={selectedOption !== null}
                  style={{
                    minHeight: "72px",
                    textAlign: "left",
                    padding: "16px 20px",
                    borderRadius: "14px",
                    border: isSelected
                      ? "1px solid #7C3AED"
                      : "1px solid rgba(255,255,255,0.08)",
                    background: isSelected
                      ? "rgba(124,58,237,0.12)"
                      : "rgba(20,16,48,0.75)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    cursor: selectedOption !== null ? "default" : "pointer",
                    boxShadow: isSelected
                      ? "0 0 16px rgba(124,58,237,0.25)"
                      : "none",
                    transition: "border-color 200ms ease-out, background 200ms ease-out, box-shadow 200ms ease-out",
                  }}
                >
                  <span className="flex items-start">
                    <span
                      style={{
                        fontFamily: "monospace",
                        marginRight: "12px",
                        flexShrink: 0,
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#A78BFA",
                      }}
                    >
                      {OPTION_LABELS[i]}
                    </span>
                    <span
                      className="font-[family-name:var(--font-dm-sans)]"
                      style={{
                        fontSize: "15px",
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.92)",
                      }}
                    >
                      {option.text}
                    </span>
                  </span>
                </motion.button>
              );
            }

            // Default (web) variant
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
