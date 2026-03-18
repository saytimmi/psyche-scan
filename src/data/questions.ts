// Full personality profiling questionnaire
// Based on: IPIP-NEO-120, ECR-R, DERS, DAS, YSQ-S3, ACE, PVQ-RR, SDT, IFS

export type QuestionType = "scale" | "likert7" | "likert6" | "boolean" | "open" | "choice";

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  dimension: string;
  facet?: string;
  reverse?: boolean; // reverse-scored item
  scale?: { min: number; max: number; minLabel: string; maxLabel: string };
}

export interface SessionConfig {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  estimatedMinutes: number;
  icon: string;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

// ============================================================
// SESSION 1: FOUNDATION (~50 min)
// Big Five (IPIP-NEO) + Attachment (ECR-R) + Values (PVQ)
// ============================================================

const bigFiveOpenness: Question[] = [
  { id: "o1", text: "Мне нравится разбираться в сложных абстрактных идеях", type: "scale", dimension: "big5.openness", facet: "intellect", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "o2", text: "Я часто представляю как всё могло бы быть иначе", type: "scale", dimension: "big5.openness", facet: "imagination", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "o3", text: "Я ищу новые необычные впечатления, даже если они рискованные", type: "scale", dimension: "big5.openness", facet: "adventurousness", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "o4", text: "Искусство, музыка, красота — для меня это важно, не фон", type: "scale", dimension: "big5.openness", facet: "aesthetics", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "o5", text: "Мне скучно когда всё предсказуемо и по правилам", type: "scale", dimension: "big5.openness", facet: "liberalism", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
];

const bigFiveConscientiousness: Question[] = [
  { id: "c1", text: "Я обычно делаю что обещал, даже если не хочется", type: "scale", dimension: "big5.conscientiousness", facet: "dutifulness", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "c2", text: "У меня есть система организации дел, файлов, пространства", type: "scale", dimension: "big5.conscientiousness", facet: "orderliness", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "c3", text: "Я могу заставить себя делать скучную но нужную работу", type: "scale", dimension: "big5.conscientiousness", facet: "self_discipline", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "c4", text: "Я ставлю амбициозные цели и иду к ним", type: "scale", dimension: "big5.conscientiousness", facet: "achievement_striving", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "c5", text: "Перед важным решением я тщательно всё обдумываю", type: "scale", dimension: "big5.conscientiousness", facet: "cautiousness", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
];

const bigFiveExtraversion: Question[] = [
  { id: "e1", text: "В компании незнакомых людей мне легко и кайфово", type: "scale", dimension: "big5.extraversion", facet: "gregariousness", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "e2", text: "Я обычно беру на себя инициативу и веду за собой", type: "scale", dimension: "big5.extraversion", facet: "assertiveness", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "e3", text: "Мне нужно много активности, движения, дел", type: "scale", dimension: "big5.extraversion", facet: "activity_level", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "e4", text: "Я ищу острые ощущения, адреналин", type: "scale", dimension: "big5.extraversion", facet: "excitement_seeking", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "e5", text: "Я легко открываюсь людям и проявляю теплоту", type: "scale", dimension: "big5.extraversion", facet: "friendliness", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
];

const bigFiveAgreeableness: Question[] = [
  { id: "a1", text: "Я верю что большинство людей в целом честны и добры", type: "scale", dimension: "big5.agreeableness", facet: "trust", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "a2", text: "Мне легко уступить если это важно для другого человека", type: "scale", dimension: "big5.agreeableness", facet: "cooperation", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "a3", text: "Чужие проблемы меня реально трогают, я переживаю", type: "scale", dimension: "big5.agreeableness", facet: "sympathy", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "a4", text: "Я не люблю хвастаться, даже когда есть чем", type: "scale", dimension: "big5.agreeableness", facet: "modesty", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "a5", text: "Я готов помогать даже когда мне это неудобно", type: "scale", dimension: "big5.agreeableness", facet: "altruism", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
];

const bigFiveNeuroticism: Question[] = [
  { id: "n1", text: "Я часто тревожусь о вещах которые ещё не произошли", type: "scale", dimension: "big5.neuroticism", facet: "anxiety", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "n2", text: "Меня легко вывести из себя, я быстро раздражаюсь", type: "scale", dimension: "big5.neuroticism", facet: "anger", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "n3", text: "Бывают периоды когда всё кажется бессмысленным", type: "scale", dimension: "big5.neuroticism", facet: "depression", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "n4", text: "Мне важно что обо мне думают другие", type: "scale", dimension: "big5.neuroticism", facet: "self_consciousness", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "n5", text: "Мне трудно остановиться когда я начал что-то приятное (еда, соцсети, покупки)", type: "scale", dimension: "big5.neuroticism", facet: "immoderation", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
];

const attachmentAnxiety: Question[] = [
  { id: "att_anx1", text: "Я переживаю что близкие люди могут уйти или бросить меня", type: "likert7", dimension: "attachment.anxiety", scale: { min: 1, max: 7, minLabel: "Совсем не согласен", maxLabel: "Полностью согласен" } },
  { id: "att_anx2", text: "Мне нужно постоянное подтверждение что меня любят и ценят", type: "likert7", dimension: "attachment.anxiety", scale: { min: 1, max: 7, minLabel: "Совсем не согласен", maxLabel: "Полностью согласен" } },
  { id: "att_anx3", text: "Когда близкий человек не отвечает — я начинаю додумывать плохое", type: "likert7", dimension: "attachment.anxiety", scale: { min: 1, max: 7, minLabel: "Совсем не согласен", maxLabel: "Полностью согласен" } },
  { id: "att_anx4", text: "Я боюсь что если покажу свои реальные чувства — меня отвергнут", type: "likert7", dimension: "attachment.anxiety", scale: { min: 1, max: 7, minLabel: "Совсем не согласен", maxLabel: "Полностью согласен" } },
  { id: "att_anx5", text: "Я часто сравниваю себя с другими и чувствую что я хуже", type: "likert7", dimension: "attachment.anxiety", scale: { min: 1, max: 7, minLabel: "Совсем не согласен", maxLabel: "Полностью согласен" } },
  { id: "att_anx6", text: "Мне страшно остаться одному по-настоящему", type: "likert7", dimension: "attachment.anxiety", scale: { min: 1, max: 7, minLabel: "Совсем не согласен", maxLabel: "Полностью согласен" } },
];

const attachmentAvoidance: Question[] = [
  { id: "att_av1", text: "Мне некомфортно когда кто-то эмоционально слишком близко", type: "likert7", dimension: "attachment.avoidance", scale: { min: 1, max: 7, minLabel: "Совсем не согласен", maxLabel: "Полностью согласен" } },
  { id: "att_av2", text: "Я предпочитаю разбираться со своими проблемами сам, не грузить других", type: "likert7", dimension: "attachment.avoidance", scale: { min: 1, max: 7, minLabel: "Совсем не согласен", maxLabel: "Полностью согласен" } },
  { id: "att_av3", text: "Мне трудно полностью довериться даже самым близким", type: "likert7", dimension: "attachment.avoidance", scale: { min: 1, max: 7, minLabel: "Совсем не согласен", maxLabel: "Полностью согласен" } },
  { id: "att_av4", text: "Когда отношения становятся слишком серьёзными — хочется отступить", type: "likert7", dimension: "attachment.avoidance", scale: { min: 1, max: 7, minLabel: "Совсем не согласен", maxLabel: "Полностью согласен" } },
  { id: "att_av5", text: "Я не люблю когда от меня ждут эмоциональной поддержки", type: "likert7", dimension: "attachment.avoidance", scale: { min: 1, max: 7, minLabel: "Совсем не согласен", maxLabel: "Полностью согласен" } },
  { id: "att_av6", text: "Мне легче помочь делом, чем словами поддержки", type: "likert7", dimension: "attachment.avoidance", scale: { min: 1, max: 7, minLabel: "Совсем не согласен", maxLabel: "Полностью согласен" } },
];

const values: Question[] = [
  { id: "val1", text: "Ему важно придумывать новое и подходить к вещам по-своему", type: "likert6", dimension: "values", facet: "self_direction_thought", scale: { min: 1, max: 6, minLabel: "Совсем не похож на меня", maxLabel: "Очень похож на меня" } },
  { id: "val2", text: "Ему важно чтобы жизнь была полна приключений и ярких впечатлений", type: "likert6", dimension: "values", facet: "stimulation", scale: { min: 1, max: 6, minLabel: "Совсем не похож на меня", maxLabel: "Очень похож на меня" } },
  { id: "val3", text: "Ему важно быть богатым, иметь дорогие вещи", type: "likert6", dimension: "values", facet: "power_resources", scale: { min: 1, max: 6, minLabel: "Совсем не похож на меня", maxLabel: "Очень похож на меня" } },
  { id: "val4", text: "Ему важно чтобы его уважали и признавали его достижения", type: "likert6", dimension: "values", facet: "achievement", scale: { min: 1, max: 6, minLabel: "Совсем не похож на меня", maxLabel: "Очень похож на меня" } },
  { id: "val5", text: "Ему важна безопасность и стабильность в жизни", type: "likert6", dimension: "values", facet: "security", scale: { min: 1, max: 6, minLabel: "Совсем не похож на меня", maxLabel: "Очень похож на меня" } },
  { id: "val6", text: "Ему важно следовать традициям и обычаям", type: "likert6", dimension: "values", facet: "tradition", scale: { min: 1, max: 6, minLabel: "Совсем не похож на меня", maxLabel: "Очень похож на меня" } },
  { id: "val7", text: "Ему важно заботиться о природе и людях вокруг", type: "likert6", dimension: "values", facet: "universalism", scale: { min: 1, max: 6, minLabel: "Совсем не похож на меня", maxLabel: "Очень похож на меня" } },
  { id: "val8", text: "Ему важно чтобы к каждому относились справедливо", type: "likert6", dimension: "values", facet: "benevolence", scale: { min: 1, max: 6, minLabel: "Совсем не похож на меня", maxLabel: "Очень похож на меня" } },
  { id: "val9", text: "Ему важно принимать решения самому, без чьих-то указаний", type: "likert6", dimension: "values", facet: "self_direction_action", scale: { min: 1, max: 6, minLabel: "Совсем не похож на меня", maxLabel: "Очень похож на меня" } },
  { id: "val10", text: "Ему важно влиять на других людей и контролировать ситуацию", type: "likert6", dimension: "values", facet: "power_dominance", scale: { min: 1, max: 6, minLabel: "Совсем не похож на меня", maxLabel: "Очень похож на меня" } },
  { id: "val11", text: "Ему важно наслаждаться жизнью и удовольствиями", type: "likert6", dimension: "values", facet: "hedonism", scale: { min: 1, max: 6, minLabel: "Совсем не похож на меня", maxLabel: "Очень похож на меня" } },
  { id: "val12", text: "Ему важно подчиняться правилам даже когда никто не видит", type: "likert6", dimension: "values", facet: "conformity", scale: { min: 1, max: 6, minLabel: "Совсем не похож на меня", maxLabel: "Очень похож на меня" } },
];

// ============================================================
// SESSION 2: DEPTHS (~50 min)
// DERS + DAS + YSQ + ACE
// ============================================================

const ders: Question[] = [
  // Non-acceptance
  { id: "ders1", text: "Когда мне плохо — я злюсь на себя за то что мне плохо", type: "scale", dimension: "ders.non_acceptance", scale: { min: 1, max: 5, minLabel: "Почти никогда", maxLabel: "Почти всегда" } },
  { id: "ders2", text: "Я считаю что некоторые эмоции — это слабость", type: "scale", dimension: "ders.non_acceptance", scale: { min: 1, max: 5, minLabel: "Почти никогда", maxLabel: "Почти всегда" } },
  { id: "ders3", text: "Мне стыдно за свои негативные чувства", type: "scale", dimension: "ders.non_acceptance", scale: { min: 1, max: 5, minLabel: "Почти никогда", maxLabel: "Почти всегда" } },
  // Goals
  { id: "ders4", text: "Когда я расстроен — мне трудно сосредоточиться на задачах", type: "scale", dimension: "ders.goals", scale: { min: 1, max: 5, minLabel: "Почти никогда", maxLabel: "Почти всегда" } },
  { id: "ders5", text: "Сильные эмоции выбивают меня из колеи надолго", type: "scale", dimension: "ders.goals", scale: { min: 1, max: 5, minLabel: "Почти никогда", maxLabel: "Почти всегда" } },
  { id: "ders6", text: "Когда я зол или тревожен — работа встаёт", type: "scale", dimension: "ders.goals", scale: { min: 1, max: 5, minLabel: "Почти никогда", maxLabel: "Почти всегда" } },
  // Impulse
  { id: "ders7", text: "Когда эмоции зашкаливают — я делаю вещи о которых потом жалею", type: "scale", dimension: "ders.impulse", scale: { min: 1, max: 5, minLabel: "Почти никогда", maxLabel: "Почти всегда" } },
  { id: "ders8", text: "Мне трудно контролировать поведение когда я расстроен", type: "scale", dimension: "ders.impulse", scale: { min: 1, max: 5, minLabel: "Почти никогда", maxLabel: "Почти всегда" } },
  { id: "ders9", text: "В эмоциональном состоянии я могу наговорить лишнего", type: "scale", dimension: "ders.impulse", scale: { min: 1, max: 5, minLabel: "Почти никогда", maxLabel: "Почти всегда" } },
  // Awareness (reverse-scored)
  { id: "ders10", text: "Я обращаю внимание на то что чувствую", type: "scale", dimension: "ders.awareness", reverse: true, scale: { min: 1, max: 5, minLabel: "Почти никогда", maxLabel: "Почти всегда" } },
  { id: "ders11", text: "Часто я не понимаю что именно я чувствую", type: "scale", dimension: "ders.awareness", scale: { min: 1, max: 5, minLabel: "Почти никогда", maxLabel: "Почти всегда" } },
  // Strategies
  { id: "ders12", text: "Когда мне плохо — я не знаю что с этим делать", type: "scale", dimension: "ders.strategies", scale: { min: 1, max: 5, minLabel: "Почти никогда", maxLabel: "Почти всегда" } },
  { id: "ders13", text: "Я верю что если мне плохо — это надолго", type: "scale", dimension: "ders.strategies", scale: { min: 1, max: 5, minLabel: "Почти никогда", maxLabel: "Почти всегда" } },
  { id: "ders14", text: "Мне кажется что с моими чувствами ничего нельзя сделать", type: "scale", dimension: "ders.strategies", scale: { min: 1, max: 5, minLabel: "Почти никогда", maxLabel: "Почти всегда" } },
  // Clarity (reverse-scored first)
  { id: "ders15", text: "Я могу точно назвать что я сейчас чувствую", type: "scale", dimension: "ders.clarity", reverse: true, scale: { min: 1, max: 5, minLabel: "Почти никогда", maxLabel: "Почти всегда" } },
  { id: "ders16", text: "Мои чувства часто кажутся мне запутанными и непонятными", type: "scale", dimension: "ders.clarity", scale: { min: 1, max: 5, minLabel: "Почти никогда", maxLabel: "Почти всегда" } },
];

const das: Question[] = [
  // Approval
  { id: "das1", text: "Мне тяжело быть счастливым если меня не одобряют важные мне люди", type: "likert7", dimension: "das.approval", scale: { min: 1, max: 7, minLabel: "Полностью не согласен", maxLabel: "Полностью согласен" } },
  { id: "das2", text: "Критика означает что со мной что-то не так", type: "likert7", dimension: "das.approval", scale: { min: 1, max: 7, minLabel: "Полностью не согласен", maxLabel: "Полностью согласен" } },
  // Love
  { id: "das3", text: "Без близкого человека я не могу быть по-настоящему счастлив", type: "likert7", dimension: "das.love", scale: { min: 1, max: 7, minLabel: "Полностью не согласен", maxLabel: "Полностью согласен" } },
  { id: "das4", text: "Быть отвергнутым — худшее что может случиться", type: "likert7", dimension: "das.love", scale: { min: 1, max: 7, minLabel: "Полностью не согласен", maxLabel: "Полностью согласен" } },
  // Achievement
  { id: "das5", text: "Мой уровень как человека зависит от того чего я достиг", type: "likert7", dimension: "das.achievement", scale: { min: 1, max: 7, minLabel: "Полностью не согласен", maxLabel: "Полностью согласен" } },
  { id: "das6", text: "Если я не добился успеха — значит я недостаточно хорош", type: "likert7", dimension: "das.achievement", scale: { min: 1, max: 7, minLabel: "Полностью не согласен", maxLabel: "Полностью согласен" } },
  // Perfectionism
  { id: "das7", text: "Если я делаю что-то — я должен делать это идеально", type: "likert7", dimension: "das.perfectionism", scale: { min: 1, max: 7, minLabel: "Полностью не согласен", maxLabel: "Полностью согласен" } },
  { id: "das8", text: "Ошибка означает что я не старался", type: "likert7", dimension: "das.perfectionism", scale: { min: 1, max: 7, minLabel: "Полностью не согласен", maxLabel: "Полностью согласен" } },
  // Entitlement
  { id: "das9", text: "Люди должны поступать так как я считаю правильным", type: "likert7", dimension: "das.entitlement", scale: { min: 1, max: 7, minLabel: "Полностью не согласен", maxLabel: "Полностью согласен" } },
  { id: "das10", text: "Правила которые работают для других — не всегда применимы ко мне", type: "likert7", dimension: "das.entitlement", scale: { min: 1, max: 7, minLabel: "Полностью не согласен", maxLabel: "Полностью согласен" } },
  // Autonomy
  { id: "das11", text: "Просить помощь — признак слабости", type: "likert7", dimension: "das.autonomy", scale: { min: 1, max: 7, minLabel: "Полностью не согласен", maxLabel: "Полностью согласен" } },
  { id: "das12", text: "Я должен уметь справляться со всем сам", type: "likert7", dimension: "das.autonomy", scale: { min: 1, max: 7, minLabel: "Полностью не согласен", maxLabel: "Полностью согласен" } },
];

const ysq: Question[] = [
  // Abandonment
  { id: "ysq1", text: "Я боюсь что люди которых я люблю уйдут от меня", type: "likert6", dimension: "schemas.abandonment", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  { id: "ysq2", text: "Мне трудно верить что кто-то останется со мной надолго", type: "likert6", dimension: "schemas.abandonment", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  // Mistrust
  { id: "ysq3", text: "Если я не буду осторожен — люди воспользуются мной", type: "likert6", dimension: "schemas.mistrust", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  { id: "ysq4", text: "Глубоко внутри я жду подвоха от других", type: "likert6", dimension: "schemas.mistrust", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  // Emotional deprivation
  { id: "ysq5", text: "Мне не хватает настоящего понимания и эмоциональной поддержки", type: "likert6", dimension: "schemas.emotional_deprivation", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  { id: "ysq6", text: "Никто по-настоящему не понимает что я чувствую", type: "likert6", dimension: "schemas.emotional_deprivation", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  // Defectiveness
  { id: "ysq7", text: "Если бы люди узнали меня настоящего — они бы отвернулись", type: "likert6", dimension: "schemas.defectiveness", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  { id: "ysq8", text: "Я чувствую что со мной что-то принципиально не так", type: "likert6", dimension: "schemas.defectiveness", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  // Social isolation
  { id: "ysq9", text: "Я ощущаю себя другим, не таким как все", type: "likert6", dimension: "schemas.social_isolation", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  { id: "ysq10", text: "Мне трудно чувствовать принадлежность к какой-то группе", type: "likert6", dimension: "schemas.social_isolation", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  // Failure
  { id: "ysq11", text: "Я чувствую что я неудачник по сравнению с другими", type: "likert6", dimension: "schemas.failure", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  { id: "ysq12", text: "Мне кажется что у меня нет особого таланта или способностей", type: "likert6", dimension: "schemas.failure", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  // Entitlement
  { id: "ysq13", text: "Я не должен следовать правилам которые применимы к другим", type: "likert6", dimension: "schemas.entitlement", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  { id: "ysq14", text: "Мои потребности важнее чем у большинства людей", type: "likert6", dimension: "schemas.entitlement", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  // Insufficient self-control
  { id: "ysq15", text: "Мне очень трудно заставить себя делать скучные но нужные вещи", type: "likert6", dimension: "schemas.insufficient_self_control", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  { id: "ysq16", text: "Я не могу отказать себе в удовольствии даже когда это вредит мне", type: "likert6", dimension: "schemas.insufficient_self_control", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  // Subjugation
  { id: "ysq17", text: "Я часто подавляю свои желания ради других", type: "likert6", dimension: "schemas.subjugation", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  { id: "ysq18", text: "Если я буду настаивать на своём — меня отвергнут", type: "likert6", dimension: "schemas.subjugation", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  // Self-sacrifice
  { id: "ysq19", text: "Я ставлю потребности других выше своих", type: "likert6", dimension: "schemas.self_sacrifice", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  { id: "ysq20", text: "Мне трудно не помогать даже когда это во вред мне", type: "likert6", dimension: "schemas.self_sacrifice", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  // Unrelenting standards
  { id: "ysq21", text: "Я должен быть лучшим в том что делаю, иначе нет смысла", type: "likert6", dimension: "schemas.unrelenting_standards", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  { id: "ysq22", text: "Мне трудно принять результат если он не идеален", type: "likert6", dimension: "schemas.unrelenting_standards", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  // Emotional inhibition
  { id: "ysq23", text: "Я контролирую свои эмоции и редко показываю их открыто", type: "likert6", dimension: "schemas.emotional_inhibition", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  { id: "ysq24", text: "Показывать уязвимость — рискованно и неправильно", type: "likert6", dimension: "schemas.emotional_inhibition", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  // Punitiveness
  { id: "ysq25", text: "Люди должны нести наказание за свои ошибки", type: "likert6", dimension: "schemas.punitiveness", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  { id: "ysq26", text: "Я строго сужу себя когда допускаю ошибку", type: "likert6", dimension: "schemas.punitiveness", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  // Negativity
  { id: "ysq27", text: "Я обычно замечаю что может пойти не так, а не что может пойти хорошо", type: "likert6", dimension: "schemas.negativity", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  { id: "ysq28", text: "В конечном счёте всё оказывается хуже чем надеешься", type: "likert6", dimension: "schemas.negativity", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  // Vulnerability
  { id: "ysq29", text: "Я жду что случится что-то ужасное — болезнь, катастрофа", type: "likert6", dimension: "schemas.vulnerability", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  { id: "ysq30", text: "Мне трудно чувствовать себя в безопасности", type: "likert6", dimension: "schemas.vulnerability", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  // Dependence
  { id: "ysq31", text: "Мне трудно справляться с повседневными задачами без помощи", type: "likert6", dimension: "schemas.dependence", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  { id: "ysq32", text: "Я чувствую что не способен решать проблемы самостоятельно", type: "likert6", dimension: "schemas.dependence", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  // Enmeshment
  { id: "ysq33", text: "Мне сложно отделить свои чувства от чувств близких", type: "likert6", dimension: "schemas.enmeshment", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
  { id: "ysq34", text: "Без определённого человека я не знаю кто я", type: "likert6", dimension: "schemas.enmeshment", scale: { min: 1, max: 6, minLabel: "Совсем не про меня", maxLabel: "Точно описывает меня" } },
];

const ace: Question[] = [
  { id: "ace1", text: "Тебя часто оскорбляли, унижали, говорили что ты ни на что не годен?", type: "boolean", dimension: "history.ace" },
  { id: "ace2", text: "Тебя били, толкали, бросали в тебя вещи?", type: "boolean", dimension: "history.ace" },
  { id: "ace3", text: "Кто-то из взрослых трогал тебя сексуально или принуждал?", type: "boolean", dimension: "history.ace" },
  { id: "ace4", text: "Ты чувствовал что тебя никто не любит, что ты не важен?", type: "boolean", dimension: "history.ace" },
  { id: "ace5", text: "Тебе не хватало еды, чистой одежды, медицинской помощи?", type: "boolean", dimension: "history.ace" },
  { id: "ace6", text: "Твои родители разошлись или развелись?", type: "boolean", dimension: "history.ace" },
  { id: "ace7", text: "Мать/мачеху били, толкали, угрожали ей?", type: "boolean", dimension: "history.ace" },
  { id: "ace8", text: "Кто-то в семье много пил или употреблял наркотики?", type: "boolean", dimension: "history.ace" },
  { id: "ace9", text: "Кто-то в семье был в депрессии, психически болен, или пытался покончить с собой?", type: "boolean", dimension: "history.ace" },
  { id: "ace10", text: "Кто-то из семьи сидел в тюрьме?", type: "boolean", dimension: "history.ace" },
];

// ============================================================
// SESSION 3: NARRATIVE (open-ended questions)
// ============================================================

const narrativeFormative: Question[] = [
  { id: "nar1", text: "Расскажи про своё детство коротко — в 3-5 предложениях. Каким ребёнком ты был?", type: "open", dimension: "narrative.childhood" },
  { id: "nar2", text: "Какие были правила в твоей семье — сказанные и несказанные? Что поощрялось? Что было нельзя?", type: "open", dimension: "narrative.family_rules" },
  { id: "nar3", text: "Назови 2-3 момента из жизни, которые тебя сильно изменили.", type: "open", dimension: "narrative.turning_points" },
  { id: "nar4", text: "Что ты рано понял о жизни, что другие люди не понимают?", type: "open", dimension: "narrative.core_belief" },
];

const narrativeBlindSpots: Question[] = [
  { id: "nar5", text: "Назови 3 цели которые ты ставил, но так и не достиг.", type: "open", dimension: "narrative.unachieved_goals" },
  { id: "nar6", text: "По каждой — что по-твоему мешало? Будь максимально честен.", type: "open", dimension: "narrative.attribution" },
  { id: "nar7", text: "Представь человека который тебя хорошо знает, но вы не близкие друзья. Что бы он сказал о тебе — то, что тебе бы не понравилось услышать?", type: "open", dimension: "narrative.shadow" },
  { id: "nar8", text: "Есть ли что-то что ты ЗНАЕШЬ что надо делать, но не делаешь? Что это и почему?", type: "open", dimension: "narrative.knowing_doing_gap" },
];

const narrativeIdentity: Question[] = [
  { id: "nar9", text: "Если бы тебя попросили описать себя НЕ через профессию и достижения — кто ты?", type: "open", dimension: "narrative.core_identity" },
  { id: "nar10", text: "Чего ты боишься больше всего? Не физически — экзистенциально.", type: "open", dimension: "narrative.core_fear" },
  { id: "nar11", text: "Если бы ты мог изменить ОДНУ вещь в себе прямо сейчас — что?", type: "open", dimension: "narrative.growth_edge" },
  { id: "nar12", text: "Что ты хочешь чтобы о тебе говорили через 10 лет?", type: "open", dimension: "narrative.desired_identity" },
];

const narrativeEnergy: Question[] = [
  { id: "nar13", text: "Опиши свой идеальный продуктивный день — не отпуск, а рабочий.", type: "open", dimension: "narrative.ideal_day" },
  { id: "nar14", text: "После чего ты чувствуешь себя заряженным? А после чего — опустошённым?", type: "open", dimension: "narrative.energy" },
  { id: "nar15", text: "Опиши максимально конкретно: что запускает твою прокрастинацию? Какая задача, что чувствуешь, что делаешь вместо?", type: "open", dimension: "narrative.procrastination_trigger" },
  { id: "nar16", text: "Когда ты в своём лучшем состоянии — что этому предшествовало?", type: "open", dimension: "narrative.peak_state" },
];

// ============================================================
// SESSION 4: DYNAMICS
// Relationships + IFS + SDT + Behavioral
// ============================================================

const relationships: Question[] = [
  { id: "rel1", text: "Опиши 2-3 самых важных отношения в твоей жизни. Что в них было общего?", type: "open", dimension: "narrative.relationship_pattern" },
  { id: "rel2", text: "Как ты обычно реагируешь на конфликт? Не как хочешь, а как реально — автоматически?", type: "choice", dimension: "relational.conflict_style", scale: { min: 1, max: 4, minLabel: "", maxLabel: "" } },
  { id: "rel3", text: "Что тебе сложнее всего в отношениях с людьми?", type: "open", dimension: "narrative.interpersonal_difficulty" },
];

const ifs: Question[] = [
  { id: "ifs1", text: "Вспомни ситуацию когда ты хотел что-то сделать, но что-то внутри останавливало. Какой голос говорил 'не надо'? Что конкретно он говорил?", type: "open", dimension: "ifs.protector" },
  { id: "ifs2", text: "А был ли другой голос, который злился на первый? Что он говорил?", type: "open", dimension: "ifs.critic" },
  { id: "ifs3", text: "Если бы часть тебя которая боится могла быть совсем честной — чего она боится НА САМОМ ДЕЛЕ?", type: "open", dimension: "ifs.exile" },
  { id: "ifs4", text: "Есть ли часть тебя которая 'спасает' тебя когда становится тяжело? Что она делает — чем ты утешаешься?", type: "open", dimension: "ifs.firefighter" },
];

const sdt: Question[] = [
  // Autonomy
  { id: "sdt1", text: "Я чувствую что живу так как хочу, а не как от меня ожидают", type: "likert7", dimension: "motivation.autonomy", scale: { min: 1, max: 7, minLabel: "Совсем нет", maxLabel: "Полностью" } },
  { id: "sdt2", text: "У меня есть свобода принимать ключевые решения в своей жизни", type: "likert7", dimension: "motivation.autonomy", scale: { min: 1, max: 7, minLabel: "Совсем нет", maxLabel: "Полностью" } },
  { id: "sdt3", text: "Мои ежедневные действия совпадают с моими ценностями", type: "likert7", dimension: "motivation.autonomy", scale: { min: 1, max: 7, minLabel: "Совсем нет", maxLabel: "Полностью" } },
  // Competence
  { id: "sdt4", text: "Я чувствую что хорошо справляюсь с тем что делаю", type: "likert7", dimension: "motivation.competence", scale: { min: 1, max: 7, minLabel: "Совсем нет", maxLabel: "Полностью" } },
  { id: "sdt5", text: "Я постоянно учусь и расту", type: "likert7", dimension: "motivation.competence", scale: { min: 1, max: 7, minLabel: "Совсем нет", maxLabel: "Полностью" } },
  { id: "sdt6", text: "Я уверен в своих способностях решать сложные задачи", type: "likert7", dimension: "motivation.competence", scale: { min: 1, max: 7, minLabel: "Совсем нет", maxLabel: "Полностью" } },
  // Relatedness
  { id: "sdt7", text: "У меня есть люди которые по-настоящему понимают меня", type: "likert7", dimension: "motivation.relatedness", scale: { min: 1, max: 7, minLabel: "Совсем нет", maxLabel: "Полностью" } },
  { id: "sdt8", text: "Я чувствую принадлежность к какому-то сообществу", type: "likert7", dimension: "motivation.relatedness", scale: { min: 1, max: 7, minLabel: "Совсем нет", maxLabel: "Полностью" } },
  { id: "sdt9", text: "Мне хватает тёплых, глубоких отношений в жизни", type: "likert7", dimension: "motivation.relatedness", scale: { min: 1, max: 7, minLabel: "Совсем нет", maxLabel: "Полностью" } },
];

const behavioral: Question[] = [
  { id: "beh1", text: "Быстрый выбор: А) получить результат через час, но небольшой. Б) работать 3 дня, но результат в 5 раз больше. Что выбираешь?", type: "choice", dimension: "behavioral.delay_discounting" },
  { id: "beh2", text: "А если вместо 3 дней — 3 недели?", type: "choice", dimension: "behavioral.delay_discounting_extended" },
  { id: "beh3", text: "У тебя есть 2 часа свободного времени. Что реально сделаешь — не что 'правильно', а что РЕАЛЬНО?", type: "choice", dimension: "behavioral.values_in_action" },
];

// ============================================================
// SESSION 5: OPERATING SYSTEM (~40 min)
// Strengths, Chronotype, Communication, Conflict, Money, Body
// ============================================================

const strengths: Question[] = [
  // Adapted talent themes (inspired by Gallup domains, original questions)
  // Strategic Thinking
  { id: "str1", text: "Мне легко увидеть паттерн или закономерность там, где другие видят хаос", type: "scale", dimension: "strengths.strategic", facet: "strategic", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "str2", text: "Я быстро генерирую идеи — мне легко придумать 10 вариантов решения", type: "scale", dimension: "strengths.strategic", facet: "ideation", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "str3", text: "Мне нравится собирать информацию и знания — даже если пока не знаю зачем", type: "scale", dimension: "strengths.strategic", facet: "input", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "str4", text: "Я люблю анализировать — раскладывать на части, искать причины", type: "scale", dimension: "strengths.strategic", facet: "analytical", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  // Executing
  { id: "str5", text: "Я получаю удовольствие когда вычёркиваю задачу из списка — мне нужен ощутимый прогресс", type: "scale", dimension: "strengths.executing", facet: "achiever", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "str6", text: "Я могу привести вещи в порядок и создать систему из хаоса", type: "scale", dimension: "strengths.executing", facet: "arranger", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "str7", text: "Я сфокусирован — могу долго работать над одной целью, не отвлекаясь", type: "scale", dimension: "strengths.executing", facet: "focus", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "str8", text: "Я серьёзно отношусь к обязательствам — если сказал, значит сделаю", type: "scale", dimension: "strengths.executing", facet: "responsibility", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  // Influencing
  { id: "str9", text: "Мне легко убеждать людей и вести за собой", type: "scale", dimension: "strengths.influencing", facet: "command", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "str10", text: "Я уверен в себе и легко принимаю решения, даже рискованные", type: "scale", dimension: "strengths.influencing", facet: "self_assurance", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "str11", text: "Мне важно быть первым, побеждать, соревноваться", type: "scale", dimension: "strengths.influencing", facet: "competition", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "str12", text: "Я энергичный стартер — легко запускаю проекты и зажигаю людей", type: "scale", dimension: "strengths.influencing", facet: "activator", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  // Relationship Building
  { id: "str13", text: "Я легко понимаю что чувствуют другие, даже если они не говорят", type: "scale", dimension: "strengths.relationship", facet: "empathy", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "str14", text: "Мне нравится развивать людей — видеть их потенциал и помогать расти", type: "scale", dimension: "strengths.relationship", facet: "developer", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "str15", text: "Я легко нахожу общий язык с разными людьми и строю связи", type: "scale", dimension: "strengths.relationship", facet: "relator", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
  { id: "str16", text: "Я умею включать людей — делать так чтобы каждый чувствовал себя частью команды", type: "scale", dimension: "strengths.relationship", facet: "includer", scale: { min: 1, max: 5, minLabel: "Совсем не про меня", maxLabel: "Точно про меня" } },
];

const chronotype: Question[] = [
  { id: "chr1", text: "Если бы ты мог выбрать — во сколько ты бы просыпался?", type: "choice", dimension: "body.chronotype" },
  { id: "chr2", text: "В какое время суток ты чувствуешь пик умственной активности?", type: "choice", dimension: "body.peak_mental" },
  { id: "chr3", text: "Во сколько ты обычно ложишься спать когда нет обязательств?", type: "choice", dimension: "body.sleep_time" },
  { id: "chr4", text: "Сколько часов сна тебе нужно чтобы чувствовать себя хорошо?", type: "choice", dimension: "body.sleep_need" },
  { id: "chr5", text: "Занимаешься ли ты спортом/физической активностью регулярно?", type: "choice", dimension: "body.exercise" },
];

const communication: Question[] = [
  { id: "com1", text: "Мне проще донести мысль текстом, чем голосом", type: "scale", dimension: "communication.channel", scale: { min: 1, max: 5, minLabel: "Совсем нет (голос)", maxLabel: "Точно (текст)" } },
  { id: "com2", text: "Я предпочитаю сначала подумать, потом говорить (а не думать вслух)", type: "scale", dimension: "communication.processing", scale: { min: 1, max: 5, minLabel: "Думаю вслух", maxLabel: "Думаю молча" } },
  { id: "com3", text: "Мне важнее факты и логика чем эмоции и чувства в разговоре", type: "scale", dimension: "communication.style", scale: { min: 1, max: 5, minLabel: "Эмоции важнее", maxLabel: "Факты важнее" } },
  { id: "com4", text: "Я говорю прямо и по делу, без вступлений и украшений", type: "scale", dimension: "communication.directness", scale: { min: 1, max: 5, minLabel: "Мягко, издалека", maxLabel: "Прямо в лоб" } },
  { id: "com5", text: "Мне легче слушать чем говорить", type: "scale", dimension: "communication.role", scale: { min: 1, max: 5, minLabel: "Люблю говорить", maxLabel: "Люблю слушать" } },
];

const conflictStyle: Question[] = [
  { id: "conf1", text: "В конфликте мне важнее отстоять свою позицию, чем сохранить отношения", type: "scale", dimension: "conflict.competing", scale: { min: 1, max: 5, minLabel: "Совсем нет", maxLabel: "Точно" } },
  { id: "conf2", text: "Я ищу решение которое устроит обе стороны, даже если это займёт больше времени", type: "scale", dimension: "conflict.collaborating", scale: { min: 1, max: 5, minLabel: "Совсем нет", maxLabel: "Точно" } },
  { id: "conf3", text: "Я готов уступить часть своего чтобы быстрее договориться", type: "scale", dimension: "conflict.compromising", scale: { min: 1, max: 5, minLabel: "Совсем нет", maxLabel: "Точно" } },
  { id: "conf4", text: "Я стараюсь избегать конфликтов — лучше промолчать чем спорить", type: "scale", dimension: "conflict.avoiding", scale: { min: 1, max: 5, minLabel: "Совсем нет", maxLabel: "Точно" } },
  { id: "conf5", text: "Я часто уступаю другим чтобы им было хорошо, даже в ущерб себе", type: "scale", dimension: "conflict.accommodating", scale: { min: 1, max: 5, minLabel: "Совсем нет", maxLabel: "Точно" } },
];

const money: Question[] = [
  { id: "mon1", text: "Деньги для меня — это прежде всего свобода и возможности", type: "scale", dimension: "money.freedom", scale: { min: 1, max: 5, minLabel: "Совсем нет", maxLabel: "Точно" } },
  { id: "mon2", text: "Я легко трачу деньги на импульсивные покупки", type: "scale", dimension: "money.impulsive", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Постоянно" } },
  { id: "mon3", text: "Я готов рискнуть деньгами ради большой возможности", type: "scale", dimension: "money.risk", scale: { min: 1, max: 5, minLabel: "Совсем нет", maxLabel: "Точно" } },
  { id: "mon4", text: "У меня есть финансовая подушка на 3+ месяца", type: "boolean", dimension: "money.safety_net" },
  { id: "mon5", text: "Я трачу больше чем зарабатываю", type: "scale", dimension: "money.overspend", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Часто" } },
];

const stressProfile: Question[] = [
  { id: "stress1", text: "Когда ты в сильном стрессе — что происходит с твоим телом? (сжимается живот, болит голова, бессонница, etc.)", type: "open", dimension: "stress.body_response" },
  { id: "stress2", text: "Что ты делаешь чтобы снять стресс? Первая автоматическая реакция, не 'правильная'.", type: "open", dimension: "stress.coping" },
  { id: "stress3", text: "Какой самый стрессовый период в твоей жизни? Как ты с ним справился?", type: "open", dimension: "stress.peak_story" },
  { id: "stress4", text: "Что тебя стрессует прямо сейчас? Топ-3.", type: "open", dimension: "stress.current" },
];

const metaPreferences: Question[] = [
  { id: "meta1", text: "Как ты хочешь чтобы AI-ассистент с тобой общался?", type: "choice", dimension: "meta.coaching_style" },
  { id: "meta2", text: "Насколько прямо и жёстко тебе можно говорить правду?", type: "scale", dimension: "meta.directness", scale: { min: 1, max: 5, minLabel: "Очень мягко", maxLabel: "Максимально прямо" } },
  { id: "meta3", text: "Тебе нужен внешний контроль и напоминания, или ты сам себя мотивируешь?", type: "scale", dimension: "meta.accountability", scale: { min: 1, max: 5, minLabel: "Сам справляюсь", maxLabel: "Нужен внешний пинок" } },
  { id: "meta4", text: "Что тебя больше мотивирует — вдохновляющее будущее или страх упустить?", type: "scale", dimension: "meta.motivation_type", scale: { min: 1, max: 5, minLabel: "Страх потери", maxLabel: "Вдохновение" } },
  { id: "meta5", text: "Опиши идеального помощника/коуча — каким он должен быть?", type: "open", dimension: "meta.ideal_coach" },
];

// ============================================================
// SESSION CONFIGS
// ============================================================

export const sessions: SessionConfig[] = [
  {
    id: "foundation",
    title: "Foundation",
    subtitle: "Структура личности",
    description: "Big Five, стиль привязанности и ценности — фундамент понимания кто ты",
    estimatedMinutes: 50,
    icon: "🧬",
    sections: [
      { id: "big5_o", title: "Открытость опыту", description: "Насколько ты открыт новому, идеям, экспериментам", questions: bigFiveOpenness },
      { id: "big5_c", title: "Добросовестность", description: "Дисциплина, организованность, надёжность", questions: bigFiveConscientiousness },
      { id: "big5_e", title: "Экстраверсия", description: "Энергия от людей, инициативность, активность", questions: bigFiveExtraversion },
      { id: "big5_a", title: "Доброжелательность", description: "Доверие, кооперация, эмпатия", questions: bigFiveAgreeableness },
      { id: "big5_n", title: "Нейротизм", description: "Тревожность, раздражительность, эмоциональная нестабильность", questions: bigFiveNeuroticism },
      { id: "attachment", title: "Стиль привязанности", description: "Как ты строишь близкие отношения", questions: [...attachmentAnxiety, ...attachmentAvoidance] },
      { id: "values", title: "Ценности", description: "Что для тебя по-настоящему важно", questions: values },
    ],
  },
  {
    id: "depths",
    title: "Depths",
    subtitle: "Глубинные паттерны",
    description: "Эмоциональная регуляция, когнитивные установки, схемы и детский опыт",
    estimatedMinutes: 50,
    icon: "🔬",
    sections: [
      { id: "ders", title: "Эмоциональная регуляция", description: "Как ты справляешься с эмоциями", questions: ders },
      { id: "das", title: "Когнитивные установки", description: "Убеждения которые управляют на автопилоте", questions: das },
      { id: "ysq", title: "Глубинные схемы", description: "Паттерны из детства которые влияют сейчас", questions: ysq },
      { id: "ace", title: "Детский опыт", description: "Важные события до 18 лет (да/нет)", questions: ace },
    ],
  },
  {
    id: "narrative",
    title: "Narrative",
    subtitle: "Твоя история",
    description: "Открытые вопросы о жизни, целях, страхах и энергии",
    estimatedMinutes: 40,
    icon: "📖",
    sections: [
      { id: "formative", title: "Формирующий опыт", description: "Откуда взялись твои паттерны", questions: narrativeFormative },
      { id: "blind_spots", title: "Слепые зоны", description: "Что ты не видишь о себе", questions: narrativeBlindSpots },
      { id: "identity", title: "Идентичность", description: "Кто ты и куда идёшь", questions: narrativeIdentity },
      { id: "energy", title: "Энергия и состояния", description: "Что заряжает, что тормозит", questions: narrativeEnergy },
    ],
  },
  {
    id: "dynamics",
    title: "Dynamics",
    subtitle: "Внутренняя динамика",
    description: "Отношения, внутренние конфликты, мотивация и реальное поведение",
    estimatedMinutes: 45,
    icon: "⚡",
    sections: [
      { id: "relationships", title: "Паттерны отношений", description: "Как ты взаимодействуешь с людьми", questions: relationships },
      { id: "ifs", title: "Внутренние части", description: "Кто внутри тебя конфликтует", questions: ifs },
      { id: "sdt", title: "Мотивация", description: "Базовые психологические потребности", questions: sdt },
      { id: "behavioral", title: "Поведенческие тесты", description: "Как ты реально действуешь", questions: behavioral },
    ],
  },
  {
    id: "operating",
    title: "Operating System",
    subtitle: "Как ты работаешь",
    description: "Таланты, хронотип, коммуникация, конфликт, деньги, стресс и настройки AI",
    estimatedMinutes: 40,
    icon: "⚙️",
    sections: [
      { id: "strengths", title: "Таланты и сильные стороны", description: "Что тебе даётся естественно", questions: strengths },
      { id: "chronotype", title: "Хронотип и тело", description: "Когда ты на пике, сколько спишь", questions: chronotype },
      { id: "communication", title: "Стиль коммуникации", description: "Как ты говоришь и слушаешь", questions: communication },
      { id: "conflict_style", title: "Стиль конфликта", description: "Thomas-Kilmann: как ты решаешь разногласия", questions: conflictStyle },
      { id: "money", title: "Отношение к деньгам", description: "Финансовое поведение и установки", questions: money },
      { id: "stress", title: "Стресс-профиль", description: "Как реагируешь, как справляешься", questions: stressProfile },
      { id: "meta", title: "Настройки AI-помощника", description: "Как ты хочешь чтобы с тобой работали", questions: metaPreferences },
    ],
  },
];

// Helper: get all questions flat
export function getAllQuestions(): Question[] {
  return sessions.flatMap(s => s.sections.flatMap(sec => sec.questions));
}

// Helper: count total questions
export function getTotalQuestionCount(): number {
  return getAllQuestions().length;
}
