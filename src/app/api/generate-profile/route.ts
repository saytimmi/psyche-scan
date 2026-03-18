import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: NextRequest) {
  const { profileData, summary } = await request.json();

  if (!profileData) {
    return NextResponse.json({ error: "No profile data" }, { status: 400 });
  }

  const prompt = `Ты — AI-психолог с глубоким знанием Big Five, теории привязанности, Schema Therapy, Self-Determination Theory, IFS и когнитивной психологии.

Тебе даны результаты полного психологического профилирования человека. На основе ВСЕХ данных создай документ "Personality Passport" — полный портрет личности.

ДАННЫЕ ПРОФИЛЯ:
${JSON.stringify(profileData, null, 2)}

КРАТКАЯ СВОДКА:
${summary}

Создай документ на русском языке в следующей структуре:

## 1. КТО ТЫ (3-5 предложений)
Сжатое, точное описание личности — как будто объясняешь кому-то кто этот человек. Не сухо, не банально — живой портрет.

## 2. ТВОИ СУПЕРСИЛЫ
3-5 главных сильных сторон на основе Big Five фасетов, талантов и values. Конкретно — не "ты умный", а что именно делает его уникальным.

## 3. ТВОЯ ТЕНЬ (слабые стороны и блоки)
3-5 главных проблемных паттернов. Связи: детский опыт (ACE) → схемы (YSQ) → текущее поведение. Будь честен но не жесток.

## 4. КАК ТЫ РАБОТАЕШЬ
- Оптимальное время суток
- Что мотивирует (SDT + values)
- Что парализует (procrastination triggers)
- Стиль принятия решений
- Как лучше подавать задачи

## 5. КАК ТЫ СТРОИШЬ ОТНОШЕНИЯ
На основе ECR-R + IFS + конфликтного стиля:
- Стиль привязанности простым языком
- Как ведёшь себя в конфликте
- Что тебе трудно в отношениях
- Внутренние части (protector/exile/firefighter)

## 6. СЛЕПЫЕ ЗОНЫ (самообман)
2-3 места где данные противоречат тому что человек скорее всего думает о себе. Формат: "Ты скорее всего думаешь [X], но данные показывают [Y]"

## 7. КАРТА РОСТА
Приоритизированный список из 3-5 зон развития:
1. [Самое важное] — что изменить в первую очередь и почему
2-5. Остальные по приоритету

## 8. ИНСТРУКЦИЯ ДЛЯ AI-АССИСТЕНТА
YAML-блок (~400-500 токенов) который можно прямо скопировать в system prompt AI-бота:
\`\`\`yaml
personality_profile:
  identity: ...
  big5_summary: ...
  attachment: ...
  schemas: ...
  patterns: ...
  coaching: ...
  blind_spots: ...
  growth: ...
\`\`\`

## 9. КАК СО МНОЙ РАБОТАТЬ (для людей)
5-7 пунктов — краткая инструкция для коллег/партнёра/друзей. Что делать, чего не делать.

Пиши от второго лица ("ты"). Будь конкретен, избегай общих фраз. Каждый пункт должен быть основан на данных профиля, не на домыслах.`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";

  return NextResponse.json({ passport: text });
}
