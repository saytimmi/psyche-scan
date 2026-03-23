"use client";

import { sessions, getTotalQuestionCount } from "@/data/questions";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState, useRef } from "react";

const TOTAL = getTotalQuestionCount();
const EASE = [0.65, 0.05, 0, 1] as [number, number, number, number];

// Unsplash images — curated for psychology/brain/introspection
const IMG = {
  hero: "https://images.unsplash.com/photo-1549925245-f20a1bac6454?w=1400&q=80", // neural dark
  brain: "https://images.unsplash.com/photo-1617710817696-bf21547963ab?w=800&q=80", // brain scan
  mirror: "https://images.unsplash.com/photo-1508569756727-9f6d54696f7f?w=800&q=80", // silhouette
  therapy: "https://images.unsplash.com/photo-1573546006785-80011b38f3e6?w=800&q=80", // therapy
  abstract1: "https://images.unsplash.com/photo-1694006757902-c3a13ee6c4ce?w=600&q=80", // abstract neural
  abstract2: "https://images.unsplash.com/photo-1709651669999-57741c9bf085?w=600&q=80", // abstract lines
  abstract3: "https://images.unsplash.com/photo-1711409650645-a568a59446f0?w=600&q=80", // abstract brain
  portrait: "https://images.unsplash.com/photo-1582836985321-7a3f82fb6f3f?w=800&q=80", // dark portrait
  hands: "https://images.unsplash.com/photo-1577975296437-e6d663f8be34?w=800&q=80", // hands dark
  eye: "https://images.unsplash.com/photo-1649937801620-d31db7fb3ab3?w=600&q=80", // closeup abstract
};

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
  const heroImgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <main>
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
        style={{ background: "rgba(10,10,10,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)" }}>
        <span className="font-display text-lg" style={{ color: "var(--accent)" }}>Psyche Scan</span>
        <Link href="/free">
          <button className="btn-accent px-5 py-2.5 text-sm">Начать</button>
        </Link>
      </nav>

      {/* ═══════════════════════════════════════════ */}
      {/*  1. HERO — full viewport image + text       */}
      {/*  Like Lando: image fills screen, text over  */}
      {/* ═══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Background image — parallax */}
        <motion.div style={{ scale: heroImgScale }} className="absolute inset-0">
          <Image
            src={IMG.hero}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
        </motion.div>

        {/* Text — bottom left */}
        <motion.div style={{ y: heroY, opacity: heroOp }} className="absolute bottom-16 left-6 md:left-10 right-6 md:right-10 z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm font-mono mb-6"
            style={{ color: "var(--accent)", letterSpacing: "0.15em" }}
          >
            DEEP PERSONALITY PROFILING
          </motion.p>

          <h1 style={{ fontSize: "clamp(2.8rem, 9vw, 7.5rem)", lineHeight: "85%", letterSpacing: "-0.04em" }}>
            <motion.span className="block" initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.9, ease: EASE }}>
              Инструкция
            </motion.span>
            <motion.span className="block" initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.55, duration: 0.9, ease: EASE }}>
              <span style={{ color: "var(--accent)" }} className="italic">к&nbsp;себе.</span>
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link href="/free">
              <button className="btn-accent px-8 py-4 text-lg">Пройти сканирование</button>
            </Link>
            <span className="text-xs font-mono" style={{ color: "var(--text-40)" }}>
              {sessions.length} сессий · {TOTAL} вопросов · бесплатно
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  2. MARQUEE — horizontal scroll strip       */}
      {/* ═══════════════════════════════════════════ */}
      <div style={{ borderBottom: "1px solid var(--border)", padding: "18px 0", overflow: "hidden" }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, r) => (
            <div key={r} className="flex items-center shrink-0">
              {["Big Five", "ECR-R", "DERS", "YSQ-S3", "ACE", "PVQ-RR", "DSQ", "AAQ-II", "IFS", "SDT", "Polyvagal", "MAIA", "Neff", "Loevinger", "McAdams", "Kegan"].map((fw) => (
                <span key={`${r}-${fw}`} className="text-sm font-mono shrink-0 mx-8" style={{ color: "var(--text-20)" }}>{fw}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/*  3. PSYCHE — image LEFT, text RIGHT         */}
      {/*  Asymmetric split like Lando On/Off Track   */}
      {/* ═══════════════════════════════════════════ */}
      <section className="section" id="psyche">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
          {/* LEFT — stacked images with overlap */}
          <div className="relative h-[500px] lg:h-auto">
            <Reveal>
              <div className="absolute top-0 left-0 w-[65%] aspect-[3/4] rounded-2xl overflow-hidden z-10">
                <Image src={IMG.portrait} alt="" fill className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="absolute bottom-0 right-0 w-[55%] aspect-square rounded-2xl overflow-hidden"
                style={{ border: "2px solid var(--accent)" }}>
                <Image src={IMG.abstract1} alt="" fill className="object-cover" />
              </div>
            </Reveal>
          </div>

          {/* RIGHT — text */}
          <div className="lg:pl-16">
            <Reveal>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                Ты — нейросеть,{" "}
                <span style={{ color: "var(--accent)" }}>обученная на&nbsp;своём детстве.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed" style={{ color: "var(--text-70)" }}>
                С рождения до ~7 лет твой мозг записывал всё. Не слова — ощущения. Из этого он построил модель мира. Набор правил, которые работают до сих пор.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 space-y-3">
                {[
                  { rule: "Покажу слабость — накажут", result: "Прячешь эмоции" },
                  { rule: "Буду идеальным — будут любить", result: "Вкалываешь до выгорания" },
                  { rule: "Люди уходят", result: "Не привязываешься" },
                ].map((item) => (
                  <div key={item.rule} className="rounded-xl p-5"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                    <p className="font-display text-base mb-1">&ldquo;{item.rule}&rdquo;</p>
                    <p className="text-sm font-mono" style={{ color: "var(--accent)" }}>→ {item.result}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  4. ACCENT STRIP + IMAGE — full bleed       */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "60vh" }}>
        <Image src={IMG.mirror} alt="" fill className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        <div className="relative z-10 section flex items-center">
          <Reveal>
            <p className="font-display max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.1 }}>
              Это не лень. Не&nbsp;&laquo;характер&raquo;.{" "}
              <span style={{ color: "var(--accent)" }}>
                Это программа, которая запустилась когда тебе было 5&nbsp;лет.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  5. SESSIONS — gallery grid like helmets    */}
      {/*  Varied card sizes, images in header        */}
      {/* ═══════════════════════════════════════════ */}
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
                "Big Five: общительность, тревожность, открытость",
                "Как строишь отношения и почему они рушатся",
                "Эмоции, страхи, схемы из детства",
                "Твоя история своими словами",
                "Мотивация, поведение под давлением",
                "Сильные стороны, конфликты, стресс",
                "Защиты, тени, роли которые играешь",
                "Смысл, ценности, готовность меняться",
                "Идентичность, иммунитет к изменениям",
              ];
              const sessionImgs = [IMG.brain, IMG.hands, IMG.abstract2, IMG.therapy, IMG.eye, IMG.abstract3, IMG.abstract1, IMG.mirror, IMG.portrait];
              const isLarge = i === 0 || i === 4;

              return (
                <Reveal key={session.id} delay={i * 0.04}>
                  <Link href={`/session/${session.id}`}>
                    <div className="tile p-0 h-full cursor-pointer overflow-hidden">
                      {/* Image header */}
                      <div className={`relative ${isLarge ? "h-40" : "h-28"} overflow-hidden`}>
                        <Image src={sessionImgs[i]} alt="" fill className="object-cover transition-transform duration-700 hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] to-transparent" />
                        <span className="absolute top-3 right-3 font-mono text-xs" style={{ color: "var(--text-40)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{session.icon}</span>
                          <h3 className={`font-display ${isLarge ? "text-2xl" : "text-lg"}`}>{session.title}</h3>
                        </div>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-40)" }}>{descs[i]}</p>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px]" style={{ color: "var(--text-20)" }}>
                            {qCount} вопросов · ~{session.estimatedMinutes} мин
                          </span>
                          {isDone && <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: "var(--accent)", color: "var(--bg)" }}>✓</span>}
                        </div>
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

      {/* ═══════════════════════════════════════════ */}
      {/*  6. DELIVERABLES — alternating image+text   */}
      {/*  Like magazine spread                       */}
      {/* ═══════════════════════════════════════════ */}
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
            { num: "02", title: "Карта паттернов", text: "Схемы, которые управляют тобой. Откуда они и как проявляются каждый день." },
            { num: "03", title: "Сильные стороны", text: "То, что получается легко. Ты не замечаешь — это суперсила." },
            { num: "04", title: "Слепые зоны", text: "Где врёшь себе. Конкретные расхождения." },
            { num: "05", title: "Тело и стресс", text: "Бьёшь, бежишь или замираешь. Почему 'успокойся' не работает." },
            { num: "06", title: "Что делать", text: "Конкретно: с чего начать. Не 'работай над собой'." },
          ].map((item, i) => (
            <Reveal key={item.num} delay={i * 0.05}>
              <div className={`flex flex-col md:flex-row ${i % 2 ? "md:flex-row-reverse" : ""} items-start gap-8 md:gap-16 py-10`}
                style={{ borderBottom: "1px solid var(--border)" }}>
                <div className={`md:w-1/3 ${i % 2 ? "md:text-right" : ""}`}>
                  <span className="font-mono text-sm" style={{ color: "var(--accent)" }}>{item.num}</span>
                  <h3 className="font-display text-4xl md:text-5xl mt-1" style={{ lineHeight: 1 }}>{item.title}</h3>
                </div>
                <div className="md:w-2/3">
                  <p className="text-xl leading-relaxed" style={{ color: "var(--text-70)" }}>{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  7. AI — image bg + centered text           */}
      {/* ═══════════════════════════════════════════ */}
      <section className="accent-strip" style={{ padding: "clamp(80px, 12vw, 140px) clamp(24px, 5vw, 80px)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.1, color: "var(--bg)" }}>
              Дай этот мануал своему AI&nbsp;— и&nbsp;он наконец тебя поймёт.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg" style={{ color: "rgba(10,10,10,0.6)" }}>
              ChatGPT даёт общие советы? Потому что не знает кто ты. С&nbsp;Personality Passport AI подбирает всё под твой тип.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Советы под\nТВОЙ тип", "Знает\nтриггеры", "ТВОЙ стиль\nобщения", "Учитывает\nценности"].map((t) => (
                <div key={t} className="rounded-xl p-5" style={{ background: "rgba(10,10,10,0.08)", border: "1px solid rgba(10,10,10,0.1)" }}>
                  <p className="text-sm font-medium whitespace-pre-line" style={{ color: "var(--bg)" }}>{t}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  8. SCIENCE — numbers + image               */}
      {/* ═══════════════════════════════════════════ */}
      <section className="section">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <Reveal>
              <p className="text-sm font-mono mb-6" style={{ color: "var(--accent)", letterSpacing: "0.15em" }}>НАУКА</p>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Не гороскоп.<br />
                <span style={{ color: "var(--text-40)" }}>Клинические инструменты.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 grid grid-cols-2 gap-8">
                {[
                  { val: "22+", label: "фреймворков" },
                  { val: String(TOTAL), label: "вопросов" },
                  { val: "87–95%", label: "надёжность" },
                  { val: "$0", label: "вместо $174" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--accent)", lineHeight: 1 }}>{s.val}</p>
                    <p className="text-xs font-mono uppercase tracking-wider mt-2" style={{ color: "var(--text-40)" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          {/* Image */}
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image src={IMG.abstract3} alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] to-transparent opacity-40" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  9. MARQUEE 2                               */}
      {/* ═══════════════════════════════════════════ */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "18px 0", overflow: "hidden" }}>
        <div className="marquee-track" style={{ animationDuration: "35s", animationDirection: "reverse" }}>
          {[...Array(2)].map((_, r) => (
            <div key={r} className="flex items-center shrink-0">
              {["Big Five", "Привязанность", "Эмоции", "Схемы", "Детский опыт", "Ценности", "Защиты", "Гибкость", "Нарратив", "Эго", "Метакогниция", "Полагалальная"].map((fw) => (
                <span key={`${r}-${fw}`} className="text-sm font-mono shrink-0 mx-8" style={{ color: "var(--text-20)" }}>{fw}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/*  10. CTA — full image bg                    */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <Image src={IMG.abstract2} alt="" fill className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-[var(--bg)]/70" />
        <div className="relative z-10 text-center px-6">
          <Reveal>
            <h2 style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
              Хватит жить по&nbsp;программе,{" "}
              <span style={{ color: "var(--accent)" }} className="italic">которую ты не&nbsp;выбирал.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg" style={{ color: "var(--text-40)" }}>
              {sessions.length} сессий · {TOTAL} вопросов · бесплатно · результат сразу
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/scan">
              <button className="btn-accent mt-12 px-12 py-6 text-xl">Пройти сканирование</button>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
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
