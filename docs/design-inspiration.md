# Psyche Scan Redesign -- Design Inspiration Reference

> Compiled from analysis of 4 reference sites + 15 award-winning websites (2024-2025).
> Goal: Transform psyche-scan.vercel.app into a dark premium, cinematic personality profiling experience.

Current stack: **Next.js 16, Tailwind CSS 4, Framer Motion, TypeScript**

---

## THE 4 REFERENCE SITES -- DETAILED ANALYSIS

### 1. landonorris.com (F1 Driver Personal Site)

**Tech stack:** Webflow, Lenis (smooth scroll), Rive (interactive canvas animations), CSS keyframes

**Hero section:**
- Full-viewport (`min-height: 100vh`) with sticky/animated helmet gallery using CSS `clip-path` masks
- Scroll-triggered "Load Norris" interaction -- content reveals tied to scroll position
- Background: subtle radial gradients, no heavy imagery -- lets typography breathe

**Scroll effects:**
- CSS marquees with infinite horizontal scroll (`translateX` keyframes with `animation-play-state` toggle on hover)
- `clip-path: polygon()` animations on scroll for text line reveals
- Sticky horizontal scroll sections using `.horizontal-track` with pinned containers
- `clip-path: ellipse()` for circular image reveals

**Typography:**
- "Brier" (custom impact font) at 8.25rem for headlines
- "Mona" for body text
- Fluid typography via CSS custom properties (`--fluid-font`, `--design-unit`)
- Tight line-heights (83-90%) on display text for stacked impact
- `font-variation-settings` for dynamic width/weight control

**Color:**
- Lime accent (`--color--lime`) on dark green/black base
- Theme system: `[data-theme="dark"]`, `[data-theme="light"]`, `[data-theme="lime"]` -- sections change theme as you scroll

**Micro-interactions:**
- Helmet grid: scale(1.1) + clip-path ellipse reveal on hover
- Navigation logo SVG paths animate fill color
- Dropdown backgrounds shift to lime on open state
- Text shadow offsets on buttons for depth

**What to steal for Psyche Scan:**
- Clip-path text reveals on scroll (for session titles/questions)
- Theme-shifting sections (dark -> accent color as user progresses)
- Fluid typography system with CSS custom properties
- Lenis smooth scroll (easy drop-in, works with Framer Motion)

---

### 2. brand.dropbox.com/framework (Dropbox Brand Framework)

**Tech stack:** Webflow + Rive (State Machine + Viewport features), custom variable type explorer

**Hero section:**
- Interactive Rive animation as centerpiece -- not a static image
- Typography-led: massive variable font headline that users can manipulate

**Scroll effects:**
- Rhythmic pacing -- "peaks and pauses" philosophy (not every scroll triggers animation)
- Angled layouts and scroll transitions reflecting "planes and layered surfaces" concept
- Pinwheel menu interactions

**Typography:**
- Sharp Grotesk Variable -- custom variable font for headlines
- Variable Type Explorer: users can adjust weight/width in real-time
- Different optical weights for light vs dark backgrounds (heavier on dark)

**Interactive elements:**
- Color chips browser (pick and preview brand colors)
- Bezier curve editor (adjust motion curves)
- Motion timeline widget (scrub through animations)
- Typography weight/width sliders

**What to steal for Psyche Scan:**
- Rhythm philosophy: not every section needs animation -- let content breathe
- Interactive typography widgets (imagine letting users "tune" their personality type display)
- Rive State Machine for interactive illustrations (session icons that react to hover/progress)
- Variable font weight adjustments based on dark/light context

---

### 3. symphonyofvines.unseen.co (Wine Experience by Unseen Studio)

**Tech stack:** WebGL, Theatre.js (animation timeline), custom shaders, post-processing

**Hero section:**
- Full-screen cinematic WebGL scene
- Liquid-like deformations on mouse interaction
- 3D environment that responds to scroll position

**Scroll effects:**
- Theatre.js controls complex animation timelines synchronized with scroll
- 3D scene transitions tied to scroll position (camera moves through environment)
- Synchronized UI + 3D + shader transitions
- Post-processing effects (blur, color grading) shift with scroll

