import type { Metadata } from "next";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Psyche Scan — Глубинное сканирование личности",
  description: "9 слоёв. 330 вопросов. 22+ научных фреймворка. Полный психологический профиль с AI-анализом.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={cn("h-full antialiased", "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
