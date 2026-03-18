"use client";

import { Question } from "@/data/questions";
import { motion } from "framer-motion";
import { useState } from "react";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (questionId: string, value: number | string | boolean) => void;
  initialValue?: number | string | boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  initialValue,
}: QuestionCardProps) {
  const [textValue, setTextValue] = useState(
    typeof initialValue === "string" ? initialValue : ""
  );

  const scale = question.scale;
  const min = scale?.min ?? 1;
  const max = scale?.max ?? 5;
  const points = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  const selectedNumber = typeof initialValue === "number" ? initialValue : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Progress */}
      <div className="flex items-center justify-between mb-2 text-xs text-muted">
        <span>
          {questionNumber} / {totalQuestions}
        </span>
        <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
      </div>
      <div className="w-full h-1 bg-surface-2 rounded-full mb-8">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: 0 }}
          animate={{
            width: `${(questionNumber / totalQuestions) * 100}%`,
          }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Question */}
      <h2 className="text-xl md:text-2xl font-medium mb-8 leading-relaxed">
        {question.text}
      </h2>

      {/* Scale answers */}
      {(question.type === "scale" ||
        question.type === "likert7" ||
        question.type === "likert6") && (
        <div className="space-y-4">
          {/* Labels */}
          <div className="flex justify-between text-xs text-muted px-1">
            <span>{scale?.minLabel}</span>
            <span>{scale?.maxLabel}</span>
          </div>
          {/* Buttons */}
          <div className="flex gap-2 justify-center">
            {points.map((point) => (
              <button
                key={point}
                onClick={() => onAnswer(question.id, point)}
                className={`
                  w-12 h-12 md:w-14 md:h-14 rounded-xl text-lg font-medium
                  transition-all duration-200
                  ${
                    selectedNumber === point
                      ? "bg-accent text-white scale-110 shadow-lg shadow-accent/30"
                      : "bg-surface-2 text-muted hover:bg-border hover:text-foreground"
                  }
                `}
              >
                {point}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Boolean answers */}
      {question.type === "boolean" && (
        <div className="flex gap-4 justify-center">
          {[
            { label: "Да", value: true },
            { label: "Нет", value: false },
          ].map(({ label, value }) => (
            <button
              key={label}
              onClick={() => onAnswer(question.id, value)}
              className={`
                px-8 py-4 rounded-xl text-lg font-medium
                transition-all duration-200
                ${
                  initialValue === value
                    ? "bg-accent text-white scale-105 shadow-lg shadow-accent/30"
                    : "bg-surface-2 text-muted hover:bg-border hover:text-foreground"
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Open-ended answers */}
      {question.type === "open" && (
        <div className="space-y-4">
          <textarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Пиши здесь... Чем честнее, тем полезнее результат."
            className="w-full h-40 bg-surface-2 border border-border rounded-xl p-4 text-foreground placeholder:text-muted/50 resize-none focus:outline-none focus:border-accent/50 transition-colors"
          />
          <button
            onClick={() => {
              if (textValue.trim()) onAnswer(question.id, textValue.trim());
            }}
            disabled={!textValue.trim()}
            className="px-6 py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent-dim transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Далее
          </button>
        </div>
      )}

      {/* Choice answers */}
      {question.type === "choice" && (
        <div className="space-y-3">
          {question.id === "rel2" && (
            <>
              {[
                { label: "Атака — иду в конфликт, отстаиваю позицию", value: "fight" },
                { label: "Уход — дистанцируюсь, замыкаюсь", value: "flight" },
                { label: "Ступор — замираю, не знаю что делать", value: "freeze" },
                { label: "Умиротворение — соглашаюсь, сглаживаю", value: "fawn" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onAnswer(question.id, opt.value)}
                  className={`
                    w-full text-left px-5 py-4 rounded-xl transition-all duration-200
                    ${
                      initialValue === opt.value
                        ? "bg-accent text-white"
                        : "bg-surface-2 text-muted hover:bg-border hover:text-foreground"
                    }
                  `}
                >
                  {opt.label}
                </button>
              ))}
            </>
          )}
          {question.id === "beh1" && (
            <>
              {[
                { label: "А — результат через час, но небольшой", value: "immediate" },
                { label: "Б — работать 3 дня, результат в 5 раз больше", value: "delayed" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onAnswer(question.id, opt.value)}
                  className={`
                    w-full text-left px-5 py-4 rounded-xl transition-all duration-200
                    ${
                      initialValue === opt.value
                        ? "bg-accent text-white"
                        : "bg-surface-2 text-muted hover:bg-border hover:text-foreground"
                    }
                  `}
                >
                  {opt.label}
                </button>
              ))}
            </>
          )}
          {question.id === "beh2" && (
            <>
              {[
                { label: "А — результат через час", value: "immediate" },
                { label: "Б — работать 3 недели, результат в 5 раз больше", value: "delayed" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onAnswer(question.id, opt.value)}
                  className={`
                    w-full text-left px-5 py-4 rounded-xl transition-all duration-200
                    ${
                      initialValue === opt.value
                        ? "bg-accent text-white"
                        : "bg-surface-2 text-muted hover:bg-border hover:text-foreground"
                    }
                  `}
                >
                  {opt.label}
                </button>
              ))}
            </>
          )}
          {question.id === "beh3" && (
            <>
              {[
                { label: "Сделаю задачу которую откладывал", value: "catch_up" },
                { label: "Начну что-то новое и интересное", value: "novelty" },
                { label: "Отдохну", value: "rest" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onAnswer(question.id, opt.value)}
                  className={`
                    w-full text-left px-5 py-4 rounded-xl transition-all duration-200
                    ${
                      initialValue === opt.value
                        ? "bg-accent text-white"
                        : "bg-surface-2 text-muted hover:bg-border hover:text-foreground"
                    }
                  `}
                >
                  {opt.label}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </motion.div>
  );
}
