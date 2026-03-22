"use client";

import { Question } from "@/data/questions";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const choiceOptionsMap: Record<string, { label: string; value: string }[]> = {
  rel2: [
    { label: "Атака — иду в конфликт, отстаиваю позицию", value: "fight" },
    { label: "Уход — дистанцируюсь, замыкаюсь", value: "flight" },
    { label: "Ступор — замираю, не знаю что делать", value: "freeze" },
    { label: "Умиротворение — соглашаюсь, сглаживаю", value: "fawn" },
  ],
  beh1: [
    { label: "А — результат через час, но небольшой", value: "immediate" },
    { label: "Б — работать 3 дня, результат в 5 раз больше", value: "delayed" },
  ],
  beh2: [
    { label: "А — результат через час", value: "immediate" },
    { label: "Б — работать 3 недели, результат в 5 раз больше", value: "delayed" },
  ],
  beh3: [
    { label: "Сделаю задачу которую откладывал", value: "catch_up" },
    { label: "Начну что-то новое и интересное", value: "novelty" },
    { label: "Отдохну", value: "rest" },
  ],
  chr1: [
    { label: "6:00–7:00", value: "early" },
    { label: "8:00–9:00", value: "moderate" },
    { label: "10:00–11:00", value: "late" },
    { label: "12:00+", value: "very_late" },
  ],
  chr2: [
    { label: "Утро (8–12)", value: "morning" },
    { label: "День (12–17)", value: "afternoon" },
    { label: "Вечер (17–21)", value: "evening" },
    { label: "Ночь (21+)", value: "night" },
  ],
  chr3: [
    { label: "До 22:00", value: "early" },
    { label: "22:00–00:00", value: "moderate" },
    { label: "00:00–02:00", value: "late" },
    { label: "02:00+", value: "very_late" },
  ],
  chr4: [
    { label: "5–6 часов", value: "short" },
    { label: "7–8 часов", value: "normal" },
    { label: "9+ часов", value: "long" },
  ],
  chr5: [
    { label: "Да, 3+ раза в неделю", value: "regular" },
    { label: "Иногда, 1-2 раза", value: "sometimes" },
    { label: "Редко / не занимаюсь", value: "rarely" },
  ],
  meta1: [
    { label: "Жёстко, по делу, без сантиментов", value: "drill_sergeant" },
    { label: "Через вопросы — пусть я сам додумаюсь", value: "socratic" },
    { label: "Поддерживающе, с эмпатией", value: "supportive" },
    { label: "Аналитически — дай данные, я решу сам", value: "analytical" },
  ],
  role1: [
    { label: "Герой — спасал ситуацию, был опорой", value: "hero" },
    { label: "Козёл отпущения — был виноват во всём", value: "scapegoat" },
    { label: "Потерянный ребёнок — невидимый, тихий", value: "lost_child" },
    { label: "Клоун — смешил, разряжал напряжение", value: "mascot" },
  ],
  role2: [
    { label: "Лидер — веду за собой", value: "leader" },
    { label: "Советник — ко мне приходят за помощью", value: "advisor" },
    { label: "Душа компании — создаю атмосферу", value: "entertainer" },
    { label: "Наблюдатель — смотрю со стороны", value: "observer" },
  ],
  role3: [
    { label: "Стратег — вижу картину и направление", value: "strategist" },
    { label: "Исполнитель — делаю чтобы работало", value: "executor" },
    { label: "Креатор — придумываю новое", value: "creator" },
    { label: "Медиатор — соединяю людей и процессы", value: "mediator" },
  ],
  role4: [
    { label: "Контролёр — беру всё в свои руки", value: "controller" },
    { label: "Жертва — чувствую беспомощность", value: "victim" },
    { label: "Спасатель — бросаюсь помогать другим", value: "rescuer" },
    { label: "Отшельник — ухожу в себя", value: "hermit" },
  ],
  res2: [
    { label: "Да, сейчас работаю", value: "current" },
    { label: "Работал раньше", value: "past" },
    { label: "Нет, никогда", value: "never" },
  ],
  res6: [
    { label: "0 — нет времени", value: "0" },
    { label: "1-2 часа", value: "1-2" },
    { label: "3-5 часов", value: "3-5" },
    { label: "5+ часов", value: "5+" },
  ],
  nid6: [
    { label: "Герой — я создаю свою историю", value: "hero" },
    { label: "Наблюдатель — я смотрю как жизнь происходит", value: "observer" },
    { label: "Жертва — обстоятельства сильнее меня", value: "victim" },
    { label: "Искатель — я в пути, ещё не нашёл", value: "seeker" },
  ],
};

