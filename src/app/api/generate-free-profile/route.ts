import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Ты — психологический AI-аналитик Psyche Scan. Генерируешь персонализированный отчёт по результатам экспресс-теста.

ЖЁСТКИЕ ПРАВИЛА:
1. Пиши на "ты", разговорный русский, без академизмов и канцелярита
2. ANTI-BARNUM: каждое утверждение должно быть таким, что минимум 50% людей скажут "нет, это не про меня". Никаких универсальных истин.
3. Ищи ПРОТИВОРЕЧИЯ между шкалами — когда человек одновременно тянется и отталкивает, контролирует и избегает. Это создаёт вау-эффект.
4. Описывай ПОВЕДЕНИЕ в конкретных повседневных ситуациях, не абстрактные черты. Не "ты склонен к перфекционизму" а "ты перечитываешь сообщение три раза перед отправкой".
5. Никаких "возможно", "вам свойственно", "бывает что". Только утвердительно: "ты делаешь", "у тебя так", "вот что происходит".
6. Рекомендации: конкретные микродействия НА ЭТУ НЕДЕЛЮ. Не "работай над собой". А "завтра когда поймаешь себя на X — сделай Y".
7. Тон: как умный друг который тебя хорошо знает и говорит прямо.
8. Профиль для AI: конкретные инструкции, не общие слова.

ФОРМАТ ОТВЕТА — строго JSON:
{
  "recognition": "3 абзаца (каждый 2-3 предложения) описывающих конкретное поведение которое человек УЗНАЕТ в себе. Каждый абзац — отдельная ситуация из жизни. Разделяй абзацы через \\n\\n",
  "predictions": "2-3 конкретных поведенческих предсказания. Максимально специфичных. Формат: 'Мы готовы поспорить: ты [конкретное действие]. А ещё [ещё одно].' Каждое предсказание должно быть проверяемым — человек может сказать да или нет.",
  "origin": "1 абзац (3-4 предложения). Откуда этот паттерн — связь с детским опытом. Не диагноз, не обвинение родителей. Просто понятное объяснение: 'Этот паттерн обычно включается когда...'",
  "superpower": "2-3 предложения. Что хорошего даёт этот паттерн. Конкретно, с примерами ситуаций.",
  "shadow": "2-3 предложения. Где этот паттерн мешает. Конкретные ситуации где человек себе вредит.",
  "actions": ["действие 1 — 2-3 предложения с конкретным что/когда/как", "действие 2 — аналогично"],
  "aiProfile": "Готовый текст для вставки в ChatGPT/Claude. Формат:\\nМой психопрофиль (Psyche Scan):\\nПаттерн: [имя] ([модификатор])\\n\\nКак со мной общаться:\\n- [3-4 конкретных пункта]\\n\\nЧто меня триггерит:\\n- [2-3 пункта]\\n\\nКак меня мотивировать:\\n- [2-3 пункта]",
  "lockedPreviews": ["Название заблокированного инсайта 1", "Название 2", "Название 3"]
}`;

function buildUserPrompt(profile: {
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
}): string {
  const { pattern, modifier, scores } = profile;

  return `Результаты теста:

Паттерн: ${pattern.name}
Модификатор: ${modifier}
Описание: ${pattern.description}

Шкалы (баллы):
Привязанность: надёжный=${scores.attachment.secure}, тревожный=${scores.attachment.anxious}, избегающий=${scores.attachment.avoidant}
Стресс: борьба=${scores.stress.fight}, бегство=${scores.stress.flight}, замирание=${scores.stress.freeze}
Мотивация: безопасность=${scores.motivation.safety}, признание=${scores.motivation.recognition}, свобода=${scores.motivation.freedom}, контроль=${scores.motivation.control}, связь=${scores.motivation.connection}
Защита: рационализация=${scores.defense.rationalization}, избегание=${scores.defense.avoidance}, контроль=${scores.defense.control}, угождение=${scores.defense.people_pleasing}, компенсация=${scores.defense.compensation}
Детский паттерн: перфекционист=${scores.childhood.perfectionist}, бунтарь=${scores.childhood.rebel}, невидимка=${scores.childhood.invisible}, спасатель=${scores.childhood.rescuer}, клоун=${scores.childhood.clown}

Топ: привязанность=${profile.topAttachment}, стресс=${profile.topStress}, мотивация=${profile.topMotivation}, защита=${profile.topDefense}, детство=${profile.topChildhood}

Обнаруженные противоречия: ${profile.contradictions.length > 0 ? profile.contradictions.join(", ") : "нет"}

Сгенерируй персонализированный отчёт. Помни: каждое слово должно быть настолько конкретным, чтобы человек подумал "откуда они это знают".`;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured" },
      { status: 500 }
    );
  }

  let body: { profile?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { profile } = body;
  if (!profile) {
    return NextResponse.json({ error: "No profile data" }, { status: 400 });
  }

  const profileStr = JSON.stringify(profile);
  if (profileStr.length > 50_000) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  const userPrompt = buildUserPrompt(
    profile as Parameters<typeof buildUserPrompt>[0]
  );

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 3000,
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
