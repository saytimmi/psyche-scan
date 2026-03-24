# MVP-1: Telegram Bot + Mini App — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Launch a Telegram bot + Mini App that lets users take the free personality test (25 questions) inside Telegram, see wow-results, and share their pattern with friends. Validate viral loop.

**Architecture:** Add TMA SDK to existing Next.js app (one codebase, one deploy on Vercel). New `/tma/*` routes for Mini App pages. New `/api/tma/*` routes for TMA-specific backend. New `/api/bot/webhook` for grammY bot. Reuse existing components (FreeQuestionCard, ResultScreen, etc.) with TMA-aware wrappers.

**Tech Stack:** Next.js 16, @telegram-apps/sdk-react, @telegram-apps/telegram-ui, grammY, Neon Postgres, Framer Motion, Vercel

**Spec:** `docs/superpowers/specs/2026-03-24-telegram-bot-miniapp-design.md`

---

## File Structure

### New Files

```
src/
├── app/
│   ├── tma/                           # TMA routes (Mini App pages)
│   │   ├── layout.tsx                 # TMA layout — inits SDK, no SmoothScroll
│   │   ├── page.tsx                   # TMA landing/onboarding
│   │   ├── free/
│   │   │   ├── test/page.tsx          # Free test in TMA (reuses FreeQuestionCard)
│   │   │   └── result/page.tsx        # Results in TMA (reuses ResultScreen)
│   │   └── components/
│   │       ├── TmaProvider.tsx        # TMA SDK initialization wrapper
│   │       └── BlurredScreen.tsx      # Blurred result screen with upsell overlay
│   │
│   └── api/
│       ├── tma/
│       │   ├── auth/route.ts          # Validate initData, create/return user
│       │   ├── answers/route.ts       # Save answers with TMA auth
│       │   └── results/route.ts       # Get results (locked/unlocked)
│       └── bot/
│           └── webhook/route.ts       # grammY webhook handler
│
├── lib/
│   ├── tma-auth.ts                    # initData validation + token utils
│   └── bot.ts                         # grammY bot instance + handlers
│
└── (existing files — no changes needed for MVP-1)
```

### Modified Files

```
package.json                           # Add: grammy, @telegram-apps/sdk-react, @telegram-apps/telegram-ui, @telegram-apps/init-data-node
neon/migration.sql                     # Add: telegram_users, bot_messages tables
.env.local                             # Add: BOT_TOKEN, BOT_WEBHOOK_SECRET
```

---

## Chunk 1: Backend Foundation

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install TMA + bot packages**

```bash
cd /Users/timur/psyche-scan
npm install grammy @telegram-apps/sdk-react @telegram-apps/telegram-ui @telegram-apps/init-data-node
```

- [ ] **Step 2: Verify build still passes**

```bash
npm run build 2>&1 | tail -5
```

Expected: `✓ Generating static pages`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "deps: add grammy, telegram-apps SDK, TelegramUI, init-data-node"
```

---

### Task 2: Database migration — telegram_users + bot_messages

**Files:**
- Modify: `neon/migration.sql`
- Create: `neon/migration-v2.sql`

- [ ] **Step 1: Create migration file**

Create `neon/migration-v2.sql`:
```sql
-- Telegram users (linked to existing users table)
CREATE TABLE IF NOT EXISTS telegram_users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  telegram_id bigint UNIQUE NOT NULL,
  telegram_username text,
  telegram_first_name text,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  referrer_telegram_id bigint,
  created_at timestamptz DEFAULT now()
);

-- Bot message deduplication
CREATE TABLE IF NOT EXISTS bot_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  telegram_id bigint NOT NULL,
  message_type text NOT NULL,
  sent_at timestamptz DEFAULT now(),
  UNIQUE(telegram_id, message_type, (sent_at::date))
);

