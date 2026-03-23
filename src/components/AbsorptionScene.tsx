"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PhraseConfig {
  text: string;
  top: number;
  side: "left" | "right";
  offset: number;
  layer: "fears" | "defenses" | "masks";
}

// ── LAYER COLORS (яркие, не тусклые) ──
const FEARS = {
  color: "#ff6b2b",
  bg: "rgba(255,107,43,0.10)",
  border: "rgba(255,107,43,0.30)",
  ring: "rgba(255,107,43,0.45)",
  label: "#ff6b2b",
  glow: "0 0 40px rgba(255,107,43,0.15)",
};
const DEFENSES = {
  color: "#ef4444",
  bg: "rgba(239,68,68,0.10)",
  border: "rgba(239,68,68,0.30)",
  ring: "rgba(239,68,68,0.40)",
  label: "#ef4444",
  glow: "0 0 40px rgba(239,68,68,0.12)",
};
const MASKS = {
  color: "#eab308",
  bg: "rgba(234,179,8,0.10)",
  border: "rgba(234,179,8,0.30)",
  ring: "rgba(234,179,8,0.35)",
  label: "#eab308",
  glow: "0 0 40px rgba(234,179,8,0.12)",
};

// ── 14 ФРАЗ — реальные боли, простым языком ──
const phraseConfigs: PhraseConfig[] = [
  // СТРАХИ (orange) — то что реально пугает
  { text: "«меня бросят»", top: -20, side: "right", offset: 190, layer: "fears" },
  { text: "«я не справлюсь»", top: 30, side: "left", offset: 200, layer: "fears" },
  { text: "«узнают какой я на самом деле»", top: 80, side: "right", offset: 210, layer: "fears" },
  { text: "«останусь один»", top: 125, side: "left", offset: 180, layer: "fears" },
  { text: "«я хуже всех»", top: 170, side: "right", offset: 170, layer: "fears" },
  // ЗАЩИТЫ (red) — что делаешь чтобы не чувствовать
  { text: "«мне всё равно»", top: 220, side: "left", offset: 200, layer: "defenses" },
  { text: "«я сам разберусь»", top: 265, side: "right", offset: 185, layer: "defenses" },
  { text: "«это не больно»", top: 310, side: "left", offset: 175, layer: "defenses" },
  { text: "«мне никто не нужен»", top: 355, side: "right", offset: 195, layer: "defenses" },
  // МАСКИ (yellow) — что показываешь миру
  { text: "«у меня всё хорошо»", top: 405, side: "left", offset: 205, layer: "masks" },
  { text: "«я сильный»", top: 445, side: "right", offset: 170, layer: "masks" },
  { text: "«мне не нужна помощь»", top: 485, side: "left", offset: 195, layer: "masks" },
  { text: "«я в порядке»", top: 525, side: "right", offset: 175, layer: "masks" },
  { text: "«всё под контролем»", top: 565, side: "left", offset: 185, layer: "masks" },
];

function getLayerStyle(layer: "fears" | "defenses" | "masks") {
  if (layer === "fears") return FEARS;
  if (layer === "defenses") return DEFENSES;
  return MASKS;
}

