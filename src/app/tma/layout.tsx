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
      className="min-h-dvh bg-[#050505] text-white"
      style={{ overscrollBehavior: "none" }}
    >
      <TmaProvider>{children}</TmaProvider>
    </div>
  );
}
