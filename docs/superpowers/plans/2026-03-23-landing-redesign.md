# Landing Page Redesign — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current Psyche Scan landing page with an immersive, cinematic, scroll-driven experience using ember palette, Zodiak/General Sans typography, and GSAP+Framer Motion animations.

**Architecture:** Complete rewrite of `page.tsx` and `globals.css`. New component per landing section. GSAP ScrollTrigger for scroll-driven animations (absorption, comparison), Framer Motion for UI reveals/hovers. Canvas-based ember particle system in hero. Lenis smooth scroll already in place.

**Tech Stack:** Next.js 16, TypeScript, Tailwind 4, GSAP 3.14 + ScrollTrigger (already installed), Framer Motion 12 (already installed), Lenis (already installed), Fontshare CDN (Zodiak + General Sans)

**Spec:** `docs/superpowers/specs/2026-03-23-landing-redesign.md`

---

## Chunk 1: Foundation (CSS + Fonts + Layout + Reveal)

### Task 1: Rewrite globals.css — ember palette + new typography

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace globals.css with new theme**

Replace entire contents of `src/app/globals.css` with ember palette variables, Zodiak+General Sans font imports from Fontshare CDN, base styles, and utility classes (`.section` padding, `.btn-ember` gradient button, `.divider`). Remove old Instrument Serif/DM Sans imports. Keep Tailwind 4 import and tw-animate-css.

CSS variables:
```
--bg: #050505
--bg-card: #0e0e0e
--ember: #f97316
--ember-deep: #dc2626
--ember-warm: #fbbf24
--text: #ffffff
--text-60: rgba(255,255,255,0.6)
--text-30: rgba(255,255,255,0.3)
--text-15: rgba(255,255,255,0.15)
--text-08: rgba(255,255,255,0.08)
--text-04: rgba(255,255,255,0.04)
--font-display: 'Zodiak', Georgia, serif
--font-body: 'General Sans', system-ui, sans-serif
--font-mono: 'JetBrains Mono', monospace
--ease: cubic-bezier(0.23, 1, 0.32, 1)
```

Headings: `font-family: var(--font-display); line-height: 1.05; letter-spacing: -0.03em`
Selection: ember on bg. Scrollbar: 3px, ember thumb.
Marquee keyframes: `marquee-scroll` translateX(-50%) 45s linear infinite.

- [ ] **Step 2: Update layout.tsx metadata**

Update title to "Psyche Scan — Узнай как ты устроен" and description to match new positioning.

- [ ] **Step 3: Verify fonts load**

Run: `npm run dev`
Open localhost:3000, inspect — confirm Zodiak renders on headings, General Sans on body.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: new ember palette, Zodiak+General Sans typography"
```

### Task 2: Create Reveal component

**Files:**
- Create: `src/components/Reveal.tsx`

- [ ] **Step 1: Write Reveal component**

Client component using Framer Motion `motion.div`. Props: `children`, `className`, `delay` (default 0), `direction` (default "up"). Uses `whileInView` with `viewport: { once: true, amount: 0.15 }`. Easing: `[0.23, 1, 0.32, 1]`. Duration: 0.8s. Initial: `opacity: 0, y: 40` (or `y: -40` for "down"). Animate: `opacity: 1, y: 0`.

- [ ] **Step 2: Commit**

```bash
git add src/components/Reveal.tsx
git commit -m "feat: add Reveal component with Framer Motion"
```

### Task 3: Create EmberParticles canvas component

**Files:**
- Create: `src/components/EmberParticles.tsx`

- [ ] **Step 1: Write EmberParticles component**

Client component. Full-screen canvas with `position: absolute; inset: 0`. Uses `useRef` for canvas, `useEffect` for animation loop. Creates ~40 particles with:
- Random position, radius (0.5-2.5px), velocity (slow upward drift + slight horizontal)
- Colors: alternating `#f97316` and `#dc2626`
- Opacity: 0.03-0.18 range
- Each particle draws: filled circle + larger glow circle (4x radius, 0.2x opacity)
- Particles wrap around edges
- ResizeObserver for canvas sizing with devicePixelRatio
- Cleanup on unmount

