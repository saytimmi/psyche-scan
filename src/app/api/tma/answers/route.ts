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

    const sessionRows = await sql`
      INSERT INTO sessions (user_id, session_type)
      VALUES (${user.id}, ${sessionType})
      RETURNING id
    `;
    const sessionId = sessionRows[0].id;

    for (const [questionId, value] of Object.entries(answers)) {
      await sql`
        INSERT INTO answers (session_id, user_id, question_id, value_text)
        VALUES (${sessionId}, ${user.id}, ${questionId}, ${String(value)})
        ON CONFLICT (session_id, question_id) DO UPDATE SET value_text = ${String(value)}
      `;
    }

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
