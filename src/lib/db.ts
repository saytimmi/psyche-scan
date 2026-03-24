import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL;

export function getDb() {
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  return neon(DATABASE_URL);
}

// Database types
export interface DbUser {
  id: string;
  fingerprint: string;
  created_at: string;
}

export interface DbSession {
  id: string;
  user_id: string;
  session_type: string;
  status: "in_progress" | "completed";
  started_at: string;
  completed_at: string | null;
}

export interface DbAnswer {
  id: string;
  session_id: string;
  user_id: string;
  question_id: string;
  value_number: number | null;
  value_text: string | null;
  value_boolean: boolean | null;
  answered_at: string;
}

export interface DbProfile {
  id: string;
  user_id: string;
  test_type: "free" | "full";
  profile_data: Record<string, unknown>;
  created_at: string;
}
