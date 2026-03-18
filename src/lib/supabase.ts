import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface DbSession {
  id: string;
  user_id: string;
  session_type: string; // 'foundation' | 'depths' | 'narrative' | 'dynamics'
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
  profile_data: Record<string, unknown>; // full ProfileResult JSON
  snapshot_yaml: string;
  version: number;
  created_at: string;
}
