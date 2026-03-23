export type FreeScaleKey =
  | "attachment:secure"
  | "attachment:anxious"
  | "attachment:avoidant"
  | "stress:fight"
  | "stress:flight"
  | "stress:freeze"
  | "motivation:safety"
  | "motivation:recognition"
  | "motivation:freedom"
  | "motivation:control"
  | "motivation:connection"
  | "defense:rationalization"
  | "defense:avoidance"
  | "defense:control"
  | "defense:people_pleasing"
  | "defense:compensation"
  | "childhood:perfectionist"
  | "childhood:rebel"
  | "childhood:invisible"
  | "childhood:rescuer"
  | "childhood:clown";

export interface FreeAnswerOption {
  id: "a" | "b" | "c" | "d";
  text: string;
  scores: Partial<Record<FreeScaleKey, number>>;
}

export interface FreeQuestion {
  id: string;
  text: string;
  options: FreeAnswerOption[];
}

export interface PatternDefinition {
  id: string;
  name: string;
  childhood: string;
  defense: string;
  description: string;
}

export const patterns: PatternDefinition[] = [
  {
    id: "p1",
    name: "Я сам",
    childhood: "perfectionist",
    defense: "control",
    description: "Всё контролирует, никого не подпускает",
  },
  {
    id: "p2",
    name: "Вечный отличник",
    childhood: "perfectionist",
    defense: "rationalization",
    description: "Делает идеально, но никогда не доволен",
  },
  {
    id: "p3",
    name: "Белка в колесе",
    childhood: "perfectionist",
    defense: "compensation",
    description: "Пашет на 200%, потом лежит трупом",
  },
  {
    id: "p4",
    name: "Для всех хороший",
    childhood: "rescuer",
    defense: "people_pleasing",
    description: "Помогает всем, забивает на себя",
  },
  {
    id: "p5",
    name: "Герой на износ",
    childhood: "rescuer",
    defense: "compensation",
    description: "Тащит всё на себе, пока не сломается",
  },
  {
    id: "p6",
    name: "Против системы",
    childhood: "rebel",
    defense: "compensation",
    description: "Бунтует, даже когда не надо",
  },
  {
    id: "p7",
    name: "Свободный волк",
    childhood: "rebel",
    defense: "avoidance",
    description: "Сваливает как только становится серьёзно",
  },
  {
    id: "p8",
    name: "Тихий наблюдатель",
    childhood: "invisible",
    defense: "avoidance",
    description: "Видит всё, но молчит",
  },
  {
    id: "p9",
    name: "Серый кардинал",
    childhood: "invisible",
    defense: "rationalization",
    description: "Влияет на всё, но из тени",
  },
  {
    id: "p10",
    name: "Душа компании",
    childhood: "clown",
    defense: "compensation",
    description: "Все смеются, а внутри пусто",
  },
  {
    id: "p11",
    name: "Зеркало",
    childhood: "clown",
    defense: "people_pleasing",
    description: "Подстраивается под каждого, теряет себя",
  },
  {
    id: "p12",
    name: "Вечный студент",
    childhood: "invisible",
    defense: "people_pleasing",
    description: "Учится, готовится, но не начинает",
  },
];

