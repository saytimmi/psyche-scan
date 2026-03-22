"use client";

import { sessions, getTotalQuestionCount } from "@/data/questions";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ClipReveal } from "@/components/AnimatedText";

// ────────────────────────────────────────────
// Variants
// ────────────────────────────────────────────
const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const springTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
};

// Session color map from research
const sessionColors = [
  "#a78bfa", // 1 violet
  "#6366f1", // 2 indigo
  "#f59e0b", // 3 amber
  "#f43f5e", // 4 rose
  "#06b6d4", // 5 cyan
  "#8b5cf6", // 6 deep purple
  "#10b981", // 7 emerald
  "#fb7185", // 8 warm rose
  "#eab308", // 9 gold
];

// ────────────────────────────────────────────
// Hero: Split word animation with clip-path
// ────────────────────────────────────────────
function HeroWord({
  children,
  delay,
  className = "",
}: {
  children: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className={`inline-block ${className}`}
        initial={{ y: "110%", rotateX: -15 }}
        animate={{ y: "0%", rotateX: 0 }}
        transition={{
          duration: 0.9,
          ease: [0.23, 1, 0.32, 1],
          delay,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// ────────────────────────────────────────────
// Animated counter
// ────────────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView || hasRun.current || !ref.current) return;
    hasRun.current = true;
    const el = ref.current;
    const duration = 1800;
    const start = performance.now();
    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(eased * target)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isInView, target, suffix]);

  return (
    <motion.span
      ref={ref}
      className="font-mono"
      onViewportEnter={() => setIsInView(true)}
    >
      0{suffix}
    </motion.span>
  );
}

// ────────────────────────────────────────────
// Section with scroll-driven background shift
// ────────────────────────────────────────────
function ScrollSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0.8, 1], [1, 0.97]);
  const opacity = useTransform(scrollYProgress, [0.85, 1], [1, 0.6]);

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ scale, opacity }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
}

