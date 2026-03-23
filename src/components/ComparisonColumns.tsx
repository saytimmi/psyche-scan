"use client";

import { Reveal } from "@/components/Reveal";

const beforeItems = [
  "не знаю почему бешусь",
  "опять та же ссора",
  "не понимаю чего хочу",
  "почему я такой",
];

const afterItems = [
  "тревожная привязанность → вот почему",
  "схема покинутости → вот паттерн",
  "высокая открытость + низкая дисциплина",
  "вот инструкция что делать",
];

export function ComparisonColumns() {
  return (
    <>
      <style>{`
        .compare-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 768px) {
          .compare-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="section">
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 500,
                lineHeight: 1.1,
                textAlign: "center",
                marginBottom: 48,
              }}
            >
              Разница —{" "}
              <span style={{ color: "var(--ember)" }}>ясность.</span>
            </h2>
          </Reveal>

          <div className="compare-grid">
            <Reveal delay={0.1}>
              <div
                style={{
                  padding: 28,
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.015)",
                  border: "1px solid var(--text-04)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--text-15)",
                    marginBottom: 24,
                  }}
                >
                  СЕЙЧАС
                </div>
                {beforeItems.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 14,
                      padding: "12px 0",
                      borderBottom:
                        i < beforeItems.length - 1
                          ? "1px solid var(--text-04)"
                          : "none",
                      color: "var(--text-15)",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div
                style={{
                  padding: 28,
                  borderRadius: 16,
                  background: "rgba(249,115,22,0.03)",
                  border: "1px solid rgba(249,115,22,0.12)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--ember)",
                    marginBottom: 24,
                  }}
                >
                  ПОСЛЕ СКАНИРОВАНИЯ
                </div>
                {afterItems.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 14,
                      padding: "12px 0",
                      borderBottom:
                        i < afterItems.length - 1
                          ? "1px solid rgba(249,115,22,0.08)"
                          : "none",
                      color: "var(--text-60)",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
