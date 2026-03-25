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
      className="min-h-dvh"
      style={{
        overscrollBehavior: "none",
        background: "var(--tg-theme-bg-color, #0F0F0F)",
        color: "var(--tg-theme-text-color, #F5F5F5)",
        fontFamily: "'General Sans', system-ui, sans-serif",
        WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeLegibility",
      }}
    >
      <TmaProvider>{children}</TmaProvider>
    </div>
  );
}
