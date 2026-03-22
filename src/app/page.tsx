"use client";

import { sessions, getTotalQuestionCount } from "@/data/questions";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState, useRef, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────
// Constants
// ─────────────────────────────────────
const TOTAL_QUESTIONS = getTotalQuestionCount();

const SESSION_COLORS = [
  "#a78bfa", "#818cf8", "#f59e0b", "#fb7185",
  "#22d3ee", "#a78bfa", "#34d399", "#f472b6", "#facc15",
];

// ─────────────────────────────────────
// Hero: Massive typography + mouse glow + animated rings
// ─────────────────────────────────────
function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  // Mouse-following gradient
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 30, damping: 25 });
  const glowBg = useMotionTemplate`radial-gradient(900px circle at ${smoothX}% ${smoothY}%, rgba(167,139,250,0.06), transparent 60%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
      mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [mouseX, mouseY]
  );

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Mouse-following glow */}
      <motion.div className="absolute inset-0 pointer-events-none z-0" style={{ background: glowBg }} />

      {/* Animated concentric rings — 9 layers */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <svg viewBox="0 0 200 200" className="w-[min(70vw,70vh)] h-[min(70vw,70vh)]">
          {SESSION_COLORS.map((color, i) => (
            <circle
              key={i}
              cx="100"
              cy="100"
              r={18 + i * 9}
              fill="none"
              stroke={color}
              strokeWidth="0.4"
              opacity="0.08"
              style={{
                animation: `ring-breathe ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.25}s`,
                transformOrigin: "center",
              }}
            />
          ))}
        </svg>
      </div>

      {/* Background accent glows */}
      <div className="absolute top-[20%] right-[15%] w-[500px] h-[500px] rounded-full bg-accent-dim/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[10%] w-[400px] h-[400px] rounded-full bg-fuchsia-500/[0.02] blur-[120px] pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 text-center px-6 max-w-6xl"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-10"
        >
          <span className="text-[11px] tracking-[0.35em] uppercase text-muted-light/70">
            {sessions.length} сессий &middot; {TOTAL_QUESTIONS} вопросов &middot; 22+ фреймворка
          </span>
        </motion.div>

        {/* MASSIVE title — fills 80%+ of viewport */}
        <h1
          className="font-display leading-[0.82] tracking-[-0.03em] mb-8"
          style={{ fontSize: "clamp(3.5rem, 14vw, 14rem)", perspective: "1200px" }}
        >
          <span className="block overflow-hidden">
            <motion.span
              className="block text-gradient"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
            >
              Почему
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-foreground/80 italic"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.35 }}
            >
              ты снова
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-gradient"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.55 }}
            >
              застрял?
            </motion.span>
          </span>
        </h1>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/scan">
            <motion.button
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 50px rgba(167,139,250,0.3), 0 0 100px rgba(167,139,250,0.12)",
              }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-5 bg-accent text-white rounded-2xl text-lg font-medium cta-glow hover:bg-accent-dim transition-colors"
            >
              Начать сканирование
            </motion.button>
          </Link>
          <Link href="#deliverables">
            <motion.button
              whileHover={{ scale: 1.02, borderColor: "rgba(167,139,250,0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-5 border border-white/[0.06] rounded-2xl text-lg text-muted-light hover:text-foreground transition-all backdrop-blur-sm"
            >
              Что я получу?
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.p
          animate={{ y: [0, 8, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="text-[10px] tracking-[0.25em] uppercase text-muted/50"
        >
          Scroll
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────
// Problem: Sticky section with crossfading full-viewport statements
// ─────────────────────────────────────
const STATEMENTS = [
  { text: "Ставишь цель —\nи через две недели\nзабиваешь", accent: "Опять." },
  { text: "Знаешь что надо\nпоговорить —\nно молчишь", accent: "Опять." },
  { text: "Начинаешь проект\nна энтузиазме —\nи бросаешь", accent: "Опять." },
  {
    text: "Это не лень.\nЭто программа,\nкоторая работает\nв фоне.",
    accent: "Здесь ты её увидишь.",
    isAccentGradient: true,
  },
];

function ProblemSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(Math.floor(latest * STATEMENTS.length), STATEMENTS.length - 1);
    setActiveIndex(idx);
  });

  return (
    <section ref={containerRef} className="relative" style={{ height: `${STATEMENTS.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle background shift per statement */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background:
              activeIndex === 3
                ? "radial-gradient(ellipse at center, rgba(167,139,250,0.04) 0%, transparent 70%)"
                : "radial-gradient(ellipse at center, transparent 0%, transparent 70%)",
          }}
          transition={{ duration: 1 }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -50, filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="text-center px-6 max-w-5xl"
          >
            <h2
              className="font-display leading-[0.88] tracking-[-0.02em] whitespace-pre-line text-foreground/90"
              style={{ fontSize: "clamp(2.2rem, 7vw, 7rem)" }}
            >
              {STATEMENTS[activeIndex].text}
            </h2>
            {STATEMENTS[activeIndex].accent && (
              <p
                className={`mt-8 text-2xl md:text-3xl italic ${
                  STATEMENTS[activeIndex].isAccentGradient ? "text-gradient" : "text-accent/80"
                }`}
              >
                {STATEMENTS[activeIndex].accent}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─────────────────────────────────────
// Horizontal Scroll Sessions — GSAP ScrollTrigger pin + scrub
// ─────────────────────────────────────
function SessionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const totalWidth = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth}`,
          onUpdate: (self) => setProgress(self.progress),
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Header — fixed during scroll */}
      <div className="absolute top-8 left-8 z-20 pointer-events-none">
        <p className="text-[10px] tracking-[0.35em] uppercase text-accent/70 mb-2">Процесс</p>
        <h2 className="font-display text-2xl md:text-3xl text-foreground/80">9 слоёв глубины</h2>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-8 left-8 right-8 z-20 pointer-events-none">
        <div className="h-[1px] bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent/60 origin-left"
            style={{ scaleX: progress }}
          />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-muted/40 font-mono">
          <span>01</span>
          <span>0{Math.max(1, Math.min(9, Math.ceil(progress * 9)))}</span>
          <span>09</span>
        </div>
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="flex h-screen">
        {sessions.map((session, i) => {
          const color = SESSION_COLORS[i];
          const qCount = session.sections.reduce((a, s) => a + s.questions.length, 0);

          return (
            <Link
              key={session.id}
              href={`/session/${session.id}`}
              className="block w-screen h-full shrink-0"
            >
              <div className="relative h-full flex items-center px-8 md:px-16 lg:px-24 group">
                {/* Giant number background */}
                <span
                  className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 font-display leading-none select-none pointer-events-none opacity-[0.04] transition-opacity duration-700 group-hover:opacity-[0.08]"
                  style={{ fontSize: "clamp(10rem, 25vw, 30rem)", color }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="relative z-10 max-w-lg">
                  {/* Session color bar */}
                  <div className="w-12 h-[2px] mb-8 transition-all duration-500 group-hover:w-20" style={{ background: color }} />

                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{session.icon}</span>
                    <span className="font-mono text-xs" style={{ color: `${color}99` }}>
                      Session {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3
                    className="font-display mb-2 transition-colors duration-300 group-hover:text-accent-bright"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                  >
                    {session.title}
                  </h3>
                  <p className="text-muted-light text-sm mb-6">{session.subtitle}</p>

                  <p className="text-muted text-sm leading-relaxed max-w-md mb-8">
                    {session.description}
                  </p>

                  <div className="flex gap-6 text-xs text-muted/60 font-mono">
                    <span>{qCount} вопросов</span>
                    <span>~{session.estimatedMinutes} мин</span>
                  </div>
                </div>

                {/* Vertical divider between cards */}
                {i < sessions.length - 1 && (
                  <div className="absolute right-0 top-[20%] bottom-[20%] w-[1px] bg-white/[0.03]" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// ─────────────────────────────────────
// What you get: Bento grid
// ─────────────────────────────────────
const DELIVERABLES = [
  { num: "01", title: "Портрет", desc: "Простым языком — какой ты человек. Прочитаешь и скажешь 'блин, точно'.", span: "md:col-span-2", gradient: "from-violet-500/20" },
  { num: "02", title: "Сильные стороны", desc: "То, что у тебя получается легко. Ты это не замечаешь — это твоя суперсила.", span: "", gradient: "from-emerald-500/15" },
  { num: "03", title: "Где тормозишь", desc: "Убеждения из детства типа 'я должен быть идеальным'. Они рулят каждый день.", span: "", gradient: "from-amber-500/15" },
  { num: "04", title: "Роли и маски", desc: "На работе один, с друзьями другой, дома — третий. Какие роли навязаны.", span: "md:col-span-2", gradient: "from-rose-500/15" },
  { num: "05", title: "Где врёшь себе", desc: "Говоришь 'мне норм одному' а внутри одиноко. Увидишь расхождения.", span: "", gradient: "from-cyan-500/15" },
  { num: "06", title: "Что делать", desc: "Конкретно: с чего начать, что важнее, готов ли ты вообще.", span: "", gradient: "from-fuchsia-500/15" },
  { num: "07", title: "Тело", desc: "Стресс живёт в теле. Узнаешь свой тип реакции: бьёшь, бежишь, замираешь.", span: "", gradient: "from-orange-500/15" },
  { num: "08", title: "Файл для AI", desc: "Готовый профиль для ChatGPT или Claude. Бот моментально начнёт понимать тебя.", span: "md:col-span-2", gradient: "from-indigo-500/15" },
  { num: "09", title: "Инструкция", desc: "'Как со мной общаться' — для коллег, партнёра, друзей.", span: "", gradient: "from-teal-500/15" },
];

function DeliverablesSection() {
  return (
    <section id="deliverables" className="px-6 md:px-16 py-40 max-w-6xl mx-auto scroll-mt-20">
      <div className="mb-24">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] tracking-[0.35em] uppercase text-accent/70 mb-5"
        >
          Что ты получишь в конце
        </motion.p>
        <motion.h2
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="font-display leading-[0.88] tracking-[-0.02em]"
          style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
        >
          Документ о тебе
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-muted-light text-lg mt-6 max-w-2xl leading-relaxed"
        >
          Не &quot;ты экстраверт, поздравляем&quot;. Конкретный разбор: откуда паттерны, что тормозит, что делать. Плюс готовый файл для AI.
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          visible: { transition: { staggerChildren: 0.06 } },
          hidden: {},
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {DELIVERABLES.map((item) => (
          <motion.div
            key={item.num}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`bento-card relative bg-surface/50 border border-white/[0.04] rounded-2xl p-7 md:p-8 overflow-hidden backdrop-blur-sm ${item.span}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} to-transparent pointer-events-none`} />
            <div className="relative z-10">
              <span className="font-mono text-[10px] text-accent/30">{item.num}</span>
              <h3 className="font-display text-xl md:text-2xl mt-2 mb-3 text-foreground/95">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────
// Science: Giant animated numbers + frameworks
// ─────────────────────────────────────
function ScienceSection() {
  return (
    <section className="px-6 md:px-16 py-40">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.35em] uppercase text-accent/70 mb-5"
          >
            Почему это не очередной тест
          </motion.p>
          <motion.h2
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="font-display leading-[0.88] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
          >
            Без гороскопов
          </motion.h2>
        </div>

        {/* Giant stats — 2x2 grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-24">
          {[
            { value: 22, suffix: "+", label: "научных фреймворков" },
            { value: TOTAL_QUESTIONS, suffix: "", label: "вопросов" },
            { value: 9, suffix: "", label: "слоёв анализа" },
            { value: 80, suffix: "%", label: "точность" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center md:text-left"
            >
              <p className="font-display text-gradient leading-none" style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}>
                <Counter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs text-muted/60 uppercase tracking-wider mt-3">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Frameworks — compact grid */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-light max-w-2xl text-lg mb-10 leading-relaxed"
        >
          MBTI — ненадёжный. Эннеаграмма — не подтверждена. Мы используем только то, что реально проверено на десятках тысяч людей.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            visible: { transition: { staggerChildren: 0.04 } },
            hidden: {},
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {[
            { name: "Big Five", stat: "87-93%", icon: "🧬" },
            { name: "Привязанность", stat: "30-40%", icon: "🔗" },
            { name: "Эмоции", stat: "93-95%", icon: "🌊" },
            { name: "Схемы", stat: "18 схем", icon: "🔮" },
            { name: "Детский опыт", stat: "17K+", icon: "🧒" },
            { name: "Ценности", stat: "49+ культур", icon: "💎" },
            { name: "Защиты", stat: "3 уровня", icon: "🛡️" },
            { name: "Гибкость", stat: "84%", icon: "🌿" },
          ].map((tool) => (
            <motion.div
              key={tool.name}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 },
              }}
              className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-5 hover:bg-white/[0.04] hover:border-white/[0.06] transition-all duration-500"
            >
              <span className="text-xl mb-2 block">{tool.icon}</span>
              <p className="font-medium text-foreground/85 text-sm">{tool.name}</p>
              <p className="text-[10px] text-accent/60 font-mono mt-1">{tool.stat}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────
// Counter component
// ─────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView || hasRun.current || !ref.current) return;
    hasRun.current = true;
    const el = ref.current;
    const duration = 2000;
    const start = performance.now();
    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(eased * target)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, target, suffix]);

  return (
    <motion.span ref={ref} onViewportEnter={() => setInView(true)}>
      0{suffix}
    </motion.span>
  );
}

// ─────────────────────────────────────
// Final CTA — full viewport, dramatic
// ─────────────────────────────────────
function CTASection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent/[0.04] blur-[180px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative z-10 text-center max-w-3xl"
      >
        <h2
          className="font-display leading-[0.88] tracking-[-0.02em] mb-10"
          style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
        >
          <span className="text-foreground/90">Хватит гадать.</span>
          <br />
          <span className="italic text-gradient">Пора разобраться.</span>
        </h2>

        <p className="text-muted-light text-lg mb-14 leading-relaxed">
          {sessions.length} блоков по 5-15 минут. Можно растянуть на неделю.
          <br />
          <span className="text-muted">Чем честнее — тем точнее.</span>
        </p>

        <Link href="/scan">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 60px rgba(167,139,250,0.35), 0 0 120px rgba(167,139,250,0.15)",
            }}
            whileTap={{ scale: 0.97 }}
            className="px-14 py-7 bg-accent text-white rounded-2xl text-xl font-medium cta-glow hover:bg-accent-dim transition-colors"
          >
            Начать сканирование
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────
// Nav — minimal, fixed
// ─────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between transition-all duration-500 ${
        scrolled ? "bg-background/70 backdrop-blur-xl border-b border-white/[0.04]" : ""
      }`}
    >
      <Link href="/" className="font-display text-lg text-foreground/70 hover:text-foreground transition-colors">
        Psyche Scan
      </Link>
      <Link href="/scan">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-5 py-2 text-sm border border-white/[0.08] rounded-full text-muted-light hover:text-foreground hover:border-accent/30 transition-all duration-300"
        >
          Начать
        </motion.button>
      </Link>
    </nav>
  );
}

// ─────────────────────────────────────
// Footer
// ─────────────────────────────────────
function Footer() {
  return (
    <footer className="px-6 py-16 border-t border-white/[0.03]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted/30">
        <p className="font-display text-sm text-muted/50">Psyche Scan</p>
        <p>Не заменяет терапию. Инструмент самопознания.</p>
        <Link href="/results" className="hover:text-accent transition-colors duration-300">
          Результаты
        </Link>
      </div>
    </footer>
  );
}

// ════════════════════════════════════════
// MAIN PAGE
// ════════════════════════════════════════
export default function Home() {
  return (
    <main className="noise">
      <Nav />
      <HeroSection />
      <ProblemSection />
      <SessionsSection />
      <DeliverablesSection />
      <ScienceSection />
      <CTASection />
      <Footer />
    </main>
  );
}
