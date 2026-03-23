"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const phrases = [
  {
    text: "я должен быть сильным",
    style: {
      top: -20,
      right: -180,
      color: "#f97316",
      bg: "rgba(249,115,22,0.06)",
      border: "rgba(249,115,22,0.15)",
    },
    direction: 1, // right side → comes from x: 200
  },
  {
    text: "меня не любят таким",
    style: {
      top: 80,
      left: -200,
      color: "#dc2626",
      bg: "rgba(220,38,38,0.06)",
      border: "rgba(220,38,38,0.15)",
    },
    direction: -1, // left side → comes from x: -200
  },
  {
    text: "мир опасен",
    style: {
      top: 170,
      right: -150,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.06)",
      border: "rgba(251,191,36,0.15)",
    },
    direction: 1,
  },
  {
    text: "я недостаточно хорош",
    style: {
      bottom: 60,
      left: -190,
      color: "#f97316",
      bg: "rgba(249,115,22,0.06)",
      border: "rgba(249,115,22,0.15)",
    },
    direction: -1,
  },
  {
    text: "нельзя доверять",
    style: {
      bottom: 140,
      right: -170,
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
    width: 150,
    height: 270,
    borderColor: "rgba(249,115,22,0.25)",
    labelColor: "rgba(249,115,22,0.4)",
  },
  {
    label: "защиты",
    width: 190,
    height: 310,
    borderColor: "rgba(220,38,38,0.2)",
    labelColor: "rgba(220,38,38,0.35)",
  },
  {
    label: "маски",
    width: 230,
    height: 350,
    borderColor: "rgba(251,191,36,0.15)",
    labelColor: "rgba(251,191,36,0.3)",
  },
];

export function AbsorptionScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
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

    // 1. Core fade in
    tl.to(coreRef.current, { opacity: 1, duration: 0.15 }, 0);

    // 2. Core glow
    tl.to(
      coreRef.current,
      { boxShadow: "0 0 30px rgba(249,115,22,0.1)", duration: 0.15 },
      0
    );

    // 3. Each phrase — staggered from 0.15 to 0.50
    phraseRefs.current.forEach((el, i) => {
      if (!el) return;
      const startPos = 0.15 + i * 0.07;
      const fromX = phrases[i].direction * 200;

      // Animate IN
      tl.fromTo(
        el,
        { opacity: 0, x: fromX },
        { opacity: 1, x: 0, duration: 0.06 },
        startPos
      );

      // Animate OUT (absorbed)
      tl.to(
        el,
        { opacity: 0, scale: 0.3, duration: 0.04 },
        startPos + 0.06
      );

      // Flash core border on absorb
      tl.to(
        coreRef.current,
        { borderColor: "rgba(249,115,22,0.4)", duration: 0.01 },
        startPos + 0.06
      );
      tl.to(
        coreRef.current,
        { borderColor: "rgba(255,255,255,0.08)", duration: 0.02 },
        startPos + 0.07
      );
    });

    // 4. Layer fears appear
    if (fearsRef.current) {
      tl.to(
        fearsRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.08,
        },
        0.5
      );
    }

    // 5. Layer defenses appear
    if (defensesRef.current) {
      tl.to(
        defensesRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.08,
        },
        0.58
      );
    }

    // 6. Layer masks appear
    if (masksRef.current) {
      tl.to(
        masksRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.08,
        },
        0.66
      );
    }

    // 7. Core intensify glow
    tl.to(
      coreRef.current,
      {
        boxShadow:
          "0 0 50px rgba(249,115,22,0.2), 0 0 100px rgba(220,38,38,0.1)",
        duration: 0.15,
      },
      0.75
    );

    // 8. Bottom text
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
        <div className="relative" style={{ width: 240, height: 380 }}>
          {/* Silhouette core */}
          <div
            ref={coreRef}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 100,
              height: 220,
              borderRadius: "50px 50px 38px 38px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
              opacity: 0,
            }}
          />

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

          {/* Flying phrases */}
          {phrases.map((phrase, i) => {
            const pos: React.CSSProperties = {
              position: "absolute",
              padding: "8px 16px",
              borderRadius: 8,
              fontSize: 14,
              whiteSpace: "nowrap",
              opacity: 0,
              color: phrase.style.color,
              background: phrase.style.bg,
              border: `1px solid ${phrase.style.border}`,
            };

            if (phrase.style.top !== undefined) pos.top = phrase.style.top;
            if (phrase.style.bottom !== undefined)
              pos.bottom = phrase.style.bottom;
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
