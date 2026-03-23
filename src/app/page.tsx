"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState, useRef } from "react";
import { EmberParticles } from "@/components/EmberParticles";
import { Reveal } from "@/components/Reveal";

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

      {/* AbsorptionScene */}
      {/* BlurredPassport */}
      {/* ComparisonColumns */}
      {/* Trust */}
      {/* Process */}
      {/* CTA */}
      {/* Footer */}
    </main>
  );
}
