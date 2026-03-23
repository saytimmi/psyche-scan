"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PhraseStyle {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  color: string;
  bg: string;
  border: string;
}

const phrases: { text: string; style: PhraseStyle; direction: number }[] = [
  {
    text: "«я должен быть сильным»",
    style: {
      top: -10,
      right: -200,
      color: "#f97316",
      bg: "rgba(249,115,22,0.06)",
      border: "rgba(249,115,22,0.15)",
    },
    direction: 1,
  },
  {
    text: "«меня не любят таким»",
    style: {
      top: 70,
      left: -210,
      color: "#dc2626",
      bg: "rgba(220,38,38,0.06)",
      border: "rgba(220,38,38,0.15)",
    },
    direction: -1,
  },
  {
    text: "«мир опасен»",
    style: {
      top: 155,
      right: -160,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.06)",
      border: "rgba(251,191,36,0.15)",
    },
    direction: 1,
  },
  {
    text: "«я недостаточно хорош»",
    style: {
      top: 240,
      left: -210,
      color: "#f97316",
      bg: "rgba(249,115,22,0.06)",
      border: "rgba(249,115,22,0.15)",
    },
    direction: -1,
  },
  {
    text: "«нельзя доверять»",
    style: {
      top: 320,
      right: -190,
      color: "#dc2626",
      bg: "rgba(220,38,38,0.06)",
      border: "rgba(220,38,38,0.15)",
    },
    direction: 1,
  },
];

const layers = [
  {
    label: "страхи",
    width: 160,
    height: 290,
    borderColor: "rgba(249,115,22,0.25)",
    labelColor: "rgba(249,115,22,0.4)",
  },
  {
    label: "защиты",
    width: 210,
    height: 340,
    borderColor: "rgba(220,38,38,0.2)",
    labelColor: "rgba(220,38,38,0.35)",
  },
  {
    label: "маски",
    width: 260,
    height: 390,
    borderColor: "rgba(251,191,36,0.15)",
    labelColor: "rgba(251,191,36,0.3)",
  },
];

export function AbsorptionScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const egoRef = useRef<HTMLDivElement>(null);
  const fearsRef = useRef<HTMLDivElement>(null);
  const defensesRef = useRef<HTMLDivElement>(null);
  const masksRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const phraseRefs = useRef<(HTMLDivElement | null)[]>([]);

  const layerRefs = [fearsRef, defensesRef, masksRef];

  useEffect(() => {
    if (!containerRef.current || !coreRef.current || !textRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    // 1. Core + EGO label fade in
    tl.to(coreRef.current, { opacity: 1, duration: 0.1 }, 0);
    tl.to(
      coreRef.current,
      { boxShadow: "0 0 40px rgba(249,115,22,0.08)", duration: 0.1 },
      0
    );
    if (egoRef.current) {
      tl.to(egoRef.current, { opacity: 1, duration: 0.1 }, 0);
    }

    // 2. Each phrase flies in and STAYS (no fade out)
    phraseRefs.current.forEach((el, i) => {
      if (!el) return;
      const startPos = 0.1 + i * 0.08;
      const fromX = phrases[i].direction * 250;

      // Animate IN — stays at opacity 1
      tl.fromTo(
        el,
        { opacity: 0, x: fromX },
        { opacity: 1, x: 0, duration: 0.08, ease: "power2.out" },
        startPos
      );

      // Flash core border on each phrase arrival
      tl.to(
        coreRef.current,
        {
          borderColor: "rgba(249,115,22,0.35)",
          boxShadow: "0 0 50px rgba(249,115,22,0.15)",
          duration: 0.02,
        },
        startPos + 0.06
      );
      tl.to(
        coreRef.current,
        {
          borderColor: "rgba(255,255,255,0.08)",
          boxShadow: "0 0 40px rgba(249,115,22,0.08)",
          duration: 0.03,
        },
        startPos + 0.08
      );
    });

    // 3. Layer fears appear
    if (fearsRef.current) {
      tl.to(
        fearsRef.current,
        { opacity: 1, scale: 1, duration: 0.1, ease: "power2.out" },
        0.55
      );
    }

    // 4. Layer defenses appear
    if (defensesRef.current) {
      tl.to(
        defensesRef.current,
        { opacity: 1, scale: 1, duration: 0.1, ease: "power2.out" },
        0.63
      );
    }

    // 5. Layer masks appear
    if (masksRef.current) {
      tl.to(
        masksRef.current,
        { opacity: 1, scale: 1, duration: 0.1, ease: "power2.out" },
        0.71
      );
    }

    // 6. Core intensify glow + EGO pulses
    tl.to(
      coreRef.current,
      {
        boxShadow:
          "0 0 60px rgba(249,115,22,0.2), 0 0 120px rgba(220,38,38,0.1)",
        borderColor: "rgba(249,115,22,0.2)",
        duration: 0.15,
      },
      0.78
    );

    // 7. Bottom text
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.12 },
      0.88
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative" style={{ width: 280, height: 420 }}>
          {/* Silhouette core */}
          <div
            ref={coreRef}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 110,
              height: 240,
              borderRadius: "55px 55px 42px 42px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
              opacity: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* EGO label — always centered inside core */}
            <div
              ref={egoRef}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: "0.15em",
                color: "var(--ember)",
                opacity: 0,
                textTransform: "uppercase",
              }}
            >
              ЭГО
            </div>
          </div>

          {/* Layer rings */}
          {layers.map((layer, i) => (
            <div
              key={layer.label}
              ref={layerRefs[i]}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%) scale(0.7)",
                width: layer.width,
                height: layer.height,
                borderRadius: "50%",
                border: `1px dashed ${layer.borderColor}`,
                opacity: 0,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: 10,
                  fontFamily: "var(--font-mono)",
                  color: layer.labelColor,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  background: "var(--bg)",
                  padding: "0 6px",
                  whiteSpace: "nowrap",
                }}
              >
                {layer.label}
              </span>
            </div>
          ))}

          {/* Flying phrases — appear and STAY */}
          {phrases.map((phrase, i) => {
            const pos: React.CSSProperties = {
              position: "absolute",
              padding: "10px 18px",
              borderRadius: 10,
              fontSize: 14,
              whiteSpace: "nowrap",
              opacity: 0,
              color: phrase.style.color,
              background: phrase.style.bg,
              border: `1px solid ${phrase.style.border}`,
            };

            if (phrase.style.top !== undefined) pos.top = phrase.style.top;
            if (phrase.style.bottom !== undefined) pos.bottom = phrase.style.bottom;
            if (phrase.style.left !== undefined) pos.left = phrase.style.left;
            if (phrase.style.right !== undefined) pos.right = phrase.style.right;

            return (
              <div
                key={phrase.text}
                ref={(el) => {
                  phraseRefs.current[i] = el;
                }}
                style={pos}
              >
                {phrase.text}
              </div>
            );
          })}
        </div>

        {/* Bottom text */}
        <div
          ref={textRef}
          style={{
            position: "absolute",
            bottom: "10vh",
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            opacity: 0,
          }}
        >
          Всё это внутри тебя.{" "}
          <span style={{ color: "var(--ember)" }}>Прямо сейчас.</span>
        </div>
      </div>
    </div>
  );
}
