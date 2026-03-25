"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnalysisAnimation } from "@/components/AnalysisAnimation";
import { ResultScreen } from "@/components/ResultScreen";
import { BlurredScreen } from "@/app/tma/components/BlurredScreen";
import { freeQuestions } from "@/data/free-questions";

/* ─── Types ─── */

interface FreeProfileResult {
  pattern: {
    id: string;
    name: string;
    childhood: string;
    defense: string;
    description: string;
  };
  modifier: string;
  scores: object;
  topAttachment: string;
  topStress: string;
  topMotivation: string;
  topDefense: string;
  topChildhood: string;
  contradictions: string[];
  percentile: number;
}

interface FreeProfileResponse {
  recognition: string;
  predictions: string;
  origin: string;
  superpower: string;
  shadow: string;
  actions: string[];
  aiProfile: string;
  lockedPreviews: string[];
}

type Screen =
  | "analysis"
  | "pattern"
  | "recognition"
  | "prediction"
  | "origin"
  | "duality"
  | "actions"
  | "ai_export"
  | "share";

/* ─── Inline components ─── */

function TypingText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <p className={className}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </p>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 bg-[#f97316] text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:brightness-110 transition cursor-pointer"
    >
      {copied ? "✓ Скопировано" : "Скопировать"}
    </button>
  );
}

/* ─── Screen transition variants ─── */

const screenVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

/* ─── Screens order ─── */

const screens: Screen[] = [
  "analysis",
  "pattern",
  "recognition",
  "prediction",
  "origin",
  "duality",
  "actions",
  "ai_export",
  "share",
];

// Screens 1-3 are free (indices 1, 2, 3 = pattern, recognition, prediction)
// Screens 4-9 are locked (indices 4+ = origin, duality, actions, ai_export, share)
const LOCKED_FROM_INDEX = 4;

/* ─── Main page ─── */