CREATE INDEX IF NOT EXISTS idx_telegram_users_tid ON telegram_users(telegram_id);
CREATE INDEX IF NOT EXISTS idx_bot_messages_tid ON bot_messages(telegram_id);
```

- [ ] **Step 2: Apply migration to Neon**

```bash
node -e "
const { Client } = require('@neondatabase/serverless');
const fs = require('fs');
async function run() {
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();
  await client.query(fs.readFileSync('neon/migration-v2.sql', 'utf8'));
  await client.end();
  console.log('Migration v2 applied');
}
run().catch(e => console.error(e.message));
"
```

Expected: `Migration v2 applied`

- [ ] **Step 3: Verify tables exist**

```bash
node -e "
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
sql\`SELECT tablename FROM pg_tables WHERE schemaname = 'public'\`.then(r => console.log(r.map(t => t.tablename).join(', ')));
"
```

Expected: `users, sessions, answers, profiles, telegram_users, bot_messages`

- [ ] **Step 4: Commit**

```bash
git add neon/migration-v2.sql
git commit -m "db: add telegram_users and bot_messages tables"
```

---

### Task 3: TMA auth library

**Files:**
- Create: `src/lib/tma-auth.ts`

- [ ] **Step 1: Create TMA auth utilities**

Create `src/lib/tma-auth.ts`:
```typescript
import { validate, parse } from "@telegram-apps/init-data-node";
import { getDb } from "./db";

const BOT_TOKEN = process.env.BOT_TOKEN!;

export interface TmaUser {
  id: string;        // internal user UUID
  telegramId: number;
  username: string | null;
  firstName: string | null;
}

/**
 * Validate Telegram initData and return/create user.
 * Throws if initData is invalid or expired.
 */
export async function authenticateTma(initDataRaw: string): Promise<TmaUser> {
  // Validate initData signature (throws if invalid)
  validate(initDataRaw, BOT_TOKEN, { expiresIn: 3600 });

  // Parse to get user info
  const initData = parse(initDataRaw);
  const tgUser = initData.user;
  if (!tgUser) throw new Error("No user in initData");

  const sql = getDb();

  // Check if telegram user exists
  const existing = await sql`
    SELECT tu.id, tu.telegram_id, tu.telegram_username, tu.telegram_first_name, tu.user_id
    FROM telegram_users tu
    WHERE tu.telegram_id = ${tgUser.id}
  `;

  if (existing.length > 0) {
    return {
      id: existing[0].user_id,
      telegramId: tgUser.id,
      username: existing[0].telegram_username,
      firstName: existing[0].telegram_first_name,
    };
  }

  // Create new user + telegram_user
  const userRows = await sql`
    INSERT INTO users (fingerprint)
    VALUES (${`tg_${tgUser.id}`})
    RETURNING id
  `;
  const userId = userRows[0].id;

  await sql`
    INSERT INTO telegram_users (telegram_id, telegram_username, telegram_first_name, user_id)
    VALUES (${tgUser.id}, ${tgUser.username || null}, ${tgUser.firstName || null}, ${userId})
  `;

  return {
    id: userId,
    telegramId: tgUser.id,
    username: tgUser.username || null,
    firstName: tgUser.firstName || null,
  };
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/tma-auth.ts
git commit -m "feat: add TMA auth library with initData validation"
```

---

### Task 4: TMA API routes

**Files:**
- Create: `src/app/api/tma/auth/route.ts`
- Create: `src/app/api/tma/answers/route.ts`
- Create: `src/app/api/tma/results/route.ts`

- [ ] **Step 1: Create auth endpoint**

Create `src/app/api/tma/auth/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { authenticateTma } from "@/lib/tma-auth";

export async function POST(request: NextRequest) {
  try {
    const { initData } = await request.json();
    if (!initData) {
      return NextResponse.json({ error: "initData required" }, { status: 400 });
    }
    const user = await authenticateTma(initData);
    return NextResponse.json({
      userId: user.id,
      telegramId: user.telegramId,
      firstName: user.firstName,
      isNewUser: false, // TODO: track this properly
    });
  } catch (err) {
    console.error("TMA auth error:", err);
    const msg = err instanceof Error ? err.message : "Auth failed";
    return NextResponse.json({ error: msg }, { status: 401 });
  }
}
```

- [ ] **Step 2: Create answers endpoint**

