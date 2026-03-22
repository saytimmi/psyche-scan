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
      viewport={{ once: true, amount: 0.15 }}
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

      {/* ═══════════════════════════════ */}
      {/*            HERO                 */}
      {/* ═══════════════════════════════ */}
      <section ref={heroRef} className="section min-h-screen flex items-end pb-20 pt-32">
        <motion.div style={{ y: heroY, opacity: heroOp }} className="max-w-5xl">
          <Reveal>
            <p className="text-sm font-mono mb-8" style={{ color: "var(--accent)", letterSpacing: "0.15em" }}>
              PSYCHE SCAN
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 style={{ fontSize: "clamp(3rem, 10vw, 8.25rem)", lineHeight: "83%", letterSpacing: "-0.1875rem" }}>
              Инструкция{" "}
              <span className="italic">к&nbsp;себе,</span>
              <br />
              которой у&nbsp;тебя
              <br />
              <span style={{ color: "var(--accent)" }}>никогда не&nbsp;было.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-10 text-lg max-w-xl" style={{ color: "var(--text-70)", lineHeight: 1.6 }}>
              Страхи, привычки и паттерны управляют твоей жизнью. Но мануала к себе тебе никто не давал.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/scan">
                <button className="btn-accent px-8 py-4 text-lg">Пройти сканирование</button>
              </Link>
              <Link href="#psyche">
                <button className="btn-ghost px-8 py-4 text-lg">Как это работает</button>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="mt-8 flex gap-6 text-xs font-mono" style={{ color: "var(--text-40)" }}>
              <span>{sessions.length} сессий</span>
              <span>{TOTAL} вопросов</span>
              <span>22+ фреймворков</span>
              <span>бесплатно</span>
            </div>
          </Reveal>
        </motion.div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════════════ */}
      {/*     КАК РАБОТАЕТ ПСИХИКА        */}
      {/* ═══════════════════════════════ */}
      <section id="psyche" className="section scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
              Ты — нейросеть,
              <br />
              <span style={{ color: "var(--accent)" }}>обученная на своём детстве.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-12 text-xl leading-relaxed max-w-2xl" style={{ color: "var(--text-70)" }}>
              С рождения до ~7 лет твой мозг записывал всё. Не слова — ощущения. Как с тобой обращались, что было безопасно, что было больно. Из этого он построил модель мира.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { rule: "Покажу слабость — накажут", result: "Прячешь эмоции" },
                { rule: "Буду идеальным — будут любить", result: "Вкалываешь до выгорания" },
                { rule: "Люди уходят", result: "Не привязываешься" },
              ].map((item) => (
                <div key={item.rule} className="rounded-2xl p-8"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <p className="text-lg font-display mb-3" style={{ color: "var(--text)" }}>
                    &ldquo;{item.rule}&rdquo;
                  </p>
                  <p className="text-sm font-mono" style={{ color: "var(--accent)" }}>
                    → {item.result}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-12 text-xl leading-relaxed max-w-2xl" style={{ color: "var(--text-70)" }}>
              Эти правила работают до сих пор. Ты их не выбирал. Ты их даже не видишь — потому что смотришь на мир{" "}
              <span style={{ color: "var(--text)" }}>через них</span>.
              Как рыба не видит воду.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 rounded-2xl p-8 md:p-10"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <p className="text-xl font-medium mb-6" style={{ color: "var(--text)" }}>Поэтому ты:</p>
              <div className="space-y-4">
                {[
                  ["Бросаешь проекты", "страх провала"],
                  ["Молчишь вместо того чтобы сказать", "страх отвержения"],
                  ["Откладываешь", "перфекционизм из детства"],
                  ["Выбираешь одинаковых партнёров", "привязанность, которую повторяешь"],
                ].map(([action, reason]) => (
                  <div key={action} className="flex items-baseline gap-3">
                    <span style={{ color: "var(--accent)" }} className="text-lg">•</span>
                    <p className="text-lg">
                      <span style={{ color: "var(--text)" }}>{action}</span>
                      <span style={{ color: "var(--text-40)" }}> — {reason}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <p className="mt-14 font-display text-2xl md:text-3xl leading-snug">
              Psyche Scan показывает тебе эту программу.{" "}
              <span style={{ color: "var(--text-40)" }}>
                Не через годы терапии. А через {TOTAL} вопросов, которые используют клинические психологи.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════════════ */}
      {/*         9 СЛОЁВ                 */}
      {/* ═══════════════════════════════ */}
      <section className="section">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-sm font-mono mb-6" style={{ color: "var(--accent)", letterSpacing: "0.15em" }}>
              КАК МРТ, НО ДЛЯ ПСИХИКИ
            </p>
            <h2 className="mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
              9 слоёв.
              <br />
              <span style={{ color: "var(--text-40)" }}>От поверхности до ядра.</span>
            </h2>
            <p className="text-lg max-w-lg mb-14" style={{ color: "var(--text-40)" }}>
              Каждая сессия сканирует другой слой. По 5-15 минут. За один вечер или за неделю.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sessions.map((session, i) => {
              const isDone = done[session.id] ?? false;
              const qCount = session.sections.reduce((a, s) => a + s.questions.length, 0);
              const descs = [
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
                    <div className="tile p-7 h-full cursor-pointer">
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-3xl">{session.icon}</span>
                        <span className="font-mono text-xs" style={{ color: "var(--text-20)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl mb-2" style={{ color: "var(--text)" }}>{session.title}</h3>
                      <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--text-40)" }}>
                        {descs[i]}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs" style={{ color: "var(--text-20)" }}>
                          {qCount} вопросов · ~{session.estimatedMinutes} мин
                        </span>
                        {isDone && (
                          <span className="text-xs font-mono px-2 py-0.5 rounded-full"
                            style={{ background: "var(--accent)", color: "var(--bg)" }}>
                            ✓
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

      <div className="divider" />

      {/* ═══════════════════════════════ */}
      {/*       ЧТО ТЫ ПОЛУЧИШЬ          */}
      {/* ═══════════════════════════════ */}
      <section className="section">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-sm font-mono mb-6" style={{ color: "var(--accent)", letterSpacing: "0.15em" }}>
              РЕЗУЛЬТАТ
            </p>
            <h2 className="mb-16" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
              Документ о&nbsp;тебе,
              <br />
              <span style={{ color: "var(--accent)" }}>точнее чем 10&nbsp;сессий терапии.</span>
            </h2>
          </Reveal>

          {[
            { num: "01", title: "Портрет", text: "Кто ты на самом деле. Простым языком. Прочитаешь и скажешь 'блин, точно'." },
            { num: "02", title: "Карта паттернов", text: "Конкретные схемы: 'Я должен быть идеальным', 'Мир опасен'. Откуда они и как проявляются." },
            { num: "03", title: "Сильные стороны", text: "То, что получается легко. Ты не замечаешь — это суперсила." },
            { num: "04", title: "Слепые зоны", text: "Где врёшь себе. Говоришь 'норм' — а внутри одиноко." },
            { num: "05", title: "Тело и стресс", text: "Бьёшь, бежишь или замираешь. Почему 'успокойся' не работает." },
            { num: "06", title: "Что делать", text: "Конкретно: с чего начать, что важнее, готов ли ты." },
          ].map((item, i) => (
            <Reveal key={item.num} delay={i * 0.05}>
              <div className="flex gap-8 md:gap-12 py-10" style={{ borderBottom: "1px solid var(--border)" }}>
                <span className="font-mono text-sm shrink-0 pt-2" style={{ color: "var(--accent)" }}>{item.num}</span>
                <div>
                  <h3 className="font-display text-3xl md:text-4xl mb-3" style={{ lineHeight: 1.1, color: "var(--text)" }}>
                    {item.title}
                  </h3>
                  <p className="text-lg leading-relaxed" style={{ color: "var(--text-40)" }}>{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════════════ */}
      {/*     AI-ПЕРСОНАЛИЗАЦИЯ           */}
      {/* ═══════════════════════════════ */}
      <section className="section" style={{ background: "var(--accent)", color: "var(--bg)" }}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-sm font-mono mb-6" style={{ color: "rgba(10,10,10,0.4)", letterSpacing: "0.15em" }}>
              БОНУС
            </p>
            <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--bg)" }}>
              Дай этот мануал своему AI&nbsp;— и&nbsp;он наконец тебя поймёт.
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-10 text-xl leading-relaxed" style={{ color: "rgba(10,10,10,0.7)" }}>
              ChatGPT даёт общие советы? &laquo;Медитируй&raquo;, &laquo;Поставь цели&raquo;. Одинаковые для всех. Потому что AI не знает кто ты.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Подбирает советы под ТВОЙ тип",
                "Знает твои триггеры",
                "Говорит в стиле, который ТЕБЕ помогает",
                "Учитывает твои ценности",
              ].map((item) => (
                <div key={item} className="rounded-2xl p-6"
                  style={{ background: "rgba(10,10,10,0.08)", border: "1px solid rgba(10,10,10,0.1)" }}>
                  <p className="font-medium" style={{ color: "var(--bg)" }}>{item}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-8 text-sm font-mono" style={{ color: "rgba(10,10,10,0.3)" }}>
              Экспорт: ChatGPT · Claude · Markdown · JSON
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════ */}
      {/*           НАУКА                 */}
      {/* ═══════════════════════════════ */}
      <section className="section">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <Reveal>
                <p className="text-sm font-mono mb-6" style={{ color: "var(--accent)", letterSpacing: "0.15em" }}>
                  НАУКА
                </p>
                <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 3.6rem)" }}>
                  Не гороскоп.
                  <br />
                  <span style={{ color: "var(--text-40)" }}>Не MBTI. Клинические инструменты.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-8 text-base leading-relaxed" style={{ color: "var(--text-40)" }}>
                  MBTI ненадёжный — половина людей получает другой тип через месяц. Мы используем только то, что проверено на десятках тысяч людей.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-6 text-xs font-mono leading-relaxed" style={{ color: "var(--text-20)" }}>
                  Big Five (IPIP-NEO) · ECR-R · DERS · YSQ-S3 · ACE · PVQ-RR · DSQ · AAQ-II · IFS · SDT · Polyvagal · MAIA · Neff · Loevinger · McAdams · Kegan · Linville · Thomas-Kilmann
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-2 gap-8 content-start">
              {[
                { val: "22+", label: "фреймворков" },
                { val: String(TOTAL), label: "вопросов" },
                { val: "87–95%", label: "надёжность" },
                { val: "$0", label: "вместо $174" },
              ].map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08}>
                  <div>
                    <p className="font-display" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "var(--accent)", lineHeight: 1 }}>
                      {s.val}
                    </p>
                    <p className="text-xs font-mono uppercase tracking-wider mt-2" style={{ color: "var(--text-40)" }}>
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════════════ */}
      {/*         ФИНАЛЬНЫЙ CTA           */}
      {/* ═══════════════════════════════ */}
      <section className="section text-center">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
              Хватит жить по&nbsp;программе,{" "}
              <span style={{ color: "var(--accent)" }} className="italic">которую ты не&nbsp;выбирал.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 text-lg" style={{ color: "var(--text-40)" }}>
              {sessions.length} сессий. {TOTAL} вопросов. Полная инструкция к себе. Бесплатно.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <Link href="/scan">
              <button className="btn-accent mt-12 px-12 py-6 text-xl">
                Пройти сканирование
              </button>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 md:px-10 py-12" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: "var(--text-20)" }}>
          <span className="font-display" style={{ color: "var(--accent)" }}>Psyche Scan</span>
          <span>Не заменяет терапию. Инструмент самопознания.</span>
          <div className="flex gap-4">
            <Link href="/scan" className="hover:underline">Тесты</Link>
            <Link href="/results" className="hover:underline">Результаты</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
