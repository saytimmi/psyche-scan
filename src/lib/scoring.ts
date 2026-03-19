// Scoring engine for personality profiling
// Converts raw answers into structured personality data

import { Question, sessions } from "@/data/questions";

export interface RawAnswer {
  questionId: string;
  value: number | string | boolean;
  answeredAt: string;
}

export interface DimensionScore {
  dimension: string;
  score: number; // normalized 0-1
  rawScore: number;
  maxPossible: number;
  facets?: Record<string, number>;
  confidence: number;
  source: "tested";
}

export interface SchemaScore {
  name: string;
  score: number; // 1-6
  level: "inactive" | "mild" | "active" | "dominant";
}

export interface AttachmentResult {
  anxiety: number; // 1-7
  avoidance: number; // 1-7
  style: "secure" | "anxious" | "avoidant" | "disorganized";
}

export interface ProfileResult {
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

// Get all questions as a flat map
function getQuestionMap(): Map<string, Question> {
  const map = new Map<string, Question>();
  for (const session of sessions) {
    for (const section of session.sections) {
      for (const q of section.questions) {
        map.set(q.id, q);
      }
    }
  }
  return map;
}

// Score a group of scale questions into a dimension
function scoreDimension(
  answers: RawAnswer[],
  questions: Question[],
  questionMap: Map<string, Question>
): DimensionScore {
  const relevant = answers.filter((a) =>
    questions.some((q) => q.id === a.questionId)
  );
  if (relevant.length === 0) {
    return { dimension: questions[0]?.dimension ?? "", score: 0, rawScore: 0, maxPossible: 0, confidence: 0, source: "tested" };
  }

  const facets: Record<string, number[]> = {};
  let totalRaw = 0;
  let maxPossible = 0;
  let minPossible = 0;

  for (const ans of relevant) {
    const q = questionMap.get(ans.questionId);
    if (!q || typeof ans.value !== "number") continue;

    const max = q.scale?.max ?? 5;
    const min = q.scale?.min ?? 1;
    let val = ans.value;

    // Reverse scoring
    if (q.reverse) {
      val = max + min - val;
    }

    totalRaw += val;
    maxPossible += max;
    minPossible += min;

    if (q.facet) {
      if (!facets[q.facet]) facets[q.facet] = [];
      facets[q.facet].push((val - min) / (max - min));
    }
  }

  // Normalize to true 0-1 range (not inflated by scale minimum)
  const range = maxPossible - minPossible;
  const score = range > 0 ? (totalRaw - minPossible) / range : 0;
  const facetScores: Record<string, number> = {};
  for (const [facet, vals] of Object.entries(facets)) {
    facetScores[facet] = vals.reduce((a, b) => a + b, 0) / vals.length;
  }

  return {
    dimension: questions[0]?.dimension ?? "",
    score: Math.round(score * 100) / 100,
    rawScore: totalRaw,
    maxPossible,
    facets: Object.keys(facetScores).length > 0 ? facetScores : undefined,
    confidence: Math.min(0.75, 0.5 + relevant.length * 0.05),
    source: "tested",
  };
}

// Score attachment
function scoreAttachment(answers: RawAnswer[], questionMap: Map<string, Question>): AttachmentResult {
  const anxietyAnswers = answers.filter((a) => a.questionId.startsWith("att_anx"));
  const avoidanceAnswers = answers.filter((a) => a.questionId.startsWith("att_av"));

  const avg = (arr: RawAnswer[]) => {
    const nums = arr.filter((a) => typeof a.value === "number").map((a) => a.value as number);
    return nums.length > 0 ? nums.reduce((a, b) => a + b, 0) / nums.length : 4;
  };

  const anxiety = Math.round(avg(anxietyAnswers) * 10) / 10;
  const avoidance = Math.round(avg(avoidanceAnswers) * 10) / 10;

  let style: AttachmentResult["style"] = "secure";
  if (anxiety > 4.5 && avoidance > 4.5) style = "disorganized";
  else if (anxiety > 4.5) style = "anxious";
  else if (avoidance > 4.5) style = "avoidant";

  return { anxiety, avoidance, style };
}

// Score schemas
function scoreSchemas(answers: RawAnswer[], questionMap: Map<string, Question>): SchemaScore[] {
  const schemaGroups: Record<string, number[]> = {};

  for (const ans of answers) {
    const q = questionMap.get(ans.questionId);
    if (!q || !q.dimension.startsWith("schemas.") || typeof ans.value !== "number") continue;
    const schemaName = q.dimension.replace("schemas.", "");
    if (!schemaGroups[schemaName]) schemaGroups[schemaName] = [];
    schemaGroups[schemaName].push(ans.value);
  }

  return Object.entries(schemaGroups)
    .map(([name, scores]) => {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      const rounded = Math.round(avg * 10) / 10;
      let level: SchemaScore["level"] = "inactive";
      if (avg >= 4.5) level = "dominant";
      else if (avg >= 3.5) level = "active";
      else if (avg >= 2.5) level = "mild";
      return { name, score: rounded, level };
    })
    .sort((a, b) => b.score - a.score);
}

// Score ACE
function scoreACE(answers: RawAnswer[]): { score: number; items: string[] } {
  const aceAnswers = answers.filter((a) => a.questionId.startsWith("ace"));
  const items: string[] = [];
  let score = 0;
  for (const ans of aceAnswers) {
    if (ans.value === true || ans.value === "yes") {
      score++;
      items.push(ans.questionId);
    }
  }
  return { score, items };
}

// Score SDT
function scoreSDT(answers: RawAnswer[]): { autonomy: number; competence: number; relatedness: number } {
  const avgByIds = (ids: string[]) => {
    const vals = answers
      .filter((a) => ids.includes(a.questionId) && typeof a.value === "number")
      .map((a) => a.value as number);
    return vals.length > 0 ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10 : 0;
  };

  return {
    autonomy: avgByIds(["sdt1", "sdt2", "sdt3"]),
    competence: avgByIds(["sdt4", "sdt5", "sdt6"]),
    relatedness: avgByIds(["sdt7", "sdt8", "sdt9"]),
  };
}

// Main scoring function
export function scoreProfile(answers: RawAnswer[]): ProfileResult {
  const questionMap = getQuestionMap();
  const allQuestions = Array.from(questionMap.values());

  // Big Five
  const big5Questions = (prefix: string) => allQuestions.filter((q) => q.dimension === `big5.${prefix}`);
  const big5 = {
    openness: scoreDimension(answers, big5Questions("openness"), questionMap),
    conscientiousness: scoreDimension(answers, big5Questions("conscientiousness"), questionMap),
    extraversion: scoreDimension(answers, big5Questions("extraversion"), questionMap),
    agreeableness: scoreDimension(answers, big5Questions("agreeableness"), questionMap),
    neuroticism: scoreDimension(answers, big5Questions("neuroticism"), questionMap),
  };

  // Attachment
  const attachment = scoreAttachment(answers, questionMap);

  // Values
  const valuesAnswers = answers.filter((a) => a.questionId.startsWith("val") && !a.questionId.startsWith("val_v"));
  const valuesScored = valuesAnswers
    .map((a) => {
      const q = questionMap.get(a.questionId);
      return { facet: q?.facet ?? "", score: typeof a.value === "number" ? a.value : 0 };
    })
    .sort((a, b) => b.score - a.score);

  // DERS
  const dersGroups = ["non_acceptance", "goals", "impulse", "awareness", "strategies", "clarity"];
  const dersScores: Record<string, DimensionScore> = {};
  for (const group of dersGroups) {
    const qs = allQuestions.filter((q) => q.dimension === `ders.${group}`);
    dersScores[group] = scoreDimension(answers, qs, questionMap);
  }

  // DAS
  const dasGroups = ["approval", "love", "achievement", "perfectionism", "entitlement", "autonomy"];
  const dasScores: Record<string, DimensionScore> = {};
  for (const group of dasGroups) {
    const qs = allQuestions.filter((q) => q.dimension === `das.${group}`);
    dasScores[group] = scoreDimension(answers, qs, questionMap);
  }

  // Schemas
  const schemas = scoreSchemas(answers, questionMap);

  // ACE
  const ace = scoreACE(answers);

  // SDT
  const sdt = scoreSDT(answers);

  // Narratives (open-ended)
  const narratives: Record<string, string> = {};
  for (const ans of answers) {
    const q = questionMap.get(ans.questionId);
    if (q?.type === "open" && typeof ans.value === "string") {
      narratives[q.dimension] = ans.value;
    }
  }

  // Behavioral
  const behavioralData: Record<string, string | number> = {};
  for (const ans of answers) {
    const q = questionMap.get(ans.questionId);
    if (q?.dimension.startsWith("behavioral.")) {
      behavioralData[q.dimension] = ans.value as string | number;
    }
  }

  return {
    big5,
    attachment,
    values: valuesScored,
    ders: dersScores,
    das: dasScores,
    schemas,
    ace,
    sdt,
    narratives,
    behavioral: behavioralData,
    completedAt: new Date().toISOString(),
  };
}

// Generate human-readable summary
export function generateSummary(profile: ProfileResult): string {
  const b5 = profile.big5;
  const level = (s: number) => s >= 0.7 ? "High" : s >= 0.4 ? "Mid" : "Low";

  const topSchemas = profile.schemas.filter((s) => s.level === "dominant" || s.level === "active");
  const topValues = profile.values.slice(0, 5).map((v) => v.facet);

  return `Big Five: ${level(b5.openness.score)} O (${b5.openness.score}), ${level(b5.conscientiousness.score)} C (${b5.conscientiousness.score}), ${level(b5.extraversion.score)} E (${b5.extraversion.score}), ${level(b5.agreeableness.score)} A (${b5.agreeableness.score}), ${level(b5.neuroticism.score)} N (${b5.neuroticism.score})
Attachment: ${profile.attachment.style} (anx: ${profile.attachment.anxiety}, av: ${profile.attachment.avoidance})
Values: ${topValues.join(", ")}
Active schemas: ${topSchemas.map((s) => `${s.name} (${s.score})`).join(", ") || "none"}
ACE: ${profile.ace.score}/10
SDT: autonomy ${profile.sdt.autonomy}, competence ${profile.sdt.competence}, relatedness ${profile.sdt.relatedness}`;
}