Create `src/app/api/tma/answers/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { authenticateTma } from "@/lib/tma-auth";
import { getDb } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { initData, sessionType, answers } = await request.json();
    if (!initData || !sessionType || !answers) {
      return NextResponse.json({ error: "initData, sessionType, answers required" }, { status: 400 });
    }

    const user = await authenticateTma(initData);
    const sql = getDb();

    // Create session
    const sessionRows = await sql`
      INSERT INTO sessions (user_id, session_type)
      VALUES (${user.id}, ${sessionType})
      RETURNING id
    `;
    const sessionId = sessionRows[0].id;

    // Insert answers
    for (const [questionId, value] of Object.entries(answers)) {
      await sql`
        INSERT INTO answers (session_id, user_id, question_id, value_text)
        VALUES (${sessionId}, ${user.id}, ${questionId}, ${String(value)})
        ON CONFLICT (session_id, question_id) DO UPDATE SET value_text = ${String(value)}
      `;
    }

    // Mark complete
    await sql`
      UPDATE sessions SET status = 'completed', completed_at = now()
      WHERE id = ${sessionId}
    `;

    return NextResponse.json({ sessionId, answersCount: Object.keys(answers).length });
  } catch (err) {
    console.error("TMA answers error:", err);
    return NextResponse.json({ error: "Failed to save answers" }, { status: 500 });
  }
}
```

- [ ] **Step 3: Create results endpoint (with locked screens)**

Create `src/app/api/tma/results/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { authenticateTma } from "@/lib/tma-auth";
import { getDb } from "@/lib/db";

export async function GET(request: NextRequest) {
  const initData = request.nextUrl.searchParams.get("initData");
  if (!initData) {
    return NextResponse.json({ error: "initData required" }, { status: 400 });
  }

  try {
    const user = await authenticateTma(initData);
    const sql = getDb();

    // Get latest free profile
    const profiles = await sql`
      SELECT profile_data FROM profiles
      WHERE user_id = ${user.id} AND test_type = 'free'
      ORDER BY created_at DESC LIMIT 1
    `;

    if (profiles.length === 0) {
      return NextResponse.json({ profile: null });
    }

    const profileData = profiles[0].profile_data;

    // Check payment status (MVP-1: always unpaid)
    const hasPaid = false; // TODO MVP-2: check payments table

    return NextResponse.json({
      profile: profileData,
      hasPaid,
      // Screens 1-3 unlocked, 4-9 locked for free users
      unlockedScreens: hasPaid ? 9 : 3,
    });
  } catch (err) {
    console.error("TMA results error:", err);
    return NextResponse.json({ error: "Failed to get results" }, { status: 500 });
  }
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build 2>&1 | tail -10
```

Expected: All TMA routes appear as `ƒ` (Dynamic)

- [ ] **Step 5: Commit**

```bash
git add src/app/api/tma/
git commit -m "feat: add TMA API routes (auth, answers, results)"
```

---

### Task 5: Bot webhook + /start flow

**Files:**
- Create: `src/lib/bot.ts`
- Create: `src/app/api/bot/webhook/route.ts`

- [ ] **Step 1: Create bot instance**

Create `src/lib/bot.ts`:
```typescript
import { Bot, webhookCallback } from "grammy";

const BOT_TOKEN = process.env.BOT_TOKEN!;

export const bot = new Bot(BOT_TOKEN);

// /start command — <0.5 sec response, no DB calls
bot.command("start", async (ctx) => {
  // Extract referral if present: /start ref_xxx
  const startParam = ctx.match;
  if (startParam?.startsWith("ref_")) {
    // TODO: save referrer_telegram_id in telegram_users
  }

  await ctx.reply("Привет 👋");

  // Second message after brief pause
  await new Promise((r) => setTimeout(r, 1000));

  await ctx.reply(
    "Я Psyche — помогу тебе понять как ты устроен.\n\n" +
    "Не 4 буквы как в MBTI. А конкретно:\n" +
    "— почему ты реагируешь так а не иначе\n" +
    "— какие убеждения из детства управляют тобой сейчас\n" +
    "— что с этим делать\n\n" +
    "5 минут, 25 ситуаций. Без регистрации.",
    {
      reply_markup: {
        inline_keyboard: [[
          { text: "🔬 Пройти тест", web_app: { url: `${process.env.NEXT_PUBLIC_APP_URL}/tma` } }
        ]]
      }
    }
  );
});

// Handle any text message — simple response for MVP-1
bot.on("message:text", async (ctx) => {
  await ctx.reply(
    "Чтобы начать, пройди тест 👇",
    {
      reply_markup: {
        inline_keyboard: [[
          { text: "🔬 Пройти тест", web_app: { url: `${process.env.NEXT_PUBLIC_APP_URL}/tma` } }
        ]]
      }
    }
  );
});

// Export webhook handler for Next.js API route
export const handleWebhook = webhookCallback(bot, "std/http");
```

