"use client";

import { Reveal } from "@/components/Reveal";

export function BlurredPassport() {
  return (
    <section className="section">
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <Reveal>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            Вот что ты получишь.
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            style={{
              textAlign: "left",
              padding: 32,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Label */}
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "rgba(249,115,22,0.5)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              PERSONALITY PASSPORT
            </p>

            {/* Title */}
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 500,
                marginBottom: 20,
              }}
            >
              Твой профиль
            </p>

            {/* Paragraph 1 — readable */}
            <p
              style={{
                fontSize: 14,
                color: "var(--text-60)",
                lineHeight: 1.8,
              }}
            >
              Ты — интроверт с высокой открытостью опыту (87-й перцентиль). Тебе
              нужны люди, но маленькими дозами. Твоя тревожная привязанность
              создаёт цикл: сближение → страх потери → отталкивание.
            </p>

            {/* Paragraph 2 — blur 3px */}
            <p
              style={{
                fontSize: 14,
                color: "var(--text-60)",
                lineHeight: 1.8,
                filter: "blur(3px)",
                userSelect: "none",
                marginTop: 12,
              }}
            >
              Твоя ведущая схема — дефективность. Она сформировалась в возрасте
              4-6 лет когда ты получил сообщение что с тобой что-то не так. Это
              проявляется через перфекционизм и избегание близости.
            </p>

            {/* Paragraph 3 — blur 5px */}
            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.8,
                filter: "blur(5px)",
                userSelect: "none",
                marginTop: 12,
              }}
            >
              Сильные стороны: аналитическое мышление, эмпатия, способность
              видеть паттерны в хаосе. Слепая зона: ты не замечаешь когда
              подавляешь злость и трансформируешь её в тревогу.
            </p>

            {/* Paragraph 4 — blur 7px */}
            <p
              style={{
                fontSize: 14,
                color: "var(--text-30)",
                lineHeight: 1.8,
                filter: "blur(7px)",
                userSelect: "none",
                marginTop: 12,
              }}
            >
              Рекомендации: начни с осознания момента когда включается «режим
              перфекциониста». Это твой основной автопилот. Конкретный шаг: когда
              замечаешь самокритику — запиши что именно говорит голос.
            </p>

            {/* Gradient fade overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 160,
                background: "linear-gradient(to top, #050505, transparent)",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: 32,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  color: "var(--ember)",
                  animation: "glow-pulse 3s ease-in-out infinite",
                }}
              >
                Хочешь увидеть полностью?
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
