import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// POST /api/answers — save answers batch
export async function POST(request: NextRequest) {
  try {
    const { userId, sessionType, answers } = await request.json() as {
      userId: string;
      sessionType: string;
      answers: Record<string, string>;
    };

    if (!userId || !sessionType || !answers) {
      return NextResponse.json({ error: "userId, sessionType, answers required" }, { status: 400 });
    }

    const sql = getDb();

    // Create or get session
    const sessionRows = await sql`
      INSERT INTO sessions (user_id, session_type)
      VALUES (${userId}, ${sessionType})
      RETURNING id
    `;
    const sessionId = sessionRows[0].id;

    // Insert answers
    const entries = Object.entries(answers);
    for (const [questionId, value] of entries) {
      await sql`
        INSERT INTO answers (session_id, user_id, question_id, value_text)
        VALUES (${sessionId}, ${userId}, ${questionId}, ${String(value)})
        ON CONFLICT (session_id, question_id) DO UPDATE SET value_text = ${String(value)}
      `;
    }

    // Mark session complete
    await sql`
      UPDATE sessions SET status = 'completed', completed_at = now()
      WHERE id = ${sessionId}
    `;

    return NextResponse.json({ sessionId, answersCount: entries.length });
  } catch (err) {
    console.error("Answers API error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

// GET /api/answers?userId=xxx&sessionType=yyy — load answers
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const sessionType = request.nextUrl.searchParams.get("sessionType");

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  try {
    const sql = getDb();

    // Get latest session of this type
    const sessions = sessionType
      ? await sql`
          SELECT id FROM sessions
          WHERE user_id = ${userId} AND session_type = ${sessionType}
          ORDER BY started_at DESC LIMIT 1
        `
      : await sql`
          SELECT id, session_type FROM sessions
          WHERE user_id = ${userId} AND status = 'completed'
          ORDER BY started_at DESC
        `;

    if (sessions.length === 0) {
      return NextResponse.json({ answers: {} });
    }

    if (sessionType) {
      const answers = await sql`
        SELECT question_id, value_text FROM answers
        WHERE session_id = ${sessions[0].id}
      `;
      const map: Record<string, string> = {};
      for (const a of answers) {
        map[a.question_id] = a.value_text;
      }
      return NextResponse.json({ answers: map, sessionId: sessions[0].id });
    }

    // All sessions — for full scan results
    const allAnswers: Record<string, Record<string, string>> = {};
    for (const s of sessions) {
      const answers = await sql`
        SELECT question_id, value_text FROM answers
        WHERE session_id = ${s.id}
      `;
      const map: Record<string, string> = {};
      for (const a of answers) {
        map[a.question_id] = a.value_text;
      }
      allAnswers[s.session_type] = map;
    }
    return NextResponse.json({ sessions: allAnswers });
  } catch (err) {
    console.error("Answers GET error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