Props: `className` for positioning.

- [ ] **Step 2: Verify particles render**

Add temporarily to page.tsx hero section, check localhost — particles should float subtly upward with soft glow.

- [ ] **Step 3: Commit**

```bash
git add src/components/EmberParticles.tsx
git commit -m "feat: add EmberParticles canvas component"
```

---

## Chunk 2: Hero + Explanation sections

### Task 4: Create hero section in page.tsx

**Files:**
- Modify: `src/app/page.tsx` (complete rewrite starts here)

- [ ] **Step 1: Rewrite page.tsx with hero section only**

Replace entire `page.tsx`. Client component with:
- Fixed nav: logo "Psyche Scan" (Zodiak, ember) + "Начать" button (gradient). Hide on scroll down, show on scroll up (useScroll + useTransform from Framer Motion). Blur backdrop when scrolled.
- Hero section: `min-h-screen`, flex center, text center.
  - `<EmberParticles />` as background
  - H1: "Ты не знаешь почему ты такой." — Zodiak, `clamp(2.8rem, 7vw, 5.5rem)`, clip-path reveal animation line by line
  - Sub: three lines of trigger questions — General Sans, text-30, stagger delay
  - OS line: "Внутри тебя — операционная система..." — Zodiak, text-60, ember accent on "операционная система"
  - Scroll hint: "↓ ОТКРОЙ" — mono, text-15, bob animation
- All text animations: Framer Motion `initial/animate` with clip-path or y-translate + stagger delays (0.2s, 0.6s, 0.9s, 1.2s)

- [ ] **Step 2: Verify hero renders**

Run: `npm run dev`
Check: black screen, particles floating, text appears with animation, nav at top.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: hero section with ember particles and text reveal"
```

### Task 5: Add explanation section

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add explanation section after hero**

New section with `.section` padding, `max-w-[800px] mx-auto`:
- `<Reveal>` wrapped H2: "С рождения до 7 лет мозг записал набор правил." + dim span "Ты вырос. Правила — нет."
- 3 pattern cards in flex column, gap-3. Each card:
  - Rounded-xl, padding, background with ember/red/amber tint (opacity 0.05), border with matching color (opacity 0.12)
  - Left: belief text (text-60), Right: "→ result" in mono, colored per card
  - `<Reveal delay={0.1 * i}>` wrapper
  - Hover: translateY(-2px), border brightens

- [ ] **Step 2: Verify section renders**

Scroll past hero — explanation should reveal with staggered cards.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: explanation section with pattern cards"
```

---

## Chunk 3: Absorption scene (KEY SECTION)

### Task 6: Create AbsorptionScene component

**Files:**
- Create: `src/components/AbsorptionScene.tsx`

- [ ] **Step 1: Write AbsorptionScene component**

Client component. This is the most complex section — scroll-driven sticky animation using GSAP ScrollTrigger.

Structure:
```
<div ref={containerRef} style={{ height: '300vh' }}>  {/* scroll container */}
  <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
    {/* Silhouette: styled div with border-radius, centered */}
    {/* 3 layer rings: fears (orange), defenses (red), masks (amber) — absolute positioned, concentric */}
    {/* 5 flying phrases — absolute positioned around silhouette */}
    {/* Bottom text: "Всё это внутри тебя. Прямо сейчас." */}
  </div>
</div>
```

GSAP ScrollTrigger setup in `useEffect` (with `useGSAP` from @gsap/react):
- Register ScrollTrigger plugin
- Create timeline with `scrollTrigger: { trigger: containerRef, start: 'top top', end: 'bottom bottom', scrub: 1 }`
- Timeline phases:
  - 0-0.15: silhouette fades in, soft ember glow pulse (boxShadow animation)
  - 0.15-0.50: each phrase (staggered at 0.07 intervals) animates from `opacity:0, x: ±200` → `opacity:1, x:0` → `opacity:0, scale:0.3` (absorbed). Each phrase triggers a brief flash on the silhouette border.
  - 0.50-0.75: layer rings animate from `opacity:0, scale:0.7` → `opacity:1, scale:1` with stagger
  - 0.75-0.90: silhouette core gets stronger ember glow (boxShadow intensifies)
  - 0.90-1.0: bottom text fades in, `opacity:0 → 1, y:20 → 0`

