-- Psyche Scan: Personality Profiling Database Schema

-- Users (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  created_at timestamptz default now()
);

-- Profiling sessions
create table public.sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  session_type text not null check (session_type in ('foundation', 'depths', 'narrative', 'dynamics')),
  status text not null default 'in_progress' check (status in ('in_progress', 'completed')),
  started_at timestamptz default now(),
  completed_at timestamptz
);

-- Individual answers
create table public.answers (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references public.sessions(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  question_id text not null,
  value_number real,
  value_text text,
  value_boolean boolean,
  answered_at timestamptz default now(),
  unique(session_id, question_id)
);

-- Computed personality profiles
create table public.personality_profiles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  profile_data jsonb not null,
  snapshot_yaml text not null,
  version integer default 1,
  created_at timestamptz default now()
);

-- Personality traits (structured, queryable)
create table public.personality_traits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  dimension_id text not null,
  value_score real,
  value_text text,
  value_json jsonb,
  source_type text not null default 'tested' check (source_type in ('self_reported', 'observed', 'inferred', 'tested')),
  source_detail text,
  confidence real not null default 0.5,
  evidence_count integer default 1,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Contradictions (self-deception detector)
create table public.personality_contradictions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  dimension_id text not null,
  self_reported text not null,
  observed text not null,
  divergence_score real default 0.5,
  examples jsonb,
  hypothesis text,
  times_observed integer default 1,
  resolved boolean default false,
  created_at timestamptz default now()
);

-- Indexes
create index idx_answers_session on public.answers(session_id);
create index idx_answers_user on public.answers(user_id);
create index idx_traits_user_active on public.personality_traits(user_id) where is_active = true;
create index idx_profiles_user on public.personality_profiles(user_id);
create index idx_sessions_user on public.sessions(user_id);

-- RLS
alter table public.profiles enable row level security;
alter table public.sessions enable row level security;
alter table public.answers enable row level security;
alter table public.personality_profiles enable row level security;
alter table public.personality_traits enable row level security;
alter table public.personality_contradictions enable row level security;

-- Policies: users can only access their own data
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

create policy "Users can manage own sessions" on public.sessions for all using (auth.uid() = user_id);
create policy "Users can manage own answers" on public.answers for all using (auth.uid() = user_id);
create policy "Users can manage own personality_profiles" on public.personality_profiles for all using (auth.uid() = user_id);
create policy "Users can manage own traits" on public.personality_traits for all using (auth.uid() = user_id);
create policy "Users can manage own contradictions" on public.personality_contradictions for all using (auth.uid() = user_id);
