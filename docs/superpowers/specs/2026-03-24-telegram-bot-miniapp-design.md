# Psyche Scan — Telegram Bot + Mini App Design Spec

**Date**: 2026-03-24
**Status**: Draft
**Product**: AI-powered personality profiling in Telegram

---

## 1. Product Vision

**One-liner**: 22 клинических теста + AI-отчёт который показывает тебя так что мурашки. В Telegram.

**Positioning**: Первый AI-powered бот для глубокого психологического профилирования в русском Telegram. Конкурентов нет — существующие боты (@BIG5_rubot, @psyctestbot) — статичные квизы без AI, без вирусности, без wow-эффекта.

**Market**: 1B Telegram users, 500M используют Mini Apps, 70%+ русскоязычных пользователей взаимодействуют с TMA регулярно.

---

## 2. Architecture

### Two Components

**Mini App** = полноценный продукт. Всё визуальное: тесты, результаты, отчёт, профиль, оплата. Как CliftonStrengths/16Personalities, но внутри Telegram.

**Bot** = "сотрудник компании". Встречает, объясняет ценность, мотивирует, напоминает, помогает после прохождения. Sales + customer success + support в одном лице.

### Separation of Concerns

| Что | Где |
|-----|-----|
| Тесты (UI, вопросы, swipe) | Mini App |
| Результаты (экраны, графики, анимации) | Mini App |
| Отчёт (интерактивный, шкалы, парадоксы) | Mini App |
| Оплата | Mini App (Telegram Stars) |
| Share card | Mini App → shareStory API |
| PDF скачать | Mini App (бонус) |
| Приветствие, объяснение ценности | Bot |
| Напоминания, прогресс | Bot |
| Пост-тестовые инсайты | Bot |
| Re-engagement | Bot |

### Синхронизация

Общая БД (Neon Postgres). User ID = Telegram user ID. Бот и Mini App видят одно и то же состояние: прогресс по тестам, результаты, статус оплаты.

---

## 3. Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Mini App** | Next.js (existing app) + @telegram-apps/sdk-react | Один кодбейз, один деплой. Existing Next.js app на Vercel становится Mini App. Reuse всех компонентов (QuestionCard, ResultScreen, etc.) |
| **TMA SDK** | @telegram-apps/sdk-react v3 | Официальные React bindings |
| **UI Components** | @telegram-apps/telegram-ui (TelegramUI) | Нативный Telegram look |
| **Animations** | Framer Motion | Уже используется, wow-эффект |
| **Bot** | grammY (webhook mode on Vercel) | Уже в cognitive-os, TypeScript-native. Webhook mode = тот же деплой что и API routes |
| **Backend API** | Next.js API routes (existing) on Vercel | Уже работает |
| **Database** | Neon Postgres (existing) | Serverless, уже подключена |
| **AI** | Claude Sonnet via Anthropic API | Уже интегрирован |
| **Payments** | Telegram Stars | Zero-friction, не нужна карта |

### Mini App Integration

Добавляем TMA SDK и TelegramUI в существующий Next.js проект. Не создаём отдельное Vite приложение. Все существующие компоненты (FreeQuestionCard, QuestionCard, ResultScreen, ShareCard, AnalysisAnimation) переиспользуются as-is. Маршруты Mini App живут рядом с существующими — например `/tma/free/test`, `/tma/free/result`.

### Bot Hosting

grammY в webhook mode на Vercel — тот же деплой что и Mini App и API routes. Webhook endpoint: `/api/bot/webhook`.

**Cold start mitigation**: первое сообщение после /start — простой текст без обращений к БД и внешним API. Это гарантирует ответ <0.5 sec даже при холодном старте Vercel функции. Все тяжёлые операции (создание пользователя, проверка состояния) — во втором сообщении или при открытии Mini App.

---

## 4. Monetization

### Pricing (разовая покупка, без подписки на MVP)