- [ ] **Step 2: Create webhook API route**

Create `src/app/api/bot/webhook/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { handleWebhook } from "@/lib/bot";

export async function POST(request: NextRequest) {
  // Verify webhook secret
  const secret = request.headers.get("X-Telegram-Bot-Api-Secret-Token");
  if (secret !== process.env.BOT_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return await handleWebhook(request);
  } catch (err) {
    console.error("Bot webhook error:", err);
    return NextResponse.json({ ok: true }); // Always return 200 to Telegram
  }
}
```

- [ ] **Step 3: Add env vars to .env.local**

Add to `.env.local`:
```
BOT_TOKEN=<get from @BotFather>
BOT_WEBHOOK_SECRET=<random string>
NEXT_PUBLIC_APP_URL=https://psyche-scan.vercel.app
```

- [ ] **Step 4: Verify build**

```bash
npm run build 2>&1 | tail -10
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/bot.ts src/app/api/bot/webhook/route.ts
git commit -m "feat: add grammY bot with /start flow and webhook handler"
```

---

## Chunk 2: Mini App Frontend

### Task 6: TMA Provider + Layout

**Files:**
- Create: `src/app/tma/components/TmaProvider.tsx`
- Create: `src/app/tma/layout.tsx`

- [ ] **Step 1: Create TMA Provider**

Create `src/app/tma/components/TmaProvider.tsx`:
```typescript
"use client";

import { useEffect, useState, type ReactNode } from "react";

interface TmaProviderProps {
  children: ReactNode;
}

export function TmaProvider({ children }: TmaProviderProps) {
  const [ready, setReady] = useState(false);
  const [initData, setInitData] = useState<string | null>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    import("@telegram-apps/sdk-react").then(({ init, miniApp, initDataRaw }) => {
      try {
        init();
        miniApp.ready();
        setInitData(initDataRaw() || null);
        setReady(true);
      } catch {
        // Not in Telegram — dev mode
        console.warn("Not in Telegram context, running in dev mode");
        setReady(true);
      }
    });
  }, []);

  if (!ready) {
    return (
      <div className="min-h-dvh bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D2FF00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <TmaContext.Provider value={{ initData }}>
      {children}
    </TmaContext.Provider>
  );
}

// Context for initData access across TMA pages
import { createContext, useContext } from "react";

interface TmaContextValue {
  initData: string | null;
}

const TmaContext = createContext<TmaContextValue>({ initData: null });

export function useTma() {
  return useContext(TmaContext);
}
```

- [ ] **Step 2: Create TMA layout**

Create `src/app/tma/layout.tsx`:
```typescript
import { TmaProvider } from "./components/TmaProvider";

export const metadata = {
  title: "Psyche Scan",
  description: "Узнай как ты устроен",
};

export default function TmaLayout({ children }: { children: React.ReactNode }) {
  return (
    <TmaProvider>
      <div className="min-h-dvh bg-[#0A0A0A] text-white">
        {children}
      </div>
    </TmaProvider>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add src/app/tma/
git commit -m "feat: add TMA layout with SDK provider and context"
```

---

### Task 7: TMA onboarding page

**Files:**
- Create: `src/app/tma/page.tsx`

- [ ] **Step 1: Create onboarding page**

