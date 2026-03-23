# Free Lead Magnet Test — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 25-question free test that determines a person's core behavioral pattern and generates a wow-effect AI result page that drives upsell to the full scan.

**Architecture:** New `/free` route group with its own question data, scoring engine, and result page. Shares the existing design system (dark theme, lime accent, Instrument Serif + DM Sans). Result page uses full-screen sequential screens (not scroll) for neurobiological impact. AI generates personalized report via new API route.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind 4, Framer Motion, Claude Sonnet API

---

## File Structure

```
src/
├── data/
│   └── free-questions.ts          # CREATE: 25 questions + scale mappings + pattern definitions
├── lib/
│   └── free-scoring.ts            # CREATE: 5-scale scoring → pattern determination
├── app/
│   └── free/
│       ├── page.tsx               # CREATE: free test intro/landing
│       ├── test/
│       │   └── page.tsx           # CREATE: question flow (25 Qs)
│       └── result/
│           └── page.tsx           # CREATE: sequential result screens
├── app/api/
│   └── generate-free-profile/
│       └── route.ts               # CREATE: Claude API for free result
├── components/
│   ├── FreeQuestionCard.tsx        # CREATE: forced-choice question renderer
│   ├── AnalysisAnimation.tsx       # CREATE: fake analysis loading screen
│   ├── ResultScreen.tsx            # CREATE: full-screen result screen wrapper
│   └── ShareCard.tsx              # CREATE: shareable story card generator
```

---

## Chunk 1: Data Layer (Questions + Scoring)

### Task 1: Free Questions Data

**Files:**
- Create: `src/data/free-questions.ts`

- [ ] **Step 1: Define types for free test**

```typescript
// src/data/free-questions.ts

export type FreeScaleKey =
  | "attachment:secure" | "attachment:anxious" | "attachment:avoidant"
  | "stress:fight" | "stress:flight" | "stress:freeze"
  | "motivation:safety" | "motivation:recognition" | "motivation:freedom" | "motivation:control" | "motivation:connection"
  | "defense:rationalization" | "defense:avoidance" | "defense:control" | "defense:people_pleasing" | "defense:compensation"
  | "childhood:perfectionist" | "childhood:rebel" | "childhood:invisible" | "childhood:rescuer" | "childhood:clown"

export interface FreeAnswerOption {
  id: "a" | "b" | "c" | "d"
  text: string
  scores: Partial<Record<FreeScaleKey, number>>
}

export interface FreeQuestion {
  id: string       // "fq1" ... "fq25"
  text: string     // situational scenario in Russian
  options: FreeAnswerOption[]
}

export interface PatternDefinition {
  id: string
  name: string                    // "Белка в колесе"
  childhood: string               // "perfectionist"
  defense: string                 // "compensation"
  description: string             // short tooltip
}
```

- [ ] **Step 2: Define 12 pattern definitions**

```typescript
export const patterns: PatternDefinition[] = [
  { id: "p1",  name: "Я сам",                childhood: "perfectionist", defense: "control",         description: "Всё контролирует, никого не подпускает" },
  { id: "p2",  name: "Вечный отличник",       childhood: "perfectionist", defense: "rationalization", description: "Делает идеально, но никогда не доволен" },
  { id: "p3",  name: "Белка в колесе",        childhood: "perfectionist", defense: "compensation",    description: "Пашет на 200%, потом лежит трупом" },
  { id: "p4",  name: "Для всех хороший",      childhood: "rescuer",       defense: "people_pleasing", description: "Помогает всем, забивает на себя" },
  { id: "p5",  name: "Герой на износ",        childhood: "rescuer",       defense: "compensation",    description: "Тащит всё на себе, пока не сломается" },
  { id: "p6",  name: "Против системы",        childhood: "rebel",         defense: "compensation",    description: "Бунтует, даже когда не надо" },
  { id: "p7",  name: "Свободный волк",        childhood: "rebel",         defense: "avoidance",       description: "Сваливает как только становится серьёзно" },
  { id: "p8",  name: "Тихий наблюдатель",     childhood: "invisible",     defense: "avoidance",       description: "Видит всё, но молчит" },
  { id: "p9",  name: "Серый кардинал",        childhood: "invisible",     defense: "rationalization", description: "Влияет на всё, но из тени" },
  { id: "p10", name: "Душа компании",         childhood: "clown",         defense: "compensation",    description: "Все смеются, а внутри пусто" },
  { id: "p11", name: "Зеркало",              childhood: "clown",         defense: "people_pleasing", description: "Подстраивается под каждого, теряет себя" },
  { id: "p12", name: "Вечный студент",        childhood: "invisible",     defense: "people_pleasing", description: "Учится, готовится, но не начинает" },
]
```

