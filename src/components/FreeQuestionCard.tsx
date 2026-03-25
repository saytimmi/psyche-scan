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
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              padding: "24px 22px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
              marginBottom: "24px",
            }}
          >
            <p
              style={{
                fontSize: 18,
                fontWeight: 400,
                lineHeight: 1.55,
                fontFamily: "var(--font-manrope), system-ui",
                color: "rgba(255,255,255,0.92)",
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isFaded ? 0.3 : 1,
                    y: 0,
                    scale: isSelected ? 1.02 : isFaded ? 0.96 : 1,
                  }}
                  whileHover={!selectedOption ? { scale: 1.02, borderColor: "rgba(124,58,237,0.4)" } : {}}
                  whileTap={!selectedOption ? { scale: 0.97 } : {}}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.25,
                    scale: { type: "spring", stiffness: 400, damping: 25 },
                  }}
                  onClick={() => handleSelect(option.id)}
                  disabled={selectedOption !== null}
                  style={{
                    textAlign: "left",
                    padding: "18px 20px",
                    borderRadius: "16px",
                    border: isSelected
                      ? "1.5px solid rgba(124,58,237,0.8)"
                      : "1px solid rgba(255,255,255,0.06)",
                    background: isSelected
                      ? "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(124,58,237,0.05))"
                      : "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    cursor: selectedOption !== null ? "default" : "pointer",
                    boxShadow: isSelected
                      ? "0 0 24px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.06)"
                      : "inset 0 1px 0 rgba(255,255,255,0.04)",
                    transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: 12,
                        fontWeight: 600,
                        fontFamily: "var(--font-manrope), system-ui",
                        background: isSelected
                          ? "rgba(124,58,237,0.3)"
                          : "rgba(255,255,255,0.06)",
                        color: isSelected ? "#C4B5FD" : "rgba(255,255,255,0.35)",
                        border: isSelected
                          ? "1px solid rgba(124,58,237,0.5)"
                          : "1px solid rgba(255,255,255,0.08)",
                        transition: "all 250ms",
                      }}
                    >
                      {OPTION_LABELS[i]}
                    </span>
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 400,
                        lineHeight: 1.5,
                        fontFamily: "var(--font-manrope), system-ui",
                        color: isSelected ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.75)",
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