| Product | Price | Target | One-liner |
|---------|-------|--------|-----------|
| **Экспресс** | 0₽ | Все | "Узнай свой паттерн за 5 минут" — 25 вопросов, паттерн, 3 wow-экрана, share card. 6 экранов заблюрены (endowment + Zeigarnik). |
| **Полный скан** | 699₽ | "Хочу понять себя" | "Полный рентген личности" — 344 вопроса, 22 методики, интерактивный отчёт с парадоксами и планом + PDF + AI-профиль |
| **Для двоих** | 990₽ | Пары, друзья | "Узнайте почему вы ссоритесь" — два полных скана + отчёт совместимости (POST-MVP) |

> **Note**: Stars amounts will be calculated at launch based on current Telegram exchange rate. Do not hardcode Star prices — use a config/env variable that maps RUB prices to Stars.

### Unit Economics (target)
- Free → Paid conversion: 3-5%
- 10K MAU × 4% conversion × 699₽ = ~280K₽/month gross
- Telegram takes ~30% commission on Stars payments
- Net revenue after Telegram commission: ~196K₽/month
- Cost: Claude API ~$0.05/report × 400 = $20/month + Neon free tier + Vercel free tier
- **Gross margin: ~65%** (after Telegram's 30% cut and API costs)

---

## 5. Bot Design

### Tone
На "ты". Тёплый наставник + прямой друг. Без воды, без заискивания. Честный, поддерживающий, конкретный.

### Bot Intelligence
Гибрид:
- **Скриптовый** для стандартных путей (onboarding, напоминания, прогресс, upsell)
- **Claude AI** для персонального общения (знает профиль, отвечает на вопросы о результатах)

### /start Flow (proven: <0.5 sec first message)

```
User: /start

Bot (instant):
"Привет 👋"

Bot (1 sec delay):
"Я Psyche — помогу тебе понять как ты устроен.

Не 4 буквы как в MBTI. А конкретно:
— почему ты реагируешь так а не иначе
— какие убеждения из детства управляют тобой сейчас
— что с этим делать

5 минут, 25 ситуаций. Без регистрации."

Bot (0.5 sec delay):
[🔬 Пройти тест] ← WebApp button (opens Mini App)

"22 клинических методики. Те же что используют психологи."
```

### After Free Test Completion

```
Bot:
"Готово! Твой паттерн: {patternName}

{одна строка из AI — самый мощный инсайт}

Полный результат — в приложении 👇"

[Посмотреть результат] ← WebApp button

(1 hour later, if user saw results):
"Как тебе? Узнал себя?"
← waits for response, reacts via Claude with profile context
```

### Progress Tracking (if user started full scan)

```
Bot (next day):
"Ты прошёл 2 из 9 сессий. Следующая — «Глубины»:
эмоциональная регуляция, убеждения, детский опыт.

~15 минут. Продолжить?"

[Продолжить] ← WebApp button
```

### Re-engagement (proven: streaks +40-60% DAU)

| When | Message |
|------|---------|
| Day 1 after test | "Как тебе результат? Узнал себя?" |
| Day 3 | Один инсайт из профиля: "Кстати, твоя схема «{schema}» — вот как она проявляется в работе: ..." |
| Day 7 | "Неделя. Замечал свой паттерн {patternName}?" |
| Day 14 | "Две недели назад ты узнал что {insight}. Что-то изменилось?" |

Max 1 сообщение в 2-3 дня. Не спам.

> **Note**: Separate message templates for free-only users vs full scan users.
>
> **Free users** (only have express results): insights based on pattern, attachment style, stress response. Example: "Кстати, твой стиль привязанности ({attachmentStyle}) — вот как он проявляется когда ты устаёшь: ..."
>
> **Full scan users** (have deep profile): insights based on schemas (YSQ), emotional regulation (DERS), beliefs (DAS), values (PVQ-RR). Much richer and more specific. Example: "Твоя схема «{schemaName}» активируется в конфликтах на работе. Вот что данные показывают: ..."

### Upsell (natural, not pushy)

After free test, when user asks questions about their profile:
```
User: "А почему я так реагирую на критику?"

Bot (Claude):
"Скорее всего это связано с твоей схемой завышенных стандартов.
Я вижу это по бесплатному тесту, но точно сказать смогу после полного скана —
там есть DERS (эмоциональная регуляция) и DAS (убеждения) которые покажут
точную механику.

[Пройти полный скан — 699₽]"
```

---

## 6. Mini App Design

### Navigation

Bottom tabs:
1. **Тесты** — список доступных тестов, прогресс
2. **Результаты** — интерактивный отчёт (после прохождения)
3. **Профиль** — настройки, PDF скачать, AI-профиль

### Free Test Flow (25 questions)

1. **Intro screen** — "5 минут. 25 ситуаций. Без воды." + кнопка "Начать"
2. **Questions** — fullscreen swipe cards (4 варианта ответа), progress bar, auto-advance 600ms
3. **Analysis animation** — "Сопоставляю 22 модели..." (4.5 sec, builds anticipation)
4. **Results** — 9 fullscreen screens (story format):
   - Screen 1-3: UNLOCKED (паттерн, узнавание, предсказания)
   - Screen 4-9: BLURRED (суперсила, тень, происхождение, действия, AI-профиль, share)
   - Blur overlay: "Разблокировать полный результат — 699₽" или "Пройти полный скан"
5. **Share card** — 1080x1920, паттерн + цитата + "пройди тоже: t.me/PsycheScanBot"
   - shareStory API for Telegram Stories
   - Share button for forwarding to friends

### Full Scan Flow (344 questions, paid)

1. **Session picker** — 9 sessions, progress indicators
2. **Session intro** — what this session measures, estimated time
3. **Questions** — same card UI as free test, adapted for different question types (scale, likert7, boolean, open)
4. **Session complete** — what was learned, profile completeness %
5. **Between sessions** — bot reminds to continue

### Full Report (interactive, in Mini App)

Story-format pages with swipe navigation:

1. **Кто ты** — AI portrait paragraph
2. **Узнай себя** — 5 scenario recognition cards
3. **Твои парадоксы** — "что видят / что чувствуешь" cards
4. **Big Five** — bars with behavioral descriptions
5. **Привязанность** — style badge + cross-analysis
6. **Эмоции (DERS)** — 6 bars with stress pattern
7. **Схемы** — dominant/active with descriptions
8. **Связи** — cross-analysis (work, relationships, stress)
9. **Силы и тени** — strength + shadow pairs
10. **Слепые зоны** — "ты думаешь / данные показывают"
11. **План действий** — prioritized steps
12. **Ценности + мотивация** — compact data
13. **AI-профиль** — copy for ChatGPT/Claude
14. **Как со мной работать** — shareable page
15. **PDF** — download button

### Viral Mechanics

1. **Share card** after free test (1080x1920 story format)
2. **shareStory API** — native Telegram Stories sharing
3. **Deep links**: `t.me/PsycheScanBot/app?startapp=ref_{userId}` — referral attribution from day 1
4. **"Как со мной работать" page** — shareable to partner/friend/colleague
5. **Comparison tease**: "Интересно как ваши паттерны совпадают? Пусть друг пройдёт тоже" (seed for couples feature)

---

## 7. Data Architecture

### Existing (Neon Postgres, keep as-is)

```
users (id, fingerprint, created_at)
sessions (id, user_id, session_type, status, started_at, completed_at)
answers (id, session_id, user_id, question_id, value_text, answered_at)
profiles (id, user_id, test_type, profile_data, created_at)
```

### New Tables

```
telegram_users (
  id uuid PRIMARY KEY,
  telegram_id bigint UNIQUE NOT NULL,
  telegram_username text,
  telegram_first_name text,
  user_id uuid REFERENCES users(id),  -- link to existing users table
  referrer_id uuid,  -- who referred this user
  created_at timestamptz DEFAULT now()
)

payments (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  telegram_payment_charge_id text,
  product text NOT NULL,  -- 'full_scan', 'couples'
  amount_stars integer,
  status text DEFAULT 'completed',
  created_at timestamptz DEFAULT now()
)

bot_messages (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  message_type text NOT NULL,  -- 'welcome', 'reminder', 'insight', 'upsell'
  sent_at timestamptz DEFAULT now(),
  -- prevents duplicate sends
  UNIQUE(user_id, message_type, sent_at::date)
)
```

### Web App Status

Web app (psyche-scan.vercel.app) continues to operate for SEO and organic traffic. Mini App is the primary product for Telegram users. These are separate user pools on MVP — no account linking needed. Web users have fingerprint-based IDs, Telegram users have telegram_id-based IDs.

Future: link accounts via email or phone if needed.

---

## 7.1. API Endpoints

### TMA Endpoints (Mini App)

**POST /api/tma/auth**
Validate Telegram initData, return or create user, return session token.
- Request: `{ initData: string }`
- Response: `{ userId: string, token: string, isNewUser: boolean }`
- Creates `telegram_users` + `users` record if new

**POST /api/tma/answers**
Save answers (same logic as existing `/api/answers` but with TMA auth).
- Request: `{ sessionId: string, answers: Answer[] }` + Authorization header
- Validates TMA session token before saving

**GET /api/tma/results?userId=X**
Get results. Checks auth + payment status server-side.
- Free users: returns 3 unlocked screens, 6 screens return `locked: true` (no data sent, not just blurred)
- Paid users: returns all screens + full report data

**POST /api/tma/payment/verify**
Verify Telegram Stars payment after successful_payment update from bot.
- Request: `{ telegramPaymentChargeId: string }`
- Verifies payment in `payments` table, unlocks full content

**GET /api/tma/progress?userId=X**
Get test progress for bot messages.
- Response: `{ freeTestCompleted: boolean, fullScanSessions: { completed: number, total: 9 }, lastActivity: string }`

### Bot Endpoint

**POST /api/bot/webhook**
grammY webhook endpoint. Receives all bot updates from Telegram.
- Validates webhook secret token
- Handles: /start, message replies, successful_payment, pre_checkout_query

---

## 8. Security

### initData Validation
Every TMA API call must validate Telegram initData using `@telegram-apps/init-data-node`. Extract `telegram_id` from validated initData server-side — never trust client-sent user IDs.

### Bot Webhook Verification
Bot webhook endpoint (`/api/bot/webhook`) verifies the `X-Telegram-Bot-Api-Secret-Token` header via grammY's built-in webhook secret token mechanism.

### Payment Security
Server-side payment status check before serving full report data. The `/api/tma/results` endpoint checks the `payments` table — locked content is not sent to the client at all (not just visually blurred). Client-side blur is only a UX hint, not a security boundary.

### User Identity
Telegram user ID is always extracted from validated initData on the server, never from client-sent parameters or localStorage. This prevents impersonation.

---

## 9. Edge Cases

### Mini App Closed Mid-Test
Resume from localStorage — existing pattern from web app. `psyche_free_answers` and `psyche_free_index` keys persist across sessions. On reopen, Mini App checks localStorage and offers to continue.

### Payment Failure
Show error screen with retry button in Mini App. Bot sends a follow-up message (1 hour later): "Похоже оплата не прошла. Попробовать ещё раз?" with WebApp button. Payment state tracked in `payments` table with status `failed`.

### Claude API Timeout
Show fallback result — existing pattern from web app. If Claude doesn't respond within 30s, show a generic result based on scoring data (pattern + scales) without AI-generated text. Offer to retry generation later.

### User Blocks Bot After Paying
Paid content remains accessible in Mini App — Mini App doesn't depend on bot being active. User can always open Mini App directly via `t.me/PsycheScanBot/app` link. Payment status lives in DB, not in bot state.

### Rate Limiting Bot Messages
Max 1 bot message per 2-3 days. Deduplicate via `bot_messages` table with `UNIQUE(user_id, message_type, sent_at::date)` constraint. Cron job checks this table before sending any re-engagement message.

---

## 10. MVP Scope

### MVP-1: Viral Loop Validation (2-3 weeks)

Goal: validate that free test → share card → new users loop works in Telegram.

**Mini App:**
- [ ] Add @telegram-apps/sdk-react + TelegramUI to existing Next.js project
- [ ] TMA routes: `/tma/free/test`, `/tma/free/result`
- [ ] Free test (25 questions, swipe cards) — reuse FreeQuestionCard
- [ ] Analysis animation — reuse AnalysisAnimation
- [ ] Results (9 screens, 3 unlocked + 6 blurred) — reuse ResultScreen
- [ ] Share card (1080x1920 + shareStory API)
- [ ] Upsell screen (no payment yet — "Скоро" or waitlist)

**Bot:**
- [ ] grammY webhook on Vercel (`/api/bot/webhook`)
- [ ] /start onboarding flow (<0.5 sec first message)
- [ ] WebApp button to open Mini App
- [ ] Post-test message with pattern name
- [ ] Basic re-engagement (day 1, 3)

**Backend:**
- [ ] POST /api/tma/auth — initData validation + user creation
- [ ] POST /api/tma/answers — save answers with TMA auth
- [ ] GET /api/tma/results — results with locked screens
- [ ] Deep link referral tracking (`ref_{userId}`)

**Not in MVP-1**: payments, full scan, full report, PDF, progress tracking.

### MVP-2: Monetization (3-4 weeks, after MVP-1 proves traction)

Build only after MVP-1 metrics confirm viral loop works (share rate >15%, organic growth visible).

**Mini App:**
- [ ] Telegram Stars payment flow
- [ ] Full scan (9 sessions, 344 questions) — reuse QuestionCard
- [ ] Full interactive report (15 screens)
- [ ] PDF download
- [ ] AI profile copy

**Bot:**
- [ ] Progress tracking messages (session completion)
- [ ] Re-engagement messages (day 7, 14)
- [ ] Upsell after free test (context-aware via Claude)
- [ ] Payment confirmation message

**Backend:**
- [ ] POST /api/tma/payment/verify
- [ ] GET /api/tma/progress
- [ ] Cron for re-engagement messages
- [ ] Server-side payment checks on results endpoint

### OUT (post-MVP)

- Couples/comparison report
- AI coach mode (Claude conversations about profile)
- Subscription model
- Referral rewards program
- Retesting after 3 months
- Gamification (streaks, achievements)
- Community channel
- Ads monetization
- Multi-language support

---

## 11. Launch Strategy

### Phase 1: Soft launch (Week 1-2)
- Deploy bot + Mini App
- Test with 10-20 people manually
- Fix bugs, tune UX

### Phase 2: Seed (Week 3-4)
- Post in 5-10 psychology Telegram channels
- Ask 50 people to pass test and share
- Collect feedback, iterate

### Phase 3: Growth (Month 2+)
- Psychology bloggers/influencers pass test on camera
- TikTok/Reels: "AI прочитал меня за 5 минут"
- Organic viral through share cards
- Telegram Ads (when unit economics proven)

---

## 12. Success Metrics

| Metric | Target (Month 1) | Target (Month 3) |
|--------|------------------|-------------------|
| Free test completions | 500 | 5,000 |
| Free → Paid conversion | 3% | 5% |
| Revenue | 10K₽ | 100K₽ |
| Share rate (% who share card) | 20% | 30% |
| D7 retention (return to bot) | 15% | 25% |
| Avg session completion rate | 80% | 90% |
