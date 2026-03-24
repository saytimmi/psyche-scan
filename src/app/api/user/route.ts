import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/user?fingerprint=xxx — get or create anonymous user
export async function GET(request: NextRequest) {
  const fingerprint = request.nextUrl.searchParams.get("fingerprint");
  if (!fingerprint) {
    return NextResponse.json({ error: "fingerprint required" }, { status: 400 });
  }

  try {
    const sql = getDb();

    // Upsert user
    const rows = await sql`
      INSERT INTO users (fingerprint)
      VALUES (${fingerprint})
      ON CONFLICT (fingerprint) DO UPDATE SET fingerprint = EXCLUDED.fingerprint
      RETURNING id, created_at
    `;

    return NextResponse.json({ userId: rows[0].id, createdAt: rows[0].created_at });
  } catch (err) {
    console.error("User API error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
