import {
  type FreeScaleKey,
  type PatternDefinition,
  patterns,
  freeQuestions,
} from "@/data/free-questions";

export interface FreeScaleScores {
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
}

export interface FreeProfileResult {
  pattern: PatternDefinition;
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

// ── Helpers ──────────────────────────────────────────────────────────

function getTop(group: Record<string, number>): string {
  let best = "";
  let max = -1;
  for (const [key, val] of Object.entries(group)) {
    if (val > max) {
      max = val;
      best = key;
    }
  }
  return best;
}

function initScores(): FreeScaleScores {
  return {
    attachment: { secure: 0, anxious: 0, avoidant: 0 },
    stress: { fight: 0, flight: 0, freeze: 0 },
    motivation: {
      safety: 0,
      recognition: 0,
      freedom: 0,
      control: 0,
      connection: 0,
    },
    defense: {
      rationalization: 0,
      avoidance: 0,
      control: 0,
      people_pleasing: 0,
      compensation: 0,
    },
    childhood: {
      perfectionist: 0,
      rebel: 0,
      invisible: 0,
      rescuer: 0,
      clown: 0,
    },
  };
}

// ── Modifier map ─────────────────────────────────────────────────────

const modifierMap: Record<string, string> = {
  "anxious+safety": "с вечной тревогой внутри",
  "anxious+connection": "который боится остаться один",
  "avoidant+freedom": "которому тесно в любых рамках",
  "avoidant+control": "который доверяет только себе",
  "secure+recognition": "которому вечно мало",
  "fight+control": "в режиме вечной битвы",
  "flight+safety": "в режиме выживания",
  "freeze+safety": "который замирает когда страшно",
  "anxious+recognition": "который вечно доказывает",
  "avoidant+safety": "который построил стену",
  "secure+freedom": "который нашёл свой путь",
  "secure+connection": "с открытым сердцем",
  "fight+recognition": "который не сдаётся",
  "flight+freedom": "который вечно убегает",
  "freeze+connection": "который хочет но не может",
};

const DEFAULT_MODIFIER = "в поиске себя";

function generateModifier(
  topAttachment: string,
  topStress: string,
  topMotivation: string,
): string {
  // Try attachment+motivation first, then attachment+stress, then stress+motivation
  const combos = [
    `${topAttachment}+${topMotivation}`,
    `${topAttachment}+${topStress}`,
    `${topStress}+${topMotivation}`,
  ];
  for (const key of combos) {
    if (modifierMap[key]) return modifierMap[key];
  }
  return DEFAULT_MODIFIER;
}

// ── Contradiction detection ──────────────────────────────────────────

interface ContradictionRule {
  a: [keyof FreeScaleScores, string];
  b: [keyof FreeScaleScores, string];
  label: string;
}

const contradictionRules: ContradictionRule[] = [
  {
    a: ["attachment", "avoidant"],
    b: ["motivation", "connection"],
    label: "avoidant_but_craves_connection",
  },
  {
    a: ["defense", "people_pleasing"],
    b: ["childhood", "rebel"],
    label: "pleaser_but_rebel",
  },
  {
    a: ["stress", "freeze"],
    b: ["defense", "compensation"],
    label: "freeze_but_overcompensates",
  },
  {
    a: ["defense", "control"],
    b: ["attachment", "anxious"],
    label: "controls_from_anxiety",
  },
  {
    a: ["attachment", "avoidant"],
    b: ["childhood", "rescuer"],
    label: "avoidant_rescuer",
  },
  {
    a: ["childhood", "perfectionist"],
    b: ["defense", "avoidance"],
    label: "perfectionist_who_avoids",
  },
];

function detectContradictions(scores: FreeScaleScores): string[] {
  const result: string[] = [];
  for (const rule of contradictionRules) {
    const valA =
      (scores[rule.a[0]] as Record<string, number>)[rule.a[1]] ?? 0;
    const valB =
      (scores[rule.b[0]] as Record<string, number>)[rule.b[1]] ?? 0;
    if (valA > 3 && valB > 3) {
      result.push(rule.label);
    }
  }
  return result;
}

// ── Percentile map ───────────────────────────────────────────────────

const percentileMap: Record<string, number> = {
  p1: 4.2,
  p2: 6.1,
  p3: 8.7,
  p4: 9.3,
  p5: 5.8,
  p6: 3.4,
  p7: 7.2,
  p8: 8.1,
  p9: 2.9,
  p10: 6.5,
  p11: 5.4,
  p12: 4.8,
};

// ── Main scoring function ────────────────────────────────────────────

export function scoreFreeProfile(
  answers: Record<string, string>,
): FreeProfileResult {
  const scores = initScores();

  // 1-2. Accumulate scores from answers
  for (const [questionId, optionId] of Object.entries(answers)) {
    const question = freeQuestions.find((q) => q.id === questionId);
    if (!question) continue;

    const option = question.options.find((o) => o.id === optionId);
    if (!option) continue;

    for (const [scaleKey, value] of Object.entries(option.scores)) {
      const [group, sub] = scaleKey.split(":") as [
        keyof FreeScaleScores,
        string,
      ];
      if (scores[group] && sub in scores[group]) {
        (scores[group] as Record<string, number>)[sub] += value ?? 0;
      }
    }
  }

  // 3-4. Find top in each group
  const topAttachment = getTop(scores.attachment);
  const topStress = getTop(scores.stress);
  const topMotivation = getTop(scores.motivation);
  const topDefense = getTop(scores.defense);
  const topChildhood = getTop(scores.childhood);

  // 5. Match pattern: childhood × defense
  let pattern = patterns.find(
    (p) => p.childhood === topChildhood && p.defense === topDefense,
  );

  // 6. Closest pattern if no exact match
  if (!pattern) {
    let bestScore = -1;
    for (const p of patterns) {
      let matchScore = 0;
      if (p.childhood === topChildhood) matchScore += 2;
      if (p.defense === topDefense) matchScore += 2;
      // Also consider secondary matches
      if (p.childhood === topDefense) matchScore += 1;
      if (p.defense === topChildhood) matchScore += 1;
      if (matchScore > bestScore) {
        bestScore = matchScore;
        pattern = p;
      }
    }
  }

  // Fallback to first pattern (should never happen)
  if (!pattern) {
    pattern = patterns[0];
  }

  // 7. Generate modifier
  const modifier = generateModifier(topAttachment, topStress, topMotivation);

  // 8. Detect contradictions
  const contradictions = detectContradictions(scores);

  // 9. Percentile
  const percentile = percentileMap[pattern.id] ?? 5.0;

  return {
    pattern,
    modifier,
    scores,
    topAttachment,
    topStress,
    topMotivation,
    topDefense,
    topChildhood,
    contradictions,
    percentile,
  };
}