**Visual approach:**
- Cinematic storytelling -- "traverse millennia" narrative arc
- Dark, moody atmosphere with warm accent lighting
- Elemental forces visualized through particle systems and fluid simulations

**Technical innovation:**
- WebGL for large-scale 3D and visual effects
- Interactive mouse-based liquid deformations
- Smooth transitions powered by post-processing (bloom, vignette, color shifts)
- Custom shaders for material rendering

**What to steal for Psyche Scan:**
- Cinematic dark mood with warm accents (replace clinical feel with depth)
- Theatre.js for orchestrating multi-element scroll sequences (cheaper than full WebGL)
- Post-processing-inspired CSS effects: backdrop-blur, vignette gradients, color shifts between sections
- "Journey through time" narrative structure = perfect for "journey through your psyche"

---

### 4. scoutmotors.com (Electric Vehicle Brand)

**Based on industry analysis of EV brand sites:**

**Hero section:**
- Full-bleed video/image hero with vehicle reveal
- Scroll-triggered vehicle rotation or angle change
- Bold sans-serif typography overlaid on dark imagery

**Scroll effects:**
- Sticky sections with spec reveals (numbers animate up as you scroll)
- Horizontal scroll for feature comparison
- Parallax layers: vehicle stays centered while background/foreground elements shift
- Scroll-snap for clean section stops

**Color:**
- Dark charcoal/black primary
- Electric blue or green accent (EV brand language)
- High-contrast white text on dark backgrounds
- Minimal use of color -- accent is reserved for CTAs and key data

**Layout:**
- Full-bleed imagery breaking standard grid
- Asymmetric text/image layouts
- Specs presented as oversized numbers with minimal labels
- Edge-to-edge sections alternating with contained content

**What to steal for Psyche Scan:**
- Sticky "spec reveal" sections (for showing Big Five scores, schema results)
- Oversized animated numbers for statistics
- Scroll-snap between major content blocks
- Full-bleed dark sections with high-contrast typography

---

## 15 MORE AWARD-WINNING SITES

### Awwwards Winners 2024-2025

| # | Site | URL | What Makes It Special |
|---|------|-----|----------------------|
| 1 | **Igloo Inc** (SOTY 2025) | igloo.inc | Each project encased in procedurally-generated ice crystals. Three.js + Svelte + GSAP. Custom geometry exporters for performance. |
| 2 | **Don't Board Me** (SOTY Users' Choice 2024) | dontboardme.com | Subtle micro-animations, adorable illustrations, trust-building copywriting. Proves you don't need WebGL to win. |
| 3 | **Lusion** (D&AD Silver, One Show Winner) | lusion.co | Interactive cloth simulation pre-calculated in Houdini. Pre-rendered normal maps for translucent objects. Homepage slider with GSAP displacement effect. |
| 4 | **Monogrid** (CSSDA DOTY nominee 2024) | monogrid.com | Immersive 3D portfolio. Three.js + custom WebGL effects. |
| 5 | **Motto** (FWA SOTD 2025) | wearemotto.com | Bold agency portfolio with cutting-edge creative direction. |

### Dark Premium / Cinematic Sites

| # | Site | What Makes It Special |
|---|------|----------------------|
| 6 | **Apple TV+** | Dark mode interface mimicking cinematic experience. Scroll-driven content reveals. |
| 7 | **iMotion** | Dark mode with glowing accents. Cinematic browsing with floating elements. |
| 8 | **Porsche Digital** | Scroll-driven animations capturing high-performance spirit. Sticky spec reveals. |
| 9 | **Hotel 1 Place Vendome** | Infinite scroll + horizontal drag for room galleries. Luxury dark aesthetic. |
| 10 | **Robin Mastromarino** | WebGL portfolio with GSAP displacement slider effect. Clean, engaging animations. |

### Scroll Animation Pioneers

| # | Site | Technique |
|---|------|-----------|
| 11 | **ATMOS by Leeroy** | Three.js + Blender + GSAP + virtual-scroll. Interactive 3D aviation facts. |
| 12 | **Pitchfork Cover Stories** | "Scrollytelling 2.0" -- each scroll unfolds like a digital landscape. |
| 13 | **Apple Product Pages** | Gold standard for scroll-scrubbed product reveals. GSAP ScrollTrigger. |
| 14 | **Silencio** | Sound effects triggered on every scroll. Digital product catalog as interactive experience. |
| 15 | **Toy Fight** | Eye-catching visuals, animated effects, warm colors, clean layout. Typography-forward. |

