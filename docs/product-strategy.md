# Psyche Scan — Product Strategy & Go-To-Market

> Синтез 5 deep research документов → единый план действий.
> Дата: 2026-03-24

---

## 1. ПОЗИЦИОНИРОВАНИЕ

### Одно предложение
**Первый AI-powered психологический профиль в Telegram — глубже чем 16Personalities, красивее чем терапия, бесплатнее чем $174/сессия.**

### Почему именно сейчас
- Рынок personality assessment = **$10B**, CAGR 12.5%
- **500M людей** уже используют Telegram Mini Apps
- **Нет ни одного** personality test TMA с хорошим UX — ниша пуста
- 16Personalities набрал **1B+ тестов** на веб — представь это внутри Telegram с нативным шерингом
- Personality контент на TikTok **+55% YoY** — спрос растёт

### Конкурентное преимущество
| Они | Мы |
|-----|-----|
| Статичные quiz-боты (BIG5_rubot, psyctestbot) | AI-генерированный нарратив, персонализированный под ответы |
| MBTI = 4 буквы | 22+ клинических фреймворка, парадоксы, сценарии |
| Текстовый вывод | Cinematic wow-экраны, sharable карточки |
| Нет вирусности | Telegram Stories, inline mode, реферальная система |
| Depth Profile = dev-tool ($19, уродливый) | Премиум дизайн + доступная цена |

### Ключевой инсайт
> **Identity > Accuracy.** Людям нужен не тест — им нужен **язык для себя**. Словарь чтобы объяснить "почему я опять так делаю". Мы даём этот словарь.

---

## 2. ПРОДУКТОВАЯ АРХИТЕКТУРА

### Три слоя

```
┌─────────────────────────────────────────────────┐
│  СЛОЙ 1: BOT (grammY)                          │
│  • /start → интрига за 0.5 сек                 │
│  • Кнопка "Пройти тест" → открывает Mini App   │
│  • Re-engagement: daily insights, streaks       │
│  • Реферальные ссылки t.me/PsycheScanBot?start= │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│  СЛОЙ 2: MINI APP (Next.js / Vite + React)      │
│  • Onboarding → 25 вопросов → wow-результат     │
│  • 3 экрана бесплатно, 6 заблюрены (paywall)   │
│  • Оплата через Telegram Stars ($19 = ~1461⭐)  │
│  • Share to Stories, inline mode                │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│  СЛОЙ 3: WEB (psyche-scan.vercel.app)           │
│  • SEO-лендинг для органического трафика        │
│  • Full Scan (344 вопроса) для deep users       │
│  • Общий бэкенд с TMA                          │
└─────────────────────────────────────────────────┘
```

### Воронка пользователя

```
Telegram канал / Stories / реферал / бот
         │
         ▼
   /start в боте (0.5 сек ответ)
   "Привет, {имя}. Я знаю о тебе больше,
    чем ты думаешь. 3 минуты — и докажу."
         │
         ▼
   [🔬 Пройти тест] → Mini App открывается
         │
         ▼
   25 ситуативных вопросов (forced choice)
   + micro-revelations после Q8 и Q16
   "Уже вижу кое-что интересное..."
         │
         ▼
   Анимация анализа (4.5 сек, dopamine)
         │
         ▼
   ЭКРАН 1: Твой паттерн (hero moment)
   ЭКРАН 2: Узнавание ("это же я!")
   ЭКРАН 3: Предсказание (screenshot moment)
   ─── PAYWALL ───
   ЭКРАН 4-9: заблюрены → "Разблокируй за 699₽"
         │
    ┌────┴────┐
    │         │
    ▼         ▼
  ПЛАТИТ    НЕ ПЛАТИТ
  (5%)      (95%)
    │         │
    ▼         ▼
  9 экранов  Share карточка → вирусный луп
  + PDF      + бот шлёт инсайты → возврат
```

---

## 3. МОНЕТИЗАЦИЯ

### Ценовая модель