export default function TmaFreeResultPage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("analysis");
  const [freeProfile, setFreeProfile] = useState<FreeProfileResult | null>(null);
  const [profileData, setProfileData] = useState<FreeProfileResponse | null>(null);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [apiDone, setApiDone] = useState(false);

  /* ─── On mount: load profile + call API ─── */

  useEffect(() => {
    const saved = localStorage.getItem("psyche_free_profile");
    if (!saved) {
      window.location.href = "/tma";
      return;
    }

    const profile = JSON.parse(saved) as FreeProfileResult;
    setFreeProfile(profile);

    // Build answer texts for Claude
    const savedAnswers = localStorage.getItem("psyche_free_answers");
    const rawAnswers = savedAnswers ? JSON.parse(savedAnswers) : {};
    const answerTexts: { question: string; answer: string }[] = [];
    for (const q of freeQuestions) {
      const optionId = rawAnswers[q.id];
      if (optionId) {
        const opt = q.options.find((o) => o.id === optionId);
        if (opt) answerTexts.push({ question: q.text, answer: opt.text });
      }
    }

    fetch("/api/generate-free-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile, answerTexts }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && data.recognition) {
          setProfileData(data);
        } else {
          throw new Error("Invalid API response");
        }
        setApiDone(true);
      })
      .catch(() => {
        // Fallback data
        setProfileData({
          recognition: `Ты ${profile.pattern.description.toLowerCase()}. Это проявляется в повседневных ситуациях — от работы до отношений.\n\nТвой главный паттерн — ${profile.pattern.name}. Он определяет как ты принимаешь решения, как реагируешь на стресс, и почему некоторые ситуации вызывают у тебя сильные эмоции.\n\nЭтот паттерн не плохой и не хороший — это твой способ справляться с миром. Вопрос в том, работает ли он на тебя или против тебя.`,
          predictions: `Ты наверняка замечал за собой: в стрессовых ситуациях ты действуешь на автомате. Не потому что выбираешь — а потому что паттерн включается быстрее чем ты успеваешь подумать.`,
          origin: `Этот паттерн обычно формируется в детстве как способ адаптации. Когда-то это было лучшим решением из доступных. Проблема в том, что он продолжает работать даже когда обстоятельства давно изменились.`,
          superpower: `Твой паттерн даёт тебе уникальные сильные стороны которые другие люди не имеют. Используй их осознанно.`,
          shadow: `Обратная сторона — в моменты стресса паттерн берёт управление и ты действуешь реактивно, а не осознанно.`,
          actions: [
            "На этой неделе поймай момент когда паттерн включается. Не меняй ничего — просто заметь. Это первый шаг.",
            "Запиши три ситуации за неделю когда ты действовал на автомате. Что произошло? Что ты почувствовал?",
          ],
          aiProfile: `Мой психопрофиль (Psyche Scan):\nПаттерн: ${profile.pattern.name} (${profile.modifier})\n\nКак со мной общаться:\n- Будь конкретным и прямым\n- Не используй абстрактные советы\n\nЧто меня триггерит:\n- Неопределённость\n- Обесценивание усилий`,
          lockedPreviews: ["Стиль привязанности", "Реакция под давлением", "Скрытая мотивация"],
        });
        setApiDone(true);
      });
  }, []);

  /* ─── Auto-advance from analysis when both done ─── */

  useEffect(() => {
    if (analysisDone && apiDone && currentScreen === "analysis") {
      setCurrentScreen("pattern");
    }
  }, [analysisDone, apiDone, currentScreen]);

  /* ─── Navigation ─── */

  const goNext = useCallback(() => {
    const idx = screens.indexOf(currentScreen);
    if (idx < screens.length - 1) {
      setCurrentScreen(screens[idx + 1]);
    }
  }, [currentScreen]);

  /* ─── Share helpers ─── */

  const handleShare = async () => {
    const text = `Мой паттерн: ${freeProfile?.pattern.name} — ${freeProfile?.modifier}. Пройди тоже: https://t.me/psychescan_bot`;
    if (navigator.share) {
      await navigator.share({
        title: "Psyche Scan",
        text,
      });
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  /* ─── Loading guard ─── */

  if (!freeProfile) {
    return <div className="min-h-dvh bg-[#050505]" />;
  }

  /* ─── Helper: is this screen locked? ─── */

  const currentIdx = screens.indexOf(currentScreen);
  const isLocked = currentIdx >= LOCKED_FROM_INDEX;
  // Screen number shown to user (skipping "analysis" screen 0)
  const userScreenNumber = currentIdx; // pattern=1, recognition=2, ...

  /* ─── Render screens ─── */

  const renderScreenContent = () => {
    // Spinner if API not ready
    if (currentScreen !== "analysis" && !profileData) {
      return (
        <motion.div
          key="loading"
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-dvh bg-[#050505] flex items-center justify-center"
        >
          <div className="w-8 h-8 border-2 border-[#f97316] border-t-transparent rounded-full animate-spin" />
        </motion.div>
      );
    }

    switch (currentScreen) {
      /* Screen 0: Analysis animation */
      case "analysis":
        return (
          <motion.div
            key="analysis"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <AnalysisAnimation onComplete={() => setAnalysisDone(true)} />
          </motion.div>
        );

      /* Screen 1: Pattern reveal — FREE */
      case "pattern":
        return (
          <motion.div
            key="pattern"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ResultScreen onNext={goNext}>
              <div className="text-center">
                <motion.h1
                  className="font-serif text-5xl sm:text-7xl text-white"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.65, 0.05, 0, 1] }}
                >
                  {freeProfile.pattern.name}
                </motion.h1>
                <motion.p
                  className="font-serif italic text-xl text-white/50 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  ...{freeProfile.modifier}
                </motion.p>
                <motion.p
                  className="font-mono text-sm text-[#f97316] mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  {freeProfile.percentile}% людей получают этот результат
                </motion.p>
              </div>
            </ResultScreen>
          </motion.div>
        );

      /* Screen 2: Recognition — FREE */
      case "recognition":
        return (
          <motion.div
            key="recognition"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ResultScreen onNext={goNext}>
              <h2 className="font-serif text-2xl text-white mb-8">
                Вот что ты делаешь
              </h2>
              {profileData!.recognition.split("\n\n").map((paragraph, i) => (
                <motion.p
                  key={i}
                  className="text-lg text-white/80 leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.8, duration: 0.6 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </ResultScreen>
          </motion.div>
        );

      /* Screen 3: Prediction — FREE */
      case "prediction":
        return (
          <motion.div
            key="prediction"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ResultScreen onNext={goNext}>
              <div className="border border-[#f97316]/30 rounded-2xl p-8 bg-[#f97316]/5">
                <p className="font-mono text-sm text-[#f97316] mb-6">
                  Мы готовы поспорить:
                </p>
                <TypingText
                  text={profileData!.predictions}
                  className="text-lg text-white leading-relaxed"
                />
              </div>
            </ResultScreen>
          </motion.div>
        );

      /* Screen 4: Origin — LOCKED */
      case "origin":
        return (
          <motion.div
            key="origin"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ResultScreen onNext={goNext}>
              <BlurredScreen screenNumber={userScreenNumber}>
                <div>
                  <h2 className="font-serif text-2xl text-white mb-8">
                    Откуда это в тебе
                  </h2>
                  <p className="text-lg text-white/80 leading-relaxed">
                    {profileData!.origin}
                  </p>
                </div>
              </BlurredScreen>
            </ResultScreen>
          </motion.div>
        );

      /* Screen 5: Duality — LOCKED */
      case "duality":
        return (
          <motion.div
            key="duality"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ResultScreen onNext={goNext}>
              <BlurredScreen screenNumber={userScreenNumber}>
                <div>
                  <h2 className="font-serif text-2xl text-white mb-8 text-center">
                    Две стороны
                  </h2>
                  <div className="grid gap-6">
                    <div className="border border-[#f97316]/30 rounded-xl p-6 bg-[#f97316]/5">
                      <p className="font-mono text-sm text-[#f97316] mb-3">⚡ Суперсила</p>
                      <p className="text-white/80 leading-relaxed">{profileData!.superpower}</p>
                    </div>
                    <div className="border border-white/10 rounded-xl p-6 bg-white/5">
                      <p className="font-mono text-sm text-white/40 mb-3">🌑 Слепая зона</p>
                      <p className="text-white/80 leading-relaxed">{profileData!.shadow}</p>
                    </div>
                  </div>
                </div>
              </BlurredScreen>
            </ResultScreen>
          </motion.div>
        );

      /* Screen 6: Actions — LOCKED */
      case "actions":
        return (
          <motion.div
            key="actions"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ResultScreen onNext={goNext}>
              <BlurredScreen screenNumber={userScreenNumber}>
                <div>
                  <h2 className="font-serif text-2xl text-white mb-8">
                    Попробуй на этой неделе
                  </h2>
                  <div className="space-y-4">
                    {profileData!.actions.map((action, i) => (
                      <div
                        key={i}
                        className="border border-white/10 rounded-xl p-5 bg-white/5"
                      >
                        <span className="font-mono text-sm text-[#f97316] mr-2">{i + 1}.</span>
                        <span className="text-white/80 leading-relaxed">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </BlurredScreen>
            </ResultScreen>
          </motion.div>
        );

      /* Screen 7: AI Export — LOCKED */
      case "ai_export":
        return (
          <motion.div
            key="ai_export"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ResultScreen onNext={goNext}>
              <BlurredScreen screenNumber={userScreenNumber}>
                <div>
                  <h2 className="font-serif text-2xl text-white mb-4">
                    Скорми в нейросеть
                  </h2>
                  <p className="text-white/50 mb-6">
                    Скопируй и вставь в ChatGPT или Claude
                  </p>
                  <div className="relative bg-white/5 border border-white/10 rounded-xl p-5 font-mono text-sm text-white/70 leading-relaxed whitespace-pre-wrap">
                    {profileData!.aiProfile}
                    <CopyButton text={profileData!.aiProfile} />
                  </div>
                </div>
              </BlurredScreen>
            </ResultScreen>
          </motion.div>
        );

      /* Screen 8: Share — always visible */
      case "share":
        return (
          <motion.div
            key="share"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ResultScreen>
              <div className="text-center">
                <h2 className="font-serif text-2xl text-white mb-4">
                  Готово!
                </h2>
                <p className="text-white/50 mb-8 text-sm">
                  Паттерн: {freeProfile.pattern.name} — {freeProfile.modifier}
                </p>

                {/* Share buttons */}
                <div className="flex flex-col gap-3">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleShare}
                    className="w-full bg-[#f97316] text-white font-semibold py-4 rounded-2xl cursor-pointer hover:brightness-110 transition-all"
                  >
                    Поделиться результатом
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleShare}
                    className="w-full bg-white/10 border border-white/20 text-white font-medium py-4 rounded-2xl cursor-pointer hover:bg-white/15 transition-all"
                  >
                    Поделиться в Stories
                  </motion.button>
                </div>

                <p className="text-white/30 text-xs mt-6">
                  Интересно — совпадёт ли у друга?
                </p>
              </div>
            </ResultScreen>
          </motion.div>
        );
    }
  };

  // Suppress unused variable warning — isLocked is used conceptually via LOCKED_FROM_INDEX
  void isLocked;

  return (
    <div className="min-h-dvh bg-[#050505]">
      <AnimatePresence mode="wait">{renderScreenContent()}</AnimatePresence>
    </div>
  );
}
