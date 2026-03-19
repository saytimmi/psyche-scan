import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only create client if env vars are set (optional dependency)
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Database types (matches supabase/migration.sql)
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
  profile_data: Record<string, unknown>;
  snapshot_yaml: string;
  version: number;
  created_at: string;
}
