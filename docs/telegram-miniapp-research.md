# Telegram Mini Apps Deep Research (2025-2026)

Comprehensive research on building, launching, and monetizing Telegram Mini Apps. Focused on actionable specifics, real numbers, and technical details.

---

## Table of Contents

1. [Platform Overview & Market Size](#1-platform-overview--market-size)
2. [Successful Apps — Real Numbers](#2-successful-apps--real-numbers)
3. [Tech Stack — What to Use](#3-tech-stack--what-to-use)
4. [WebApp API Capabilities](#4-webapp-api-capabilities)
5. [UX Patterns & Design](#5-ux-patterns--design)
6. [Monetization — How to Make Money](#6-monetization--how-to-make-money)
7. [Telegram Stars Payment Integration](#7-telegram-stars-payment-integration)
8. [Ads Monetization (Adsgram, RichAds, Monetag)](#8-ads-monetization-adsgram-richads-monetag)
9. [Retention & Engagement](#9-retention--engagement)
10. [Viral Mechanics & Referral Systems](#10-viral-mechanics--referral-systems)
11. [Launch Strategy](#11-launch-strategy)
12. [grammY Bot Framework](#12-grammy-bot-framework)
13. [Personality Test Competitors on Telegram](#13-personality-test-competitors-on-telegram)
14. [TMA vs Native/Web App — When to Use What](#14-tma-vs-nativeweb-app--when-to-use-what)
15. [Russian Market Specifics](#15-russian-market-specifics)
16. [Performance Optimization](#16-performance-optimization)
17. [Mistakes to Avoid](#17-mistakes-to-avoid)
18. [Key Takeaways for Psyche Scan](#18-key-takeaways-for-psyche-scan)

---

## 1. Platform Overview & Market Size

- **Telegram MAU**: Grew from 900M to 1B between March 2024 and March 2025
- **Mini App engagement**: ~50% of Telegram users now interact with Mini Apps
- **In-app purchase revenue**: $13.6M worldwide in January 2025 alone
- **Engagement rate**: Telegram channels average 28% engagement (vs 1-3% on traditional social media)
- Users are pre-authenticated via Telegram, removing signup friction that normally drops 60-80% of users
- The ecosystem is transitioning from explosive growth to maturation — product quality matters now more than just launching

**Why this matters**: 500M people already use Mini Apps. The audience is there. The question is product quality and retention, not platform adoption.

## 2. Successful Apps — Real Numbers

### Notcoin (NOT)
- **Users**: 35M+ players at peak
- **Mechanic**: Tap-to-earn — tap coins to accumulate points redeemable for real tokens
- **Viral driver**: Quests and team-based challenges encouraging social participation
- **Key insight**: Simplicity was the product. One tap = one coin. Zero learning curve.

### Hamster Kombat
- **Users**: 300M+ combined with Notcoin at peak
- **Mechanic**: Tap-to-earn with upgrade mechanics (boosters, cards)
- **Tech stack** (from clones): Vite + TypeScript + Tailwind CSS on frontend, modular backend for high concurrent loads
- **Key insight**: Session length maximization via upgrade mechanics kept users returning. Designed for viral traffic spikes.

### Blum
- **MAU**: 43M+ monthly active users
- **What it does**: Telegram-native DeFi — finance, discovery, creation in one space
- **Backing**: Binance Labs
- **Chains supported**: 45+
- **Key insight**: Utility > games for long-term retention

### $35K Profit Case Study (RichAds)
- **Revenue**: $35,137 in 30 days
- **Stats**: CPC $0.019, CPM $16.54, CTR 83.5%, 1.77M clicks, 2M+ impressions
- **How**: Clicker game monetized with push-style ads integrated as tasks ("watch ad, get coins")
- **Key insight**: Users willingly watch ads when the reward is clear and immediate. Task-based ad integration > banner ads.

### RichAds Multi-App Case Study
- **Apps**: 3 Mini Apps, 62K to 1.3M users each
- **Strategy**: Mixed monetization — Stars + ads + referral programs
- **Key insight**: Combining multiple revenue streams works better than relying on one

## 3. Tech Stack — What to Use

### Recommended Stack for Psyche Scan

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 15 (already using) or Vite + React | Next.js works well, but Vite has faster cold starts for TMA |
| **TMA SDK** | `@telegram-apps/sdk-react` v3.x | Official React bindings, hooks, re-exports full SDK |
| **UI Components** | `@telegram-apps/telegram-ui` (TelegramUI) | MIT license, Telegram-native look, iOS HIG + Material Design |
| **Bot Framework** | grammY | Already in use, TypeScript-native, best docs |
| **Database** | PostgreSQL (Neon) | Serverless-friendly |
| **Cache** | Redis (Upstash) | For session data, leaderboards |
| **Payments** | Telegram Stars + TON | Required for digital goods |
| **Hosting** | Vercel | Already using for psyche-scan |
| **Ads** | Adsgram / RichAds / Monetag | All support TMA ad formats |

### Framework Comparison

| Framework | Bundle Size | Ecosystem | TMA Support |
|-----------|------------|-----------|-------------|
| **React** | Medium | Largest, most plugins | Best — official SDK + TelegramUI |
| **Vue** | Smaller | Good, vue-telegram package | Good — Quasar-based TMA Starter Kit |
| **Svelte** | Smallest | Limited | Basic — no official components |

**Verdict**: React wins for TMA because of `@telegram-apps/sdk-react` and `TelegramUI` component library. No need to build UI from scratch.

### Key Packages

```bash
npm i @telegram-apps/sdk-react    # v3.3.9 — hooks, signals, launch params
npm i @telegram-apps/telegram-ui  # Telegram-native React components
npm i grammy                      # Bot framework
```

### Official React Template
GitHub: `Telegram-Mini-Apps/reactjs-template` — React + tma.js + TypeScript + Vite

## 4. WebApp API Capabilities

### Mini Apps 2.0 Features (launched late 2024)

| Feature | What It Does | Use Case for Psyche Scan |
|---------|-------------|------------------------|
| **Full-screen mode** | Removes top/bottom Telegram bars, full device screen | Immersive test-taking experience |
| **Home screen shortcuts** | Users add app icon to phone home screen | Retention — one tap to reopen |
| **Geolocation** | GPS access for location-based services | Could show "people near you with similar personality" |
| **Haptic feedback** | Vibration patterns (impact, notification, selection) | Tactile feedback on quiz answers |
| **Biometric auth** | Face ID / fingerprint via BiometricManager | Secure premium content access |
| **Accelerometer** | Device motion tracking | Shake-to-share or interactive elements |
| **Gyroscope** | Device orientation tracking | Fun interactive personality visualizations |
| **Device orientation lock** | Lock to portrait/landscape | Lock to portrait during test |
| **Share to story** | Post to Telegram Stories | "Share your personality type" — viral mechanic |
| **Emoji status** | Set user's emoji status | "Set your personality type as status" |
| **Request contact** | Get user's phone number | Lead capture with permission |
| **Subscription plans** | Built-in recurring payments | Premium personality reports |
| **Send gifts** | In-app gifting | Gift a personality test to a friend |
| **Media sharing** | Share images/documents from app | Share personality report as image |
| **Device info** | OS, model, performance class | Adjust animations for low-end phones |

### Entry Points for Mini Apps

- **Bot menu button** — persistent button in bot chat
- **Inline keyboard** — button under bot message
- **Deep links** — `t.me/botname/appname?startapp=param`
- **Direct URL** — shareable link
- **Group/channel posts** — embedded mini app buttons
- **Home screen shortcut** — after user adds it
- **Attachment menu** — can be added to chat attachment panel

## 5. UX Patterns & Design

### Critical Design Rules

1. **Mobile-first, always** — TMAs run inside Telegram's container, which is already mobile. Design for thumb reach.

2. **Respect safe areas** — Use `contentSafeArea` and `safeArea` from the API. Content must not overlap with Telegram's header bar or bottom controls.

3. **Use Telegram's theme colors** — The API provides dynamic theme colors (`bg_color`, `text_color`, `button_color`, etc.). Apps that ignore these look foreign and get lower trust.

4. **Back button behavior** — Use `BackButton` from the API. Never implement your own browser-style back navigation.

5. **Main button** — Telegram provides a `MainButton` at the bottom of the screen. Use it for primary CTAs (like "Get Results" or "Pay $19").

### iOS Edge-Swipe Problem

On iOS, swiping from the left edge triggers "close app" instead of scrolling horizontal content. Solutions:
- Avoid horizontal carousels near screen edges
- Use pagination dots/arrows to signal interactive elements
- Keep interactive horizontal elements away from the left 20px of screen

### Navigation Patterns

- **Flat hierarchy** — Most successful TMAs keep navigation to 2-3 levels max
- **Bottom tab bar** — Works well for multi-section apps (using TelegramUI's `TabBar`)
- **Single-flow** — For quiz/test apps: linear flow works best (question 1 -> 2 -> 3 -> results)
- **No hamburger menus** — They conflict with Telegram's own navigation

### TelegramUI Component Library

Pre-built components that match Telegram's native look:
- Cross-platform: iOS HIG + Android Material Design automatic switching
- Figma files available for design prototyping
- MIT license — free for commercial use
- Includes: buttons, cells, inputs, modals, tabs, avatars, badges, etc.

## 6. Monetization — How to Make Money

### Revenue Model Options

| Model | How It Works | Expected Revenue | Best For |
|-------|-------------|-----------------|---------|
| **Telegram Stars (one-time)** | User pays Stars for premium content | $0.013 per Star | Personality reports, PDF downloads |
| **Telegram Stars (subscription)** | Monthly recurring via Stars | Steady recurring | Premium features, advanced reports |
| **Ads (rewarded video)** | User watches 15s video, gets reward | $0.50-2.00 CPM | Free tier users |
| **Ads (banner/interstitial)** | Display ads | $0.30-1.50 CPM | High-traffic apps |
| **Referral commissions** | Earn Stars from referred users' transactions | Variable | Viral apps |
| **TON blockchain** | NFT sales, token-gated content | Variable | Web3-adjacent products |

### Monetization Math for Psyche Scan

Scenario: 100K monthly users, 5% conversion to paid ($19 = ~1,461 Stars)

| Revenue Stream | Calculation | Monthly |
|---------------|------------|---------|
| **Paid reports** | 5,000 users x $19 | $95,000 |
| **Ad revenue (free users)** | 95,000 users x 3 sessions x $1 CPM | $285 |
| **Subscriptions** | 1,000 users x $5/mo | $5,000 |
| **Total** | | ~$100K |

Reality check: Getting to 100K MAU is the hard part. Ad revenue alone won't sustain a business. Paid reports at $19 is where the real money is.

### Key Rule

**All digital goods/services MUST be paid in Telegram Stars** — this is an Apple/Google compliance requirement. You cannot use Stripe or other payment processors for digital content inside TMA.

## 7. Telegram Stars Payment Integration

### How Stars Work

1. **User buys Stars** via Apple Pay / Google Pay inside Telegram
2. **1 Star = $0.013** (fixed rate)
3. **User spends Stars** in your Mini App
4. **You accumulate Stars** in your bot's balance
5. **Withdrawal**: After 1,000 Stars have been held for 21 days, withdraw to TON wallet via Fragment
6. **Convert TON to fiat** via exchange

### Implementation Flow

```
1. Bot sends invoice via sendInvoice() or createInvoiceLink()
2. User sees payment UI inside Telegram
3. Telegram sends pre_checkout_query webhook → you approve
4. Telegram sends successful_payment webhook → you deliver goods
5. Store the payment ID for refund capability
```

### Code Pattern (grammY)

```typescript
// Create invoice
await bot.api.sendInvoice(chatId, {
  title: "Full Personality Report",
  description: "Detailed 20-page analysis of your personality",
  payload: `report_${userId}`,
  currency: "XTR",  // XTR = Telegram Stars
  prices: [{ label: "Full Report", amount: 1461 }],  // ~$19
});

// Handle pre-checkout
bot.on("pre_checkout_query", async (ctx) => {
  await ctx.answerPreCheckoutQuery(true);
});

// Handle successful payment
bot.on("message:successful_payment", async (ctx) => {
  const payment = ctx.message.successful_payment;
  // Store payment.telegram_payment_charge_id for refunds
  // Deliver the premium report to user
});
```

### createInvoiceLink for Mini Apps

For TMA, use `createInvoiceLink()` instead of `sendInvoice()` — it generates a URL that opens the payment UI when clicked inside the Mini App.

### Affiliate/Referral Program

Telegram has a built-in affiliate system: affiliates earn a commission (set via `starRefProgram.commission_permille`) for every Mini App transaction made by referred users, for a configurable number of months.

## 8. Ads Monetization (Adsgram, RichAds, Monetag)

### Adsgram (by TON Foundation)

- **Ad formats**: 15-second video ads, static banners, channel subscriptions
- **Payment model**: CPM (cost per mille), paid in Toncoin (TON)
- **Scale**: Up to 8M impressions/day on their network
- **Top geos**: Nigeria, Bangladesh, Germany, and broader CIS/Asia
- **Integration**: Install Telegram Web App SDK, register on Adsgram, add ad blocks

### RichAds

- **Ad formats**: Push-style, embedded banners, interstitial banners, video ads
- **Payment**: CPC from $0.015, payouts via PayPal/Capitalist from $10
- **Best practice**: Integrate ads as "tasks" — users watch ads to earn in-app rewards (CTR 83.5% in case study)
- **Key insight**: Push-style ads integrated as tasks massively outperform banner ads

### Monetag

- **Ad formats**: Rewarded video, interstitial, banner
- **SDK**: Dedicated TMA SDK, easy integration
- **New formats**: Recently launched TMA-specific ad formats
- **Payouts**: Regular schedule, multiple payment methods

### Best Ad Strategy for Psyche Scan

1. **Don't show ads to paying users** — premium = ad-free
2. **Rewarded video after free results**: "Watch a 15s video to unlock one more personality insight"
3. **Task-based ads**: "Complete a sponsor task to unlock X feature"
4. **Never interrupt the test flow** — ads only between sections or after results

## 9. Retention & Engagement

### Benchmark Retention Rates for TMAs

| Metric | Average TMA | Good TMA | Traditional Mobile App |
|--------|------------|----------|----------------------|
| **Day 1** | 15-20% | 25-35% | 40-50% |
| **Day 7** | 8-10% | 15-20% | 20-30% |
| **Day 30** | 3-5% | 8-12% | 10-15% |

**Key insight**: TMA retention is significantly lower than mobile apps. This means you need to front-load value and create strong reasons to return.

### Retention Strategies That Work

1. **Personalized re-engagement**: Send bot messages based on user behavior patterns, not blast schedules. "Your personality match changed based on new data" > "Hey, come back!"

2. **Gamification**: Achievement systems, progress tracking, streaks. "You've completed 3/7 personality dimensions."

3. **Scheduled content**: Daily/weekly personality insights sent via bot. "Today's insight for ENTJs: ..."

4. **Social proof & comparison**: "See how your type compares to others in your city/country"

5. **Progressive disclosure**: Don't show everything at once. Unlock new insights over time.

6. **Home screen shortcut prompt**: After positive experience, prompt users to add to home screen — this alone can 2-3x return rates.

### Session Metrics to Track

- **Session interval**: Time between app openings (target: < 24 hours for active users)
- **K-factor**: Virality coefficient (invites sent x conversion rate). K > 1 = organic growth
- **Feature adoption**: % of users engaging with core functions within 24 hours
- **Drop-off points**: Where users abandon flows (critical for quiz completion rates)
- **Transaction success rate**: Payment completion rate

## 10. Viral Mechanics & Referral Systems

### Deep Link Format

```
# Bot deep link
https://t.me/YourBot?start=ref_USER123

# Mini App deep link
https://t.me/YourBot/appname?startapp=ref_USER123
```

### What Makes TMAs Go Viral

1. **Shareable results** — The #1 viral mechanic for personality tests. Create beautiful, branded result cards that users WANT to share.

2. **Share to Telegram Stories** — Use the `shareStory` API to let users post results directly to their story. This is the highest-visibility sharing method.

3. **Referral rewards** — "Invite 3 friends, unlock your compatibility report." Both parties must benefit.

4. **Group amplification** — Design features that work in group chats. "Compare personality types in this group."

5. **FOMO mechanics** — "First 1,000 users get premium free." Limited-time perks drive urgency.

6. **Multiple entry points** — Don't rely on one channel. Use bot menu, inline keyboards, deep links, channel posts, direct URLs.

### Referral Implementation

```typescript
// Generate referral link
const referralLink = `https://t.me/PsycheScanBot/app?startapp=ref_${userId}`;

// Track referrals on app open
bot.command("start", async (ctx) => {
  const payload = ctx.match; // "ref_USER123"
  if (payload.startsWith("ref_")) {
    const referrerId = payload.replace("ref_", "");
    await trackReferral(referrerId, ctx.from.id);
    await rewardReferrer(referrerId);
  }
});
```

### Built-in Affiliate Program

Telegram's native affiliate system lets you set a commission rate. Affiliates earn Stars from every transaction their referred users make. Configure via Bot API's `starRefProgram`.

## 11. Launch Strategy

### Phase 1: Pre-Launch (Week 1-2)

1. **Build in public** — Share development progress on Telegram channel + Twitter/X
2. **Create a waitlist bot** — Simple grammY bot that collects users before launch
3. **FOMO offer** — "First 1,000 users get premium report free"
4. **Seed content** — Create 5-10 shareable personality result cards and post them

### Phase 2: Soft Launch (Week 3)

1. **Invite-only beta** — Send to 100-200 people, collect feedback
2. **Fix critical issues** — Loading speed, payment flow, result sharing
3. **Optimize the viral loop** — Test share mechanics, measure K-factor

### Phase 3: Public Launch (Week 4+)

1. **Telegram channel promotion** — Find channels in psychology/self-development niche
2. **Influencer partnerships** — Series of posts (not single sponsored post) performs best
3. **Short-form video** — TikTok/Instagram Reels/YouTube Shorts showing personality results
4. **Cross-promotion** — Partner with other Mini Apps for mutual promotion
5. **Submit to directories** — FindMini.app, TMA directories

### Phase 4: Growth (Month 2+)

1. **Optimize for virality** — A/B test sharing prompts, result card designs
2. **Add group features** — "Compare personalities in this chat"
3. **Telegram Ads** — Once organic baseline established, run Telegram Ads
4. **Content marketing** — Psychology content in Russian + English Telegram channels

### User Acquisition Costs

- **Organic (referrals)**: $0 per user
- **Telegram Ads**: $0.01-0.05 per click
- **Influencer posts**: $50-500 per post depending on channel size
- **Cross-promotion**: Free (trade traffic)

## 12. grammY Bot Framework

### Why grammY Works

- TypeScript-native with excellent type inference
- Plugin ecosystem: sessions, conversations, menus, rate limiting
- Scales from hobby to production (long polling for dev, webhooks for prod)
- Best documentation of any Telegram bot framework
- Active community and maintainer

### Best Practices

1. **Use Composer pattern** — Modularize bot code into separate composers for different features
2. **Always answer callback queries** — `ctx.answerCallbackQuery()` removes loading indicator
3. **Use sessions plugin** — For persistent user state across messages
4. **Webhook mode for production** — Long polling for dev, webhooks for Vercel/production
5. **Error handling** — Use `bot.catch()` for global error handling
6. **Rate limiting** — Use `rateLimit` plugin to prevent spam

### grammY + Mini App Integration

```typescript
import { Bot } from "grammy";

const bot = new Bot(process.env.BOT_TOKEN);

// Launch Mini App from bot
bot.command("start", async (ctx) => {
  await ctx.reply("Take your personality test!", {
    reply_markup: {
      inline_keyboard: [[
        { text: "Start Test", web_app: { url: "https://psyche-scan.vercel.app" } }
      ]]
    }
  });
});

// Validate Mini App data on backend
import { validate } from "@telegram-apps/init-data-node";

function validateTelegramData(initData: string) {
  validate(initData, process.env.BOT_TOKEN);
  // If no error thrown, data is valid and from Telegram
}
```

## 13. Personality Test Competitors on Telegram

### Direct Competitors (Telegram)

| App | What It Does | Threat Level |
|-----|-------------|-------------|
| **Quiz Bot** (@quizbot) | Generic quiz builder, no personality focus | Low — generic tool |
| **InstaQuiz** | Multiplayer trivia battles | Low — trivia, not personality |
| **Channel Quiz** | Quiz posts for channels | Low — channel tool |
| **Quizarium** | Group trivia/learning | Low — educational focus |

### Indirect Competitors (Web/Mobile)

| App | What It Does | Learns From |
|-----|-------------|-------------|
| **16Personalities** | MBTI test, 200M+ test takers | Beautiful result pages, shareable cards |
| **Jotform Quiz Maker** | Templates for Myers-Briggs, Enneagram | Template variety |
| **Interacty** | Gamified personality tests | Gamification elements |

### Key Insight

**There is NO dominant personality test Mini App on Telegram.** The quiz bots that exist are generic quiz tools, not personality-focused experiences. This is a wide-open niche. The closest analog is 16Personalities on the web — but nothing comparable exists natively in Telegram.

**Competitive advantage for Psyche Scan**: First-mover in personality testing as a TMA with beautiful UI, shareable results, and Telegram-native experience.

## 14. TMA vs Native/Web App — When to Use What

### Choose TMA When:

- Target audience is already on Telegram (CIS, Asia, Latin America, parts of Europe)
- You need zero-friction onboarding (no signup, no app store download)
- Viral/social sharing is core to your product
- You're building an MVP to validate quickly (3-5x cheaper, 2-8 weeks)
- Your app is mobile-first with simple UI flows
- You want built-in payments without Apple/Google's 30% cut (Stars take ~15-20% equivalent)

### Choose Native App When:

- Targeting Tier-1 countries (USA, Canada, Australia) where Telegram isn't dominant
- Need advanced device features (sensors, camera, AR) beyond what TMA API provides
- Enterprise/security-sensitive applications
- Complex offline functionality needed
- App store presence/brand credibility is required

### Choose Web App When:

- Desktop usage is primary
- SEO/organic search discovery matters
- Complex multi-page application with deep navigation
- No need for Telegram's social/viral features

### Hybrid Approach (Recommended for Psyche Scan)

1. **Keep psyche-scan.vercel.app** as the web version (SEO, direct traffic)
2. **Build TMA version** that shares the same backend but has Telegram-native UI
3. **Use the bot** as the engagement layer (notifications, re-engagement, results delivery)
4. **Share code** between web and TMA where possible (API layer, business logic)

## 15. Russian Market Specifics

### Key Stats

- **70%+ of Russian Telegram users** regularly use Mini Apps
- Telegram is the dominant messaging platform in Russia and CIS
- Mini Apps have gone from "experiment" to "mature market" with millions of users and hundreds of new services monthly

### What Works in Russia/CIS

1. **Russian language is mandatory** — Even if you launch in English first, Russian localization is essential for CIS market
2. **Payment behavior**: Russian users are comfortable with Stars and TON payments
3. **Popular categories**: DeFi (Blum), gaming (tap-to-earn), utility apps
4. **Monetization**: Subscriptions, NFT, Adsgram, and in-app purchases all work
5. **Channel marketing**: Russian Telegram channels are the primary discovery mechanism

### Market Maturity

The Russian TMA market is more mature than Western markets. Users expect:
- Polished UI (not MVP-quality)
- Fast loading (< 2s)
- Russian-language support
- Integrated payments
- Social features (sharing, comparison)

## 16. Performance Optimization

### Target Metrics

| Metric | Target | Why |
|--------|--------|-----|
| **LCP** | ≤ 2.5s | Users abandon slow-loading TMAs immediately |
| **INP** | ≤ 200ms | Interactions must feel instant inside Telegram |
| **Bundle size** | < 200KB initial | Telegram's webview has limited resources |
| **Time to interactive** | < 3s | First meaningful interaction should be fast |

### Optimization Checklist

1. **Images**: Convert to WebP (2-3x smaller than PNG/JPEG without quality loss)
2. **Lazy loading**: Only load what's needed for the current screen
3. **Code splitting**: Split routes/features into separate chunks
4. **Service Worker**: Cache static assets (HTML, CSS, JS) for instant subsequent loads
5. **Compress assets**: Gzip/Brotli compression on all served files
6. **Minimize dependencies**: Every npm package adds to bundle size
7. **Device-adaptive**: Use `Telegram.WebApp.platform` info to reduce animations on low-end devices
8. **Skeleton screens**: Show loading state immediately, not a blank screen

### Vite vs Next.js for TMA

| Aspect | Vite + React | Next.js |
|--------|-------------|---------|
| **Cold start** | Faster (SPA, no SSR overhead) | Slower (SSR/ISR setup) |
| **Bundle size** | Smaller | Larger (framework overhead) |
| **SEO** | None (but TMA doesn't need it) | Good (but irrelevant in TMA) |
| **API routes** | Need separate backend | Built-in |
| **DX** | Simpler | More features |

**For TMA specifically**: Vite + React is likely better due to smaller bundle and faster cold start. You don't need SSR inside Telegram. But if sharing backend with the web version, Next.js API routes are convenient.

## 17. Mistakes to Avoid

### Technical Mistakes

1. **Not validating initData** — Always validate Telegram's init data server-side using `@telegram-apps/init-data-node`. Without this, anyone can fake requests to your API.

2. **Ignoring the back button** — Use Telegram's `BackButton` API. Custom back navigation breaks user expectations.

3. **Large bundle sizes** — TMAs load inside a webview with limited memory. Keep initial bundle < 200KB.

4. **Not using theme variables** — Hardcoding colors instead of using `var(--tg-theme-bg-color)` etc. makes your app look alien.

5. **Horizontal scroll near edges on iOS** — Edge swipe = close app. Avoid horizontal elements near screen edges.

6. **Not handling slow networks** — Many Telegram users are on 3G. Design for offline-first where possible.

### Business Mistakes

1. **Relying only on ads** — A mini-game with 30K MAU earns $300-500/month from ads. Not sustainable. Need paid tier.

2. **No viral loop** — If users can't easily share results/invite friends, growth is linear (paid acquisition only).

3. **Ignoring the bot** — The bot IS your re-engagement channel. Users don't "open" TMAs like apps. They interact via bot messages.

4. **One-time experience** — If the app has no reason to return, retention will be 0% by Day 7. Build recurring value.

5. **Skipping Russian localization** — Telegram's biggest TMA market is Russian-speaking.

6. **Launching without analytics** — Track everything: funnel completion, drop-off points, share rates, payment conversion.

### Design Mistakes

1. **Desktop-first design** — TMAs are 95%+ mobile. Design for 375px width first.
2. **Complex navigation** — Keep it to 2-3 levels max. Flat hierarchy.
3. **Ignoring safe areas** — Content behind Telegram's header/footer bars.
4. **Custom fonts loading** — Adds to load time. Use system fonts or preload carefully.
5. **Heavy animations on first load** — Show content first, animate second.

## 18. Key Takeaways for Psyche Scan

### The Opportunity

1. **No personality test TMA exists** with good UX. Zero real competition in this niche on Telegram.
2. **500M people** use TMAs. Personality tests are inherently viral (shareable results).
3. **$19 premium report** via Stars = ~1,461 Stars. At 5% conversion of 10K users = $9,500/month.

### Recommended Architecture

```
psyche-scan.vercel.app (web) ─┐
                                ├── Shared API / Database
TMA (Vite + React + TelegramUI) ─┘
         │
    grammY Bot (webhooks on Vercel)
         │
    User re-engagement via bot messages
```

### Priority Actions

1. **Build TMA version** using Vite + React + `@telegram-apps/sdk-react` + `TelegramUI`
2. **Integrate Telegram Stars** for $19 premium report payment
3. **Build viral sharing** — beautiful result cards + `shareStory` API
4. **Referral system** — "Invite friends, unlock compatibility report"
5. **Bot re-engagement** — Daily personality insights, "new test available" notifications
6. **Russian localization** — essential for the biggest TMA market
7. **Ads for free tier** — Adsgram rewarded video after free results

### Expected Timeline

| Phase | Duration | Goal |
|-------|----------|------|
| TMA MVP | 2-3 weeks | Working personality test inside Telegram |
| Stars integration | 1 week | Premium reports purchasable |
| Viral mechanics | 1 week | Share to story, referral links, result cards |
| Bot engagement | 1 week | Re-engagement messages, daily insights |
| Soft launch | 1 week | 200-500 beta users, iterate |
| Public launch | Ongoing | Growth via channels, influencers, virality |

---

## Sources

- [Merge — Telegram Mini Apps 2026 Monetization Guide](https://merge.rocks/blog/telegram-mini-apps-2026-monetization-guide-how-to-earn-from-telegram-mini-apps)
- [PropellerAds — State of TMA Advertising 2025](https://propellerads.com/blog/adv-telegram-mini-app-advertising-report/)
- [Magnetto — Everything About TMAs 2026 Guide](https://magnetto.com/blog/everything-you-need-to-know-about-telegram-mini-apps)
- [Magnetto — Classic App vs TMA](https://magnetto.com/blog/classic-app-vs-telegram-mini-app)
- [EJAW — TMA Development Ultimate Guide 2025](https://ejaw.net/telegram-mini-app-development-2025/)
- [EarlyBird — The TMA Revolution](https://earlybird.so/the-telegram-mini-apps-revolution/)
- [RichAds — $35K Profit Case Study](https://richads.com/blog/how-to-create-telegram-mini-app-35k-profit-case-study/)
- [RichAds — Monetizing 3 TMAs with 1.5M Users](https://richads.com/blog/case-study-how-richads-monetized-3-telegram-mini-apps-with-over-1-5-million-total-users/)
- [BingX — Top 7 TMAs in TON Ecosystem](https://bingx.com/en/learn/article/top-telegram-mini-apps-on-ton-network-ecosystem)
- [Turumburum — TMA UX Guide](https://turumburum.com/blog/telegram-mini-app-beyond-the-standard-ui-designing-a-truly-native-experience)
- [BAZU — UI/UX Best Practices](https://bazucompany.com/blog/best-practices-for-ui-ux-in-telegram-mini-apps/)
- [Nadcab — Best Tech Stack Guide](https://www.nadcab.com/blog/telegram-mini-app-tech-stack-guide)
- [Merge — Best Tech Stack for TMAs](https://merge.rocks/blog/what-is-the-best-tech-stack-for-telegram-mini-apps-development)
- [Nikandr Surkov — My TMA Tech Stack (Medium)](https://medium.com/@NikandrSurkov/the-tech-stack-i-use-for-building-telegram-mini-apps-and-why-you-should-care-9866281cdf36)
- [Telegram Official — Bot Payments API for Stars](https://core.telegram.org/bots/payments-stars)
- [Telegram Official — Mini Apps Documentation](https://core.telegram.org/bots/webapps)
- [Telegram Official — Mini Apps 2.0 Blog Post](https://telegram.org/blog/fullscreen-miniapps-and-more)
- [Telegram Mini Apps SDK Docs](https://docs.telegram-mini-apps.com/platform/methods)
- [TelegramUI Component Library (GitHub)](https://github.com/telegram-mini-apps-dev/TelegramUI)
- [@telegram-apps/sdk-react (npm)](https://www.npmjs.com/package/@telegram-apps/sdk-react)
- [Adsgram — Mini App Monetization](https://adsgram.ai/514/)
- [Monetag — TMA Ads 2026](https://monetag.com/blog/telegram-mini-app-ads/)
- [Monetag — TMA Metrics](https://monetag.com/blog/telegram-mini-app-metrics/)
- [PixelPlex — Viral Telegram Games Mechanics](https://pixelplex.io/blog/viral-mechanics-on-telegram-apps/)
- [PropellerAds — How to Promote TMAs](https://propellerads.com/blog/adv-how-to-promote-telegram-mini-apps/)
- [Monetag — How to Promote TMA 2026](https://monetag.com/blog/how-to-promote-your-telegram-mini-app/)
- [grammY Official Documentation](https://grammy.dev/)
- [grammY GitHub](https://github.com/grammyjs/grammY)
- [DTF — Top Mini Apps Telegram 2025 (Russian)](https://dtf.ru/id3136121/4135273-luchshie-mini-prilozheniya-telegram-2025)
- [vc.ru — Mini Apps Trend 2025 (Russian)](https://vc.ru/telegram/1750205-mini-prilozheniya-trend-2025-v-telegram-kotoryi-teper-dostupen-kazhdomu)
- [Sostav — TMA Market Boom 2025 (Russian)](https://www.sostav.ru/blogs/280723/64176)
- [Hamster Kombat Clone (GitHub)](https://github.com/nikandr-surkov/Hamster-Kombat-Telegram-Mini-App-Clone)
- [Telegram Official React Template (GitHub)](https://github.com/Telegram-Mini-Apps/reactjs-template)