| Tier | Цена | Что входит | Цель |
|------|------|-----------|------|
| **Free** | 0₽ | 25 вопросов + 3 wow-экрана + sharable карточка | Вирусность, top of funnel |
| **Full Report** | 699₽ (~$7) / 539⭐ | Все 9 экранов + PDF + AI export для ChatGPT | Основной revenue |
| **Deep Scan** | 1990₽ (~$19) / 1461⭐ | 344 вопроса + 20-страничный Personality Passport | Premium |
| **Couples** | 990₽ (~$10) | Два профиля + сравнение + "как общаться" | Expansion |

### Unit Economics (цель: 100K MAU)

| Метрика | Значение |
|---------|----------|
| MAU | 100,000 |
| Free → Full Report conversion | 5% = 5,000 платящих |
| ARPU (Full Report) | 699₽ (~$7) |
| Monthly Revenue | **$35,000** |
| + Deep Scan (1% of MAU) | 1,000 × $19 = **$19,000** |
| + Ads (free users, rewarded video) | 95K × 3 sessions × $1 CPM = **$285** |
| **Total Monthly** | **~$54,000** |

### Оплата
- **Telegram Stars** (обязательно для цифровых товаров в TMA)
- Apple/Google берут ~30% при покупке Stars, но для нас это единственный легальный путь
- Вывод: Stars → Fragment → TON → fiat

---

## 4. ВИРУСНАЯ МЕХАНИКА

### Формула вирусности
```
K-factor = Invites Sent × Conversion Rate
Цель: K > 1.0 (органический рост)
```

### 5 вирусных механик (по приоритету)

**1. Sharable Result Card (день 1)**
- Красивая карточка 1080×1920 для Instagram Stories
- Название паттерна + 3 ключевых trait + провокационная фраза
- QR/ссылка на бота внизу
- Уникальный цвет для каждого паттерна
- Telegram `shareStory` API для нативного шеринга

**2. Inline Mode (неделя 2)**
- Юзер пишет `@PsycheScanBot` в любом чате
- Появляется его карточка результата
- Друг видит карточку + кнопку "Пройди тоже"
- Deep link с реферальным трекингом

**3. Compatibility Check (неделя 3)**
- "Отправь другу — узнаешь вашу совместимость"
- Друг ДОЛЖЕН пройти тест → вирусный луп
- Результат: "Вы — взрывная комбинация: Architect + Empath"

**4. Referral Rewards (неделя 3)**
| Рефералов | Награда |
|-----------|---------|
| 1 друг | "Как тебя видят другие" — мини-отчёт |
| 3 друга | Compatibility Check бесплатно |
| 5 друзей | Shadow Profile — скрытые черты |
| 10 друзей | Full Report бесплатно (вместо 699₽) |

**5. Group Feature (месяц 2)**
- Добавь бота в групповой чат
- `/compare` — сравнение типов всех участников
- Генерирует групповую динамику

---

## 5. RETENTION & RE-ENGAGEMENT

### Проблема
TMA retention значительно ниже мобильных приложений:
- Day 1: 15-20% (хорошо: 25-35%)
- Day 7: 8-10% (хорошо: 15-20%)
- Day 30: 3-5% (хорошо: 8-12%)

### Решение: Бот как канал возврата

| Когда | Сообщение | Цель |
|-------|-----------|------|
| +1 час (не закончил) | "Твой анализ на 60%. Результаты становятся интереснее..." | Завершить тест |
| +24 часа | "Заметил кое-что в твоём профиле. Хочу показать." | Возврат |
| +3 дня | "У твоего типа есть скрытая суперсила. Хочешь узнать?" | Upsell |
| +7 дней | "На этой неделе 2,847 людей узнали свой тип. {X}% совпали с тобой." | Social proof |
| +14 дней | "Обновил анализ. Хочешь проверить, изменился ли профиль?" | Re-test |

### Streak System
- Ежедневный "инсайт дня" по твоему типу через бота
- 3-дневный streak → разблокирует hidden trait
- 7-дневный streak → compatibility analysis
- 30-дневный streak → полная growth roadmap

### Home Screen
- После позитивного опыта → prompt "Добавь на главный экран"
- Увеличивает return rate в 2-3 раза

---

## 6. ONBOARDING — ПЕРВЫЕ 10 СЕКУНД