// ════════════════════════════════════════════
// MAIN PAGE
// ════════════════════════════════════════════
export default function Home() {
  const totalQuestions = getTotalQuestionCount();

  // Hydration-safe completed status
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const map: Record<string, boolean> = {};
    for (const s of sessions) {
      map[s.id] = localStorage.getItem(`psyche_completed_${s.id}`) === "true";
    }
    setCompletedMap(map);
  }, []);

  // Scroll-driven background color shift
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 1],
    ["#050507", "#08060e", "#0a0812", "#08060e", "#0a080c", "#050507"]
  );

  return (
    <motion.main className="noise min-h-screen" style={{ backgroundColor: bgColor }}>

      {/* ═══════════════════════════════════ */}
      {/*              HERO                   */}
      {/* ═══════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        {/* Background glows — larger, more dramatic */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/[0.03] blur-[160px] pointer-events-none" />
        <div className="absolute top-[20%] right-[15%] w-[400px] h-[400px] rounded-full bg-accent-dim/[0.04] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-fuchsia-500/[0.02] blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-light/50 bg-surface/60 backdrop-blur-sm mb-12"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs tracking-wide text-muted-light uppercase">
              {sessions.length} сессий &middot; {totalQuestions} вопросов &middot; 22+ фреймворка
            </span>
          </motion.div>

          {/* Hero title — Option B "The Mirror" — giant text, line by line */}
          <h1 className="hero-title font-display text-shadow-hero mb-10" style={{ perspective: "1000px" }}>
            <HeroWord delay={0.2} className="text-gradient">Почему</HeroWord>
            <br />
            <HeroWord delay={0.35} className="text-foreground/90">ты</HeroWord>{" "}
            <HeroWord delay={0.45} className="text-foreground/90 italic">снова</HeroWord>
            <br />
            <HeroWord delay={0.6} className="text-gradient">застрял?</HeroWord>
          </h1>

          {/* Subtitle — staggered fade */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="space-y-3 mb-6"
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="text-lg md:text-xl text-muted-light max-w-xl mx-auto leading-relaxed"
            >
              Те же ошибки. Те же конфликты. Те же откладывания.
            </motion.p>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 1.05 }}
              className="text-base md:text-lg text-muted max-w-xl mx-auto leading-relaxed"
            >
              Это не лень. Это программа, которая работает в фоне.
              <br />
              <span className="text-accent-bright/80">Здесь ты её увидишь.</span>
            </motion.p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          >
            <Link href="/scan">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(167, 139, 250, 0.3), 0 0 80px rgba(167, 139, 250, 0.15)" }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-5 bg-accent text-white rounded-2xl text-lg font-medium cta-glow transition-colors hover:bg-accent-dim"
              >
                Начать сканирование
              </motion.button>
            </Link>
            <Link href="#what-you-get">
              <motion.button
                whileHover={{ scale: 1.02, borderColor: "rgba(167, 139, 250, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-5 border border-border-light/50 rounded-2xl text-lg text-muted-light hover:text-foreground transition-all backdrop-blur-sm"
              >
                Что я получу?
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="w-5 h-9 rounded-full border border-border-light/40 flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3], scaleY: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full bg-accent/60"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════ */}
      {/*          GRADIENT DISSOLVE          */}
      {/* ═══════════════════════════════════ */}
      <div className="section-dissolve" />

      {/* ═══════════════════════════════════ */}
      {/*           PROBLEM SECTION           */}
      {/* ═══════════════════════════════════ */}
      <ScrollSection className="px-6 py-32 max-w-3xl mx-auto">
        <div className="space-y-10">
          <ClipReveal as="h2" className="font-display text-4xl md:text-5xl leading-[0.95] text-foreground/90">
            У тебя бывает так?
          </ClipReveal>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-5"
          >
            {[
              "Ставишь цель — и через две недели забиваешь. Опять.",
              "Знаешь что надо поговорить — но молчишь. Опять.",
              "Начинаешь проект на энтузиазме — и бросаешь на полпути. Опять.",
            ].map((text, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                transition={{ ...springTransition, delay: i * 0.1 }}
                className="text-lg md:text-xl text-muted-light leading-relaxed pl-6 border-l-2 border-accent/20"
              >
                {text}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-5"
          >
            <p className="text-lg text-foreground/80 leading-relaxed">
              Это не потому что ты ленивый или слабый. У тебя внутри работает <span className="text-accent-bright">программа</span> — набор убеждений, страхов и привычек из детства. Ты их не выбирал. Ты их даже не видишь.
            </p>
            <p className="text-lg text-accent-bright/80 leading-relaxed">
              Здесь ты их увидишь. Не через один поверхностный тест — а через {sessions.length} блоков вопросов, которые реально используют психологи.
            </p>
          </motion.div>
        </div>
      </ScrollSection>

      {/* ═══════════════════════════════════ */}
      {/*          GRADIENT DISSOLVE          */}
      {/* ═══════════════════════════════════ */}
      <div className="section-dissolve" />

      {/* ═══════════════════════════════════ */}
      {/*          WHAT YOU GET               */}
      {/* ═══════════════════════════════════ */}
      <ScrollSection id="what-you-get" className="px-6 py-32 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.3em] uppercase text-accent mb-5"
            >
              Что ты получишь в конце
            </motion.p>
            <ClipReveal as="h2" className="font-display text-4xl md:text-6xl leading-tight">
              Документ о тебе
            </ClipReveal>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-muted-light mt-6 max-w-2xl mx-auto text-lg leading-relaxed"
            >
              Не &quot;ты экстраверт, поздравляем&quot;. А конкретный разбор: откуда твои паттерны, что тебя тормозит, что с этим делать.
            </motion.p>
          </div>

          {/* Cards grid */}
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {[
              { num: "01", title: "Портрет", desc: "Простым языком — какой ты человек. Не гороскоп, а реальное описание. Прочитаешь и скажешь 'блин, точно'.", gradient: "from-violet-500/10" },
              { num: "02", title: "Сильные стороны", desc: "То, что у тебя получается легко, а другие мучаются. Ты это не замечаешь — потому что для тебя это 'норма'.", gradient: "from-emerald-500/10" },
              { num: "03", title: "Где тормозишь", desc: "Убеждения из детства типа 'я должен быть идеальным' или 'показать слабость = опасно'. Они рулят тобой каждый день.", gradient: "from-amber-500/10" },
              { num: "04", title: "Роли и маски", desc: "На работе ты один, с друзьями другой, один дома — третий. Какие роли ты играешь, какие навязаны.", gradient: "from-rose-500/10" },
              { num: "05", title: "Где врёшь себе", desc: "Говоришь 'мне норм одному' а внутри одиноко. Говоришь 'я не боюсь' а сам избегаешь.", gradient: "from-cyan-500/10" },
              { num: "06", title: "Что делать", desc: "Не просто 'работай над собой'. А конкретно: с чего начать, что важнее, готов ли ты вообще.", gradient: "from-fuchsia-500/10" },
              { num: "07", title: "Тело", desc: "Стресс живёт не в голове — а в теле. Узнаешь свой тип реакции и почему 'просто успокойся' не работает.", gradient: "from-orange-500/10" },
              { num: "08", title: "Файл для AI", desc: "Готовый профиль для ChatGPT, Claude или любого бота. Он моментально начнёт понимать тебя.", gradient: "from-indigo-500/10" },
              { num: "09", title: "Инструкция", desc: "Короткий документ 'как со мной общаться' — для коллег, партнёра, друзей. Что работает, что бесит.", gradient: "from-teal-500/10" },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                variants={fadeUp}
                transition={{ ...springTransition }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 40px var(--accent-glow)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
                className="card-hover relative bg-surface/80 border border-border rounded-2xl p-7 overflow-hidden backdrop-blur-sm"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} to-transparent pointer-events-none`} />
                <div className="relative z-10">
                  <span className="font-mono text-xs text-accent/40">{item.num}</span>
                  <h3 className="font-display text-xl mt-2 mb-3 text-foreground/95">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ScrollSection>

      {/* ═══════════════════════════════════ */}
      {/*          GRADIENT DISSOLVE          */}
      {/* ═══════════════════════════════════ */}
      <div className="section-dissolve" />

      {/* ═══════════════════════════════════ */}
      {/*         SESSIONS / PROCESS          */}
      {/* ═══════════════════════════════════ */}
      <ScrollSection id="sessions" className="px-6 py-32 max-w-4xl mx-auto scroll-mt-20">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] uppercase text-accent mb-5"
          >
            Процесс
          </motion.p>
          <ClipReveal as="h2" className="font-display text-4xl md:text-6xl">
            {sessions.length} слоёв глубины
          </ClipReveal>
        </div>

        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-4"
        >
          {sessions.map((session, i) => {
            const isDone = completedMap[session.id] ?? false;
            const color = sessionColors[i] ?? sessionColors[0];

            return (
              <motion.div
                key={session.id}
                variants={fadeUp}
                transition={{ ...springTransition }}
              >
                <Link href={`/session/${session.id}`}>
                  <motion.div
                    whileHover={{
                      y: -3,
                      boxShadow: `0 4px 20px rgba(0,0,0,0.4), 0 0 30px ${color}15`,
                      borderColor: `${color}30`,
                    }}
                    className={`group flex items-center gap-6 bg-surface/60 border rounded-2xl p-5 md:p-6 backdrop-blur-sm transition-colors duration-500 ${isDone ? "border-accent/30" : "border-border"}`}
                  >
                    {/* Icon with session-specific color glow */}
                    <div
                      className={`shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center text-2xl transition-all duration-500 ${isDone ? "bg-accent/10 border-accent/30" : "bg-surface-2 border-border-light/50"}`}
                      style={{
                        boxShadow: isDone ? `0 0 20px ${color}20` : "none",
                      }}
                    >
                      {isDone ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          style={{ color }}
                        >
                          ✓
                        </motion.span>
                      ) : (
                        session.icon
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="font-mono text-xs" style={{ color: `${color}80` }}>
                          0{i + 1}
                        </span>
                        <h3 className="font-display text-xl group-hover:text-accent-bright transition-colors duration-300">
                          {session.title}
                        </h3>
                        <span className="text-xs text-muted hidden sm:inline">{session.subtitle}</span>
                      </div>
                      <p className="text-sm text-muted truncate">{session.description}</p>
                    </div>

                    {/* Stats */}
                    <div className="shrink-0 text-right hidden sm:block">
                      <p className="text-xs text-muted">
                        {session.sections.reduce((a, s) => a + s.questions.length, 0)} вопросов
                      </p>
                      <p className="text-xs text-muted/40">~{session.estimatedMinutes} мин</p>
                    </div>

                    {/* Arrow */}
                    <div className="shrink-0 text-muted/20 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </ScrollSection>

      {/* ═══════════════════════════════════ */}
      {/*          GRADIENT DISSOLVE          */}
      {/* ═══════════════════════════════════ */}
      <div className="section-dissolve" />

      {/* ═══════════════════════════════════ */}
      {/*         SCIENCE / STATS             */}
      {/* ═══════════════════════════════════ */}
      <ScrollSection className="px-6 py-32">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.3em] uppercase text-accent mb-5"
            >
              Почему это не очередной тест
            </motion.p>
            <ClipReveal as="h2" className="font-display text-4xl md:text-6xl mb-5">
              Без гороскопов
            </ClipReveal>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-muted-light max-w-2xl mx-auto text-lg"
            >
              MBTI — ненадёжный. Эннеаграмма — не подтверждена наукой. Мы используем только то, что реально проверено.
            </motion.p>
          </div>

          {/* Stats bar — big animated numbers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { value: 22, suffix: "+", label: "научных фреймворков" },
              { value: totalQuestions, suffix: "", label: "вопросов" },
              { value: 9, suffix: "", label: "слоёв анализа" },
              { value: 80, suffix: "%", label: "точность при честных ответах" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-surface/60 border border-border backdrop-blur-sm"
              >
                <p className="text-4xl md:text-5xl font-display text-gradient-static mb-2">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs text-muted uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Frameworks grid */}
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { name: "Big Five", desc: "5 главных черт характера — от общительности до тревожности. Самый надёжный тест в мире.", stat: "87-93%", icon: "🧬" },
              { name: "Привязанность", desc: "Как ты строишь близкие отношения. Предсказывает реакцию на стресс и близость.", stat: "30-40%", icon: "🔗" },
              { name: "Эмоции", desc: "Как ты справляешься с чувствами — или не справляешься. Ловит импульсивность.", stat: "93-95%", icon: "🌊" },
              { name: "Глубинные схемы", desc: "Убеждения из детства: 'я недостоин', 'мир опасен'. Работают на автопилоте.", stat: "18 схем", icon: "🔮" },
              { name: "Детский опыт", desc: "10 вопросов о детских травмах. Связь с здоровьем и поведением.", stat: "17K+", icon: "🧒" },
              { name: "Ценности", desc: "Что для тебя важнее — свобода, безопасность, достижения?", stat: "49+ культур", icon: "💎" },
              { name: "Защитные механизмы", desc: "Как мозг защищает тебя от боли: отрицание, проекция, рационализация.", stat: "3 уровня", icon: "🛡️" },
              { name: "Гибкость", desc: "Можешь ли действовать по ценностям, когда больно и страшно?", stat: "84%", icon: "🌿" },
            ].map((tool) => (
              <motion.div
                key={tool.name}
                variants={fadeUp}
                transition={{ ...springTransition }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.4), 0 0 20px var(--accent-glow)",
                }}
                className="bg-surface/60 border border-border rounded-xl p-5 shadow-premium backdrop-blur-sm transition-colors"
              >
                <div className="text-2xl mb-3">{tool.icon}</div>
                <p className="font-medium text-foreground/90 mb-1">{tool.name}</p>
                <p className="text-xs text-muted leading-relaxed mb-3">{tool.desc}</p>
                <p className="text-xs text-accent font-mono">{tool.stat}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ScrollSection>

      {/* ═══════════════════════════════════ */}
      {/*          GRADIENT DISSOLVE          */}
      {/* ═══════════════════════════════════ */}
      <div className="section-dissolve" />

      {/* ═══════════════════════════════════ */}
      {/*            FINAL CTA                */}
      {/* ═══════════════════════════════════ */}
      <section className="relative px-6 py-40 text-center overflow-hidden">
        {/* Big glow behind CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.04] blur-[150px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <h2 className="hero-subtitle font-display mb-8 leading-tight">
            <span className="text-foreground/90">Хватит гадать.</span>
            <br />
            <span className="italic text-gradient">Пора разобраться.</span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-light mb-12 text-lg"
          >
            {sessions.length} блоков по 5-15 минут. Можно растянуть на неделю.
            <br />
            <span className="text-muted">Чем честнее ответишь — тем точнее результат.</span>
          </motion.p>

          <Link href="/scan">
            <motion.button
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 40px rgba(167, 139, 250, 0.3), 0 0 100px rgba(167, 139, 250, 0.15)",
              }}
              whileTap={{ scale: 0.97 }}
              className="px-12 py-6 bg-accent text-white rounded-2xl text-xl font-medium cta-glow hover:bg-accent-dim transition-colors"
            >
              Начать сканирование
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════ */}
      {/*             FOOTER                  */}
      {/* ═══════════════════════════════════ */}
      <footer className="px-6 py-12 border-t border-border/50">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted/40">
          <p className="font-display text-sm text-muted/60">Psyche Scan</p>
          <p>Не заменяет терапию. Инструмент самопознания.</p>
          <div className="flex gap-4">
            <Link href="/results" className="hover:text-accent transition-colors duration-300">Результаты</Link>
          </div>
        </div>
      </footer>
    </motion.main>
  );
}