---

## CATEGORIZED TECHNIQUES FOR PSYCHE SCAN REDESIGN

---

### 1. SCROLL EFFECTS WE COULD STEAL

#### A. Scroll-Scrubbed Reveals (HIGH PRIORITY)
**What:** Animations tied directly to scroll position, not time.
**Implementation:**
```tsx
// Framer Motion (already in our stack)
import { useScroll, useTransform, motion } from "framer-motion";

const { scrollYProgress } = useScroll({ target: sectionRef });
const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
const clipPath = useTransform(scrollYProgress, [0, 1],
  ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]
);
```
**Where to use:** Session title reveals, result score animations, hero text entrance.

#### B. Sticky Sections with Internal Scroll (MEDIUM)
**What:** Section stays pinned while content inside changes based on scroll.
**Implementation:**
```tsx
// CSS approach (no library needed)
.sticky-container { height: 300vh; } // scroll height
.sticky-content { position: sticky; top: 0; height: 100vh; }

// Then use Framer Motion useScroll to track progress within container
```
**Where to use:** "What you get" section -- pin the section title, scroll through 9 deliverables. Session overview -- pin session icon, scroll through question previews.

#### C. Clip-Path Text Reveals (HIGH PRIORITY)
**What:** Text lines appear by animating clip-path from hidden to visible.
**Implementation:**
```tsx
// Framer Motion with clip-path
<motion.h2
  initial={{ clipPath: "inset(0 0 100% 0)" }}
  whileInView={{ clipPath: "inset(0 0 0% 0)" }}
  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
>
```
**Where to use:** Every section heading. Question text in the flow.

#### D. Horizontal Scroll Sections (LOW -- save for v2)
**What:** Vertical scroll triggers horizontal movement.
**Implementation:** GSAP ScrollTrigger with `pin: true` and `x` transform. Or Framer Motion `useScroll` + `useTransform` mapping scrollY to translateX.
**Where to use:** Science frameworks showcase, session overview.

#### E. Lenis Smooth Scroll (HIGH PRIORITY -- easy win)
**What:** Butter-smooth scrolling that makes everything feel premium.
**Implementation:**
```bash
npm install lenis
```
```tsx
// In layout.tsx or a provider
import Lenis from 'lenis';
useEffect(() => {
  const lenis = new Lenis({ smoothWheel: true, lerp: 0.1 });
  function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  return () => lenis.destroy();
}, []);
```
**Where to use:** Global -- entire site.

---

### 2. TYPOGRAPHY TRICKS WE COULD USE

#### A. Massive Display Type with Tight Leading
**Current:** `text-6xl sm:text-7xl md:text-8xl` -- good start.
**Upgrade:**
- Go bigger: `text-[10vw]` or `clamp(3rem, 8vw, 8rem)` for fluid sizing
- Tighter line-height: `leading-[0.85]` instead of `leading-[0.9]`
- Mix weights: bold keyword + light rest of sentence
```css
.hero-title {
  font-size: clamp(3rem, 10vw, 10rem);
  line-height: 0.85;
  letter-spacing: -0.03em;
}
```

#### B. Split Text Animation (letter-by-letter or word-by-word)
**Implementation:**
```tsx
// Split words and stagger with Framer Motion
const words = text.split(" ");
<motion.div variants={stagger}>
  {words.map((word, i) => (
    <motion.span
      key={i}
      variants={{ initial: { y: 40, opacity: 0 }, animate: { y: 0, opacity: 1 } }}
      className="inline-block mr-[0.25em]"
    >
      {word}
    </motion.span>
  ))}
</motion.div>
```
**Where to use:** Hero headline, section titles, final CTA.