Silhouette: `w-[100px] h-[220px] rounded-[50px_50px_38px_38px]` with subtle border.
Layer rings: absolute positioned, centered with `translate(-50%,-50%)`, increasing size, dashed borders.
Phrases: `position: absolute`, distributed around silhouette at various positions.

- [ ] **Step 2: Add AbsorptionScene to page.tsx**

Import and place after explanation section. No wrapping needed — component handles its own scroll height.

- [ ] **Step 3: Test scroll animation**

Scroll through the 300vh section. Verify:
- Silhouette stays sticky
- Phrases fly in and absorb at correct scroll positions
- Layers appear sequentially
- Final text appears at end
- Animation is smooth (scrub, no janks)

- [ ] **Step 4: Commit**

```bash
git add src/components/AbsorptionScene.tsx src/app/page.tsx
git commit -m "feat: scroll-driven absorption scene with GSAP ScrollTrigger"
```

---

## Chunk 4: Blurred Passport + Comparison

### Task 7: Create BlurredPassport component

**Files:**
- Create: `src/components/BlurredPassport.tsx`

- [ ] **Step 1: Write BlurredPassport component**

Client component. Section with `max-w-[640px] mx-auto`, centered.
- `<Reveal>` H2: "Вот что ты получишь."
- Passport mock card: `bg-[rgba(255,255,255,0.02)]`, border text-08, rounded-2xl, relative, overflow-hidden.
  - Label: "PERSONALITY PASSPORT" — mono, 10px, ember/50
  - Title: "Твой профиль" — Zodiak 22px
  - Paragraph 1 (readable): sample text about introversion + attachment
  - Paragraph 2: `filter: blur(3px)`, user-select-none
  - Paragraph 3: `filter: blur(5px)`
  - Paragraph 4: `filter: blur(7px)`
  - Gradient overlay at bottom: `bg-gradient-to-t from-[var(--bg)] to-transparent`, height 160px
  - CTA text centered at bottom: "Хочешь увидеть полностью?" — Zodiak, ember, glowPulse animation (text-shadow)
- Whole card wrapped in `<Reveal>`

- [ ] **Step 2: Add to page.tsx**

Import and place after AbsorptionScene.

- [ ] **Step 3: Commit**

```bash
git add src/components/BlurredPassport.tsx src/app/page.tsx
git commit -m "feat: blurred passport preview with information gap"
```

### Task 8: Create ComparisonColumns component

**Files:**
- Create: `src/components/ComparisonColumns.tsx`

- [ ] **Step 1: Write ComparisonColumns component**

Client component. Uses Framer Motion for staggered reveal.
- `<Reveal>` H2: "Разница — " + ember span "ясность."
- Grid: 2 columns on md+, 1 column on mobile
- Left column ("Сейчас"): muted background, dim text (text-15), label in mono text-15
  - 4 items with border-bottom dividers
- Right column ("После сканирования"): ember-tinted background, brighter text (text-60), label in mono ember
  - 4 items with border-bottom dividers
- Animation: left column reveals first, right column reveals with 0.3s delay. Items within right column stagger.

- [ ] **Step 2: Add to page.tsx**

Import and place after BlurredPassport.

- [ ] **Step 3: Commit**

```bash
git add src/components/ComparisonColumns.tsx src/app/page.tsx
git commit -m "feat: before/after comparison columns with FOMO effect"
```

---

## Chunk 5: Trust + Process + CTA + Footer

### Task 9: Create CinematicMarquee component

**Files:**
- Create: `src/components/CinematicMarquee.tsx`

