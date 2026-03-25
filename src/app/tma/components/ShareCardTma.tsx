"use client";

interface ShareCardTmaProps {
  patternName: string;
  modifier: string;
  recognitionText: string;
  percentile: number;
}

export function ShareCardTma({
  patternName,
  modifier,
  recognitionText,
  percentile,
}: ShareCardTmaProps) {
  // Truncate recognition text to ~100 chars
  const shortRecognition =
    recognitionText.length > 100
      ? recognitionText.slice(0, 97) + "..."
      : recognitionText;

  return (
    <div
      id="tma-share-card"
      style={{
        width: 340,
        height: 600,
        background: "linear-gradient(160deg, #0D0A1E 0%, #1a1145 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "48px 32px 36px",
        position: "relative",
        overflow: "hidden",
        borderRadius: 24,
        boxSizing: "border-box",
      }}
    >
      {/* Radial violet glow top */}
      <div
        style={{
          position: "absolute",
          top: -60,
          left: "50%",
          transform: "translateX(-50%)",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top: PSYCHE SCAN label */}
      <p
        style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#A78BFA",
          fontFamily: "DM Sans, sans-serif",
          zIndex: 1,
          margin: 0,
        }}
      >
        PSYCHE SCAN
      </p>

      {/* Center content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          zIndex: 1,
          flex: 1,
          justifyContent: "center",
        }}
      >
        {/* Pattern name */}
        <p
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "rgba(255,255,255,0.92)",
            fontFamily: "Instrument Serif, serif",
            textAlign: "center",
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          {patternName}
        </p>

        {/* Modifier */}
        <p
          style={{
            fontSize: 16,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.50)",
            fontFamily: "Instrument Serif, serif",
            textAlign: "center",
            marginTop: 10,
            margin: "10px 0 0 0",
          }}
        >
          ...{modifier}
        </p>

        {/* Separator */}
        <div
          style={{
            width: 40,
            height: 1,
            background: "linear-gradient(90deg, transparent, #7C3AED, transparent)",
            margin: "24px auto",
          }}
        />

        {/* Recognition snippet */}
        <p
          style={{
            fontSize: 14,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.60)",
            fontFamily: "DM Sans, sans-serif",
            textAlign: "center",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          &ldquo;{shortRecognition}&rdquo;
        </p>

        {/* Percentile */}
        <p
          style={{
            fontSize: 13,
            color: "#A78BFA",
            fontFamily: "JetBrains Mono, monospace",
            marginTop: 20,
            margin: "20px 0 0 0",
          }}
        >
          {percentile}% людей
        </p>
      </div>

      {/* Bottom: bot handle */}
      <p
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.30)",
          fontFamily: "DM Sans, sans-serif",
          zIndex: 1,
          margin: 0,
        }}
      >
        t.me/scanyourbrainbot
      </p>
    </div>
  );
}
