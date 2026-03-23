import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Ты — психологический AI-аналитик Psyche Scan. Ты получаешь результаты экспресс-теста И конкретные ответы человека. Твоя задача — сгенерировать отчёт который заставит человека подумать "блин, откуда они это знают обо мне".

КЛЮЧЕВОЕ: Тебе даны КОНКРЕТНЫЕ ответы человека на ситуативные вопросы. ИСПОЛЬЗУЙ ИХ. Не выдумывай поведение из воздуха — опирайся на то что человек сам выбрал. Если он написал что "ложусь один, телефон на беззвучный" — значит именно ЭТО его поведение. Развивай его, покажи последствия, покажи связь с другими ответами.

ПРАВИЛА ТЕКСТА:
- Пиши на "ты", разговорный русский, ноль академизмов
- ЗАПРЕЩЕНО: "возможно", "вам свойственно", "бывает что", "ты склонен". Только: "ты делаешь", "у тебя", "вот что происходит"
- ЗАПРЕЩЕНО: фразы которые подходят ВСЕМ ("ты иногда чувствуешь усталость", "тебе важно чтобы тебя понимали"). Если 70%+ людей скажут "да это про меня" — это мусор. Удали.
- Каждое утверждение = конкретная ситуация из повседневной жизни. Не черта характера а ДЕЙСТВИЕ.

КАК СОЗДАТЬ ВАУ-ЭФФЕКТ:
1. Возьми 2-3 ответа человека из РАЗНЫХ вопросов и покажи что это ОДИН И ТОТ ЖЕ паттерн. Человек сам этого не видит — а ты показываешь связь.
2. Опиши поведение которое человек делает НЕ ОСОЗНАВАЯ — привычки, автоматизмы, реакции тела.
3. Предсказания должны быть проверяемые: "ты перечитываешь сообщения перед отправкой" (да или нет), а не "ты внимательный человек".

ФОРМАТ — строго JSON:
{
  "recognition": "3 абзаца через \\n\\n. Каждый абзац = одна конкретная жизненная ситуация где проявляется паттерн. Описывай действия: что человек ДЕЛАЕТ, что чувствует в теле, что говорит себе в голове. Бери материал из его ответов и развивай.",
  "predictions": "Начни с 'Мы готовы поспорить:' и дай 3-4 конкретных предсказания через точку. Каждое = проверяемое действие/привычка. Например: 'Ты перечитываешь сообщения перед отправкой — а иногда удаляешь и пишешь заново. У тебя в заметках есть списки которые ты не довёл до конца. Ты ложишься спать позже чем планировал почти каждый день.' НЕ абстракции а действия.",
  "origin": "3-4 предложения. Откуда этот паттерн. Свяжи с типичным детским опытом для этого паттерна. Не обвиняй родителей, но назови конкретный механизм: 'Этот паттерн обычно включается когда ребёнок рано понимает что [конкретная ситуация]. Мозг записывает: [конкретное убеждение]. И с тех пор ты [конкретное поведение].'",
  "superpower": "2-3 предложения. Конкретно что этот паттерн даёт — в каких ситуациях ты лучше других. С примером.",
  "shadow": "2-3 предложения. Конкретно где мешает — какие ситуации ты портишь или избегаешь из-за этого паттерна.",
  "actions": ["Микродействие 1: начни с 'На этой неделе...' или 'Завтра когда...'. Опиши ЧТО сделать, В КАКОЙ момент, и ЧТО заметить внутри. 2-3 предложения.", "Микродействие 2: аналогично. Другая ситуация, другой аспект паттерна."],
  "aiProfile": "Готовый блок для вставки в нейросеть. Формат:\\nМой психопрофиль (Psyche Scan):\\nПаттерн: [имя] ([модификатор])\\nОписание: [1 предложение]\\n\\nКак со мной общаться:\\n- [конкретный пункт, не общие слова]\\n- [ещё]\\n- [ещё]\\n\\nЧто меня триггерит:\\n- [конкретная ситуация]\\n- [ещё]\\n\\nКак меня мотивировать:\\n- [конкретный подход]\\n- [ещё]\\n\\nЧего избегать в общении со мной:\\n- [конкретно]\\n- [конкретно]",
  "lockedPreviews": ["Конкретное интригующее название инсайта 1 (например: 'Почему ты саботируешь отношения на 3 месяце')", "Название 2", "Название 3"]
}`;

interface ProfileData {
  pattern: {
    id: string;
    name: string;
    childhood: string;
    defense: string;
    description: string;
  };
  modifier: string;
  scores: {
    attachment: { secure: number; anxious: number; avoidant: number };
    stress: { fight: number; flight: number; freeze: number };
    motivation: {
      safety: number;
      recognition: number;
      freedom: number;
      control: number;
      connection: number;
    };
    defense: {
      rationalization: number;
      avoidance: number;
      control: number;
      people_pleasing: number;
      compensation: number;
    };
    childhood: {
      perfectionist: number;
      rebel: number;
      invisible: number;
      rescuer: number;
      clown: number;
    };
  };
  topAttachment: string;
  topStress: string;
  topMotivation: string;
  topDefense: string;
  topChildhood: string;
  contradictions: string[];
  percentile: number;
}

interface AnswerText {
  question: string;
  answer: string;
}

function buildUserPrompt(profile: ProfileData, answerTexts: AnswerText[]): string {
  const { pattern, modifier, scores } = profile;

  const answersBlock = answerTexts
    .map((a, i) => `${i + 1}. «${a.question}» → «${a.answer}»`)
    .join("\n");

  return `РЕЗУЛЬТАТЫ ТЕСТА:

