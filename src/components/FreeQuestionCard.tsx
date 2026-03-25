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
        {isTma ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            style={{ marginBottom: 32 }}
          >
            <p
              style={{
                fontSize: 22,
                fontWeight: 400,
                lineHeight: 1.42,
                fontFamily: "'Zodiak', Georgia, serif",
                color: "var(--tg-theme-text-color, #F5F5F5)",
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              {question.text}
            </p>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-[family-name:var(--font-dm-sans)] text-xl md:text-2xl leading-relaxed mb-8"
            style={{ color: "white" }}
          >
            {question.text}
          </motion.p>
        )}

        {/* Options grid */}
        <div className={isTma ? "flex flex-col gap-2.5" : "grid grid-cols-1 md:grid-cols-2 gap-3"}>
          {question.options.map((option, i) => {
            const isSelected = selectedOption === option.id;
            const isFaded = selectedOption !== null && !isSelected;

            if (isTma) {
              return (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{
                    opacity: isFaded ? 0.35 : 1,
                    y: 0,
                    scale: isSelected ? 1.0 : isFaded ? 0.98 : 1,
                  }}
                  whileTap={!selectedOption ? { scale: 0.96 } : {}}
                  transition={{
                    delay: i * 0.04,
                    duration: 0.25,
                    scale: { type: "spring", stiffness: 500, damping: 28 },
                  }}
                  onClick={() => handleSelect(option.id)}
                  disabled={selectedOption !== null}
                  style={{
                    textAlign: "left",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: isSelected
                      ? "1.5px solid var(--tg-theme-accent-text-color, var(--tg-theme-button-color, #7C93E8))"
                      : "1px solid var(--tg-theme-section-separator-color, rgba(255,255,255,0.08))",
                    background: isSelected
                      ? "var(--tg-theme-section-bg-color, rgba(255,255,255,0.08))"
                      : "var(--tg-theme-secondary-bg-color, rgba(255,255,255,0.04))",
                    cursor: selectedOption !== null ? "default" : "pointer",
                    transition: "background 180ms, border-color 180ms",
                  }}
                >
                  <span className="flex items-center" style={{ gap: 12 }}>
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: 12,
                        fontWeight: 600,
                        background: isSelected
                          ? "var(--tg-theme-accent-text-color, var(--tg-theme-button-color, #7C93E8))"
                          : "transparent",
                        color: isSelected
                          ? "var(--tg-theme-button-text-color, #fff)"
                          : "var(--tg-theme-hint-color, rgba(255,255,255,0.35))",
                        border: isSelected
                          ? "none"
                          : "1.5px solid var(--tg-theme-hint-color, rgba(255,255,255,0.15))",
                        transition: "all 180ms",
                      }}
                    >
                      {isSelected ? "✓" : OPTION_LABELS[i]}
                    </span>
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 450,
                        lineHeight: 1.45,
                        color: isSelected
                          ? "var(--tg-theme-text-color, #F5F5F5)"
                          : "var(--tg-theme-subtitle-text-color, var(--tg-theme-text-color, rgba(255,255,255,0.7)))",
                        transition: "color 180ms",
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