Create `src/app/tma/page.tsx`:
```typescript
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function TmaOnboarding() {
  const router = useRouter();

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-sm"
      >
        <p className="text-[#f97316] text-sm font-medium tracking-widest uppercase mb-6">
          PSYCHE SCAN
        </p>

        <h1 className="text-3xl font-bold text-white mb-4">
          Узнай почему ты такой
        </h1>

        <p className="text-white/60 text-base leading-relaxed mb-3">
          22 клинических теста покажут:
        </p>

        <div className="text-left space-y-2 mb-8">
          {[
            "Почему ты реагируешь так а не иначе",
            "Какие убеждения из детства управляют тобой",
            "Что с этим делать — конкретно",
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="flex items-start gap-2"
            >
              <span className="text-[#D2FF00] mt-0.5">—</span>
              <span className="text-white/80 text-sm">{item}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={() => router.push("/tma/free/test")}
          className="w-full bg-[#D2FF00] text-black font-semibold py-3.5 rounded-xl text-base cursor-pointer hover:brightness-110 transition"
        >
          Начать (5 минут)
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-white/30 text-xs mt-4"
        >
          Бесплатно · Без регистрации · Результат сразу
        </motion.p>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build + test locally**

```bash
npm run build 2>&1 | tail -5
```

Visit `http://localhost:3099/tma` to see the onboarding page.

- [ ] **Step 3: Commit**

```bash
git add src/app/tma/page.tsx
git commit -m "feat: add TMA onboarding page"
```

---

### Task 8: TMA free test page (reuse FreeQuestionCard)

**Files:**
- Create: `src/app/tma/free/test/page.tsx`

- [ ] **Step 1: Create TMA free test page**

Copy the pattern from `src/app/free/test/page.tsx` but add TMA-specific logic:
- Use `useTma()` to get initData
- After completion, save to both localStorage AND Neon via `/api/tma/answers`
- Navigate to `/tma/free/result` instead of `/free/result`

The page reuses `FreeQuestionCard` and `freeQuestions` as-is.

- [ ] **Step 2: Verify page renders**

```bash
# Visit http://localhost:3099/tma/free/test
```

- [ ] **Step 3: Commit**

```bash
git add src/app/tma/free/test/page.tsx
git commit -m "feat: add TMA free test page (reuses FreeQuestionCard)"
```

---

### Task 9: TMA free result page (with blurred screens)

**Files:**
- Create: `src/app/tma/free/result/page.tsx`
- Create: `src/app/tma/components/BlurredScreen.tsx`

- [ ] **Step 1: Create BlurredScreen component**

Create `src/app/tma/components/BlurredScreen.tsx`:
```typescript
"use client";

import { motion } from "framer-motion";

interface BlurredScreenProps {
  children: React.ReactNode;
  screenNumber: number;
}

export function BlurredScreen({ children, screenNumber }: BlurredScreenProps) {
  return (
    <div className="relative min-h-dvh">
      <div className="filter blur-md pointer-events-none select-none">
        {children}
      </div>
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-white/40 text-sm mb-3">Экран {screenNumber} из 9</p>
        <p className="text-white text-lg font-medium mb-6 text-center px-8">
          Разблокируй полный результат
        </p>
        <button
          className="bg-[#D2FF00] text-black font-semibold px-6 py-3 rounded-xl"
          onClick={() => {
            // TODO MVP-2: open payment flow
            alert("Полный скан скоро будет доступен!");
          }}
        >
          Пройти полный скан — 699₽
        </button>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Create TMA result page**

Create `src/app/tma/free/result/page.tsx`:
Copy from `src/app/free/result/page.tsx` with modifications:
- Screens 1-3 (analysis, pattern, recognition) — fully visible
- Screens 4-9 — wrapped in `<BlurredScreen>` component
- Add share button using Telegram `shareStory` API
- Save profile to Neon via `/api/tma/answers` and `/api/profiles`

- [ ] **Step 3: Test the full flow**

Open `http://localhost:3099/tma`, go through 25 questions, verify:
- 3 screens visible
- 6 screens blurred
- Share button works (outside Telegram it will be a regular share)

- [ ] **Step 4: Commit**

```bash
git add src/app/tma/free/ src/app/tma/components/BlurredScreen.tsx
git commit -m "feat: add TMA free result page with blurred screens and share"
```

---

### Task 10: Share card with Telegram Stories integration

**Files:**
- Modify: `src/app/tma/free/result/page.tsx` (add share logic)

- [ ] **Step 1: Add Telegram share integration**

