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
    });
  } catch (err) {
    console.error("TMA auth error:", err);
    const msg = err instanceof Error ? err.message : "Auth failed";
    return NextResponse.json({ error: msg }, { status: 401 });
  }
}
