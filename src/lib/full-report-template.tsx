import React from "react";
import { Document, Page, View, Text } from "@react-pdf/renderer";
import { styles, colors } from "./report-styles";

// ── Types ──

interface DimensionScore {
  dimension: string;
  score: number;
  rawScore: number;
  maxPossible: number;
  facets?: Record<string, number>;
  confidence: number;
  source: "tested";
}

interface SchemaScore {
  name: string;
  score: number;
  level: "inactive" | "mild" | "active" | "dominant";
}

interface AttachmentResult {
  anxiety: number;
  avoidance: number;
  style: "secure" | "anxious" | "avoidant" | "disorganized";
}

interface ProfileResult {
  big5: {
    openness: DimensionScore;
    conscientiousness: DimensionScore;
    extraversion: DimensionScore;
    agreeableness: DimensionScore;
    neuroticism: DimensionScore;
  };
  attachment: AttachmentResult;
  values: { facet: string; score: number }[];
  ders: Record<string, DimensionScore>;
  das: Record<string, DimensionScore>;
  schemas: SchemaScore[];
  ace: { score: number; items: string[] };
  sdt: { autonomy: number; competence: number; relatedness: number };
  narratives: Record<string, string>;
  behavioral: Record<string, string | number>;
  completedAt: string;
}

export interface PassportData {
  whoYouAre: string;
  paradoxes: Array<{
    title: string;
    whatOthersSee: string;
    whatYouFeel: string;
    whyThisHappens: string;
    theIrony: string;
  }>;
  scenarioRecognitions: string[];
  crossAnalysis: {
    workPattern: { headline: string; text: string };
    relationshipPattern: { headline: string; text: string };
    stressPattern: { headline: string; text: string };
  };
  strengths: Array<{
    name: string;
    description: string;
    shadowSide: string;
    soundsLikeYou: string;
  }>;
  blindSpots: Array<{
    belief: string;
    reality: string;
    evidence: string;
  }>;
  growthPlan: Array<{
    priority: number;
    area: string;
    why: string;
    firstStep: string;
    whatChanges: string;
  }>;
  aiProfile: string;
  workWithMe: string[];
}

export interface FullReportData {
  profile: ProfileResult;
  passport: PassportData;
  generatedAt: string;
}

// ── Constants ──

const big5Labels: Record<string, string> = {
  openness: "Открытость опыту",
  conscientiousness: "Добросовестность",
  extraversion: "Экстраверсия",
  agreeableness: "Доброжелательность",
  neuroticism: "Нейротизм",
};

const big5Scenarios: Record<string, { high: string; mid: string; low: string }> = {
  openness: {
    high: "Тебе быстро надоедает рутина. Ты ищешь новые идеи, книги, разговоры. Тебе подходит работа где нужно думать нестандартно. Риск: разбрасываешься и не доводишь до конца.",
    mid: "Ты можешь быть креативным когда нужно, но не гонишься за новизной ради новизны. Хороший баланс между любопытством и практичностью.",
    low: "Ты предпочитаешь проверенные подходы. Не любишь абстрактные разговоры. Сила: ты надёжен и конкретен. Риск: можешь пропускать возможности из-за нежелания пробовать новое.",
  },
  conscientiousness: {
    high: "Ты планируешь, выполняешь, доводишь до конца. Люди считают тебя надёжным. Риск: перфекционизм и трудность с расслаблением.",
    mid: "Ты можешь быть организованным когда это важно, но не зацикливаешься на деталях. Гибкость — твой плюс.",
    low: "Ты живёшь спонтанно, не любишь жёсткие рамки. Сила: гибкость и адаптивность. Риск: прокрастинация и незаконченные дела.",
  },
  extraversion: {
    high: "Ты заряжаешься от общения и активности. Тебе нужны люди вокруг. Риск: можешь избегать одиночества и не слышать себя.",
    mid: "Ты комфортен и в компании и один. Можешь переключаться между режимами.",
    low: "Ты перезаряжаешься в одиночестве. Глубокие разговоры один-на-один важнее тусовок. Сила: ты вдумчив. Риск: изоляция.",
  },
  agreeableness: {
    high: "Ты эмпатичен, стремишься к гармонии, помогаешь людям. Риск: подавляешь свои потребности ради других, трудно говорить 'нет'.",
    mid: "Ты можешь быть и мягким и твёрдым в зависимости от ситуации. Здоровый баланс.",
    low: "Ты прямолинеен, не боишься конфликтов, ставишь свои интересы первыми. Сила: честность. Риск: можешь ранить людей не замечая.",
  },
  neuroticism: {
    high: "Ты чувствительнее к стрессу, тревоге, перепадам настроения. Это не слабость — это чувствительная нервная система. Риск: выгорание, тревожные циклы.",
    mid: "Ты чувствуешь стресс но умеешь с ним справляться. Средний уровень эмоциональной реактивности.",
    low: "Тебя сложно вывести из равновесия. Сила: стрессоустойчивость. Риск: можешь не замечать что подавляешь эмоции.",
  },
};

const facetLabels: Record<string, string> = {
  intellect: "Интеллект",
  imagination: "Воображение",
  adventurousness: "Авантюрность",
  aesthetics: "Эстетика",
  liberalism: "Либерализм",
  dutifulness: "Чувство долга",
  orderliness: "Упорядоченность",
  self_discipline: "Самодисциплина",
  achievement_striving: "Стремление к достижениям",
  cautiousness: "Осторожность",
  gregariousness: "Общительность",
  assertiveness: "Напористость",
  activity_level: "Активность",
  excitement_seeking: "Поиск впечатлений",
  friendliness: "Дружелюбие",
  trust: "Доверие",
  cooperation: "Кооперация",
  sympathy: "Сочувствие",
  modesty: "Скромность",
  altruism: "Альтруизм",
  anxiety: "Тревожность",
  anger: "Гнев",
  depression: "Депрессивность",
  self_consciousness: "Застенчивость",
  immoderation: "Невоздержанность",
};

const attachmentStyleLabels: Record<string, string> = {
  secure: "Надёжный",
  anxious: "Тревожный",
  avoidant: "Избегающий",
  disorganized: "Дезорганизованный",
};

const attachmentDescriptions: Record<string, string> = {
  secure: "Тебе комфортно с близостью и ты умеешь просить о помощи",
  anxious: "Ты боишься что тебя бросят и постоянно ищешь подтверждение",
  avoidant: "Ты отдаляешься когда становится слишком близко",
  disorganized: "Ты хочешь близости но боишься её одновременно",
};

const dersLabels: Record<string, { name: string; desc: string; reversed: boolean }> = {
  non_acceptance: { name: "Непринятие эмоций", desc: "Злишься на себя за то что чувствуешь", reversed: false },
  goals: { name: "Потеря фокуса", desc: "Теряешь способность действовать когда накрывает", reversed: false },
  impulse: { name: "Импульсивность", desc: "Делаешь то о чём потом жалеешь", reversed: false },
  awareness: { name: "Осознанность", desc: "Понимаешь что именно чувствуешь", reversed: true },
  strategies: { name: "Нет стратегий", desc: "Не знаешь что делать с тяжёлыми чувствами", reversed: false },
  clarity: { name: "Ясность", desc: "Можешь назвать свою эмоцию", reversed: true },
};