In the result page, add share functionality:
```typescript
const handleTelegramShare = async () => {
  try {
    const { shareStory } = await import("@telegram-apps/sdk-react");
    // Generate share card image URL (reuse existing ShareCard + html2canvas)
    const el = document.getElementById("share-card");
    if (!el) return;
    const html2canvas = (await import("html2canvas-pro")).default;
    const canvas = await html2canvas(el, { backgroundColor: "#0A0A0A" });
    const blob = await new Promise<Blob>((r) => canvas.toBlob(b => r(b!), "image/png"));
    const url = URL.createObjectURL(blob);

    shareStory(url, {
      text: `Мой паттерн: ${patternName}. Пройди тоже: t.me/PsycheScanBot`,
    });
  } catch {
    // Fallback: regular share
    const text = `Мой паттерн: ${patternName} — ${modifier}. Пройди тоже: t.me/PsycheScanBot`;
    if (navigator.share) {
      await navigator.share({ title: "Psyche Scan", text });
    } else {
      await navigator.clipboard.writeText(text);
    }
  }
};
```

- [ ] **Step 2: Commit**

```bash
git add src/app/tma/free/result/page.tsx
git commit -m "feat: add Telegram Stories share integration for result card"
```

---

## Chunk 3: Bot Setup + Deploy

### Task 11: Create Telegram bot via BotFather

- [ ] **Step 1: Create bot**

In Telegram, message @BotFather:
```
/newbot
Name: Psyche Scan
Username: PsycheScanBot (or available alternative)
```

Save the bot token to `.env.local` as `BOT_TOKEN`.

- [ ] **Step 2: Configure bot**

In @BotFather:
```
/setdescription — "Узнай почему ты такой. 22 клинических теста + AI. Бесплатно."
/setabouttext — "AI-powered психологический профиль. 5 минут — и ты узнаешь свой паттерн."
/setuserpic — (upload psyche scan logo)
```

- [ ] **Step 3: Enable Mini App**

In @BotFather:
```
/newapp
Select PsycheScanBot
Title: Psyche Scan
Description: Психологический профиль
Web App URL: https://psyche-scan.vercel.app/tma
```

---

### Task 12: Deploy + Set webhook

- [ ] **Step 1: Add env vars to Vercel**

```bash
npx vercel env add BOT_TOKEN production <<< "<bot_token>"
npx vercel env add BOT_WEBHOOK_SECRET production <<< "<random_secret>"
npx vercel env add NEXT_PUBLIC_APP_URL production <<< "https://psyche-scan.vercel.app"
```

- [ ] **Step 2: Deploy**

```bash
git push origin main
```

Wait for Vercel deploy to complete.

- [ ] **Step 3: Set webhook**

```bash
curl -X POST "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://psyche-scan.vercel.app/api/bot/webhook",
    "secret_token": "<BOT_WEBHOOK_SECRET>"
  }'
```

Expected: `{"ok":true,"result":true,"description":"Webhook was set"}`

- [ ] **Step 4: Test bot**

Open `t.me/PsycheScanBot`, send `/start`. Verify:
- Instant first message "Привет 👋"
- Second message with description after 1 sec
- "Пройти тест" button opens Mini App

- [ ] **Step 5: Test full flow**

1. /start in bot → open Mini App
2. Complete 25 questions
3. See 3 unlocked screens + 6 blurred
4. Share card works
5. Return to bot — verify bot can respond

- [ ] **Step 6: Commit any fixes**

```bash
git add -A && git commit -m "fix: post-deploy fixes for bot + TMA"
git push origin main
```

---

## Summary

| Task | What | Time Est |
|------|------|----------|
| 1 | Install deps | 5 min |
| 2 | DB migration | 10 min |
| 3 | TMA auth library | 20 min |
| 4 | TMA API routes | 30 min |
| 5 | Bot + webhook | 30 min |
| 6 | TMA Provider + Layout | 20 min |
| 7 | Onboarding page | 15 min |
| 8 | Free test page | 30 min |
| 9 | Result page + blur | 45 min |
| 10 | Share integration | 20 min |
| 11 | BotFather setup | 10 min |
| 12 | Deploy + test | 30 min |
| **Total** | | **~4-5 hours** |