- [ ] **Step 3: Write all 25 questions**

Write 25 situational forced-choice questions in casual Russian. Each question has 4 options, each option maps to 2-3 scales. Questions must:
- Cover all 5 scales with ~5 data points per scale value
- Be non-obvious (person shouldn't guess what's measured)
- Describe real daily situations (not abstract traits)
- Include 2-3 validation questions (same scale, different angle)

Questions 1-5: focus on attachment + childhood
Questions 6-10: focus on stress + defense
Questions 11-15: focus on motivation + childhood
Questions 16-20: focus on defense + attachment
Questions 21-25: cross-validation + motivation + stress

Each question follows the format from the spec (party scenario, finished project scenario, etc.)

- [ ] **Step 4: Commit**

```bash
git add src/data/free-questions.ts
git commit -m "feat: add 25 free test questions with 5-scale scoring mappings"
```

---

### Task 2: Free Scoring Engine

**Files:**
- Create: `src/lib/free-scoring.ts`

- [ ] **Step 1: Define score types and scoring function**

```typescript
// src/lib/free-scoring.ts
import { FreeScaleKey, FreeQuestion, patterns, type PatternDefinition } from "@/data/free-questions"

export interface FreeScaleScores {
  attachment: { secure: number; anxious: number; avoidant: number }
  stress: { fight: number; flight: number; freeze: number }
  motivation: { safety: number; recognition: number; freedom: number; control: number; connection: number }
  defense: { rationalization: number; avoidance: number; control: number; people_pleasing: number; compensation: number }
  childhood: { perfectionist: number; rebel: number; invisible: number; rescuer: number; clown: number }
}

export interface FreeProfileResult {
  pattern: PatternDefinition
  modifier: string
  scores: FreeScaleScores
  topAttachment: string
  topStress: string
  topMotivation: string
  topDefense: string
  topChildhood: string
  contradictions: string[]     // detected contradictions for AI
  percentile: number           // fake rarity percentage
}

export function scoreFreeProfile(answers: Record<string, string>): FreeProfileResult {
  // 1. Sum all scale scores from answer options
  // 2. Find top value in each scale group
  // 3. Match childhood x defense to pattern table
  // 4. If no exact match, find closest pattern
  // 5. Detect contradictions (e.g., high avoidant + high connection)
  // 6. Generate modifier from attachment + stress + motivation
  // 7. Calculate fake rarity percentile from pattern + modifier combo
}
```

- [ ] **Step 2: Implement scoring logic**

Full implementation of `scoreFreeProfile`:
- Sum scores per scale key from all 25 answers
- `getTop(group)` helper returns highest-scoring value in a scale group
- Pattern matching: find pattern where `childhood === topChildhood && defense === topDefense`
- Fallback: if no exact match, score each pattern by distance (sum of matches)
- Contradiction detection: check pairs like (avoidant high + connection high), (freeze + compensation), (people_pleasing + rebel)
- Modifier generation based on secondary scales
- Rarity: pre-defined per pattern (2-8% range)

- [ ] **Step 3: Implement modifier generation**