const schemaDescriptions: Record<string, string> = {
  abandonment: "Те кто мне дорог — уйдут",
  mistrust: "Людям нельзя доверять — обманут",
  emotional_deprivation: "Мои потребности никому не важны",
  defectiveness: "Со мной что-то не так",
  social_isolation: "Я не вписываюсь",
  failure: "Я не справлюсь",
  entitlement: "Мне можно то что другим нельзя",
  insufficient_self_control: "Не могу себя заставить",
  subjugation: "Мои желания не важны — важны чужие",
  self_sacrifice: "Я должен помогать даже если мне плохо",
  unrelenting_standards: "Я должен быть идеальным",
  emotional_inhibition: "Показывать чувства — слабость",
  punitiveness: "За ошибки надо платить",
  negativity: "Всё равно будет плохо",
  vulnerability: "Мир опасен — что-то случится",
  dependence: "Без других я не справлюсь",
  enmeshment: "Я не знаю где я заканчиваюсь и начинается другой",
  approval: "Мне нужно одобрение чтобы чувствовать себя ок",
};

const valueLabels: Record<string, string> = {
  self_direction_thought: "Свобода мысли",
  stimulation: "Новые впечатления",
  power_resources: "Власть и ресурсы",
  achievement: "Достижение целей",
  security: "Безопасность и стабильность",
  tradition: "Традиции и уважение",
  universalism: "Справедливость для всех",
  benevolence: "Забота о близких",
  self_direction_action: "Свобода действий",
  power_dominance: "Влияние на людей",
  hedonism: "Удовольствие и наслаждение",
  conformity: "Следование правилам",
};

const dasLabels: Record<string, { name: string; desc: string }> = {
  approval: { name: "Зависимость от одобрения", desc: "Тебе важно чтобы все тебя одобряли" },
  love: { name: "Зависимость от любви", desc: "Без отношений ты чувствуешь себя неполноценным" },
  achievement: { name: "Самоценность через достижения", desc: "Ты стоишь столько сколько достиг" },
  perfectionism: { name: "Перфекционизм", desc: "Если не идеально — значит плохо" },
  entitlement: { name: "Особые права", desc: "Ты заслуживаешь особого отношения" },
  autonomy: { name: "Потребность в контроле", desc: "Ты должен справляться сам" },
};

const aceDescriptionMap: Record<string, string> = {
  ace1: "Эмоциональное насилие",
  ace2: "Физическое насилие",
  ace3: "Сексуальное насилие",
  ace4: "Эмоциональное пренебрежение",
  ace5: "Физическое пренебрежение",
  ace6: "Развод/разлука родителей",
  ace7: "Насилие над матерью",
  ace8: "Зависимости в семье",
  ace9: "Психические заболевания в семье",
  ace10: "Заключение члена семьи",
};

// ── Table of Contents ──

const tocItems = [
  { num: "01", title: "Узнай себя — сценарии из твоей жизни", page: "3" },
  { num: "02", title: "Твои парадоксы — противоречия которые тобой управляют", page: "5" },
  { num: "03", title: "Big Five — 5 главных черт личности", page: "7" },
  { num: "04", title: "Стиль привязанности", page: "9" },
  { num: "05", title: "Эмоциональная регуляция (DERS)", page: "10" },
  { num: "06", title: "Глубинные схемы (Young)", page: "11" },
  { num: "07", title: "Связи — как всё работает вместе", page: "12" },
  { num: "08", title: "Силы и тени", page: "13" },
  { num: "09", title: "Слепые зоны", page: "14" },
  { num: "10", title: "План действий", page: "15" },
  { num: "11", title: "Ценности, мотивация, установки", page: "16" },
  { num: "12", title: "Неблагоприятный детский опыт (ACE)", page: "17" },
  { num: "13", title: "AI-профиль для нейросети", page: "18" },
  { num: "14", title: "Как со мной работать", page: "19" },
  { num: "15", title: "О методологии", page: "20" },
];

// ── Methodology list ──

const methodologies = [
  "Big Five (IPIP-NEO-120) — 5 основных черт личности",
  "ECR-R — стиль привязанности в отношениях",
  "DERS — шкала трудностей эмоциональной регуляции",
  "YSQ-S3 — ранние дезадаптивные схемы Young",
  "ACE — неблагоприятный детский опыт",
  "SDT — теория самодетерминации (Deci & Ryan)",
  "PVQ-RR — ценности по Шварцу",
  "DAS — шкала дисфункциональных установок (Beck)",
  "IFS — модель внутренних семейных систем",
  "Polyvagal Theory — поливагальная теория (Porges)",
  "ACT — терапия принятия и ответственности",
  "CFT — терапия сфокусированная на сострадании",
  "Narrative Identity — нарративная идентичность (McAdams)",
  "Object Relations — теория объектных отношений",
  "Ego Development — развитие эго (Loevinger)",
  "Defense Mechanisms — защитные механизмы (Vaillant)",
  "Schema Coping Styles — стили совладания со схемами",
  "Possible Selves — возможные Я (Markus & Nurius)",
  "Immunity to Change — иммунитет к изменениям (Kegan & Lahey)",
  "Metacognition — метакогниция",
  "Body Awareness — телесная осознанность",
  "Existential Themes — экзистенциальные темы",
];

// ── Helper Components ──

