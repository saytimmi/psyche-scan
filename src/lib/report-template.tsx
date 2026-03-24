import React from "react";
import { Document, Page, View, Text } from "@react-pdf/renderer";
import { styles, colors } from "./report-styles";

// ── Types ──

interface FreeScaleScores {
  attachment: { secure: number; anxious: number; avoidant: number };
  stress: { fight: number; flight: number; freeze: number };
  motivation: { safety: number; recognition: number; freedom: number; control: number; connection: number };
  defense: { rationalization: number; avoidance: number; control: number; people_pleasing: number; compensation: number };
  childhood: { perfectionist: number; rebel: number; invisible: number; rescuer: number; clown: number };
}

interface ProfileScoring {
  pattern: { id: string; name: string; childhood: string; defense: string; description: string };
  modifier: string;
  scores: FreeScaleScores;
  topAttachment: string;
  topStress: string;
  topMotivation: string;
  topDefense: string;
  topChildhood: string;
  contradictions: string[];
  percentile: number;
}

interface AiResult {
  recognition: string;
  predictions: string;
  origin: string;
  superpower: string;
  shadow: string;
  actions: string[];
  aiProfile: string;
  lockedPreviews: string[];
}

export interface ReportData {
  scoring: ProfileScoring;
  aiResult: AiResult;
  generatedAt: string;
}

// ── Translations ──

const attachmentLabels: Record<string, string> = {
  secure: "Надёжный", anxious: "Тревожный", avoidant: "Избегающий",
};
const stressLabels: Record<string, string> = {
  fight: "Борьба", flight: "Бегство", freeze: "Замирание",
};
const motivationLabels: Record<string, string> = {
  safety: "Безопасность", recognition: "Признание", freedom: "Свобода", control: "Контроль", connection: "Связь",
};
const defenseLabels: Record<string, string> = {
  rationalization: "Рационализация", avoidance: "Избегание", control: "Контроль", people_pleasing: "Угождение", compensation: "Компенсация",
};
const childhoodLabels: Record<string, string> = {
  perfectionist: "Перфекционист", rebel: "Бунтарь", invisible: "Невидимка", rescuer: "Спасатель", clown: "Клоун",
};

const contradictionDescriptions: Record<string, string> = {
  avoidant_but_craves_connection: "Ты избегаешь близости, но при этом сильно нуждаешься в связи. Это создаёт цикл: подпускаешь → пугаешься → отдаляешься → скучаешь.",
  pleaser_but_rebel: "Ты угождаешь другим, но внутри бунтуешь. Копишь раздражение пока не взрываешься — и потом чувствуешь вину.",
  freeze_but_overcompensates: "Под давлением замираешь, но потом компенсируешь бешеной активностью. Цикл «паралич → аврал» изматывает.",
  controls_from_anxiety: "Твой контроль — это не сила, а тревога. Чем больше тревоги, тем жёстче контроль. Но контроль не убирает причину.",
  avoidant_rescuer: "Ты спасаешь других, но не подпускаешь к себе. Помощь другим — способ быть нужным, не показывая уязвимость.",
  perfectionist_who_avoids: "Ты хочешь сделать идеально, но избегаешь начала. Страх несовершенства парализует — и ты откладываешь.",
};

// ── Helper components ──

function ScaleBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <View style={styles.barContainer}>
      <View style={styles.barLabel}>
        <Text style={{ fontSize: 9, color: colors.textMuted }}>{label}</Text>
        <Text style={{ fontSize: 9, color: colors.textDim, fontFamily: "Inter" }}>{value.toFixed(0)}</Text>
      </View>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

function MetricCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <View style={[styles.card, { flex: 1, alignItems: "center", paddingVertical: 14 }]}>
      <Text style={styles.labelText}>{label}</Text>
      <Text style={[styles.valueText, { marginTop: 4 }]}>{value}</Text>
      {sub && <Text style={[styles.smallText, { marginTop: 2 }]}>{sub}</Text>}
    </View>
  );
}

function PageFooter({ pageNum }: { pageNum: number }) {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>PSYCHE SCAN — Психологический профиль</Text>
      <Text style={styles.footerText}>{pageNum}</Text>
    </View>
  );
}

