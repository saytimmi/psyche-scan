"use client";

import { sessions, getTotalQuestionCount } from "@/data/questions";
import Link from "next/link";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { Spotlight } from "@/components/ui/spotlight-new";
import { useEffect, useState } from "react";

const TOTAL = getTotalQuestionCount();
const TOTAL_MINUTES = sessions.reduce((a, s) => a + s.estimatedMinutes, 0);

// ════════════════════════════════════
// PAGE
// ════════════════════════════════════
export default function Home() {
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const m: Record<string, boolean> = {};
    for (const s of sessions) m[s.id] = localStorage.getItem(`psyche_completed_${s.id}`) === "true";
    setCompletedMap(m);
  }, []);
  const completedCount = Object.values(completedMap).filter(Boolean).length;

  return (
    <main className="bg-slate-950">
      {/* ═══════════════════════════════ */}
      {/*         HERO — Lamp            */}
      {/* ═══════════════════════════════ */}
      <LampContainer>
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="flex flex-col items-center text-center"
        >
          <h1 className="mt-8 bg-gradient-to-br from-slate-200 to-slate-500 py-4 bg-clip-text font-display tracking-tight text-transparent">
            <span className="block text-4xl md:text-6xl lg:text-7xl">Инструкция к себе,</span>
            <span className="block text-4xl md:text-6xl lg:text-7xl italic">которой у&nbsp;тебя никогда не&nbsp;было.</span>
          </h1>

          <p className="mt-6 text-slate-400 text-base md:text-lg max-w-lg leading-relaxed">
            Ты&nbsp;— сложная система. Страхи, привычки, реакции и&nbsp;паттерны управляют твоей жизнью каждый день. Но&nbsp;мануала к&nbsp;себе тебе никто не&nbsp;давал. До&nbsp;сейчас.
          </p>

          <p className="mt-3 text-slate-500 text-sm">
            22+ научных фреймворка · {TOTAL} вопросов · AI-анализ
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/scan">
              <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-lg font-medium transition-colors shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                Пройти сканирование
              </button>
            </Link>
            <Link href="#how-psyche-works">
              <button className="px-8 py-4 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-xl text-lg transition-all">
                Как это работает
              </button>
            </Link>
          </div>

          <p className="mt-4 text-slate-600 text-xs">
            Бесплатно · ~{TOTAL_MINUTES} минут · результат сразу
          </p>
        </motion.div>
      </LampContainer>

      {/* ═══════════════════════════════ */}
      {/*   КАК РАБОТАЕТ ПСИХИКА         */}
      {/* ═══════════════════════════════ */}
      <section id="how-psyche-works" className="relative py-28 md:py-36 px-6 scroll-mt-16">
        <Spotlight />
        <div className="max-w-3xl mx-auto relative z-10">
          {/* Заголовок */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl text-slate-200 tracking-tight mb-12"
          >
            Ты — нейросеть,{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent italic">
              обученная на своём детстве.
            </span>
          </motion.h2>

          {/* Объяснение */}
          <div className="space-y-6">
            <TextGenerateEffect
              words="Представь: с рождения до 7 лет твой мозг записывал ВСЁ. Не слова — а ощущения. Как с тобой обращались, что было безопасно, что было больно."
              className="text-xl md:text-2xl font-display leading-snug"
              duration={0.3}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <p className="text-slate-400 text-lg leading-relaxed">
                Из этого мозг построил <span className="text-slate-200 font-medium">модель мира</span>. Набор правил:
              </p>

              <div className="space-y-3 pl-4 border-l-2 border-cyan-500/20">
                {[
                  { rule: "Если покажу слабость — накажут", result: "научился прятать эмоции" },
                  { rule: "Если буду идеальным — будут любить", result: "научился вкалывать до выгорания" },
                  { rule: "Люди уходят", result: "научился не привязываться" },
                ].map((item) => (
                  <p key={item.rule} className="text-slate-400">
                    <span className="text-slate-300">&ldquo;{item.rule}&rdquo;</span>
                    <span className="text-cyan-500/60 mx-2">→</span>
                    <span className="text-slate-500 italic">{item.result}</span>
                  </p>
                ))}
              </div>

              <p className="text-slate-400 text-lg leading-relaxed">
                Эти правила <span className="text-slate-200 font-medium">работают до сих пор</span>. Ты их не выбирал. Ты их даже не видишь — потому что смотришь на мир ЧЕРЕЗ них.{" "}
                <span className="text-cyan-400">Как рыба не видит воду.</span>
              </p>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-2">
                <p className="text-slate-300 font-medium mb-3">Поэтому ты:</p>
                {[
                  { action: "Бросаешь проекты", reason: "страх провала, который ты не осознаёшь" },
                  { action: "Молчишь вместо того чтобы сказать", reason: "страх отвержения" },
                  { action: "Откладываешь", reason: "перфекционизм из детства" },
                  { action: "Выбираешь одинаковых партнёров", reason: "привязанность, которую ты повторяешь" },
                ].map((item) => (
                  <p key={item.action} className="text-slate-400 text-sm">
                    <span className="text-slate-300">• {item.action}</span>
                    <span className="text-slate-600"> — {item.reason}</span>
                  </p>
                ))}
              </div>

              <p className="text-slate-400 text-lg">
                Это не лень. Не &ldquo;характер&rdquo;. Это <span className="text-cyan-400 font-medium">программа</span>, которая запустилась когда тебе было 5&nbsp;лет.
              </p>

              <div className="pt-4">
                <p className="text-slate-200 text-xl font-display leading-snug">
                  Psyche Scan показывает тебе эту программу.{" "}
                  <span className="text-slate-500">
                    Не через годы терапии по $170/сессия. А через {TOTAL} точных вопросов, которые реально используют клинические психологи.
                  </span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ */}
      {/*    9 СЛОЁВ — Bento Grid        */}
      {/* ═══════════════════════════════ */}
      <section className="py-28 md:py-36 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-cyan-400 text-sm font-medium mb-3">Как МРТ, но для психики</p>
            <h2 className="font-display text-3xl md:text-5xl text-slate-200 tracking-tight mb-4">
              9 слоёв. От поверхности до ядра.
            </h2>
            <p className="text-slate-400 max-w-xl">
              Каждая сессия сканирует другой слой. По&nbsp;5-15 минут. Можно за&nbsp;один вечер или растянуть на&nbsp;неделю.
            </p>
          </motion.div>

          <BentoGrid className="md:auto-rows-[14rem]">
            {sessions.map((session, i) => {
              const isDone = completedMap[session.id] ?? false;
              const qCount = session.sections.reduce((a, s) => a + s.questions.length, 0);
              const layerDescriptions = [
                "Кто ты базово — общительность, тревожность, открытость",
                "Как строишь отношения и почему они рушатся",
                "Эмоции, страхи, схемы из детства",
                "Твоя история своими словами — 16 открытых вопросов",
                "Мотивация, внутренние части, поведение под давлением",
                "Сильные стороны, хронотип, конфликты, деньги, стресс",
                "Защитные механизмы, теневые стороны, роли",
                "Смысл, ценности, готовность к изменениям",
                "Объектные отношения, идентичность, иммунитет к изменениям",
              ];

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
                      {layerDescriptions[i]}
                      <br />
                      <span className="text-cyan-500/50 font-mono text-[10px] mt-1 inline-block">
                        {qCount} вопросов · ~{session.estimatedMinutes} мин
                        {isDone && " · ✓ пройден"}
                      </span>
                    </span>
                  }
                  header={
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{session.icon}</span>
                      <span className="font-mono text-xs text-slate-600">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                  }
                  className={i === 0 || i === 5 ? "md:col-span-2" : ""}
                />
              );
            })}
          </BentoGrid>

          {completedCount > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <Link href="/results" className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
                Посмотреть результаты ({completedCount}/{sessions.length}) →
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════ */}
      {/*  ЧТО ТЫ ПОЛУЧИШЬ — Sticky      */}
      {/* ═══════════════════════════════ */}
      <section className="py-28 md:py-36 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-cyan-400 text-sm font-medium mb-3">Результат</p>
            <h2 className="font-display text-3xl md:text-5xl text-slate-200 tracking-tight mb-4">
              Документ о тебе, точнее чем
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                10 сессий терапии.
              </span>
            </h2>
          </motion.div>

          <StickyScroll
            content={[
              {
                title: "Портрет",
                description: "Кто ты на самом деле. Простым языком. Прочитаешь и скажешь 'блин, точно'. Не типология, не 4 буквы — а настоящее описание, основанное на 22+ фреймворках.",
                content: <div className="h-full w-full flex items-center justify-center text-5xl">🧬</div>,
              },
              {
                title: "Карта паттернов",
                description: "Конкретные схемы, которые управляют тобой. 'Я должен быть идеальным', 'Мир опасен', 'Меня бросят'. Откуда они, и как они проявляются каждый день.",
                content: <div className="h-full w-full flex items-center justify-center text-5xl">🔮</div>,
              },
              {
                title: "Сильные стороны и слепые зоны",
                description: "То, что у тебя получается легко — ты это не замечаешь, это суперсила. И то, где ты врёшь себе. Говоришь 'мне норм' — а внутри одиноко.",
                content: <div className="h-full w-full flex items-center justify-center text-5xl">💎</div>,
              },
              {
                title: "Тело и стресс",
                description: "Как стресс живёт в теле. Бьёшь, бежишь или замираешь. Почему 'просто успокойся' никогда не работало.",
                content: <div className="h-full w-full flex items-center justify-center text-5xl">🫀</div>,
              },
              {
                title: "Что делать",
                description: "Не 'работай над собой'. А конкретно: с чего начать, что важнее, готов ли ты сейчас и есть ли ресурс.",
                content: <div className="h-full w-full flex items-center justify-center text-5xl">🧭</div>,
              },
            ]}
          />
        </div>
      </section>

      {/* ═══════════════════════════════ */}
      {/*     AI-ПЕРСОНАЛИЗАЦИЯ           */}
      {/* ═══════════════════════════════ */}
      <section className="relative py-28 md:py-36 px-6 overflow-hidden">
        <Spotlight />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-cyan-400 text-sm font-medium mb-3">Бонус</p>
            <h2 className="font-display text-3xl md:text-5xl text-slate-200 tracking-tight mb-8">
              Дай этот мануал своему AI —{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent italic">
                и он наконец тебя поймёт.
              </span>
            </h2>

            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                ChatGPT и Claude дают тебе <span className="text-slate-300">общие</span> советы? &ldquo;Попробуй медитацию&rdquo;, &ldquo;Поставь цели&rdquo;, &ldquo;Веди дневник&rdquo;. Одинаковые для всех.
              </p>
              <p>
                Это потому что AI <span className="text-slate-200 font-medium">не знает кто ты</span>. Не знает, что ты перфекционист, которому &ldquo;поставь цели&rdquo; = рецепт для выгорания. Не знает, что &ldquo;будь более открытым&rdquo; — это как сказать рыбе &ldquo;просто летай&rdquo;.
              </p>
            </div>

            <div className="mt-8 bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <p className="text-slate-200 font-medium mb-4">После Personality Passport:</p>
              <ul className="space-y-3">
                {[
                  "AI подбирает советы под ТВОЙ тип личности",
                  "Он знает твои триггеры и обходит их",
                  "Он разговаривает в стиле, который ТЕБЕ помогает",
                  "Он учитывает твои ценности, не навязывает чужие",
                ].map((item) => (
                  <li key={item} className="text-slate-400 flex items-start gap-3">
                    <span className="text-cyan-400 mt-1 shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 text-slate-400 text-lg">
              Одному нужна жёсткость и дедлайны. Другому — мягкость и поддержка. Третьему — аналитика и данные.{" "}
              <span className="text-cyan-400">AI наконец знает, что нужно именно тебе.</span>
            </p>

            <p className="mt-4 text-slate-600 text-sm">
              Экспорт в ChatGPT Custom Instructions, Claude Projects, Markdown, JSON.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════ */}
      {/*         НАУКА                   */}
      {/* ═══════════════════════════════ */}
      <section className="py-28 md:py-36 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-display text-3xl md:text-5xl text-slate-200 tracking-tight mb-4">
              Не гороскоп. Не MBTI.{" "}
              <span className="text-slate-500">Клинические инструменты.</span>
            </h2>
            <p className="text-slate-400 max-w-2xl text-lg">
              MBTI ненадёжный — половина людей получает другой тип через месяц. Мы используем только то, что проверено на десятках тысяч людей и используется в реальной клинической практике.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { val: "22+", label: "научных фреймворков" },
              { val: String(TOTAL), label: "калиброванных вопросов" },
              { val: "87-95%", label: "надёжность шкал" },
              { val: "$0", label: "вместо $174/сессия" },
            ].map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="font-display text-4xl md:text-5xl text-cyan-400 mb-1">{s.val}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Frameworks list */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-600 text-sm leading-relaxed"
          >
            Big Five (IPIP-NEO) · ECR-R · DERS · YSQ-S3 · ACE · PVQ-RR · DSQ · AAQ-II · IFS · SDT · Polyvagal · MAIA · Neff · Loevinger · McAdams · Kegan · Linville · Thomas-Kilmann
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════ */}
      {/*         ФИНАЛЬНЫЙ CTA           */}
      {/* ═══════════════════════════════ */}
      <section className="py-28 md:py-36 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-5xl text-slate-200 tracking-tight mb-6">
            Хватит жить по программе,{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent italic">
              которую ты не выбирал.
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            9 сессий. {TOTAL} вопросов. В конце — полная инструкция к себе.
            <br />
            <span className="text-slate-500">Бесплатно. Результат сразу.</span>
          </p>
          <Link href="/scan">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-12 py-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xl font-medium transition-colors shadow-[0_0_30px_rgba(6,182,212,0.25)]"
            >
              Пройти сканирование
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* ═══════════════════════════════ */}
      {/*           FOOTER                */}
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
