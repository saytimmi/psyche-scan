"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState, useRef } from "react";
import EmberParticles from "@/components/EmberParticles";
import { Reveal } from "@/components/Reveal";
import { AbsorptionScene } from "@/components/AbsorptionScene";
import { BlurredPassport } from "@/components/BlurredPassport";
import { ComparisonColumns } from "@/components/ComparisonColumns";
import { CinematicMarquee } from "@/components/CinematicMarquee";

const patterns = [
  {
    belief: "«Покажу слабость — накажут»",
    result: "Прячешь эмоции",
    bg: "rgba(249,115,22,0.05)",
    border: "rgba(249,115,22,0.12)",
    color: "var(--ember)",
  },
  {
    belief: "«Буду идеальным — будут любить»",
    result: "Вкалываешь до выгорания",
    bg: "rgba(220,38,38,0.05)",
    border: "rgba(220,38,38,0.12)",
    color: "var(--ember-deep)",
  },
  {
    belief: "«Люди уходят»",
    result: "Не привязываешься",
    bg: "rgba(251,191,36,0.05)",
    border: "rgba(251,191,36,0.12)",
    color: "var(--ember-warm)",
  },
];

export default function Home() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY.current ? "down" : "up";
    lastScrollY.current = latest;

    setScrolled(latest > 100);

    if (latest > 100) {
      setHidden(direction === "down");
    } else {
      setHidden(false);
    }
  });

  return (
    <main>
      {/* ── NAV ── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4"
        style={{
          background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid var(--text-04)" : "1px solid transparent",
        }}
        animate={{ translateY: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      >
        <span
          className="text-lg"
          style={{ fontFamily: "var(--font-display)", color: "var(--ember)" }}
        >
          Psyche Scan
        </span>
        <Link href="/scan" className="btn-ember px-6 py-2.5 text-sm">
          Начать
        </Link>
      </motion.nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        <EmberParticles />

        <div className="relative z-10 px-6" style={{ maxWidth: 700 }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Ты не знаешь
            <br />
            почему ты такой.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="mt-6 md:text-lg leading-relaxed"
            style={{ color: "var(--text-30)" }}
          >
            Почему срываешься на близких.
            <br />
            Почему тянешь с решениями.
            <br />
            Почему одни отношения — как под копирку.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="mt-5 md:text-xl"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: undefined,
              color: "var(--text-60)",
            }}
          >
            Внутри тебя —{" "}
            <span style={{ color: "var(--ember)" }}>операционная система</span>,
            <br />
            которую ты ни разу не открывал.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="mt-12"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-15)",
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
            }}
          >
            ОТКРОЙ
            <div className="animate-bounce mt-1">↓</div>
          </motion.div>
        </div>
      </section>

      {/* ── EXPLANATION ── */}
      <section className="section">
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              С рождения до 7 лет
              <br />
              мозг записал набор правил.
              <br />
              <span style={{ color: "var(--text-30)" }}>
                Ты вырос. Правила — нет.
              </span>
            </h2>
          </Reveal>

          <div className="mt-10 flex flex-col gap-3">
            {patterns.map((item, i) => (
              <Reveal key={item.belief} delay={0.1 * (i + 1)}>
                <div
                  className="rounded-xl p-5 flex justify-between items-center transition-all duration-500 hover:translate-y-[-2px]"
                  style={{
                    background: item.bg,
                    border: `1px solid ${item.border}`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 15,
                      color: "var(--text-60)",
                    }}
                  >
                    {item.belief}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                      color: item.color,
                    }}
                  >
                    → {item.result}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABSORPTION ── */}
      <AbsorptionScene />

      {/* ── BLURRED PASSPORT ── */}
      <BlurredPassport />

      {/* ── COMPARISON ── */}
      <ComparisonColumns />

      {/* ── TRUST ── */}
      <section className="section">
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              22 клинических теста.
            </h2>
            <p
              className="mt-3"
              style={{ fontSize: 16, color: "var(--text-30)" }}
            >
              Те же, что используют психологи. Только бесплатно.
            </p>
          </Reveal>
        </div>
        <div className="mt-10" style={{ margin: "40px -24px 0" }}>
          <CinematicMarquee />
        </div>
        <div
          className="mt-10"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 48,
            flexWrap: "wrap",
          }}
        >
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 600,
                  color: "var(--ember)",
                  lineHeight: 1,
                }}
              >
                330
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--text-15)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  marginTop: 8,
                }}
              >
                вопросов
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 600,
                  color: "var(--ember)",
                  lineHeight: 1,
                }}
              >
                9
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--text-15)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  marginTop: 8,
                }}
              >
                слоёв
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 600,
                  color: "var(--ember)",
                  lineHeight: 1,
                }}
              >
                $0
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--text-15)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  marginTop: 8,
                }}
              >
                вместо $174
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="section">
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 500,
                lineHeight: 1.1,
                textAlign: "center",
                marginBottom: 56,
              }}
            >
              Это просто.
            </h2>
          </Reveal>

          {[
            {
              num: "1",
              title: "Отвечаешь на вопросы",
              desc: "По 15 минут за раз. За вечер или за неделю.",
            },
            {
              num: "2",
              title: "AI собирает портрет",
              desc: "22 теста → единый документ. Не типология — настоящее описание.",
            },
            {
              num: "3",
              title: "Получаешь инструкцию к себе",
              desc: "Что с тобой, почему, и что делать. Конкретно.",
            },
          ].map((step, i) => (
            <Reveal key={step.num} delay={i * 0.15}>
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--ember), var(--ember-deep))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 15,
                      flexShrink: 0,
                    }}
                  >
                    {step.num}
                  </div>
                  {i < 2 && (
                    <div
                      style={{
                        width: 1,
                        height: 40,
                        background:
                          "linear-gradient(to bottom, rgba(249,115,22,0.3), transparent)",
                        margin: "8px 0",
                      }}
                    />
                  )}
                </div>
                <div style={{ paddingTop: 8 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 18,
                      fontWeight: 500,
                    }}
                  >
                    {step.title}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "var(--text-30)",
                      marginTop: 4,
                    }}
                  >
                    {step.desc}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        className="section"
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(249,115,22,0.06), rgba(220,38,38,0.03) 40%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "glow-pulse 4s ease-in-out infinite",
          }}
        />
        <Reveal>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              position: "relative",
              zIndex: 1,
            }}
          >
            Хватит гадать.
            <br />
            <span style={{ color: "var(--ember)" }}>Узнай.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <Link href="/scan">
            <button
              className="btn-ember"
              style={{
                marginTop: 40,
                padding: "18px 48px",
                fontSize: 18,
                borderRadius: 14,
                position: "relative",
                zIndex: 1,
                cursor: "pointer",
                border: "none",
              }}
            >
              Пройти сканирование
            </button>
          </Link>
        </Reveal>
        <Reveal delay={0.25}>
          <p
            style={{
              marginTop: 20,
              fontSize: 13,
              color: "var(--text-15)",
              position: "relative",
              zIndex: 1,
            }}
          >
            Бесплатно · 5 минут на первую сессию · результат сразу
          </p>
          <p
            style={{
              marginTop: 12,
              fontSize: 11,
              color: "var(--text-08)",
              fontFamily: "var(--font-mono)",
              position: "relative",
              zIndex: 1,
            }}
          >
            2,847 человек уже прошли сканирование
          </p>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid var(--text-04)",
          padding: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 13,
          color: "var(--text-15)",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--ember)",
            fontSize: 16,
          }}
        >
          Psyche Scan
        </span>
        <span>Не заменяет терапию</span>
        <div style={{ display: "flex", gap: 20 }}>
          <Link href="/scan" style={{ color: "var(--text-15)", textDecoration: "none" }}>
            Тесты
          </Link>
          <Link href="/results" style={{ color: "var(--text-15)", textDecoration: "none" }}>
            Результаты
          </Link>
        </div>
      </footer>
    </main>
  );
}
