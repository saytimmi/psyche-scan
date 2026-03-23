# Psyche Scan — Landing Page Redesign

## Overview

Complete redesign of the Psyche Scan landing page. Keep core messaging, rebuild everything else: structure, design, animations, typography, color palette. Goal: immersive cinematic experience that triggers "I need to try this" through psychological hooks, FOMO, and simplicity.

## Design Decisions

### Palette: Ember
- Background: `#050505` (near-black)
- Primary accent: `#f97316` (orange)
- Deep accent: `#dc2626` (red)
- Warm accent: `#fbbf24` (amber)
- Gradients: `linear-gradient(135deg, #f97316, #dc2626)` for CTAs and highlights

### Typography
- **Display:** Zodiak (Fontshare) — high-contrast editorial serif, dramatic thick-thin transitions
- **Body:** General Sans (Fontshare) — Swiss-inspired, warm and clean
- **Mono:** Keep JetBrains Mono for data/labels

### Animation Stack
- **GSAP + ScrollTrigger** — scroll-driven sections (hero parallax, absorption sticky, comparison reveal)
- **Framer Motion** — UI animations (hover, reveal, stagger, spring physics)
- **Lenis** — smooth scrolling
- **Canvas** — ember particle system in hero

## Page Structure (8 sections)

### 1. Hero — "Ты не знаешь почему ты такой"
- **Content:** Black screen. Text only. Ember particles floating on canvas (subtle, ~40 particles with glow trails).
- **Copy:** Combines best of all brainstorm variants:
  - H1: "Ты не знаешь почему ты такой."
  - Sub: "Почему срываешься на близких. Почему тянешь с решениями. Почему одни отношения — как под копирку."
  - OS line: "Внутри тебя — операционная система, которую ты ни разу не открывал."
  - Scroll hint: "↓ ОТКРОЙ"
- **Animation:** Text appears line-by-line with clip-path reveal (0.8s per line, stagger 0.3s). Particles on canvas with glow. Background radial gradient pulses subtly. On scroll — text parallax up, particles accelerate.
- **Psychology:** Self-reference effect — brain can't NOT start answering. Scroll = "show me the answer".

### 2. Explanation — "Мозг записал правила"
- **Content:** One simple metaphor + 3 pattern cards (belief → result).
- **Copy:**
  - H2: "С рождения до 7 лет мозг записал набор правил. Ты вырос. Правила — нет."
  - Cards: "Покажу слабость — накажут" → прячешь эмоции / "Буду идеальным — будут любить" → вкалываешь до выгорания / "Люди уходят" → не привязываешься
- **Animation:** Heading clip-reveal. Cards stagger in (delay 0.15s). Hover — card lifts slightly, border glow.
- **Psychology:** Barnum effect + recognition. "Это же про меня" = instant trust.

### 3. Absorption — Scroll-driven sticky animation (KEY SECTION)
- **Content:** Human silhouette (SVG or styled div) centered. Phrases fly in and get absorbed. Layers form around silhouette.
- **Technical:**
  - Section height: ~300vh
  - Inner container: `position: sticky; top: 0; height: 100vh`
  - GSAP ScrollTrigger with `pin: false` (manual sticky), `scrub: true`
- **Animation phases (0%→100% scroll progress):**
  - 0-20%: Clean silhouette appears, soft ember glow pulse
  - 20-50%: 5 phrases fly in from edges one by one → approach silhouette → flash on contact → absorb (fade + scale down). Phrases: "я должен быть сильным", "меня не любят таким", "мир опасен", "я недостаточно хорош", "нельзя доверять"
  - 50-75%: Layers materialize around silhouette — fears (orange dashed), defenses (red dashed), masks (amber dashed). Each layer = concentric ring.
  - 75-90%: Silhouette fully "loaded", pulses with anxious glow
  - 90-100%: Text fades in: "Всё это внутри тебя. Прямо сейчас." → transition to next section
- **Psychology:** Visual metaphor of how childhood programming accumulates. Visceral, not intellectual.

### 4. Blurred Result — Information gap
- **Content:** Mockup of real Personality Passport. First paragraph readable, rest progressively blurred (3px → 5px → 7px). Gradient fade at bottom with CTA.
- **Copy:**
  - H2: "Вот что ты получишь."
  - Readable text: sample personality description (attachment style, introversion, etc.)
  - Blurred: schemas, strengths, blind spots, recommendations
  - Fade CTA: "Хочешь увидеть полностью?"
- **Animation:** Text reveals top-to-bottom on scroll. Blur is static (CSS filter). CTA has glow pulse.
- **Psychology:** Information gap theory (Loewenstein). Seeing partial answer = desperately want the full one.

