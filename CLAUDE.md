# Psyche Scan

## What is this
Deep personality profiling web app with two products:
1. **Free Lead Magnet Test** (`/free`) — 25 situational questions, 5-7 min, AI-generated wow-effect result → upsell to full scan
2. **Full Scan** (`/scan`) — 9 sessions, 344 questions, 22+ validated frameworks → AI Personality Passport (15-20 pages)

Live: https://psyche-scan.vercel.app

## Stack
- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS 4** (dark theme, lime accent #D2FF00)
- **Framer Motion** (animations)
- **Anthropic Claude API** (Sonnet for AI-generated results)
- **Supabase** (configured, not yet connected — using localStorage)
- **html2canvas-pro** (shareable result card screenshots)

## Project structure
```
src/
├── app/
│   ├── page.tsx                         # Main landing page (premium design)
│   ├── layout.tsx                       # Root layout (Lenis smooth scroll)
│   ├── globals.css                      # Theme, fonts, animations
│   │
│   ├── free/                            # ← FREE LEAD MAGNET (standalone)
│   │   ├── page.tsx                     # Free test intro page
│   │   ├── test/page.tsx                # 25-question flow
│   │   └── result/page.tsx              # 9 sequential result screens + upsell
│   │
│   ├── scan/page.tsx                    # Full scan session picker
│   ├── session/[id]/page.tsx            # Full scan question flow
│   ├── results/page.tsx                 # Full scan results + AI Passport
│   │
│   └── api/
│       ├── generate-free-profile/route.ts  # Claude API for free test results
│       └── generate-profile/route.ts       # Claude API for full Personality Passport
│
├── components/
│   ├── QuestionCard.tsx                 # Full scan question renderer (6 types)
│   ├── FreeQuestionCard.tsx             # Free test forced-choice card (4 options)
│   ├── AnalysisAnimation.tsx            # Fake analysis loading (4.5s)
│   ├── ResultScreen.tsx                 # Full-screen result screen wrapper
│   └── ShareCard.tsx                    # Shareable story card (9:16)
│
├── data/
│   ├── questions.ts                     # Full scan: 344 questions, 9 sessions
│   └── free-questions.ts               # Free test: 25 questions, 12 patterns, 5 scales
│
└── lib/
    ├── scoring.ts                       # Full scan scoring engine
    ├── free-scoring.ts                  # Free test scoring (5 scales → pattern)
    └── supabase.ts                      # Supabase client (not yet used)
```

## Free Lead Magnet Test (NEW)

### How it works
1. User goes to `/free` → intro page → `/free/test`
2. 25 situational forced-choice questions (4 options each, casual Russian)
3. Each option scores on 2-3 of 5 hidden scales simultaneously
4. After last question → `scoreFreeProfile()` → pattern determined → redirect to `/free/result`
5. Result page shows analysis animation while calling Claude API
6. 9 sequential full-screen result screens (not scrollable — one at a time)
7. Upsell to full scan at screen 8, share card at screen 9

### 5 Hidden Scales
- **Attachment**: secure / anxious / avoidant
- **Stress response**: fight / flight / freeze
- **Motivation**: safety / recognition / freedom / control / connection
- **Defense**: rationalization / avoidance / control / people-pleasing / compensation
- **Childhood pattern**: perfectionist / rebel / invisible / rescuer / clown

### 12 Base Patterns (childhood × defense → pattern name)
Defined in `src/data/free-questions.ts` → `patterns[]`. Examples: "Я сам", "Белка в колесе", "Для всех хороший", "Свободный волк", "Душа компании", etc.

AI adds a modifier based on secondary scales (e.g., "...с вечной тревогой внутри").

### Result Page — 9 Screens (neurobiological journey)
Each screen targets a specific brain response:
1. **Analysis animation** (dopamine — anticipation, 4.5s)
2. **Pattern reveal** (dopamine + norepinephrine — hero moment)
3. **Recognition** (oxytocin — "this is me" descriptions)
4. **Prediction** (norepinephrine peak — typing effect, screenshot moment)
5. **Origin** (oxytocin — childhood connection)
6. **Superpower / Shadow** (dopamine + micro-cortisol)
7. **Actions** (dopamine — agency, micro-actions for this week)
8. **AI export** (utility — copy-paste profile for ChatGPT/Claude)
9. **Locked content** (Zeigarnik effect — upsell to full scan)
10. **Share card** (social — download/share story card)

### Key files for free test
- `src/data/free-questions.ts` — Types (`FreeQuestion`, `FreeAnswerOption`, `FreeScaleKey`, `PatternDefinition`), 12 patterns, 25 questions with scoring maps
- `src/lib/free-scoring.ts` — `scoreFreeProfile(answers)` → `FreeProfileResult` with pattern, modifier, contradictions, percentile
- `src/app/api/generate-free-profile/route.ts` — Claude Sonnet prompt that receives score vector + raw answer texts, returns structured JSON (recognition, predictions, origin, superpower, shadow, actions, aiProfile, lockedPreviews)
- `src/components/FreeQuestionCard.tsx` — Forced-choice card with А/Б/В/Г options, spring animations, auto-advance after 600ms

### Free test localStorage keys
- `psyche_free_answers` — `Record<string, string>` (questionId → optionId)
- `psyche_free_index` — current question index (for resume)
- `psyche_free_profile` — `FreeProfileResult` JSON (scoring output)

## Full Scan (original product)

### 9 Sessions
1. **Foundation** — Big Five (IPIP-NEO), Attachment (ECR-R), Values (PVQ-RR)
2. **Depths** — DERS, DAS, YSQ schemas, ACE
3. **Narrative** — 16 open-ended questions
4. **Dynamics** — Relationships, IFS parts, SDT motivation
5. **Operating System** — Strengths, chronotype, communication, conflict, money, stress
6. **Ego Architecture** — Ego development, defense mechanisms, schema coping, shadow
7. **Depth Scan** — Existential, meaning, possible selves, change readiness
8. **Body & Meta** — Polyvagal, body awareness, self-compassion, ACT, metacognition
9. **Core Architecture** — Object relations, narrative identity, immunity to change

### Full scan data flow
1. User answers questions → `localStorage` per session (`psyche_answers_{sessionId}`)
2. Results page → `scoreProfile()` → `ProfileResult`
3. POST to `/api/generate-profile` → Claude generates markdown Personality Passport
4. Passport saved to `localStorage` (`psyche_passport`)
5. Download as `.json` or `.md`

### Full scan key files
- `src/data/questions.ts` — 344 questions, 9 sessions. Types: `Question`, `SessionConfig`, `Section`
- `src/lib/scoring.ts` — Big5, ECR-R, DERS, schemas, ACE, SDT scoring
- `src/components/QuestionCard.tsx` — 6 question types: scale, likert7, likert6, boolean, open, choice

## Funnel
```
/free (lead magnet landing)
  → /free/test (25 questions, 5-7 min)
    → /free/result (wow-effect AI result, 9 screens)
      → Upsell to /scan (full scan, 344 questions)
        → /results (AI Personality Passport, 15-20 pages)
```

## Environment variables
- `ANTHROPIC_API_KEY` — Required. Used by both `/api/generate-profile` and `/api/generate-free-profile`
- `NEXT_PUBLIC_SUPABASE_URL` — Optional, for future Supabase integration
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Optional

## Design system
- **Fonts**: Instrument Serif (display), DM Sans (body), JetBrains Mono (data)
- **Colors**: Dark bg #0A0A0A, lime accent #D2FF00, white text with opacity levels
- **Animations**: Framer Motion — staggered reveals, spring physics, typing effects
- **Language**: Russian (all UI text)

## Specs and plans
- `docs/superpowers/specs/2026-03-23-free-lead-magnet-design.md` — Full spec for free test
- `docs/superpowers/plans/2026-03-23-free-lead-magnet.md` — Implementation plan

## Future plans
- Connect Supabase for persistent storage + auth
- Add free test CTA button to main landing page (currently separate)
- PDF export of free test results
- Telegram Mini App version
- Informant report (friend/partner answers about you)
- Extend Big Five to 60 questions (BFI-2)
- Payment integration for full scan
