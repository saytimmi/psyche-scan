"use client";

import { motion } from "framer-motion";

interface ShareCardProps {
  patternName: string;
  modifier: string;
  keyQuote: string;
  percentile: number;
  onDownload: () => void;
  onShare: () => void;
}

export function ShareCard({
  patternName,
  modifier,
  keyQuote,
  percentile,
  onDownload,
  onShare,
}: ShareCardProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `PSYCHE SCAN — ${patternName}`,
          url: "https://psyche-scan.vercel.app",
        });
      } catch {
        // User cancelled or share failed — fall back to clipboard
        await navigator.clipboard.writeText("https://psyche-scan.vercel.app");
      }
    } else {
      await navigator.clipboard.writeText("https://psyche-scan.vercel.app");
    }
    onShare();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Card for screenshot capture */}
      <motion.div
        id="share-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.65, 0.05, 0, 1] }}
        className="w-full max-w-sm mx-auto aspect-[9/16] bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden p-8 flex flex-col justify-between"
      >
        {/* Top */}
        <p className="font-mono text-xs tracking-[0.3em] text-[#D2FF00]">
          PSYCHE SCAN
        </p>

        {/* Center */}
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="font-display text-3xl text-white">{patternName}</h2>
            <p className="font-display italic text-lg text-white/50 mt-1">
              {modifier}
            </p>
          </div>
          <p className="text-base text-white/70 italic line-clamp-3">
            &ldquo;{keyQuote}&rdquo;
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-1">
          <p className="font-mono text-sm text-[#D2FF00]">
            {percentile}% людей
          </p>
          <p className="text-xs text-white/30">psyche-scan.vercel.app</p>
        </div>
      </motion.div>

      {/* Buttons outside the card */}
      <div className="flex gap-3">
        <button
          onClick={onDownload}
          className="bg-[#D2FF00] text-black font-medium px-6 py-3 rounded-xl hover:scale-[0.98] transition cursor-pointer"
        >
          Скачать карточку
        </button>
        <button
          onClick={handleShare}
          className="border border-white/20 text-white font-medium px-6 py-3 rounded-xl hover:scale-[0.98] transition cursor-pointer"
        >
          Поделиться
        </button>
      </div>
    </div>
  );
}