Паттерн: ${pattern.name} (${modifier})
Описание: ${pattern.description}

Шкалы (баллы — чем выше, тем выраженнее):
Привязанность: надёжный=${scores.attachment.secure}, тревожный=${scores.attachment.anxious}, избегающий=${scores.attachment.avoidant}
Стресс-реакция: борьба=${scores.stress.fight}, бегство=${scores.stress.flight}, замирание=${scores.stress.freeze}
Мотивация: безопасность=${scores.motivation.safety}, признание=${scores.motivation.recognition}, свобода=${scores.motivation.freedom}, контроль=${scores.motivation.control}, связь=${scores.motivation.connection}
Защита: рационализация=${scores.defense.rationalization}, избегание=${scores.defense.avoidance}, контроль=${scores.defense.control}, угождение=${scores.defense.people_pleasing}, компенсация=${scores.defense.compensation}
Детский паттерн: перфекционист=${scores.childhood.perfectionist}, бунтарь=${scores.childhood.rebel}, невидимка=${scores.childhood.invisible}, спасатель=${scores.childhood.rescuer}, клоун=${scores.childhood.clown}

Доминанты: привязанность=${profile.topAttachment}, стресс=${profile.topStress}, мотивация=${profile.topMotivation}, защита=${profile.topDefense}, детство=${profile.topChildhood}

Противоречия: ${profile.contradictions.length > 0 ? profile.contradictions.join(", ") : "нет выраженных"}

КОНКРЕТНЫЕ ОТВЕТЫ ЧЕЛОВЕКА (используй их как сырой материал для анализа):
${answersBlock}

ЗАДАНИЕ: Сгенерируй отчёт. ОБЯЗАТЕЛЬНО используй конкретные ответы выше — ссылайся на выборы человека, показывай связи между разными ответами, развивай его ответы в более глубокий анализ. Не выдумывай поведение — отталкивайся от того что человек сам показал.`;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured" },
      { status: 500 }
    );
  }

  let body: { profile?: unknown; answerTexts?: AnswerText[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { profile, answerTexts } = body;
  if (!profile) {
    return NextResponse.json({ error: "No profile data" }, { status: 400 });
  }

  const bodyStr = JSON.stringify(body);
  if (bodyStr.length > 100_000) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  const userPrompt = buildUserPrompt(
    profile as ProfileData,
    (answerTexts || []) as AnswerText[]
  );

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Extract JSON from response — handle markdown code blocks if present
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    const jsonStr = jsonMatch ? jsonMatch[1].trim() : text.trim();

    const result = JSON.parse(jsonStr);

    return NextResponse.json(result);
  } catch (err) {
    console.error("Free profile generation error:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Unknown API error";
    return NextResponse.json(
      { error: `Failed to generate profile: ${errorMessage}` },
      { status: 502 }
    );
  }
}
