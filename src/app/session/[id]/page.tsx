"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useCallback, useMemo, useEffect } from "react";
import { sessions } from "@/data/questions";
import { QuestionCard } from "@/components/QuestionCard";
import { motion, AnimatePresence } from "framer-motion";
import type { Question } from "@/data/questions";

function loadSavedAnswers(sessionId: string): Record<string, number | string | boolean> {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(`psyche_answers_${sessionId}`);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function loadSavedIndex(sessionId: string): number {
  if (typeof window === "undefined") return 0;
  try {
    const stored = localStorage.getItem(`psyche_index_${sessionId}`);
    return stored ? parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
}

export default function SessionPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id as string;

  const session = sessions.find((s) => s.id === sessionId);

  // Load saved state from localStorage
  const [answers, setAnswers] = useState<Record<string, number | string | boolean>>(() =>
    loadSavedAnswers(sessionId)
  );
  const [currentIndex, setCurrentIndex] = useState(() => loadSavedIndex(sessionId));
  const [showIntro, setShowIntro] = useState(() => {
    const saved = loadSavedAnswers(sessionId);
    return Object.keys(saved).length === 0;
  });
  const [completed, setCompleted] = useState(false);

  const allQuestions = useMemo(
    () => session?.sections.flatMap((s) => s.questions) ?? [],
    [session]
  );

  const currentQuestion: Question | undefined = allQuestions[currentIndex];

  const currentSection = useMemo(() => {
    if (!session) return null;
    let count = 0;
    for (const section of session.sections) {
      count += section.questions.length;
      if (currentIndex < count) return section;
    }
    return null;
  }, [session, currentIndex]);

  // Save answers incrementally to localStorage (prevents data loss on refresh)
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(`psyche_answers_${sessionId}`, JSON.stringify(answers));
    }
  }, [answers, sessionId]);

  // Save current index to localStorage (enables resume)
  useEffect(() => {
    localStorage.setItem(`psyche_index_${sessionId}`, String(currentIndex));
  }, [currentIndex, sessionId]);

  const handleAnswer = useCallback(
    (questionId: string, value: number | string | boolean) => {
      const newAnswers = { ...answers, [questionId]: value };
      setAnswers(newAnswers);

      // Auto-advance for non-text questions
      const advance = () => {
        if (currentIndex < allQuestions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          // Session complete — mark completed
          localStorage.setItem(`psyche_answers_${sessionId}`, JSON.stringify(newAnswers));
          localStorage.setItem(`psyche_completed_${sessionId}`, "true");
          setCompleted(true);
        }
      };

      if (currentQuestion?.type !== "open") {
        setTimeout(advance, 300);
      } else {
        advance();
      }
    },
    [currentIndex, allQuestions, answers, sessionId, currentQuestion]
  );

  const handleBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleReset = useCallback(() => {
    localStorage.removeItem(`psyche_answers_${sessionId}`);
    localStorage.removeItem(`psyche_index_${sessionId}`);
    localStorage.removeItem(`psyche_completed_${sessionId}`);
    setAnswers({});
    setCurrentIndex(0);
    setShowIntro(true);
    setCompleted(false);
  }, [sessionId]);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted">
        Сессия не найдена
      </div>
    );
  }

  // Check if already completed
  const isAlreadyCompleted =
    typeof window !== "undefined" &&
    localStorage.getItem(`psyche_completed_${sessionId}`) === "true" &&
    !completed &&
    showIntro;

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
          <h1 className="font-display text-3xl mb-2">{session.title}</h1>
          <p className="text-accent mb-4">{session.subtitle}</p>
          <p className="text-muted mb-2">{session.description}</p>
          <p className="text-sm text-muted/50 mb-8">
            {allQuestions.length} вопросов &middot; ~{session.estimatedMinutes} минут
          </p>

          <div className="space-y-3 mb-8 text-left bg-surface border border-border rounded-xl p-5">
            <p className="text-sm text-muted">
              <span className="text-foreground font-medium">Секции:</span>
            </p>
            {session.sections.map((s) => (
              <div key={s.id} className="flex justify-between text-sm">
                <span className="text-muted">{s.title}</span>
                <span className="text-muted/50">{s.questions.length} вопросов</span>
              </div>
            ))}
          </div>

          {isAlreadyCompleted && (
            <div className="mb-6 p-4 bg-surface-2 border border-accent/20 rounded-xl">
              <p className="text-sm text-accent mb-3">Эта сессия уже пройдена.</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => router.push("/results")}
                  className="px-5 py-2.5 bg-accent text-white rounded-xl text-sm hover:bg-accent-dim transition-colors"
                >
                  К результатам
                </button>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 border border-border text-muted rounded-xl text-sm hover:text-foreground transition-colors"
                >
                  Пройти заново
                </button>
              </div>
            </div>
          )}

          {!isAlreadyCompleted && (
            <button
              onClick={() => setShowIntro(false)}
              className="px-8 py-4 bg-accent text-white rounded-xl font-medium text-lg hover:bg-accent-dim transition-colors"
            >
              {Object.keys(answers).length > 0 ? "Продолжить" : "Начать"}
            </button>
          )}
        </motion.div>
      </main>
    );
  }

  // Completion screen
  if (completed) {
    const sessionIndex = sessions.findIndex((s) => s.id === sessionId);
    const nextSession = sessions[sessionIndex + 1];

    // Check if ALL sessions are completed
    const allCompleted = sessions.every(
      (s) => localStorage.getItem(`psyche_completed_${s.id}`) === "true"
    );

    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg text-center"
        >
          <div className="text-5xl mb-6">✅</div>
          <h1 className="font-display text-3xl mb-2">
            {session.title} — готово!
          </h1>
          <p className="text-muted mb-8">
            {Object.keys(answers).length} ответов сохранено
          </p>

          <div className="space-y-3">
            {allCompleted && (
              <button
                onClick={() => router.push("/results")}
                className="w-full px-6 py-4 bg-accent text-white rounded-xl font-medium hover:bg-accent-dim transition-colors"
              >
                Смотреть результаты →
              </button>
            )}

            {nextSession && (
              <button
                onClick={() => router.push(`/session/${nextSession.id}`)}
                className={`w-full px-6 py-4 rounded-xl font-medium transition-colors ${
                  allCompleted
                    ? "border border-border text-muted hover:bg-surface-2"
                    : "bg-accent text-white hover:bg-accent-dim"
                }`}
              >
                Следующая: {nextSession.title} →
              </button>
            )}

            {!allCompleted && !nextSession && (
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
      <div className="flex items-center justify-between max-w-2xl mx-auto w-full mb-8">
        <button
          onClick={handleBack}
          disabled={currentIndex === 0}
          className="text-sm text-muted hover:text-foreground transition-colors disabled:opacity-20"
        >
          ← Назад
        </button>
        <div className="text-center">
          <span className="text-xs text-accent font-medium">{session.title}</span>
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
