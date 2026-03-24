# Telegram Bot Deep Research: Psychology, Personality & Viral Growth

*Research date: 2026-03-24*

---

## Table of Contents

1. [Existing Psychology & Personality Bots](#1-existing-psychology--personality-bots)
2. [Russian Market Landscape](#2-russian-market-landscape)
3. [What Makes Bots Go Viral](#3-what-makes-bots-go-viral)
4. [Onboarding Flow — The First 10 Seconds](#4-onboarding-flow--the-first-10-seconds)
5. [Conversational Design — Making the Bot Feel Smart](#5-conversational-design--making-the-bot-feel-smart)
6. [Gamification Mechanics](#6-gamification-mechanics)
7. [Re-engagement & Retention](#7-re-engagement--retention)
8. [Referral & Viral Mechanics](#8-referral--viral-mechanics)
9. [Shareability & Result Cards](#9-shareability--result-cards)
10. [AI Architecture & Integration](#10-ai-architecture--integration)
11. [Mini App vs Bot — When to Use What](#11-mini-app-vs-bot--when-to-use-what)
12. [Monetization — What Actually Makes Money](#12-monetization--what-actually-makes-money)
13. [Telegram Stars Payment Flow](#13-telegram-stars-payment-flow)
14. [Technical Performance](#14-technical-performance)
15. [Deep Linking & Attribution](#15-deep-linking--attribution)
16. [Community Building Around Bots](#16-community-building-around-bots)
17. [Competitor Analysis: Specific Bots](#17-competitor-analysis-specific-bots)
18. [Actionable Playbook for Psyche Scan Bot](#18-actionable-playbook-for-psyche-scan-bot)

---

## 1. Existing Psychology & Personality Bots

### Active Bots in the Market

| Bot | What It Does | Weakness |
|-----|-------------|----------|
| **@BIG5_rubot** | Big Five personality test, 61 questions, ~12 min. Based on Big Five Inventory-2 | Static quiz, no AI, no shareability, boring text output |
| **@teletestbot** | IQ, socionics type, career orientation, psychological portrait | Collection of old-school tests, no personalization |
| **@psyctestbot** | 12+ psychology tests, adds new ones weekly | Just test aggregation, no narrative or insight |
| **Leya (@the_lea_bot)** | AI chatbot for emotions/life challenges — stress, self-esteem, breakups, motivation | Conversational therapy, not personality profiling |
| **Wendy** | AI mental health chatbot (hackathon winner). Personal questionnaire enriches AI knowledge | Good concept but limited distribution |
| **Faino** | Crisis-moment techniques bot. "Right here, right now" help when specialist unavailable | Narrow use case — crisis only |
| **Klio (Клио)** | CBT-based virtual psychologist. Works with burnout, anxiety, cognitive distortions | Therapy-focused, not profiling |
| **"My Compass" (Мой компас)** | Screening assessment for teens and adults, deployed on Telegram + VK | Clinical screening, not consumer entertainment |

### Key Gap in the Market

**Nobody is doing AI-powered personality profiling that feels like talking to a brilliant psychologist and produces beautiful, shareable results.** The existing bots are either:
- Static quiz engines (answer A/B/C/D, get score)
- AI therapy chatbots (open conversation, no structured output)
- Clinical screening tools (PHQ-8, Beck Depression Inventory)

**Psyche Scan's opportunity**: Be the first bot that combines conversational AI assessment + stunning visual results + viral sharing mechanics.

---

## 2. Russian Market Landscape

### Existing Russian-Language Psychology Bots

- **@BIG5_rubot** — Big Five test in Russian, 61 questions. Most well-known psychology bot in RU Telegram.
- **@psyctestbot** — Aggregates psychology tests, adds new ones weekly. Purely mechanical quiz format.
- **Psychological test channels** (e.g., @WorldWord11) — Content channels posting tests as polls/images, not interactive bots.
- **HR bots** — Companies use Telegram quiz bots for candidate screening (Beck Depression Scale, personality assessments for hiring).

### Russian Market Specifics
- Psychology content is extremely popular in Russian Telegram — multiple channels with 100K+ subscribers
- Russians are comfortable with long-form personality tests (the culture has deep roots in psychological typology from Soviet-era traditions)
- Socionics (a personality system similar to MBTI but more popular in post-Soviet countries) is a massive search term
- Price sensitivity is high — $19 is a significant purchase, free tier must deliver real value

### Opportunity
- No AI-powered personality bot exists in Russian
- The market is underserved — just static quiz engines
- Russian users love sharing personality results on social media
- Socionics + Big Five + AI narrative = differentiated product

---

## 3. What Makes Bots Go Viral

### Viral Mechanics That Work (from analysis of 50M+ user bots)

**Core viral formula** (from Amir Hosseini, Telegram Bot Engineering):
> "Virality is not just about numbers — it's about repeat usage, share mechanics, and genuine value."

**Four pillars of viral Telegram bots:**

1. **Low friction start** — User can begin in <3 seconds, no signup, no email
2. **Repeat value** — Users return frequently (daily ideal)
3. **Share mechanics** — Built-in encouragement to share or invite
4. **AI novelty** — Sophisticated or creative AI that surprises users

**Specific viral patterns from successful bots:**

- **Referral loops**: Channels using Telegram's referral feature report 2-5x more organic growth vs traditional posting. Each user becomes a micro-influencer.
- **Social proof**: Notcoin achieved 34M players with 1M paying users (3% conversion) purely through viral mechanics.
- **Result sharing**: Personality quizzes achieve up to 80% participation rates and 90% completion rates — outperforming most static content.
- **Comparison mechanic**: "Would You Rather" bots go viral because users want to compare answers with friends.

### What Psyche Scan Can Learn
- The personality result IS the viral payload — make it so good people WANT to share
- Every interaction should end with a "share this" moment
- The bot should feel like it knows something about you that you didn't know yourself (the "whoa" moment)

---

## 4. Onboarding Flow — The First 10 Seconds

### Critical Timing Data

- **Response speed matters enormously**: Relocating a bot server closer to Telegram's servers (Amsterdam) achieved 12ms response times. Users drop off when bots feel slow.
- **A Black Friday campaign triggered 4,800 signups in 30 minutes** — the burst exhausted the token bucket, stalled onboarding for 42 minutes, and killed conversion. Infrastructure must handle spikes.
- **Telegram's own onboarding philosophy**: Strip down to absolute essentials. Phone number, verification, name — within seconds the user is in. No tutorials, no mandatory profile setup.

### Best Onboarding Flow for Psyche Scan Bot

```
SECOND 0: User taps /start
SECOND 0.3: Bot sends typing indicator (sendChatAction)
SECOND 0.5: First message arrives:

"I've been expecting you.

I'm going to figure out who you really are.
Not who you think you are. Not who you show others.

Ready? It takes 3 minutes."

[Start My Analysis] [How does this work?]

SECOND 1-2: User taps "Start My Analysis"
SECOND 2: First question appears immediately
```

### Onboarding Rules

1. **First message within 0.5 seconds** — use sendChatAction("typing") immediately on /start, then send the message
2. **No registration wall** — Telegram gives you the user's name and ID for free, use it
3. **Promise a specific time commitment** — "3 minutes" is better than "quick test"
4. **Create intrigue, not instructions** — "I'm going to figure out who you really are" > "Welcome to our personality test bot"
5. **One clear CTA button** — Don't make users type anything for the first interaction
6. **Use their first name immediately** — Telegram provides it, use it: "Hello, Timur. I've been expecting you."
7. **Never explain what the bot does in a wall of text** — show, don't tell

### Anti-Patterns to Avoid
- "Welcome! Here's what I can do: /test /help /about /settings" — cognitive overload
- "Please select your language" as first interaction — friction before value
- Long paragraphs explaining the methodology — nobody reads this
- Asking for email/signup before delivering any value

---

## 5. Conversational Design — Making the Bot Feel Smart

### Core Principles

**Balance text input and buttons:**
- Use inline keyboard buttons for structured choices (personality questions)
- Allow free text for open-ended reflection moments
- Never make users type when a button would work
- Never use buttons when a thoughtful text response would feel more personal

**NLP and Context Awareness:**
- Implement entity extraction, sentiment analysis, and intent recognition
- Remember user preferences and previous interactions
- Tailor responses based on individual input — not generic
- Use predictive suggestions based on what the user has already shared

### Making It Feel Like a Brilliant Psychologist

**Technique 1: Reflective statements**
User says something, bot reflects it back with insight:
```
User: "I usually avoid conflict"
Bot: "Interesting — you avoid conflict. But I notice from your earlier
answers that you're not afraid of confrontation when it's about
something you believe in. That's not conflict avoidance.
That's strategic peace-keeping. Big difference."
```

**Technique 2: Pattern callbacks**
Reference earlier answers to create a sense of deep understanding:
```
"Remember when you said you recharge alone? Combined with
your decision pattern on Question 7, this tells me something
most personality tests miss about you..."
```

**Technique 3: Micro-revelations**
Drop small insights throughout, not just at the end:
```
"Based on just these 3 answers, I can already tell you're
someone who processes decisions emotionally first, then
rationalizes them logically. Am I right?"
```

**Technique 4: Pacing and dramatic tension**
```
Bot: "Analyzing your pattern..."
[2 second pause with typing indicator]
Bot: "This is unusual."
[1 second pause]
Bot: "Only 4% of people answer questions 3 and 7 the way you did.
      It means something specific about how you handle loss."
```

### Message Formatting for Visual Appeal

Telegram supports MarkdownV2 and HTML formatting:
- **Bold** for key insights and personality trait names
- *Italic* for reflective/emotional moments
- `Code blocks` for statistics and percentages
- ||Spoiler text|| for dramatic reveals ("tap to see your shadow trait")
- Emojis sparingly for section breaks and visual anchoring
- Max 100 markup elements per message (Telegram limit)

---

## 6. Gamification Mechanics

### What Works (with data)

| Mechanic | Impact | Implementation |
|----------|--------|----------------|
| **Daily streaks** | Users 2.3x more likely to engage daily after 7+ day streak | Daily micro-insight or reflection prompt |
| **Streaks + milestones combined** | 40-60% higher DAU vs single-feature | "7-day streak unlocked: Your Shadow Profile" |
| **Leaderboards** | 25% increase in retention rates | "You know yourself better than 87% of users" |
| **Achievement badges** | Provides sense of accomplishment, encourages continued use | "Deep Diver: Completed all 5 personality dimensions" |
| **Progress bars** | Reduces quiz abandonment | "Question 7/12 — 58% complete" |

### Gamification Ideas for Psyche Scan

**Progression System:**
- Level 1: Basic Profile (free, 3 min)
- Level 2: Deep Dive (one dimension explored in detail)
- Level 3: Shadow Profile (hidden traits, blind spots)
- Level 4: Relationship Dynamics (how you interact with other types)
- Level 5: Growth Map (personalized development plan)

**Streak Mechanic:**
- Daily "insight of the day" based on their profile
- 3-day streak: unlock a hidden trait
- 7-day streak: unlock compatibility analysis
- 30-day streak: unlock full growth roadmap

**Achievement Badges:**
- "Self-Aware" — completed basic profile
- "Deep Diver" — explored all 5 dimensions
- "Rare Type" — belongs to a type that's <5% of population
- "Pattern Breaker" — answers contradicted expected patterns
- "Social Butterfly" — shared results with 5+ friends

---

## 7. Re-engagement & Retention

### Push Notification Strategy

**Key data:**
- Telegram push notifications have higher deliverability rates than SMS
- Support photos, videos, and files — more engaging than plain text
- Use sparingly — overwhelming users kills retention

**Re-engagement message schedule:**

| Timing | Message | Goal |
|--------|---------|------|
| **+1 hour** (if didn't finish) | "Your analysis is 60% complete. Your results are getting interesting..." | Complete the test |
| **+24 hours** | "I noticed something in your profile I want to show you." | Return engagement |
| **+3 days** | "Your personality type ({type}) has a hidden strength most people miss. Want to see it?" | Unlock paid content |
| **+7 days** | "This week 2,847 people discovered their type. {X}% matched yours. Here's what that means..." | Social proof + curiosity |
| **+14 days** | "I've updated my analysis engine. Want to see if your profile has changed?" | Re-test mechanic |
| **+30 days** | "Monthly personality snapshot: How you've evolved" | Long-term retention |

### Technical Implementation
- Store user chat_id for sending messages
- Use scheduled jobs (cron) to send re-engagement messages
- Respect Telegram rate limits: 30 messages/second to different chats, 1 message/second to same chat
- Track message opens and interaction to avoid messaging disengaged users
- Allow users to opt out of notifications

### Content-Based Retention Hooks
- "Your type's weekly challenge" — actionable personal growth prompts
- "Famous people with your type" — curiosity hook
- "Your type in relationships this week" — horoscope-like recurring content
- "New dimension unlocked" — progressive reveal of personality layers

---

## 8. Referral & Viral Mechanics

### How Referral Systems Work on Telegram

**Technical flow:**
1. User gets unique referral link: `t.me/PsycheScanBot?start=ref_USER123`
2. Friend clicks link, bot receives start parameter `ref_USER123`
3. Bot credits original user and welcomes new user
4. Both parties get rewards

**Data on referral effectiveness:**
- Referral programs increase customer acquisition by up to 16%
- Lifetime value increases by 25% for referred users
- Telegram channels using referrals report 2-5x more organic growth

### Referral System Design for Psyche Scan

**Reward Structure:**
| Referrals | Reward |
|-----------|--------|
| 1 friend | Unlock "How Others See You" mini-report |
| 3 friends | Unlock "Compatibility Check" — compare types with a friend |
| 5 friends | Unlock "Shadow Profile" — your hidden traits |
| 10 friends | Full premium report free (normally $19) |

**Viral Sharing Moments (natural share triggers):**
1. **After results reveal**: "Share your type and see how your friends compare" [Share button]
2. **Compatibility feature**: "Send this to someone — I'll tell you how compatible you are" (requires friend to also take the test)
3. **Challenge mechanic**: "Think you know your friend? Predict their type, then send them the test to find out"
4. **Rare type notification**: "You're one of only 3.2% of people with this type. Find others like you" [Share]

**Anti-Spam Design:**
- Don't make sharing mandatory to see results — it kills trust
- Make sharing feel like a natural next step, not a gate
- Reward sharing generously enough that it feels worth it

---

## 9. Shareability & Result Cards

### Why Personality Results Go Viral

- **Personality quizzes achieve 80% participation and 90% completion rates** — highest of any content format
- **Taiwan Design Expo personality test**: 10,000+ shared results on Instagram within 2 months from hashtag analysis alone
- **16Personalities has been taken over 1 billion times** in 45+ languages
- People share results for self-expression — "this is who I am"

### Result Card Best Practices

**Visual design requirements:**
- Beautiful, shareable image card (not just text)
- Clean layout with the personality type name, key traits, and a striking visual
- Include bot username/link on the card so viewers can take the test
- Use a unique color palette per personality type for instant recognition
- Square format (1080x1080) works best for sharing across platforms

**How to implement in Telegram:**
1. Generate result image server-side (use canvas/sharp/puppeteer)
2. Send as photo with `sendPhoto` API
3. Include inline keyboard button: "Share My Results"
4. Use inline mode: user types `@PsycheScanBot` in any chat, sees their result card, taps to send

**Inline Mode Implementation:**
- Enable inline mode via @BotFather
- When user types `@PsycheScanBot` in any chat, show their result card preview
- Friend sees the card with "Take the test yourself" button
- Deep link sends friend to bot with referral tracking

**What to include on the result card:**
- Personality type name (memorable, not clinical — "The Architect" not "INTJ-A")
- 3-4 key trait words
- A striking visual/illustration for the type
- A provocative one-liner about the type
- Percentage: "3.2% of people share your type"
- QR code or link to take the test
- Bot branding

---

## 10. AI Architecture & Integration

### Architecture Patterns for AI Telegram Bots

**Pattern 1: Direct API Integration**
```
User Message → Telegram Bot → Claude/GPT API → Format Response → Send Back
```
- Simplest architecture
- Latency: 1-5 seconds depending on AI model
- Use sendChatAction("typing") while waiting for AI response
- Re-send typing indicator every 5 seconds for long responses

**Pattern 2: Conversation Memory with Redis + Postgres**
```
User Message → Bot → Load context from Redis → Claude API (with context) → Store response → Reply
```
- Redis for session state (current question, conversation flow)
- Postgres for long-term profile data and results
- Chat ID as the key for scoping memory per user

**Pattern 3: Hybrid Assessment + AI**
```
Structured Questions (buttons) → Score calculation → AI narrative generation → Result
```
- First phase: structured personality assessment via inline keyboard buttons
- Second phase: AI generates personalized narrative based on scores
- Best of both worlds: scientific validity + engaging narrative

### Memory Management

**Per-session context:**
- Store current assessment progress in Redis
- Key: `session:{chat_id}`
- TTL: 24 hours (auto-expire incomplete sessions)

**Long-term profile:**
- Store completed assessments in Postgres
- Track assessment history for "personality evolution" feature
- Enable re-testing with trend analysis

**AI Prompt Architecture:**
```
System: You are Psyche Scan, a brilliant personality profiler.
You've just completed analyzing {user_name}'s responses.

Assessment data: {structured_scores}
Raw answers: {user_responses}

Generate a personality report that:
1. Feels personally insightful, not generic
2. References specific answers they gave
3. Reveals something they didn't know about themselves
4. Uses vivid metaphors and analogies
5. Is 200-300 words, broken into clear sections
```

### Handling AI Latency

- **Always show typing indicator** before calling AI API
- **Re-send typing every 4.5 seconds** (expires after 5)
- **Stream if possible**: Send partial results as they generate
- **Pre-compute common elements**: Pre-generate intro text while AI works on personalized content
- **Cache similar profiles**: If someone's scores are very close to a cached profile, use cached base + personalize small details

---

## 11. Mini App vs Bot — When to Use What

### Key Comparison Data

| Feature | Bot | Mini App |
|---------|-----|----------|
| **Development effort** | Low (text + buttons) | Medium-High (full web frontend) |
| **User experience** | Chat-native, linear flow | Rich UI, interactive, app-like |
| **Engagement rate** | Good for simple flows | Higher for complex interactions |
| **Shareability** | Inline mode sharing | Can generate shareable links |
| **Payment** | Telegram Stars API | Telegram Stars + web payments |
| **Conversion to paid** | Lower | Higher (richer paywall experience) |
| **Onboarding friction** | Zero (just /start) | One extra tap to open Mini App |

### Notcoin's Numbers (Mini App benchmark)
- 34 million players
- 1 million paid users
- 3% conversion rate to paid — better than most SaaS companies
- Purely through Telegram Mini App

### Recommendation for Psyche Scan

**Hybrid approach:**
1. **Bot for onboarding + assessment** — zero friction, chat-native feel, conversational AI personality
2. **Mini App for results + paywall** — rich visual results page, beautiful type cards, smooth payment flow
3. **Bot for re-engagement** — push notifications, daily insights, streak tracking

**Flow:**
```
/start → Bot conversation (3 min assessment)
→ "Your results are ready" → [View Full Results] button
→ Opens Mini App with stunning visual report
→ Free: basic type + 2 traits
→ Paid ($19): full report, shadow profile, compatibility, growth map
→ Share button → generates result card → viral loop
```

### CTR Benchmark
- Telegram mini app ads average ~5% CTR
- Telegram channels average 28% engagement rate
- Both significantly outperform Facebook/Instagram

---

## 12. Monetization — What Actually Makes Money

### Revenue Models That Work on Telegram (2025-2026)

**1. Subscription Model (most sustainable)**
- Successful subscription bots earn $2,000-$20,000/month
- Works for recurring value (daily insights, weekly reports)
- Use InviteMemberBot or custom implementation

**2. One-Time Purchase (best for Psyche Scan)**
- Premium personality report: $19 (via Telegram Stars)
- No ongoing commitment = lower purchase anxiety
- Apple/Google take ~30% of Stars purchases

**3. Tiered Freemium (recommended)**
- Free: basic type + shareable result card (drives virality)
- $9: detailed report with all dimensions
- $19: full report + shadow profile + compatibility + growth map
- $49: "lifetime" access with monthly updates and all future features

**4. Advertising**
- Lifestyle/entertainment: ~$1 per 1,000 views
- IT/finance/business audiences: ~$10 per 1,000 views
- Not recommended as primary monetization for Psyche Scan (degrades premium feel)

### Conversion Rate Benchmarks

- **Freemium to paid average**: 2-5%
- **Top-performing apps**: 5-8% with optimized onboarding and paywalls
- **Personality test specific**: Higher than average because results create strong desire to see "full picture"

### Pricing Psychology Tactics

1. **Endowment Effect**: Show them 60% of the report free, then paywall the rest. They feel they already "own" part of it.
2. **Loss Aversion**: "Your Shadow Profile has been generated but will expire in 48 hours" — creates urgency.
3. **Anchoring**: Show the $49 tier first, making $19 feel like a deal.
4. **Decoy Effect**: Three tiers where the middle ($19) is the obvious choice.
5. **Social Proof**: "12,847 people have unlocked their full profile this month."

### What NOT to do
- Don't gate the basic result behind payment — kills virality
- Don't use ads in the bot conversation — breaks the "psychologist" immersion
- Don't charge for the compatibility feature itself — charge for the detailed compatibility report (the "check" is free, the "deep dive" is paid)

---

## 13. Telegram Stars Payment Flow

### How It Works

1. **User acquires Stars** via Apple/Google in-app purchase or @PremiumBot
2. **Bot creates invoice** with product details and Star amount
3. **User pays** — seamless, no credit card entry, no personal info needed
4. **Bot validates** via `pre_checkout_query` handler
5. **Bot delivers** digital goods and stores `telegram_payment_charge_id`

### Implementation Details

- Leave `provider_token` parameter empty for digital goods
- Telegram Stars currency tag: `XTR`
- Compliant with Apple and Google policies for digital products
- No need for external payment processor
- Refund handling: store charge IDs, implement refund logic

### Pricing in Stars
- Stars are purchased at roughly $0.013-0.02 per Star (varies by platform)
- $19 report = ~950-1,460 Stars
- Check current Star pricing before setting prices
- Round to clean Star numbers for better UX

---

## 14. Technical Performance

### Webhook vs Polling

**Use webhooks for production. Period.**
- Webhooks: instant delivery, no polling delay
- Webhooks: no traffic when idle (cost-efficient)
- Webhooks: supports horizontal scaling (multiple servers behind one URL)
- Polling: gets 409 Conflict with multiple processes
- Polling: acceptable only for development/testing

### Response Time Optimization

1. **Host server near Amsterdam** — Telegram's servers are there. One bot achieved 12ms response times after relocating.
2. **Use sendChatAction immediately** — before any processing. The typing indicator buys you time.
3. **Typing indicator expires after 5 seconds** — re-send every 4.5 seconds during AI processing.
4. **Target median latency under 600ms** for non-AI responses (button handling, state transitions).
5. **Pre-compute what you can** — don't call AI for every button press, only for narrative generation.

### Rate Limits
- 30 messages/second to different users
- 1 message/second to same chat
- 20 messages/minute to same group
- Burst of 4,800 users in 30 minutes can exhaust token bucket — implement queuing

### Infrastructure
- Redis for session state (fast reads, auto-expiry)
- Postgres for persistent data
- Queue system (Bull/BullMQ) for AI generation jobs
- CDN for result card images
- Separate worker processes for AI calls (don't block the webhook handler)

---

## 15. Deep Linking & Attribution

### How Deep Linking Works

**Format:** `https://t.me/BotName?start=PARAMETER`

When user clicks, bot receives `/start PARAMETER` message.

### Use Cases for Psyche Scan

| Link Pattern | Purpose |
|-------------|---------|
| `?start=ref_USER123` | Referral tracking |
| `?start=ig_story` | Instagram Story attribution |
| `?start=tw_viral` | Twitter/X viral post tracking |
| `?start=compat_USER456` | Compatibility check with specific user |
| `?start=type_ARCHITECT` | "Are you an Architect too?" viral hook |
| `?start=channel_CHANNAME` | Channel/community attribution |

### Implementation
- Parse start parameter on every /start command
- Store attribution in user record
- Track conversion funnel per source
- Use aiogram's `decode_payload` for encoded parameters

---

## 16. Community Building Around Bots

### Strategy Layers

**Layer 1: Results Channel**
- Auto-post anonymized interesting results to a public channel
- "Today's rarest type: The Phantom (0.8% of users)"
- Drives curiosity and channel growth

**Layer 2: Type-Specific Groups**
- Create groups for each personality type
- "The Architects Lounge" — for people who got Architect type
- Self-moderating communities of like-minded people
- Drives long-term retention and word-of-mouth

**Layer 3: Compatibility Discussions**
- "Architect + Empath: The most explosive combination. Discuss."
- Content that drives engagement and sharing

**Bot Integration with Groups:**
- Combot for moderation and analytics
- Custom bot commands in groups: `/mytype` shows your type badge
- Leaderboards: "Most self-aware members this week"

---

## 17. Competitor Analysis: Specific Bots

### @RatherGameBot / Would You Rather Bots

**How it works:**
- `/next` — get a random "Would You Rather" question
- Users pick option A or B
- See what percentage of people chose each option
- Works in groups and 1-on-1

**Why it's viral:**
- Zero onboarding — one command, immediate value
- Social comparison mechanic ("73% chose A, you chose B")
- Works in groups — multiplayer amplifies sharing
- User-submitted questions via suggestion system
- NSFW mode for engagement with older audiences

**Lesson for Psyche Scan:** The comparison mechanic ("you vs everyone else") is extremely powerful. Show users where they fall relative to the population on every trait.

### AI Assistant Bots (GPT4Telegrambot, etc.)

**Scale:** 4+ million monthly users for top AI bots

**How they retain users:**
- General-purpose utility (coding, writing, brainstorming)
- Conversation memory within sessions
- Fast response times
- Free tier with daily limits

**Lesson for Psyche Scan:** The "daily limit" model works for AI bots. Could offer one free AI insight per day, paid for unlimited.

### @TriviaBot and Quiz Bots

**Gamification patterns:**
- Points system with leaderboards
- Daily challenges
- Category selection
- Streak rewards
- Group competition mode

**Lesson for Psyche Scan:** Leaderboards and streaks work. Implement a "self-knowledge score" that increases as users complete more dimensions.

---

## 18. Actionable Playbook for Psyche Scan Bot

### Phase 1: MVP Bot (Week 1-2)

**Build:**
1. Bot with /start → 12-question conversational assessment (inline buttons)
2. AI-generated personality narrative (Claude API)
3. Beautiful result card image (generated server-side)
4. Share button with inline mode
5. Deep link referral tracking

**Technical stack:**
- Node.js/TypeScript + grammY or Telegraf framework
- Webhook mode (not polling)
- Redis for session state
- Claude API for narrative generation
- Sharp/Canvas for result card image generation
- Hosted near Amsterdam for lowest latency

**Key metrics to track:**
- /start to completion rate (target: >70%)
- Time to complete (target: <3 minutes)
- Share rate after results (target: >20%)
- Referral conversion (target: >10% of shares lead to new users)

### Phase 2: Monetization (Week 3-4)

**Add:**
1. Free tier: basic type + shareable card (2-3 traits)
2. Paid tier ($19 via Telegram Stars): full report with all dimensions, shadow traits, growth map
3. Paywall trigger: show 40% of results free, blur/lock the rest
4. "Unlock in 48 hours or results expire" urgency mechanic

**Conversion target:** 3-5% free to paid

### Phase 3: Retention & Virality (Week 5-8)

**Add:**
1. Daily insight notifications (personalized to type)
2. 7-day streak → unlock hidden trait
3. Compatibility check feature (requires friend to take test = viral loop)
4. Type-specific Telegram groups
5. Results channel with daily stats
6. Referral reward system (3 friends = bonus content)

### Phase 4: Mini App (Week 9-12)

**Add:**
1. Rich visual results page as Mini App
2. Interactive personality radar chart
3. Type comparison tool
4. Premium report viewer with animations
5. Payment flow through Mini App for higher conversion

### Critical Success Factors

1. **The result must feel personally accurate** — this is the #1 driver of sharing. Generic = dead.
2. **The result card must be beautiful** — ugly screenshots don't get shared.
3. **The bot must feel like talking to a genius** — every response should surprise.
4. **Speed is non-negotiable** — first message in <0.5s, full result in <5s after last question.
5. **The free tier must be genuinely impressive** — not a teaser, a real "wow" moment.

---

## Sources

- [Multilingual Telegram Chatbot for Mental Health Data Collection](https://dl.acm.org/doi/10.1145/3716553.3757095)
- [GPT Psychologist Telegram Bot](https://github.com/EPguitars/gpt-psychologist-telegram-bot)
- [Wendy Mental Health AI Chatbot](https://github.com/Giga-Chad-LLC/Wendy-Telegram-Chatbot)
- [Leya Bot — Telegram Mini App](https://minitelegram.com/en/apps/the_lea_bot)
- [Faino Help](https://faino.help/en/main)
- [AI Engagement Bots — InviteMember](https://blog.invitemember.com/ai-engagement-bots-in-telegram-how-to-increase-profit-and-retention/)
- [Most Viral AI Telegram Bots 2025](https://membertel.com/blog/the-most-viral-ai-telegram-bots-of-2025/)
- [Viral Telegram Games: Mechanics & Strategies](https://pixelplex.io/blog/viral-mechanics-on-telegram-apps/)
- [Telegram Onboarding Kit](https://github.com/Easterok/telegram-onboarding-kit)
- [Telegram Bot Conversational Design — BotPenguin](https://botpenguin.com/blogs/how-to-create-an-engaging-telegram-chatbot)
- [Telegram Bot Features — Official](https://core.telegram.org/bots/features)
- [Telegram Push Notifications Guide](https://respond.io/blog/telegram-push-notifications)
- [Analyzing Bot Engagement Metrics — BAZU](https://bazucompany.com/blog/analyzing-telegram-bot-engagement-metrics-that-matter/)
- [Gamification in Telegram — Chat Place](https://help.chatplace.io/en/articles/9467525-customizing-gamification-in-telegram)
- [Streaks Gamification Case Study — Trophy](https://trophy.so/blog/streaks-gamification-case-study)
- [Streaks and Milestones — Plotline](https://www.plotline.so/blog/streaks-for-gamification-in-mobile-apps/)
- [Claude Code Telegram Bot](https://github.com/RichardAtCT/claude-code-telegram)
- [AI Agent Chatbot with Long-Term Memory — n8n](https://n8n.io/workflows/2872-ai-agent-chatbot-long-term-memory-note-storage-telegram/)
- [Telegram Referral Bot](https://github.com/kevin-kidd/telegram-referral-bot)
- [Best Free Telegram Referral Bots — Trapyfy](https://www.trapyfy.com/blog/best-free-telegram-referral-bots)
- [Telegram Mini Apps vs Bots — Magnetto](https://magnetto.com/blog/telegram-mini-apps-vs-bots)
- [Telegram Mini Apps 2026 Monetization Guide](https://merge.rocks/blog/telegram-mini-apps-2026-monetization-guide-how-to-earn-from-telegram-mini-apps)
- [Monetizing a Telegram Bot — Adsgram](https://adsgram.ai/monetizing-a-telegram-bot/)
- [Telegram Bot Monetization — Justobill](https://justobill.com/top-5-telegram-bot-monetization-strategies-for-2025/)
- [Bot Payments API — Telegram Stars](https://core.telegram.org/bots/payments-stars)
- [Telegram Stars Blog](https://telegram.org/blog/telegram-stars)
- [Optimising Bot Response Times — DEV](https://dev.to/imthedeveloper/optimising-your-telegram-bot-response-times-1a64)
- [Webhook vs Polling — Hostman](https://hostman.com/tutorials/difference-between-polling-and-webhook-in-telegram-bots/)
- [Webhook vs Polling — GramIO](https://gramio.dev/updates/webhook)
- [Deep Linking — aiogram docs](https://docs.aiogram.dev/en/latest/utils/deep_linking.html)
- [Telegram Deep Links — Postly](https://postly.ai/telegram/telegram-deep-links)
- [Inline Bots — Telegram Official](https://core.telegram.org/bots/inline)
- [sendChatAction — Telegram](https://telegram-bot-sdk.readme.io/reference/sendchataction)
- [Telegram Message Formatting — GramIO](https://gramio.dev/formatting)
- [Big Five Test Telegram Bot — Habr](https://habr.com/ru/articles/756826/)
- [Psychology Bots — Telegram.org.ru](https://telegram.org.ru/11368-psihologicheskie-testy.html)
- [AI Psychology Bots — psy-chat.ru](https://psy-chat.ru/bot-psychology)
- [Freemium Conversion Rates — CrazyEgg](https://www.crazyegg.com/blog/free-to-paid-conversion-rate/)
- [App Pricing Psychology — TheApptitude](https://www.theapptitude.com/blogs/the-psychology-of-app-pricing-free-vs-paid-vs-freemium/)
- [Subscription Pricing Psychology — RevenueCat](https://www.revenuecat.com/blog/growth/subscription-pricing-psychology-how-to-influence-purchasing-decisions/)
- [16Personalities](https://www.16personalities.com)
- [Telegram Statistics 2026](https://thunderbit.com/blog/telegram-stats)
