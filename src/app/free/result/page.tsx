/**
 * FREE LEAD MAGNET — Result page (9 sequential screens)
 * Route: /free/result
 * Calls /api/generate-free-profile for AI-powered results
 * Upsell links to /scan (full paid scan)
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnalysisAnimation } from "@/components/AnalysisAnimation";
import { ResultScreen } from "@/components/ResultScreen";
import { ShareCard } from "@/components/ShareCard";
import { freeQuestions } from "@/data/free-questions";
import { useUser, saveProfileToDb } from "@/lib/useUser";

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
  | "locked"
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
      className="absolute top-3 right-3 bg-[#D2FF00] text-black text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-[#D2FF00]/80 transition cursor-pointer"
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

/* ─── Main page ─── */

const screens: Screen[] = [
  "analysis",
  "pattern",
  "recognition",
  "prediction",
  "origin",
  "duality",
  "actions",
  "ai_export",
  "locked",
  "share",
];

export default function FreeResultPage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("analysis");
  const [freeProfile, setFreeProfile] = useState<FreeProfileResult | null>(
    null
  );
  const [profileData, setProfileData] = useState<FreeProfileResponse | null>(
    null
  );
  const [analysisDone, setAnalysisDone] = useState(false);
  const [apiDone, setApiDone] = useState(false);
  const userId = useUser();

  /* ─── On mount: load profile + call API ─── */

  useEffect(() => {
    const saved = localStorage.getItem("psyche_free_profile");
    if (!saved) {
      window.location.href = "/free";
      return;
    }

    const profile = JSON.parse(saved) as FreeProfileResult;
    setFreeProfile(profile);

    // Build answer texts for Claude (not just IDs)
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
          // Save to Neon in background
          const uid = localStorage.getItem("psyche_user_id");
          if (uid) {
            saveProfileToDb(uid, "free", { scoring: profile, aiResult: data });
          }
        } else {
          throw new Error("Invalid API response");
        }
        setApiDone(true);
      })
      .catch((err) => {
        console.error("API error:", err);
        // Fallback data so the user still gets a result
        setProfileData({
          recognition: `Ты ${profile.pattern.description.toLowerCase()}. Это проявляется в повседневных ситуациях — от работы до отношений.\n\nТвой главный паттерн — ${profile.pattern.name}. Он определяет как ты принимаешь решения, как реагируешь на стресс, и почему некоторые ситуации вызывают у тебя сильные эмоции.\n\nЭтот паттерн не плохой и не хороший — это твой способ справляться с миром. Вопрос в том, работает ли он на тебя или против тебя.`,
          predictions: `Ты наверняка замечал за собой: в стрессовых ситуациях ты действуешь на автомате. Не потому что выбираешь — а потому что паттерн включается быстрее чем ты успеваешь подумать.`,
          origin: `Этот паттерн обычно формируется в детстве как способ адаптации. Когда-то это было лучшим решением из доступных. Проблема в том, что он продолжает работать даже когда обстоятельства давно изменились.`,
          superpower: `Твой паттерн даёт тебе уникальные сильные стороны которые другие люди не имеют. Используй их осознанно.`,
          shadow: `Обратная сторона — в моменты стресса паттерн берёт управление и ты действуешь реактивно, а не осознанно.`,
          actions: [
            "На этой неделе поймай момент когда паттерн включается. Не меняй ничего — просто заметь. Это первый шаг.",
            "Запиши три ситуации за неделю когда ты действовал на автомате. Что произошло? Что ты почувствовал?"
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

  /* ─── PDF download ─── */

  const [pdfLoading, setPdfLoading] = useState(false);

  const handleDownloadPdf = async () => {
    if (!freeProfile || !profileData) return;
    setPdfLoading(true);
    try {
      const res = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scoring: freeProfile, aiResult: profileData }),
      });
      if (!res.ok) throw new Error("PDF generation failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `psyche-scan-${freeProfile.pattern.name}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF download error:", err);
    } finally {
      setPdfLoading(false);
    }
  };

  /* ─── Share helpers ─── */

  const handleDownload = async () => {
    const el = document.getElementById("share-card");
    if (!el) return;
    const html2canvas = (await import("html2canvas-pro")).default;
    const canvas = await html2canvas(el, { backgroundColor: "#0A0A0A" });
    const link = document.createElement("a");
    link.download = "psyche-scan-result.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleShare = async () => {
    const text = `Мой паттерн: ${freeProfile?.pattern.name} — ${freeProfile?.modifier}. Пройди тоже: ${window.location.origin}/free`;
    if (navigator.share) {
      await navigator.share({
        title: "Psyche Scan",
        text,
        url: `${window.location.origin}/free`,
      });
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  /* ─── Loading guard ─── */

  if (!freeProfile) {
    return <div className="min-h-dvh bg-[#0A0A0A]" />;
  }

  /* ─── Render screens ─── */

  const renderScreen = () => {
    // If we're past analysis and API hasn't returned yet, show spinner
    if (currentScreen !== "analysis" && !profileData) {
      return (
        <motion.div
          key="loading"
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-dvh bg-[#0A0A0A] flex items-center justify-center"
        >
          <div className="w-8 h-8 border-2 border-[#D2FF00] border-t-transparent rounded-full animate-spin" />
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
            <AnalysisAnimation
              onComplete={() => setAnalysisDone(true)}
            />
          </motion.div>
        );

      /* Screen 1: The Big Reveal */
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
                  className="font-serif text-5xl sm:text-7xl md:text-8xl text-white"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.65, 0.05, 0, 1] }}
                >
                  {freeProfile.pattern.name}
                </motion.h1>
                <motion.p
                  className="font-serif italic text-xl md:text-2xl text-white/50 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  ...{freeProfile.modifier}
                </motion.p>
                <motion.p
                  className="font-mono text-sm text-[#D2FF00] mt-8"
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

      /* Screen 2: Recognition */
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
              <h2 className="font-serif text-2xl md:text-3xl text-white mb-8">
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

      /* Screen 3: Prediction — the screenshot moment */
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
              <div className="border border-[#D2FF00]/30 rounded-2xl p-8 bg-[#D2FF00]/5">
                <p className="font-mono text-sm text-[#D2FF00] mb-6">
                  Мы готовы поспорить:
                </p>
                <TypingText
                  text={profileData!.predictions}
                  className="text-lg md:text-xl text-white leading-relaxed"
                />
              </div>
            </ResultScreen>
          </motion.div>
        );

      /* Screen 4: Origin */
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
              <h2 className="font-serif text-2xl md:text-3xl text-white mb-8">
                Откуда это в тебе
              </h2>
              <motion.p
                className="text-lg text-white/80 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {profileData!.origin}
              </motion.p>
            </ResultScreen>
          </motion.div>
        );

      /* Screen 5: Duality — superpower + shadow */
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
              <h2 className="font-serif text-2xl md:text-3xl text-white mb-8 text-center">
                Две стороны
              </h2>
              <div className="grid gap-6">
                <motion.div
                  className="border border-[#D2FF00]/30 rounded-xl p-6 bg-[#D2FF00]/5"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="font-mono text-sm text-[#D2FF00] mb-3">
                    ⚡ Суперсила
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    {profileData!.superpower}
                  </p>
                </motion.div>

                <motion.div
                  className="border border-white/10 rounded-xl p-6 bg-white/5"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                >
                  <p className="font-mono text-sm text-white/40 mb-3">
                    🌑 Слепая зона
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    {profileData!.shadow}
                  </p>
                </motion.div>
              </div>
            </ResultScreen>
          </motion.div>
        );

      /* Screen 6: Actions */
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
              <h2 className="font-serif text-2xl md:text-3xl text-white mb-8">
                Попробуй на этой неделе
              </h2>
              <div className="space-y-4">
                {profileData!.actions.map((action, i) => (
                  <motion.div
                    key={i}
                    className="border border-white/10 rounded-xl p-5 bg-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.3, duration: 0.5 }}
                  >
                    <span className="font-mono text-sm text-[#D2FF00] mr-2">
                      {i + 1}.
                    </span>
                    <span className="text-white/80 leading-relaxed">
                      {action}
                    </span>
                  </motion.div>
                ))}
              </div>
            </ResultScreen>
          </motion.div>
        );

      /* Screen 7: AI Export */
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
              <h2 className="font-serif text-2xl md:text-3xl text-white mb-4">
                Скорми в нейросеть
              </h2>
              <p className="text-white/50 mb-6">
                Скопируй и вставь в ChatGPT, Claude или любой AI — он сразу
                будет понимать как с тобой общаться
              </p>
              <div className="relative bg-white/5 border border-white/10 rounded-xl p-5 font-mono text-sm text-white/70 leading-relaxed whitespace-pre-wrap">
                {profileData!.aiProfile}
                <CopyButton text={profileData!.aiProfile} />
              </div>
            </ResultScreen>
          </motion.div>
        );

      /* Screen 8: Locked upsell */
      case "locked":
        return (
          <motion.div
            key="locked"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ResultScreen onNext={goNext} nextLabel="Поделиться результатом">
              <h2 className="font-serif text-2xl md:text-3xl text-white mb-8 text-center">
                Мы знаем о тебе ещё кое-что
              </h2>
              <div className="space-y-4">
                {[
                  {
                    label: "Твой стиль привязанности",
                    sub: "Как ты строишь и разрушаешь отношения",
                  },
                  {
                    label: "Твоя реакция под давлением",
                    sub: "Что ты делаешь когда мир рушится",
                  },
                  {
                    label: "Скрытая мотивация",
                    sub: "Почему ты на самом деле делаешь то что делаешь",
                  },
                  {
                    label: "30-дневный план",
                    sub: "Конкретные практики каждый день",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="border border-white/10 rounded-xl p-5 bg-white/5 relative overflow-hidden"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-white/30">🔒</span>
                      <div>
                        <p className="text-white/80">
                          {item.label}:{" "}
                          <span className="bg-white/10 rounded px-2 py-0.5 text-white/20 font-mono text-sm">
                            ████████
                          </span>
                        </p>
                        <p className="text-white/30 text-sm mt-1">
                          {item.sub}
                        </p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
                      <div
                        className="h-full bg-[#D2FF00]/20 blur-sm"
                        style={{ width: `${60 + i * 10}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.a
                href="/scan"
                className="block mt-8 text-center bg-[#D2FF00] text-black font-medium px-8 py-4 rounded-xl hover:bg-[#D2FF00]/90 transition text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Пройти полное сканирование →
              </motion.a>
            </ResultScreen>
          </motion.div>
        );

      /* Screen 9: Share */
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
              <h2 className="font-serif text-2xl md:text-3xl text-white mb-8 text-center">
                Поделись с другом
              </h2>
              <ShareCard
                patternName={freeProfile.pattern.name}
                modifier={freeProfile.modifier}
                keyQuote={
                  profileData!.recognition.split("\n\n")[0]?.slice(0, 120) +
                  "..."
                }
                percentile={freeProfile.percentile}
                onDownload={handleDownload}
                onShare={handleShare}
              />
              {/* PDF download */}
              <button
                onClick={handleDownloadPdf}
                disabled={pdfLoading}
                className="w-full mt-6 bg-white/5 border border-white/10 text-white font-medium px-6 py-3.5 rounded-xl hover:bg-white/10 transition cursor-pointer disabled:opacity-50"
              >
                {pdfLoading ? "Генерирую PDF..." : "Скачать PDF-отчёт (8 страниц)"}
              </button>

              <p className="text-white/40 text-center mt-6 text-sm">
                Интересно — совпадёт ли?
              </p>
              <a
                href="/free"
                className="block text-center text-[#D2FF00] mt-4 text-sm hover:underline"
              >
                Пройти ещё раз
              </a>
            </ResultScreen>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-dvh bg-[#0A0A0A]">
      <AnimatePresence mode="wait">{renderScreen()}</AnimatePresence>
    </div>
  );
}