```typescript
function generateModifier(scores: FreeScaleScores, pattern: PatternDefinition): string {
  const modifiers: Record<string, string> = {
    "anxious+safety": "с вечной тревогой внутри",
    "anxious+connection": "который боится остаться один",
    "avoidant+freedom": "которому тесно в любых рамках",
    "avoidant+control": "который доверяет только себе",
    "secure+recognition": "которому вечно мало",
    "fight+control": "в режиме вечной битвы",
    "flight+safety": "в режиме выживания",
    "freeze+safety": "который замирает когда страшно",
    // ... more combos
  }
  // Pick modifier based on top attachment + top motivation/stress
}
```

- [ ] **Step 4: Implement contradiction detection**

```typescript
function detectContradictions(scores: FreeScaleScores): string[] {
  const contradictions: string[] = []
  // avoidant attachment + high connection motivation
  if (scores.attachment.avoidant > 3 && scores.motivation.connection > 3) {
    contradictions.push("avoidant_but_craves_connection")
  }
  // people-pleasing defense + rebel childhood
  if (scores.defense.people_pleasing > 3 && scores.childhood.rebel > 3) {
    contradictions.push("pleaser_but_rebel")
  }
  // freeze stress + compensation defense
  if (scores.stress.freeze > 3 && scores.defense.compensation > 3) {
    contradictions.push("freeze_but_overcompensates")
  }
  // control defense + anxious attachment
  if (scores.defense.control > 3 && scores.attachment.anxious > 3) {
    contradictions.push("controls_from_anxiety")
  }
  return contradictions
}
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/free-scoring.ts
git commit -m "feat: add free test scoring engine with pattern matching and contradiction detection"
```

---

## Chunk 2: Question Flow UI

### Task 3: FreeQuestionCard Component

**Files:**
- Create: `src/components/FreeQuestionCard.tsx`

- [ ] **Step 1: Build forced-choice question card**

Component that renders a situational question with 4 answer options.

Props:
```typescript
interface FreeQuestionCardProps {
  question: FreeQuestion
  questionIndex: number
  totalQuestions: number
  onAnswer: (questionId: string, optionId: string) => void
}
```

Design:
- Question text in DM Sans, large (text-xl), casual feel
- 4 options as tall cards/buttons in 2x2 grid on desktop, stacked on mobile
- Selected option: lime accent border + subtle glow
- Auto-advance after 600ms delay post-selection (Framer Motion exit)
- Progress bar at top: `questionIndex / totalQuestions` with spring animation
- No timer (forced-choice is quick enough)
- Entrance animation: question text clip-path reveal, options stagger in

- [ ] **Step 2: Add animations**

- Question text: fade + slide up (0.4s)
- Options: stagger from bottom (0.1s delay each)
- Selection: selected option scales slightly, others fade to 30% opacity
- Exit: all slide left, next question slides from right
- Progress bar: spring animation on width change

- [ ] **Step 3: Commit**

```bash
git add src/components/FreeQuestionCard.tsx
git commit -m "feat: add forced-choice question card component with animations"
```

---

### Task 4: Free Test Flow Page

**Files:**
- Create: `src/app/free/test/page.tsx`

- [ ] **Step 1: Build test flow page**

State management:
```typescript
const [currentIndex, setCurrentIndex] = useState(0)
const [answers, setAnswers] = useState<Record<string, string>>({})
const [phase, setPhase] = useState<"intro" | "questions" | "analyzing" | "done">("intro")
```

Intro screen: brief text about what they're about to do (3 lines max), CTA "Начать". No long explanations.

Question flow:
- Renders `FreeQuestionCard` for current question
- On answer: save to state + localStorage (`psyche_free_answers`)
- Auto-advance to next question
- After question 25: transition to "analyzing" phase

- [ ] **Step 2: Wire up localStorage persistence**

Save answers progressively: `localStorage.setItem("psyche_free_answers", JSON.stringify(answers))`
Save current index: `localStorage.setItem("psyche_free_index", String(currentIndex))`
On mount: restore from localStorage if exists (resume interrupted test)

- [ ] **Step 3: Add analyzing → redirect flow**