#### C. Gradient Text with Animation
**Current:** Static `text-gradient` class.
**Upgrade:**
```css
.text-gradient-animated {
  background: linear-gradient(
    90deg, #a78bfa, #c084fc, #e879f9, #a78bfa
  );
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 8s ease infinite;
}
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

#### D. Monospace Accent for Data/Numbers
**Current:** Already using JetBrains Mono for data -- good.
**Upgrade:** Animate numbers counting up when they scroll into view:
```tsx
const count = useMotionValue(0);
const rounded = useTransform(count, Math.round);
useEffect(() => {
  if (inView) animate(count, targetValue, { duration: 2 });
}, [inView]);
```

#### E. Variable Font Weight on Scroll
**What:** Font weight increases as user scrolls into section.
**Implementation:**
```tsx
const fontWeight = useTransform(scrollYProgress, [0, 1], [300, 900]);
<motion.h2 style={{ fontWeight }}>Your Score</motion.h2>
```
**Where to use:** Result scores, session completion states.

---

### 3. HERO SECTION IDEAS

#### Option A: "The Scan Begins" (Cinematic)
- Black screen, single cursor-like blinking element
- On load: text types out character by character (not a typing animation -- clip-path reveal)
- Background: very subtle particle field or noise texture
- Main CTA pulses with a glow effect
- Scroll indicator is a custom SVG that morphs on scroll

#### Option B: "The Mirror" (Minimal + Bold)
- Giant text filling 80% of viewport: one word per line
- "WHY / ARE YOU / STUCK / AGAIN?"
- Each line reveals with staggered clip-path animation
- Background: deep black with single accent glow (like current, but bigger blur radius)
- Below fold: text cross-fades from question to answer on scroll

#### Option C: "Neural Map" (Interactive)
- SVG or canvas-based node graph that subtly pulses
- Nodes represent personality dimensions
- Mouse proximity causes nearest nodes to glow/connect
- On scroll: network expands and reveals section content
- Uses Framer Motion's `useMotionValue` for mouse tracking

**Recommended:** Option B for impact + feasibility with current stack. Option C for v2 with GSAP/Three.js.

---

### 4. SECTION TRANSITIONS BETWEEN CONTENT BLOCKS

#### A. Gradient Dissolve (Replace current `gradient-line`)
```css
.section-transition {
  height: 200px;
  background: linear-gradient(
    to bottom,
    var(--bg-current-section),
    transparent 30%,
    transparent 70%,
    var(--bg-next-section)
  );
}
```

#### B. Clip-Path Wipe
```tsx
<motion.section
  initial={{ clipPath: "inset(100% 0 0 0)" }}
  whileInView={{ clipPath: "inset(0 0 0 0)" }}
  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
>
```

#### C. Color Shift on Scroll (from Lando Norris)
Each section has its own color temperature. As you scroll between them, the background subtly shifts:
```tsx
const bg = useTransform(scrollYProgress,
  [0, 0.25, 0.5, 0.75, 1],
  ["#0a0a0f", "#0f0a15", "#0a0f15", "#150a0f", "#0a0a0f"]
);
```

#### D. Parallax Overlap
Next section's content starts appearing before previous section fully scrolls away. Create depth by having sections overlap by 10-20vh:
```css
.section { margin-top: -15vh; position: relative; z-index: var(--section-z); }
```

#### E. Scale-Down Exit
Current section scales down slightly (0.95) and gains blur as next section scrolls over it:
```tsx
const scale = useTransform(scrollYProgress, [0.8, 1], [1, 0.95]);
const blur = useTransform(scrollYProgress, [0.8, 1], [0, 10]);
```

---

### 5. MICRO-INTERACTIONS FOR THE QUESTION FLOW

#### A. Question Card Entrance
```tsx
// Current: simple fadeUp
// Upgrade: spring physics + rotation
<motion.div
  initial={{ opacity: 0, y: 60, rotateX: -15 }}
  animate={{ opacity: 1, y: 0, rotateX: 0 }}
  transition={{ type: "spring", stiffness: 100, damping: 20 }}
  style={{ perspective: "1000px" }}
/>
```

#### B. Scale Option Hover (Likert Scales)
```tsx
// Options grow and glow on hover
<motion.button
  whileHover={{
    scale: 1.08,
    boxShadow: "0 0 20px rgba(167, 139, 250, 0.3)",
    borderColor: "rgba(167, 139, 250, 0.5)"
  }}
  whileTap={{ scale: 0.95 }}
