"use client";

import { sessions, getTotalQuestionCount } from "@/data/questions";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const TOTAL = getTotalQuestionCount();
const TOTAL_MINUTES = sessions.reduce((a, s) => a + s.estimatedMinutes, 0);
const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number];

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, ease: EASE },
};

const stagger = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: { once: true, margin: "-40px" } as const,
  variants: {
    visible: { transition: { staggerChildren: 0.07 } },
    hidden: {},
  },
};

const itemFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// ────────────────────────────────────
// Counter
// ────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const ran = useRef(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView || ran.current || !ref.current) return;
    ran.current = true;
    const el = ref.current;
    const dur = 1600;
    const t0 = performance.now();
    (function tick(now: number) {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = String(Math.round((1 - Math.pow(1 - p, 3)) * target)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }, [inView, target, suffix]);

  return <motion.span ref={ref} onViewportEnter={() => setInView(true)}>0{suffix}</motion.span>;
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

  const completedCount = Object.values(completedMap).filter(Boolean).length;

  return (
    <main className="noise">
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 flex items-center justify-between bg-background/60 backdrop-blur-xl border-b border-white/[0.03]">
        <Link href="/" className="font-display text-lg text-foreground/70 hover:text-foreground transition-colors">
          Psyche Scan
        </Link>
        <Link href="/scan">
          <button className="px-5 py-2 text-sm bg-accent text-white rounded-full hover:bg-accent-dim transition-colors">
            Начать
          </button>
        </Link>
      </nav>

      {/* ══════════════════════════════ */}
      {/*            HERO               */}
      {/* ══════════════════════════════ */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center max-w-3xl"
        >
          <h1 className="font-display leading-[0.9] tracking-[-0.02em] mb-8" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
            <span className="text-foreground/90">Ты не сломан.</span>
            <br />
            <span className="italic text-accent-bright">У тебя просто нет</span>
            <br />
            <span className="italic text-accent-bright">инструкции к себе.</span>
          </h1>

          <p className="text-muted-light text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-4">
            Глубинное профилирование личности. {sessions.length}&nbsp;сессий, {TOTAL}&nbsp;вопросов,
            22+&nbsp;научных фреймворка. В&nbsp;конце&nbsp;— полный документ о&nbsp;тебе.
          </p>

          <p className="text-muted text-sm mb-10">
            ~{TOTAL_MINUTES} минут · бесплатно · результат сразу
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/scan">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-accent text-white rounded-xl text-lg font-medium cta-glow hover:bg-accent-dim transition-colors"
              >
                Пройти сканирование
              </motion.button>
            </Link>
            <Link href="#how-it-works">
              <button className="px-6 py-4 text-muted-light hover:text-foreground text-lg transition-colors">
                Как это работает ↓
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted/60"
        >
          <span>Big Five (IPIP-NEO)</span>
          <span className="text-accent/30">·</span>
          <span>Attachment (ECR-R)</span>
          <span className="text-accent/30">·</span>
          <span>Schemas (YSQ-S3)</span>
          <span className="text-accent/30">·</span>
          <span>ACE</span>
          <span className="text-accent/30">·</span>
          <span>DERS</span>
          <span className="text-accent/30">·</span>
          <span>+17 ещё</span>
        </motion.div>
      </section>

      {/* ══════════════════════════════ */}
      {/*         PROBLEM (compact)     */}
      {/* ══════════════════════════════ */}
      <section className="section-alt py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2 {...fadeIn} className="font-display text-3xl md:text-4xl mb-10 text-foreground/90">
            Знакомо?
          </motion.h2>

          <motion.div {...stagger} className="space-y-5 mb-10">
            {[
              "Ставишь цель — и через две недели забиваешь.",
              "Знаешь что надо поговорить — но молчишь.",
              "Начинаешь проект на энтузиазме — и бросаешь.",
            ].map((text, i) => (
              <motion.p key={i} variants={itemFade} className="text-lg text-muted-light leading-relaxed pl-5 border-l-2 border-accent/30">
                {text}
              </motion.p>
            ))}
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.2, duration: 0.6 }}>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Это не лень и не слабость. Внутри работает <span className="text-accent-bright font-medium">программа</span> — набор убеждений и страхов из детства. Ты их не выбирал. Ты их даже не видишь.
            </p>
            <p className="text-lg text-accent mt-3">
              Здесь ты их увидишь.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════ */}
      {/*         SCIENCE / TRUST       */}
      {/* ══════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeIn} className="mb-16">
            <p className="text-accent text-sm font-medium mb-3">Не гороскоп. Не MBTI.</p>
            <h2 className="font-display text-3xl md:text-5xl leading-[0.95] text-foreground/90 mb-4">
              Только то, что проверено наукой
            </h2>
            <p className="text-muted-light text-lg max-w-2xl">
              MBTI ненадёжный — половина людей получает другой тип через месяц. Мы используем фреймворки с надёжностью 84-95%.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: 22, suffix: "+", label: "фреймворков" },
              { value: TOTAL, suffix: "", label: "вопросов" },
              { value: 9, suffix: "", label: "слоёв анализа" },
              { value: 80, suffix: "%", label: "точность" },
            ].map((s, i) => (
              <motion.div key={s.label} {...fadeIn} transition={{ delay: i * 0.08, duration: 0.5 }}>
                <p className="font-display text-accent-bright leading-none mb-1" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs text-muted uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Framework grid */}
          <motion.div {...stagger} className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "Big Five", desc: "5 главных черт характера", stat: "87-93%" },
              { name: "Привязанность", desc: "Как строишь отношения", stat: "ECR-R" },
              { name: "Эмоции", desc: "Регуляция чувств", stat: "93-95%" },
              { name: "Схемы", desc: "Убеждения из детства", stat: "18 схем" },
              { name: "Детский опыт", desc: "Влияние на поведение", stat: "ACE" },
              { name: "Ценности", desc: "Что для тебя важно", stat: "49+ культур" },
              { name: "Защиты", desc: "Механизмы психики", stat: "3 уровня" },
              { name: "Гибкость", desc: "Готовность меняться", stat: "AAQ-II" },
            ].map((tool) => (
              <motion.div
                key={tool.name}
                variants={itemFade}
                className="bg-surface border border-border rounded-lg p-4 hover:border-border-light transition-colors duration-300"
              >
                <p className="font-medium text-foreground/90 text-sm mb-0.5">{tool.name}</p>
                <p className="text-xs text-muted leading-snug mb-2">{tool.desc}</p>
                <p className="text-[10px] text-accent font-mono">{tool.stat}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════ */}
      {/*       HOW IT WORKS / 9 SESSIONS */}
      {/* ══════════════════════════════ */}
      <section id="how-it-works" className="section-alt py-24 md:py-32 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeIn} className="mb-16">
            <p className="text-accent text-sm font-medium mb-3">Процесс</p>
            <h2 className="font-display text-3xl md:text-5xl leading-[0.95] text-foreground/90">
              9 слоёв глубины
            </h2>
          </motion.div>

          <motion.div {...stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sessions.map((session, i) => {
              const isDone = completedMap[session.id] ?? false;
              const qCount = session.sections.reduce((a, s) => a + s.questions.length, 0);

              return (
                <motion.div key={session.id} variants={itemFade}>
                  <Link href={`/session/${session.id}`}>
                    <div className={`group bg-surface border rounded-xl p-5 h-full hover:border-accent/30 transition-all duration-300 ${isDone ? "border-accent/20" : "border-border"}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-accent/50">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-xl">{session.icon}</span>
                        </div>
                        {isDone && (
                          <span className="text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                            Пройден
                          </span>
                        )}
                      </div>

                      <h3 className="font-display text-lg mb-1 group-hover:text-accent-bright transition-colors">
                        {session.title}
                      </h3>
                      <p className="text-xs text-muted-light mb-3">{session.subtitle}</p>
                      <p className="text-xs text-muted leading-relaxed mb-4 line-clamp-2">{session.description}</p>

                      <div className="flex gap-4 text-[10px] text-muted/60 font-mono">
                        <span>{qCount} вопросов</span>
                        <span>~{session.estimatedMinutes} мин</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {completedCount > 0 && (
            <motion.div {...fadeIn} className="mt-8 text-center">
              <Link href="/results" className="text-accent hover:text-accent-bright text-sm transition-colors">
                Посмотреть текущие результаты ({completedCount}/{sessions.length}) →
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════ */}
      {/*       WHAT YOU GET            */}
      {/* ══════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeIn} className="mb-16">
            <p className="text-accent text-sm font-medium mb-3">Результат</p>
            <h2 className="font-display text-3xl md:text-5xl leading-[0.95] text-foreground/90 mb-4">
              В конце ты получишь
            </h2>
            <p className="text-muted-light text-lg max-w-2xl">
              Не &laquo;ты экстраверт, поздравляем&raquo;. Конкретный разбор: откуда паттерны, что тормозит, и что с этим делать.
            </p>
          </motion.div>

          <motion.div {...stagger} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { num: "01", title: "Портрет", desc: "Какой ты человек — простым языком. Прочитаешь и скажешь 'блин, точно'.", accent: true },
              { num: "02", title: "Сильные стороны", desc: "То, что у тебя получается легко. Ты это не замечаешь — а это суперсила." },
              { num: "03", title: "Где тормозишь", desc: "Убеждения типа 'я должен быть идеальным'. Они рулят тобой каждый день." },
              { num: "04", title: "Роли и маски", desc: "На работе один, с друзьями другой, дома — третий. Какие роли навязаны." },
              { num: "05", title: "Слепые зоны", desc: "Говоришь 'мне норм' а внутри одиноко. Конкретные расхождения." },
              { num: "06", title: "Что делать", desc: "Конкретно: с чего начать, что важнее, готов ли ты вообще.", accent: true },
              { num: "07", title: "Тело и стресс", desc: "Как стресс живёт в теле. Бьёшь, бежишь или замираешь — и почему." },
              { num: "08", title: "Файл для AI", desc: "Профиль для ChatGPT или Claude. Бот моментально понимает тебя.", accent: true },
              { num: "09", title: "Инструкция", desc: "'Как со мной общаться' — для коллег, партнёра, друзей." },
            ].map((item) => (
              <motion.div
                key={item.num}
                variants={itemFade}
                className={`bg-surface border border-border rounded-xl p-6 hover:border-border-light transition-colors duration-300 ${item.accent ? "md:col-span-1 border-accent/10" : ""}`}
              >
                <span className="font-mono text-[10px] text-accent/40">{item.num}</span>
                <h3 className="font-display text-lg mt-1 mb-2 text-foreground/95">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════ */}
      {/*          FINAL CTA            */}
      {/* ══════════════════════════════ */}
      <section className="section-alt py-24 md:py-32">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div {...fadeIn}>
            <h2 className="font-display text-3xl md:text-5xl leading-[0.95] mb-6">
              <span className="text-foreground/90">Хватит гадать.</span>
              <br />
              <span className="italic text-accent-bright">Пора разобраться.</span>
            </h2>

            <p className="text-muted-light text-lg mb-10">
              {sessions.length} блоков по 5-15 минут. Бесплатно. Результат сразу.
              <br />
              <span className="text-muted text-sm">Чем честнее ответишь — тем точнее результат.</span>
            </p>

            <Link href="/scan">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-5 bg-accent text-white rounded-xl text-xl font-medium cta-glow hover:bg-accent-dim transition-colors"
              >
                Пройти сканирование
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 py-12 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted/50">
          <p className="font-display text-sm text-muted/60">Psyche Scan</p>
          <p>Не заменяет терапию. Инструмент самопознания.</p>
          <div className="flex gap-4">
            <Link href="/scan" className="hover:text-accent transition-colors">Тесты</Link>
            <Link href="/results" className="hover:text-accent transition-colors">Результаты</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