### Текущий /start (в плане)
```
Привет 👋
...пауза 1 сек...
Я Psyche — помогу тебе понять как ты устроен.
```

### Улучшенный /start (на основе research)
```
СЕКУНДА 0.0: sendChatAction("typing")
СЕКУНДА 0.3:

"Привет, {firstName}.

Я знаю о тебе больше, чем ты думаешь.
Не кто ты по гороскопу. Не 4 буквы MBTI.

А почему ты реагируешь ТАК, а не иначе.
И что с этим делать.

3 минуты. Без регистрации."

[🔬 Доказать] [Как это работает?]
```

### Принципы
1. **Первое сообщение < 0.5 сек** — sendChatAction сразу на /start
2. **Имя с первой строки** — Telegram даёт бесплатно
3. **Интрига, не инструкция** — "я знаю о тебе" > "добро пожаловать в бот"
4. **Конкретное время** — "3 минуты" снижает anxiety
5. **Одна кнопка** — не давать выбор, давать действие

### Micro-Revelations (во время теста)
Не ждать конца — давать мини-инсайты по ходу:

**После вопроса 8:**
> "Интересно. По первым ответам уже вижу — ты принимаешь решения эмоционально, а потом рационализируешь. Угадал?"

**После вопроса 16:**
> "Необычная комбинация. Только 4% людей отвечают на вопросы 3 и 7 так же как ты. Это говорит кое-что о том, как ты справляешься с потерями."

Это создаёт "whoa effect" ДО результатов.

---

## 7. РЕЗУЛЬТАТ — КАК ВЫЗВАТЬ "HOLY SHIT, ЭТО ЖЕ Я"

### Анти-Barnum правило
Каждое утверждение должно быть **достаточно конкретным, чтобы быть неправильным**. Если описание подходит всем — оно бесполезно.

### Спектр специфичности (от плохого к убийственному)

| Уровень | Пример | Эффект |
|---------|--------|--------|
| Barnum | "Ты творческий человек" | 🙄 |
| Trait | "Ты склонен к интроверсии" | Meh |
| Quantified | "87-й перцентиль по интроверсии" | Интересно |
| Behavioral | "Ты перезаряжаешься отменяя планы — и потом чувствуешь вину" | Узнавание |
| Scenario | "Когда звонит телефон, первый инстинкт — не брать. Даже если звонит тот, кого ты любишь." | "Это я!" |
| **Paradox** | "Ты жаждешь глубокой связи, но систематически избегаешь уязвимости, которая для этого нужна" | **Holy shit** |

### Формула для AI-промпта
Для каждого измерения давать **3 слоя**:
1. **Число**: "Нейротизм: 78-й перцентиль"
2. **Перевод**: "Ты переживаешь эмоции интенсивнее большинства"
3. **Сцена**: "Когда что-то идёт не так на работе, другие забывают к обеду. Ты прокручиваешь в 2 ночи, ища что можно было сделать иначе."

### Секретное оружие: Score Interactions
Магия — в КОМБИНАЦИЯХ, не одиночных шкалах:
- High Openness + Low Agreeableness = "У тебя сильные мнения И готовность их высказать, даже когда никто не спрашивал"
- High Conscientiousness + High Neuroticism = "Ты организован потому что хаос тебя пугает, а не потому что любишь планировать"
- Low Extraversion + High Openness = "Ты хочешь rich experiences, но предпочитаешь их в одиночестве или с одним тщательно выбранным человеком"

### Текстовые паттерны

**Opener (CliftonStrengths style):**
> "Скорее всего, ты..."

**Emotional anchor (Schema Therapy):**
> Ты чувствуешь [эмоцию]. Это заставляет тебя [поведение]. Ирония в том, что [поведение] часто создаёт именно тот [результат], которого ты пытаешься избежать.

**Motivation-first (Enneagram):**
> В глубине ты хочешь [желание]. Не даёт спать страх [страх]. Это толкает тебя к [поведение] — что для других выглядит как [наблюдаемое], но внутри ощущается как [внутреннее переживание].

**"Никто тебе этого не говорил":**
> "Ты не ленивый — ты истощён от поддержания персоны, которая требует постоянной энергии."
> "Это не проблемы с обязательствами — это зависимость от определённости. Тебе нужно знать что получится, прежде чем начинать."

