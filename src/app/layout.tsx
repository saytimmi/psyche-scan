import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Psyche Scan — Deep Personality Profiling",
  description: "8-layer evidence-based personality assessment powered by AI. Big Five, Attachment, Schemas, Ego Development, Defense Mechanisms, Polyvagal — full psychological profile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