// ── Main Report Document ──

export function FreeTestReport({ data }: { data: ReportData }) {
  const { scoring, aiResult, generatedAt } = data;
  const { pattern, modifier, scores, percentile, contradictions } = scoring;

  const maxScale = (obj: Record<string, number>) => Math.max(...Object.values(obj), 1);

  return (
    <Document>
      {/* ═══ PAGE 1: COVER ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.coverPage}>
          <Text style={styles.coverBrand}>PSYCHE SCAN</Text>
          <View style={styles.coverLine} />
          <Text style={{ fontSize: 11, color: colors.textMuted, marginBottom: 50, textAlign: "center" }}>
            Психологический профиль личности
          </Text>
          <Text style={styles.coverTitle}>{pattern.name}</Text>
          <Text style={styles.coverModifier}>...{modifier}</Text>
          <Text style={styles.coverStat}>{percentile}% людей получают этот результат</Text>
          <Text style={styles.coverDate}>
            {new Date(generatedAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
          </Text>
        </View>
      </Page>

      {/* ═══ PAGE 2: ОБЗОР НА ОДНОМ ЭКРАНЕ ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <Text style={styles.sectionTag}>ОБЗОР</Text>
          <Text style={styles.sectionTitle}>Твой профиль на одном экране</Text>

          {/* Top metrics row */}
          <View style={[styles.row, { marginBottom: 16 }]}>
            <MetricCard label="ПРИВЯЗАННОСТЬ" value={attachmentLabels[scoring.topAttachment] || scoring.topAttachment} />
            <MetricCard label="СТРЕСС-РЕАКЦИЯ" value={stressLabels[scoring.topStress] || scoring.topStress} />
            <MetricCard label="МОТИВАЦИЯ" value={motivationLabels[scoring.topMotivation] || scoring.topMotivation} />
          </View>
          <View style={[styles.row, { marginBottom: 20 }]}>
            <MetricCard label="ЗАЩИТА" value={defenseLabels[scoring.topDefense] || scoring.topDefense} />
            <MetricCard label="ДЕТСКИЙ ПАТТЕРН" value={childhoodLabels[scoring.topChildhood] || scoring.topChildhood} />
          </View>

          {/* Pattern description */}
          <View style={styles.cardAccent}>
            <Text style={styles.labelText}>ТВОЙ ПАТТЕРН</Text>
            <Text style={[styles.valueText, { fontSize: 18, marginBottom: 8, marginTop: 4 }]}>
              {pattern.name}
            </Text>
            <Text style={styles.bodyText}>{pattern.description}</Text>
            <Text style={[styles.monoText, { marginTop: 4 }]}>
              Детство: {childhoodLabels[pattern.childhood]} + Защита: {defenseLabels[pattern.defense]}
            </Text>
          </View>

          {contradictions.length > 0 && (
            <View style={[styles.card, { borderColor: colors.amber, marginTop: 4 }]}>
              <Text style={[styles.labelText, { color: colors.amber }]}>ВНУТРЕННЕЕ ПРОТИВОРЕЧИЕ</Text>
              <Text style={[styles.bodyText, { marginTop: 4 }]}>
                {contradictions.map(c => contradictionDescriptions[c] || c).join(" ")}
              </Text>
            </View>
          )}
        </View>
        <PageFooter pageNum={2} />
      </Page>

      {/* ═══ PAGE 3: ШКАЛЫ ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <Text style={styles.sectionTag}>ШКАЛЫ</Text>
          <Text style={styles.sectionTitle}>Детальный разбор по 5 осям</Text>
          <Text style={styles.sectionSubtitle}>
            Каждая ось показывает выраженность конкретного измерения. Чем длиннее полоска — тем сильнее проявлено.
          </Text>

          {/* Attachment */}
          <View style={[styles.card, { marginBottom: 12 }]}>
            <Text style={[styles.labelText, { marginBottom: 8 }]}>СТИЛЬ ПРИВЯЗАННОСТИ</Text>
            <Text style={[styles.smallText, { marginBottom: 10 }]}>
              Как ты строишь близкие отношения и реагируешь на эмоциональную близость
            </Text>
            {Object.entries(scores.attachment).map(([key, val]) => (
              <ScaleBar key={key} label={attachmentLabels[key] || key} value={val} max={maxScale(scores.attachment)} color={key === scoring.topAttachment ? colors.accent : colors.textDim} />
            ))}
          </View>

          {/* Stress */}
          <View style={[styles.card, { marginBottom: 12 }]}>
            <Text style={[styles.labelText, { marginBottom: 8 }]}>СТРЕСС-РЕАКЦИЯ</Text>
            <Text style={[styles.smallText, { marginBottom: 10 }]}>
              Твоя автоматическая реакция в моменты давления и угрозы
            </Text>
            {Object.entries(scores.stress).map(([key, val]) => (
              <ScaleBar key={key} label={stressLabels[key] || key} value={val} max={maxScale(scores.stress)} color={key === scoring.topStress ? colors.red : colors.textDim} />
            ))}
          </View>

          {/* Motivation */}
          <View style={[styles.card, { marginBottom: 12 }]}>
            <Text style={[styles.labelText, { marginBottom: 8 }]}>ЯДРО МОТИВАЦИИ</Text>
            <Text style={[styles.smallText, { marginBottom: 10 }]}>
              Что на самом деле движет твоими решениями — часто неосознанно
            </Text>
            {Object.entries(scores.motivation).map(([key, val]) => (
              <ScaleBar key={key} label={motivationLabels[key] || key} value={val} max={maxScale(scores.motivation)} color={key === scoring.topMotivation ? colors.lime : colors.textDim} />
            ))}
          </View>
        </View>
        <PageFooter pageNum={3} />
      </Page>

      {/* ═══ PAGE 4: ШКАЛЫ (продолжение) ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <Text style={styles.sectionTag}>ШКАЛЫ</Text>
          <Text style={styles.sectionTitle}>Защиты и детские стратегии</Text>

          {/* Defense */}
          <View style={[styles.card, { marginBottom: 12 }]}>
            <Text style={[styles.labelText, { marginBottom: 8 }]}>ЗАЩИТНЫЙ МЕХАНИЗМ</Text>
            <Text style={[styles.smallText, { marginBottom: 10 }]}>
              Как ты бессознательно защищаешься от боли, тревоги и уязвимости
            </Text>
            {Object.entries(scores.defense).map(([key, val]) => (
              <ScaleBar key={key} label={defenseLabels[key] || key} value={val} max={maxScale(scores.defense)} color={key === scoring.topDefense ? colors.amber : colors.textDim} />
            ))}
          </View>

          {/* Childhood */}
          <View style={[styles.card, { marginBottom: 12 }]}>
            <Text style={[styles.labelText, { marginBottom: 8 }]}>ДЕТСКИЙ ПАТТЕРН</Text>
            <Text style={[styles.smallText, { marginBottom: 10 }]}>
              Роль которую ты занял в семье и которую продолжаешь воспроизводить
            </Text>
            {Object.entries(scores.childhood).map(([key, val]) => (
              <ScaleBar key={key} label={childhoodLabels[key] || key} value={val} max={maxScale(scores.childhood)} color={key === scoring.topChildhood ? colors.accent : colors.textDim} />
            ))}
          </View>

          {/* How to read */}
          <View style={{ marginTop: 10, paddingHorizontal: 4 }}>
            <Text style={[styles.smallText, { color: colors.textDim }]}>
              Как читать: доминантная шкала (цветная) — твоя основная стратегия. Вторичные шкалы показывают резервные
              паттерны, которые включаются когда основной не работает. Чем ближе две шкалы по значению — тем
              больше внутреннего конфликта между стратегиями.
            </Text>
          </View>
        </View>
        <PageFooter pageNum={4} />
      </Page>

      {/* ═══ PAGE 5: УЗНАВАНИЕ ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <Text style={styles.sectionTag}>УЗНАВАНИЕ</Text>
          <Text style={styles.sectionTitle}>Вот что ты делаешь</Text>
          <Text style={styles.sectionSubtitle}>
            Описание основано на твоих конкретных ответах — не на общих характеристиках типа.
          </Text>

          {aiResult.recognition.split("\n\n").map((paragraph, i) => (
            <View key={i} style={styles.quoteBlock}>
              <Text style={styles.quoteText}>{paragraph}</Text>
            </View>
          ))}

          <View style={styles.divider} />

          <Text style={styles.sectionTag}>ПРЕДСКАЗАНИЯ</Text>
          <Text style={[styles.sectionTitle, { fontSize: 20 }]}>Мы готовы поспорить</Text>

          <View style={styles.cardAccent}>
            <Text style={[styles.bodyText, { lineHeight: 1.8 }]}>{aiResult.predictions}</Text>
          </View>

          <Text style={[styles.smallText, { marginTop: 8, color: colors.textDim }]}>
            Эти предсказания сгенерированы на основе комбинации твоих ответов и паттерна.
            Если 3 из 4 попали — твой паттерн определён верно.
          </Text>
        </View>
        <PageFooter pageNum={5} />
      </Page>

      {/* ═══ PAGE 6: ПРОИСХОЖДЕНИЕ ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <Text style={styles.sectionTag}>ПРОИСХОЖДЕНИЕ</Text>
          <Text style={styles.sectionTitle}>Откуда это в тебе</Text>
          <Text style={styles.sectionSubtitle}>
            Паттерн формируется в детстве как лучшая доступная стратегия выживания. Он не плохой — он устаревший.
          </Text>

          <View style={[styles.cardAccent, { paddingVertical: 20 }]}>
            <Text style={[styles.bodyText, { lineHeight: 1.8 }]}>{aiResult.origin}</Text>
          </View>

          <View style={styles.divider} />

          {/* Duality */}
          <Text style={styles.sectionTag}>ДВЕ СТОРОНЫ</Text>
          <Text style={[styles.sectionTitle, { fontSize: 20 }]}>Суперсила и слепая зона</Text>

          <View style={styles.row}>
            <View style={[styles.col2]}>
              <View style={[styles.card, { borderColor: colors.accent, minHeight: 120 }]}>
                <Text style={[styles.monoText, { marginBottom: 8 }]}>СУПЕРСИЛА</Text>
                <Text style={[styles.bodyText, { lineHeight: 1.7 }]}>{aiResult.superpower}</Text>
              </View>
            </View>
            <View style={[styles.col2]}>
              <View style={[styles.card, { borderColor: colors.textDim, minHeight: 120 }]}>
                <Text style={[styles.labelText, { color: colors.textDim, marginBottom: 8 }]}>СЛЕПАЯ ЗОНА</Text>
                <Text style={[styles.bodyText, { lineHeight: 1.7 }]}>{aiResult.shadow}</Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 14, paddingHorizontal: 4 }}>
            <Text style={[styles.smallText, { color: colors.textDim }]}>
              Суперсила и слепая зона — две стороны одного паттерна. Ты не можешь убрать одно без другого.
              Задача — осознать оба и использовать суперсилу намеренно, а слепую зону — замечать раньше.
            </Text>
          </View>
        </View>
        <PageFooter pageNum={6} />
      </Page>

      {/* ═══ PAGE 7: ЧТО ДЕЛАТЬ ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <Text style={styles.sectionTag}>ПЛАН ДЕЙСТВИЙ</Text>
          <Text style={styles.sectionTitle}>Что делать на этой неделе</Text>
          <Text style={styles.sectionSubtitle}>
            Не меняй себя. Начни с наблюдения. Эти микро-действия помогут увидеть паттерн в действии.
          </Text>

          {aiResult.actions.map((action, i) => (
            <View key={i} style={styles.listItem}>
              <Text style={styles.listNumber}>0{i + 1}</Text>
              <View style={[styles.cardAccent, { flex: 1 }]}>
                <Text style={[styles.bodyText, { marginBottom: 0, lineHeight: 1.7 }]}>{action}</Text>
              </View>
            </View>
          ))}

          <View style={styles.divider} />

          <Text style={styles.sectionTag}>НАПРАВЛЕНИЕ РОСТА</Text>
          <Text style={[styles.sectionTitle, { fontSize: 20 }]}>Куда двигаться</Text>

          <View style={styles.card}>
            <Text style={[styles.bodyText, { lineHeight: 1.8 }]}>
              Твой паттерн «{pattern.name}» ({childhoodLabels[pattern.childhood]} + {defenseLabels[pattern.defense]}) работает
              на автомате. Цель — не уничтожить его, а получить выбор: включать осознанно или отпускать.
            </Text>
            <View style={{ marginTop: 10 }}>
              <Text style={[styles.monoText, { marginBottom: 4 }]}>ШАГ 1: ЗАМЕЧАТЬ</Text>
              <Text style={[styles.smallText, { marginBottom: 8 }]}>Ловить момент когда паттерн включается. Без оценки.</Text>
              <Text style={[styles.monoText, { marginBottom: 4 }]}>ШАГ 2: ПАУЗА</Text>
              <Text style={[styles.smallText, { marginBottom: 8 }]}>Между триггером и реакцией — 3 секунды. Этого достаточно.</Text>
              <Text style={[styles.monoText, { marginBottom: 4 }]}>ШАГ 3: ВЫБОР</Text>
              <Text style={styles.smallText}>Действовать по паттерну или попробовать иначе. Оба варианта ок.</Text>
            </View>
          </View>
        </View>
        <PageFooter pageNum={7} />
      </Page>

      {/* ═══ PAGE 8: AI-ПРОФИЛЬ + OUTRO ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <Text style={styles.sectionTag}>AI-ПРОФИЛЬ</Text>
          <Text style={styles.sectionTitle}>Скорми в нейросеть</Text>
          <Text style={styles.sectionSubtitle}>
            Скопируй текст ниже в ChatGPT, Claude или другой AI — он сразу будет понимать как с тобой общаться.
          </Text>

          <View style={[styles.card, { backgroundColor: "#111111", paddingVertical: 20 }]}>
            <Text style={{ fontSize: 8, color: colors.textMuted, fontFamily: "Inter", lineHeight: 1.6 }}>
              {aiResult.aiProfile}
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Upsell */}
          <Text style={styles.sectionTag}>ХОЧЕШЬ ГЛУБЖЕ?</Text>
          <Text style={[styles.sectionTitle, { fontSize: 20 }]}>Полное сканирование</Text>

          <Text style={[styles.bodyText, { marginBottom: 16 }]}>
            Этот отчёт основан на 25 вопросах и 5 шкалах. Полное сканирование — это 344 вопроса по 22 клиническим
            методикам: Big Five, стиль привязанности ECR-R, эмоциональная регуляция DERS, глубинные схемы Young,
            травматический опыт ACE, ценности Schwartz, мотивация SDT, и ещё 15 инструментов.
          </Text>

          <View style={styles.row}>
            {[
              { label: "Вопросов", value: "344" },
              { label: "Слоёв", value: "9" },
              { label: "Методик", value: "22" },
              { label: "Страниц", value: "20+" },
            ].map((item) => (
              <View key={item.label} style={[styles.card, { flex: 1, alignItems: "center" }]}>
                <Text style={[styles.valueText, { color: colors.accent }]}>{item.value}</Text>
                <Text style={[styles.smallText, { marginTop: 2 }]}>{item.label}</Text>
              </View>
            ))}
          </View>

          <View style={{ marginTop: 16 }}>
            {(aiResult.lockedPreviews || []).map((preview, i) => (
              <View key={i} style={[styles.card, { flexDirection: "row", alignItems: "center", gap: 8 }]}>
                <Text style={{ fontSize: 10, color: colors.textDim }}>-</Text>
                <Text style={[styles.bodyText, { marginBottom: 0 }]}>{preview}</Text>
              </View>
            ))}
          </View>

          <View style={{ marginTop: 16, alignItems: "center" }}>
            <Text style={[styles.monoText, { fontSize: 10 }]}>psyche-scan.vercel.app/scan</Text>
          </View>
        </View>
        <PageFooter pageNum={8} />
      </Page>
    </Document>
  );
}