---

## 8. ДИЗАЙН & UX

### TMA-специфичные правила
1. **Mobile-first всегда** — дизайн под 375px
2. **Safe areas** — использовать `contentSafeArea` и `safeArea` из API
3. **Theme colors** — `var(--tg-theme-bg-color)` и т.д. для нативного вида
4. **BackButton** — только Telegram API, не кастомный
5. **MainButton** — для основного CTA ("Получить результат", "Оплатить")
6. **Нет horizontal scroll у краёв** — iOS edge swipe = закрытие приложения
7. **Haptic feedback** — тактильный отклик на выбор ответа

### Стек для TMA

| Слой | Технология |
|------|-----------|
| UI Framework | `@telegram-apps/sdk-react` v3 |
| Components | `@telegram-apps/telegram-ui` (Telegram-native) |
| Animations | Framer Motion (уже есть) |
| Bot | grammY (TypeScript) |
| Backend | Next.js API routes (shared с web) |
| DB | Neon Postgres (уже есть) |
| Cache | Upstash Redis (sessions, streaks) |
| Payments | Telegram Stars |

### Performance targets
| Метрика | Цель |
|---------|------|
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| Bundle | < 200KB initial |
| First message | < 0.5s |
| AI result | < 5s после последнего вопроса |

---

## 9. LAUNCH STRATEGY

### Phase 0: Pre-Launch (1 неделя)
- [ ] Создать бота через @BotFather (`@PsycheScanBot`)
- [ ] Создать Telegram канал `@psychescan` — начать build in public
- [ ] Сгенерировать 10 example result cards для разных паттернов
- [ ] Посеять в 3-5 психологических каналах (тизер)
- [ ] FOMO: "Первые 1,000 пользователей получат полный отчёт бесплатно"

### Phase 1: MVP (2-3 недели) — CORE LOOP
- [ ] Bot: /start → интрига → кнопка Mini App
- [ ] TMA: 25 вопросов → 3 бесплатных wow-экрана
- [ ] Paywall: 6 заблюренных экранов → Stars payment
- [ ] Share: карточка для Stories
- [ ] Referral: deep links с трекингом

**Критерии успеха Phase 1:**
- /start → completion rate > 70%
- Время прохождения < 5 минут
- Share rate > 20%
- K-factor > 0.5

### Phase 2: Monetization (неделя 4)
- [ ] Telegram Stars integration ($7 = 539⭐ за Full Report)
- [ ] Paywall UX: blur + "48 часов до удаления результатов" (urgency)
- [ ] Rewarded video ads для бесплатных юзеров (Adsgram)
- [ ] A/B test: $7 vs $10 vs $14

**Критерии успеха Phase 2:**
- Free → Paid conversion > 3%
- Payment completion rate > 80%

### Phase 3: Retention & Virality (недели 5-8)
- [ ] Daily insights через бота (персонализированные по типу)
- [ ] Streak system (3-7-30 дней)
- [ ] Compatibility Check (friend must take test = viral loop)
- [ ] Inline mode (@PsycheScanBot в любом чате)
- [ ] Referral rewards (1/3/5/10 друзей)

**Критерии успеха Phase 3:**
- Day 7 retention > 15%
- K-factor > 1.0
- 10K MAU

### Phase 4: Scale (месяц 3+)
- [ ] Telegram Ads (после установки organic baseline)
- [ ] Influencer partnerships (серия постов, не одиночный)
- [ ] Couples Report ($10)
- [ ] Deep Scan upsell (344 вопроса, $19)
- [ ] Group feature (/compare в групповых чатах)
- [ ] Type-specific Telegram группы ("Зал Архитекторов")

**Цель Phase 4:**
- 100K MAU
- $50K+ MRR

---

## 10. ТЕХНИЧЕСКИЙ ПЛАН ИМПЛЕМЕНТАЦИИ

### Что уже готово ✅
- Landing page (8 секций, deployed)
- Free тест (25 вопросов, scoring, 9 экранов результата)
- Full Scan (344 вопроса, 9 сессий)
- AI prompt (Claude API, structured JSON)
- Neon DB (users, sessions, answers, profiles)
- PDF отчёт (free 8 стр + full 20 стр)
- Vercel deploy (auto from GitHub)

