"use client";

import { sessions, getTotalQuestionCount } from "@/data/questions";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export default function Home() {
  const totalQuestions = getTotalQuestionCount();
  const totalMinutes = sessions.reduce((a, s) => a + s.estimatedMinutes, 0);

  return (
    <main className="noise min-h-screen">
      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.04] blur-[120px] pointer-events-none" />
        <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] rounded-full bg-accent-dim/[0.03] blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="relative z-10 text-center max-w-3xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-light bg-surface/80 backdrop-blur-sm mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs tracking-wide text-muted-light uppercase">Evidence-based profiling</span>
          </motion.div>

          {/* Title */}
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tight mb-8 text-shadow-hero">
            <span className="text-gradient">Узнай себя</span>
            <br />
            <span className="text-foreground/90 italic">по-настоящему</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-light max-w-xl mx-auto mb-4 leading-relaxed">
            Глубинное сканирование личности на основе
            <span className="text-foreground font-medium"> клинической психологии</span>.
            Не тест — полная карта того, как устроено твоё сознание.
          </p>

          <p className="text-sm text-muted mb-10">
            {totalQuestions} вопросов &middot; 8 сессий &middot; ~{Math.round(totalMinutes / 60)} часа &middot; AI-анализ
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#what-you-get">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-accent text-white rounded-2xl text-lg font-medium shadow-glow hover:bg-accent-dim transition-colors"
              >
                Что я получу?
              </motion.button>
            </Link>
            <Link href={`/session/${sessions[0].id}`}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border border-border-light rounded-2xl text-lg text-muted-light hover:text-foreground hover:border-accent/30 transition-all"
              >
                Начать сканирование
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-border-light flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-accent/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="gradient-line max-w-xl mx-auto" />

      {/* ── PROBLEM ── */}
      <section className="px-6 py-28 max-w-3xl mx-auto">
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="font-display text-3xl md:text-4xl leading-snug text-foreground/90">
            Ты думаешь что знаешь себя.
          </motion.p>
          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="font-display text-3xl md:text-4xl leading-snug text-muted">
            Но исследования показывают: корреляция между тем, что люди
            <span className="italic text-accent-bright"> говорят</span> о себе, и тем что
            <span className="italic text-accent-bright"> делают</span> — всего <span className="text-foreground font-medium">r = 0.20</span>.
          </motion.p>
          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="text-lg text-muted-light leading-relaxed">
            Мы врём себе. Не специально — мозг просто так работает. Защитные механизмы, слепые зоны, подавленные качества. Всё это управляет тобой, пока ты этого не видишь.
          </motion.p>
          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="text-lg text-foreground/80 leading-relaxed">
            Psyche Scan снимает эту слепоту. Не через один поверхностный тест, а через 8 слоёв глубинного анализа — от нейрофизиологии до экзистенциальных вопросов.
          </motion.p>
        </motion.div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section id="what-you-get" className="px-6 py-28 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">Конечный результат</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Personality Passport
            </h2>
            <p className="text-muted-light mt-4 max-w-lg mx-auto">
              Полный документ о том кто ты, как работаешь и как трансформироваться.
              Генерируется AI на основе всех твоих ответов.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {[
              { num: "01", title: "Кто ты", desc: "Живой портрет — не сухие цифры, а точное описание как ты устроен. Big Five, привязанность, ценности, таланты.", color: "from-violet-500/10 to-transparent" },
              { num: "02", title: "Суперсилы", desc: "3-5 главных сильных сторон. Не общие фразы — конкретно, что делает тебя уникальным и где твоё естественное преимущество.", color: "from-emerald-500/10 to-transparent" },
              { num: "03", title: "Тень и блоки", desc: "Защитные механизмы, схемы из детства, подавленные качества. То, что управляет тобой на автопилоте.", color: "from-amber-500/10 to-transparent" },
              { num: "04", title: "Эго-конструкция", desc: "Уровень развития сознания, внутренние роли, маски. Как устроено твоё 'Я' и где его ограничения.", color: "from-rose-500/10 to-transparent" },
              { num: "05", title: "Слепые зоны", desc: "Где ты врёшь себе. Конкретные противоречия между тем что говоришь и что делаешь. Шкала валидности ловит самообман.", color: "from-cyan-500/10 to-transparent" },
              { num: "06", title: "Карта трансформации", desc: "Что менять, в каком порядке, есть ли ресурсы. Стадия готовности по каждому блоку. Конкретный план, не мотивашка.", color: "from-fuchsia-500/10 to-transparent" },
              { num: "07", title: "Тело и нервная система", desc: "Polyvagal профиль, интероцепция, окно толерантности. Без этого когнитивные интервенции работают на 50%.", color: "from-orange-500/10 to-transparent" },
              { num: "08", title: "YAML для AI-бота", desc: "Готовый профиль для system prompt. Скопировал — и любой AI-ассистент моментально становится 'твоим'. Знает как с тобой работать.", color: "from-indigo-500/10 to-transparent" },
              { num: "09", title: "Инструкция для людей", desc: "'Как со мной работать' — для коллег, партнёра, друзей. Что делать, чего не делать, как лучше доносить информацию.", color: "from-teal-500/10 to-transparent" },
            ].map((item) => (
              <motion.div
                key={item.num}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className={`card-hover relative bg-surface border border-border rounded-2xl p-6 overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} pointer-events-none`} />
                <div className="relative z-10">
                  <span className="font-mono text-xs text-accent/60">{item.num}</span>
                  <h3 className="font-display text-xl mt-2 mb-3">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="gradient-line max-w-xl mx-auto" />

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 py-28 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">Процесс</p>
          <h2 className="font-display text-4xl md:text-5xl">8 слоёв глубины</h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-4"
        >
          {sessions.map((session, i) => (
            <motion.div
              key={session.id}
              variants={fadeUp}
              transition={{ duration: 0.4 }}
            >
              <Link href={`/session/${session.id}`}>
                <div className="card-hover group flex items-center gap-6 bg-surface border border-border rounded-2xl p-5 md:p-6">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-surface-2 border border-border-light flex items-center justify-center text-2xl group-hover:shadow-glow transition-shadow duration-500">
                    {session.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="font-mono text-xs text-accent/50">0{i + 1}</span>
                      <h3 className="font-display text-xl group-hover:text-accent-bright transition-colors">{session.title}</h3>
                      <span className="text-xs text-muted hidden sm:inline">{session.subtitle}</span>
                    </div>
                    <p className="text-sm text-muted truncate">{session.description}</p>
                  </div>
                  <div className="shrink-0 text-right hidden sm:block">
                    <p className="text-xs text-muted">{session.sections.reduce((a, s) => a + s.questions.length, 0)} вопросов</p>
                    <p className="text-xs text-muted/50">~{session.estimatedMinutes} мин</p>
                  </div>
                  <div className="shrink-0 text-muted/30 group-hover:text-accent transition-colors">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="gradient-line max-w-xl mx-auto" />

      {/* ── SCIENCE ── */}
      <section className="px-6 py-28 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">Научная база</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">Только проверенное</h2>
          <p className="text-muted-light max-w-lg mx-auto">
            Каждый вопрос основан на инструменте с мета-аналитической валидацией.
            MBTI, Эннеаграмма, DISC — не используются.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { name: "IPIP-NEO", desc: "Big Five personality", stat: "r = .87-.93", source: "Wilmot & Ones 2019" },
            { name: "ECR-R", desc: "Attachment style", stat: "r = .28-.42", source: "Zhang et al. 2022" },
            { name: "DERS", desc: "Emotion regulation", stat: "α = .93-.95", source: "Gratz & Roemer 2004" },
            { name: "YSQ-S3", desc: "Early schemas", stat: "α = .97", source: "Young 2005" },
            { name: "DAS", desc: "Cognitive patterns", stat: "validated", source: "Weissman 1979" },
            { name: "ACE", desc: "Childhood trauma", stat: "N = 17,000+", source: "CDC-Kaiser" },
            { name: "PVQ-RR", desc: "Values (Schwartz)", stat: "49+ cultures", source: "Schwartz 2012" },
            { name: "AAQ-II", desc: "Psych flexibility", stat: "α = .84", source: "Bond et al. 2011" },
          ].map((tool) => (
            <motion.div
              key={tool.name}
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className="bg-surface border border-border rounded-xl p-4 shadow-premium"
            >
              <p className="font-mono text-sm text-accent-bright mb-1">{tool.name}</p>
              <p className="text-xs text-foreground/80 mb-2">{tool.desc}</p>
              <p className="text-xs text-muted font-mono">{tool.stat}</p>
              <p className="text-[10px] text-muted/50 mt-1">{tool.source}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-5xl mb-6 leading-tight">
            Готов увидеть
            <br />
            <span className="italic text-gradient">полную картину?</span>
          </h2>
          <p className="text-muted-light mb-10 text-lg">
            8 сессий. ~{Math.round(totalMinutes / 60)} часа. Можно за несколько дней.
            <br />
            В конце — полный Personality Passport и YAML для AI-бота.
          </p>
          <Link href={`/session/${sessions[0].id}`}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-5 bg-accent text-white rounded-2xl text-xl font-medium shadow-glow hover:bg-accent-dim transition-all"
            >
              Начать сканирование
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 py-10 border-t border-border">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted/50">
          <p className="font-display text-sm text-muted">Psyche Scan</p>
          <p>Не заменяет терапию. Инструмент самопознания.</p>
          <div className="flex gap-4">
            <Link href="/results" className="hover:text-accent transition-colors">Результаты</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
