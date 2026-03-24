"use client";

import { useState, useEffect } from "react";

function generateFingerprint(): string {
  // Simple fingerprint based on browser characteristics
  const nav = window.navigator;
  const screen = window.screen;
  const raw = [
    nav.userAgent,
    nav.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
  ].join("|");

  // Simple hash
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const chr = raw.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return "fp_" + Math.abs(hash).toString(36);
}

export function useUser() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage for cached userId
    const cached = localStorage.getItem("psyche_user_id");
    if (cached) {
      setUserId(cached);
      return;
    }

    // Create new user
    const fingerprint = generateFingerprint();
    fetch(`/api/user?fingerprint=${encodeURIComponent(fingerprint)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.userId) {
          localStorage.setItem("psyche_user_id", data.userId);
          setUserId(data.userId);
        }
      })
      .catch(console.error);
  }, []);

  return userId;
}

// Save answers to both localStorage (instant) and Neon (persistent)
export async function saveAnswersToDb(
  userId: string,
  sessionType: string,
  answers: Record<string, string>
) {
  try {
    const res = await fetch("/api/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, sessionType, answers }),
    });
    return await res.json();
  } catch (err) {
    console.error("Failed to save to DB:", err);
    return null;
  }
}

// Save profile to Neon
export async function saveProfileToDb(
  userId: string,
  testType: "free" | "full",
  profileData: Record<string, unknown>
) {
  try {
    const res = await fetch("/api/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, testType, profileData }),
    });
    return await res.json();
  } catch (err) {
    console.error("Failed to save profile to DB:", err);
    return null;
  }
}