### Что нужно построить 🔨

**Backend (3-4 дня):**
1. Bot webhook handler (grammY + Next.js API route)
2. TMA auth (initData validation)
3. TMA API routes (auth, answers, results)
4. DB migration (telegram_users, bot_messages, payments)
5. Redis для sessions/streaks (Upstash)

**Frontend TMA (4-5 дней):**
1. TMA Provider + Layout (SDK init)
2. Onboarding page
3. Free test page (reuse FreeQuestionCard)
4. Result page (3 open + 6 blurred)
5. BlurredScreen component
6. Payment flow (Stars)
7. Share integration (Stories + inline)

**Bot (2-3 дня):**
1. /start flow с интригой
2. Micro-revelations (Q8, Q16 callbacks)
3. Re-engagement messages (cron)
4. Referral tracking
5. Inline mode (result card preview)

**Polish (2-3 дня):**
1. Result card image generation (server-side)
2. Haptic feedback на ответах
3. Performance optimization (< 200KB bundle)
4. Analytics (funnel tracking)
5. A/B test infrastructure для paywall

### Общий таймлайн: ~2-3 недели до MVP

---

## 11. КЛЮЧЕВЫЕ РЕШЕНИЯ

### Решение 1: Vite vs Next.js для TMA
**Решение: Next.js** (shared codebase с web version)
- API routes уже написаны
- Один deploy на Vercel
- SSR не нужен в TMA, но код шарится
- Компромисс: чуть больший bundle, но меньше инфраструктуры

### Решение 2: Цена $7 vs $19
**Решение: $7 (699₽) за Free Report, $19 за Deep Scan**
- $7 = импульсная покупка, не нужно думать
- $19 = premium tier для мотивированных
- Тестировать A/B

### Решение 3: Сколько экранов бесплатно?
**Решение: 3 из 9**
- Экран 1 (Pattern reveal) — hero moment, self-identification
- Экран 2 (Recognition) — "this is me!" описания
- Экран 3 (Prediction) — screenshot moment, самый shareable
- Экраны 4-9 — заблюрены (origin, shadow, actions, AI export, locked, share)
- 3 экрана дают достаточно wow чтобы шерить, но недостаточно чтобы не хотеть больше

### Решение 4: Bot-first vs Mini App-first
**Решение: Hybrid** — Bot для entry + re-engagement, Mini App для test + results
- Bot = нулевой friction (/start)
- Mini App = rich UI для тестирования
- Bot = push notifications для возврата

---

## 12. METRICS & SUCCESS CRITERIA

### North Star Metric
**Количество завершённых тестов в день** (leading indicator для revenue и virality)

### Funnel Metrics

| Шаг | Метрика | Target |
|-----|---------|--------|
| /start → Open Mini App | CTR | > 60% |
| Open → Start test | Activation | > 80% |
| Start → Complete test | Completion | > 70% |
| Complete → Share | Virality | > 20% |
| Complete → Pay | Conversion | > 3-5% |
| Share → Friend /start | Referral | > 10% |
| Day 1 retention | Return | > 25% |
| Day 7 retention | Habit | > 15% |

### Revenue Milestones

| Milestone | MAU | MRR | Timeline |
|-----------|-----|-----|----------|
| Validation | 1K | $350 | Month 1 |
| Traction | 10K | $3,500 | Month 2-3 |
| Growth | 50K | $17,500 | Month 4-6 |
| Scale | 100K | $50,000 | Month 6-12 |

---

## SOURCES

Синтезировано из:
1. `docs/telegram-bot-research.md` — 790 строк, боты + вирусность + монетизация
2. `docs/telegram-miniapp-research.md` — 690 строк, TMA рынок + стек + UX
3. `docs/positioning-research.md` — 90 строк, конкуренты + ниша
4. `docs/report-wow-effect-research.md` — 357 строк, нейронаука + текстовые паттерны
5. `docs/design-inspiration.md` — 606 строк, дизайн + scroll-техники
