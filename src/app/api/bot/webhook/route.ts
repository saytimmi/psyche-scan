import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Verify webhook secret
  const secret = request.headers.get("X-Telegram-Bot-Api-Secret-Token");
  if (secret !== process.env.BOT_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Dynamic import to avoid bot initialization on every cold start
    const { handleWebhook } = await import("@/lib/bot");
    return await handleWebhook(request);
  } catch (err) {
    console.error("Bot webhook error:", err);
    return NextResponse.json({ ok: true }); // Always return 200 to Telegram
  }
}
