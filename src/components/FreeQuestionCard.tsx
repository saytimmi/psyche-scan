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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            style={{ marginBottom: "28px" }}
          >
            <p
              style={{
                fontSize: 21,
                fontWeight: 400,
                lineHeight: 1.45,
                fontFamily: "'Zodiak', Georgia, serif",
                color: "#1A1714",
                letterSpacing: "-0.01em",
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
        <div className={isTma ? "flex flex-col gap-2" : "grid grid-cols-1 md:grid-cols-2 gap-3"}>
          {question.options.map((option, i) => {
            const isSelected = selectedOption === option.id;
            const isFaded = selectedOption !== null && !isSelected;

            if (isTma) {
              return (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{
                    opacity: isFaded ? 0.4 : 1,
                    y: 0,
                    scale: isSelected ? 1.0 : isFaded ? 0.98 : 1,
                  }}
                  whileTap={!selectedOption ? { scale: 0.97 } : {}}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.3,
                    scale: { type: "spring", stiffness: 500, damping: 30 },
                  }}
                  onClick={() => handleSelect(option.id)}
                  disabled={selectedOption !== null}
                  style={{
                    textAlign: "left",
                    padding: "16px 18px",
                    borderRadius: "14px",
                    border: isSelected
                      ? "1.5px solid #C2814B"
                      : "1px solid rgba(26,23,20,0.08)",
                    background: isSelected
                      ? "#EDE3D4"
                      : "#FFFDF9",
                    cursor: selectedOption !== null ? "default" : "pointer",
                    boxShadow: isSelected
                      ? "0 2px 12px rgba(194,129,75,0.12)"
                      : "0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
                    transition: "background 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Left accent bar on selection */}
                  {isSelected && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.2, delay: 0.05 }}
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 6,
                        bottom: 6,
                        width: 3,
                        borderRadius: 2,
                        backgroundColor: "#C2814B",
                        transformOrigin: "top",
                      }}
                    />
                  )}
                  <span className="flex items-center gap-3">
                    <span
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: 11,
                        fontWeight: 600,
                        fontFamily: "'General Sans', system-ui",
                        background: isSelected
                          ? "#C2814B"
                          : "rgba(26,23,20,0.05)",
                        color: isSelected ? "#FFFDF9" : "rgba(26,23,20,0.35)",
                        transition: "all 200ms ease-out",
                      }}
                    >
                      {isSelected ? "✓" : OPTION_LABELS[i]}
                    </span>
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 450,
                        lineHeight: 1.45,
                        fontFamily: "'General Sans', system-ui",
                        color: isSelected ? "#1A1714" : "rgba(26,23,20,0.75)",
                        transition: "color 200ms",
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