function ScaleBar({ label, value, max, color, suffix }: { label: string; value: number; max: number; color: string; suffix?: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <View style={styles.barContainer}>
      <View style={styles.barLabel}>
        <Text style={{ fontSize: 9, color: colors.textMuted }}>{label}</Text>
        <Text style={{ fontSize: 9, color: colors.textDim, fontFamily: "Inter" }}>
          {suffix ? `${value.toFixed(1)}${suffix}` : `${Math.round(value * 100)}%`}
        </Text>
      </View>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

function MiniBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <View style={{ marginBottom: 5 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
        <Text style={{ fontSize: 7, color: colors.textMuted }}>{label}</Text>
        <Text style={{ fontSize: 7, color: colors.textDim, fontFamily: "Inter" }}>{Math.round(value * 100)}%</Text>
      </View>
      <View style={[styles.barTrack, { height: 4 }]}>
        <View style={[styles.barFill, { height: 4, width: `${pct}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

function PageFooter({ pageNum }: { pageNum: number }) {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>PSYCHE SCAN — Полный психологический профиль</Text>
      <Text style={styles.footerText}>{pageNum}</Text>
    </View>
  );
}

function SectionHeader({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) {
  return (
    <View>
      <Text style={styles.sectionTag}>{tag}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
    </View>
  );
}

function getLevelLabel(score: number): string {
  if (score >= 0.7) return "Высокий";
  if (score >= 0.4) return "Средний";
  return "Низкий";
}

function getLevelColor(score: number): string {
  if (score >= 0.7) return colors.accent;
  if (score >= 0.4) return colors.amber;
  return colors.textDim;
}

function getDersColor(score: number, reversed: boolean): string {
  const effective = reversed ? 1 - score : score;
  if (effective > 0.7) return colors.red;
  if (effective >= 0.4) return colors.amber;
  return "#22c55e";
}

function getSchemaColor(level: string): string {
  switch (level) {
    case "dominant": return colors.red;
    case "active": return colors.accent;
    case "mild": return colors.amber;
    default: return colors.textDim;
  }
}

function getSdtColor(score: number): string {
  if (score >= 5) return "#22c55e";
  if (score >= 3.5) return colors.amber;
  return colors.red;
}

function getAceDescription(score: number): { text: string; color: string } {
  if (score === 0) return { text: "Минимальное влияние", color: "#22c55e" };
  if (score <= 3) return { text: "Умеренное — может влиять на текущие паттерны", color: colors.amber };
  return { text: "Высокое — рекомендуется работа с терапевтом", color: colors.red };
}

// ── Main Report Document ──

export function FullScanReport({ data }: { data: FullReportData }) {
  const { profile, passport, generatedAt } = data;
  const { big5, attachment, values, ders, das, schemas, ace, sdt } = profile;

  const dateFormatted = new Date(generatedAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Big Five dimensions array
  const big5Entries: [string, DimensionScore][] = [
    ["openness", big5.openness],
    ["conscientiousness", big5.conscientiousness],
    ["extraversion", big5.extraversion],
    ["agreeableness", big5.agreeableness],
    ["neuroticism", big5.neuroticism],
  ];

  // Get extreme facets only (>80% or <20%) — top 3 per dimension
  const getExtremeFacets = (dim: DimensionScore): { key: string; value: number }[] => {
    if (!dim.facets) return [];
    return Object.entries(dim.facets)
      .filter(([, v]) => v > 0.8 || v < 0.2)
      .sort((a, b) => Math.abs(b[1] - 0.5) - Math.abs(a[1] - 0.5))
      .slice(0, 3)
      .map(([key, value]) => ({ key, value }));
  };

  // Active/dominant schemas only
  const activeSchemas = schemas.filter(s => s.level === "dominant" || s.level === "active");
  const otherSchemas = schemas.filter(s => s.level === "mild" || s.level === "inactive");

  // Top values and bottom values
  const topValues = values.slice(0, 5);

  // DAS — top 3 problematic only
  const dasEntries = Object.entries(dasLabels)
    .map(([key, meta]) => ({ key, meta, dim: das[key] }))
    .filter(e => e.dim && e.dim.score > 0.4)
    .sort((a, b) => (b.dim?.score ?? 0) - (a.dim?.score ?? 0))
    .slice(0, 3);

  return (
    <Document>
      {/* ═══ PAGE 1: COVER ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.coverPage}>
          <Text style={styles.coverBrand}>PSYCHE SCAN</Text>
          <View style={styles.coverLine} />
          <Text style={{ fontSize: 11, color: colors.textMuted, marginBottom: 50, textAlign: "center" }}>
            Полный психологический профиль
          </Text>
          <Text style={[styles.coverTitle, { fontSize: 32 }]}>Полный психологический{"\n"}профиль</Text>
          <Text style={styles.coverModifier}>344 вопроса / 22 методики / 9 слоёв</Text>

          {passport.whoYouAre ? (
            <View style={{ marginTop: 30, maxWidth: 400 }}>
              <Text style={[styles.labelText, { textAlign: "center", marginBottom: 8 }]}>КТО ТЫ</Text>
              <Text style={{ fontSize: 10, color: colors.text, lineHeight: 1.7, textAlign: "center" }}>
                {passport.whoYouAre}
              </Text>
            </View>
          ) : null}

          <Text style={styles.coverDate}>{dateFormatted}</Text>
        </View>
      </Page>

      {/* ═══ PAGE 2: TABLE OF CONTENTS ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <SectionHeader tag="СОДЕРЖАНИЕ" title="Навигация по отчёту" />

          <View style={{ marginTop: 10 }}>
            {tocItems.map((item) => (
              <View key={item.num} style={{ flexDirection: "row", alignItems: "center", marginBottom: 12, borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 10 }}>
                <Text style={{ fontSize: 10, color: colors.accent, fontFamily: "Inter", fontWeight: 700, width: 28 }}>
                  {item.num}
                </Text>
                <Text style={{ fontSize: 10, color: colors.text, flex: 1 }}>{item.title}</Text>
                <Text style={{ fontSize: 9, color: colors.textDim, fontFamily: "Inter" }}>стр. {item.page}</Text>
              </View>
            ))}
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={[styles.smallText, { color: colors.textDim }]}>
              Этот отчёт содержит результаты глубокого психологического анализа по 22 клиническим методикам. Каждый раздел объяснён простым языком — без терминов и без воды.
            </Text>
          </View>
        </View>
        <PageFooter pageNum={2} />
      </Page>

      {/* ═══ PAGES 3-4: SCENARIO RECOGNITION ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <SectionHeader
            tag="УЗНАЙ СЕБЯ"
            title="Вот как это выглядит в твоей жизни"
            subtitle="Если 3 из 5 попали — мы тебя поняли"
          />

          {passport.scenarioRecognitions.slice(0, 3).map((scenario, i) => (
            <View key={i} style={{ borderLeftWidth: 3, borderLeftColor: colors.accent, paddingLeft: 14, marginBottom: 14 }}>
              <Text style={{ fontSize: 10, color: colors.white, lineHeight: 1.7 }}>
                {scenario}
              </Text>
            </View>
          ))}
        </View>
        <PageFooter pageNum={3} />
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <SectionHeader
            tag="УЗНАЙ СЕБЯ"
            title="Вот как это выглядит в твоей жизни (продолжение)"
          />

          {passport.scenarioRecognitions.slice(3, 5).map((scenario, i) => (
            <View key={i} style={{ borderLeftWidth: 3, borderLeftColor: colors.accent, paddingLeft: 14, marginBottom: 14 }}>
              <Text style={{ fontSize: 10, color: colors.white, lineHeight: 1.7 }}>
                {scenario}
              </Text>
            </View>
          ))}

          <View style={{ marginTop: 10 }}>
            <Text style={[styles.smallText, { color: colors.textDim }]}>
              Эти сценарии не случайны. Они основаны на комбинации твоих схем, стиля привязанности и паттернов эмоциональной регуляции. Дальше мы покажем откуда это берётся.
            </Text>
          </View>
        </View>
        <PageFooter pageNum={4} />
      </Page>

      {/* ═══ PAGES 5-6: PARADOXES — EMOTIONAL CLIMAX ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <SectionHeader
            tag="ПАРАДОКСЫ"
            title="Противоречия которые тобой управляют"
            subtitle="Парадокс — это когда ты хочешь одного, а делаешь противоположное. Не потому что ты нелогичен — а потому что разные части тебя хотят разного."
          />

          {passport.paradoxes.slice(0, 2).map((paradox, i) => (
            <View key={i} style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 12, color: colors.white, fontFamily: "Inter", fontWeight: 700, marginBottom: 10 }}>
                {paradox.title}
              </Text>

              <View style={styles.row}>
                <View style={[styles.col2, styles.card, { borderColor: colors.border }]}>
                  <Text style={[styles.labelText, { marginBottom: 6 }]}>ЧТО ВИДЯТ ДРУГИЕ</Text>
                  <Text style={{ fontSize: 9, color: colors.textMuted, lineHeight: 1.6 }}>
                    {paradox.whatOthersSee}
                  </Text>
                </View>
                <View style={[styles.col2, styles.cardAccent]}>
                  <Text style={[styles.labelText, { marginBottom: 6, color: colors.accent }]}>ЧТО ЧУВСТВУЕШЬ ТЫ</Text>
                  <Text style={{ fontSize: 9, color: colors.text, lineHeight: 1.6 }}>
                    {paradox.whatYouFeel}
                  </Text>
                </View>
              </View>

              <View style={[styles.card, { marginTop: 4 }]}>
                <Text style={[styles.labelText, { marginBottom: 4 }]}>ПОЧЕМУ ТАК</Text>
                <Text style={{ fontSize: 9, color: colors.textMuted, lineHeight: 1.6 }}>
                  {paradox.whyThisHappens}
                </Text>
              </View>

              <View style={{ borderLeftWidth: 2, borderLeftColor: colors.accent, paddingLeft: 14, marginTop: 6 }}>
                <Text style={{ fontSize: 9, color: colors.white, lineHeight: 1.6, fontStyle: "italic" }}>
                  {paradox.theIrony}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <PageFooter pageNum={5} />
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <SectionHeader
            tag="ПАРАДОКСЫ"
            title="Противоречия (продолжение)"
          />

          {passport.paradoxes.slice(2).map((paradox, i) => (
            <View key={i} style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 12, color: colors.white, fontFamily: "Inter", fontWeight: 700, marginBottom: 10 }}>
                {paradox.title}
              </Text>

              <View style={styles.row}>
                <View style={[styles.col2, styles.card, { borderColor: colors.border }]}>
                  <Text style={[styles.labelText, { marginBottom: 6 }]}>ЧТО ВИДЯТ ДРУГИЕ</Text>
                  <Text style={{ fontSize: 9, color: colors.textMuted, lineHeight: 1.6 }}>
                    {paradox.whatOthersSee}
                  </Text>
                </View>
                <View style={[styles.col2, styles.cardAccent]}>
                  <Text style={[styles.labelText, { marginBottom: 6, color: colors.accent }]}>ЧТО ЧУВСТВУЕШЬ ТЫ</Text>
                  <Text style={{ fontSize: 9, color: colors.text, lineHeight: 1.6 }}>
                    {paradox.whatYouFeel}
                  </Text>
                </View>
              </View>

              <View style={[styles.card, { marginTop: 4 }]}>
                <Text style={[styles.labelText, { marginBottom: 4 }]}>ПОЧЕМУ ТАК</Text>
                <Text style={{ fontSize: 9, color: colors.textMuted, lineHeight: 1.6 }}>
                  {paradox.whyThisHappens}
                </Text>
              </View>

              <View style={{ borderLeftWidth: 2, borderLeftColor: colors.accent, paddingLeft: 14, marginTop: 6 }}>
                <Text style={{ fontSize: 9, color: colors.white, lineHeight: 1.6, fontStyle: "italic" }}>
                  {paradox.theIrony}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <PageFooter pageNum={6} />
      </Page>

      {/* ═══ PAGE 7: BIG FIVE — BARS + SCENARIOS ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <SectionHeader
            tag="BIG FIVE"
            title="5 главных черт твоей личности"
            subtitle="Пять измерений которые описывают как ты думаешь, чувствуешь и действуешь. Самая изученная модель личности в мире."
          />

          {big5Entries.map(([key, dim]) => {
            const score = dim.score;
            const level = getLevelLabel(score);
            const levelColor = getLevelColor(score);
            const scenario = score >= 0.6 ? big5Scenarios[key].high : score >= 0.4 ? big5Scenarios[key].mid : big5Scenarios[key].low;

            return (
              <View key={key} style={[styles.card, { marginBottom: 8 }]}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <Text style={{ fontSize: 11, color: colors.white, fontFamily: "Inter", fontWeight: 700 }}>
                    {big5Labels[key]}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <Text style={{ fontSize: 8, color: levelColor, fontFamily: "Inter", fontWeight: 700 }}>
                      {level}
                    </Text>
                    <Text style={{ fontSize: 10, color: colors.accent, fontFamily: "Inter", fontWeight: 700 }}>
                      {Math.round(score * 100)}%
                    </Text>
                  </View>
                </View>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${Math.round(score * 100)}%`, backgroundColor: levelColor }]} />
                </View>
                <Text style={{ fontSize: 8, color: colors.textMuted, marginTop: 5, lineHeight: 1.5 }}>
                  {scenario}
                </Text>
              </View>
            );
          })}

          <View style={{ marginTop: 4 }}>
            <Text style={[styles.smallText, { color: colors.textDim }]}>
              Нет "хороших" или "плохих" результатов. Каждая черта — это спектр с плюсами и минусами по обе стороны.
            </Text>
          </View>
        </View>
        <PageFooter pageNum={7} />
      </Page>

      {/* ═══ PAGE 8: BIG FIVE — TOP EXTREME FACETS ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <SectionHeader
            tag="BIG FIVE — ФАСЕТЫ"
            title="Самые выраженные подшкалы"
            subtitle="Показаны только экстремальные фасеты (выше 80% или ниже 20%) — именно они определяют твою уникальность внутри каждого измерения."
          />

          {big5Entries.map(([key, dim]) => {
            const extremeFacets = getExtremeFacets(dim);
            if (extremeFacets.length === 0) return null;

            return (
              <View key={key} style={[styles.card, { marginBottom: 10 }]}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                  <Text style={{ fontSize: 10, color: colors.white, fontFamily: "Inter", fontWeight: 700 }}>
                    {big5Labels[key]}
                  </Text>
                  <Text style={{ fontSize: 9, color: colors.accent, fontFamily: "Inter" }}>
                    {Math.round(dim.score * 100)}%
                  </Text>
                </View>
                {extremeFacets.map((facet) => (
                  <MiniBar
                    key={facet.key}
                    label={facetLabels[facet.key] || facet.key}
                    value={facet.value}
                    max={1}
                    color={getLevelColor(facet.value)}
                  />
                ))}
              </View>
            );
          })}

          {big5Entries.every(([, dim]) => getExtremeFacets(dim).length === 0) && (
            <View style={styles.card}>
              <Text style={{ fontSize: 9, color: colors.textMuted, lineHeight: 1.6 }}>
                У тебя нет экстремальных фасетов — все подшкалы в среднем диапазоне. Это означает сбалансированный профиль без резких перекосов.
              </Text>
            </View>
          )}

          <View style={{ marginTop: 10 }}>
            <Text style={[styles.smallText, { color: colors.textDim }]}>
              Фасеты помогают понять нюансы. Например, высокий нейротизм с высокой тревожностью но низким гневом — совсем другой профиль чем высокий нейротизм с высоким гневом.
            </Text>
          </View>
        </View>
        <PageFooter pageNum={8} />
      </Page>

      {/* ═══ PAGE 9: ATTACHMENT STYLE ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <SectionHeader
            tag="ПРИВЯЗАННОСТЬ"
            title="Как ты строишь близкие отношения"
            subtitle="Стиль привязанности — это шаблон по которому ты сближаешься с людьми. Он формируется в детстве и работает на автомате во всех близких отношениях."
          />

          <View style={[styles.card, { marginBottom: 14 }]}>
            <Text style={[styles.labelText, { marginBottom: 8 }]}>ДВЕ ОСИ ПРИВЯЗАННОСТИ</Text>
            <ScaleBar
              label="Тревожность"
              value={attachment.anxiety}
              max={7}
              color={attachment.anxiety > 4 ? colors.red : attachment.anxiety > 2.5 ? colors.amber : "#22c55e"}
              suffix="/7"
            />
            <View style={{ height: 4 }} />
            <ScaleBar
              label="Избегание"
              value={attachment.avoidance}
              max={7}
              color={attachment.avoidance > 4 ? colors.red : attachment.avoidance > 2.5 ? colors.amber : "#22c55e"}
              suffix="/7"
            />
            <Text style={{ fontSize: 7, color: colors.textDim, marginTop: 6 }}>
              Низкая тревожность + низкое избегание = надёжный стиль. Высокая тревожность = страх быть брошенным. Высокое избегание = страх близости.
            </Text>
          </View>

          <View style={[styles.cardAccent, { alignItems: "center", paddingVertical: 18, marginBottom: 14 }]}>
            <Text style={styles.labelText}>ТВОЙ СТИЛЬ</Text>
            <Text style={{ fontSize: 26, color: colors.white, fontFamily: "Inter", fontWeight: 700, marginTop: 6, marginBottom: 6 }}>
              {attachmentStyleLabels[attachment.style]}
            </Text>
            <View style={{
              backgroundColor: attachment.style === "secure" ? "#22c55e" : attachment.style === "anxious" ? colors.red : attachment.style === "avoidant" ? colors.amber : colors.red,
              borderRadius: 4,
              paddingHorizontal: 12,
              paddingVertical: 4,
            }}>
              <Text style={{ fontSize: 8, color: colors.white, fontFamily: "Inter", fontWeight: 700 }}>
                {attachment.style === "secure" ? "ЗДОРОВЫЙ" : "ТРЕБУЕТ ВНИМАНИЯ"}
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={{ fontSize: 10, color: colors.text, lineHeight: 1.8 }}>
              {attachmentDescriptions[attachment.style]}
            </Text>
          </View>

          {passport.crossAnalysis.relationshipPattern.text && (
            <View style={[styles.cardAccent, { marginTop: 10 }]}>
              <Text style={[styles.labelText, { marginBottom: 6, color: colors.accent }]}>ПАТТЕРН В ОТНОШЕНИЯХ</Text>
              <Text style={{ fontSize: 9, color: colors.text, lineHeight: 1.6 }}>
                {passport.crossAnalysis.relationshipPattern.headline}
              </Text>
              <Text style={{ fontSize: 8, color: colors.textMuted, lineHeight: 1.6, marginTop: 4 }}>
                {passport.crossAnalysis.relationshipPattern.text}
              </Text>
            </View>
          )}

          <View style={{ marginTop: 10 }}>
            <Text style={[styles.smallText, { color: colors.textDim }]}>
              Стиль привязанности можно изменить через осознанную работу в терапии или в здоровых отношениях. Это не приговор.
            </Text>
          </View>
        </View>
        <PageFooter pageNum={9} />
      </Page>

      {/* ═══ PAGE 10: DERS — EMOTIONAL REGULATION ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <SectionHeader
            tag="ЭМОЦИИ"
            title="Как ты управляешь эмоциями"
            subtitle="DERS измеряет 6 аспектов эмоциональной регуляции. Это не про то хорошо или плохо ты чувствуешь — а про то, что ты делаешь когда чувства становятся сильными."
          />

          {Object.entries(dersLabels).map(([key, meta]) => {
            const dim = ders[key];
            if (!dim) return null;
            const score = dim.score;
            const barColor = getDersColor(score, meta.reversed);

            return (
              <View key={key} style={[styles.card, { marginBottom: 8 }]}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <Text style={{ fontSize: 10, color: colors.white, fontFamily: "Inter", fontWeight: 700 }}>
                    {meta.name}
                  </Text>
                  <Text style={{ fontSize: 9, color: barColor, fontFamily: "Inter", fontWeight: 700 }}>
                    {Math.round(score * 100)}%
                  </Text>
                </View>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${Math.round(score * 100)}%`, backgroundColor: barColor }]} />
                </View>
                <Text style={{ fontSize: 8, color: colors.textMuted, marginTop: 4, lineHeight: 1.5 }}>
                  {meta.desc}
                  {meta.reversed ? " (высокий = хорошо)" : " (высокий = проблема)"}
                </Text>
              </View>
            );
          })}

          {passport.crossAnalysis.stressPattern.text && (
            <View style={[styles.cardAccent, { marginTop: 8 }]}>
              <Text style={[styles.labelText, { marginBottom: 4, color: colors.accent }]}>ПАТТЕРН СТРЕССА</Text>
              <Text style={{ fontSize: 9, color: colors.text, lineHeight: 1.6 }}>
                {passport.crossAnalysis.stressPattern.headline}
              </Text>
              <Text style={{ fontSize: 8, color: colors.textMuted, lineHeight: 1.6, marginTop: 4 }}>
                {passport.crossAnalysis.stressPattern.text}
              </Text>
            </View>
          )}
        </View>
        <PageFooter pageNum={10} />
      </Page>

      {/* ═══ PAGE 11: SCHEMAS ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <SectionHeader
            tag="СХЕМЫ"
            title="Глубинные убеждения о себе и мире"
            subtitle="Схемы — это убеждения из детства которые управляют тобой на автомате. Они влияют на выбор партнёров, реакцию на стресс, отношение к себе."
          />

          {activeSchemas.length > 0 && (
            <View style={{ marginBottom: 10 }}>
              <Text style={[styles.labelText, { marginBottom: 8, color: colors.accent }]}>АКТИВНЫЕ И ДОМИНИРУЮЩИЕ</Text>
              {activeSchemas.map((schema) => {
                const barColor = getSchemaColor(schema.level);
                const pct = Math.min((schema.score / 6) * 100, 100);
                const desc = schemaDescriptions[schema.name];
                const levelLabels: Record<string, string> = {
                  dominant: "Доминирует",
                  active: "Активна",
                  mild: "Слабая",
                  inactive: "Неактивна",
                };

                return (
                  <View key={schema.name} style={{ marginBottom: 8 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                      <Text style={{ fontSize: 9, color: colors.white, fontFamily: "Inter", fontWeight: 700 }}>
                        {desc || schema.name}
                      </Text>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                        <Text style={{ fontSize: 7, color: barColor, fontFamily: "Inter" }}>
                          {levelLabels[schema.level]}
                        </Text>
                        <Text style={{ fontSize: 8, color: colors.textDim, fontFamily: "Inter" }}>
                          {schema.score.toFixed(1)}/6
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.barTrack, { height: 5 }]}>
                      <View style={[styles.barFill, { height: 5, width: `${pct}%`, backgroundColor: barColor }]} />
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          {otherSchemas.length > 0 && (
            <View style={{ marginBottom: 10 }}>
              <Text style={[styles.labelText, { marginBottom: 8 }]}>ОСТАЛЬНЫЕ СХЕМЫ</Text>
              {otherSchemas.map((schema) => {
                const barColor = getSchemaColor(schema.level);
                const pct = Math.min((schema.score / 6) * 100, 100);
                const desc = schemaDescriptions[schema.name];

                return (
                  <View key={schema.name} style={{ marginBottom: 5 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                      <Text style={{ fontSize: 8, color: colors.textMuted }}>
                        {desc || schema.name}
                      </Text>
                      <Text style={{ fontSize: 7, color: colors.textDim, fontFamily: "Inter" }}>
                        {schema.score.toFixed(1)}/6
                      </Text>
                    </View>
                    <View style={[styles.barTrack, { height: 4 }]}>
                      <View style={[styles.barFill, { height: 4, width: `${pct}%`, backgroundColor: barColor }]} />
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          <View style={styles.card}>
            <Text style={{ fontSize: 8, color: colors.textMuted, lineHeight: 1.6 }}>
              Схемы не "лечатся" — они осознаются. Когда ты видишь что "со мной что-то не так" — это не факт, а убеждение из детства. Само осознание уже ослабляет хватку схемы.
            </Text>
          </View>
        </View>
        <PageFooter pageNum={11} />
      </Page>

      {/* ═══ PAGE 12: CROSS-ANALYSIS ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <SectionHeader
            tag="СВЯЗИ"
            title="Как всё это работает вместе"
            subtitle="Этот раздел соединяет результаты всех тестов и показывает как разные аспекты твоей личности взаимодействуют друг с другом."
          />

          {[
            { key: "work", label: "РАБОТА", data: passport.crossAnalysis.workPattern },
            { key: "relationship", label: "ОТНОШЕНИЯ", data: passport.crossAnalysis.relationshipPattern },
            { key: "stress", label: "СТРЕСС", data: passport.crossAnalysis.stressPattern },
          ].map((item) => (
            <View key={item.key} style={[styles.cardAccent, { marginBottom: 12, paddingVertical: 16 }]}>
              <Text style={[styles.labelText, { marginBottom: 8, color: colors.accent }]}>{item.label}</Text>
              <Text style={{ fontSize: 12, color: colors.white, fontFamily: "Inter", fontWeight: 700, marginBottom: 6 }}>
                {item.data.headline}
              </Text>
              <Text style={{ fontSize: 9, color: colors.text, lineHeight: 1.7 }}>
                {item.data.text}
              </Text>
            </View>
          ))}
        </View>
        <PageFooter pageNum={12} />
      </Page>

      {/* ═══ PAGE 13: STRENGTHS WITH SHADOW ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <SectionHeader
            tag="СИЛЫ И ТЕНИ"
            title="Твои сильные стороны и их обратная сторона"
            subtitle="Каждая сила имеет тень. Знание обеих сторон — это не слабость, а мудрость."
          />

          {passport.strengths.map((strength, i) => (
            <View key={i} style={{ marginBottom: 12 }}>
              <View style={styles.row}>
                <View style={[styles.col2, styles.card]}>
                  <Text style={{ fontSize: 11, color: colors.white, fontFamily: "Inter", fontWeight: 700, marginBottom: 4 }}>
                    {strength.name}
                  </Text>
                  <Text style={{ fontSize: 8, color: colors.textMuted, lineHeight: 1.6 }}>
                    {strength.description}
                  </Text>
                </View>
                <View style={[styles.col2, styles.card, { borderColor: colors.red }]}>
                  <Text style={[styles.labelText, { marginBottom: 4, color: colors.red }]}>ТЕНЬ</Text>
                  <Text style={{ fontSize: 8, color: colors.textMuted, lineHeight: 1.6 }}>
                    {strength.shadowSide}
                  </Text>
                </View>
              </View>
              <View style={{ borderLeftWidth: 2, borderLeftColor: colors.accent, paddingLeft: 14, marginTop: 4 }}>
                <Text style={{ fontSize: 8, color: colors.textMuted, lineHeight: 1.5, fontStyle: "italic" }}>
                  Похоже на тебя: {strength.soundsLikeYou}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <PageFooter pageNum={13} />
      </Page>

      {/* ═══ PAGE 14: BLIND SPOTS ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <SectionHeader
            tag="СЛЕПЫЕ ЗОНЫ"
            title="Что ты не видишь о себе"
            subtitle="Слепые зоны — это расхождения между тем что ты думаешь о себе и тем что показывают данные. Это самая ценная часть отчёта."
          />

          {passport.blindSpots.map((spot, i) => (
            <View key={i} style={{ marginBottom: 14 }}>
              <View style={[styles.card, { marginBottom: 4 }]}>
                <Text style={[styles.labelText, { marginBottom: 4 }]}>ТЫ ДУМАЕШЬ:</Text>
                <Text style={{ fontSize: 10, color: colors.text, lineHeight: 1.6 }}>
                  {spot.belief}
                </Text>
              </View>
              <View style={[styles.cardAccent, { marginBottom: 4 }]}>
                <Text style={[styles.labelText, { marginBottom: 4, color: colors.accent }]}>ДАННЫЕ ПОКАЗЫВАЮТ:</Text>
                <Text style={{ fontSize: 10, color: colors.white, lineHeight: 1.6 }}>
                  {spot.reality}
                </Text>
              </View>
              <Text style={{ fontSize: 8, color: colors.accent, lineHeight: 1.5, paddingLeft: 4 }}>
                {spot.evidence}
              </Text>
            </View>
          ))}
        </View>
        <PageFooter pageNum={14} />
      </Page>

      {/* ═══ PAGE 15: GROWTH PLAN ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <SectionHeader
            tag="ЧТО ДЕЛАТЬ"
            title="План действий (в порядке приоритета)"
            subtitle="Конкретные шаги основанные на твоих данных. Начни с первого пункта — он даст максимальный эффект."
          />

          {passport.growthPlan.map((item, i) => (
            <View key={i} style={{ marginBottom: 14 }}>
              <View style={{ flexDirection: "row", gap: 12, marginBottom: 6 }}>
                <Text style={{ fontSize: 28, color: colors.accent, fontFamily: "Inter", fontWeight: 700, lineHeight: 1 }}>
                  {item.priority}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, color: colors.white, fontFamily: "Inter", fontWeight: 700, marginBottom: 4 }}>
                    {item.area}
                  </Text>
                  <Text style={{ fontSize: 8, color: colors.textMuted, lineHeight: 1.6 }}>
                    {item.why}
                  </Text>
                </View>
              </View>

              <View style={[styles.cardAccent, { marginBottom: 4 }]}>
                <Text style={[styles.labelText, { marginBottom: 4, color: colors.accent }]}>ПЕРВЫЙ ШАГ</Text>
                <Text style={{ fontSize: 9, color: colors.text, lineHeight: 1.6 }}>
                  {item.firstStep}
                </Text>
              </View>

              <View style={[styles.card]}>
                <Text style={[styles.labelText, { marginBottom: 4 }]}>ЧТО ИЗМЕНИТСЯ</Text>
                <Text style={{ fontSize: 8, color: colors.textMuted, lineHeight: 1.6 }}>
                  {item.whatChanges}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <PageFooter pageNum={15} />
      </Page>

      {/* ═══ PAGE 16: VALUES + SDT + DAS — CONDENSED ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <SectionHeader
            tag="ДОПОЛНИТЕЛЬНЫЕ ДАННЫЕ"
            title="Ценности, мотивация, установки"
          />

          {/* Values — Top 5 compact bars */}
          <View style={[styles.card, { marginBottom: 10 }]}>
            <Text style={[styles.labelText, { marginBottom: 8, color: colors.accent }]}>ТОП-5 ЦЕННОСТЕЙ (SCHWARTZ)</Text>
            {topValues.map((v, i) => {
              const pct = Math.min((v.score / 6) * 100, 100);
              return (
                <View key={v.facet} style={{ marginBottom: 6 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <Text style={{ fontSize: 9, color: colors.accent, fontFamily: "Inter", fontWeight: 700, width: 14 }}>
                      {i + 1}
                    </Text>
                    <Text style={{ fontSize: 9, color: colors.white, fontFamily: "Inter", fontWeight: 700, flex: 1 }}>
                      {valueLabels[v.facet] || v.facet}
                    </Text>
                    <Text style={{ fontSize: 8, color: colors.textDim, fontFamily: "Inter" }}>
                      {v.score.toFixed(1)}/6
                    </Text>
                  </View>
                  <View style={{ marginLeft: 20 }}>
                    <View style={[styles.barTrack, { height: 4 }]}>
                      <View style={[styles.barFill, { height: 4, width: `${pct}%`, backgroundColor: colors.accent }]} />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          {/* SDT — 3 inline cards */}
          <View style={{ marginBottom: 10 }}>
            <Text style={[styles.labelText, { marginBottom: 8 }]}>ТРИ БАЗОВЫЕ ПОТРЕБНОСТИ (SDT)</Text>
            <View style={styles.row}>
              {[
                { key: "autonomy", label: "Автономия", value: sdt.autonomy },
                { key: "competence", label: "Компетентность", value: sdt.competence },
                { key: "relatedness", label: "Связанность", value: sdt.relatedness },
              ].map((item) => {
                const sdtColor = getSdtColor(item.value);
                const statusText = item.value >= 5 ? "Ок" : item.value >= 3.5 ? "Частично" : "Проблема";
                return (
                  <View key={item.key} style={[styles.col2, styles.card, { alignItems: "center", paddingVertical: 12 }]}>
                    <Text style={{ fontSize: 8, color: colors.textMuted, marginBottom: 4 }}>{item.label}</Text>
                    <Text style={{ fontSize: 18, color: sdtColor, fontFamily: "Inter", fontWeight: 700 }}>
                      {item.value.toFixed(1)}
                    </Text>
                    <Text style={{ fontSize: 7, color: colors.textDim }}>/7</Text>
                    <Text style={{ fontSize: 7, color: sdtColor, fontFamily: "Inter", fontWeight: 700, marginTop: 4 }}>
                      {statusText}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* DAS — Top 3 problematic only */}
          {dasEntries.length > 0 && (
            <View style={styles.card}>
              <Text style={[styles.labelText, { marginBottom: 8, color: colors.amber }]}>ПРОБЛЕМНЫЕ УСТАНОВКИ (DAS)</Text>
              {dasEntries.map(({ key, meta, dim }) => {
                if (!dim) return null;
                const score = dim.score;
                const barColor = score > 0.7 ? colors.red : colors.amber;
                return (
                  <View key={key} style={{ marginBottom: 8 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                      <Text style={{ fontSize: 9, color: colors.white, fontFamily: "Inter", fontWeight: 700 }}>
                        {meta.name}
                      </Text>
                      <Text style={{ fontSize: 8, color: barColor, fontFamily: "Inter", fontWeight: 700 }}>
                        {Math.round(score * 100)}%
                      </Text>
                    </View>
                    <View style={[styles.barTrack, { height: 4 }]}>
                      <View style={[styles.barFill, { height: 4, width: `${Math.round(score * 100)}%`, backgroundColor: barColor }]} />
                    </View>
                    <Text style={{ fontSize: 7, color: colors.textMuted, marginTop: 2 }}>
                      {meta.desc}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}

          <View style={{ marginTop: 8 }}>
            <Text style={[styles.smallText, { color: colors.textDim }]}>
              Ценности определяют что для тебя важно. SDT — насколько твои базовые потребности закрыты. DAS — какие убеждения тебе мешают.
            </Text>
          </View>
        </View>
        <PageFooter pageNum={16} />
      </Page>

      {/* ═══ PAGE 17: ACE SCORE ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <SectionHeader
            tag="ДЕТСКИЙ ОПЫТ"
            title="Неблагоприятный детский опыт"
            subtitle="ACE (Adverse Childhood Experiences) — стандартный медицинский инструмент оценки детских травм. Он не измеряет боль — он измеряет факторы риска."
          />

          <View style={[styles.cardAccent, { alignItems: "center", paddingVertical: 24, marginBottom: 16 }]}>
            <Text style={styles.labelText}>ТВОЙ ACE БАЛЛ</Text>
            <Text style={{ fontSize: 56, color: getAceDescription(ace.score).color, fontFamily: "Inter", fontWeight: 700, marginVertical: 8 }}>
              {ace.score}
            </Text>
            <Text style={{ fontSize: 14, color: colors.textMuted }}>из 10</Text>
          </View>

          <View style={{ marginBottom: 14 }}>
            {[
              { range: "0", label: "Минимальное влияние", color: "#22c55e", active: ace.score === 0 },
              { range: "1-3", label: "Умеренное — может влиять на текущие паттерны", color: colors.amber, active: ace.score >= 1 && ace.score <= 3 },
              { range: "4+", label: "Высокое — рекомендуется работа с терапевтом", color: colors.red, active: ace.score >= 4 },
            ].map((item) => (
              <View key={item.range} style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
                backgroundColor: item.active ? colors.bgCard : "transparent",
                borderRadius: 6,
                padding: item.active ? 10 : 4,
                ...(item.active ? { borderWidth: 1, borderColor: item.color } : {}),
              }}>
                <View style={{ backgroundColor: item.color, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3 }}>
                  <Text style={{ fontSize: 9, color: colors.white, fontFamily: "Inter", fontWeight: 700 }}>
                    {item.range}
                  </Text>
                </View>
                <Text style={{ fontSize: 9, color: item.active ? colors.white : colors.textMuted, flex: 1 }}>
                  {item.label}
                </Text>
              </View>
            ))}
          </View>

          {ace.items.length > 0 && (
            <View style={[styles.card, { marginBottom: 14 }]}>
              <Text style={[styles.labelText, { marginBottom: 8 }]}>ОТМЕЧЕННЫЕ ФАКТОРЫ</Text>
              {ace.items.map((item, i) => {
                const humanDescription = aceDescriptionMap[item] || item;
                return (
                  <View key={i} style={{ flexDirection: "row", gap: 6, marginBottom: 4 }}>
                    <Text style={{ fontSize: 8, color: colors.accent }}>-</Text>
                    <Text style={{ fontSize: 8, color: colors.textMuted, lineHeight: 1.5, flex: 1 }}>{humanDescription}</Text>
                  </View>
                );
              })}
            </View>
          )}

          <View style={styles.quoteBlock}>
            <Text style={[styles.quoteText, { fontSize: 10 }]}>
              Высокий балл не приговор. Это информация о том откуда растут твои паттерны. Люди с ACE 7+ строят счастливую жизнь — при условии осознанности и поддержки.
            </Text>
          </View>
        </View>
        <PageFooter pageNum={17} />
      </Page>

      {/* ═══ PAGE 18: AI PROFILE ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <SectionHeader
            tag="AI-ПРОФИЛЬ"
            title="AI-профиль для нейросети"
            subtitle="Скопируй текст ниже в ChatGPT, Claude или другой AI — он сразу будет понимать как с тобой общаться, что тебя мотивирует и чего избегать."
          />

          <View style={[styles.card, { backgroundColor: "#111111", paddingVertical: 20, paddingHorizontal: 16 }]}>
            <Text style={{ fontSize: 7, color: colors.textMuted, fontFamily: "Inter", lineHeight: 1.6 }}>
              {passport.aiProfile}
            </Text>
          </View>

          <View style={{ marginTop: 14 }}>
            <Text style={[styles.smallText, { color: colors.textDim }]}>
              Этот профиль можно вставить в начало любого чата с AI. Он будет адаптировать ответы под твою личность, стиль мышления и текущие задачи.
            </Text>
          </View>
        </View>
        <PageFooter pageNum={18} />
      </Page>

      {/* ═══ PAGE 19: HOW TO WORK WITH ME ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <SectionHeader
            tag="ИНСТРУКЦИЯ"
            title="Как со мной работать"
            subtitle="Эту страницу можно показать партнёру, другу, коллеге или терапевту. Она объясняет как с тобой лучше взаимодействовать."
          />

          <View style={[styles.cardAccent, { paddingVertical: 18 }]}>
            {passport.workWithMe.length > 0 ? (
              passport.workWithMe.map((item, i) => (
                <View key={i} style={{ flexDirection: "row", gap: 6, marginBottom: 6 }}>
                  <Text style={{ fontSize: 9, color: colors.accent }}>-</Text>
                  <Text style={{ fontSize: 9, color: colors.text, lineHeight: 1.6, flex: 1 }}>{item}</Text>
                </View>
              ))
            ) : (
              <Text style={{ fontSize: 9, color: colors.text, lineHeight: 1.7 }}>
                Раздел "Как со мной работать" будет сгенерирован AI на основе твоего полного профиля.
              </Text>
            )}
          </View>
        </View>
        <PageFooter pageNum={19} />
      </Page>

      {/* ═══ PAGE 20: METHODOLOGY ═══ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <SectionHeader
            tag="МЕТОДОЛОГИЯ"
            title="О чём этот отчёт"
            subtitle="Этот отчёт основан на 22 валидированных клинических и исследовательских методиках. Каждая из них прошла десятилетия научной проверки."
          />

          <View style={[styles.card, { marginBottom: 14 }]}>
            <Text style={[styles.labelText, { marginBottom: 10 }]}>22 ИСПОЛЬЗОВАННЫЕ МЕТОДИКИ</Text>
            {methodologies.map((m, i) => (
              <View key={i} style={{ flexDirection: "row", gap: 6, marginBottom: 4 }}>
                <Text style={{ fontSize: 7, color: colors.accent, fontFamily: "Inter", fontWeight: 700, width: 14 }}>
                  {String(i + 1).padStart(2, "0")}
                </Text>
                <Text style={{ fontSize: 7, color: colors.textMuted, lineHeight: 1.5, flex: 1 }}>{m}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.card, { borderColor: colors.amber, marginBottom: 14 }]}>
            <Text style={[styles.labelText, { color: colors.amber, marginBottom: 6 }]}>ОГРАНИЧЕНИЯ</Text>
            <Text style={{ fontSize: 8, color: colors.textMuted, lineHeight: 1.6 }}>
              Этот отчёт не является медицинским диагнозом. Он предназначен для самопознания и не заменяет консультацию с квалифицированным психологом или психотерапевтом. Результаты основаны на самоотчёте и могут отражать текущее состояние, а не стабильные черты. При высоких баллах по ACE, схемам или DERS рекомендуется обратиться к специалисту.
            </Text>
          </View>

          <View style={[styles.card, { marginBottom: 14 }]}>
            <Text style={[styles.labelText, { marginBottom: 6 }]}>НУЖНА ПОМОЩЬ?</Text>
            <Text style={{ fontSize: 8, color: colors.textMuted, lineHeight: 1.6 }}>
              Если результаты вызвали сильные эмоции или ты хочешь разобраться глубже — мы рекомендуем обратиться к психотерапевту. Схема-терапия, КПТ и EMDR особенно эффективны для работы с паттернами описанными в этом отчёте.
            </Text>
          </View>

          <View style={{ marginTop: 10, alignItems: "center" }}>
            <Text style={{ fontSize: 8, color: colors.textDim }}>psyche-scan.vercel.app</Text>
            <Text style={{ fontSize: 7, color: colors.textDim, marginTop: 4 }}>
              {dateFormatted}
            </Text>
          </View>
        </View>
        <PageFooter pageNum={20} />
      </Page>
    </Document>
  );
}