After last question:
1. Set phase to "analyzing"
2. Run `scoreFreeProfile(answers)`
3. Save result to `localStorage.setItem("psyche_free_profile", JSON.stringify(result))`
4. Redirect to `/free/result`

- [ ] **Step 4: Commit**

```bash
git add src/app/free/test/page.tsx
git commit -m "feat: add free test question flow with localStorage persistence"
```

---

## Chunk 3: Result Experience

### Task 5: Analysis Animation Component

**Files:**
- Create: `src/components/AnalysisAnimation.tsx`

- [ ] **Step 1: Build fake analysis screen**

Full-screen dark component. Centered content. 4 sequential steps with typing effect:

```
Анализируем 25 ответов...          [appears at 0s]
Сопоставляем с 22 клиническими моделями...  [appears at 1.2s]
Ищем противоречия...                [appears at 2.4s]
Строим твой профиль...              [appears at 3.6s]
```

Each line fades in with slight upward movement.
Circular progress indicator (SVG) pulsing in accent color.
Total duration: ~5 seconds, then calls `onComplete` callback.

Optional: subtle particle/dot animation in background (CSS only, no heavy lib).

- [ ] **Step 2: Commit**

```bash
git add src/components/AnalysisAnimation.tsx
git commit -m "feat: add analysis animation loading screen"
```

---

### Task 6: ResultScreen Wrapper Component

**Files:**
- Create: `src/components/ResultScreen.tsx`

- [ ] **Step 1: Build full-screen sequential screen wrapper**

```typescript
interface ResultScreenProps {
  children: React.ReactNode
  onNext?: () => void
  nextLabel?: string        // default: "Дальше"
  className?: string
  animate?: boolean         // default: true
}
```

Full viewport height (`min-h-dvh`), flex centered, dark background.
Content appears with Framer Motion (fade + slide up).
Bottom: "Дальше" button (btn-accent) or custom CTA.
Swipe-up gesture support via Framer Motion `drag="y"`.

- [ ] **Step 2: Commit**

```bash
git add src/components/ResultScreen.tsx
git commit -m "feat: add full-screen result screen wrapper component"
```

---

### Task 7: Share Card Component

**Files:**
- Create: `src/components/ShareCard.tsx`

- [ ] **Step 1: Build shareable card**

Renders a 1080x1920 (story format) card using HTML/CSS that can be captured as image.

Content:
- "PSYCHE SCAN" logo top
- Pattern name (large, Instrument Serif)
- Modifier (italic, smaller)
- Key quote from result (2-3 lines, in quotes)
- Rarity stat ("3.2% людей")
- URL: psyche-scan.vercel.app
- Dark bg, lime accents, same design language

Two actions:
- "Скачать" — uses `html2canvas` (add dependency) to render as PNG, trigger download
- "Поделиться" — uses Web Share API if available, fallback to copy link

- [ ] **Step 2: Add html2canvas dependency**

```bash
npm install html2canvas-pro
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ShareCard.tsx package.json package-lock.json
git commit -m "feat: add shareable story card component with download"
```

---

### Task 8: API Route for Free Profile Generation

**Files:**
- Create: `src/app/api/generate-free-profile/route.ts`

- [ ] **Step 1: Build Claude API endpoint**

POST endpoint. Receives `FreeProfileResult` + answers. Returns generated text sections.

```typescript
interface FreeProfileRequest {
  profile: FreeProfileResult
  answers: Record<string, string>  // raw answers for extra context
}

interface FreeProfileResponse {
  recognition: string      // Screen 2: "what you do" (3 paragraphs)
  predictions: string      // Screen 3: "we bet..." (2-3 specific predictions)
  origin: string           // Screen 4: "where this comes from" (1 paragraph)
  superpower: string       // Screen 5a: strength
  shadow: string           // Screen 5b: blind spot
  actions: string[]        // Screen 6: 2-3 micro-actions
  aiProfile: string        // Screen 7: copy-paste AI profile block
  lockedPreviews: string[] // Screen 8: 3 blurred insight titles
}
```