export const freeQuestions: FreeQuestion[] = [
  // ─── Q1-5: attachment + childhood ───────────────────────────────

  {
    id: "fq1",
    text: "Пятница вечер, ты устал после тяжёлой недели. Что делаешь?",
    options: [
      {
        id: "a",
        text: "Ложусь один, телефон на беззвучный. Мне никто не нужен сейчас",
        scores: {
          "attachment:avoidant": 1,
          "stress:flight": 1,
          "childhood:invisible": 1,
        },
      },
      {
        id: "b",
        text: "Иду куда-нибудь — дома наедине с мыслями ещё хуже",
        scores: {
          "attachment:anxious": 1,
          "motivation:connection": 1,
          "childhood:clown": 1,
        },
      },
      {
        id: "c",
        text: "Сажусь планировать следующую неделю — хаос меня бесит",
        scores: {
          "defense:control": 1,
          "stress:fight": 1,
          "childhood:perfectionist": 1,
        },
      },
      {
        id: "d",
        text: "Пишу другу спросить как у него дела — мне легче когда забочусь о ком-то",
        scores: {
          "defense:people_pleasing": 1,
          "motivation:connection": 1,
          "childhood:rescuer": 1,
        },
      },
    ],
  },

  {
    id: "fq2",
    text: "Партнёр не отвечает на сообщение уже три часа. Твоя первая мысль?",
    options: [
      {
        id: "a",
        text: "Наверное занят, напишет когда освободится",
        scores: {
          "attachment:secure": 1,
          "childhood:perfectionist": 1,
        },
      },
      {
        id: "b",
        text: "Начинаю прокручивать в голове — может я что-то не то написал",
        scores: {
          "attachment:anxious": 1,
          "stress:freeze": 1,
          "childhood:rescuer": 1,
        },
      },
      {
        id: "c",
        text: "Ну и ладно, у меня тоже свои дела. Специально не буду писать первым",
        scores: {
          "attachment:avoidant": 1,
          "defense:control": 1,
          "childhood:rebel": 1,
        },
      },
      {
        id: "d",
        text: "Шлю мем или голосовое — может разговор зайдёт сам собой",
        scores: {
          "attachment:anxious": 1,
          "childhood:clown": 1,
          "defense:compensation": 1,
        },
      },
    ],
  },

  {
    id: "fq3",
    text: "Ты в новой компании на вечеринке. Никого не знаешь. Как себя ведёшь?",
    options: [
      {
        id: "a",
        text: "Сижу тихо, наблюдаю. Если кто-то подойдёт — поговорю",
        scores: {
          "attachment:avoidant": 1,
          "childhood:invisible": 1,
          "defense:avoidance": 1,
        },
      },
      {
        id: "b",
        text: "Начинаю шутить, рассказывать истории — через 10 минут все ржут",
        scores: {
          "childhood:clown": 1,
          "defense:compensation": 1,
          "motivation:recognition": 1,
        },
      },
      {
        id: "c",
        text: "Нахожу одного человека и начинаю нормальный разговор один на один",
        scores: {
          "attachment:secure": 1,
          "childhood:rescuer": 1,
          "motivation:connection": 1,
        },
      },
      {
        id: "d",
        text: "Стараюсь произвести впечатление — рассказываю о своих проектах",
        scores: {
          "childhood:perfectionist": 1,
          "motivation:recognition": 1,
          "defense:compensation": 1,
        },
      },
    ],
  },

  {
    id: "fq4",
    text: "Близкий друг говорит что ты его обидел. Но ты не понимаешь чем. Что делаешь?",
    options: [
      {
        id: "a",
        text: "Прошу объяснить — хочу разобраться и починить",
        scores: {
          "attachment:secure": 1,
          "childhood:rescuer": 1,
        },
      },
      {
        id: "b",
        text: "Сразу извиняюсь, даже если не понимаю за что",
        scores: {
          "attachment:anxious": 1,
          "defense:people_pleasing": 1,
          "childhood:clown": 1,
        },
      },
      {
        id: "c",
        text: "Думаю \"ну и ладно, не буду навязываться\" и отхожу",
        scores: {
          "attachment:avoidant": 1,
          "defense:avoidance": 1,
          "childhood:invisible": 1,
        },
      },
      {
        id: "d",
        text: "Начинаю анализировать что произошло — наверняка он неправильно понял",
        scores: {
          "defense:rationalization": 1,
          "stress:fight": 1,
          "childhood:perfectionist": 1,
        },
      },
    ],
  },

  {
    id: "fq5",
    text: "Тебе предлагают переехать в другой город ради крутой работы. Что останавливает больше всего?",
    options: [
      {
        id: "a",
        text: "Потеряю друзей и близких — расстояние убивает отношения",
        scores: {
          "attachment:anxious": 1,
          "motivation:connection": 1,
          "childhood:rescuer": 1,
        },
      },
      {
        id: "b",
        text: "Ничего не останавливает — новое место, новая жизнь, кайф",
        scores: {
          "attachment:avoidant": 1,
          "motivation:freedom": 1,
          "childhood:rebel": 1,
        },
      },
      {
        id: "c",
        text: "Нужно всё просчитать — сколько денег, какие перспективы, план Б",
        scores: {
          "motivation:safety": 1,
          "defense:control": 1,
          "childhood:perfectionist": 1,
        },
      },
      {
        id: "d",
        text: "Главное чтобы там оценили — если да, то еду",
        scores: {
          "motivation:recognition": 1,
          "childhood:clown": 1,
          "attachment:secure": 1,
        },
      },
    ],
  },

  // ─── Q6-10: stress response + defense mechanisms ────────────────

  {
    id: "fq6",
    text: "Дедлайн через два дня, а ты ещё даже не начинал. Что происходит?",
    options: [
      {
        id: "a",
        text: "Врубаю режим берсерка — не сплю, но делаю",
        scores: {
          "stress:fight": 1,
          "defense:compensation": 1,
          "childhood:perfectionist": 1,
        },
      },
      {
        id: "b",
        text: "Открываю ютуб и \"ещё пять минуточек\" — пока не станет совсем поздно",
        scores: {
          "stress:freeze": 1,
          "defense:avoidance": 1,
          "childhood:invisible": 1,
        },
      },
      {
        id: "c",
        text: "Прошу кого-то помочь — вместе быстрее",
        scores: {
          "stress:flight": 1,
          "attachment:anxious": 1,
          "motivation:connection": 1,
        },
      },
      {
        id: "d",
        text: "Ну, значит дедлайн сдвинется. Мир не рухнет",
        scores: {
          "stress:flight": 1,
          "defense:rationalization": 1,
          "childhood:rebel": 1,
        },
      },
    ],
  },

  {
    id: "fq7",
    text: "Начальник при всех раскритиковал твою работу. Что чувствуешь первым делом?",
    options: [
      {
        id: "a",
        text: "Злость — я столько пахал, а он при всех",
        scores: {
          "stress:fight": 1,
          "defense:compensation": 1,
          "motivation:recognition": 1,
        },
      },
      {
        id: "b",
        text: "Стыд — хочется провалиться сквозь землю",
        scores: {
          "stress:freeze": 1,
          "childhood:invisible": 1,
          "attachment:anxious": 1,
        },
      },
      {
        id: "c",
        text: "\"Окей, учту\" — а внутри уже думаю куда свалить",
        scores: {
          "stress:flight": 1,
          "defense:avoidance": 1,
          "childhood:rebel": 1,
        },
      },
      {
        id: "d",
        text: "Начинаю объяснять почему сделал именно так — мне важно чтобы поняли логику",
        scores: {
          "defense:rationalization": 1,
          "stress:fight": 1,
          "childhood:perfectionist": 1,
        },
      },
    ],
  },

  {
    id: "fq8",
    text: "Друг просит одолжить денег, но ты сам сейчас не при деньгах. Как реагируешь?",
    options: [
      {
        id: "a",
        text: "Дам, даже если самому будет туго — не могу отказать близкому",
        scores: {
          "defense:people_pleasing": 1,
          "childhood:rescuer": 1,
          "motivation:connection": 1,
        },
      },
      {
        id: "b",
        text: "Честно скажу что не могу, предложу другой вариант помощи",
        scores: {
          "attachment:secure": 1,
          "defense:rationalization": 1,
        },
      },
      {
        id: "c",
        text: "Скажу \"сейчас посмотрю\" и буду тянуть пока сам не забудет",
        scores: {
          "defense:avoidance": 1,
          "stress:freeze": 1,
          "childhood:invisible": 1,
        },
      },
      {
        id: "d",
        text: "Спрошу зачем и сколько — мне нужна полная картина",
        scores: {
          "defense:control": 1,
          "motivation:safety": 1,
          "childhood:perfectionist": 1,
        },
      },
    ],
  },

  {
    id: "fq9",
    text: "У тебя конфликт с коллегой. Он не прав, но очень уверен в себе. Что делаешь?",
    options: [
      {
        id: "a",
        text: "Собираю факты и доказываю свою точку — правда на моей стороне",
        scores: {
          "stress:fight": 1,
          "defense:rationalization": 1,
          "motivation:control": 1,
        },
      },
      {
        id: "b",
        text: "Соглашаюсь вслух, но делаю по-своему втихаря",
        scores: {
          "defense:avoidance": 1,
          "childhood:invisible": 1,
          "motivation:freedom": 1,
        },
      },
      {
        id: "c",
        text: "Уступаю — не хочу портить отношения из-за ерунды",
        scores: {
          "defense:people_pleasing": 1,
          "stress:freeze": 1,
          "childhood:clown": 1,
        },
      },
      {
        id: "d",
        text: "Эскалирую — пусть руководство решит, я не собираюсь прогибаться",
        scores: {
          "stress:fight": 1,
          "defense:control": 1,
          "childhood:rebel": 1,
        },
      },
    ],
  },

  {
    id: "fq10",
    text: "Ты сделал ошибку на работе. Пока никто не заметил. Что делаешь?",
    options: [
      {
        id: "a",
        text: "Тихо исправляю сам, пока никто не увидел",
        scores: {
          "defense:control": 1,
          "motivation:safety": 1,
          "childhood:perfectionist": 1,
        },
      },
      {
        id: "b",
        text: "Признаюсь сразу — лучше честно, чем потом вскроется",
        scores: {
          "attachment:secure": 1,
          "childhood:rescuer": 1,
        },
      },
      {
        id: "c",
        text: "Нахожу объяснение почему это не совсем ошибка",
        scores: {
          "defense:rationalization": 1,
          "stress:flight": 1,
          "childhood:rebel": 1,
        },
      },
      {
        id: "d",
        text: "Паникую внутри, но внешне делаю вид что всё ок",
        scores: {
          "stress:freeze": 1,
          "defense:avoidance": 1,
          "childhood:invisible": 1,
        },
      },
    ],
  },

  // ─── Q11-15: motivation + childhood ─────────────────────────────

  {
    id: "fq11",
    text: "Тебе предложили два проекта. Один стабильный и скучный, другой рискованный но прикольный. Что выбираешь?",
    options: [
      {
        id: "a",
        text: "Стабильный — мне нужна уверенность в завтрашнем дне",
        scores: {
          "motivation:safety": 1,
          "childhood:perfectionist": 1,
          "defense:control": 1,
        },
      },
      {
        id: "b",
        text: "Рискованный — жизнь слишком короткая для скуки",
        scores: {
          "motivation:freedom": 1,
          "childhood:rebel": 1,
          "defense:compensation": 1,
        },
      },
      {
        id: "c",
        text: "Тот где я буду больше заметен и смогу себя проявить",
        scores: {
          "motivation:recognition": 1,
          "childhood:clown": 1,
          "defense:compensation": 1,
        },
      },
      {
        id: "d",
        text: "Тот где команда лучше — мне важно с кем работать",
        scores: {
          "motivation:connection": 1,
          "childhood:rescuer": 1,
          "attachment:secure": 1,
        },
      },
    ],
  },

  {
    id: "fq12",
    text: "Что бесит тебя больше всего в людях?",
    options: [
      {
        id: "a",
        text: "Безответственность — сказал сделаю, значит сделай",
        scores: {
          "motivation:control": 1,
          "childhood:perfectionist": 1,
          "stress:fight": 1,
        },
      },
      {
        id: "b",
        text: "Фальшь — когда улыбаются в лицо, а за спиной другое",
        scores: {
          "motivation:safety": 1,
          "childhood:invisible": 1,
          "defense:avoidance": 1,
        },
      },
      {
        id: "c",
        text: "Эгоизм — когда людям плевать на других",
        scores: {
          "motivation:connection": 1,
          "childhood:rescuer": 1,
          "defense:people_pleasing": 1,
        },
      },
      {
        id: "d",
        text: "Скучность — когда человек вообще ничем не горит",
        scores: {
          "motivation:freedom": 1,
          "childhood:rebel": 1,
          "childhood:clown": 1,
        },
      },
    ],
  },

  {
    id: "fq13",
    text: "Ты наконец получил повышение. Первая мысль?",
    options: [
      {
        id: "a",
        text: "Наконец-то оценили — я столько для этого сделал",
        scores: {
          "motivation:recognition": 1,
          "childhood:perfectionist": 1,
          "defense:compensation": 1,
        },
      },
      {
        id: "b",
        text: "Надеюсь справлюсь — не хочу подвести тех кто в меня поверил",
        scores: {
          "attachment:anxious": 1,
          "childhood:rescuer": 1,
          "motivation:connection": 1,
        },
      },
      {
        id: "c",
        text: "Круто, но теперь больше ответственности — а мне и так хватало",
        scores: {
          "motivation:freedom": 1,
          "stress:flight": 1,
          "childhood:rebel": 1,
        },
      },
      {
        id: "d",
        text: "Хорошо, теперь я смогу влиять на процессы которые давно хотел поменять",
        scores: {
          "motivation:control": 1,
          "childhood:invisible": 1,
          "defense:rationalization": 1,
        },
      },
    ],
  },

  {
    id: "fq14",
    text: "Ты думаешь о своей жизни через 10 лет. Что самое важное?",
    options: [
      {
        id: "a",
        text: "Финансовая подушка и свой дом — чтобы ни от кого не зависеть",
        scores: {
          "motivation:safety": 1,
          "attachment:avoidant": 1,
          "childhood:perfectionist": 1,
        },
      },
      {
        id: "b",
        text: "Любимые люди рядом — семья, друзья, тепло",
        scores: {
          "motivation:connection": 1,
          "attachment:secure": 1,
          "childhood:rescuer": 1,
        },
      },
      {
        id: "c",
        text: "Свобода — делать что хочу, когда хочу, откуда хочу",
        scores: {
          "motivation:freedom": 1,
          "childhood:rebel": 1,
          "attachment:avoidant": 1,
        },
      },
      {
        id: "d",
        text: "Чтобы меня знали — хочу оставить след",
        scores: {
          "motivation:recognition": 1,
          "childhood:clown": 1,
          "defense:compensation": 1,
        },
      },
    ],
  },

  {
    id: "fq15",
    text: "Ты записался на курс, но через неделю стало скучно. Что делаешь?",
    options: [
      {
        id: "a",
        text: "Дохожу до конца — раз начал, надо закончить",
        scores: {
          "childhood:perfectionist": 1,
          "motivation:control": 1,
          "defense:control": 1,
        },
      },
      {
        id: "b",
        text: "Бросаю и ищу что-то поинтереснее — зачем тратить время",
        scores: {
          "childhood:rebel": 1,
          "motivation:freedom": 1,
          "stress:flight": 1,
        },
      },
      {
        id: "c",
        text: "Спрашиваю знакомых кто тоже проходит — вместе веселее",
        scores: {
          "childhood:clown": 1,
          "motivation:connection": 1,
          "attachment:anxious": 1,
        },
      },
      {
        id: "d",
        text: "Тихо перестаю заходить, но формально не отписываюсь",
        scores: {
          "childhood:invisible": 1,
          "defense:avoidance": 1,
          "stress:freeze": 1,
        },
      },
    ],
  },

  // ─── Q16-20: defense + attachment ───────────────────────────────

  {
    id: "fq16",
    text: "Ты чувствуешь что в отношениях что-то не так. Как обычно поступаешь?",
    options: [
      {
        id: "a",
        text: "Сажусь и разговариваю — проблемы сами не решаются",
        scores: {
          "attachment:secure": 1,
          "stress:fight": 1,
        },
      },
      {
        id: "b",
        text: "Начинаю больше стараться — готовлю, дарю подарки, проявляю заботу",
        scores: {
          "defense:people_pleasing": 1,
          "attachment:anxious": 1,
          "childhood:rescuer": 1,
        },
      },
      {
        id: "c",
        text: "Отдаляюсь — мне нужно побыть одному и подумать",
        scores: {
          "attachment:avoidant": 1,
          "defense:avoidance": 1,
          "stress:flight": 1,
        },
      },
      {
        id: "d",
        text: "Анализирую ситуацию — пытаюсь понять кто что сделал не так",
        scores: {
          "defense:rationalization": 1,
          "defense:control": 1,
          "childhood:perfectionist": 1,
        },
      },
    ],
  },

  {
    id: "fq17",
    text: "Тебе сделали комплимент при всех. Как реагируешь?",
    options: [
      {
        id: "a",
        text: "Принимаю спокойно, говорю спасибо",
        scores: {
          "attachment:secure": 1,
          "childhood:rescuer": 1,
        },
      },
      {
        id: "b",
        text: "Смущаюсь и перевожу тему — не люблю быть в центре внимания",
        scores: {
          "childhood:invisible": 1,
          "defense:avoidance": 1,
          "attachment:avoidant": 1,
        },
      },
      {
        id: "c",
        text: "Радуюсь, но потом думаю \"а вдруг просто из вежливости\"",
        scores: {
          "attachment:anxious": 1,
          "childhood:clown": 1,
          "stress:freeze": 1,
        },
      },
      {
        id: "d",
        text: "Приятно, но сразу думаю что могло быть и лучше",
        scores: {
          "childhood:perfectionist": 1,
          "defense:rationalization": 1,
          "motivation:recognition": 1,
        },
      },
    ],
  },

  {
    id: "fq18",
    text: "Друг отменил планы в последний момент. Третий раз за месяц. Что делаешь?",
    options: [
      {
        id: "a",
        text: "Говорю прямо что это бесит — уважай моё время",
        scores: {
          "stress:fight": 1,
          "attachment:secure": 1,
          "motivation:control": 1,
        },
      },
      {
        id: "b",
        text: "Говорю \"всё ок\" но внутри обижаюсь и запоминаю",
        scores: {
          "defense:people_pleasing": 1,
          "attachment:anxious": 1,
          "childhood:rescuer": 1,
        },
      },
      {
        id: "c",
        text: "Просто перестаю звать. Зачем что-то говорить, и так всё ясно",
        scores: {
          "attachment:avoidant": 1,
          "defense:avoidance": 1,
          "childhood:invisible": 1,
        },
      },
      {
        id: "d",
        text: "Шучу \"ну ты красава\" и не парюсь — зато свободный вечер",
        scores: {
          "childhood:clown": 1,
          "defense:rationalization": 1,
          "motivation:freedom": 1,
        },
      },
    ],
  },

  {
    id: "fq19",
    text: "Ты узнал что о тебе сплетничают за спиной. Первая реакция?",
    options: [
      {
        id: "a",
        text: "Иду разбираться напрямую — пусть скажут в лицо",
        scores: {
          "stress:fight": 1,
          "defense:control": 1,
          "childhood:rebel": 1,
        },
      },
      {
        id: "b",
        text: "Больно, но виду не подаю. Просто дистанцируюсь",
        scores: {
          "stress:freeze": 1,
          "attachment:avoidant": 1,
          "childhood:invisible": 1,
        },
      },
      {
        id: "c",
        text: "Начинаю думать что я сделал не так — может заслужил?",
        scores: {
          "attachment:anxious": 1,
          "defense:people_pleasing": 1,
          "childhood:rescuer": 1,
        },
      },
      {
        id: "d",
        text: "Мне плевать если честно — чужое мнение это их проблема",
        scores: {
          "defense:rationalization": 1,
          "motivation:freedom": 1,
          "childhood:rebel": 1,
        },
      },
    ],
  },

  {
    id: "fq20",
    text: "Тебя зовут на день рождения к человеку которого плохо знаешь. Идёшь?",
    options: [
      {
        id: "a",
        text: "Иду — люблю знакомиться с новыми людьми",
        scores: {
          "attachment:secure": 1,
          "motivation:connection": 1,
          "childhood:clown": 1,
        },
      },
      {
        id: "b",
        text: "Иду только если будут знакомые — одному некомфортно",
        scores: {
          "attachment:anxious": 1,
          "motivation:safety": 1,
          "childhood:invisible": 1,
        },
      },
      {
        id: "c",
        text: "Вежливо отказываюсь — лучше проведу время по-своему",
        scores: {
          "attachment:avoidant": 1,
          "motivation:freedom": 1,
          "defense:avoidance": 1,
        },
      },
      {
        id: "d",
        text: "Иду и несу самый крутой подарок — хочу запомниться",
        scores: {
          "defense:compensation": 1,
          "motivation:recognition": 1,
          "childhood:perfectionist": 1,
        },
      },
    ],
  },

  // ─── Q21-25: cross-validation + motivation + stress ─────────────

  {
    id: "fq21",
    text: "Ты застрял в пробке и опаздываешь на важную встречу. О чём думаешь?",
    options: [
      {
        id: "a",
        text: "Составляю план — кому позвонить, как объяснить, что перенести",
        scores: {
          "stress:fight": 1,
          "defense:control": 1,
          "motivation:control": 1,
        },
      },
      {
        id: "b",
        text: "Переживаю что обо мне подумают — ненавижу подводить людей",
        scores: {
          "stress:freeze": 1,
          "attachment:anxious": 1,
          "defense:people_pleasing": 1,
        },
      },
      {
        id: "c",
        text: "\"Ну значит так. Кто хотел — подождёт\"",
        scores: {
          "stress:flight": 1,
          "defense:rationalization": 1,
          "childhood:rebel": 1,
        },
      },
      {
        id: "d",
        text: "Включаю подкаст и стараюсь не думать — всё равно ничего не изменишь",
        scores: {
          "stress:freeze": 1,
          "defense:avoidance": 1,
          "childhood:invisible": 1,
        },
      },
    ],
  },

  {
    id: "fq22",
    text: "Ты видишь что друг делает явную ошибку — бросает работу без плана. Как реагируешь?",
    options: [
      {
        id: "a",
        text: "Сажусь с ним и помогаю составить план — нельзя так бросаться",
        scores: {
          "childhood:rescuer": 1,
          "defense:control": 1,
          "motivation:safety": 1,
        },
      },
      {
        id: "b",
        text: "Поддерживаю — его жизнь, его выбор. Главное быть рядом",
        scores: {
          "attachment:secure": 1,
          "motivation:freedom": 1,
          "childhood:clown": 1,
        },
      },
      {
        id: "c",
        text: "Говорю что думаю прямо — даже если ему не понравится",
        scores: {
          "stress:fight": 1,
          "defense:rationalization": 1,
          "childhood:perfectionist": 1,
        },
      },
      {
        id: "d",
        text: "Молча наблюдаю — он взрослый, сам разберётся",
        scores: {
          "attachment:avoidant": 1,
          "defense:avoidance": 1,
          "childhood:invisible": 1,
        },
      },
    ],
  },

  {
    id: "fq23",
    text: "Выходные. Никаких планов. Что делаешь?",
    options: [
      {
        id: "a",
        text: "Наконец-то можно заняться своими проектами без отвлекающих факторов",
        scores: {
          "motivation:control": 1,
          "childhood:perfectionist": 1,
          "attachment:avoidant": 1,
        },
      },
      {
        id: "b",
        text: "Пишу всем знакомым — кто-нибудь точно свободен",
        scores: {
          "attachment:anxious": 1,
          "motivation:connection": 1,
          "childhood:clown": 1,
        },
      },
      {
        id: "c",
        text: "Кайфую от свободы — гуляю, читаю, наслаждаюсь тишиной",
        scores: {
          "motivation:freedom": 1,
          "stress:flight": 1,
          "childhood:rebel": 1,
        },
      },
      {
        id: "d",
        text: "Звоню маме или другу узнать нужна ли помощь с чем-то",
        scores: {
          "childhood:rescuer": 1,
          "defense:people_pleasing": 1,
          "motivation:connection": 1,
        },
      },
    ],
  },

  {
    id: "fq24",
    text: "Тебя не взяли на позицию о которой ты мечтал. Как переживаешь?",
    options: [
      {
        id: "a",
        text: "Разбираю что пошло не так и готовлюсь к следующему разу",
        scores: {
          "defense:rationalization": 1,
          "childhood:perfectionist": 1,
          "motivation:recognition": 1,
        },
      },
      {
        id: "b",
        text: "Думаю \"значит не моё\" и быстро переключаюсь",
        scores: {
          "stress:flight": 1,
          "defense:avoidance": 1,
          "childhood:rebel": 1,
        },
      },
      {
        id: "c",
        text: "Долго не могу отпустить — а может я просто недостаточно хорош",
        scores: {
          "stress:freeze": 1,
          "attachment:anxious": 1,
          "childhood:invisible": 1,
        },
      },
      {
        id: "d",
        text: "Злюсь и доказываю себе что могу лучше — берусь за что-то ещё круче",
        scores: {
          "stress:fight": 1,
          "defense:compensation": 1,
          "motivation:recognition": 1,
        },
      },
    ],
  },

  {
    id: "fq25",
    text: "Кто-то в компании рассказал историю и все смеются. Но тебе не смешно. Что делаешь?",
    options: [
      {
        id: "a",
        text: "Смеюсь вместе со всеми — не хочу выделяться",
        scores: {
          "defense:people_pleasing": 1,
          "childhood:clown": 1,
          "attachment:anxious": 1,
        },
      },
      {
        id: "b",
        text: "Сижу с покер-фейсом — мне плевать что кто-то заметит",
        scores: {
          "childhood:rebel": 1,
          "attachment:avoidant": 1,
          "motivation:freedom": 1,
        },
      },
      {
        id: "c",
        text: "Улыбаюсь из вежливости, но мысли уже о другом",
        scores: {
          "childhood:invisible": 1,
          "defense:avoidance": 1,
          "motivation:safety": 1,
        },
      },
      {
        id: "d",
        text: "Рассказываю свою историю — у меня есть получше",
        scores: {
          "defense:compensation": 1,
          "motivation:recognition": 1,
          "childhood:perfectionist": 1,
        },
      },
    ],
  },
];
