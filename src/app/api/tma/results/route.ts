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

    const profiles = await sql`
      SELECT profile_data FROM profiles
      WHERE user_id = ${user.id} AND test_type = 'free'
      ORDER BY created_at DESC LIMIT 1
    `;

    if (profiles.length === 0) {
      return NextResponse.json({ profile: null });
    }

    const hasPaid = false; // TODO: check payments table

    return NextResponse.json({
      profile: profiles[0].profile_data,
      hasPaid,
      unlockedScreens: hasPaid ? 9 : 3,
    });
  } catch (err) {
    console.error("TMA results error:", err);
    return NextResponse.json({ error: "Failed to get results" }, { status: 500 });
  }
}