- [ ] **Step 1: Write CinematicMarquee component**

Client component. CSS-based infinite horizontal scroll.
- Wrapper: overflow-hidden, border-top + border-bottom (text-04), padding 24px 0
- Inner: flex, width max-content, `animation: marquee-scroll 45s linear infinite`
- Items: 14 framework names × 2 (for seamless loop). Mono font, 13px, text-15, uppercase, letter-spacing 0.2em, spacing mx-8.
- Hover pauses animation.

- [ ] **Step 2: Commit**

```bash
git add src/components/CinematicMarquee.tsx
git commit -m "feat: cinematic marquee for framework names"
```

### Task 10: Add Trust, Process, CTA, Footer sections to page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add Trust section**

After ComparisonColumns. Section with `max-w-[700px] mx-auto`, centered:
- `<Reveal>` H2: "22 клинических теста." + sub: "Те же, что используют психологи. Только бесплатно."
- `<CinematicMarquee />` — full bleed (negative margin to escape container)
- Stats row: flex, justify-center, gap-12. Three stats: 330/вопросов, 9/слоёв, $0/вместо $174. Numbers in Zodiak, ember color, `clamp(2rem, 5vw, 3.5rem)`. Labels in mono 10px text-15 uppercase.

- [ ] **Step 2: Add Process section**

Section with `max-w-[520px] mx-auto`:
- `<Reveal>` H2: "Это просто."
- 3 steps, each in `<Reveal delay={i*0.15}>`:
  - Step number: 40px circle with ember gradient, white bold number
  - Connector: 1px vertical line, height 40px, ember gradient fade
  - Title: Zodiak 18px
  - Desc: General Sans 14px text-30

- [ ] **Step 3: Add Final CTA section**

Section: `min-h-[80vh]`, flex center, relative, overflow-hidden.
- Ember glow: absolute div, 500px circle, radial-gradient ember → transparent, centered, `animate-pulse` or custom animation (scale 1→1.1, 4s)
- H2: "Хватит гадать." + line break + ember span "Узнай."
- Button: `px-12 py-5 text-lg`, gradient background, rounded-xl, hover scale(0.98) + box-shadow
- Meta: text-13 text-15 "Бесплатно · 5 минут · результат сразу"
- Social proof: text-11 text-08 mono "2,847 человек уже прошли"
- Link to `/scan`

- [ ] **Step 4: Add Footer**

Minimal: border-top text-04, flex space-between, logo + disclaimer + links. Low contrast.

- [ ] **Step 5: Verify full page**

Run: `npm run dev`
Scroll entire page top to bottom. Check:
- All 8 sections render correctly
- Animations trigger on scroll
- Nav hides/shows properly
- Responsive on mobile viewport
- No console errors

- [ ] **Step 6: Commit**

```bash
git add src/components/CinematicMarquee.tsx src/app/page.tsx
git commit -m "feat: trust, process, CTA, footer sections complete"
```

---

## Chunk 6: Polish + Build

### Task 11: Polish animations and responsive

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/AbsorptionScene.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Mobile responsive pass**

Check all sections at 375px width:
- Hero text sizes scale down properly (clamp)
- Pattern cards stack
- Comparison columns: single column on mobile
- Absorption scene: smaller silhouette, phrases repositioned for narrow viewport
- Stats row wraps if needed
- Nav padding tighter on mobile

- [ ] **Step 2: Animation timing polish**

- Ensure GSAP ScrollTrigger scrub is smooth (no jank on fast scroll)
- Adjust Framer Motion delays for natural feel
- Test Lenis + GSAP interop (Lenis should be the scroll provider)

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "fix: responsive layout and animation polish"
```

### Task 12: Build verification

**Files:** none (verification only)

- [ ] **Step 1: Run build**

Run: `npm run build`
Expected: clean build, no TypeScript errors, no warnings.

- [ ] **Step 2: Test production build**

Run: `npm run start`
Navigate through all sections. Verify animations work in production mode.

- [ ] **Step 3: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: build clean, production ready"
```