function getChoiceOptions(questionId: string) {
  return choiceOptionsMap[questionId] ?? [
    { label: "Вариант А", value: "a" },
    { label: "Вариант Б", value: "b" },
  ];
}

function getTimerDuration(type: string): number {
  if (type === "open") return 120;
  if (type === "choice") return 15;
  return 10;
}

function getMiddleLabel(totalPoints: number): string | null {
  if (totalPoints === 5) return "Среднее";
  if (totalPoints >= 6) return "Нейтрально";
  return null;
}

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  totalGlobalQuestions: number;
  globalQuestionNumber: number;
  onAnswer: (questionId: string, value: number | string | boolean) => void;
  initialValue?: number | string | boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  totalGlobalQuestions,
  globalQuestionNumber,
  onAnswer,
  initialValue,
}: QuestionCardProps) {
  const [textValue, setTextValue] = useState(
    typeof initialValue === "string" ? initialValue : ""
  );

  const isOpenEnded = question.type === "open";

  // Timer
  const timerDuration = getTimerDuration(question.type);
  const [timeLeft, setTimeLeft] = useState(timerDuration);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeLeft(timerDuration);
    if (isOpenEnded) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [question.id, timerDuration, isOpenEnded]);

  useEffect(() => {
    setTextValue(typeof initialValue === "string" ? initialValue : "");
  }, [question.id, initialValue]);

  const timerPercent = (timeLeft / timerDuration) * 100;
  const timerColor = "text-muted/30";

  const scale = question.scale;
  const min = scale?.min ?? 1;
  const max = scale?.max ?? 5;
  const points = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  const totalPoints = points.length;
  const middlePoint = Math.ceil((min + max) / 2);
  const middleLabel = getMiddleLabel(totalPoints);
  const selectedNumber = typeof initialValue === "number" ? initialValue : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      style={{ perspective: "1000px" }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Timer */}
      {!isOpenEnded && (
        <div className="flex flex-col items-center mb-6">
          <div className={`relative flex items-center justify-center transition-colors ${timerColor}`}>
            <svg width="56" height="56" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.1" />
              <circle
                cx="28" cy="28" r="24" fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeDasharray={`${2 * Math.PI * 24}`}
                strokeDashoffset={`${2 * Math.PI * 24 * (1 - timerPercent / 100)}`}
                strokeLinecap="round"
                style={{ transform: "rotate(-90deg)", transformOrigin: "center", transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            {/* Flip animation on timer number */}
            <AnimatePresence mode="wait">
              <motion.span
                key={timeLeft}
                initial={{ y: 8, opacity: 0, rotateX: -60 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: -8, opacity: 0, rotateX: 60 }}
                transition={{ duration: 0.2 }}
                className="absolute text-sm font-mono"
              >
                {timeLeft}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Progress bar with counters */}
      <div className="flex items-center justify-between mb-2 text-xs text-muted">
        {/* Flip animation on question number */}
        <AnimatePresence mode="wait">
          <motion.span
            key={questionNumber}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {questionNumber} / {totalQuestions}
          </motion.span>
        </AnimatePresence>
        <span className="text-muted/30">
          Всего: {globalQuestionNumber} / {totalGlobalQuestions}
        </span>
        <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
      </div>

      {/* Spring physics progress bar */}
      <div className="w-full h-1 bg-surface-2 rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
      </div>

      {/* Question text */}
      <AnimatePresence mode="wait">
        <motion.h2
          key={question.id}
          initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
          animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="font-display text-xl md:text-2xl mb-8 leading-relaxed text-center"
        >
          {question.text}
        </motion.h2>
      </AnimatePresence>

      {/* Scale answers — with glow hover */}
      {(question.type === "scale" || question.type === "likert7" || question.type === "likert6") && (
        <div className="space-y-4">
          <div className="flex justify-between text-xs text-muted px-1">
            <span>{scale?.minLabel}</span>
            {middleLabel && <span>{middleLabel}</span>}
            <span>{scale?.maxLabel}</span>
          </div>
          <div className="flex gap-2 justify-center flex-wrap">
            {points.map((point) => (
              <motion.button
                key={point}
                onClick={() => onAnswer(question.id, point)}
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 0 20px rgba(167, 139, 250, 0.25)",
                  borderColor: "rgba(167, 139, 250, 0.4)",
                }}
                whileTap={{ scale: 0.92 }}
                animate={
                  selectedNumber === point
                    ? { scale: 1.1, boxShadow: "0 0 24px rgba(167, 139, 250, 0.35)" }
                    : selectedNumber !== null
                    ? { opacity: 0.5, scale: 0.97 }
                    : { opacity: 1, scale: 1 }
                }
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`
                  w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl text-base sm:text-lg font-medium
                  border transition-colors duration-200
                  ${selectedNumber === point
                    ? "bg-accent text-white border-accent shadow-lg"
                    : point === middlePoint && middleLabel
                    ? "bg-surface-2 text-muted border-border-light hover:text-foreground"
                    : "bg-surface-2 text-muted border-transparent hover:text-foreground"
                  }
                `}
              >
                {point}
              </motion.button>
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
            <motion.button
              key={label}
              onClick={() => onAnswer(question.id, value)}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 24px rgba(167, 139, 250, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              animate={
                initialValue === value
                  ? { scale: 1.05, boxShadow: "0 0 24px rgba(167, 139, 250, 0.3)" }
                  : initialValue !== undefined
                  ? { opacity: 0.5 }
                  : {}
              }
              className={`
                px-8 py-4 rounded-xl text-lg font-medium border transition-colors duration-200
                ${initialValue === value
                  ? "bg-accent text-white border-accent"
                  : "bg-surface-2 text-muted border-transparent hover:text-foreground"
                }
              `}
            >
              {label}
            </motion.button>
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
            className="w-full h-40 bg-surface-2 border border-border rounded-xl p-4 text-foreground placeholder:text-muted/50 resize-none focus:outline-none focus:border-accent/50 focus:shadow-[0_0_20px_rgba(167,139,250,0.1)] transition-all duration-300"
          />
          <motion.button
            onClick={() => {
              if (textValue.trim()) onAnswer(question.id, textValue.trim());
            }}
            disabled={!textValue.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent-dim transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Далее
          </motion.button>
        </div>
      )}

      {/* Choice answers — with glow hover */}
      {question.type === "choice" && (
        <div className="space-y-3">
          {getChoiceOptions(question.id).map((opt) => (
            <motion.button
              key={opt.value}
              onClick={() => onAnswer(question.id, opt.value)}
              whileHover={{
                x: 4,
                boxShadow: "0 0 20px rgba(167, 139, 250, 0.15)",
                borderColor: "rgba(167, 139, 250, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              animate={
                initialValue === opt.value
                  ? { boxShadow: "0 0 20px rgba(167, 139, 250, 0.2)" }
                  : initialValue !== undefined
                  ? { opacity: 0.5 }
                  : {}
              }
              className={`
                w-full text-left px-5 py-4 rounded-xl border transition-all duration-200
                ${initialValue === opt.value
                  ? "bg-accent text-white border-accent"
                  : "bg-surface-2 text-muted border-transparent hover:text-foreground"
                }
              `}
            >
              {opt.label}
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
