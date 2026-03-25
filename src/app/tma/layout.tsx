import type { Metadata } from "next";
import { TmaProvider } from "./components/TmaProvider";
import "../globals.css";

export const metadata: Metadata = {
  title: "Psyche Scan",
  description: "Узнай как ты устроен",
};

export default function TmaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-dvh text-white"
      style={{
        overscrollBehavior: "none",
        background: "#0D0A1E",
        fontFamily: "var(--font-manrope), 'Manrope', system-ui, sans-serif",
        WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeLegibility",
      }}
    >
      {/* Radial gradient depth overlay */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(124,58,237,0.12) 0%, rgba(13,10,30,0) 70%)",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <TmaProvider>{children}</TmaProvider>
      </div>
    </div>
  );
}
