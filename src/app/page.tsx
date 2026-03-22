"use client";

import { sessions, getTotalQuestionCount } from "@/data/questions";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState, useRef } from "react";

const TOTAL = getTotalQuestionCount();
const TOTAL_MINUTES = sessions.reduce((a, s) => a + s.estimatedMinutes, 0);

const SWOOP = [0.6, 0, 0, 1] as [number, number, number, number];
const EASE = [0.4, 0, 0, 1] as [number, number, number, number];

// Scroll-triggered fade+slide — Dropbox style
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: SWOOP, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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

  // Hero parallax
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <main>
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]/50">
        <Link href="/" className="font-display text-xl" style={{ color: "var(--text)" }}>
          Psyche Scan
        </Link>
        <Link href="/scan">
          <button className="px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300"
            style={{ background: "var(--bg-dark)", color: "white" }}>
            Начать
          </button>
        </Link>
      </nav>

      {/* ═══════════════════════════════ */}
      {/*            HERO                 */}
      {/* ═══════════════════════════════ */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center section-pad pt-32">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-4xl">
          <Reveal>
            <p className="text-sm font-medium mb-6 uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
              Psyche Scan
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 style={{ fontSize: "clamp(40px, 8vw, 90px)" }}>
              Инструкция к&nbsp;себе, которой у&nbsp;тебя{" "}
              <span className="italic">никогда не&nbsp;было.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-8 text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Ты — сложная система. Страхи, привычки, реакции и паттерны управляют твоей жизнью каждый день. Но мануала к себе тебе никто не давал.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/scan">
                <motion.button
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-8 py-4 text-lg font-medium rounded-xl transition-colors duration-300"
                  style={{ background: "var(--bg-dark)", color: "white" }}
                >
                  Пройти сканирование
                </motion.button>
              </Link>
              <Link href="#how-it-works">
                <button className="px-8 py-4 text-lg rounded-xl border transition-all duration-300 hover:bg-[var(--bg-alt)]"
                  style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                  Как это работает ↓
                </button>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <p className="mt-6 text-sm" style={{ color: "var(--text-muted)" }}>
              {sessions.length} сессий · {TOTAL} вопросов · 22+ фреймворков · бесплатно
            </p>
          </Reveal>
        </motion.div>
      </section>

      {/* ═══════════════════════════════ */}
      {/*     КАК РАБОТАЕТ ПСИХИКА        */}
      {/* ═══════════════════════════════ */}
      <section id="how-it-works" className="section-dark section-pad scroll-mt-16">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 style={{ fontSize: "clamp(32px, 6vw, 60px)" }}>
              Ты — нейросеть, обученная на&nbsp;своём детстве.
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-10 text-lg md:text-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              С рождения до ~7 лет твой мозг записывал всё. Не слова — ощущения. Как с тобой обращались, что было безопасно, что было больно. Из этого он построил модель мира.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { rule: "Покажу слабость — накажут", result: "Прячешь эмоции" },
                { rule: "Буду идеальным — будут любить", result: "Вкалываешь до выгорания" },
                { rule: "Люди уходят", result: "Не привязываешься" },
              ].map((item) => (
                <div key={item.rule} className="rounded-xl p-8" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <p className="text-white text-lg font-display mb-3">&ldquo;{item.rule}&rdquo;</p>
                  <p style={{ color: "rgba(255,255,255,0.5)" }} className="text-base">→ {item.result}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-10 text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              Эти правила работают до сих пор. Ты их не выбирал. Ты их даже не видишь — потому что смотришь на мир <span className="text-white">через них</span>. Как рыба не видит воду.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 rounded-xl p-6 md:p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-white text-lg font-medium mb-6">Поэтому ты:</p>
              {[
                ["Бросаешь проекты", "страх провала"],
                ["Молчишь вместо того чтобы сказать", "страх отвержения"],
                ["Откладываешь", "перфекционизм из детства"],
                ["Выбираешь одинаковых партнёров", "привязанность, которую повторяешь"],
              ].map(([action, reason]) => (
                <p key={action} className="text-base mb-3">
                  <span className="text-white font-medium">• {action}</span>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}> — {reason}</span>
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <p className="mt-10 text-xl md:text-2xl font-display leading-snug text-white">
              Psyche Scan показывает тебе эту программу.{" "}
              <span style={{ color: "rgba(255,255,255,0.4)" }}>
                Не через годы терапии. А через {TOTAL} вопросов, которые реально используют клинические психологи.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════ */}
      {/*    9 СЛОЁВ — Interactive Tiles  */}
      {/* ═══════════════════════════════ */}
      <section className="section-pad">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-sm font-medium mb-4 uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
              Как МРТ, но для психики
            </p>
            <h2 style={{ fontSize: "clamp(32px, 6vw, 60px)" }} className="mb-4">
              9 слоёв. От&nbsp;поверхности до&nbsp;ядра.
            </h2>
            <p style={{ color: "var(--text-secondary)" }} className="text-lg max-w-xl mb-12">
              Каждая сессия сканирует другой слой. По 5-15 минут. За один вечер или за неделю.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sessions.map((session, i) => {
              const isDone = completedMap[session.id] ?? false;
              const qCount = session.sections.reduce((a, s) => a + s.questions.length, 0);
              const descriptions = [
                "Кто ты базово — общительность, тревожность, открытость",
                "Как строишь отношения и почему они рушатся",
                "Эмоции, страхи, схемы из детства",
                "Твоя история своими словами",
                "Мотивация, поведение под давлением",
                "Сильные стороны, конфликты, стресс",
                "Защиты, тени, роли которые играешь",
                "Смысл, ценности, готовность меняться",
                "Идентичность, иммунитет к изменениям",
              ];

              return (
                <Reveal key={session.id} delay={i * 0.05}>
                  <Link href={`/session/${session.id}`}>
                    <div className="tile rounded-xl p-7 h-full cursor-pointer" style={{
                      background: "var(--bg-alt)",
                      border: isDone ? "1px solid var(--accent)" : "1px solid transparent",
                    }}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl">{session.icon}</span>
                        <span className="tile-num font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="font-display text-xl mb-2">{session.title}</h3>
                      <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                        {descriptions[i]}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="tile-label font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>
                          {qCount} вопросов · ~{session.estimatedMinutes} мин
                        </span>
                        {isDone && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
                            Пройден
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ */}
      {/*       ЧТО ТЫ ПОЛУЧИШЬ          */}
      {/* ═══════════════════════════════ */}
      <section className="section-pad" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-sm font-medium mb-4 uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
              Результат
            </p>
            <h2 style={{ fontSize: "clamp(32px, 6vw, 60px)" }} className="mb-16">
              Документ о&nbsp;тебе, точнее чем 10&nbsp;сессий терапии.
            </h2>
          </Reveal>

          <div className="space-y-0">
            {[
              { num: "01", title: "Портрет", text: "Кто ты на самом деле. Простым языком. Прочитаешь и скажешь 'блин, точно'. Не типология — настоящее описание." },
              { num: "02", title: "Карта паттернов", text: "Конкретные схемы, которые управляют тобой. 'Я должен быть идеальным', 'Мир опасен'. Откуда они и как проявляются." },
              { num: "03", title: "Сильные стороны", text: "То, что у тебя получается легко. Ты это не замечаешь — это твоя суперсила." },
              { num: "04", title: "Слепые зоны", text: "Где ты врёшь себе. Говоришь 'мне норм' — а внутри одиноко. Конкретные расхождения." },
              { num: "05", title: "Тело и стресс", text: "Как стресс живёт в теле. Бьёшь, бежишь или замираешь. Почему 'успокойся' не работает." },
              { num: "06", title: "Что делать", text: "Конкретно: с чего начать, что важнее, готов ли ты и есть ли ресурс. Не 'работай над собой'." },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 0.06}>
                <div className="flex gap-8 md:gap-12 py-10 border-b" style={{ borderColor: "var(--border)" }}>
                  <span className="font-mono text-sm shrink-0 pt-2" style={{ color: "var(--text-muted)" }}>{item.num}</span>
                  <div>
                    <h3 className="font-display text-3xl md:text-4xl mb-3">{item.title}</h3>
                    <p style={{ color: "var(--text-secondary)" }} className="text-lg leading-relaxed max-w-lg">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ */}
      {/*     AI-ПЕРСОНАЛИЗАЦИЯ           */}
      {/* ═══════════════════════════════ */}
      <section className="section-accent section-pad">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-sm font-medium mb-4 uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.5)" }}>
              Бонус
            </p>
            <h2 style={{ fontSize: "clamp(32px, 6vw, 60px)" }}>
              Дай этот мануал своему AI — и&nbsp;он наконец тебя поймёт.
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-8 text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
              ChatGPT даёт тебе общие советы? &laquo;Попробуй медитацию&raquo;, &laquo;Поставь цели&raquo;. Одинаковые для всех. Потому что AI не знает кто ты.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Подбирает советы под ТВОЙ тип",
                "Знает твои триггеры",
                "Говорит в стиле, который ТЕБЕ помогает",
                "Учитывает твои ценности",
              ].map((item) => (
                <div key={item} className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <p className="text-white text-base font-medium">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-8 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              Экспорт в ChatGPT Custom Instructions · Claude Projects · Markdown · JSON
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════ */}
      {/*           НАУКА                 */}
      {/* ═══════════════════════════════ */}
      <section className="section-pad">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <Reveal>
                <h2 style={{ fontSize: "clamp(32px, 5vw, 50px)" }}>
                  Не гороскоп.{" "}
                  <span style={{ color: "var(--text-muted)" }}>Не MBTI. Клинические инструменты.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  MBTI ненадёжный — половина людей получает другой тип через месяц. Мы используем только то, что проверено на десятках тысяч людей.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Big Five (IPIP-NEO) · ECR-R · DERS · YSQ-S3 · ACE · PVQ-RR · DSQ · AAQ-II · IFS · SDT · Polyvagal · MAIA · Neff · Loevinger · McAdams · Kegan · Linville · Thomas-Kilmann
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { val: "22+", label: "фреймворков" },
                { val: String(TOTAL), label: "вопросов" },
                { val: "87–95%", label: "надёжность" },
                { val: "$0", label: "вместо $174/сессия" },
              ].map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08}>
                  <div>
                    <p className="font-display" style={{ fontSize: "clamp(48px, 7vw, 80px)", color: "var(--text)" }}>{s.val}</p>
                    <p className="text-sm uppercase tracking-wider mt-2" style={{ color: "var(--text-muted)" }}>{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ */}
      {/*         ФИНАЛЬНЫЙ CTA           */}
      {/* ═══════════════════════════════ */}
      <section className="section-dark section-pad text-center">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <h2 style={{ fontSize: "clamp(32px, 6vw, 60px)" }} className="text-white">
              Хватит жить по&nbsp;программе, которую ты <span className="italic">не&nbsp;выбирал.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-lg" style={{ color: "rgba(255,255,255,0.5)" }}>
              {sessions.length} сессий. {TOTAL} вопросов. Полная инструкция к себе. Бесплатно.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <Link href="/scan">
              <motion.button
                whileHover={{ scale: 0.98 }}
                whileTap={{ scale: 0.96 }}
                className="mt-10 px-12 py-6 text-xl font-medium rounded-xl transition-colors duration-300"
                style={{ background: "white", color: "var(--bg-dark)" }}
              >
                Пройти сканирование
              </motion.button>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="section-pad py-12 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
          <p className="font-display" style={{ color: "var(--text-secondary)" }}>Psyche Scan</p>
          <p>Не заменяет терапию. Инструмент самопознания.</p>
          <div className="flex gap-4">
            <Link href="/scan" className="hover:underline">Тесты</Link>
            <Link href="/results" className="hover:underline">Результаты</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