- [ ] **Step 2: Write the Claude prompt**

System prompt:
```
Ты — психологический AI-аналитик. Генерируешь персонализированный отчёт по результатам экспресс-теста Psyche Scan.

ПРАВИЛА:
- Пиши на "ты", разговорный русский, без академизмов
- Каждое утверждение должно быть таким что 50%+ людей скажут "нет, это не про меня" (anti-Barnum)
- Ищи ПРОТИВОРЕЧИЯ между шкалами — это создаёт вау-эффект
- Описывай ПОВЕДЕНИЕ в конкретных ситуациях, не абстрактные черты
- Никаких "возможно", "вам свойственно", "бывает". Пиши утвердительно: "ты делаешь", "у тебя так"
- Рекомендации: конкретные микродействия на эту неделю, не "работай над собой"
- Тон: как умный друг который тебя хорошо знает
```

User prompt includes:
- Pattern name + modifier
- Full score vector (all 5 scales with values)
- Detected contradictions
- Raw answers for 3-4 most diagnostic questions

Structured output via JSON response format.

- [ ] **Step 3: Implement response parsing and error handling**

Parse Claude's JSON response into `FreeProfileResponse`.
Handle errors: return generic but still-decent fallback text.
Model: `claude-sonnet-4-20250514` (same as main profile).
Max tokens: 3000.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/generate-free-profile/route.ts
git commit -m "feat: add Claude API endpoint for free profile generation"
```

---

### Task 9: Result Page — All 9 Screens

**Files:**
- Create: `src/app/free/result/page.tsx`

- [ ] **Step 1: Build result page state machine**

```typescript
type Screen = "analysis" | "pattern" | "recognition" | "prediction" | "origin" | "duality" | "actions" | "ai_export" | "locked" | "share"

const [screen, setScreen] = useState<Screen>("analysis")
const [profileData, setProfileData] = useState<FreeProfileResponse | null>(null)
const [freeProfile, setFreeProfile] = useState<FreeProfileResult | null>(null)
```

On mount:
1. Load `psyche_free_profile` from localStorage → `freeProfile`
2. Set screen to "analysis" (shows AnalysisAnimation)
3. Call `/api/generate-free-profile` with profile data
4. When both animation done AND API response received → advance to "pattern"

- [ ] **Step 2: Screen 0 — Analysis animation**

Render `<AnalysisAnimation onComplete={() => setAnalysisDone(true)} />`
Wait for API response concurrently.
Minimum display: 4 seconds even if API is faster.

- [ ] **Step 3: Screen 1 — Pattern reveal (hero)**

```tsx
<ResultScreen onNext={() => setScreen("recognition")}>
  <motion.h1
    className="font-serif text-6xl md:text-8xl text-center"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: [0.65, 0.05, 0, 1] }}
  >
    {freeProfile.pattern.name}
  </motion.h1>
  <motion.p className="font-serif italic text-xl text-white/60 mt-4"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
  >
    ...{freeProfile.modifier}
  </motion.p>
  <motion.p className="font-mono text-sm text-accent mt-8"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
  >
    {freeProfile.percentile}% людей получают этот результат
  </motion.p>
