# Psyche Scan

## What is this
Deep personality profiling web app. 9 sessions, ~330 questions, based on 22+ validated psychological frameworks. Generates AI-powered "Personality Passport" — a full document about who the person is, how they work, and how to transform.

## Stack
- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS 4** (dark theme, premium design)
- **Framer Motion** (animations)
- **Anthropic Claude API** (Sonnet for Personality Passport generation)
- **Supabase** (configured, not yet connected — using localStorage)

## Project structure
```
src/
├── app/
│   ├── page.tsx              # Landing page (premium design, value prop)
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Theme, fonts, shadows, animations
│   ├── session/[id]/page.tsx # Question flow (dynamic per session)
│   ├── results/page.tsx      # Results dashboard + AI Passport generation
│   └── api/generate-profile/route.ts  # Claude API endpoint
├── components/
│   └── QuestionCard.tsx      # Single question renderer (5 types)
├── data/
│   └── questions.ts          # ALL questions, sessions, types (~780 lines)
└── lib/
    ├── scoring.ts            # Scoring engine (Big5, ECR-R, DERS, schemas, etc.)
    └── supabase.ts           # Supabase client + DB types (not yet used)
```

## Key files
- `src/data/questions.ts` — Source of truth for all 9 sessions and ~330 questions. Types: `Question`, `SessionConfig`, `Section`. Export: `sessions[]`, `getAllQuestions()`, `getTotalQuestionCount()`.
- `src/lib/scoring.ts` — Converts raw answers to structured `ProfileResult`. Handles reverse scoring, dimension grouping, attachment classification, schema scoring, ACE count, SDT.
- `src/components/QuestionCard.tsx` — Renders one question at a time. Supports: scale (1-5), likert7, likert6, boolean, open (textarea), choice. Choice options are in `choiceOptionsMap` at top of file.
- `src/app/api/generate-profile/route.ts` — POST endpoint. Takes `{profileData, summary}`, sends to Claude Sonnet, returns markdown Personality Passport.

## 9 Sessions (in order)
1. **Foundation** — Big Five (IPIP-NEO), Attachment (ECR-R), Values (PVQ-RR)
2. **Depths** — DERS, DAS, YSQ schemas, ACE
3. **Narrative** — 16 open-ended questions (childhood, blind spots, identity, energy)
4. **Dynamics** — Relationships, IFS parts, SDT motivation, behavioral tests
5. **Operating System** — Strengths (Gallup-inspired), chronotype, communication, conflict (Thomas-Kilmann), money, stress, AI preferences
6. **Ego Architecture** — Ego development (Loevinger), defense mechanisms (DSQ), schema coping modes, shadow work, inner roles
7. **Depth Scan** — Existential (Yalom), meaning system, possible selves (Markus), change readiness (Prochaska), transformation resources
8. **Body & Meta** — Nervous system (Polyvagal), body awareness (MAIA), self-compassion (Neff), psych flexibility (ACT/AAQ-II), metacognition, locus of control, validity scale
9. **Core Architecture** — Object relations, narrative identity (McAdams), immunity to change (Kegan), self-complexity (Linville)

## Data flow
1. User answers questions → saved to `localStorage` per session (`psyche_answers_{sessionId}`)
2. Results page collects all answers → `scoreProfile()` → `ProfileResult`
3. User clicks "Generate" → POST to `/api/generate-profile` → Claude generates markdown
4. Passport saved to `localStorage` (`psyche_passport`)
5. User can download `.json` (raw profile) or `.md` (passport)

## Environment variables
- `ANTHROPIC_API_KEY` — Required for AI passport generation (server-side)
- `NEXT_PUBLIC_SUPABASE_URL` — Optional, for future Supabase integration
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Optional, for future Supabase integration

## Design system
- **Fonts**: Instrument Serif (display/headings), DM Sans (body), JetBrains Mono (data/code)
- **Colors**: Dark theme with purple accent (#a78bfa), multi-layer shadows, noise texture
- **Animations**: Framer Motion throughout — staggered reveals, hover effects, progress bars
- **Language**: Russian (all UI text)

## Adding new questions
1. Add questions array in `src/data/questions.ts` (before the sessions array)
2. Add section to existing session or create new session in `sessions[]`
3. If question type is `choice` — add options to `choiceOptionsMap` in `QuestionCard.tsx`
4. If new dimension needs scoring — add scoring logic in `src/lib/scoring.ts`

## Future plans
- Connect Supabase for persistent storage + auth
- Telegram Mini App version
- Informant report (friend/partner answers about you)
- Extend Big Five to full 60 questions (BFI-2)
- PDF export with designed layout