### 5. Comparison — FOMO
- **Content:** Two columns: "Ты сейчас" (dim, muted) vs "После сканирования" (bright, ember-accented).
- **Copy:**
  - Before: "не знаю почему бешусь", "опять та же ссора", "не понимаю чего хочу", "почему я такой"
  - After: "тревожная привязанность → вот почему", "схема покинутости → вот паттерн", "высокая открытость + низкая дисциплина", "вот инструкция что делать"
- **Animation:** Left column appears first (muted). Pause. Right column stagger-reveals (each line). Contrast hits visually.
- **Psychology:** FOMO through visual contrast. User doesn't want to stay in the left column.

### 6. Trust — Authority
- **Content:** One sentence + cinematic marquee of framework names + 3 stats.
- **Copy:**
  - H2: "22 клинических теста."
  - Sub: "Те же, что используют психологи. Только бесплатно."
  - Marquee: BIG FIVE · ECR-R · DERS · YSQ-S3 · ACE · PVQ-RR · DSQ · IFS · POLYVAGAL · MAIA · NEFF · LOEVINGER · McADAMS · KEGAN
  - Stats: 330 вопросов / 9 слоёв / $0 вместо $174
- **Animation:** Slow cinematic marquee (45s, mono, uppercase, wide letter-spacing). Stats — animated counters on scroll-in-view.
- **Psychology:** Authority bias. Don't need to explain ECR-R — just showing science exists builds trust.

### 7. Process — "Это просто"
- **Content:** 3 steps with vertical connector line.
- **Copy:**
  1. "Отвечаешь на вопросы" — по 15 минут за раз
  2. "AI собирает портрет" — 22 теста → единый документ
  3. "Получаешь инструкцию к себе" — что, почему, что делать
- **Animation:** Steps appear on scroll. Connector line draws top-to-bottom (stroke-dashoffset). Simple, calming — removes anxiety about complexity.
- **Psychology:** Cognitive load reduction. 3 steps = "easy". 9 sessions = "hard, later".

### 8. Final CTA — No alternatives
- **Content:** Ember glow background. Short text. One button. Social proof.
- **Copy:**
  - H2: "Хватит гадать. Узнай."
  - Button: "Пройти сканирование"
  - Meta: "Бесплатно · 5 минут на первую сессию · результат сразу"
  - Social: "X человек уже прошли сканирование"
- **Animation:** Radial ember glow pulses (scale 1→1.1, opacity). Button has gradient border animation (rotating conic gradient). Counter animates on view.
- **Psychology:** Urgency + instant gratification + social proof. No decision fatigue — one action.

### Navigation
- Fixed, transparent on load
- Scrolls down → hides (translateY -100%)
- Scrolls up → appears with blur backdrop
- Hides completely on final CTA section (no button duplication)
- Content: logo "Psyche Scan" (Zodiak, ember color) + "Начать" button (gradient)

### Footer
- Minimal: logo + "Не заменяет терапию" + links (Тесты, Результаты)
- Border-top only, low contrast

## Technical Implementation

### Dependencies to add
- `gsap` + `@gsap/react` (ScrollTrigger plugin)
- Fonts: Zodiak + General Sans via Fontshare CDN (already available)

### Dependencies to keep
- `framer-motion` (already installed) — for UI micro-animations
- `lenis` (already installed) — smooth scroll
- `next/image` — optimized images (minimal use — mostly text/animation based)

### File structure changes
- `src/app/page.tsx` — complete rewrite
- `src/app/globals.css` — new color variables, typography, utilities
- `src/components/EmberParticles.tsx` — canvas particle system
- `src/components/AbsorptionScene.tsx` — GSAP sticky scroll animation
- `src/components/BlurredPassport.tsx` — progressive blur mockup
- `src/components/ComparisonColumns.tsx` — before/after with scroll reveal
- `src/components/CinematicMarquee.tsx` — slow framework marquee
- `src/components/Reveal.tsx` — reusable Framer Motion reveal wrapper

### Removed from current landing
- All Unsplash stock images (replaced by text + animation)
- `aurora-background.tsx`, `spotlight-new.tsx`, `text-generate-effect.tsx`, `sticky-scroll-reveal.tsx`, `bento-grid.tsx`, `lamp.tsx` — unused Aceternity components (keep in /ui/ for potential future use)
- Sessions grid (replaced by 3-step process)
- AI section (cut — not core to conversion)
- Instrument Serif, DM Sans fonts (replaced by Zodiak, General Sans)

## Success Criteria
- First-time visitor scrolls past hero within 5 seconds (hook works)
- Absorption animation creates visceral "this is me" moment
- Blurred passport creates information gap desire
- Comparison columns trigger FOMO
- CTA conversion: visitor clicks "Пройти сканирование"
- Page load < 3s, LCP < 2.5s, smooth 60fps animations