export function AbsorptionScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const egoRef = useRef<HTMLDivElement>(null);
  const fearsRef = useRef<HTMLDivElement>(null);
  const defensesRef = useRef<HTMLDivElement>(null);
  const masksRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const phraseRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    // 1. Core + EGO fade in
    tl.to(coreRef.current, { opacity: 1, duration: 0.08 }, 0);
    tl.to(coreRef.current, { boxShadow: "0 0 40px rgba(255,107,43,0.1)", duration: 0.08 }, 0);
    if (egoRef.current) {
      tl.to(egoRef.current, { opacity: 1, duration: 0.08 }, 0);
    }

    // 2. Phrases fly in rapid-fire and STAY
    const total = phraseConfigs.length;
    phraseRefs.current.forEach((el, i) => {
      if (!el) return;
      const cfg = phraseConfigs[i];
      const startPos = 0.06 + i * 0.035;
      const fromX = cfg.side === "right" ? 350 : -350;

      tl.fromTo(
        el,
        { opacity: 0, x: fromX, scale: 0.85 },
        { opacity: 1, x: 0, scale: 1, duration: 0.04, ease: "power3.out" },
        startPos
      );

      // Flash core every 3rd
      if (i % 3 === 0) {
        tl.to(coreRef.current, {
          borderColor: FEARS.ring,
          boxShadow: "0 0 50px rgba(255,107,43,0.2)",
          duration: 0.01,
        }, startPos + 0.02);
        tl.to(coreRef.current, {
          borderColor: "rgba(255,255,255,0.08)",
          boxShadow: "0 0 30px rgba(255,107,43,0.08)",
          duration: 0.02,
        }, startPos + 0.03);
      }
    });

    const layersStart = 0.06 + total * 0.035 + 0.04;

    // 3. СТРАХИ ring — bright orange
    if (fearsRef.current) {
      tl.to(fearsRef.current, {
        opacity: 1,
        scale: 1,
        borderColor: FEARS.ring,
        boxShadow: FEARS.glow,
        duration: 0.08,
        ease: "power2.out",
      }, layersStart);
    }

    // 4. ЗАЩИТЫ ring — bright red
    if (defensesRef.current) {
      tl.to(defensesRef.current, {
        opacity: 1,
        scale: 1,
        borderColor: DEFENSES.ring,
        boxShadow: DEFENSES.glow,
        duration: 0.08,
        ease: "power2.out",
      }, layersStart + 0.08);
    }

    // 5. МАСКИ ring — bright yellow
    if (masksRef.current) {
      tl.to(masksRef.current, {
        opacity: 1,
        scale: 1,
        borderColor: MASKS.ring,
        boxShadow: MASKS.glow,
        duration: 0.08,
        ease: "power2.out",
      }, layersStart + 0.16);
    }

    // 6. Core full glow
    tl.to(coreRef.current, {
      boxShadow: "0 0 60px rgba(255,107,43,0.25), 0 0 120px rgba(239,68,68,0.12), 0 0 160px rgba(234,179,8,0.08)",
      borderColor: "rgba(255,107,43,0.3)",
      duration: 0.1,
    }, layersStart + 0.22);

    // 7. Bottom text
    tl.fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.1 },
      layersStart + 0.30
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: "450vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative" style={{ width: 340, height: 600 }}>

          {/* ── Silhouette core ── */}
          <div
            ref={coreRef}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 120,
              height: 260,
              borderRadius: "60px 60px 45px 45px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
              opacity: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              ref={egoRef}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: "0.15em",
                color: "var(--ember)",
                opacity: 0,
              }}
            >
              ЭГО
            </div>
          </div>

          {/* ── СТРАХИ ring — ORANGE, bold ── */}
          <div
            ref={fearsRef}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%) scale(0.7)",
              width: 180,
              height: 320,
              borderRadius: "50%",
              border: `2px dashed ${FEARS.ring}`,
              opacity: 0,
            }}
          >
            <span style={{
              position: "absolute",
              top: -12,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 12,
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              color: FEARS.label,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              background: "var(--bg)",
              padding: "2px 10px",
              whiteSpace: "nowrap",
            }}>
              СТРАХИ
            </span>
          </div>

          {/* ── ЗАЩИТЫ ring — RED, bold ── */}
          <div
            ref={defensesRef}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%) scale(0.7)",
              width: 240,
              height: 380,
              borderRadius: "50%",
              border: `2px dashed ${DEFENSES.ring}`,
              opacity: 0,
            }}
          >
            <span style={{
              position: "absolute",
              top: -12,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 12,
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              color: DEFENSES.label,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              background: "var(--bg)",
              padding: "2px 10px",
              whiteSpace: "nowrap",
            }}>
              ЗАЩИТЫ
            </span>
          </div>

          {/* ── МАСКИ ring — YELLOW, bold ── */}
          <div
            ref={masksRef}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%) scale(0.7)",
              width: 300,
              height: 440,
              borderRadius: "50%",
              border: `2px dashed ${MASKS.ring}`,
              opacity: 0,
            }}
          >
            <span style={{
              position: "absolute",
              top: -12,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 12,
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              color: MASKS.label,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              background: "var(--bg)",
              padding: "2px 10px",
              whiteSpace: "nowrap",
            }}>
              МАСКИ
            </span>
          </div>

          {/* ── Flying phrases ── */}
          {phraseConfigs.map((cfg, i) => {
            const layerStyle = getLayerStyle(cfg.layer);
            const pos: React.CSSProperties = {
              position: "absolute",
              top: cfg.top,
              padding: "10px 18px",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 500,
              whiteSpace: "nowrap",
              opacity: 0,
              color: layerStyle.color,
              background: layerStyle.bg,
              border: `1px solid ${layerStyle.border}`,
            };
            if (cfg.side === "right") pos.right = -cfg.offset;
            else pos.left = -cfg.offset;

            return (
              <div
                key={cfg.text}
                ref={(el) => { phraseRefs.current[i] = el; }}
                style={pos}
              >
                {cfg.text}
              </div>
            );
          })}
        </div>

        {/* Bottom text */}
        <div
          ref={textRef}
          style={{
            position: "absolute",
            bottom: "8vh",
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
