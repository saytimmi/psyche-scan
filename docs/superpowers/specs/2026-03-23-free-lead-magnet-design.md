# Psyche Scan — Free Lead Magnet Test

## Overview
Short free test (25 questions, 5-7 min) as entry point to the paid full scan funnel. Goal: wow-effect so strong the person shares with friends and wants the full scan.

## Architecture

### 5 Hidden Scales
1. **Attachment** — avoidant / anxious / secure (3 values)
2. **Stress response** — fight / flight / freeze (3 values)
3. **Core motivation** — safety / recognition / freedom / control / connection (5 values)
4. **Main defense** — rationalization / avoidance / control / people-pleasing / compensation (5 values)
5. **Childhood pattern** — perfectionist / rebel / invisible / rescuer / clown (5 values)

### 12 Base Patterns (childhood x defense)
| # | Name | Core |
|---|------|------|
| 1 | Я сам | perfectionist x control |
| 2 | Вечный отличник | perfectionist x rationalization |
| 3 | Белка в колесе | perfectionist x compensation |
| 4 | Для всех хороший | rescuer x people-pleasing |
| 5 | Герой на износ | rescuer x compensation |
| 6 | Против системы | rebel x compensation |
| 7 | Свободный волк | rebel x avoidance |
| 8 | Тихий наблюдатель | invisible x avoidance |
| 9 | Серый кардинал | invisible x rationalization |
| 10 | Душа компании | clown x compensation |
| 11 | Зеркало | clown x people-pleasing |
| 12 | Вечный студент | invisible x people-pleasing |

### AI Modifier
Based on secondary scales (attachment + stress + motivation), Claude adds a modifier:
- "...который боится остаться один"
- "...с вечной тревогой внутри"
- "...которому вечно мало"
- "...в режиме выживания"

## Questions

### Format
- 25 situational forced-choice questions
- 4 options per question (A/B/C/D)
- Each option scores on 2-3 scales simultaneously
- Casual Russian, real-life scenarios, no academic language
- 2-3 validation questions (same scale, different angle) for contradiction detection

### Scoring
- Each answer adds points to specific scale values
- After 25 questions: sum per scale value
- Top childhood_pattern x top defense = base pattern from table
- Full score vector sent to AI for personalized result
- Contradictions between scales = signal for AI (not noise)

## Result Page — Neurobiological Journey

### Screen 0: Analysis Animation (3-5 sec) — DOPAMINE (anticipation)
Fake analysis with progress:
- "Analyzing 25 answers..."
- "Cross-referencing 22 clinical models..."
- "Finding contradictions..."
- "Building your profile..."
Pulsing particles, progress bar. Creates investment before reveal.

### Screen 1: Pattern Reveal (hero) — DOPAMINE + NOREPINEPHRINE
Full screen, center aligned. Pattern name in huge Instrument Serif.
Subtitle modifier in italic.
Small stat: "3.2% of people get this result"
Single CTA to continue.

### Screen 2: Recognition — OXYTOCIN
"Here's what you do" — 3 paragraphs of specific behavioral descriptions.
Staggered reveal animation. Each paragraph = behavior the person RECOGNIZES.
Concrete daily situations, not abstract traits.

### Screen 3: Prediction (killer moment) — NOREPINEPHRINE (peak)
Highlighted block: "We're willing to bet..."
2-3 hyper-specific behavioral predictions based on scale combination.
Typing effect — feels like AI generating in real-time.
THIS is the screenshot moment.

### Screen 4: Origin — OXYTOCIN (deep)
"Where this comes from" — 1 paragraph connecting to childhood.
Not diagnosis, not trauma label. Just understanding.
Calm tone. This is where trust peaks.

### Screen 5: Superpower / Shadow — DOPAMINE + MICRO-CORTISOL
Two cards side by side.
Superpower first (validation), then shadow (mild discomfort).
Order matters: validate before challenging.
1.5 sec pause between revealing the two.

### Screen 6: Actions — DOPAMINE (agency)
"Try this week" — 2-3 micro-actions.
Concrete, small, tied to the pattern.
Include self-observation element ("notice what happens inside").

### Screen 7: Feed to AI — UTILITY VALUE
"Want AI to understand you instantly?"
Copy-pasteable profile block:
- Pattern name, scale scores
- Communication preferences
- Triggers
- How to motivate
Button: [Copy my profile]

### Screen 8: Locked Content (upsell) — DOPAMINE (Zeigarnik)
"We know more about you"
4 locked insights with blurred progress bars behind them:
- Attachment style
- Pressure reaction
- Hidden motivation
- 30-day personalized plan
CTA to full scan.

### Screen 9: Share — OXYTOCIN (social)
Story-format card (1080x1920) with pattern name, key quote, stat.
"Send to a friend — see if they match"
[Share] [Download card]

## UX Mechanics
- Full-screen sequential screens (not scroll), button between each
- Typing effect on predictions (Screen 3)
- Staggered reveal animations throughout
- Optional ambient sound with toggle
- Pause before shadow reveal

## AI Prompt Strategy
- Receives full score vector (not just pattern name)
- Anti-Barnum rule: every statement must NOT apply to 50%+ of people
- Must find contradictions between scales and describe them
- Must generate 3-4 behavioral predictions specific to the combination
- Must connect current behavior to childhood pattern
- Tone: direct, honest, "ты" form, zero academic language
- 800-1200 words for free result

## Routes
- `/free` — landing/intro for free test
- `/free/test` — question flow (25 questions)
- `/free/result` — sequential result screens
- `/api/generate-free-profile` — Claude generates personalized report

## Funnel
```
Free test (5-7 min, 25 questions)
    |
Wow result (pattern + superpower + shadow + actions + AI export)
    |
3 locked insights -> "want to know more"
    |
Full scan (9 sessions, 344 questions) -> PAID
    |
Full Psyche Passport (15-20 page AI doc)
    |
AI Personality Passport (file for ChatGPT/Claude) -> PREMIUM
```

## Tech Stack
Same as main project: Next.js 16, TypeScript, Tailwind 4, Framer Motion, Claude API.
Data stored in localStorage (consistent with current approach).