</ResultScreen>
```

- [ ] **Step 4: Screen 2 — Recognition ("what you do")**

3 paragraphs from `profileData.recognition`. Staggered reveal (each paragraph appears with 0.8s delay). Text in DM Sans, text-lg, leading-relaxed. Max-w-2xl centered.

- [ ] **Step 5: Screen 3 — Prediction (killer moment)**

Special visual treatment: accent border or subtle glow background.
Header: "Мы готовы поспорить:" in mono font.
`profileData.predictions` rendered with typing effect (character by character, 30ms per char).
This creates the "AI is thinking about me right now" feeling.

- [ ] **Step 6: Screen 4 — Origin**

`profileData.origin` — single paragraph. Calm, no dramatic animation.
Simple fade-in. Header: "Откуда это в тебе".

- [ ] **Step 7: Screen 5 — Superpower / Shadow**

Two cards. Superpower appears first (0.4s), shadow appears after 1.5s delay.
Superpower: accent border, ⚡ icon.
Shadow: white/10 border, subtle red-ish tint, 🌑 icon.

- [ ] **Step 8: Screen 6 — Actions**

Header: "Попробуй на этой неделе"
`profileData.actions` as numbered cards, staggered.
Each action: bold first sentence + explanation.

- [ ] **Step 9: Screen 7 — AI export**

Header: "Хочешь чтобы нейросеть сразу понимала тебя?"
Subheader: "Скопируй и вставь в ChatGPT, Claude или любой AI"
`profileData.aiProfile` in a code-like block (font-mono, bg-white/5, rounded).
Button: "Скопировать мой профиль" — copies to clipboard, shows ✓ feedback.

- [ ] **Step 10: Screen 8 — Locked content (upsell)**

Header: "Мы знаем о тебе ещё кое-что"
3-4 locked items with blur effect:
```tsx
<div className="relative">
  <div className="blur-md opacity-50">
    <div className="h-2 bg-accent rounded" style={{ width: "73%" }} />
  </div>
  <div className="absolute inset-0 flex items-center">
    <span className="text-white/40">🔒</span>
    <span>Твой стиль привязанности: </span>
    <span className="bg-white/10 rounded px-2">████████</span>
  </div>
</div>
```
CTA button: "Пройти полное сканирование →" links to `/scan`.

- [ ] **Step 11: Screen 9 — Share**

Render `<ShareCard />` component.
Two buttons: "Скачать карточку" + "Отправь другу"
Subtext: "Интересно — совпадёт ли?"

- [ ] **Step 12: Commit**

```bash
git add src/app/free/result/page.tsx
git commit -m "feat: add sequential result page with 9 neurobiological screens"
```

---

## Chunk 4: Entry Points & Polish

### Task 10: Free Test Landing Page

**Files:**
- Create: `src/app/free/page.tsx`

- [ ] **Step 1: Build minimal intro page**

Short, punchy. Not a full landing — just enough to start.

```
5 минут. 25 вопросов.
Узнай свой главный паттерн поведения.

Без регистрации. Без оплаты. Без воды.

[Начать тест →]
```

Dark bg, centered, large type. One CTA button. Maybe a subtle animation.
Add small trust signals: "На основе 22 клинических моделей" in mono, small, below CTA.

- [ ] **Step 2: Commit**

```bash
git add src/app/free/page.tsx
git commit -m "feat: add free test intro page"
```

---

### Task 11: Connect to Main Landing

**Files:**
- Modify: `src/app/page.tsx` (main landing CTA buttons)

- [ ] **Step 1: Add free test CTA to main landing**

Find existing CTA buttons on the landing page. Add or modify the primary CTA to link to `/free`:
- Primary: "Пройти бесплатный тест" → `/free`
- Secondary: "Полное сканирование" → `/scan`

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: link main landing CTA to free test"
```

---

### Task 12: Final Polish & Deploy

- [ ] **Step 1: Test full flow locally**

Run: `cd /Users/timur/psyche-scan && npm run dev`
Walk through: `/free` → `/free/test` (answer all 25) → `/free/result` (all 9 screens)
Verify: analysis animation, pattern reveal, AI generation, share card download, upsell links

- [ ] **Step 2: Check mobile responsive**

Test all screens at 375px width. Ensure:
- Question options stack vertically on mobile
- Result screens readable on small screens
- Share card renders correctly
- Buttons are thumb-reachable

- [ ] **Step 3: Verify ANTHROPIC_API_KEY**

Ensure the key is set in `.env.local` for local dev and in Vercel env for production.

- [ ] **Step 4: Build check**

```bash
cd /Users/timur/psyche-scan && npm run build
```

Fix any TypeScript errors.

- [ ] **Step 5: Final commit and deploy**

```bash
git add -A
git commit -m "feat: complete free lead magnet test with AI-powered results"
```

Deploy happens automatically via Vercel on push.
