import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// POST /api/profiles — save generated profile
export async function POST(request: NextRequest) {
  try {
    const { userId, testType, profileData } = await request.json() as {
      userId: string;
      testType: "free" | "full";
      profileData: Record<string, unknown>;
    };

    if (!userId || !testType || !profileData) {
      return NextResponse.json({ error: "userId, testType, profileData required" }, { status: 400 });
    }

    const sql = getDb();

    const rows = await sql`
      INSERT INTO profiles (user_id, test_type, profile_data)
      VALUES (${userId}, ${testType}, ${JSON.stringify(profileData)})
      RETURNING id, created_at
    `;

    return NextResponse.json({ profileId: rows[0].id, createdAt: rows[0].created_at });
  } catch (err) {
    console.error("Profiles API error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

// GET /api/profiles?userId=xxx&testType=free — get latest profile
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const testType = request.nextUrl.searchParams.get("testType");

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  try {
    const sql = getDb();

    const rows = testType
      ? await sql`
          SELECT profile_data, created_at FROM profiles
          WHERE user_id = ${userId} AND test_type = ${testType}
          ORDER BY created_at DESC LIMIT 1
        `
      : await sql`
          SELECT test_type, profile_data, created_at FROM profiles
          WHERE user_id = ${userId}
          ORDER BY created_at DESC
        `;

    if (rows.length === 0) {
      return NextResponse.json({ profile: null });
    }

    return NextResponse.json({
      profile: rows[0].profile_data,
      createdAt: rows[0].created_at,
    });
  } catch (err) {
    console.error("Profiles GET error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