/>
```

#### C. Answer Selection Feedback
- Selected option: scale bounce (1.0 -> 1.05 -> 1.0) + accent border + subtle glow
- Unselected options: dim to 50% opacity, slight scale-down (0.97)
- Transition between: 200ms ease-out

#### D. Progress Bar with Momentum
```tsx
// Instead of instant width change, use spring physics
<motion.div
  className="h-1 bg-accent rounded-full"
  animate={{ width: `${progress}%` }}
  transition={{ type: "spring", stiffness: 50, damping: 20 }}
/>
```

#### E. Question Counter with Flip Animation
```tsx
// Numbers flip like an airport departure board
<AnimatePresence mode="wait">
  <motion.span
    key={questionNumber}
    initial={{ y: 20, opacity: 0, rotateX: -90 }}
    animate={{ y: 0, opacity: 1, rotateX: 0 }}
    exit={{ y: -20, opacity: 0, rotateX: 90 }}
    transition={{ duration: 0.3 }}
  />
</AnimatePresence>
```

#### F. Session Completion Celebration
When a session is completed:
- Background flash: brief accent glow pulse
- Checkmark draws itself (SVG path animation)
- Confetti-like particles (simple CSS `@keyframes` with random transforms)
- Score counter animates from 0 to final value

---

### 6. COLOR/MOOD REFERENCES FOR DARK PREMIUM

#### Current Palette
- BG: `#09090b` (zinc-950)
- Accent: `#a78bfa` (violet-400)
- Text: white at various opacities

#### Upgraded Palette Concept: "Deep Psyche"

```css
:root {
  /* Backgrounds -- layered depth */
  --bg-void: #050507;        /* deepest black with blue undertone */
  --bg-surface: #0c0c12;     /* card backgrounds */
  --bg-surface-2: #12121c;   /* elevated cards */
  --bg-surface-3: #1a1a28;   /* hover states */

  /* Accent -- violet/purple spectrum */
  --accent: #a78bfa;          /* primary accent (keep) */
  --accent-bright: #c4b5fd;   /* hover/active */
  --accent-dim: #7c3aed;      /* deep accent for gradients */
  --accent-glow: rgba(167, 139, 250, 0.15); /* glow effects */

  /* Secondary accents (for different sessions/dimensions) */
  --accent-warm: #f59e0b;     /* amber for warmth/energy */
  --accent-cool: #06b6d4;     /* cyan for analytical/calm */
  --accent-rose: #f43f5e;     /* rose for emotional/intensity */
  --accent-emerald: #10b981;  /* emerald for growth/health */

  /* Text */
  --text-primary: rgba(255, 255, 255, 0.92);
  --text-secondary: rgba(255, 255, 255, 0.60);
  --text-tertiary: rgba(255, 255, 255, 0.35);

  /* Borders */
  --border: rgba(255, 255, 255, 0.06);
  --border-hover: rgba(255, 255, 255, 0.12);
  --border-accent: rgba(167, 139, 250, 0.25);
}
```

#### Mood References
- **Igloo Inc:** Ice-blue on black. Cold, precise, scientific.
- **Lusion:** Cloth-like softness on dark canvas. Organic, human.
- **Apple TV+:** Pure black with content as the only color.
- **Porsche:** Dark charcoal with electric highlight moments.
- **Symphony of Vines:** Warm amber/gold on deep black. Wine-like richness.

#### Session-Specific Color Moods
Map each of the 9 sessions to a color temperature:
1. Foundation (violet -- current accent)
2. Depths (deep blue -- going deeper)
3. Narrative (warm amber -- personal stories)
4. Dynamics (rose -- relationships)
5. Operating System (cyan -- analytical)
6. Ego Architecture (deep purple -- shadow)
7. Depth Scan (emerald -- existential growth)
8. Body & Meta (warm rose -- embodiment)
9. Core Architecture (gold -- integration)

---

## IMPLEMENTATION PRIORITY

### Phase 1: Quick Wins (1-2 days, current stack only)
1. Add Lenis smooth scroll (global)
2. Upgrade hero text animation (clip-path reveals, staggered words)
3. Replace `gradient-line` dividers with gradient dissolve transitions
4. Add background color shifts between sections
5. Animate gradient text (slow-moving gradient on hero)
6. Spring physics on question card entrance
7. Better scale option hover states (glow + scale)

