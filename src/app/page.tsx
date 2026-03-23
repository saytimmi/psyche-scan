"use client";

import { sessions, getTotalQuestionCount } from "@/data/questions";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState, useRef } from "react";

const TOTAL = getTotalQuestionCount();
const EASE = [0.65, 0.05, 0, 1] as [number, number, number, number];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.75, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const m: Record<string, boolean> = {};
    for (const s of sessions) m[s.id] = localStorage.getItem(`psyche_completed_${s.id}`) === "true";
    setDone(m);
  }, []);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroOp = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main>
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
        style={{ background: "rgba(10,10,10,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)" }}>
        <span className="font-display text-lg" style={{ color: "var(--accent)" }}>Psyche Scan</span>
        <Link href="/scan">
          <button className="btn-accent px-5 py-2.5 text-sm">Начать</button>
        </Link>
      </nav>

      {/* ═══════════════════════════════════════════════ */}
      {/*  SECTION 1: HERO — full viewport, bottom-left  */}
      {/*  (like Lando: massive text, bottom-aligned)     */}
      {/* ═══════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen flex flex-col justify-end px-6 md:px-10 pb-16">
        <motion.div style={{ y: heroY, opacity: heroOp }} className="max-w-6xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-sm font-mono mb-6"
            style={{ color: "var(--accent)", letterSpacing: "0.15em" }}
          >
            DEEP PERSONALITY PROFILING
          </motion.p>

          <h1 style={{ fontSize: "clamp(3rem, 10vw, 8.25rem)", lineHeight: "83%", letterSpacing: "-0.1875rem" }}>
            <motion.span className="block" initial={{ y: "110%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.9, ease: EASE }}>
              Инструкция
            </motion.span>
            <motion.span className="block italic" initial={{ y: "110%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.45, duration: 0.9, ease: EASE }}>
              <span style={{ color: "var(--accent)" }}>к&nbsp;себе</span>
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row items-start gap-4"
          >
            <Link href="/scan">
              <button className="btn-accent px-8 py-4 text-lg">Пройти сканирование</button>
            </Link>
            <Link href="#psyche">
              <button className="btn-ghost px-8 py-4 text-lg">Узнать больше</button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll hint — bottom right */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 right-6 md:right-10 text-xs font-mono"
          style={{ color: "var(--text-20)", writingMode: "vertical-rl" }}
        >
          SCROLL
        </motion.p>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/*  SECTION 2: MARQUEE — horizontal scrolling     */}
      {/*  framework names (like Lando's image carousel)  */}
      {/* ═══════════════════════════════════════════════ */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "20px 0", overflow: "hidden" }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex items-center shrink-0">
              {["Big Five", "ECR-R", "DERS", "YSQ-S3", "ACE", "PVQ-RR", "DSQ", "AAQ-II", "IFS", "SDT", "Polyvagal", "MAIA", "Neff", "Loevinger", "McAdams", "Kegan", "Linville", "Thomas-Kilmann"].map((fw) => (
                <span key={`${rep}-${fw}`} className="text-sm font-mono shrink-0 mx-8" style={{ color: "var(--text-20)" }}>
                  {fw}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/*  SECTION 3: PSYCHE — asymmetric 2-col split    */}
      {/*  big text LEFT, rule cards RIGHT                */}
      {/*  (like Lando's On/Off Track dual section)       */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="psyche" className="section scroll-mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* LEFT — 3 cols */}
          <div className="lg:col-span-3">
            <Reveal>
              <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                Ты — нейросеть,
                <br />
                <span style={{ color: "var(--accent)" }}>обученная на&nbsp;своём детстве.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-10 text-xl leading-relaxed" style={{ color: "var(--text-70)" }}>
                С рождения до ~7 лет твой мозг записывал всё. Не слова — ощущения. Как с тобой обращались, что было безопасно, что было больно.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-xl leading-relaxed" style={{ color: "var(--text-70)" }}>
                Из этого он построил модель мира. Набор правил, которые <span style={{ color: "var(--text)" }}>работают до сих пор</span>. Ты их не видишь — потому что смотришь на мир через них. Как рыба не видит воду.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-10 font-display text-2xl md:text-3xl leading-snug">
                Psyche Scan показывает тебе эту программу.
              </p>
            </Reveal>
          </div>

          {/* RIGHT — 2 cols — rule cards stacked */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { rule: "Покажу слабость — накажут", result: "Прячешь эмоции" },
              { rule: "Буду идеальным — будут любить", result: "Вкалываешь до выгорания" },
              { rule: "Люди уходят", result: "Не привязываешься" },
              { rule: "Мир опасен", result: "Контролируешь всё" },
            ].map((item, i) => (
              <Reveal key={item.rule} delay={i * 0.08}>
                <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <p className="font-display text-lg mb-2">&ldquo;{item.rule}&rdquo;</p>
                  <p className="text-sm font-mono" style={{ color: "var(--accent)" }}>→ {item.result}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/*  SECTION 4: ACCENT STRIP — full-width bold      */}
      {/*  single statement (like Lando's theme switches)  */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="accent-strip">
        <Reveal>
          <p className="font-display text-center" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.1 }}>
            Это не лень. Не &laquo;характер&raquo;.
            <br />
            Это программа, которая запустилась когда тебе было 5&nbsp;лет.
          </p>
        </Reveal>
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/*  SECTION 5: 9 SESSIONS — staggered masonry      */}
      {/*  first card BIG, rest varied                     */}
      {/*  (like Lando's helmet gallery — varied grid)     */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="section">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="text-sm font-mono mb-4" style={{ color: "var(--accent)", letterSpacing: "0.15em" }}>9 СЛОЁВ</p>
                <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                  От поверхности<br /><span style={{ color: "var(--text-40)" }}>до ядра.</span>
                </h2>
              </div>
              <p className="hidden md:block text-sm" style={{ color: "var(--text-40)" }}>
                По 5-15 мин · за вечер или за неделю
              </p>
            </div>
          </Reveal>

          <div className="stagger-grid">
            {sessions.map((session, i) => {
              const isDone = done[session.id] ?? false;
              const qCount = session.sections.reduce((a, s) => a + s.questions.length, 0);
              const descs = [
                "Big Five: общительность, тревожность, открытость, добросовестность, нейротизм",
                "Как строишь близкие отношения. Почему они рушатся одинаково",
                "Эмоции, страхи, схемы из детства. 18 глубинных паттернов",
                "Твоя история своими словами. 16 открытых вопросов",
                "Мотивация, внутренние части, поведение под давлением",
                "Сильные стороны, хронотип, стиль конфликта, отношение к деньгам",
                "Защитные механизмы, теневые стороны, роли которые играешь",
                "Смысл жизни, ценности, готовность к изменениям, ресурсы",
                "Объектные отношения, нарративная идентичность, иммунитет к изменениям",
              ];
              const isLarge = i === 0 || i === 4;

              return (
                <Reveal key={session.id} delay={i * 0.04}>
                  <Link href={`/session/${session.id}`}>
                    <div className={`tile p-6 md:p-8 h-full cursor-pointer ${isLarge ? "flex flex-col justify-between" : ""}`}
                      style={{ minHeight: isLarge ? "280px" : "auto" }}>
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className={isLarge ? "text-4xl" : "text-2xl"}>{session.icon}</span>
                          <span className="font-mono text-xs" style={{ color: "var(--text-20)" }}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className={`font-display ${isLarge ? "text-3xl mb-3" : "text-xl mb-2"}`}>{session.title}</h3>
                        <p className={`leading-relaxed ${isLarge ? "text-base" : "text-sm"}`} style={{ color: "var(--text-40)" }}>
                          {descs[i]}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-4">
                        <span className="font-mono text-xs" style={{ color: "var(--text-20)" }}>
                          {qCount} вопросов · ~{session.estimatedMinutes} мин
                        </span>
                        {isDone && (
                          <span className="text-xs font-mono px-2 py-0.5 rounded-full"
                            style={{ background: "var(--accent)", color: "var(--bg)" }}>✓</span>
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

      <div className="divider" />

      {/* ═══════════════════════════════════════════════ */}
      {/*  SECTION 6: DELIVERABLES — alternating L/R      */}
      {/*  (like magazine layout, NOT a grid)              */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="section">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-sm font-mono mb-6" style={{ color: "var(--accent)", letterSpacing: "0.15em" }}>РЕЗУЛЬТАТ</p>
            <h2 className="mb-20" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
              Документ о&nbsp;тебе,<br />
              <span style={{ color: "var(--accent)" }}>точнее чем 10&nbsp;сессий терапии.</span>
            </h2>
          </Reveal>

          {[
            { num: "01", title: "Портрет", text: "Кто ты на самом деле. Простым языком. Не типология — настоящее описание." },
            { num: "02", title: "Карта паттернов", text: "Схемы, которые тобой управляют. Откуда они и как проявляются каждый день." },
            { num: "03", title: "Сильные стороны", text: "То, что получается легко. Ты не замечаешь — это суперсила." },
            { num: "04", title: "Слепые зоны", text: "Где врёшь себе. Конкретные расхождения между словами и действиями." },
            { num: "05", title: "Тело и стресс", text: "Бьёшь, бежишь или замираешь. Почему 'успокойся' не работает." },
            { num: "06", title: "Что делать", text: "С чего начать, что важнее, готов ли ты. Не 'работай над собой'." },
          ].map((item, i) => {
            const isEven = i % 2 === 0;
            return (
              <Reveal key={item.num} delay={i * 0.05}>
                <div className={`flex flex-col md:flex-row ${isEven ? "" : "md:flex-row-reverse"} items-start gap-8 md:gap-16 py-12`}
                  style={{ borderBottom: "1px solid var(--border)" }}>
                  <div className={`md:w-1/3 ${isEven ? "md:text-left" : "md:text-right"}`}>
                    <span className="font-mono text-sm" style={{ color: "var(--accent)" }}>{item.num}</span>
                    <h3 className="font-display text-4xl md:text-5xl mt-1" style={{ lineHeight: 1 }}>{item.title}</h3>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-xl leading-relaxed" style={{ color: "var(--text-70)" }}>{item.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/*  SECTION 7: AI — full accent bg, centered       */}
      {/*  (like Lando's theme-switch sections)            */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="accent-strip" style={{ padding: "clamp(80px, 12vw, 140px) clamp(24px, 5vw, 80px)" }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-center" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1, color: "var(--bg)" }}>
              Дай этот мануал своему AI&nbsp;— и&nbsp;он наконец тебя поймёт.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-10 text-center text-xl max-w-2xl mx-auto" style={{ color: "rgba(10,10,10,0.6)" }}>
              ChatGPT даёт общие советы? Потому что не знает кто ты. С&nbsp;Personality Passport AI подбирает подход конкретно под твой тип.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Советы под\nТВОЙ тип", "Знает твои\nтриггеры", "Говорит в\nТВОЁМ стиле", "Учитывает\nценности"].map((item) => (
                <div key={item} className="rounded-2xl p-6 text-center" style={{ background: "rgba(10,10,10,0.08)", border: "1px solid rgba(10,10,10,0.1)" }}>
                  <p className="font-medium text-sm whitespace-pre-line" style={{ color: "var(--bg)" }}>{item}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 text-center text-xs font-mono" style={{ color: "rgba(10,10,10,0.3)" }}>
              Экспорт: ChatGPT · Claude · Markdown · JSON
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/*  SECTION 8: SCIENCE — split layout               */}
      {/*  numbers LEFT, text RIGHT (asymmetric)           */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="section">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* LEFT — big numbers */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12">
            {[
              { val: "22+", label: "фреймворков" },
              { val: String(TOTAL), label: "вопросов" },
              { val: "87–95%", label: "надёжность" },
              { val: "$0", label: "вместо $174" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <p className="font-display" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "var(--accent)", lineHeight: 1 }}>{s.val}</p>
                <p className="text-xs font-mono uppercase tracking-wider mt-2" style={{ color: "var(--text-40)" }}>{s.label}</p>
              </Reveal>
            ))}
          </div>

          {/* RIGHT — text */}
          <div>
            <Reveal>
              <p className="text-sm font-mono mb-6" style={{ color: "var(--accent)", letterSpacing: "0.15em" }}>НАУКА</p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Не гороскоп. Не MBTI.
                <br />
                <span style={{ color: "var(--text-40)" }}>Клинические инструменты.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed" style={{ color: "var(--text-70)" }}>
                MBTI ненадёжный — половина людей получает другой тип через месяц. Мы используем только то, что проверено на десятках тысяч людей и реально используется в клинической практике.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/*  SECTION 9: MARQUEE 2 — framework names again   */}
      {/* ═══════════════════════════════════════════════ */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "20px 0", overflow: "hidden" }}>
        <div className="marquee-track" style={{ animationDuration: "40s", animationDirection: "reverse" }}>
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex items-center shrink-0">
              {["Big Five", "Привязанность", "Эмоции", "Схемы", "Детский опыт", "Ценности", "Защиты", "Гибкость", "Полагалальная теория", "Нарратив", "Эго", "Метакогниция"].map((fw) => (
                <span key={`${rep}-${fw}`} className="text-sm font-mono shrink-0 mx-8" style={{ color: "var(--text-20)" }}>
                  {fw}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/*  SECTION 10: CTA — full viewport, centered      */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="section min-h-[70vh] flex items-center justify-center text-center">
        <div className="max-w-3xl">
          <Reveal>
            <h2 style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
              Хватит жить по&nbsp;программе,{" "}
              <span style={{ color: "var(--accent)" }} className="italic">которую ты не&nbsp;выбирал.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 text-lg" style={{ color: "var(--text-40)" }}>
              {sessions.length} сессий · {TOTAL} вопросов · бесплатно · результат сразу
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <Link href="/scan">
              <button className="btn-accent mt-12 px-12 py-6 text-xl">Пройти сканирование</button>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER with marquee ── */}
      <footer style={{ borderTop: "1px solid var(--border)" }}>
        <div className="px-6 md:px-10 py-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: "var(--text-20)" }}>
          <span className="font-display" style={{ color: "var(--accent)" }}>Psyche Scan</span>
          <span>Не заменяет терапию</span>
          <div className="flex gap-6">
            <Link href="/scan" className="hover:underline">Тесты</Link>
            <Link href="/results" className="hover:underline">Результаты</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
