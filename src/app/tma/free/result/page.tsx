"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TmaAnalysisAnimation } from "@/app/tma/components/TmaAnalysisAnimation";
import { ShareCardTma } from "@/app/tma/components/ShareCardTma";
import { freeQuestions } from "@/data/free-questions";

/* ─── TMA screen wrapper ─── */

function TmaScreen({
  children,
  onNext,
  nextLabel = "Дальше",
}: {
  children: React.ReactNode;
  onNext?: () => void;
  nextLabel?: string;
}) {
  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-6 pb-24"
      style={{ background: "#0D0A1E" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.65, 0.05, 0, 1] }}
        className="max-w-lg w-full"
      >
        {children}
      </motion.div>

      {onNext && (
        <button
          onClick={onNext}
          className="fixed bottom-8 font-medium px-8 py-3 rounded-xl transition cursor-pointer"
          style={{
            background: "#7C3AED",
            color: "rgba(255,255,255,0.92)",
            fontSize: 15,
          }}
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}

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

// TMA flow: all screens free — no paywall on free test
type Screen = "analysis" | "pattern" | "recognition" | "prediction" | "origin" | "duality" | "actions" | "ai_export" | "share";

/* ─── TypingText with fading cursor ─── */

function TypingText({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [done, setDone] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setDone(true);
      }
    }, 25);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  // Fade cursor out 1s after typing finishes
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setCursorVisible(false), 1000);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <p className={className} style={style}>
      {displayedText}
      <motion.span
        animate={{ opacity: cursorVisible ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        |
      </motion.span>
    </p>
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

/* ─── Main page ─── */

export default function TmaFreeResultPage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("analysis");
  const [freeProfile, setFreeProfile] = useState<FreeProfileResult | null>(null);
  const [profileData, setProfileData] = useState<FreeProfileResponse | null>(null);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [apiDone, setApiDone] = useState(false);
  const [showPatternBlackout, setShowPatternBlackout] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  /* ─── On mount: load profile + call API ─── */

  useEffect(() => {
    const saved = localStorage.getItem("psyche_free_profile");
    if (!saved) {
      window.location.href = "/tma";
      return;
    }

    const profile = JSON.parse(saved) as FreeProfileResult;
    setFreeProfile(profile);

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
      // Brief blackout before pattern reveal
      setShowPatternBlackout(true);
      const t = setTimeout(() => {
        setShowPatternBlackout(false);
        setCurrentScreen("pattern");
      }, 500);
      return () => clearTimeout(t);
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

  const handleShareStories = async () => {
    if (!shareCardRef.current) return;
    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], "psyche-scan.png", { type: "image/png" });
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "Psyche Scan",
          });
        } else {
          // Fallback: download
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "psyche-scan.png";
          a.click();
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    } catch (err) {
      console.error("Share error", err);
    }
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText("t.me/scanyourbrainbot");
  };

  /* ─── Loading guard ─── */

  if (!freeProfile) {
    return <div className="min-h-dvh" style={{ background: "#0D0A1E" }} />;
  }

  /* ─── Render screens ─── */

  const renderScreenContent = () => {
    // Brief blackout between analysis and pattern
    if (showPatternBlackout) {
      return (
        <motion.div
          key="blackout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="min-h-dvh"
          style={{ background: "#000000" }}
        />
      );
    }

    // Spinner if API not ready
    if (currentScreen !== "analysis" && !profileData) {
      return (
        <motion.div
          key="loading"
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-dvh flex items-center justify-center"
          style={{ background: "#0D0A1E" }}
        >
          <div
            className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: "#7C3AED", borderTopColor: "transparent" }}
          />
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
            <TmaAnalysisAnimation onComplete={() => setAnalysisDone(true)} />
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
            <TmaScreen onNext={goNext}>
              <div className="text-center relative">
                {/* Violet radial glow behind text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="w-64 h-64 rounded-full blur-3xl"
                    style={{ background: "rgba(124,58,237,0.10)" }}
                  />
                </div>

                <motion.h1
                  className="font-serif text-5xl sm:text-7xl"
                  style={{ color: "rgba(255,255,255,0.92)" }}
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {freeProfile.pattern.name}
                </motion.h1>

                <motion.p
                  className="font-serif italic text-xl mt-4"
                  style={{ color: "rgba(255,255,255,0.50)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  ...{freeProfile.modifier}
                </motion.p>

                <motion.p
                  className="font-mono text-sm mt-8"
                  style={{ color: "#A78BFA" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  {freeProfile.percentile}% людей получают этот результат
                </motion.p>
              </div>
            </TmaScreen>
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
            <TmaScreen onNext={goNext}>
              <h2 className="font-serif text-2xl mb-8" style={{ color: "rgba(255,255,255,0.92)" }}>
                Вот что ты делаешь
              </h2>
              {profileData!.recognition.split("\n\n").map((paragraph, i) => (
                <motion.p
                  key={i}
                  className="text-lg leading-relaxed mb-6"
                  style={{ color: "rgba(255,255,255,0.80)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.8, duration: 0.6 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </TmaScreen>
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
            <TmaScreen onNext={goNext}>
              <div
                className="border rounded-2xl p-8"
                style={{
                  borderColor: "rgba(124,58,237,0.30)",
                  background: "rgba(124,58,237,0.05)",
                }}
              >
                <p className="font-mono text-sm mb-6" style={{ color: "#A78BFA" }}>
                  Мы готовы поспорить:
                </p>
                <TypingText
                  text={profileData!.predictions}
                  className="text-lg leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.92)" } as React.CSSProperties}
                />
              </div>
            </TmaScreen>
          </motion.div>
        );

      /* Screen 4: Origin — FREE */
      case "origin":
        return (
          <motion.div key="origin" variants={screenVariants} initial="initial" animate="animate" exit="exit">
            <TmaScreen onNext={goNext}>
              <h2 className="font-serif text-2xl mb-8" style={{ color: "rgba(255,255,255,0.92)" }}>
                Откуда это в тебе
              </h2>
              <motion.p
                className="text-lg leading-relaxed"
                style={{ color: "rgba(255,255,255,0.80)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {profileData!.origin}
              </motion.p>
            </TmaScreen>
          </motion.div>
        );

      /* Screen 5: Duality — superpower + shadow — FREE */
      case "duality":
        return (
          <motion.div key="duality" variants={screenVariants} initial="initial" animate="animate" exit="exit">
            <TmaScreen onNext={goNext}>
              <h2 className="font-serif text-2xl mb-8 text-center" style={{ color: "rgba(255,255,255,0.92)" }}>
                Две стороны
              </h2>
              <div className="grid gap-5">
                <motion.div
                  className="rounded-xl p-5"
                  style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.25)" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="font-mono text-sm mb-2" style={{ color: "#A78BFA" }}>⚡ Суперсила</p>
                  <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.80)" }}>{profileData!.superpower}</p>
                </motion.div>
                <motion.div
                  className="rounded-xl p-5"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <p className="font-mono text-sm mb-2" style={{ color: "rgba(255,255,255,0.40)" }}>🌑 Слепая зона</p>
                  <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.80)" }}>{profileData!.shadow}</p>
                </motion.div>
              </div>
            </TmaScreen>
          </motion.div>
        );

      /* Screen 6: Actions — FREE */
      case "actions":
        return (
          <motion.div key="actions" variants={screenVariants} initial="initial" animate="animate" exit="exit">
            <TmaScreen onNext={goNext}>
              <h2 className="font-serif text-2xl mb-8" style={{ color: "rgba(255,255,255,0.92)" }}>
                Попробуй на этой неделе
              </h2>
              <div className="space-y-4">
                {profileData!.actions.map((action, i) => (
                  <motion.div
                    key={i}
                    className="rounded-xl p-5"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.3, duration: 0.5 }}
                  >
                    <span className="font-mono text-sm mr-2" style={{ color: "#A78BFA" }}>{i + 1}.</span>
                    <span className="leading-relaxed" style={{ color: "rgba(255,255,255,0.80)" }}>{action}</span>
                  </motion.div>
                ))}
              </div>
            </TmaScreen>
          </motion.div>
        );

      /* Screen 7: AI Export — FREE */
      case "ai_export":
        return (
          <motion.div key="ai_export" variants={screenVariants} initial="initial" animate="animate" exit="exit">
            <TmaScreen onNext={goNext}>
              <h2 className="font-serif text-2xl mb-4" style={{ color: "rgba(255,255,255,0.92)" }}>
                Скорми в нейросеть
              </h2>
              <p className="mb-6" style={{ color: "rgba(255,255,255,0.50)", fontSize: 14 }}>
                Скопируй и вставь в ChatGPT или Claude — он сразу будет понимать как с тобой общаться
              </p>
              <div className="relative rounded-xl p-5 font-mono text-sm leading-relaxed whitespace-pre-wrap" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.70)" }}>
                {profileData!.aiProfile}
                <button
                  onClick={async () => { await navigator.clipboard.writeText(profileData!.aiProfile); }}
                  className="absolute top-3 right-3 text-xs font-medium px-3 py-1.5 rounded-lg cursor-pointer transition"
                  style={{ background: "#7C3AED", color: "white" }}
                >
                  Скопировать
                </button>
              </div>
            </TmaScreen>
          </motion.div>
        );

      /* Screen 8: Share */
      case "share":
        return (
          <motion.div
            key="share"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div
              className="min-h-dvh flex flex-col items-center justify-center px-6 py-10"
              style={{ background: "#0D0A1E" }}
            >
              {/* Share card preview */}
              <div ref={shareCardRef} className="mb-8">
                <ShareCardTma
                  patternName={freeProfile.pattern.name}
                  modifier={freeProfile.modifier}
                  recognitionText={
                    profileData
                      ? profileData.recognition.split("\n\n")[0]
                      : freeProfile.pattern.description
                  }
                  percentile={freeProfile.percentile}
                />
              </div>

              {/* Buttons */}
              <div className="w-full max-w-xs flex flex-col gap-3">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleShareStories}
                  className="w-full font-semibold py-4 rounded-2xl cursor-pointer transition-all"
                  style={{
                    background: "#7C3AED",
                    color: "rgba(255,255,255,0.92)",
                    fontSize: 16,
                  }}
                >
                  Поделиться в Stories
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCopyLink}
                  className="w-full font-medium py-4 rounded-2xl cursor-pointer transition-all"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.92)",
                    fontSize: 16,
                  }}
                >
                  Скопировать ссылку
                </motion.button>
              </div>

              <p className="mt-6 text-xs" style={{ color: "rgba(255,255,255,0.30)" }}>
                Интересно — совпадёт ли у друга?
              </p>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-dvh" style={{ background: "#0D0A1E" }}>
      <AnimatePresence mode="wait">{renderScreenContent()}</AnimatePresence>
    </div>
  );
}