### Phase 2: Scroll Experience (2-3 days)
1. Scroll-scrubbed section reveals using `useScroll` + `useTransform`
2. Sticky "What you get" section with internal content scroll
3. Animated number counters on science section stats
4. Scale-down + blur exit transitions between sections
5. Progress bar with spring physics
6. Question counter flip animation

### Phase 3: Premium Polish (3-5 days)
1. Session-specific color themes that shift as you progress
2. SVG path-drawing animations for session completion
3. Interactive node graph hero (Option C) using canvas
4. Parallax depth layers on hero section
5. Horizontal scroll for framework showcase
6. Sound design (optional -- subtle click/transition sounds)

### Libraries to Consider Adding
- `lenis` -- smooth scroll (2KB gzipped, no dependencies)
- `gsap` + `ScrollTrigger` -- only if Framer Motion hits limits (scroll-scrubbing precision, horizontal scroll, complex timelines)
- `theatre` -- only for v2 cinematic sequences
- `splitting` -- text split utility (or just build with Framer Motion)

---

## KEY PRINCIPLES FROM AWARD WINNERS

1. **Rhythm over constant animation.** Dropbox: "peaks and pauses." Not every scroll triggers something.
2. **Typography IS the design.** Lando Norris: 8rem+ text IS the visual. You don't need illustrations when type is this bold.
3. **Dark + one accent = premium.** Every winning dark site uses ONE dominant accent color, not rainbow.
4. **Scroll should feel earned.** Symphony of Vines: each scroll reveals something meaningful. Never animate just to animate.
5. **Performance is a feature.** Igloo Inc won Developer SOTY by optimizing custom geometry exporters. Fast loading = premium feel.
6. **Micro-interactions build trust.** Don't Board Me won Users' Choice with subtle animations, not WebGL spectacles.
7. **Let content breathe.** Large padding (py-28+), generous spacing, don't cram.

---

## SOURCES

- [Awwwards Site of the Year 2024](https://www.awwwards.com/annual-awards-2024/site-of-the-year)
- [Awwwards Site of the Year 2025](https://www.awwwards.com/annual-awards-2025/site-of-the-year)
- [Awwwards Annual Awards 2024](https://www.awwwards.com/annual-awards-2024/)
- [CSS Design Awards WOTY 2025](https://www.cssdesignawards.com/woty2025/)
- [Igloo Inc Case Study](https://www.awwwards.com/igloo-inc-case-study.html)
- [Lusion D&AD Winner](https://www.dandad.org/awards/professional/2024/238109/lusionco/)
- [Lusion Case Study (Awwwards SOTM)](https://www.awwwards.com/case-study-for-lusion-by-lusion-winner-of-site-of-the-month-may.html)
- [Dropbox Brand Guidelines Case Study](https://www.awwwards.com/case-study-dropbox-brand-guidelines.html)
- [Dropbox x Rive Integration](https://rive.app/blog/dropbox-launches-interactive-brand-guidelines-site-using-rive)
- [Dropbox x Sharp Type](https://www.sharptype.co/case-studies/dropbox)
- [Symphony of Vines (Awwwards)](https://www.awwwards.com/sites/the-symphony-of-vines)
- [Symphony of Vines Dev Insights](https://unread.unseen.co/the-symphony-of-vines-dev-insights-c284cc4e8aa0)
- [Best Parallax Examples 2025](https://www.memberstack.com/blog/14-of-the-best-parallax-scroll-examples-for-2025)
- [Scroll Animations 2025](https://www.creativecorner.studio/blog/website-scroll-animations)
- [GSAP ScrollTrigger](https://gsap.com/scroll/)
- [FWA Awards](https://thefwa.com/)
- [Best Dark Theme Websites](https://www.designrush.com/best-designs/websites/trends/best-dark-themed-website-designs)
- [Awwwards GSAP Websites](https://www.awwwards.com/websites/gsap/)
- [Awwwards Three.js Websites](https://www.awwwards.com/websites/three-js/)
