"use client";

import { sessions, getTotalQuestionCount } from "@/data/questions";
import Link from "next/link";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { Spotlight } from "@/components/ui/spotlight-new";

const TOTAL = getTotalQuestionCount();

// ══════════════════════════════════════
// PAGE
// ══════════════════════════════════════
export default function Home() {
  return (
    <main className="noise bg-slate-950">
      {/* ═══════════════════════════════ */}
      {/*        HERO — Lamp Effect      */}
      {/* ═══════════════════════════════ */}
      <LampContainer>
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="flex flex-col items-center text-center"
        >
          <h1 className="mt-8 bg-gradient-to-br from-slate-200 to-slate-500 py-4 bg-clip-text text-center font-display tracking-tight text-transparent">
            <span className="text-5xl md:text-7xl lg:text-8xl">Psyche Scan</span>
            <br />
            <span className="text-2xl md:text-4xl italic opacity-80">Глубинное сканирование личности</span>
          </h1>

          <p className="mt-6 text-slate-400 text-sm md:text-base max-w-md">
            {sessions.length} сессий &middot; {TOTAL} вопросов &middot; 22+ научных фреймворка
          </p>

          <div className="mt-10 flex gap-4">
            <Link href="/scan">
              <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-lg font-medium transition-colors">
                Начать сканирование
              </button>
            </Link>
            <Link href="#sessions">
              <button className="px-8 py-4 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-xl text-lg transition-all">
                Подробнее
              </button>
            </Link>
          </div>
        </motion.div>
      </LampContainer>

      {/* ═══════════════════════════════ */}
      {/*   PROBLEM — Text Generate      */}
      {/* ═══════════════════════════════ */}
      <section className="relative py-32 px-6">
        <Spotlight />
        <div className="max-w-3xl mx-auto relative z-10">
          <TextGenerateEffect
            words="Ставишь цель — и через две недели забиваешь. Знаешь что надо поговорить — но молчишь. Начинаешь проект на энтузиазме — и бросаешь на полпути."
            className="text-2xl md:text-4xl font-display leading-snug"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-12 space-y-4"
          >
            <p className="text-lg text-slate-400 leading-relaxed">
              Это не лень и не слабость. Внутри работает <span className="text-cyan-400 font-medium">программа</span> — набор убеждений и страхов из детства. Ты их не выбирал. Ты их даже не видишь.
            </p>
            <p className="text-xl text-cyan-400 font-display italic">
              Здесь ты их увидишь.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════ */}
      {/*    SESSIONS — Bento Grid       */}
      {/* ═══════════════════════════════ */}
      <section id="sessions" className="py-32 px-6 scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-cyan-400 text-sm font-medium mb-3">Процесс</p>
            <h2 className="font-display text-4xl md:text-6xl text-slate-200 tracking-tight">
              9 слоёв глубины
            </h2>
          </motion.div>

          <BentoGrid className="md:auto-rows-[16rem]">
            {sessions.map((session, i) => {
              const qCount = session.sections.reduce((a, s) => a + s.questions.length, 0);
              return (
                <BentoGridItem
                  key={session.id}
                  title={
                    <Link href={`/session/${session.id}`} className="hover:text-cyan-400 transition-colors">
                      {session.title}
                    </Link>
                  }
                  description={
                    <span>
                      {session.subtitle}
                      <br />
                      <span className="text-cyan-500/60 font-mono text-[10px]">{qCount} вопросов · ~{session.estimatedMinutes} мин</span>
                    </span>
                  }
                  header={
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{session.icon}</span>
                      <span className="font-mono text-xs text-slate-600">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                  }
                  className={i === 0 || i === 5 ? "md:col-span-2" : ""}
                />
              );
            })}
          </BentoGrid>
        </div>
      </section>

      {/* ═══════════════════════════════ */}
      {/*  DELIVERABLES — Sticky Scroll  */}
      {/* ═══════════════════════════════ */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-cyan-400 text-sm font-medium mb-3">Результат</p>
            <h2 className="font-display text-4xl md:text-6xl text-slate-200 tracking-tight mb-4">
              В конце ты получишь
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Не &laquo;ты экстраверт, поздравляем&raquo;. Конкретный разбор с планом действий.
            </p>
          </motion.div>

          <StickyScroll
            content={[
              {
                title: "Портрет личности",
                description: "Простым языком — какой ты человек. Прочитаешь и скажешь 'блин, точно'. Не гороскоп, а реальное описание, основанное на 22+ фреймворках.",
                content: <div className="h-full w-full flex items-center justify-center text-white font-display text-4xl">🧬</div>,
              },
              {
                title: "Сильные стороны и слепые зоны",
                description: "То, что у тебя получается легко — ты это не замечаешь. И то, где ты врёшь себе. Конкретные расхождения между тем что говоришь и что делаешь.",
                content: <div className="h-full w-full flex items-center justify-center text-white font-display text-4xl">💎</div>,
              },
              {
                title: "Где тормозишь и почему",
                description: "Убеждения из детства типа 'я должен быть идеальным' или 'показать слабость = опасно'. Конкретные схемы которые рулят тобой каждый день.",
                content: <div className="h-full w-full flex items-center justify-center text-white font-display text-4xl">🔮</div>,
              },
              {
                title: "Что делать + файл для AI",
                description: "Конкретный план: с чего начать, что важнее. Плюс готовый профиль для ChatGPT или Claude — бот моментально начинает тебя понимать.",
                content: <div className="h-full w-full flex items-center justify-center text-white font-display text-4xl">🤖</div>,
              },
            ]}
          />
        </div>
      </section>

      {/* ═══════════════════════════════ */}
      {/*      SCIENCE — Spotlight       */}
      {/* ═══════════════════════════════ */}
      <section className="relative py-32 px-6 overflow-hidden">
        <Spotlight />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-cyan-400 text-sm font-medium mb-3">Наука</p>
            <h2 className="font-display text-4xl md:text-6xl text-slate-200 tracking-tight mb-4">
              Без гороскопов
            </h2>
            <p className="text-slate-400 max-w-2xl text-lg">
              MBTI ненадёжный — половина людей получает другой тип через месяц. Мы используем только фреймворки с надёжностью 84-95%.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { val: "22+", label: "фреймворков" },
              { val: String(TOTAL), label: "вопросов" },
              { val: "9", label: "слоёв" },
              { val: "80%", label: "точность" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-5xl md:text-6xl text-cyan-400 mb-1">{s.val}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Frameworks */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "Big Five (IPIP-NEO)", stat: "87-93%" },
              { name: "Привязанность (ECR-R)", stat: "Надёжность" },
              { name: "Эмоции (DERS)", stat: "93-95%" },
              { name: "Схемы (YSQ-S3)", stat: "18 схем" },
              { name: "Детский опыт (ACE)", stat: "17K+ участников" },
              { name: "Ценности (PVQ-RR)", stat: "49+ культур" },
              { name: "Защиты (DSQ)", stat: "3 уровня" },
              { name: "Гибкость (AAQ-II)", stat: "84%" },
            ].map((t) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 hover:border-cyan-900/50 transition-colors"
              >
                <p className="text-sm font-medium text-slate-300 mb-1">{t.name}</p>
                <p className="text-xs text-cyan-500/60 font-mono">{t.stat}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ */}
      {/*          FINAL CTA             */}
      {/* ═══════════════════════════════ */}
      <section className="py-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-6xl text-slate-200 tracking-tight mb-6">
            Хватит гадать.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent italic">
              Пора разобраться.
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-12">
            {sessions.length} блоков по 5-15 минут. Бесплатно. Результат сразу.
          </p>
          <Link href="/scan">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-12 py-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xl font-medium transition-colors shadow-[0_0_30px_rgba(6,182,212,0.3)]"
            >
              Начать сканирование
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* ═══════════════════════════════ */}
      {/*            FOOTER              */}
      {/* ═══════════════════════════════ */}
      <footer className="px-6 py-12 border-t border-slate-800/50">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p className="font-display text-sm text-slate-500">Psyche Scan</p>
          <p>Не заменяет терапию. Инструмент самопознания.</p>
          <div className="flex gap-4">
            <Link href="/scan" className="hover:text-cyan-400 transition-colors">Тесты</Link>
            <Link href="/results" className="hover:text-cyan-400 transition-colors">Результаты</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
