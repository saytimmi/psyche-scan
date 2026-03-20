"use client";

import { sessions, getTotalQuestionCount } from "@/data/questions";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScanPage() {
  const totalQuestions = getTotalQuestionCount();
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const [answeredMap, setAnsweredMap] = useState<Record<string, number>>({});

  useEffect(() => {
    const cm: Record<string, boolean> = {};
    const am: Record<string, number> = {};
    for (const s of sessions) {
      cm[s.id] = localStorage.getItem(`psyche_completed_${s.id}`) === "true";
      try {
        const stored = localStorage.getItem(`psyche_answers_${s.id}`);
        am[s.id] = stored ? Object.keys(JSON.parse(stored)).length : 0;
      } catch {
        am[s.id] = 0;
      }
    }
    setCompletedMap(cm);
    setAnsweredMap(am);
  }, []);

  const completedCount = Object.values(completedMap).filter(Boolean).length;
  const profilePercent = Math.round((completedCount / sessions.length) * 100);

  return (
    <main className="noise min-h-screen px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-4xl md:text-5xl mb-3">Выбери тест</h1>
          <p className="text-muted">
            Проходи в любом порядке. Каждый раскрывает свой слой личности.
          </p>
        </motion.div>

        {/* Profile progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-border rounded-2xl p-5 mb-8"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-muted">Профиль заполнен</p>
            <p className="text-xl font-mono text-accent">{profilePercent}%</p>
          </div>
          <div className="w-full h-2 bg-surface-2 rounded-full mb-2">
            <motion.div
              className="h-full bg-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${profilePercent}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <p className="text-xs text-muted/50">
            {completedCount} из {sessions.length} сессий &middot; {totalQuestions} вопросов всего
          </p>
          {completedCount > 0 && (
            <Link href="/results" className="inline-block mt-3 text-xs text-accent hover:text-accent-bright transition-colors">
              Посмотреть текущие результаты →
            </Link>
          )}
        </motion.div>

        {/* Session cards */}
        <div className="space-y-4">
          {sessions.map((session, i) => {
            const isDone = completedMap[session.id];
            const inProgress = !isDone && (answeredMap[session.id] ?? 0) > 0;
            const answered = answeredMap[session.id] ?? 0;
            const total = session.sections.reduce((a, s) => a + s.questions.length, 0);

            return (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * (i + 1) }}
              >
                <Link href={`/session/${session.id}`}>
                  <div className={`card-hover group relative bg-surface border rounded-2xl p-5 md:p-6 overflow-hidden ${
                    isDone ? "border-accent/30" : inProgress ? "border-amber-500/30" : "border-border"
                  }`}>
                    {/* Status badge */}
                    {isDone && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium">
                        ✓ Пройден
                      </div>
                    )}
                    {inProgress && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500/10 text-amber-400 text-xs rounded-full font-medium">
                        В процессе ({answered}/{total})
                      </div>
                    )}

                    <div className="flex items-start gap-5">
                      <div className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                        isDone ? "bg-accent/10" : "bg-surface-2"
                      }`}>
                        {session.icon}
                      </div>

                      <div className="flex-1 min-w-0 pr-24">
                        <div className="flex items-baseline gap-3 mb-1">
                          <span className="font-mono text-xs text-accent/40">0{i + 1}</span>
                          <h2 className="font-display text-xl group-hover:text-accent-bright transition-colors">
                            {session.title}
                          </h2>
                        </div>
                        <p className="text-sm text-accent/60 mb-2">{session.subtitle}</p>
                        <p className="text-sm text-muted leading-relaxed">{session.description}</p>

                        <div className="flex items-center gap-4 mt-3 text-xs text-muted/50">
                          <span>{total} вопросов</span>
                          <span>~{session.estimatedMinutes} мин</span>
                          <span>{session.sections.length} секций</span>
                        </div>

                        {/* Section list */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {session.sections.map((sec) => (
                            <span key={sec.id} className="text-[10px] bg-surface-2 text-muted/60 px-2 py-0.5 rounded">
                              {sec.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Progress bar for in-progress */}
                    {inProgress && (
                      <div className="mt-4 w-full h-1 bg-surface-2 rounded-full">
                        <div
                          className="h-full bg-amber-500/50 rounded-full transition-all"
                          style={{ width: `${(answered / total) * 100}%` }}
                        />
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Back */}
        <div className="text-center mt-8">
          <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
            ← На главную
          </Link>
        </div>
      </div>
    </main>
  );
}
