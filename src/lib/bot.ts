import { Bot, webhookCallback } from "grammy";

const BOT_TOKEN = process.env.BOT_TOKEN || "";

export const bot = new Bot(BOT_TOKEN);

// /start command — engaging, personal, fast
bot.command("start", async (ctx) => {
  const firstName = ctx.from?.first_name || "друг";

  // Extract referral if present: /start ref_xxx
  const startParam = ctx.match;
  if (startParam?.startsWith("ref_")) {
    // TODO: save referrer in DB
  }

  // First message — instant, creates intrigue
  await ctx.reply(
    `Привет, ${firstName}.\n\nЯ знаю о тебе больше, чем ты думаешь.\nНе кто ты по гороскопу. Не 4 буквы MBTI.\n\nА почему ты реагируешь ТАК, а не иначе.\nИ что с этим делать.`
  );

  // Brief pause for dramatic effect
  await new Promise((r) => setTimeout(r, 1200));

  // Second message with CTA
  await ctx.reply(
    "3 минуты. 25 ситуаций. Без регистрации.\nГотов?",
    {
      reply_markup: {
        inline_keyboard: [[
          { text: "🔬 Доказать", web_app: { url: `${process.env.NEXT_PUBLIC_APP_URL || "https://psyche-scan.vercel.app"}/tma` } }
        ], [
          { text: "Как это работает?", callback_data: "how_it_works" }
        ]]
      }
    }
  );
});

// "How it works" callback
bot.callbackQuery("how_it_works", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(
    "22 клинических теста, адаптированных в 25 простых ситуаций.\n\n" +
    "Ты выбираешь как бы поступил — а я анализирую:\n" +
    "• стиль привязанности\n" +
    "• стресс-реакцию\n" +
    "• мотивацию\n" +
    "• защитные механизмы\n" +
    "• паттерн из детства\n\n" +
    "Результат — не 4 буквы. А конкретно: почему ты делаешь то, что делаешь.",
    {
      reply_markup: {
        inline_keyboard: [[
          { text: "🔬 Пройти тест", web_app: { url: `${process.env.NEXT_PUBLIC_APP_URL || "https://psyche-scan.vercel.app"}/tma` } }
        ]]
      }
    }
  );
});

// Handle any text message
bot.on("message:text", async (ctx) => {
  await ctx.reply(
    "Чтобы начать, пройди тест 👇",
    {
      reply_markup: {
        inline_keyboard: [[
          { text: "🔬 Пройти тест", web_app: { url: `${process.env.NEXT_PUBLIC_APP_URL || "https://psyche-scan.vercel.app"}/tma` } }
        ]]
      }
    }
  );
});

// Export webhook handler for Next.js API route
export const handleWebhook = webhookCallback(bot, "std/http");
