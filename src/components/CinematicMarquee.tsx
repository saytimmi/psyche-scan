"use client";

const frameworks = [
  "BIG FIVE",
  "ECR-R",
  "DERS",
  "YSQ-S3",
  "ACE",
  "PVQ-RR",
  "DSQ",
  "IFS",
  "POLYVAGAL",
  "MAIA",
  "NEFF",
  "LOEVINGER",
  "McADAMS",
  "KEGAN",
];

const spanStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 13,
  color: "var(--text-15)",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  margin: "0 32px",
  whiteSpace: "nowrap",
  flexShrink: 0,
};

export function CinematicMarquee() {
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--text-04)",
        borderBottom: "1px solid var(--text-04)",
        padding: "24px 0",
      }}
    >
      <div className="marquee-track">
        {[0, 1].map((r) => (
          <div
            key={r}
            style={{
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            {frameworks.map((fw) => (
              <span key={`${r}-${fw}`} style={spanStyle}>
                {fw}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
