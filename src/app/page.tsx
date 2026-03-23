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
    belief: "Срываешься на близких из-за мелочи",
    result: "А потом ненавидишь себя за это",
    bg: "rgba(249,115,22,0.05)",
    border: "rgba(249,115,22,0.12)",
    color: "var(--ember)",
  },
  {
    belief: "Знаешь что делать — но не делаешь",
    result: "Неделями, месяцами, годами",
    bg: "rgba(220,38,38,0.05)",
    border: "rgba(220,38,38,0.12)",
    color: "var(--ember-deep)",
  },
  {
    belief: "Отталкиваешь тех, кто подходит близко",
    result: "А потом жалеешь",
    bg: "rgba(251,191,36,0.05)",
    border: "rgba(251,191,36,0.12)",
    color: "var(--ember-warm)",
  },
  {
    belief: "Работаешь на износ, но чувствуешь что мало",
    result: "Никакой результат не «достаточно»",
    bg: "rgba(249,115,22,0.05)",
    border: "rgba(249,115,22,0.12)",
    color: "var(--ember)",
  },
  {
    belief: "Говоришь «мне всё равно» — когда не всё равно",
    result: "Чтобы не было больно если не получится",
    bg: "rgba(220,38,38,0.05)",
    border: "rgba(220,38,38,0.12)",
    color: "var(--ember-deep)",
  },
  {
    belief: "Одни и те же ссоры в каждых отношениях",
    result: "Меняются люди — сценарий тот же",
    bg: "rgba(251,191,36,0.05)",
    border: "rgba(251,191,36,0.12)",
    color: "var(--ember-warm)",
  },
  {
    belief: "Помогаешь всем — а попросить сам не можешь",
    result: "Потому что «сильные не просят»",
    bg: "rgba(249,115,22,0.05)",
    border: "rgba(249,115,22,0.12)",
    color: "var(--ember)",
  },
  {
    belief: "Листаешь телефон вместо того что важно",
    result: "Не лень — мозг избегает тревоги",
    bg: "rgba(220,38,38,0.05)",
    border: "rgba(220,38,38,0.12)",
    color: "var(--ember-deep)",
  },
  {
    belief: "Обещаешь себе «с понедельника» — каждый понедельник",
    result: "Не слабоволие — внутренний саботаж",
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
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}
      >
        {/* ═══ BACKGROUND LAYERS ═══ */}

        {/* Gradient mesh — organic blobs that drift slowly */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {/* Primary ember blob — top right */}
          <div style={{
            position: "absolute",
            top: "-15%",
            right: "-10%",
            width: "60vw",
            height: "60vw",
            maxWidth: 700,
            maxHeight: 700,
            borderRadius: "40% 60% 55% 45% / 55% 40% 60% 45%",
            background: "radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, rgba(220,38,38,0.06) 50%, transparent 80%)",
            filter: "blur(80px)",
            animation: "mesh-drift 20s ease-in-out infinite",
          }} />
          {/* Secondary deep red blob — bottom left */}
          <div style={{
            position: "absolute",
            bottom: "-20%",
            left: "-15%",
            width: "50vw",
            height: "50vw",
            maxWidth: 600,
            maxHeight: 600,
            borderRadius: "55% 45% 40% 60% / 45% 55% 45% 55%",
            background: "radial-gradient(ellipse, rgba(220,38,38,0.08) 0%, rgba(249,115,22,0.03) 60%, transparent 85%)",
            filter: "blur(90px)",
            animation: "mesh-drift-2 25s ease-in-out infinite",
          }} />
          {/* Warm accent — center-ish, smaller */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "40%",
            transform: "translate(-50%, -50%)",
            width: "30vw",
            height: "30vw",
            maxWidth: 400,
            maxHeight: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(251,191,36,0.04) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "mesh-drift 30s ease-in-out infinite reverse",
          }} />
        </div>

        {/* Ember particles on top of mesh */}
        <EmberParticles />

        {/* Film grain overlay */}
        <div style={{
          position: "absolute",
          inset: "-50%",
          width: "200%",
          height: "200%",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
          pointerEvents: "none",
          opacity: 0.4,
          animation: "grain 8s steps(10) infinite",
          zIndex: 2,
        }} />

        {/* Vignette */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(5,5,5,0.6) 100%)",
          pointerEvents: "none",
          zIndex: 3,
        }} />

        {/* ═══ CONTENT — left-aligned on desktop, centered on mobile ═══ */}
        <div
          className="relative"
          style={{
            zIndex: 10,
            width: "100%",
            maxWidth: 1200,
            padding: "0 clamp(24px, 6vw, 80px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* Eyebrow with line */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 32,
            }}
          >
            <div style={{
              width: 40,
              height: 1,
              background: "var(--ember)",
              animation: "line-draw 1s var(--ease) 0.3s both",
              transformOrigin: "left",
            }} />
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--ember)",
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
            }}>
              PSYCHE SCAN
            </span>
          </motion.div>

          {/* H1 — massive, left-aligned, two visual weights */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 7.5vw, 5.5rem)",
              fontWeight: 600,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            Ты многое
            <br />
            о себе{" "}
            <span style={{
              color: "var(--ember)",
              fontStyle: "italic",
              textShadow: "0 0 60px rgba(249,115,22,0.15)",
            }}>
              не знаешь.
            </span>
          </motion.h1>

          {/* Subtitle — offset right, creates asymmetry */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: [0.23, 1, 0.32, 1] }}
            style={{
              marginTop: 40,
              marginLeft: "clamp(0px, 3vw, 40px)",
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              color: "var(--text-30)",
              lineHeight: 1.9,
              maxWidth: 460,
            }}
          >
            Внутри тебя работает операционная система.
            <br />
            Она решает — что чувствовать, кого выбирать
            <br />
            и от чего бежать. Без твоего ведома.
          </motion.p>

          {/* CTA — two-part line with color break */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: [0.23, 1, 0.32, 1] }}
            style={{
              marginTop: 48,
              marginLeft: "clamp(0px, 3vw, 40px)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.15rem, 2.2vw, 1.4rem)",
              color: "var(--text-60)",
              lineHeight: 1.4,
            }}>
              Можно узнать всё.{" "}
              <span style={{
                color: "var(--ember)",
                textShadow: "0 0 40px rgba(249,115,22,0.15)",
              }}>
                Через 22 нейробиологических теста.
              </span>
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <Link href="/scan">
                <button
                  className="btn-ember"
                  style={{
                    padding: "16px 36px",
                    fontSize: 15,
                    fontWeight: 600,
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 0 40px rgba(249,115,22,0.12), 0 2px 16px rgba(0,0,0,0.4)",
                    letterSpacing: "0.02em",
                  }}
                >
                  Пройти сканирование
                </button>
              </Link>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text-15)",
                letterSpacing: "0.05em",
              }}>
                бесплатно · результат сразу
              </span>
            </div>
          </motion.div>

          {/* Scroll indicator — bottom left */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1.5 }}
            style={{
              position: "absolute",
              bottom: "-15vh",
              left: "clamp(24px, 6vw, 80px)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{
              width: 1,
              height: 40,
              background: "linear-gradient(to bottom, var(--ember), transparent)",
              animation: "line-draw 1.5s var(--ease) 2.2s both",
              transformOrigin: "top",
            }} />
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              color: "var(--text-08)",
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
              writingMode: "vertical-lr" as const,
            }}>
              SCROLL
            </span>
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
              Каждый раз, когда что-то
              <br />
              повторялось и подтверждалось —
              <br />
              <span style={{ color: "var(--ember)" }}>
                мозг превращал это в правило.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p
              style={{
                marginTop: 32,
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                color: "var(--text-30)",
                lineHeight: 1.7,
                maxWidth: 640,
              }}
            >
              Не один момент — а сотни повторений. Мама не пришла, папа накричал,
              в школе засмеяли. Каждый раз нейронная связь укреплялась.
              К 6-7 годам — это уже автопилот. Сейчас тебе 25, 30, 40 —
              а программа та же. Узнаёшь?
            </p>
          </Reveal>

          <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 12 }}>
            {patterns.map((item, i) => (
              <Reveal key={item.belief} delay={0.08 * (i + 1)}>
                <div
                  className="rounded-xl transition-all duration-500 hover:translate-y-[-2px]"
                  style={{
                    padding: "18px 24px",
                    background: item.bg,
                    border: `1px solid ${item.border}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
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
                      whiteSpace: "nowrap",
                      flexShrink: 0,
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
