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
// SESSION 6: EGO ARCHITECTURE
// ============================================================

const egoDevelopment: Question[] = [
  // Adapted sentence completion (Loevinger/Cook-Greuter)
  { id: "ego1", text: "Закончи предложение: 'Правила существуют для того чтобы...'", type: "open", dimension: "ego.rules" },
  { id: "ego2", text: "Закончи: 'Когда меня критикуют, я...'", type: "open", dimension: "ego.criticism" },
  { id: "ego3", text: "Закончи: 'Хороший человек — это тот кто...'", type: "open", dimension: "ego.morality" },
  { id: "ego4", text: "Закончи: 'Когда я чувствую внутренний конфликт...'", type: "open", dimension: "ego.conflict" },
  { id: "ego5", text: "Закончи: 'Мне трудно принять в себе...'", type: "open", dimension: "ego.acceptance" },
  { id: "ego6", text: "Закончи: 'Смысл моей жизни...'", type: "open", dimension: "ego.meaning" },
  { id: "ego7", text: "Закончи: 'Когда кто-то думает иначе чем я...'", type: "open", dimension: "ego.perspective" },
  { id: "ego8", text: "Закончи: 'Моя самая большая ложь самому себе...'", type: "open", dimension: "ego.self_deception" },
  { id: "ego9", text: "Я могу одновременно держать в голове две противоположные идеи и принимать обе", type: "scale", dimension: "ego.complexity", scale: { min: 1, max: 5, minLabel: "Совсем нет — нужна ясность", maxLabel: "Легко — мир полон парадоксов" } },
  { id: "ego10", text: "Я ощущаю что моё 'я' — это процесс который постоянно меняется, а не фиксированная вещь", type: "scale", dimension: "ego.fluidity", scale: { min: 1, max: 5, minLabel: "Нет, я = я", maxLabel: "Да, я постоянно меняюсь" } },
  { id: "ego11", text: "Я замечаю свои паттерны мышления КАК паттерны, а не просто 'правду'", type: "scale", dimension: "ego.meta_awareness", scale: { min: 1, max: 5, minLabel: "Мои мысли = реальность", maxLabel: "Мысли — это просто мысли" } },
  { id: "ego12", text: "Когда я чувствую сильную уверенность в чём-то — я автоматически проверяю: может я ошибаюсь?", type: "scale", dimension: "ego.self_questioning", scale: { min: 1, max: 5, minLabel: "Нет, уверенность = правда", maxLabel: "Всегда проверяю" } },
];

