"use client";

import { useEffect, useState } from "react";
import { sessions } from "@/data/questions";
import { scoreProfile, generateSummary, type ProfileResult, type RawAnswer } from "@/lib/scoring";
import { motion } from "framer-motion";
import Link from "next/link";

function SchemaBar({ name, score, level }: { name: string; score: number; level: string }) {
  const width = (score / 6) * 100;
  const color =
    level === "dominant" ? "bg-red-500" :
    level === "active" ? "bg-orange-400" :
    level === "mild" ? "bg-yellow-400" : "bg-surface-2";

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted w-48 shrink-0 capitalize">
        {name.replace(/_/g, " ")}
      </span>
      <div className="flex-1 h-3 bg-surface-2 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 0.6, delay: 0.1 }}
        />
      </div>
      <span className="text-sm font-mono text-muted w-8 text-right">{score}</span>
    </div>
  );
}

function Big5Radar({ profile }: { profile: ProfileResult }) {
  const traits = [
    { label: "O", full: "Openness", score: profile.big5.openness.score },
    { label: "C", full: "Conscientiousness", score: profile.big5.conscientiousness.score },
    { label: "E", full: "Extraversion", score: profile.big5.extraversion.score },
    { label: "A", full: "Agreeableness", score: profile.big5.agreeableness.score },
    { label: "N", full: "Neuroticism", score: profile.big5.neuroticism.score },
  ];
  const level = (s: number) => s >= 0.7 ? "High" : s >= 0.4 ? "Mid" : "Low";

  return (
    <div className="space-y-3">
      {traits.map((t) => (
        <div key={t.label} className="flex items-center gap-3">
          <span className="text-sm font-mono text-accent w-6">{t.label}</span>
          <span className="text-sm text-muted w-40">{t.full}</span>
          <div className="flex-1 h-3 bg-surface-2 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${t.score * 100}%` }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
          </div>
          <span className="text-sm font-mono text-muted w-16 text-right">
            {level(t.score)} ({Math.round(t.score * 100)}%)
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ResultsPage() {
  const [profile, setProfile] = useState<ProfileResult | null>(null);
  const [missing, setMissing] = useState<string[]>([]);

  useEffect(() => {
    // Collect answers from all sessions
    const allAnswers: RawAnswer[] = [];
    const missingSessions: string[] = [];

    for (const session of sessions) {
      const stored = localStorage.getItem(`psyche_answers_${session.id}`);
      if (stored) {
        const answers = JSON.parse(stored) as Record<string, number | string | boolean>;
        for (const [questionId, value] of Object.entries(answers)) {
          allAnswers.push({
            questionId,
            value,
            answeredAt: new Date().toISOString(),
          });
        }
      } else {
        missingSessions.push(session.title);
      }
    }

    setMissing(missingSessions);
    if (allAnswers.length > 0) {
      setProfile(scoreProfile(allAnswers));
    }
  }, []);

  if (!profile) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-6">📊</div>
          <h1 className="text-2xl font-bold mb-4">Нет данных</h1>
          <p className="text-muted mb-6">Пройди хотя бы одну сессию</p>
          <Link
            href="/"
            className="px-6 py-3 bg-accent text-white rounded-xl font-medium"
          >
            К сессиям
          </Link>
        </div>
      </main>
    );
  }

  const activeSchemas = profile.schemas.filter(
    (s) => s.level === "dominant" || s.level === "active"
  );
  const topValues = profile.values.slice(0, 5);

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-5xl mb-4">🧠</div>
          <h1 className="text-3xl font-bold mb-2">Твой профиль</h1>
          {missing.length > 0 && (
            <p className="text-sm text-orange-400">
              Не пройдено: {missing.join(", ")}
            </p>
          )}
        </motion.div>

        {/* Big Five */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-border rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Big Five (OCEAN)</h2>
          <Big5Radar profile={profile} />

          {/* Facets */}
          {Object.entries(profile.big5).map(([domain, data]) => {
            if (!data.facets || Object.keys(data.facets).length === 0) return null;
            return (
              <div key={domain} className="mt-4">
                <p className="text-xs text-muted mb-2 capitalize">{domain} facets:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.entries(data.facets).map(([facet, score]) => (
                    <div
                      key={facet}
                      className="bg-surface-2 rounded-lg px-3 py-2 text-xs"
                    >
                      <span className="text-muted capitalize">
                        {facet.replace(/_/g, " ")}
                      </span>
                      <span className="float-right font-mono text-foreground">
                        {Math.round((score as number) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.section>

        {/* Attachment */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-border rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Стиль привязанности</h2>
          <div className="flex items-center gap-4 mb-4">
            <span
              className={`px-4 py-2 rounded-xl text-sm font-medium ${
                profile.attachment.style === "secure"
                  ? "bg-green-500/20 text-green-400"
                  : profile.attachment.style === "anxious"
                  ? "bg-orange-500/20 text-orange-400"
                  : profile.attachment.style === "avoidant"
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {profile.attachment.style === "secure" && "Надёжный (Secure)"}
              {profile.attachment.style === "anxious" && "Тревожный (Anxious)"}
              {profile.attachment.style === "avoidant" && "Избегающий (Avoidant)"}
              {profile.attachment.style === "disorganized" && "Дезорганизованный"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-2 rounded-xl p-4">
              <p className="text-xs text-muted mb-1">Тревожность</p>
              <p className="text-2xl font-mono">
                {profile.attachment.anxiety}
                <span className="text-sm text-muted">/7</span>
              </p>
            </div>
            <div className="bg-surface-2 rounded-xl p-4">
              <p className="text-xs text-muted mb-1">Избегание</p>
              <p className="text-2xl font-mono">
                {profile.attachment.avoidance}
                <span className="text-sm text-muted">/7</span>
              </p>
            </div>
          </div>
        </motion.section>

        {/* Values */}
        {topValues.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-surface border border-border rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold mb-4">Ценности (Schwartz PVQ)</h2>
            <div className="flex flex-wrap gap-2">
              {topValues.map((v, i) => (
                <span
                  key={v.facet}
                  className={`px-4 py-2 rounded-xl text-sm ${
                    i === 0
                      ? "bg-accent/20 text-accent font-medium"
                      : "bg-surface-2 text-muted"
                  }`}
                >
                  #{i + 1} {v.facet.replace(/_/g, " ")}
                  <span className="ml-2 font-mono text-xs opacity-60">
                    {v.score}/6
                  </span>
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* Schemas */}
        {profile.schemas.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-surface border border-border rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold mb-1">
              Глубинные схемы (Young)
            </h2>
            <p className="text-xs text-muted mb-4">
              {activeSchemas.length > 0
                ? `${activeSchemas.length} активных схем`
                : "Нет активных схем"}
            </p>
            <div className="space-y-2">
              {profile.schemas.map((s) => (
                <SchemaBar key={s.name} {...s} />
              ))}
            </div>
          </motion.section>
        )}

        {/* DERS */}
        {Object.keys(profile.ders).length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-surface border border-border rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold mb-4">
              Эмоциональная регуляция (DERS)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(profile.ders).map(([key, data]) => {
                const score = data.score;
                const color =
                  score >= 0.7 ? "text-red-400" :
                  score >= 0.5 ? "text-orange-400" : "text-green-400";
                return (
                  <div key={key} className="bg-surface-2 rounded-xl p-4">
                    <p className="text-xs text-muted mb-1 capitalize">
                      {key.replace(/_/g, " ")}
                    </p>
                    <p className={`text-xl font-mono ${color}`}>
                      {Math.round(score * 100)}%
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* ACE */}
        {profile.ace.score > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="bg-surface border border-border rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold mb-2">ACE Score</h2>
            <p className="text-3xl font-mono mb-2">
              {profile.ace.score}
              <span className="text-sm text-muted">/10</span>
            </p>
            <p className="text-xs text-muted">
              {profile.ace.score >= 4
                ? "Высокий (4+). Связан с повышенным риском. Рекомендуется работа с терапевтом."
                : profile.ace.score >= 1
                ? "Умеренный. Может влиять на текущие паттерны."
                : "Низкий."}
            </p>
          </motion.section>
        )}

        {/* SDT */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-surface border border-border rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold mb-4">
            Мотивация (Self-Determination Theory)
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Автономия", value: profile.sdt.autonomy },
              { label: "Компетентность", value: profile.sdt.competence },
              { label: "Связанность", value: profile.sdt.relatedness },
            ].map((need) => {
              const color =
                need.value >= 5 ? "text-green-400" :
                need.value >= 3.5 ? "text-orange-400" : "text-red-400";
              return (
                <div key={need.label} className="bg-surface-2 rounded-xl p-4 text-center">
                  <p className="text-xs text-muted mb-1">{need.label}</p>
                  <p className={`text-2xl font-mono ${color}`}>
                    {need.value}
                    <span className="text-sm text-muted">/7</span>
                  </p>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-surface border border-accent/30 rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold mb-4 text-accent">
            Текстовый профиль
          </h2>
          <pre className="text-sm text-muted whitespace-pre-wrap font-mono leading-relaxed">
            {generateSummary(profile)}
          </pre>
        </motion.section>

        {/* Narratives */}
        {Object.keys(profile.narratives).length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-surface border border-border rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold mb-4">Нарративные ответы</h2>
            <div className="space-y-4">
              {Object.entries(profile.narratives).map(([dimension, text]) => (
                <div key={dimension} className="border-b border-border pb-4 last:border-0">
                  <p className="text-xs text-accent mb-1 font-mono">{dimension}</p>
                  <p className="text-sm text-muted leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-center pb-8">
          <Link
            href="/"
            className="px-6 py-3 bg-surface border border-border text-muted rounded-xl hover:bg-surface-2 transition-colors"
          >
            На главную
          </Link>
          <button
            onClick={() => {
              const data = JSON.stringify(profile, null, 2);
              const blob = new Blob([data], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "psyche-profile.json";
              a.click();
            }}
            className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent-dim transition-colors"
          >
            Скачать JSON
          </button>
        </div>
      </div>
    </main>
  );
}
