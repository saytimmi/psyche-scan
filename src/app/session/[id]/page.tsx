"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useCallback, useMemo } from "react";
import { sessions } from "@/data/questions";
import { QuestionCard } from "@/components/QuestionCard";
import { motion, AnimatePresence } from "framer-motion";
import type { Question } from "@/data/questions";

export default function SessionPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id as string;

  const session = sessions.find((s) => s.id === sessionId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, number | string | boolean>
  >({});
  const [showIntro, setShowIntro] = useState(true);
  const [completed, setCompleted] = useState(false);

  const allQuestions = useMemo(
    () => session?.sections.flatMap((s) => s.questions) ?? [],
    [session]
  );

  const currentQuestion: Question | undefined = allQuestions[currentIndex];

  // Find which section we're in
  const currentSection = useMemo(() => {
    if (!session) return null;
    let count = 0;
    for (const section of session.sections) {
      count += section.questions.length;
      if (currentIndex < count) return section;
    }
    return null;
  }, [session, currentIndex]);

  const handleAnswer = useCallback(
    (questionId: string, value: number | string | boolean) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));

      // Auto-advance for non-text questions
      if (currentQuestion?.type !== "open") {
        setTimeout(() => {
          if (currentIndex < allQuestions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
          } else {
            // Session complete
            const allAnswers = { ...answers, [questionId]: value };
            localStorage.setItem(
              `psyche_answers_${sessionId}`,
              JSON.stringify(allAnswers)
            );
            setCompleted(true);
          }
        }, 300);
      } else {
        if (currentIndex < allQuestions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          const allAnswers = { ...answers, [questionId]: value };
          localStorage.setItem(
            `psyche_answers_${sessionId}`,
            JSON.stringify(allAnswers)
          );
          setCompleted(true);
        }
      }
    },
    [currentIndex, allQuestions, answers, sessionId, currentQuestion]
  );

  const handleBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted">
        Сессия не найдена
      </div>
    );
  }

  // Intro screen
  if (showIntro) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg text-center"
        >
          <div className="text-5xl mb-6">{session.icon}</div>
          <h1 className="text-3xl font-bold mb-2">{session.title}</h1>
          <p className="text-accent mb-4">{session.subtitle}</p>
          <p className="text-muted mb-2">{session.description}</p>
          <p className="text-sm text-muted/50 mb-8">
            {allQuestions.length} вопросов &middot; ~{session.estimatedMinutes}{" "}
            минут
          </p>

          <div className="space-y-3 mb-8 text-left bg-surface border border-border rounded-xl p-5">
            <p className="text-sm text-muted">
              <span className="text-foreground font-medium">Секции:</span>
            </p>
            {session.sections.map((s) => (
              <div key={s.id} className="flex justify-between text-sm">
                <span className="text-muted">{s.title}</span>
                <span className="text-muted/50">
                  {s.questions.length} вопросов
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowIntro(false)}
            className="px-8 py-4 bg-accent text-white rounded-xl font-medium text-lg hover:bg-accent-dim transition-colors"
          >
            Начать
          </button>
        </motion.div>
      </main>
    );
  }

  // Completion screen
  if (completed) {
    const sessionIndex = sessions.findIndex((s) => s.id === sessionId);
    const nextSession = sessions[sessionIndex + 1];
    const allSessionsDone = !nextSession && sessionIndex === sessions.length - 1;

    // Check if all 4 sessions are done
    const allCompleted =
      allSessionsDone &&
      sessions.every(
        (s) =>
          s.id === sessionId ||
          localStorage.getItem(`psyche_answers_${s.id}`) !== null
      );

    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg text-center"
        >
          <div className="text-5xl mb-6">✅</div>
          <h1 className="text-3xl font-bold mb-2">
            {session.title} — готово!
          </h1>
          <p className="text-muted mb-8">
            {Object.keys(answers).length} ответов сохранено
          </p>

          <div className="space-y-3">
            {nextSession && (
              <button
                onClick={() => router.push(`/session/${nextSession.id}`)}
                className="w-full px-6 py-4 bg-accent text-white rounded-xl font-medium hover:bg-accent-dim transition-colors"
              >
                Следующая: {nextSession.title} →
              </button>
            )}

            {allCompleted && (
              <button
                onClick={() => router.push("/results")}
                className="w-full px-6 py-4 bg-accent text-white rounded-xl font-medium hover:bg-accent-dim transition-colors"
              >
                Смотреть результаты →
              </button>
            )}

            <button
              onClick={() => router.push("/")}
              className="w-full px-6 py-4 bg-surface border border-border text-muted rounded-xl font-medium hover:bg-surface-2 transition-colors"
            >
              На главную
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  // Question flow
  return (
    <main className="min-h-screen flex flex-col px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between max-w-2xl mx-auto w-full mb-8">
        <button
          onClick={handleBack}
          disabled={currentIndex === 0}
          className="text-sm text-muted hover:text-foreground transition-colors disabled:opacity-20"
        >
          ← Назад
        </button>
        <div className="text-center">
          <span className="text-xs text-accent font-medium">
            {session.title}
          </span>
          {currentSection && (
            <p className="text-xs text-muted">{currentSection.title}</p>
          )}
        </div>
        <button
          onClick={() => router.push("/")}
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          Выйти
        </button>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              questionNumber={currentIndex + 1}
              totalQuestions={allQuestions.length}
              onAnswer={handleAnswer}
              initialValue={answers[currentQuestion.id]}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