const defenseMechanisms: Question[] = [
  // Adapted from Defense Style Questionnaire (DSQ-40)
  // Immature defenses
  { id: "def1", text: "Когда мне плохо — я представляю идеальный сценарий где всё хорошо (фантазирование)", type: "scale", dimension: "defense.immature.fantasy", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Постоянно" } },
  { id: "def2", text: "Иногда я чувствую злость на кого-то, но срываюсь на другом человеке или вещи", type: "scale", dimension: "defense.immature.displacement", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Часто" } },
  { id: "def3", text: "Когда мне больно — я делаю вид (и для себя тоже) что ничего не произошло", type: "scale", dimension: "defense.immature.denial", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Часто" } },
  { id: "def4", text: "Я замечаю в других те качества, которые мне не нравятся в самом себе", type: "scale", dimension: "defense.immature.projection", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Часто" } },
  { id: "def5", text: "Когда я зол — я выражаю это не напрямую, а через сарказм, опоздания, 'забывание'", type: "scale", dimension: "defense.immature.passive_aggression", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Часто" } },
  // Neurotic defenses
  { id: "def6", text: "Я объясняю свои эмоциональные реакции логическими причинами, даже когда причина — просто чувство", type: "scale", dimension: "defense.neurotic.rationalization", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Постоянно" } },
  { id: "def7", text: "Я анализирую свои чувства интеллектуально вместо того чтобы их проживать", type: "scale", dimension: "defense.neurotic.intellectualization", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Постоянно" } },
  { id: "def8", text: "Я делаю противоположное тому что чувствую (например: злюсь но веду себя подчёркнуто доброжелательно)", type: "scale", dimension: "defense.neurotic.reaction_formation", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Часто" } },
  { id: "def9", text: "Я подавляю неприятные мысли и чувства — просто выключаю их", type: "scale", dimension: "defense.neurotic.repression", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Постоянно" } },
  // Mature defenses
  { id: "def10", text: "Я превращаю сложные переживания в творчество, работу или спорт", type: "scale", dimension: "defense.mature.sublimation", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Часто" } },
  { id: "def11", text: "Я могу посмеяться над своими проблемами — юмор помогает мне справляться", type: "scale", dimension: "defense.mature.humor", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Часто" } },
  { id: "def12", text: "Когда я знаю что будет сложно — я заранее эмоционально готовлюсь", type: "scale", dimension: "defense.mature.anticipation", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Часто" } },
];

const schemaCoping: Question[] = [
  // For each dominant schema pattern: surrender, avoidance, overcompensation
  { id: "sc1", text: "Когда я чувствую что меня могут отвергнуть — я стараюсь быть ещё лучше и полезнее (подчинение)", type: "scale", dimension: "schema_coping.surrender", scale: { min: 1, max: 5, minLabel: "Нет", maxLabel: "Всегда" } },
  { id: "sc2", text: "Когда я чувствую что меня могут отвергнуть — я дистанцируюсь первым (избегание)", type: "scale", dimension: "schema_coping.avoidance", scale: { min: 1, max: 5, minLabel: "Нет", maxLabel: "Всегда" } },
  { id: "sc3", text: "Когда я чувствую что меня могут отвергнуть — я атакую или контролирую ситуацию (гиперкомпенсация)", type: "scale", dimension: "schema_coping.overcompensation", scale: { min: 1, max: 5, minLabel: "Нет", maxLabel: "Всегда" } },
  { id: "sc4", text: "Когда я чувствую свою недостаточность — я работаю ещё больше и жёстче (подчинение)", type: "scale", dimension: "schema_coping.surrender_perf", scale: { min: 1, max: 5, minLabel: "Нет", maxLabel: "Всегда" } },
  { id: "sc5", text: "Когда я чувствую свою недостаточность — я откладываю и избегаю ситуаций оценки (избегание)", type: "scale", dimension: "schema_coping.avoidance_perf", scale: { min: 1, max: 5, minLabel: "Нет", maxLabel: "Всегда" } },
  { id: "sc6", text: "Когда я чувствую свою недостаточность — я демонстрирую превосходство и обесцениваю других (гиперкомпенсация)", type: "scale", dimension: "schema_coping.overcomp_perf", scale: { min: 1, max: 5, minLabel: "Нет", maxLabel: "Всегда" } },
  { id: "sc7", text: "Когда мне не хватает эмоциональной близости — я молчу о потребностях и терплю (подчинение)", type: "scale", dimension: "schema_coping.surrender_dep", scale: { min: 1, max: 5, minLabel: "Нет", maxLabel: "Всегда" } },
  { id: "sc8", text: "Когда мне не хватает эмоциональной близости — я закрываюсь и говорю 'мне не нужно' (избегание)", type: "scale", dimension: "schema_coping.avoidance_dep", scale: { min: 1, max: 5, minLabel: "Нет", maxLabel: "Всегда" } },
  { id: "sc9", text: "Когда мне не хватает эмоциональной близости — я требую внимания, устраиваю сцены (гиперкомпенсация)", type: "scale", dimension: "schema_coping.overcomp_dep", scale: { min: 1, max: 5, minLabel: "Нет", maxLabel: "Всегда" } },
];

const shadowWork: Question[] = [
  { id: "shd1", text: "Какие качества в других людях тебя РАЗДРАЖАЮТ больше всего? Назови 3.", type: "open", dimension: "shadow.projection" },
  { id: "shd2", text: "Что ты НИКОГДА себе не позволяешь? (даже в мыслях)", type: "open", dimension: "shadow.forbidden" },
  { id: "shd3", text: "Если бы ты мог быть ПОЛНОЙ ПРОТИВОПОЛОЖНОСТЬЮ себя на один день — кем бы ты был? Что бы делал?", type: "open", dimension: "shadow.opposite" },
  { id: "shd4", text: "Какой комплимент тебе было бы НЕПРИЯТНО получить? Что тебе не хочется чтобы в тебе видели?", type: "open", dimension: "shadow.rejected_positive" },
  { id: "shd5", text: "Если бы никто никогда не узнал — что бы ты делал по-другому в жизни?", type: "open", dimension: "shadow.hidden_desire" },
  { id: "shd6", text: "О чём ты думаешь но стыдишься что думаешь?", type: "open", dimension: "shadow.shame_thoughts" },
  { id: "shd7", text: "Вспомни человека которого ты не можешь простить. Что он сделал? Почему это так ранит?", type: "open", dimension: "shadow.unforgiven" },
];

const innerRoles: Question[] = [
  { id: "role1", text: "В семье ты был: герой (спасал), козёл отпущения (виноват), потерянный ребёнок (невидимый), клоун (смешил), или взрослый ребёнок (ответственный за всех)?", type: "choice", dimension: "roles.family" },
  { id: "role2", text: "В компании друзей ты обычно: лидер, советник, душа компании, наблюдатель, или провокатор?", type: "choice", dimension: "roles.social" },
  { id: "role3", text: "На работе ты: стратег, исполнитель, креатор, медиатор, или бунтарь?", type: "choice", dimension: "roles.work" },
  { id: "role4", text: "В стрессе ты становишься: контролёром, жертвой, спасателем, отшельником, или воином?", type: "choice", dimension: "roles.stress" },
  { id: "role5", text: "Какая роль забирает у тебя больше всего энергии? Которую ты играешь но не хочешь?", type: "open", dimension: "roles.draining" },
  { id: "role6", text: "Какая роль тебе запрещена? Которую ты хотел бы но 'не имеешь права'?", type: "open", dimension: "roles.forbidden_role" },
];

// ============================================================
// SESSION 7: DEPTH SCAN
// ============================================================

const existential: Question[] = [
  // Death
  { id: "ex1", text: "Как часто ты думаешь о собственной смерти?", type: "scale", dimension: "existential.death_awareness", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Часто" } },
  { id: "ex2", text: "Осознание что жизнь конечна — как это влияет на твои решения?", type: "open", dimension: "existential.mortality_impact" },
  // Freedom
  { id: "ex3", text: "Я сам создаю свою жизнь — или она складывается из обстоятельств?", type: "scale", dimension: "existential.freedom", scale: { min: 1, max: 5, minLabel: "Обстоятельства решают", maxLabel: "Я создаю всё сам" } },
  { id: "ex4", text: "Мне страшно от того что я полностью свободен в своём выборе", type: "scale", dimension: "existential.freedom_anxiety", scale: { min: 1, max: 5, minLabel: "Нет, свобода = кайф", maxLabel: "Да, свобода пугает" } },
  // Isolation
  { id: "ex5", text: "Даже среди близких людей я иногда чувствую фундаментальное одиночество", type: "scale", dimension: "existential.isolation", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Часто" } },
  { id: "ex6", text: "Есть ли часть тебя которую НИКТО не знает и не поймёт?", type: "open", dimension: "existential.unknowable_self" },
  // Meaninglessness
  { id: "ex7", text: "Бывают ли моменты когда всё кажется бессмысленным — не депрессия, а именно 'зачем всё это'?", type: "scale", dimension: "existential.meaninglessness", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Регулярно" } },
  { id: "ex8", text: "Откуда ты берёшь смысл когда становится тяжело?", type: "open", dimension: "existential.meaning_source" },
];

const meaningSystem: Question[] = [
  { id: "mng1", text: "Зачем ты встаёшь по утрам? Не 'что делаешь', а ЗАЧЕМ.", type: "open", dimension: "meaning.purpose" },
  { id: "mng2", text: "Если бы все материальные вопросы были решены навсегда — чем бы ты занимался?", type: "open", dimension: "meaning.post_material" },
  { id: "mng3", text: "Что ты хочешь чтобы осталось после тебя?", type: "open", dimension: "meaning.legacy" },
  { id: "mng4", text: "Что для тебя значит 'хорошо прожитая жизнь'?", type: "open", dimension: "meaning.good_life" },
  { id: "mng5", text: "Моя жизнь имеет ясный смысл и направление", type: "scale", dimension: "meaning.clarity", scale: { min: 1, max: 7, minLabel: "Совсем нет", maxLabel: "Абсолютно" } },
  { id: "mng6", text: "Я активно ищу смысл в жизни (ещё не нашёл)", type: "scale", dimension: "meaning.searching", scale: { min: 1, max: 7, minLabel: "Нет, не ищу", maxLabel: "Постоянно ищу" } },
];

const possibleSelves: Question[] = [
  { id: "ps1", text: "Кем ты ХОЧЕШЬ стать через 5 лет? Опиши этого человека — не достижения, а каким он ЯВЛЯЕТСЯ.", type: "open", dimension: "possible_selves.hoped" },
  { id: "ps2", text: "Кем ты БОИШЬСЯ стать? Худший сценарий через 5 лет.", type: "open", dimension: "possible_selves.feared" },
  { id: "ps3", text: "Кем ты ОЖИДАЕШЬ стать реалистично?", type: "open", dimension: "possible_selves.expected" },
  { id: "ps4", text: "Насколько тот кем ты хочешь стать отличается от того кто ты сейчас?", type: "scale", dimension: "possible_selves.gap", scale: { min: 1, max: 5, minLabel: "Почти не отличается", maxLabel: "Кардинально другой человек" } },
  { id: "ps5", text: "Насколько ты веришь что можешь стать тем кем хочешь?", type: "scale", dimension: "possible_selves.self_efficacy", scale: { min: 1, max: 5, minLabel: "Не верю", maxLabel: "Абсолютно уверен" } },
];

const changeReadiness: Question[] = [
  // Adapted URICA — stages of change per domain
  { id: "chg1", text: "Мой стиль отношений (привязанности) — это проблема которую я хочу решить", type: "scale", dimension: "change.relationships", scale: { min: 1, max: 5, minLabel: "Нет проблемы", maxLabel: "Активно работаю над этим" } },
  { id: "chg2", text: "Моя прокрастинация/продуктивность — это проблема которую я хочу решить", type: "scale", dimension: "change.productivity", scale: { min: 1, max: 5, minLabel: "Нет проблемы", maxLabel: "Активно работаю над этим" } },
  { id: "chg3", text: "Мои эмоциональные реакции — это проблема которую я хочу решить", type: "scale", dimension: "change.emotions", scale: { min: 1, max: 5, minLabel: "Нет проблемы", maxLabel: "Активно работаю над этим" } },
  { id: "chg4", text: "Моя неспособность устанавливать границы — это проблема которую я хочу решить", type: "scale", dimension: "change.boundaries", scale: { min: 1, max: 5, minLabel: "Нет проблемы", maxLabel: "Активно работаю над этим" } },
  { id: "chg5", text: "Мой перфекционизм / стандарты — это проблема которую я хочу решить", type: "scale", dimension: "change.perfectionism", scale: { min: 1, max: 5, minLabel: "Нет проблемы", maxLabel: "Активно работаю над этим" } },
  { id: "chg6", text: "Моё физическое здоровье / привычки — это проблема которую я хочу решить", type: "scale", dimension: "change.health", scale: { min: 1, max: 5, minLabel: "Нет проблемы", maxLabel: "Активно работаю над этим" } },
  { id: "chg7", text: "Был ли у тебя опыт УСПЕШНОГО изменения чего-то важного в себе? Расскажи.", type: "open", dimension: "change.past_success" },
];

const transformResources: Question[] = [
  { id: "res1", text: "Есть ли у тебя человек которому ты можешь показать свою слабость без страха?", type: "boolean", dimension: "resources.safe_person" },
  { id: "res2", text: "Ты работаешь или работал с терапевтом/коучем?", type: "choice", dimension: "resources.therapy" },
  { id: "res3", text: "У тебя есть финансовая стабильность чтобы фокусироваться на росте, а не выживании?", type: "boolean", dimension: "resources.financial" },
  { id: "res4", text: "Есть ли у тебя сообщество/группа где тебя принимают таким какой ты есть?", type: "boolean", dimension: "resources.community" },
  { id: "res5", text: "Есть ли практика которая помогает тебе восстанавливаться (медитация, спорт, природа, творчество)?", type: "open", dimension: "resources.practice" },
  { id: "res6", text: "Сколько часов в неделю ты реально готов тратить на работу над собой?", type: "choice", dimension: "resources.time" },
  { id: "res7", text: "Что может тебя остановить от изменений? Главное препятствие.", type: "open", dimension: "resources.obstacle" },
];

// ============================================================
// SESSION 8: BODY & META
// ============================================================

const nervousSystem: Question[] = [
  // Polyvagal assessment
  { id: "ns1", text: "Я легко чувствую себя в безопасности рядом с другими людьми", type: "scale", dimension: "nervous.ventral", scale: { min: 1, max: 5, minLabel: "Редко", maxLabel: "Часто" } },
  { id: "ns2", text: "Мне легко расслабиться после стрессовой ситуации", type: "scale", dimension: "nervous.ventral_recovery", scale: { min: 1, max: 5, minLabel: "Очень трудно", maxLabel: "Легко" } },
  { id: "ns3", text: "Моё тело часто в состоянии 'боевой готовности' — сердце бьётся, мышцы напряжены", type: "scale", dimension: "nervous.sympathetic", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Постоянно" } },
  { id: "ns4", text: "При сильном стрессе я 'отключаюсь' — становлюсь вялым, отстранённым, как в тумане", type: "scale", dimension: "nervous.dorsal", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Часто" } },
  { id: "ns5", text: "Я чувствительна/чувствителен к громким звукам, яркому свету, толпе", type: "scale", dimension: "nervous.sensory_sensitivity", scale: { min: 1, max: 5, minLabel: "Нет", maxLabel: "Очень" } },
  { id: "ns6", text: "Мне нужно больше времени на восстановление после социальных ситуаций чем большинству людей", type: "scale", dimension: "nervous.recovery_time", scale: { min: 1, max: 5, minLabel: "Нет", maxLabel: "Да, значительно" } },
];

const bodyAwareness: Question[] = [
  // Adapted from MAIA (Multidimensional Assessment of Interoceptive Awareness)
  { id: "body1", text: "Я замечаю физические ощущения в теле до того как осознаю эмоцию", type: "scale", dimension: "body.noticing", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Всегда" } },
  { id: "body2", text: "Когда мне тревожно — я могу точно сказать ГДЕ в теле это ощущение", type: "scale", dimension: "body.locating", scale: { min: 1, max: 5, minLabel: "Нет", maxLabel: "Точно" } },
  { id: "body3", text: "Я использую своё тело как источник информации для принятия решений ('gut feeling')", type: "scale", dimension: "body.trusting", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Часто" } },
  { id: "body4", text: "Я склонен игнорировать сигналы тела (голод, усталость, боль) когда занят", type: "scale", dimension: "body.ignoring", scale: { min: 1, max: 5, minLabel: "Нет, я слушаю тело", maxLabel: "Да, постоянно" } },
  { id: "body5", text: "Моё тело и я — это одно целое. Или я живу 'в голове'?", type: "scale", dimension: "body.embodiment", scale: { min: 1, max: 5, minLabel: "Живу в голове", maxLabel: "Полностью в теле" } },
];

const selfCompassion: Question[] = [
  // Adapted from Kristin Neff's Self-Compassion Scale
  { id: "scomp1", text: "Когда я ошибаюсь — я отношусь к себе с пониманием, как отнёсся бы к другу", type: "scale", dimension: "self_compassion.kindness", scale: { min: 1, max: 5, minLabel: "Никогда — я себя критикую", maxLabel: "Всегда" } },
  { id: "scomp2", text: "Когда мне трудно — я напоминаю себе что все люди проходят через трудности", type: "scale", dimension: "self_compassion.common_humanity", scale: { min: 1, max: 5, minLabel: "Нет — чувствую себя одиноким в этом", maxLabel: "Да" } },
  { id: "scomp3", text: "Когда больно — я могу быть с этой болью не убегая и не застревая в ней", type: "scale", dimension: "self_compassion.mindfulness", scale: { min: 1, max: 5, minLabel: "Нет — убегаю или тону", maxLabel: "Да" } },
  { id: "scomp4", text: "Я говорю себе жёсткие, унижающие вещи когда ошибаюсь", type: "scale", dimension: "self_compassion.self_judgment", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Постоянно" } },
  { id: "scomp5", text: "Когда я страдаю — я чувствую что другим легче чем мне", type: "scale", dimension: "self_compassion.isolation", scale: { min: 1, max: 5, minLabel: "Нет", maxLabel: "Всегда" } },
  { id: "scomp6", text: "Я зацикливаюсь на своих ошибках и прокручиваю их снова и снова", type: "scale", dimension: "self_compassion.over_identification", scale: { min: 1, max: 5, minLabel: "Нет", maxLabel: "Постоянно" } },
];

const psychFlexibility: Question[] = [
  // Adapted from AAQ-II (Acceptance and Action Questionnaire)
  { id: "flex1", text: "Мои болезненные воспоминания мешают мне жить полноценной жизнью", type: "scale", dimension: "flexibility.fusion", scale: { min: 1, max: 7, minLabel: "Совсем нет", maxLabel: "Полностью да" } },
  { id: "flex2", text: "Я боюсь своих чувств", type: "scale", dimension: "flexibility.avoidance", scale: { min: 1, max: 7, minLabel: "Совсем нет", maxLabel: "Полностью" } },
  { id: "flex3", text: "Я беспокоюсь что не смогу контролировать свою тревогу или печаль", type: "scale", dimension: "flexibility.control", scale: { min: 1, max: 7, minLabel: "Совсем нет", maxLabel: "Полностью" } },
  { id: "flex4", text: "Мои тяжёлые переживания мешают мне жить так как я хочу", type: "scale", dimension: "flexibility.impact", scale: { min: 1, max: 7, minLabel: "Совсем нет", maxLabel: "Полностью" } },
  { id: "flex5", text: "Я могу действовать в соответствии с ценностями ДАЖЕ когда мне больно или страшно", type: "scale", dimension: "flexibility.values_action", scale: { min: 1, max: 7, minLabel: "Нет — боль останавливает", maxLabel: "Да — действую несмотря на боль" } },
];

const metacognition: Question[] = [
  // Adapted from Metacognitive Awareness Inventory
  { id: "mtc1", text: "Я замечаю КОГДА начинаю думать по привычному шаблону, а не объективно", type: "scale", dimension: "meta.awareness", scale: { min: 1, max: 5, minLabel: "Никогда", maxLabel: "Часто" } },
  { id: "mtc2", text: "Я могу 'отступить назад' и посмотреть на ситуацию как наблюдатель, а не участник", type: "scale", dimension: "meta.decentering", scale: { min: 1, max: 5, minLabel: "Не могу", maxLabel: "Легко" } },
  { id: "mtc3", text: "Когда я принимаю решение — я осознаю какие предвзятости могут на меня влиять", type: "scale", dimension: "meta.bias_awareness", scale: { min: 1, max: 5, minLabel: "Не думаю об этом", maxLabel: "Всегда проверяю" } },
  { id: "mtc4", text: "Я регулярно переоцениваю свои убеждения — готов ли я изменить мнение при новых данных?", type: "scale", dimension: "meta.belief_update", scale: { min: 1, max: 5, minLabel: "Мои убеждения стабильны", maxLabel: "Постоянно обновляю" } },
  { id: "mtc5", text: "Я понимаю КАК я учусь лучше всего и использую это осознанно", type: "scale", dimension: "meta.learning", scale: { min: 1, max: 5, minLabel: "Не задумывался", maxLabel: "Полностью осознаю" } },
];

const locusOfControl: Question[] = [
  // Adapted Rotter's Locus of Control
  { id: "loc1", text: "Мои успехи — результат моих усилий, а не удачи или обстоятельств", type: "scale", dimension: "locus.internal_success", scale: { min: 1, max: 5, minLabel: "Повезло", maxLabel: "Я заработал" } },
  { id: "loc2", text: "Мои неудачи — результат моих ошибок, а не невезения", type: "scale", dimension: "locus.internal_failure", scale: { min: 1, max: 5, minLabel: "Невезение", maxLabel: "Мои ошибки" } },
  { id: "loc3", text: "Я могу значительно изменить свою жизнь если захочу", type: "scale", dimension: "locus.agency", scale: { min: 1, max: 5, minLabel: "Мало что зависит от меня", maxLabel: "Всё в моих руках" } },
  { id: "loc4", text: "Судьба / вселенная / высшие силы играют важную роль в моей жизни", type: "scale", dimension: "locus.external_fate", scale: { min: 1, max: 5, minLabel: "Нет — только мои действия", maxLabel: "Да — многое предопределено" } },
  { id: "loc5", text: "Другие люди имеют больше влияния на мою жизнь чем я сам", type: "scale", dimension: "locus.external_others", scale: { min: 1, max: 5, minLabel: "Нет", maxLabel: "Да" } },
];

const validityScale: Question[] = [
  // Social desirability / lie detection
  { id: "val_v1", text: "Я никогда не говорю о людях плохо за их спиной", type: "scale", dimension: "validity.lie1", scale: { min: 1, max: 5, minLabel: "Бывает", maxLabel: "Никогда (точно)" } },
  { id: "val_v2", text: "Я никогда не испытывал зависти к чужому успеху", type: "scale", dimension: "validity.lie2", scale: { min: 1, max: 5, minLabel: "Бывало", maxLabel: "Никогда" } },
  { id: "val_v3", text: "Я всегда держу обещания, без исключений", type: "scale", dimension: "validity.lie3", scale: { min: 1, max: 5, minLabel: "Иногда нарушаю", maxLabel: "Всегда (100%)" } },
  { id: "val_v4", text: "Я никогда не думал ни о ком плохо", type: "scale", dimension: "validity.lie4", scale: { min: 1, max: 5, minLabel: "Конечно думал", maxLabel: "Никогда" } },
  { id: "val_v5", text: "Все мои поступки мотивированы добрыми намерениями", type: "scale", dimension: "validity.lie5", scale: { min: 1, max: 5, minLabel: "Не всегда", maxLabel: "Всегда (100%)" } },
  { id: "val_v6", text: "Я никогда не испытывал злости без причины", type: "scale", dimension: "validity.lie6", scale: { min: 1, max: 5, minLabel: "Бывало", maxLabel: "Никогда" } },
  // Consistency checks (should match earlier answers)
  { id: "val_v7", text: "Мне легко в компании незнакомых людей", type: "scale", dimension: "validity.consistency_extraversion", scale: { min: 1, max: 5, minLabel: "Совсем нет", maxLabel: "Очень легко" } },
  { id: "val_v8", text: "Я часто тревожусь", type: "scale", dimension: "validity.consistency_neuroticism", scale: { min: 1, max: 5, minLabel: "Нет", maxLabel: "Да" } },
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
  {
    id: "ego",
    title: "Ego Architecture",
    subtitle: "Структура эго и защиты",
    description: "Уровень развития сознания, защитные механизмы, теневые качества и внутренние роли",
    estimatedMinutes: 45,
    icon: "🪞",
    sections: [
      { id: "ego_dev", title: "Уровень развития эго", description: "Loevinger: как устроено твоё сознание", questions: egoDevelopment },
      { id: "defenses", title: "Защитные механизмы", description: "Как ты защищаешь психику от боли", questions: defenseMechanisms },
      { id: "schema_coping", title: "Стратегии схем", description: "Подчинение, избегание или гиперкомпенсация", questions: schemaCoping },
      { id: "shadow", title: "Тень", description: "Подавленные качества и отвергнутые части", questions: shadowWork },
      { id: "roles", title: "Внутренние роли", description: "Маски которые ты носишь", questions: innerRoles },
    ],
  },
  {
    id: "depth",
    title: "Depth Scan",
    subtitle: "Экзистенциальная глубина",
    description: "Смысл жизни, отношение к смерти, свободе, одиночеству, трансформационная готовность",
    estimatedMinutes: 40,
    icon: "🕳️",
    sections: [
      { id: "existential", title: "Экзистенциальные данности", description: "Смерть, свобода, изоляция, бессмысленность", questions: existential },
      { id: "meaning", title: "Система смыслов", description: "Откуда берёшь смысл и цель", questions: meaningSystem },
      { id: "possible_selves", title: "Возможные Я", description: "Кем хочешь стать, кем боишься стать", questions: possibleSelves },
      { id: "change_readiness", title: "Готовность к изменениям", description: "Стадия изменений по каждому блоку", questions: changeReadiness },
      { id: "resources", title: "Ресурсы для трансформации", description: "На чём строить изменения", questions: transformResources },
    ],
  },
  {
    id: "soma",
    title: "Body & Meta",
    subtitle: "Тело, метакогниция, гибкость",
    description: "Нервная система, тело, самосострадание, психологическая гибкость и метапознание",
    estimatedMinutes: 35,
    icon: "🫀",
    sections: [
      { id: "nervous_system", title: "Нервная система", description: "Polyvagal: вентральный, симпатический, дорсальный", questions: nervousSystem },
      { id: "body_awareness", title: "Тело и интероцепция", description: "Насколько ты чувствуешь своё тело", questions: bodyAwareness },
      { id: "self_compassion", title: "Самосострадание", description: "Kristin Neff: можешь ли ты быть добрым к себе", questions: selfCompassion },
      { id: "psych_flexibility", title: "Психологическая гибкость", description: "ACT: принятие vs избегание опыта", questions: psychFlexibility },
      { id: "metacognition", title: "Метакогниция", description: "Насколько ты осознаёшь своё мышление", questions: metacognition },
      { id: "locus", title: "Локус контроля", description: "Управляешь жизнью или жизнь управляет тобой", questions: locusOfControl },
      { id: "validity", title: "Калибровка", description: "Контрольные вопросы", questions: validityScale },
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
