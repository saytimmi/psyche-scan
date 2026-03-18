"use client";

import { sessions, getTotalQuestionCount } from "@/data/questions";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const totalQuestions = getTotalQuestionCount();
  const totalMinutes = sessions.reduce((a, s) => a + s.estimatedMinutes, 0);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <div className="text-5xl mb-6">🧠</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Psyche Scan
        </h1>
        <p className="text-lg text-muted mb-2">
          Глубинное профилирование личности на основе научно-валидированных методик
        </p>
        <p className="text-sm text-muted/60">
          {totalQuestions} вопросов &middot; {totalMinutes} минут &middot; 4 сессии
        </p>
      </motion.div>

      {/* Session Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full mb-16">
        {sessions.map((session, i) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * (i + 1) }}
          >
            <Link href={`/session/${session.id}`}>
              <div className="group relative bg-surface border border-border rounded-2xl p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{session.icon}</span>
                  <span className="text-xs text-muted bg-surface-2 px-2 py-1 rounded-full">
                    ~{session.estimatedMinutes} мин
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-1 group-hover:text-accent transition-colors">
                  {session.title}
                </h2>
                <p className="text-sm text-accent/80 mb-2">{session.subtitle}</p>
                <p className="text-sm text-muted leading-relaxed">
                  {session.description}
                </p>
                <div className="mt-4 text-xs text-muted/50">
                  {session.sections.length} секций &middot;{" "}
                  {session.sections.reduce((a, s) => a + s.questions.length, 0)} вопросов
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Science Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="max-w-2xl text-center"
      >
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h3 className="text-sm font-semibold mb-3 text-accent">Научная база</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-muted">
            <div className="bg-surface-2 rounded-lg p-3">
              <div className="font-mono text-foreground mb-1">IPIP-NEO</div>
              <div>Big Five r=.87-.93</div>
            </div>
            <div className="bg-surface-2 rounded-lg p-3">
              <div className="font-mono text-foreground mb-1">ECR-R</div>
              <div>Attachment r=.28-.42</div>
            </div>
            <div className="bg-surface-2 rounded-lg p-3">
              <div className="font-mono text-foreground mb-1">DERS</div>
              <div>Emotion reg alpha=.93</div>
            </div>
            <div className="bg-surface-2 rounded-lg p-3">
              <div className="font-mono text-foreground mb-1">YSQ-S3</div>
              <div>Schemas alpha=.97</div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
